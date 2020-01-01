import React from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {
    EDICON_CREATE_URL,
    EDICON_LIST_URL,
    FORBIDDEN_URL,
    REGISTRATION_ACTIVATE_URL,
    REGISTRATION_URL
} from '../config/constants';
import Signup from '../user/signup/Signup';
import EdiList from '../edi/display/EdiList';
import Profile from '../user/profile/Profile';
import NotFound from '../error/NotFound';
import RoleRestrictedRoute from '../security/RoleRestrictedRoute';

import {Layout} from 'antd';
import EdiConnection from "../edi/display/detail/EdiConnection";
import Navigationbar from "../common/navigationbar/Navigationbar";
import EdiCreate from "../edi/create/EdiCreate";
import Forbidden from "../error/Forbidden";
import SwitchUser from "../admin_functions/SwitchUser";
import SupplierQuestions from "../edi/display/detail/supplierQuestions/SupplierQuestions";
import ActivateUserRegistration from "../user/signup/ActivateUserRegistration";
import {loadUserFunction} from "./UserFunctions"
import Paper from "@material-ui/core/Paper";

const {Content} = Layout;

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.loadCurrentUser = loadUserFunction.bind(this);
    }

    render() {

        // console.log("MAIN: ")
        // console.log(localStorage.getItem(CURRENT_USER))
        // console.log(localStorage.getItem(IS_AUTHENTICATED))
        // console.log(localStorage.getItem(IS_ADMIN))
        // console.log(localStorage.getItem(ACCESS_TOKEN))
        // console.log("MAIN: " + window.location.pathname)

        return (
            <Content className="container">
                {/*<SimpleBarReact className="app-scrollbar">*/}
                <div className="app">
                    <Navigationbar history={this.props.history} {...this.props}/>

                    <Paper className="app-content">
                        <Switch>
                            <Route exact path="/" render={() => (<Redirect to={EDICON_LIST_URL}/>)}/>
                            <Route path={REGISTRATION_ACTIVATE_URL}
                                   render={(props) => <ActivateUserRegistration {...props} />}/>
                            <Route path={REGISTRATION_URL} component={Signup}/>
                            <RoleRestrictedRoute exact path={EDICON_LIST_URL} component={EdiList}/>
                            <RoleRestrictedRoute exact path={EDICON_CREATE_URL} component={EdiCreate}/>
                            <Route path="/users/:username" render={(props) =>
                                <Profile {...props}  />}/>
                            <Route exact path={EDICON_LIST_URL + "/:id"} component={EdiConnection}/>
                            <Route path={EDICON_LIST_URL + "/:id/question/answer"} //ANSWER_URL
                                   component={SupplierQuestions}/>
                            <Route path={"/switchuser/"} component={SwitchUser}/>
                            <Route path={FORBIDDEN_URL} component={Forbidden}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Paper>
                </div>
                {/*</SimpleBarReact>*/}
            </Content>
        )
    }
}

export default withRouter(MainApp);