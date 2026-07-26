import api from "../../../api/axios";

export function getDashboard() {

    return api.get("/dashboard");

}

export function getDashboardCards() {

    return api.get("/dashboard/cards");

}

export function getDashboardKPIs() {

    return api.get("/dashboard/kpis");

}

export function getDashboardMap() {

    return api.get("/dashboard/map");

}

export function refreshDashboard() {

    return api.post("/dashboard/refresh");

}

export default {

    getDashboard,

    getDashboardCards,

    getDashboardKPIs,

    getDashboardMap,

    refreshDashboard

};