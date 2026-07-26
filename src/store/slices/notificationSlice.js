import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    notifications: [],

    unread: 0

};

const notificationSlice = createSlice({

    name: "notifications",

    initialState,

    reducers: {

        setNotifications(state, action) {

            state.notifications = action.payload;

            state.unread = action.payload.filter(

                n => !n.read

            ).length;

        },

        addNotification(state, action) {

            state.notifications.unshift(

                action.payload

            );

            state.unread++;

        },

        markAllRead(state) {

            state.notifications.forEach(

                n => n.read = true

            );

            state.unread = 0;

        }

    }

});

export const {

    setNotifications,

    addNotification,

    markAllRead

} = notificationSlice.actions;

export default notificationSlice.reducer;