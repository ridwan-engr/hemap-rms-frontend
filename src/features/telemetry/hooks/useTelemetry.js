import { useCallback, useEffect, useState } from "react";

import {

    getLiveTelemetry,

    getTelemetryKPIs,

    getTelemetryAlarms

} from "../api/telemetryApi";

export default function useTelemetry(filters = {}) {

    const [telemetry, setTelemetry] = useState(null);

    const [kpis, setKPIs] = useState(null);

    const [alarms, setAlarms] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const loadTelemetry = useCallback(async () => {

        try {

            setLoading(true);

            const [

                telemetryRes,

                kpiRes,

                alarmRes

            ] = await Promise.all([

                getLiveTelemetry(filters),

                getTelemetryKPIs(),

                getTelemetryAlarms()

            ]);

            setTelemetry(telemetryRes.data.data);

            setKPIs(kpiRes.data.data);

            setAlarms(alarmRes.data.data);

        }

        catch (err) {

            setError(

                err.response?.data ||

                err.message

            );

        }

        finally {

            setLoading(false);

        }

    }, [filters]);

    useEffect(() => {

        loadTelemetry();

    }, [loadTelemetry]);

    return {

        telemetry,

        kpis,

        alarms,

        loading,

        error,

        reload: loadTelemetry

    };

}