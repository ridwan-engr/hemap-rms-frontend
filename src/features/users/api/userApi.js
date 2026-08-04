import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| User API
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

export async function getUsers(params = {}) {

    const { data } = await apiClient.get(

        "/users",

        {

            params

        }

    );

    return data;

}

export async function getUserById(userId) {

    const { data } = await apiClient.get(

        `/users/${userId}`

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Dashboard Data
|--------------------------------------------------------------------------
*/

export async function getUserSummary() {

    const { data } = await apiClient.get(

        "/users/summary"

    );

    return data;

}

export async function getUserStatistics() {

    const { data } = await apiClient.get(

        "/users/statistics"

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| CRUD
|--------------------------------------------------------------------------
*/

export async function createUser(payload) {

    const { data } = await apiClient.post(

        "/users",

        payload

    );

    return data;

}

export async function updateUser(

    userId,

    payload

) {

    const { data } = await apiClient.put(

        `/users/${userId}`,

        payload

    );

    return data;

}

export async function deleteUser(userId) {

    const { data } = await apiClient.delete(

        `/users/${userId}`

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Refresh
|--------------------------------------------------------------------------
*/

export async function refreshUsers() {

    const { data } = await apiClient.post(

        "/users/refresh"

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Lookups
|--------------------------------------------------------------------------
*/

export async function getRoles() {

    const { data } = await apiClient.get(

        "/users/roles"

    );

    return data;

}

export async function getSites() {

    const { data } = await apiClient.get(

        "/users/sites"

    );

    return data;

}