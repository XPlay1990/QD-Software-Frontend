import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './AppHeader.css';
import pollIcon from '../poll.svg';
import {Dropdown, Icon, Layout, Menu} from 'antd';
import NicandoLogo from "../resources/header/nicando.png"

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
        if (!this.props.currentUser) {
            //do not show AppHeader when logged out
            return null
        }

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
                        {menuItems}
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
                <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
            </Menu.Item>
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
            <a className="ant-dropdown-link" href="javascript:void(0)">
                <Icon type="user" className="nav-icon" style={{marginRight: 0}}/> <Icon type="down"/>
            </a>
        </Dropdown>
    );
}


export default withRouter(AppHeader);