const components = {

    MuiButton: {

        styleOverrides: {

            root: {

                borderRadius: 10,

                paddingLeft: 18,

                paddingRight: 18

            }

        }

    },

    MuiCard: {

        styleOverrides: {

            root: {

                borderRadius: 16

            }

        }

    },

    MuiPaper: {

        styleOverrides: {

            root: {

                borderRadius: 14

            }

        }

    },

    MuiTextField: {

        defaultProps: {

            fullWidth: true,

            variant: "outlined"

        }

    }

};

export default components;