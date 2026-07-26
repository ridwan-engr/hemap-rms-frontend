import { Component } from "react";

import {

    Alert,

    AlertTitle,

    Button,

    Stack

} from "@mui/material";

export default class ErrorBoundary extends Component {

    constructor(props) {

        super(props);

        this.state = {

            hasError: false,

            error: null

        };

    }

    static getDerivedStateFromError(error) {

        return {

            hasError: true,

            error

        };

    }

    componentDidCatch(error, info) {

        console.error(error, info);

    }

    handleReload = () => {

        window.location.reload();

    };

    render() {

        if (this.state.hasError) {

            return (

                <Stack

                    sx={{

                        p: 4

                    }}

                >

                    <Alert severity="error">

                        <AlertTitle>

                            Unexpected Error

                        </AlertTitle>

                        {this.state.error?.message}

                        <br />

                        <Button

                            sx={{ mt: 2 }}

                            onClick={this.handleReload}

                        >

                            Reload

                        </Button>

                    </Alert>

                </Stack>

            );

        }

        return this.props.children;

    }

}