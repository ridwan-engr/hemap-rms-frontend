import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| Roles
|--------------------------------------------------------------------------
*/

export async function getRoles(params = {}) {

    const { data } = await apiClient.get(

        "/roles",

        {

            params

        }

    );

    return data;

}

export async function getRole(roleId) {

    const { data } = await apiClient.get(

        `/roles/${roleId}`

    );

    return data;

}

export async function createRole(payload) {

    const { data } = await apiClient.post(

        "/roles",

        payload

    );

    return data;

}

export async function updateRole(

    roleId,

    payload

) {

    const { data } = await apiClient.put(

        `/roles/${roleId}`,

        payload

    );

    return data;

}

export async function deleteRole(roleId) {

    const { data } = await apiClient.delete(

        `/roles/${roleId}`

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export async function getRoleSummary() {

    const { data } = await apiClient.get(

        "/roles/summary"

    );

    return data;

}

export async function getRoleStatistics() {

    const { data } = await apiClient.get(

        "/roles/statistics"

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Permissions
|--------------------------------------------------------------------------
*/

export async function getAvailablePermissions() {

    const { data } = await apiClient.get(

        "/roles/permissions"

    );

    return data;

}