import React from "react";
import {connect} from "react-redux";
import {Button, Table, Form, Icon, Modal, Input, Spin, Select, message} from 'antd';

import {formatDate} from '../base/timeCount';
import {getUserById} from '../../Services/AccountServices';
import * as AccountContentAction from '../../Action/Account/AccountContentAction';

const FormItem = Form.Item;
const Option = Select.Option;

class AccountContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            fileList: [],
            loading: false,
            visible: false,
            userId: -1,
        }
    }

    componentDidMount() {
        this.props.initPage();
    }


    getTable() {
        return [
            {
                title: 'NO',
                dataIndex: 'No',
                key: 'No',
                className: 'column-center',
                render: (value, record, index) => value = index + 1,
            },
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                className: 'column-center',
            },
            {
                title: 'Account Name',
                dataIndex: 'name',
                key: 'name',
                className: 'column-center',
            },
            {
                title: 'Permission',
                dataIndex: 'permission',
                key: 'permission',
                className: 'column-center',
                render: (value) => value = value == 1 ? 'SDK' : 'APP'
            },
            {
                title: 'Creation time',
                dataIndex: 'createdAt',
                key: 'createdAt',
                sorter: true,
                sortField: "created_at",
                className: 'column-center',
                render: (value) => value = formatDate(parseInt(value) * 1000),
                type: 'date',
            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                key: 'edit',
                className: 'column-center',
                render: (value, record) => value = (
                    <Icon
                        type="edit"
                        style={{cursor: 'pointer', fontSize: '16px'}}
                        onClick={(...args) => this.edit(record.id)}
                    />
                )
            }
        ]
    }

    check() {
        this.props.form.validateFields(
            (err) => {
                if (!err) {
                    console.info('success')
                }
            },
        );
        const value = this.props.form.getFieldsValue();
        if (value.name && value.password && value.confirmPassword && value.permission && value.isEnabled) {
            const param = {
                name: value.name,
                password: value.password,
                confirmPassword: value.confirmPassword,
                permission: value.permission == 'SDK' ? '1' : (value.permission == 'APP' ? '2' : value.permission),
                description: value.description,
                isEnabled: value.isEnabled == 'YES' ? '1' : (value.isEnabled == 'NO' ? '0' : value.isEnabled),
            }
            this.state.edit ? param.id = this.state.userId : null;
            this.state.edit ? this.props.editUser(param) : this.props.addUser(param)
        } else {
            message.error('Information is not complete')
        }
    }

    edit(id) {
        this.props.addAccountModalShow(true);
        this.setState({edit: true});
        getUserById(id).then(res => {
            console.log(res);
            this.props.form.setFieldsValue({
                name: res.name,
                password: res.password,
                confirmPassword: res.password,
                description: res.description,
                isEnabled: res.isEnabled == '1' ? 'YES' : 'NO',
                permission: res.permission == '1' ? 'SDK' : 'APP',
            });
            this.setState({userId: res.id})
        })
    }

    render() {
        const {getFieldDecorator, resetFields} = this.props.form;
        const {Data} = this.props;
        const form = {
            style: {margin: '10px 30px'}
        }
        const input = {
            style: {width: 280}
        }
        const button = {
            style: {margin: '15px 5px', width: '100'}
        };
        return (
            <div>
                <Button type="primary"
                        {...button}
                        onClick={() => {
                            resetFields();
                            this.setState({edit: false})
                            this.props.addAccountModalShow(true);
                        }}
                >
                    Add Account
                </Button>
                <Modal
                    visible={Data.addAccountModalShow}
                    onCancel={() => {
                        this.props.addAccountModalShow(false);

                    }}
                    title={this.state.edit? 'Edit Account': "Add Account"}
                    footer={null}
                >
                    <Spin spinning={Data.loading}>
                        <Form>
                            <FormItem label="Account name" {...form}>
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: 'please input name'
                                    }]
                                })(
                                    <Input placeholder="Account name" {...input} />
                                )}

                            </FormItem>
                            <FormItem label="Password" {...form}>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true,
                                        message: 'please input password'
                                    }]
                                })(
                                    <Input placeholder="Password" {...input} type="password"/>
                                )}

                            </FormItem>
                            <FormItem label="Confirm password" {...form}>
                                {getFieldDecorator('confirmPassword', {
                                    rules: [{
                                        required: true,
                                        message: 'please Confirm password'
                                    }]
                                })(
                                    <Input placeholder="confirm password" {...input} type="password"/>
                                )}

                            </FormItem>
                            <FormItem label="Permission" {...form}>
                                {getFieldDecorator('permission', {
                                    rules: [{
                                        required: true,
                                        message: 'please input Permission'
                                    }],
                                })(
                                    <Select {...input}>
                                        <Option value="1">SDK</Option>
                                        <Option value="2">APP</Option>
                                    </Select>
                                )}

                            </FormItem>
                            <FormItem label="Note" {...form}>
                                {getFieldDecorator('description')(
                                    <Input placeholder="Note"  {...input} />
                                )}

                            </FormItem>
                            <FormItem
                                label="Locked"
                                {...form}
                            >
                                {getFieldDecorator('isEnabled', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input Status',
                                    }],
                                })(
                                    <Select {...input}>
                                        <Option value="1">YES</Option>
                                        <Option value="0">NO</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...form}
                            >
                                <Button
                                    key="submit"
                                    type="primary"
                                    size="large"
                                    onClick={() => this.check()}
                                    style={{width: 100, marginTop: '20px'}}

                                >
                                    Submit
                                </Button>
                                {
                                    this.state.edit ? <Button
                                        key="back"
                                        size="large"
                                        onClick={() => this.props.deleteUserData(this.state.userId)}
                                        style={{
                                            background: 'red',
                                            borderColor: 'red',
                                            width: 100,
                                            marginLeft: '20px',
                                            boxShadow: '0 0 9px #aaa',
                                            color: '#fff',
                                        }}
                                    >
                                        Delete
                                    </Button> : null
                                }
                            </FormItem>
                        </Form>
                    </Spin>
                </Modal>
                <Table
                    bordered
                    rowKey='id'
                    dataSource={Data.result}
                    loading={Data.loading}
                    columns={this.getTable()}
                    style={{marginTop: '20px'}}
                    onChange={(...args) => this.props.updatePage(...args)}
                    pagination={{
                        defaultPageSize: 20,
                        total: Data.total,
                        current: Data.page.current,
                        showSizeChanger: true,
                        pageSizeOptions: ["20", "50", "80", "100"],
                        showTotal: (total, range) => {
                            return `Total: ${total} items`
                        },
                    }}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        Data: state.AccountContent
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initPage: (...args) => dispatch(AccountContentAction.initPage(...args)),
        addUser: (...args) => dispatch(AccountContentAction.addUserData(...args)),
        updatePage: (...args) => dispatch(AccountContentAction.updatePage(...args)),
        editUser: (...args) => dispatch(AccountContentAction.editUserData(...args)),
        deleteUserData: (...args) => dispatch(AccountContentAction.deleteUserData(...args)),
        addAccountModalShow: (...args) => dispatch(AccountContentAction.addAccountModalShow(...args)),
    }
}
AccountContent = Form.create()(AccountContent);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountContent)



