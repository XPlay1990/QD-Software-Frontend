import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './ControlDropdown.css';
import {Dropdown, Icon, Layout, Menu} from 'antd';
import {Trans} from "react-i18next";
import {CURRENT_USER, IS_ADMIN, IS_AUTHENTICATED} from "../../config/constants";

const Header = Layout.Header;

class ControlDropdown extends Component {
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
            <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu
                    isAdmin={localStorage.getItem(IS_ADMIN) === 'true'}
                    currentUser={this.props.currentUser}
                    handleMenuClick={this.handleMenuClick}/>
            </Menu.Item>);

        return (
                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{lineHeight: '64px'}}>
                        {
                            (localStorage.getItem(IS_AUTHENTICATED) === 'true') ?
                                menuItems : null
                        }
                    </Menu>
        );
    }
}

function ProfileDropdownMenu(props) {
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {currentUser.name}
                </div>
                <div className="username-info">
                    @{currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${currentUser.username}`}><Trans i18nKey={`navigation.profile`}>Profile</Trans></Link>
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


export default withRouter(ControlDropdown);