// THIS PAGE IS NO LONGER BEING USED IN THE APP

import React from "react";
import { logout } from "../../services/auth";

const LogoutButton = ({ setAuthenticated }) => {
    const onLogout = async (e) => {
        await logout();
        setAuthenticated(false);
    };

    return <div onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
