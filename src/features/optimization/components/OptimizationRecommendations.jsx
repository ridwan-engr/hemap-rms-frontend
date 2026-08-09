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
    Error as ErrorIcon,
    Info
} from "@mui/icons-material";

import useOptimization from "../hooks/useOptimization.js";

/*
|--------------------------------------------------------------------------
| Severity Icon
|--------------------------------------------------------------------------
*/

function SeverityIcon({ severity }) {

    const normalizedSeverity =
        String(severity || "").toLowerCase();

    switch (normalizedSeverity) {

        case "critical":

            return (
                <ErrorIcon color="error" />
            );

        case "warning":

            return (
                <Warning color="warning" />
            );

        case "success":

            return (
                <CheckCircle color="success" />
            );

        default:

            return (
                <Info color="info" />
            );
    }
}

/*
|--------------------------------------------------------------------------
| Recommendation Color
|--------------------------------------------------------------------------
*/

function recommendationColor(severity) {

    const normalizedSeverity =
        String(severity || "").toLowerCase();

    switch (normalizedSeverity) {

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

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (
            <Alert severity="error">

                {typeof error === "string"
                    ? error
                    : error?.message ||
                      "Unable to load optimization recommendations."
                }

            </Alert>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Normalize Recommendations
    |--------------------------------------------------------------------------
    */

    const items =
        Array.isArray(recommendations)
            ? recommendations
            : Array.isArray(recommendations?.data)
                ? recommendations.data
                : Array.isArray(recommendations?.recommendations)
                    ? recommendations.recommendations
                    : [];

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (!items.length) {

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
                        sx={{
                            mt: 1
                        }}
                    >
                        No optimization recommendations are currently
                        available.
                    </Typography>

                </CardContent>

            </Card>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

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
                    AI-assisted operational recommendations generated
                    from optimization, forecasting and reliability
                    analytics.
                </Typography>

                <Divider
                    sx={{
                        my: 2
                    }}
                />

                <List>

                    {items.map((item, index) => {

                        const severity =
                            String(
                                item?.severity || "info"
                            ).toLowerCase();

                        const key =
                            item?.id ||
                            item?._id ||
                            `${item?.title || "recommendation"}-${index}`;

                        return (
                            <ListItem
                                key={key}
                                alignItems="flex-start"
                                divider={
                                    index < items.length - 1
                                }
                            >

                                <ListItemIcon>

                                    <SeverityIcon
                                        severity={severity}
                                    />

                                </ListItemIcon>

                                <ListItemText

                                    primary={
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{
                                                alignItems: "center",
                                                flexWrap: "wrap"
                                            }}
                                        >

                                            <Typography
                                                fontWeight={600}
                                            >
                                                {
                                                    item?.title ||
                                                    "Optimization Recommendation"
                                                }
                                            </Typography>

                                            {item?.category && (

                                                <Chip
                                                    size="small"
                                                    color={
                                                        recommendationColor(
                                                            severity
                                                        )
                                                    }
                                                    label={
                                                        item.category
                                                    }
                                                />

                                            )}

                                        </Stack>
                                    }

                                    secondary={
                                        <>
                                            {item?.description && (

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        mt: 1
                                                    }}
                                                >
                                                    {
                                                        item.description
                                                    }
                                                </Typography>

                                            )}

                                            {item?.expectedBenefit && (

                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                    sx={{
                                                        mt: 1
                                                    }}
                                                >
                                                    Expected Benefit:{" "}
                                                    {
                                                        item.expectedBenefit
                                                    }
                                                </Typography>

                                            )}
                                        </>
                                    }

                                />

                            </ListItem>
                        );
                    })}

                </List>

            </CardContent>

        </Card>
    );
}