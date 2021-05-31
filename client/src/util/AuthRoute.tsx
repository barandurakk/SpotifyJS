import React from "react";
import { Redirect, Route, RouteProps } from 'react-router';
import { useAppSelector } from "../hooks/reduxHooks";


const AuthRoute = ({ auth, children, ...routeProps }: any) => {
    //debugger;
    if (auth) {
        return <Route {...routeProps} >{children}</Route>;
    } else {
        console.log("redirect", auth);
        return <Redirect to={{ pathname: "/" }} />;
    }
};

export default AuthRoute

