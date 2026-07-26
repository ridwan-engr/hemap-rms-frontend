import { Outlet } from "react-router-dom";

import "./auth.css";

export default function AuthLayout() {

    return (

        <div className="auth-container">

            <div className="auth-card">

                <Outlet />

            </div>

        </div>

    );

}