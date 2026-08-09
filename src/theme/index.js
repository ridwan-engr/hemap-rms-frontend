import { createTheme } from "@mui/material/styles";

import palette from "./palette.js";

import typography from "./typography.js";

import shadows from "./shadows.js";

import components from "./components.js";

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