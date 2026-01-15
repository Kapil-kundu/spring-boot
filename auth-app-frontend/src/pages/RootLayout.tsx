import React from "react";
import type { Root } from "react-day-picker";
import { Outlet } from "react-router";
import Navbar from "../components/ui/Navbar";

function RootLayout() {
    return (
        <div>
            <Navbar/>
            <Outlet />
        </div>
    );
}

export default RootLayout;