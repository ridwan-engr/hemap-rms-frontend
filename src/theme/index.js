import { createTheme } from "@mui/material/styles";

import palette from "./palette";

import typography from "./typography";

import shadows from "./shadows";

import components from "./components";

export const createAppTheme = (

    mode = "light"

) =>

    createTheme({

        palette: palette(mode),

        typography,

        shadows,

        components,

        shape: {

            borderRadius: 12

        }

    });

export default createAppTheme;