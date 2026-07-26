const palette = (mode = "light") => ({

    mode,

    ...(mode === "light"

        ? {

            primary: {

                main: "#1565C0",

                light: "#5E92F3",

                dark: "#003C8F"

            },

            secondary: {

                main: "#2E7D32"

            },

            background: {

                default: "#F5F7FA",

                paper: "#FFFFFF"

            },

            text: {

                primary: "#1F2937",

                secondary: "#6B7280"

            },

            success: {

                main: "#2E7D32"

            },

            warning: {

                main: "#ED6C02"

            },

            error: {

                main: "#D32F2F"

            },

            info: {

                main: "#0288D1"

            }

        }

        : {

            primary: {

                main: "#42A5F5"

            },

            secondary: {

                main: "#66BB6A"

            },

            background: {

                default: "#121212",

                paper: "#1E1E1E"

            },

            text: {

                primary: "#FFFFFF",

                secondary: "#BDBDBD"

            },

            success: {

                main: "#66BB6A"

            },

            warning: {

                main: "#FFA726"

            },

            error: {

                main: "#EF5350"

            },

            info: {

                main: "#29B6F6"

            }

        })

});

export default palette;