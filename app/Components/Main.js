import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router";
import {Layout, Menu, Icon, Button, LocaleProvider, Dropdown, Popconfirm} from 'antd';

import Login from './Login';
import '../less/totality.less';
import AlterPassword from './AlterPassword';
import enUS from 'antd/lib/locale-provider/en_US';
import {getUserList} from '../services/LoginService';
import {logout, action_login_modal_visible,} from "../Action/login/LoginAction";

const {SubMenu} = Menu;
const {Header, Sider, Content} = Layout;

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageHeight: 0,
            userName: ' ',
            jurisdiction: -1,
        }
    }

    componentDidMount() {
        const pageHeight = document.body.clientHeight;
        this.setState({pageHeight: Number(pageHeight) - 170});
        getUserList().then(res => {
            this.setState({userId: res.id, userName: res.username, jurisdiction: res.roles[0].id});
            window.localStorage.setItem('jurisdiction', res.roles[0].id);
        })
    }

    render() {
        const menu = (
            <Menu style={{padding: '10px', minHeight: 100}}>
                <Menu.Item>
                    <span onClick={() => this.setState({show: true})}>Change Password</span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <Popconfirm
                        title="Are you exit or login?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            this.props.visible(true);
                            this.props.logout();
                        }}
                    >
                        <span>Log in/Log out</span>
                    </Popconfirm>
                </Menu.Item>
            </Menu>
        )
        return (
            <div style={{height: '100%'}}>
                <LocaleProvider locale={enUS} style={{ minHeight: this.state.pageHeight }}>
                    <Layout style={{height: '100%'}}>
                        <Header className="header">
                            <div className="logo" />
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                selectedKeys={window.localStorage.hostKey ? [window.localStorage.hostKey] :['Dashboard']}
                                style={{ lineHeight: '64px' }}
                                onSelect={({item, key, selectedKeys}) => {
                                    window.localStorage.setItem('hostKey', selectedKeys);
                                    window.localStorage.removeItem('subKey');
                                }}
                            >
                                <Menu.Item key="Dashboard">
                                    <Link to="Dashboard/DashboardContent">Dashboard</Link>
                                </Menu.Item>
                                <Menu.Item key="Analysis">
                                    <Link to="Analysis/Transaction">Analysis</Link>
                                </Menu.Item>
                                <Menu.Item key="Apps">
                                    <Link to="Apps/AppsContent">Apps</Link>
                                </Menu.Item>
                                <Menu.Item key="Pay">
                                    <Link to="Pay/PaymentChannel">Pay</Link>
                                </Menu.Item>
                                <Menu.Item key="User">
                                    <Link to="User/UserContent">User</Link>
                                </Menu.Item>
                                {
                                    this.state.jurisdiction == 1?
                                        <Menu.Item key="Account">
                                            <Link to="Account/AccountContent">Account</Link>
                                        </Menu.Item>
                                        : null
                                }
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <Button type="primary" style={{float: 'right', marginTop: '20px'}}><Icon
                                        type="user"/>{this.state.userName}</Button>
                                </Dropdown>
                            </Menu>
                        </Header>
                        <Content style={{ padding: '0 50px', height: '100%', margin: '50px 0'}}>
                            <Layout style={{ background: '#fff' }}>
                                <Content style={{ minHeight: this.state.pageHeight }}>
                                    {this.props.children}
                                </Content>
                            </Layout>
                        </Content>
                        <Login/>
                        <AlterPassword userId={this.state.userId} show={this.state.show} onCancel={() => this.setState({show: false})}/>
                    </Layout>
                </LocaleProvider>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        Data: state.Login
    }
}
function mapDispatchToProps(dispatch) {
    return {
        visible: (...args) => dispatch(action_login_modal_visible(...args)),
        logout: (...args) => dispatch(logout(...args)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)