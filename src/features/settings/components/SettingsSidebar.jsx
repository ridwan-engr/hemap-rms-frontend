import {

    Card,
    CardContent,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    Divider

} from "@mui/material";

import useSettings from "../hooks/useSettings";

/*
|--------------------------------------------------------------------------
| Default Categories
|--------------------------------------------------------------------------
*/

const DEFAULT_CATEGORIES = [

    "ALL",

    "SYSTEM",

    "DATABASE",

    "VRM",

    "SECURITY",

    "MAIL",

    "OPTIMIZATION",

    "NOTIFICATION"

];

/*
|--------------------------------------------------------------------------
| Settings Sidebar
|--------------------------------------------------------------------------
*/

export default function SettingsSidebar() {

    const {

        settings,

        category,

        updateCategory

    } = useSettings();

    /*
    |--------------------------------------------------------------------------
    | Categories
    |--------------------------------------------------------------------------
    */

    const categories = [

        ...new Set([

            ...DEFAULT_CATEGORIES,

            ...settings.map(

                setting => setting.category

            )

        ])

    ];

    return (

        <Card>

            <CardContent sx={{ p: 0 }}>

                <Typography

                    variant="h6"

                    sx={{

                        p: 2,

                        fontWeight: 700

                    }}

                >

                    Categories

                </Typography>

                <Divider />

                <List disablePadding>

                    {

                        categories.map(item => (

                            <ListItemButton

                                key={item}

                                selected={

                                    category === item

                                }

                                onClick={() =>

                                    updateCategory(item)

                                }

                            >

                                <ListItemText

                                    primary={item}

                                />

                            </ListItemButton>

                        ))

                    }

                </List>

            </CardContent>

        </Card>

    );

}