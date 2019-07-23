import React from 'react';
import {Redirect, Route} from "react-router-dom";
import { authenticationService } from './AuthenticationService';
import Unauthorized from "../error/Unauthorized";

// The react private route component renders a route component if the user is logged in and in an authorised role for the route
// If the user isn't logged in they're redirected to the /login page
// If the user is logged in but aren't in an authorised role they're redirected to the home page

export const RoleRestrictedRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={Unauthorized} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
);

export default RoleRestrictedRoute