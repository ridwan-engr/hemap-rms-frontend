/**
 * ============================================================================
 * HEMAP RMS
 * VRM Normalization Service
 * ============================================================================
 *
 * File:
 * features/vrm/api/normalizeVRM.js
 *
 * Purpose:
 * ----------
 * Converts raw Victron VRM responses into the stable data contract consumed
 * by the HEMAP VRM Redux slice and presentation components.
 *
 * Architecture:
 *
 * Victron VRM
 *      ↓
 * vrmApi.js
 *      ↓
 * normalizeVRM.js
 *      ↓
 * vrmSlice.js
 *      ↓
 * useVRM()
 *      ↓
 * VRM components
 *
 * IMPORTANT:
 * ----------
 * UI components never interpret the raw VRM API structure.
 *
 * Unknown telemetry remains null.
 *
 * Raw responses are preserved under `raw` for diagnostics.
 * ============================================================================
 */


/*
|--------------------------------------------------------------------------
| Generic Helpers
|--------------------------------------------------------------------------
*/


/**
 * Safely convert a value to a finite number.
 */
function toNumber(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return null;
    }

    if (
        typeof value === "number"
    ) {

        return Number.isFinite(value)
            ? value
            : null;

    }

    const numeric =
        Number(value);

    return Number.isFinite(numeric)
        ? numeric
        : null;
}


/**
 * Convert a VRM timestamp to ISO string.
 *
 * Redux state should remain serializable.
 *
 * VRM may provide:
 *
 * - Unix seconds
 * - Unix milliseconds
 * - ISO date strings
 */
function toISOString(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return null;
    }


    const numeric =
        Number(value);


    if (
        Number.isFinite(numeric)
    ) {

        const milliseconds =
            numeric < 10000000000
                ? numeric * 1000
                : numeric;

        const date =
            new Date(milliseconds);

        if (
            !Number.isNaN(
                date.getTime()
            )
        ) {

            return date.toISOString();

        }

    }


    const date =
        new Date(value);


    if (
        !Number.isNaN(
            date.getTime()
        )
    ) {

        return date.toISOString();

    }


    return null;
}


/**
 * Normalize string values.
 */
function normalizeString(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return null;
    }

    const result =
        String(value).trim();

    return result || null;
}


/**
 * Read the first available alias.
 */
function getByAliases(
    source,
    aliases = []
) {

    if (
        !source ||
        typeof source !== "object"
    ) {
        return null;
    }


    for (
        const alias of aliases
    ) {

        const value =
            source?.[alias];


        if (
            value !== undefined &&
            value !== null
        ) {

            return value;

        }

    }


    return null;
}


/*
|--------------------------------------------------------------------------
| Attribute Helpers
|--------------------------------------------------------------------------
*/


/**
 * Extract the actual value from a VRM attribute.
 */
function extractAttributeValue(
    attribute
) {

    if (
        attribute === null ||
        attribute === undefined
    ) {
        return null;
    }


    if (
        typeof attribute !== "object"
    ) {

        return attribute;

    }


    const candidates = [

        attribute.value,

        attribute.numericValue,

        attribute.numeric_value,

        attribute.textValue,

        attribute.text_value

    ];


    for (
        const value of candidates
    ) {

        if (
            value !== undefined &&
            value !== null
        ) {

            return value;

        }

    }


    return null;
}


/**
 * Normalize VRM attribute collection.
 */
function normalizeAttributes(
    attributes
) {

    if (
        !attributes ||
        typeof attributes !== "object"
    ) {

        return {};

    }


    const normalized = {};


    for (
        const [key, attribute]
        of Object.entries(attributes)
    ) {

        if (
            !attribute ||
            typeof attribute !== "object"
        ) {

            normalized[key] = {

                code: key,

                value:
                    attribute,

                timestamp: null

            };

            continue;

        }


        normalized[key] = {

            ...attribute,

            code:
                attribute.code ??
                key,

            value:
                extractAttributeValue(
                    attribute
                ),

            timestamp:
                toISOString(
                    attribute.timestamp
                )

        };

    }


    return normalized;
}


/**
 * Find an attribute using VRM code aliases.
 */
function findAttribute(
    attributes,
    aliases = []
) {

    if (
        !attributes ||
        typeof attributes !== "object"
    ) {

        return null;

    }


    const normalizedAliases =
        aliases.map(
            alias =>
                String(alias)
                    .toLowerCase()
        );


    for (
        const [key, attribute]
        of Object.entries(attributes)
    ) {

        const code =
            attribute?.code ??
            key;


        const normalizedCode =
            String(code)
                .toLowerCase();


        if (
            normalizedAliases.includes(
                normalizedCode
            )
        ) {

            return attribute;

        }

    }


    return null;
}


/**
 * Get numeric VRM attribute.
 */
