import React from "react";
import {connect} from "react-redux";
import {Card, Switch, Button, Modal, Icon, Form, Spin, Popconfirm} from 'antd';

import '../../less/Apps.less';
import AppAdd from './AppAdd';
import * as AppAction from '../../Action/App/AppAction';

class AppsContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            checked: false,
            switchIndex: -1,
            cardIndex: -1,
            editStatus: false,
            addModalVisible: false,
            title: '',
            editId: -1,
        }
    }

    componentDidMount() {
        this.props.initPage();
    }

    render() {
        const {Data} = this.props;
        const {getFieldDecorator, validateFields, getFieldsValue, setFieldsValue} = this.props.form;
        return (
            <div className="Apps">
                <Spin spinning={Data.loading}>
                    <div style={{textAlign: 'right'}}>
                        <Button
                            type="primary"
                            style={{width: 100, marginBottom: '10px'}}
                            onClick={() => this.setState({addModalVisible: true, editStatus: false, editId: -1})}
                        >
                            <Icon type="plus"/>Add App
                        </Button>
                    </div>
                    {
                        Data.data.length > 0 ? Data.data.map((items, order) => {
                            return <Card key={order} title={items.appName}
                                         extra={<span style={{color: '#108ee9', cursor: 'pointer'}}
                                                      onClick={() => this.setState({
                                                          editStatus: true,
                                                          addModalVisible: true,
                                                          editId: items.id,
                                                      })}><Icon type="edit"/></span>} style={{width: 300}}>
                                {
                                    items.list.map((item, index) => {
                                        return <Popconfirm
                                            placement="topRight"
                                            title={<span>{"Are you sure to change the " + item.name + '?'}</span>}
                                            onConfirm={() => this.props.changeStatus(this.state.checked, items.id, item.id)}
                                            okText="Yes" cancelText="No">
                                            <p key={index} style={{marginBottom: '20px'}}>
                                                {item.name}
                                                <Switch
                                                    style={{float: 'right'}}
                                                    checked={item.isEnabled == 0 ? false : (item.isEnabled == 1 ? true : false)}
                                                    onChange={(checked) => this.setState({checked})}
                                                />
                                            </p>
                                        </Popconfirm>
                                    })
                                }
                            </Card>
                        }) : null
                    }
                    <Modal
                        title="Change The Status"
                        visible={Data.changeStatusModal}
                        onCancel={() => this.props.changeStatusModal(false)}
                        onOk={() => this.onConfirm()}
                        confirmLoading={Data.loading}
                    >
                        <p className="confirm">Do you want to {this.state.checked ? 'open' : 'close'} the
                            <span>{this.state.title + '?'}</span></p>
                    </Modal>
                    {
                        this.state.addModalVisible ?
                            <AppAdd
                                editId={this.state.editId}
                                validateFields={validateFields}
                                getFieldsValue={getFieldsValue}
                                setFieldsValue={setFieldsValue}
                                editStatus={this.state.editStatus}
                                getFieldDecorator={getFieldDecorator}
                                getDataList={() => this.props.getDataList()}
                                addModalVisible={this.state.addModalVisible}
                                onCancel={() => this.setState({addModalVisible: false})}
                            />
                            : null
                    }
                </Spin>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        Data: state.App
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initPage: (...args) => dispatch(AppAction.initPage(...args)),
        getDataList: (...args) => dispatch(AppAction.getDataList(...args)),
        changeStatus: (...args) => dispatch(AppAction.changeStatus(...args)),
        changeStatusModal: (...args) => dispatch(AppAction.changeStatusModal(...args)),
    }
}

AppsContent = Form.create()(AppsContent)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppsContent)



