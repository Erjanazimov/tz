import React from 'react';
import {Route, Switch} from "react-router-dom";
import User from "../components/user/User";
import Control from "../pages/Control";
import Public from "../pages/Public";
import Search from "../pages/Search";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Private from "../pages/Private";

function Router(){
    return (
        <div className="d-flex">
            <Control/>
            <div className="mx-3">
        <Switch>
            <Route exact path='/' component={User}/>
            <Route exact path='/public' component={Public}/>
            <Route exact path='/search' component={Search}/>
            <Route exact path='/private' component={Private}/>
        </Switch>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Router;