function getNumericAttribute(
    attributes,
    aliases = []
) {

    const attribute =
        findAttribute(
            attributes,
            aliases
        );


    if (!attribute) {

        return null;

    }


    return toNumber(
        extractAttributeValue(
            attribute
        )
    );
}


/**
 * Get textual VRM attribute.
 */
function getTextAttribute(
    attributes,
    aliases = []
) {

    const attribute =
        findAttribute(
            attributes,
            aliases
        );


    if (!attribute) {

        return null;

    }


    return normalizeString(
        extractAttributeValue(
            attribute
        )
    );
}


/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/


function normalizeStatus(
    source
) {

    const explicitStatus =
        getByAliases(
            source,
            [
                "status",
                "connectionStatus",
                "connection_status"
            ]
        );


    if (
        explicitStatus
    ) {

        return String(
            explicitStatus
        ).toUpperCase();

    }


    if (
        source?.online === true
    ) {

        return "ONLINE";

    }


    if (
        source?.online === false
    ) {

        return "OFFLINE";

    }


    return "UNKNOWN";
}


/*
|--------------------------------------------------------------------------
| Installation Normalization
|--------------------------------------------------------------------------
*/


/**
 * Normalize the VRM installation identity.
 *
 * The result is stored directly in:
 *
 * state.vrm.installation
 */
export function normalizeVRMInstallation(
    response
) {

    if (
        response === null ||
        response === undefined
    ) {

        return null;

    }


    const payload =
        response?.data ??
        response;


    const installation =
        payload?.installation ??
        payload?.data ??
        payload;


    if (
        !installation ||
        typeof installation !== "object"
    ) {

        return null;

    }


    return {

        installationId:
            toNumber(
                installation?.installationId ??
                installation?.installation_id ??
                installation?.id
            ),


        name:
            normalizeString(
                installation?.name ??
                installation?.installationName ??
                installation?.installation_name
            ),


        identifier:
            normalizeString(
                installation?.identifier ??
                installation?.portalId ??
                installation?.portal_id
            ),


        systemType:
            normalizeString(
                installation?.systemType ??
                installation?.system_type
            ),


        firmwareVersion:
            normalizeString(
                installation?.firmwareVersion ??
                installation?.firmware_version
            ),


        timezone:
            normalizeString(
                installation?.timezone ??
                installation?.timeZone
            ),


        location:
            installation?.location ??
            null,


        vrmUrl:
            normalizeString(
                installation?.vrmUrl ??
                installation?.vrmURL ??
                installation?.url
            ),


        status:
            normalizeStatus(
                installation
            ),


        online:
            typeof installation?.online === "boolean"
                ? installation.online
                : null,


        lastSync:
            toISOString(
                installation?.lastSync ??
                installation?.last_sync
            ),


        lastTelemetry:
            toISOString(
                installation?.lastTelemetry ??
                installation?.last_telemetry
            ),


        raw:
            response

    };

}


/*
|--------------------------------------------------------------------------
| Dashboard Normalization
|--------------------------------------------------------------------------
*/


/**
 * Normalize the raw VRM dashboard response.
 *
 * IMPORTANT:
 *
 * Telemetry is deliberately exposed as flat fields because the Redux/UI
 * contract is:
 *
 * dashboard.batterySoc
 * dashboard.batteryPower
 * dashboard.solarPower
 * dashboard.gridPower
 * dashboard.generatorPower
 * dashboard.loadPower
 */
