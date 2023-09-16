import { Outlet } from "react-router-dom";

import { Navbar } from "components/UI/navbar/Navbar";

export const DefaultLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};
