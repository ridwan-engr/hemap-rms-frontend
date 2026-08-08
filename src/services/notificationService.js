import apiClient from "./api/apiClient";

/*
|--------------------------------------------------------------------------
| Get Notifications
|--------------------------------------------------------------------------
*/

export async function getNotifications(params = {}) {

    const response = await apiClient.get(
        "/notifications",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Notification
|--------------------------------------------------------------------------
*/

export async function getNotification(id) {

    const response = await apiClient.get(
        `/notifications/${id}`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Unread Notifications
|--------------------------------------------------------------------------
*/

export async function getUnreadNotifications() {

    const response = await apiClient.get(
        "/notifications/unread"
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Mark As Read
|--------------------------------------------------------------------------
*/

export async function markAsRead(id) {

    const response = await apiClient.patch(
        `/notifications/${id}/read`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Mark All As Read
|--------------------------------------------------------------------------
*/

export async function markAllAsRead() {

    const response = await apiClient.patch(
        "/notifications/read-all"
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Delete Notification
|--------------------------------------------------------------------------
*/

export async function deleteNotification(id) {

    const response = await apiClient.delete(
        `/notifications/${id}`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Delete All Notifications
|--------------------------------------------------------------------------
*/

export async function deleteAllNotifications() {

    const response = await apiClient.delete(
        "/notifications"
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Notification Preferences
|--------------------------------------------------------------------------
*/

export async function getPreferences() {

    const response = await apiClient.get(
        "/notifications/preferences"
    );

    return response.data;

}

export async function updatePreferences(payload) {

    const response = await apiClient.put(
        "/notifications/preferences",
        payload
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Create Notification (Admin)
|--------------------------------------------------------------------------
*/

export async function createNotification(payload) {

    const response = await apiClient.post(
        "/notifications",
        payload
    );

    return response.data;

}

export default {

    getNotifications,

    getNotification,

    getUnreadNotifications,

    markAsRead,

    markAllAsRead,

    deleteNotification,

    deleteAllNotifications,

    getPreferences,

    updatePreferences,

    createNotification

};