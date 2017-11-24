import React from "react";
import {Link} from "react-router";
import {Layout, Menu, Icon} from 'antd';

export default class LayoutContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageHeight: 0,
        }
    }

    componentDidMount() {
        const pageHeight = document.body.clientHeight;
        this.setState({pageHeight: Number(pageHeight) - 170})
    }

    render() {
        const {Sider, Content} = Layout;
        return (
            <div style={{height: '100%'}} className="layoutContainer">
                <Layout style={{background: '#fff', height: '100%'}}>
                    <Sider width={200} style={{background: '#fff', minHeight: this.state.pageHeight}}>
                        <Menu
                            mode="inline"
                            selectedKeys={window.localStorage.subKey ? [window.localStorage.subKey] : [this.props.linkList[0].key]}
                            style={{minHeight: this.state.pageHeight}}
                            onSelect={({item, key, selectedKeys}) => {
                                window.localStorage.setItem('subKey', selectedKeys);
                            }}
                        >
                            {
                                this.props.linkList.map((item, index) => {
                                    return <Menu.Item key={item.key}>
                                        <Link to={item.linkTo}
                                              style={{fontSize: '14px', fontWeight: 'bold', paddingLeft: '20px'}}>
                                            {item.value}
                                        </Link>
                                    </Menu.Item>
                                })
                            }
                        </Menu>
                    </Sider>
                    <Content style={{minHeight: this.state.pageHeight, padding: '24px'}}>
                        {this.props.children}
                    </Content>
                </Layout>
            </div>
        )
    }
}