export function normalizeVRMDashboard(
    response
) {

    if (
        response === null ||
        response === undefined
    ) {

        return null;

    }


    const payload =
        response?.data ??
        response;


    const attributes =
        payload?.attributes ??
        payload?.data?.attributes ??
        {};


    const normalizedAttributes =
        normalizeAttributes(
            attributes
        );


    /*
    |--------------------------------------------------------------------------
    | Firmware
    |--------------------------------------------------------------------------
    */

    const firmwareVersion =
        getTextAttribute(
            normalizedAttributes,
            [
                "v"
            ]
        );


    /*
    |--------------------------------------------------------------------------
    | Telemetry
    |--------------------------------------------------------------------------
    |
    | These aliases remain conservative.
    |
    | We do NOT map ambiguous VRM codes such as "bs" to SOC without confirmed
    | metadata.
    |
    |--------------------------------------------------------------------------
    */

    const batterySoc =
        getNumericAttribute(
            normalizedAttributes,
            [
                "soc",
                "battery_soc",
                "batterySoc",
                "battery_soc_percentage"
            ]
        );


    const batteryPower =
        getNumericAttribute(
            normalizedAttributes,
            [
                "battery_power",
                "batteryPower",
                "bat_power"
            ]
        );


    const solarPower =
        getNumericAttribute(
            normalizedAttributes,
            [
                "pv_power",
                "pvPower",
                "solar_power",
                "solarPower"
            ]
        );


    const gridPower =
        getNumericAttribute(
            normalizedAttributes,
            [
                "grid_power",
                "gridPower",
                "ac_grid_power",
                "grid"
            ]
        );


    const generatorPower =
        getNumericAttribute(
            normalizedAttributes,
            [
                "generator_power",
                "generatorPower",
                "genset_power",
                "gensetPower"
            ]
        );


    const loadPower =
        getNumericAttribute(
            normalizedAttributes,
            [
                "load_power",
                "loadPower",
                "ac_load",
                "load"
            ]
        );


    /*
    |--------------------------------------------------------------------------
    | Return
    |--------------------------------------------------------------------------
    */

    return {

        success:
            response?.success ??
            payload?.success ??
            true,


        status:
            normalizeStatus(
                payload
            ),


        online:
            typeof payload?.online === "boolean"
                ? payload.online
                : null,


        connectionStatus:
            normalizeString(
                payload?.connectionStatus ??
                payload?.connection_status
            ),


        timestamp:
            toISOString(
                payload?.timestamp ??
                payload?.lastUpdated ??
                payload?.last_updated
            ),


        devices:
            payload?.devices ??
            payload?.deviceCount ??
            payload?.device_count ??
            null,


        firmwareVersion,


        /*
        |--------------------------------------------------------------------------
        | LIVE TELEMETRY
        |--------------------------------------------------------------------------
        */

        batterySoc,

        batteryPower,

        solarPower,

        gridPower,

        generatorPower,

        loadPower,

        /*
        |--------------------------------------------------------------------------
        | VRM Attributes
        |--------------------------------------------------------------------------
        */

        attributes:
            normalizedAttributes,


        /*
        |--------------------------------------------------------------------------
        | Raw response
        |--------------------------------------------------------------------------
        */

        raw:
            response

    };

}


/*
|--------------------------------------------------------------------------
| Statistics Normalization
|--------------------------------------------------------------------------
*/


/**
 * Normalize VRM historical statistics.
 *
 * We preserve the values exactly as received.
 *
 * No semantic meaning is assigned to statistic columns here.
 */
export function normalizeVRMStatistics(
    response
) {

    if (
        response === null ||
        response === undefined
    ) {

        return null;

    }


    const payload =
        response?.data ??
        response;


    const records =
        payload?.records ??
        payload?.data?.records ??
        {};


    const normalizedRecords = {};


    for (
        const [code, values]
        of Object.entries(records)
    ) {

        if (
            !Array.isArray(values)
        ) {

            normalizedRecords[code] =
                values;

            continue;

        }


        normalizedRecords[code] =
            values.map(
                record => {

                    if (
                        !Array.isArray(record)
                    ) {

                        return record;

                    }


                    const [
                        timestamp,
                        ...seriesValues
                    ] = record;


                    return {

                        timestamp:
                            toISOString(
                                timestamp
                            ),

                        values:
                            seriesValues

                    };

                }
            );

    }


    return {

        success:
            response?.success ??
            payload?.success ??
            true,


        records:
            normalizedRecords,


        rawRecords:
            records,


        raw:
            response

    };

}


/*
|--------------------------------------------------------------------------
| Statistics Series Helper
|--------------------------------------------------------------------------
*/


export function getVRMStatisticsSeries(
    statistics,
    code
) {

    if (
        !statistics ||
        !code
    ) {

        return [];

    }


    const records =
        statistics?.records?.[code] ??
        statistics?.rawRecords?.[code];


    if (
        !Array.isArray(records)
    ) {

        return [];

    }


    return records.map(
        record => {

            if (
                !record ||
                typeof record !== "object"
            ) {

                return record;

            }


            return {

                timestamp:
                    record.timestamp ??
                    null,

                values:
                    Array.isArray(
                        record.values
                    )
                        ? record.values
                        : []

            };

        }
    );

}


/*
|--------------------------------------------------------------------------
| Combined Normalization
|--------------------------------------------------------------------------
*/


/**
 * Build a complete normalized VRM installation object.
 *
 * This helper is useful when the entire VRM dataset needs to be normalized
 * together.
 *
 * Redux does NOT have to store this wrapper.
 */
export function normalizeVRMInstallationData({
    installation = null,
    dashboard = null,
    statistics = null
} = {}) {

    return {

        installation:
            normalizeVRMInstallation(
                installation
            ),


        dashboard:
            normalizeVRMDashboard(
                dashboard
            ),


        statistics:
            normalizeVRMStatistics(
                statistics
            ),


        raw: {

            installation,

            dashboard,

            statistics

        }

    };

}


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {

    normalizeVRMInstallation,

    normalizeVRMDashboard,

    normalizeVRMStatistics,

    getVRMStatisticsSeries,

    normalizeVRMInstallationData

};