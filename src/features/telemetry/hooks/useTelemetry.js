import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import {
    getTelemetry,
    getTelemetrySummary,
    getTelemetryHistory,
    getLatestTelemetry,
    getDeviceStatus
} from "../api/telemetryApi";

/*
|--------------------------------------------------------------------------
| Normalize API Response
|--------------------------------------------------------------------------
*/

function extractData(response, fallback = null) {

    if (response == null) {
        return fallback;
    }

    /*
     * Axios service may already return response.data.
     *
     * Supports:
     *
     * { data: {...} }
     * { success: true, data: {...} }
     * {...}
     */

    if (
        response &&
        typeof response === "object" &&
        Object.prototype.hasOwnProperty.call(response, "data")
    ) {
        return response.data ?? fallback;
    }

    return response;
}

/*
|--------------------------------------------------------------------------
| Normalize Error
|--------------------------------------------------------------------------
*/

function extractError(error, fallbackMessage) {

    return (
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
        fallbackMessage
    );

}

/*
|--------------------------------------------------------------------------
| useTelemetry
|--------------------------------------------------------------------------
*/

export default function useTelemetry(filters = {}) {

    /*
    |--------------------------------------------------------------------------
    | Stable Filter Values
    |--------------------------------------------------------------------------
    */

    const siteId = filters?.siteId ?? null;

    /*
     * Only include actual query parameters.
     *
     * This prevents a new object reference from causing
     * unnecessary requests.
     */

    const queryParams = useMemo(() => {

        return Object.fromEntries(

            Object.entries(filters || {}).filter(

                ([, value]) =>
                    value !== undefined &&
                    value !== null &&
                    value !== ""

            )

        );

    }, [
        JSON.stringify(filters)
    ]);

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [
        telemetry,
        setTelemetry
    ] = useState(null);

    const [
        summary,
        setSummary
    ] = useState(null);

    const [
        history,
        setHistory
    ] = useState([]);

    const [
        deviceStatus,
        setDeviceStatus
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        historyLoading,
        setHistoryLoading
    ] = useState(false);

    const [
        deviceStatusLoading,
        setDeviceStatusLoading
    ] = useState(false);

    const [
        error,
        setError
    ] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Load Current Telemetry
    |--------------------------------------------------------------------------
    */

    const loadTelemetry = useCallback(

        async () => {

            try {

                setLoading(true);
                setError(null);

                /*
                 * If siteId is supplied, use the installation-specific
                 * latest endpoint.
                 */

                if (siteId) {

                    const response =
                        await getLatestTelemetry(siteId);

                    const data =
                        extractData(
                            response,
                            null
                        );

                    setTelemetry(data);

                    /*
                     * Also attempt to load installation status.
                     */

                    try {

                        const statusResponse =
                            await getDeviceStatus(siteId);

                        setDeviceStatus(

                            extractData(
                                statusResponse,
                                null
                            )

                        );

                    }
                    catch (statusError) {

                        console.warn(
                            "Device status loading failed:",
                            statusError
                        );

                    }

                    return data;

                }

                /*
                 * No siteId:
                 * use the general telemetry endpoint.
                 */

                const [
                    telemetryResponse,
                    summaryResponse
                ] = await Promise.all([

                    getTelemetry(queryParams),

                    getTelemetrySummary(queryParams)

                ]);

                const telemetryData =
                    extractData(
                        telemetryResponse,
                        null
                    );

                const summaryData =
                    extractData(
                        summaryResponse,
                        null
                    );

                setTelemetry(
                    telemetryData
                );

                setSummary(
                    summaryData
                );

                return telemetryData;

            }
            catch (error) {

                console.error(
                    "Telemetry loading failed:",
                    error
                );

                setError(
                    extractError(
                        error,
                        "Failed to load telemetry."
                    )
                );

                return null;

            }
            finally {

                setLoading(false);

            }

        },

        [
            siteId,
            queryParams
        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Initial / Filter Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadTelemetry();

    }, [
        loadTelemetry
    ]);

    /*
    |--------------------------------------------------------------------------
    | Historical Telemetry
    |--------------------------------------------------------------------------
    */

    const loadHistory = useCallback(

        async (params = {}) => {

            try {

                setHistoryLoading(true);
                setError(null);

                const response =
                    await getTelemetryHistory(
                        params
                    );

                const data =
                    extractData(
                        response,
                        []
                    );

                const normalized =
                    Array.isArray(data)
                        ? data
                        : Array.isArray(data?.data)
                            ? data.data
                            : Array.isArray(data?.history)
                                ? data.history
                                : [];

                setHistory(
                    normalized
                );

                return normalized;

            }
            catch (error) {

                console.error(
                    "Telemetry history loading failed:",
                    error
                );

                setError(
                    extractError(
                        error,
                        "Failed to load telemetry history."
                    )
                );

                return [];

            }
            finally {

                setHistoryLoading(false);

            }

        },

        []

    );

    /*
    |--------------------------------------------------------------------------
    | Latest Installation Telemetry
    |--------------------------------------------------------------------------
    */

    const loadLatestTelemetry = useCallback(

        async installationId => {

            if (!installationId) {

                return null;

            }

            try {

                setLoading(true);
                setError(null);

                const response =
                    await getLatestTelemetry(
                        installationId
                    );

                const data =
                    extractData(
                        response,
                        null
                    );

                setTelemetry(
                    data
                );

                return data;

            }
            catch (error) {

                console.error(
                    "Latest telemetry loading failed:",
                    error
                );

                setError(
                    extractError(
                        error,
                        "Failed to load latest telemetry."
                    )
                );

                return null;

            }
            finally {

                setLoading(false);

            }

        },

        []

    );

    /*
    |--------------------------------------------------------------------------
    | Device Status
    |--------------------------------------------------------------------------
    */

    const loadDeviceStatus = useCallback(

        async installationId => {

            if (!installationId) {

                return null;

            }

            try {

                setDeviceStatusLoading(true);
                setError(null);

                const response =
                    await getDeviceStatus(
                        installationId
                    );

                const data =
                    extractData(
                        response,
                        null
                    );

                setDeviceStatus(
                    data
                );

                return data;

            }
            catch (error) {

                console.error(
                    "Device status loading failed:",
                    error
                );

                setError(
                    extractError(
                        error,
                        "Failed to load device status."
                    )
                );

                return null;

            }
            finally {

                setDeviceStatusLoading(false);

            }

        },

        []

    );

    /*
    |--------------------------------------------------------------------------
    | Return
    |--------------------------------------------------------------------------
    */

    return {

        telemetry,

        summary,

        history,

        deviceStatus,

        loading,

        historyLoading,

        deviceStatusLoading,

        error,

        siteId,

        reload: loadTelemetry,

        loadTelemetry,

        loadHistory,

        loadLatestTelemetry,

        loadDeviceStatus

    };

}