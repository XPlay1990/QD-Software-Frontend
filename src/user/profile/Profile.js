import React, {Component} from 'react';
import {getUserProfile} from '../../util/APIUtils';
// import {Avatar, Tabs} from 'antd';
import {getAvatarColor} from '../../util/Colors';
import {formatLocalDateTime} from '../../util/DateHelper';
import LoadingIndicator from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../error/NotFound';
import ServerError from '../../error/ServerError';
import Forbidden from "../../error/Forbidden";
import Avatar from "@material-ui/core/Avatar";

// const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        };
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile()
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        user: response.message,
                        isLoading: false
                    });
                }
            }).catch(error => {
            if (error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else if (error.status === 403) {
                this.setState({
                    forbidden: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidMount() {
        this._isMounted = true;
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>;
        }

        if (this.state.notFound) {
            return <NotFound/>;
        }

        if (this.state.forbidden) {
            return <Forbidden/>;
        }

        if (this.state.serverError) {
            return <ServerError/>;
        }

        // const tabBarStyle = {
        //     textAlign: 'center'
        // };

        return (
            <div className="profile">
                {
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle"
                                            style={{backgroundColor: getAvatarColor(this.state.user.username)}}>
                                        {`${this.state.user.firstName[0].toUpperCase()}${this.state.user.lastName[0].toUpperCase()}`}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div
                                        className="full-name">{this.state.user.firstName + ' ' + this.state.user.lastName}</div>
                                    <div className="username">@{this.state.user.username}</div>
                                    <div className="user-joined">
                                        Joined {formatLocalDateTime(this.state.user.creationTime)}
                                    </div>
                                    <div className="email">
                                        Email: {this.state.user.email}
                                    </div>
                                    <div className="organization">
                                        Organization: {this.state.user.organization.name}
                                    </div>
                                </div>
                            </div>
                            {/*<div className="user-poll-details">    */}
                            {/*    <Tabs defaultActiveKey="1" */}
                            {/*        animated={false}*/}
                            {/*        tabBarStyle={tabBarStyle}*/}
                            {/*        size="large"*/}
                            {/*        className="profile-tabs">*/}
                            {/*        <TabPane tab={`${this.state.user.pollCount} Polls`} key="1">*/}
                            {/*        </TabPane>*/}
                            {/*        <TabPane tab={`${this.state.user.voteCount} Votes`}  key="2">*/}
                            {/*        </TabPane>*/}
                            {/*    </Tabs>*/}
                            {/*</div>  */}
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default Profile;