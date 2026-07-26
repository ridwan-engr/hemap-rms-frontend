import {

    Grid,

    Stack,

    Typography

} from "@mui/material";

import ActiveAlarmCard from "../components/ActiveAlarmCard";

import AlarmStatistics from "../components/AlarmStatistics";

import AlarmSeverityChart from "../components/AlarmSeverityChart";

import AlarmTrendChart from "../components/AlarmTrendChart";

import AlarmFilter from "../components/AlarmFilter";

import AlarmTable from "../components/AlarmTable";

/*
|--------------------------------------------------------------------------
| Alarm Page
|--------------------------------------------------------------------------
|
| Main Alarm Management dashboard.
|
| Features
| • Active alarms
| • Alarm statistics
| • Alarm severity distribution
| • Alarm trend analysis
| • Alarm filtering
| • Alarm history
|
*/

export default function AlarmPage() {

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

                <Grid

                    size={{

                        xs: 12,

                        lg: 4

                    }}

                >

                    <ActiveAlarmCard />

                </Grid>

                <Grid

                    size={{

                        xs: 12,

                        lg: 8

                    }}

                >

                    <AlarmStatistics />

                </Grid>

                <Grid

                    size={{

                        xs: 12,

                        lg: 6

                    }}

                >

                    <AlarmSeverityChart />

                </Grid>

                <Grid

                    size={{

                        xs: 12,

                        lg: 6

                    }}

                >

                    <AlarmTrendChart />

                </Grid>

                <Grid size={12}>

                    <AlarmTable />

                </Grid>

            </Grid>

        </Stack>

    );

}