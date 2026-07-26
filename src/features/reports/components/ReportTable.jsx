import {

    Card,
    CardContent,
    Typography,
    Chip

} from "@mui/material";

import {

    DataGrid

} from "@mui/x-data-grid";

import useReports from "../hooks/useReports";

/*
|--------------------------------------------------------------------------
| Report Table
|--------------------------------------------------------------------------
*/

export default function ReportTable() {

    const {

        report,

        loading

    } = useReports();

    if (!report?.summary) {

        return null;

    }

    /*
    |--------------------------------------------------------------------------
    | Rows
    |--------------------------------------------------------------------------
    */

    const rows = [

        {
            id: 1,
            metric: "Total Solar Energy",
            value: report.summary.totalSolarEnergy,
            unit: "kWh",
            category: "Energy"
        },

        {
            id: 2,
            metric: "Total Grid Energy",
            value: report.summary.totalGridEnergy,
            unit: "kWh",
            category: "Energy"
        },

        {
            id: 3,
            metric: "Total Generator Energy",
            value: report.summary.totalGeneratorEnergy,
            unit: "kWh",
            category: "Energy"
        },

        {
            id: 4,
            metric: "Battery Efficiency",
            value: report.summary.batteryEfficiency,
            unit: "%",
            category: "Battery"
        },

        {
            id: 5,
            metric: "Renewable Fraction",
            value: report.summary.renewableFraction,
            unit: "%",
            category: "Renewable"
        },

        {
            id: 6,
            metric: "Generator Runtime",
            value: report.summary.generatorRuntime,
            unit: "hrs",
            category: "Generator"
        },

        {
            id: 7,
            metric: "Alarms",
            value: report.summary.alarms,
            unit: "",
            category: "Alarm"
        },

        {
            id: 8,
            metric: "SAIDI",
            value: report.summary.saidi,
            unit: "hrs",
            category: "Reliability"
        },

        {
            id: 9,
            metric: "SAIFI",
            value: report.summary.saifi,
            unit: "",
            category: "Reliability"
        },

        {
            id: 10,
            metric: "ENS",
            value: report.summary.ens,
            unit: "kWh",
            category: "Reliability"
        },

        {
            id: 11,
            metric: "LOLP",
            value: report.summary.lolp,
            unit: "%",
            category: "Reliability"
        },

        {
            id: 12,
            metric: "Resilience",
            value: report.summary.resilience,
            unit: "%",
            category: "Reliability"
        }

    ];

    /*
    |--------------------------------------------------------------------------
    | Columns
    |--------------------------------------------------------------------------
    */

    const columns = [

        {

            field: "metric",

            headerName: "Metric",

            flex: 2,

            minWidth: 220

        },

        {

            field: "value",

            headerName: "Value",

            flex: 1,

            minWidth: 120,

            type: "number"

        },

        {

            field: "unit",

            headerName: "Unit",

            width: 100

        },

        {

            field: "category",

            headerName: "Category",

            width: 150,

            renderCell: ({ value }) => (

                <Chip

                    label={value}

                    color="primary"

                    size="small"

                    variant="outlined"

                />

            )

        }

    ];

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    gutterBottom

                >

                    Report Details

                </Typography>

                <DataGrid

                    autoHeight

                    rows={rows}

                    columns={columns}

                    loading={loading}

                    disableRowSelectionOnClick

                    pageSizeOptions={[

                        10,

                        25,

                        50

                    ]}

                    initialState={{

                        pagination: {

                            paginationModel: {

                                page: 0,

                                pageSize: 10

                            }

                        }

                    }}

                />

            </CardContent>

        </Card>

    );

}