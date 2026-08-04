import { useState } from "react";

import {

    Card,
    CardContent,

    Grid,

    TextField,

    MenuItem,

    Button,

    Stack

} from "@mui/material";

import useReports from "../hooks/useReports.js";

import useSites from "../../sites/hooks/useSites.js";

/*
|--------------------------------------------------------------------------
| Report Types
|--------------------------------------------------------------------------
*/

const REPORT_TYPES = [

    {
        label: "Site Overview",
        value: "SITE_OVERVIEW"
    },

    {
        label: "Energy",
        value: "ENERGY"
    },

    {
        label: "Battery",
        value: "BATTERY"
    },

    {
        label: "Reliability",
        value: "RELIABILITY"
    },

    {
        label: "Alarm",
        value: "ALARM"
    },

    {
        label: "Maintenance",
        value: "MAINTENANCE"
    },

    {
        label: "Dashboard",
        value: "DASHBOARD"
    },

    {
        label: "Executive",
        value: "EXECUTIVE"
    }

];

const PERIODS = [

    "DAILY",

    "WEEKLY",

    "MONTHLY",

    "YEARLY",

    "CUSTOM"

];

/*
|--------------------------------------------------------------------------
| Report Filter
|--------------------------------------------------------------------------
*/

export default function ReportFilter() {

    const {

        sites,

        reload

    } = useSites();

    useEffect(() => {

        reload();

    }, [

        reload

    ]);

    const {

        generateSiteOverview,

        generateEnergy,

        generateBattery,

        generateReliability,

        generateAlarm,

        generateMaintenance,

        generateDashboard,

        generateExecutive,

        loading

    } = useReports();

    const [

        filters,

        setFilters

    ] = useState({

        reportType: "ENERGY",

        period: "MONTHLY",

        siteId: "",

        periodStart: "",

        periodEnd: ""

    });

    /*
    |--------------------------------------------------------------------------
    | Change
    |--------------------------------------------------------------------------
    */

    const handleChange = event => {

        const {

            name,

            value

        } = event.target;

        setFilters(previous => ({

            ...previous,

            [name]: value

        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Generate
    |--------------------------------------------------------------------------
    */

    const handleGenerate = () => {

        const payload = {

            siteId: filters.siteId,

            reportType: filters.period,

            periodStart: filters.periodStart,

            periodEnd: filters.periodEnd

        };

        switch (

        filters.reportType

        ) {

            case "SITE_OVERVIEW":

                generateSiteOverview(payload);

                break;

            case "ENERGY":

                generateEnergy(payload);

                break;

            case "BATTERY":

                generateBattery(payload);

                break;

            case "RELIABILITY":

                generateReliability(payload);

                break;

            case "ALARM":

                generateAlarm(payload);

                break;

            case "MAINTENANCE":

                generateMaintenance(payload);

                break;

            case "DASHBOARD":

                generateDashboard(payload);

                break;

            case "EXECUTIVE":

                generateExecutive(payload);

                break;

            default:

                break;

        }

    };

    return (

        <Card>

            <CardContent>

                <Grid

                    container

                    spacing={2}

                >

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField

                            fullWidth

                            select

                            label="Report"

                            name="reportType"

                            value={filters.reportType}

                            onChange={handleChange}

                        >

                            {

                                REPORT_TYPES.map(report => (

                                    <MenuItem

                                        key={report.value}

                                        value={report.value}

                                    >

                                        {report.label}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField

                            fullWidth

                            select

                            label="Site"

                            name="siteId"

                            value={filters.siteId}

                            onChange={handleChange}

                        >

                            {

                                sites.map(site => (

                                    <MenuItem

                                        key={site._id}

                                        value={site._id}

                                    >

                                        {site.name}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 2 }}>

                        <TextField

                            fullWidth

                            select

                            label="Period"

                            name="period"

                            value={filters.period}

                            onChange={handleChange}

                        >

                            {

                                PERIODS.map(period => (

                                    <MenuItem

                                        key={period}

                                        value={period}

                                    >

                                        {period}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 2 }}>

                        <TextField

                            fullWidth

                            type="date"

                            label="Start"

                            name="periodStart"

                            value={filters.periodStart}

                            onChange={handleChange}

                            InputLabelProps={{

                                shrink: true

                            }}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 2 }}>

                        <TextField

                            fullWidth

                            type="date"

                            label="End"

                            name="periodEnd"

                            value={filters.periodEnd}

                            onChange={handleChange}

                            InputLabelProps={{

                                shrink: true

                            }}

                        />

                    </Grid>

                    <Grid

                        size={{ xs: 12 }}

                    >

                        <Stack

                            direction="row"

                            justifyContent="flex-end"

                        >

                            <Button

                                variant="contained"

                                onClick={handleGenerate}

                                disabled={loading}

                            >

                                Generate Report

                            </Button>

                        </Stack>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}