import axios from "axios";

/*
|--------------------------------------------------------------------------
| API Configuration
|--------------------------------------------------------------------------
|
| All HTTP requests in the application use this Axios instance.
| Base URL and timeout are configured here.
|
*/

const apiClient = axios.create({

    baseURL:

        import.meta.env.VITE_API_BASE_URL ||

        "http://localhost:3101/api",

    timeout: 30000,

    headers: {

        "Content-Type": "application/json"

    }

});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/

apiClient.interceptors.request.use(

    config => {

        const token =

            localStorage.getItem("accessToken");

        if (token) {

            config.headers.Authorization =

                `Bearer ${token}`;

        }

        return config;

    },

    error => Promise.reject(error)

);

/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
*/

apiClient.interceptors.response.use(

    response => response,

    error => {

        /*
        --------------------------------------------------------------
        | Authentication
        --------------------------------------------------------------
        */

        if (

            error.response?.status === 401

        ) {

            console.warn(

                "Unauthorized request."

            );

            /*
             * Future enhancement:
             *
             * Refresh access token automatically.
             * Redirect to login when refresh fails.
             */

        }

        /*
        --------------------------------------------------------------
        | Forbidden
        --------------------------------------------------------------
        */

        if (

            error.response?.status === 403

        ) {

            console.warn(

                "Access denied."

            );

        }

        /*
        --------------------------------------------------------------
        | Internal Server Error
        --------------------------------------------------------------
        */

        if (

            error.response?.status >= 500

        ) {

            console.error(

                "Server error.",

                error.response

            );

        }

        return Promise.reject(error);

    }

);

export default apiClient;