import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './AppHeader.css';
import pollIcon from '../poll.svg';
import {Dropdown, Icon, Layout, Menu} from 'antd';
import {Trans} from "react-i18next";

const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({key}) {
        if (key === "logout") {
            this.props.onLogout();
        }
    }

    render() {
        let menuItems = [];
        menuItems.push(
            <Menu.Item key="/">
                <Link to="/">
                    <Icon type="home" className="nav-icon"/>
                </Link>
            </Menu.Item>);
        if (this.props.isAdmin) {
            menuItems.push(
                <Menu.Item key="/poll/new">
                    <Link to="/poll/new">
                        <img src={pollIcon} alt="poll" className="poll-icon"/>
                    </Link>
                </Menu.Item>
            )
        }
        menuItems.push(
            <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu
                    isAdmin={this.props.isAdmin}
                    currentUser={this.props.currentUser}
                    handleMenuClick={this.handleMenuClick}/>
            </Menu.Item>);

        return (
            <Header className="app-header">
                <div className="container">
                    <div className="app-title">
                        {/*<img className={"HeaderLogo"} src={NicandoLogo}/>*/}
                        <Link to="/">Nicando Edi-Portal</Link>
                    </div>
                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{lineHeight: '64px'}}>
                        {
                            this.props.isAuthenticated ?
                                menuItems : null
                        }
                    </Menu>
                </div>
            </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    @{props.currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${props.currentUser.username}`}><Trans i18nKey={`navigation.profile`}>Profile</Trans></Link>
            </Menu.Item>
            {
                (props.isAdmin) ? (
                    <Menu.Item key="switchUser" className="dropdown-item">
                        <Link to={`/switchuser/`}><Trans i18nKey={`navigation.switchUser`}>Switch User</Trans></Link>
                    </Menu.Item>) : null
            }
            <Menu.Item key="logout" className="dropdown-item">
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <button className="ant-dropdown-link">
                <Icon type="user" className="nav-icon" style={{marginRight: 0}}/> <Icon type="down"/>
            </button>
        </Dropdown>
    );
}


export default withRouter(AppHeader);