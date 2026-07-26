import {
    Alert,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";

import {
    CheckCircle,
    Warning,
    Error,
    Info
} from "@mui/icons-material";

import useOptimization from "../hooks/useOptimization";

/*
|--------------------------------------------------------------------------
| Severity Icon
|--------------------------------------------------------------------------
*/

function SeverityIcon({ severity }) {

    switch (severity) {

        case "critical":

            return <Error color="error" />;

        case "warning":

            return <Warning color="warning" />;

        case "success":

            return <CheckCircle color="success" />;

        default:

            return <Info color="info" />;

    }

}

/*
|--------------------------------------------------------------------------
| Recommendation Color
|--------------------------------------------------------------------------
*/

function RecommendationColor(severity) {

    switch (severity) {

        case "critical":

            return "error";

        case "warning":

            return "warning";

        case "success":

            return "success";

        default:

            return "info";

    }

}

/*
|--------------------------------------------------------------------------
| Optimization Recommendations
|--------------------------------------------------------------------------
*/

export default function OptimizationRecommendations({

    siteId

}) {

    const {

        recommendations,

        loading,

        error

    } = useOptimization({

        siteId

    });

    if (loading) {

        return (

            <Card>

                <CardContent>

                    <Stack

                        justifyContent="center"

                        alignItems="center"

                        sx={{

                            minHeight: 250

                        }}

                    >

                        <CircularProgress />

                    </Stack>

                </CardContent>

            </Card>

        );

    }

    if (error) {

        return (

            <Alert severity="error">

                {error}

            </Alert>

        );

    }

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    fontWeight={700}

                >

                    Optimization Recommendations

                </Typography>

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    AI-assisted operational recommendations generated from
                    optimization, forecasting and reliability analytics.

                </Typography>

                <Divider sx={{ my: 2 }} />

                <List>

                    {

                        recommendations?.map((item) => (

                            <ListItem

                                key={item.id}

                                alignItems="flex-start"

                                divider

                            >

                                <ListItemIcon>

                                    <SeverityIcon

                                        severity={item.severity}

                                    />

                                </ListItemIcon>

                                <ListItemText

                                    primary={

                                        <Stack

                                            direction="row"

                                            spacing={1}

                                            alignItems="center"

                                        >

                                            <Typography
                                                fontWeight={600}
                                            >

                                                {item.title}

                                            </Typography>

                                            <Chip

                                                size="small"

                                                color={RecommendationColor(
                                                    item.severity
                                                )}

                                                label={item.category}

                                            />

                                        </Stack>

                                    }

                                    secondary={

                                        <>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mt: 1
                                                }}
                                            >

                                                {item.description}

                                            </Typography>

                                            {

                                                item.expectedBenefit && (

                                                    <Typography

                                                        variant="caption"

                                                        display="block"

                                                        sx={{
                                                            mt: 1
                                                        }}

                                                    >

                                                        Expected Benefit:

                                                        {" "}

                                                        {

                                                            item.expectedBenefit

                                                        }

                                                    </Typography>

                                                )

                                            }

                                        </>

                                    }

                                />

                            </ListItem>

                        ))

                    }

                </List>

            </CardContent>

        </Card>

    );

}