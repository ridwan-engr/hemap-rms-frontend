import {

    Box,

    Typography,

    Stack

} from "@mui/material";

export default function PageContainer({

    title,

    subtitle,

    actions,

    children

}) {

    return (

        <Box>

            <Stack

                direction="row"

                justifyContent="space-between"

                alignItems="center"

                mb={4}

            >

                <Box>

                    <Typography

                        variant="h4"

                        fontWeight={700}

                    >

                        {title}

                    </Typography>

                    {

                        subtitle && (

                            <Typography

                                color="text.secondary"

                            >

                                {subtitle}

                            </Typography>

                        )

                    }

                </Box>

                {actions}

            </Stack>

            {children}

        </Box>

    );

}