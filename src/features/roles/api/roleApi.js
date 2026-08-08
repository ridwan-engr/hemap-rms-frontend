import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| Role API
|--------------------------------------------------------------------------
|
| Backend contract:
|
| GET    /roles
| GET    /roles/:id
| POST   /roles
| PUT    /roles/:id
| DELETE /roles/:id
|
| All routes require authentication.
| All routes require ADMIN authorization.
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Get All Roles
|--------------------------------------------------------------------------
*/

export async function getRoles(
    params = {}
) {

    const { data } = await apiClient.get(
        "/roles",
        {
            params
        }
    );

    return data?.data ?? data;
}


/*
|--------------------------------------------------------------------------
| Get Single Role
|--------------------------------------------------------------------------
*/

export async function getRole(
    roleId
) {

    const { data } = await apiClient.get(
        `/roles/${roleId}`
    );

    return data?.data ?? data;
}


/*
|--------------------------------------------------------------------------
| Create Role
|--------------------------------------------------------------------------
*/

export async function createRole(
    payload
) {

    const { data } = await apiClient.post(
        "/roles",
        payload
    );

    return data?.data ?? data;
}


/*
|--------------------------------------------------------------------------
| Update Role
|--------------------------------------------------------------------------
*/

export async function updateRole(
    roleId,
    payload
) {

    const { data } = await apiClient.put(
        `/roles/${roleId}`,
        payload
    );

    return data?.data ?? data;
}


/*
|--------------------------------------------------------------------------
| Delete Role
|--------------------------------------------------------------------------
*/

export async function deleteRole(
    roleId
) {

    const { data } = await apiClient.delete(
        `/roles/${roleId}`
    );

    return data?.data ?? data;
}


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {

    getRoles,

    getRole,

    createRole,

    updateRole,

    deleteRole

};