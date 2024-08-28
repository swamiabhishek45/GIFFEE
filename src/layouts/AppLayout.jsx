import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function AppLayout() {
    
    
    return (
        <div className="min-h-screen text-white bg-gray-800">
            <div className="container px-6 py-4 mx-auto">
                <Header />

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
