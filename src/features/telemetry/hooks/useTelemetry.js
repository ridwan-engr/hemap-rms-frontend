import { useCallback, useEffect, useState } from "react";

import {
    getTelemetry,
    getTelemetrySummary,
    getTelemetryHistory,
    getLatestTelemetry,
    getDeviceStatus
} from "../api/telemetryApi";

export default function useTelemetry(filters = {}) {

    const [telemetry, setTelemetry] = useState(null);

    const [summary, setSummary] = useState(null);

    const [history, setHistory] = useState([]);

    const [deviceStatus, setDeviceStatus] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Load Telemetry
    |--------------------------------------------------------------------------
    */

    const loadTelemetry = useCallback(async () => {

        try {

            setLoading(true);

            setError(null);

            /*
             * Current telemetry
             */
            const telemetryResponse =
                await getTelemetry(filters);

            /*
             * Telemetry summary
             */
            const summaryResponse =
                await getTelemetrySummary(filters);

            setTelemetry(
                telemetryResponse?.data ??
                telemetryResponse ??
                null
            );

            setSummary(
                summaryResponse?.data ??
                summaryResponse ??
                null
            );

        }
        catch (err) {

            console.error(
                "Telemetry loading failed:",
                err
            );

            setError(
                err.response?.data ??
                err.message ??
                "Failed to load telemetry."
            );

        }
        finally {

            setLoading(false);

        }

    }, [filters]);

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadTelemetry();

    }, [loadTelemetry]);

    /*
    |--------------------------------------------------------------------------
    | Load Historical Telemetry
    |--------------------------------------------------------------------------
    */

    const loadHistory = useCallback(
        async (params = {}) => {

            try {

                const response =
                    await getTelemetryHistory(params);

                const data =
                    response?.data ??
                    response ??
                    [];

                setHistory(
                    Array.isArray(data)
                        ? data
                        : data?.data ?? []
                );

                return data;

            }
            catch (err) {

                console.error(
                    "Telemetry history loading failed:",
                    err
                );

                setError(
                    err.response?.data ??
                    err.message ??
                    "Failed to load telemetry history."
                );

                return [];

            }

        },
        []
    );

    /*
    |--------------------------------------------------------------------------
    | Load Latest Installation Telemetry
    |--------------------------------------------------------------------------
    */

    const loadLatestTelemetry = useCallback(
        async (installationId) => {

            if (!installationId) {

                return null;

            }

            try {

                const response =
                    await getLatestTelemetry(
                        installationId
                    );

                const data =
                    response?.data ??
                    response ??
                    null;

                setTelemetry(data);

                return data;

            }
            catch (err) {

                console.error(
                    "Latest telemetry loading failed:",
                    err
                );

                setError(
                    err.response?.data ??
                    err.message ??
                    "Failed to load latest telemetry."
                );

                return null;

            }

        },
        []
    );

    /*
    |--------------------------------------------------------------------------
    | Load Device Status
    |--------------------------------------------------------------------------
    */

    const loadDeviceStatus = useCallback(
        async (installationId) => {

            if (!installationId) {

                return null;

            }

            try {

                const response =
                    await getDeviceStatus(
                        installationId
                    );

                const data =
                    response?.data ??
                    response ??
                    null;

                setDeviceStatus(data);

                return data;

            }
            catch (err) {

                console.error(
                    "Device status loading failed:",
                    err
                );

                setError(
                    err.response?.data ??
                    err.message ??
                    "Failed to load device status."
                );

                return null;

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

        error,

        reload: loadTelemetry,

        loadHistory,

        loadLatestTelemetry,

        loadDeviceStatus

    };

}