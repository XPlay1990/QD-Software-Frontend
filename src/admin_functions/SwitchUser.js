import React, {Component} from 'react';
import './SwitchUser.css';
import LoadingIndicator from "../common/LoadingIndicator";
import Select from "react-select";
import {getAllUsers} from "../util/APIUtils";
import {notification} from "antd";

class SwitchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            selectedUser: null,
            isLoading: true
        };
        // this.isAdmin = JSON.parse(localStorage.getItem(CURRENT_USER))["authorities"].includes(Role.Admin);
        this.loadUserList = this.loadUserList.bind(this);
        this.switchUser = this.switchUser.bind(this);
    }

    loadUserList() {
        let promise = getAllUsers();
        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        userList: response.message,
                        isLoading: false
                    })
                }
            }).catch(error => {
            this.setState({
                ediConnection: null,
                isLoading: false
            });
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message,
            });
        });
    }

    switchUser() {
        //TODO
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadUserList();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate = nextProps => {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                isLoading: true
            });
            this.loadUserList();
        }
    };

    render() {

        return (
            <div className="ediContent">
                {
                    this.state.isLoading ?
                        <LoadingIndicator/> : null
                }
                {
                    !this.state.isLoading && this.state.userList === null ? (
                        <div className="noUsersFound">
                            <span>No Users found.</span>
                        </div>
                    ) : null
                }
                {
                    !this.state.isLoading && this.state.userList != null ? (
                        <div className="UserSelectDiv">
                            <h1>User:</h1>
                            <Select name="SwitchUserSelect"
                                    autosize={false}
                                    value={this.state.userList[0] || ''}
                                    onChange={(value) => this.setState({selectedUser: value})}
                                    options={this.state.userList}
                                    getOptionLabel={(option) => (`@${option.username}`)}
                                    getOptionValue={(option) => option.id}
                            />
                            <button
                                className={"SwitchUserButton saveButton " + (this.state.isSaving ? "save-animation" : "")}
                                onClick={this.switchUser}
                            />
                        </div>) : null
                }
            </div>
        );
    }
}

export default SwitchUser;