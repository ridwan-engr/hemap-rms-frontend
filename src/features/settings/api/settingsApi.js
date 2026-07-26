import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| Get Settings
|--------------------------------------------------------------------------
*/

export async function getSettings() {

    const { data } = await apiClient.get(

        "/settings"

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Get Setting
|--------------------------------------------------------------------------
*/

export async function getSetting(settingId) {

    const { data } = await apiClient.get(

        `/settings/${settingId}`

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Get By Key
|--------------------------------------------------------------------------
*/

export async function getSettingByKey(key) {

    const { data } = await apiClient.get(

        `/settings/key/${key}`

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

export async function createSetting(payload) {

    const { data } = await apiClient.post(

        "/settings",

        payload

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export async function updateSetting(

    settingId,

    payload

) {

    const { data } = await apiClient.put(

        `/settings/${settingId}`,

        payload

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Update By Key
|--------------------------------------------------------------------------
*/

export async function updateSettingByKey(

    key,

    payload

) {

    const { data } = await apiClient.put(

        `/settings/key/${key}`,

        payload

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

export async function deleteSetting(settingId) {

    const { data } = await apiClient.delete(

        `/settings/${settingId}`

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Initialize Defaults
|--------------------------------------------------------------------------
*/

export async function initializeDefaults() {

    const { data } = await apiClient.post(

        "/settings/initialize"

    );

    return data;

}