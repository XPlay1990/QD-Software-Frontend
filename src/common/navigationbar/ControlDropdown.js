import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './ControlDropdown.css';
import {Dropdown, Menu} from 'antd';
import {Trans} from "react-i18next";
import {CURRENT_USER, IS_ADMIN, IS_AUTHENTICATED} from "../../config/constants";
import {handleLogout} from "../../app/UserFunctions"
import {DownOutlined, UserOutlined} from "@ant-design/icons";

class ControlDropdown extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleLogout = handleLogout.bind(this);
    }

    handleMenuClick({key}) {
        if (key === "logout") {
            this.handleLogout();
        }
    }

    render() {
        return (
            <div className="NavigationButton">
                <ProfileDropdownMenu
                    // style={{lineHeight: '64px', margin: "auto"}}
                    isAdmin={localStorage.getItem(IS_ADMIN) === 'true'}
                    currentUser={this.props.currentUser}
                    handleMenuClick={this.handleMenuClick}
                />
            </div>
        );
    }
}

function ProfileDropdownMenu(props) {
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
    let menuItems = [];
    if (localStorage.getItem(IS_AUTHENTICATED) === 'true') {
        menuItems.push(
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {currentUser.name}
                </div>
                <div className="username-info">
                    @{currentUser.username}
                </div>
            </Menu.Item>
        )
        menuItems.push(
            <Menu.Divider/>
        )
        menuItems.push(
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${currentUser.username}`}><Trans i18nKey={`navigation.profile`}>Profile</Trans></Link>
            </Menu.Item>
        )
        menuItems.push(
            <Menu.Divider/>
        )
        menuItems.push(
            (props.isAdmin) ? (
                <Menu.Item key="switchUser" className="dropdown-item">
                    <Link to={`/switchuser/`}><Trans i18nKey={`navigation.switchUser`}>Switch User</Trans></Link>
                </Menu.Item>) : null
        )
        menuItems.push(
            <Menu.Item key="logout" className="dropdown-item">
                Logout
            </Menu.Item>
        )
    }
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            {menuItems}
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            placement="bottomCenter"
        >
            <UserOutlined className="nav-icon" style={{marginRight: 0}}/>
            {/*<DownOutlined/>*/}
        </Dropdown>
    );
}


export default withRouter(ControlDropdown);