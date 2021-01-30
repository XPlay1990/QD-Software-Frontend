import React from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {
    EDICON_CREATE_URL,
    EDICON_LIST_URL,
    CONTACT_URL,
    FORBIDDEN_URL,
    REGISTRATION_ACTIVATE_URL,
    REGISTRATION_URL,
    STATISTICS_URL,
    SWITCH_USER_URL
} from '../config/constants';
import Signup from '../user/signup/Signup';
import EdiList from '../edi/display/EdiList';
import Profile from '../user/profile/Profile';
import NotFound from '../error/NotFound';
import RoleRestrictedRoute from '../security/RoleRestrictedRoute';
import EdiConnection from "../edi/display/detail/EdiConnection";
import Navigationbar from "../common/navigationbar/Navigationbar";
import EdiCreate from "../edi/create/EdiCreate";
import Forbidden from "../error/Forbidden";
import SwitchUser from "../admin_functions/SwitchUser";
import SupplierQuestions from "../edi/display/detail/supplierQuestions/SupplierQuestions";
import ActivateUserRegistration from "../user/signup/ActivateUserRegistration";
import Paper from "@material-ui/core/Paper";
import Statistics from "../statistics/Statistics";
import Tabbar from "../common/tabbar/Tabbar";
import AttachmentList from "../edi/display/detail/attachments/AttachmentList";
import ContactMe from "../contact/ContactMe";

class MainApp extends React.Component {
    render() {
        return (
            <div className="app">
                <Navigationbar history={this.props.history} {...this.props}/>

                <Paper className="app-paper">
                    <Tabbar {...this.props} />
                    <div className="app-content">
                        <Switch>
                            <Route exact path="/" render={() => (<Redirect to={EDICON_LIST_URL}/>)}/>
                            <Route path={REGISTRATION_ACTIVATE_URL}
                                   render={(props) => <ActivateUserRegistration {...props} />}/>
                            <Route path={REGISTRATION_URL} component={Signup}/>
                            <RoleRestrictedRoute exact path={EDICON_LIST_URL} component={EdiList}/>
                            <RoleRestrictedRoute exact path={EDICON_CREATE_URL} component={EdiCreate}/>
                            <Route path="/users/:username" render={(props) =>
                                <Profile {...props}  />}/>
                            <Route exact path={EDICON_LIST_URL + "/:id/overview"} component={EdiConnection}/>
                            <Route path={EDICON_LIST_URL + "/:id/question/answer"} //ANSWER_URL
                                   component={SupplierQuestions}/>
                            <Route exact path={EDICON_LIST_URL + "/:id/attachments"} component={AttachmentList}/>
                            <Route path={SWITCH_USER_URL} component={SwitchUser}/>
                            <Route path={STATISTICS_URL} component={Statistics}/>
                            <Route path={CONTACT_URL} component={ContactMe}/>
                            <Route path={FORBIDDEN_URL} component={Forbidden}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withRouter(MainApp);