import {
    Grid,
    Stack,
    Typography
} from "@mui/material";

import {
    useEffect
} from "react";

import useAlarm from "../hooks/useAlarm.js";

import ActiveAlarmCard from "../components/ActiveAlarmCard.jsx";
import AlarmStatistics from "../components/AlarmStatistics.jsx";
import AlarmSeverityChart from "../components/AlarmSeverityChart.jsx";
import AlarmTrendChart from "../components/AlarmTrendChart.jsx";
import AlarmFilter from "../components/AlarmFilter.jsx";
import AlarmTable from "../components/AlarmTable.jsx";

export default function AlarmPage() {

    const {
        loadActiveAlarms,
        loadAlarmHistory,
        loadAlarmStatistics,
        loadAlarmSummary,
        filters,
        paginationModel
    } = useAlarm();

    useEffect(() => {

        const params = {
            ...filters,

            page:
                paginationModel.page + 1,

            limit:
                paginationModel.pageSize
        };

        loadActiveAlarms(params);

        loadAlarmHistory(params);

        loadAlarmStatistics(filters);

        loadAlarmSummary(filters);

    }, [
        loadActiveAlarms,
        loadAlarmHistory,
        loadAlarmStatistics,
        loadAlarmSummary,
        filters,
        paginationModel.page,
        paginationModel.pageSize
    ]);

    return (
        <Stack spacing={3}>

            <Typography
                variant="h4"
                fontWeight={700}
            >
                Alarm Management
            </Typography>

            <AlarmFilter />

            <Grid
                container
                spacing={3}
            >

                {/* Active Alarms */}

                <Grid
                    size={{
                        xs: 12,
                        lg: 4
                    }}
                >
                    <ActiveAlarmCard />
                </Grid>

                {/* Statistics */}

                <Grid
                    size={{
                        xs: 12,
                        lg: 8
                    }}
                >
                    <AlarmStatistics />
                </Grid>

                {/* Severity */}

                <Grid
                    size={{
                        xs: 12,
                        lg: 6
                    }}
                >
                    <AlarmSeverityChart />
                </Grid>

                {/* Trend */}

                <Grid
                    size={{
                        xs: 12,
                        lg: 6
                    }}
                >
                    <AlarmTrendChart />
                </Grid>

                {/* Alarm Table */}

                <Grid
                    size={{
                        xs: 12
                    }}
                >
                    <AlarmTable />
                </Grid>

            </Grid>

        </Stack>
    );
}