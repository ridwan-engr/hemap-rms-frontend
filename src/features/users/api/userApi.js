import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| User API
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Get All Users
|--------------------------------------------------------------------------
*/

/**
 * Backend:
 * GET /users
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function getUsers(params = {}) {

    const response = await apiClient.get(
        "/users",
        {
            params
        }
    );

    return response.data?.data ?? response.data;

}


/*
|--------------------------------------------------------------------------
| Get User By ID
|--------------------------------------------------------------------------
*/

/**
 * Backend:
 * GET /users/:id
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function getUserById(userId) {

    const response = await apiClient.get(
        `/users/${userId}`
    );

    return response.data?.data ?? response.data;

}


/*
|--------------------------------------------------------------------------
| Create User
|--------------------------------------------------------------------------
*/

/**
 * Backend:
 * POST /users
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function createUser(payload) {

    const response = await apiClient.post(
        "/users",
        payload
    );

    return response.data?.data ?? response.data;

}


/*
|--------------------------------------------------------------------------
| Update User
|--------------------------------------------------------------------------
*/

/**
 * Backend:
 * PUT /users/:id
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function updateUser(
    userId,
    payload
) {

    const response = await apiClient.put(
        `/users/${userId}`,
        payload
    );

    return response.data?.data ?? response.data;

}


/*
|--------------------------------------------------------------------------
| Activate User
|--------------------------------------------------------------------------
*/

/**
 * Backend:
 * PATCH /users/:id/activate
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function activateUser(userId) {

    const response = await apiClient.patch(
        `/users/${userId}/activate`
    );

    return response.data?.data ?? response.data;

}


/*
|--------------------------------------------------------------------------
| Deactivate User
|--------------------------------------------------------------------------
*/

/**
 * Backend:
 * PATCH /users/:id/deactivate
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function deactivateUser(userId) {

    const response = await apiClient.patch(
        `/users/${userId}/deactivate`
    );

    return response.data?.data ?? response.data;

}


/*
|--------------------------------------------------------------------------
| Delete User
|--------------------------------------------------------------------------
*/

/**
 * Backend:
 * DELETE /users/:id
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function deleteUser(userId) {

    const response = await apiClient.delete(
        `/users/${userId}`
    );

    return response.data?.data ?? response.data;

}


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {

    getUsers,

    getUserById,

    createUser,

    updateUser,

    activateUser,

    deactivateUser,

    deleteUser

};