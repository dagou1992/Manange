import React from 'react';
import {Form, Input, Modal, Button, Icon, Spin, Select, Popconfirm} from 'antd';

import ListComponent from '../BaseComponent/ListComponent';
import {openNotification} from '../BaseComponent/openNotification';

const FormItem = Form.Item;
const Option = Select.Option;

import {
    deleteApp,
    getAppById,
    handleChangeApp,
} from '../../Services/AppServices';

export default class AppAdd extends ListComponent {
    constructor(props) {
        super(props)
        this.state = {
            appKey: '',
            appSecret: '',
            loading: this.props.editId != -1 ? true : false,
        }

    }


    componentDidMount() {
        this.props.editId != -1 ?
            getAppById(this.props.editId).then(res => {
                this.setState({loading: false});
                this.props.setFieldsValue({
                    appAddName: res.appName,
                    packageName: res.packageName,
                    currency: res.currency,
                    appKey: res.appKey,
                    appSecret: res.appSecret,
                    note: res.description,
                    paymentUrl: res.redirectUrl,
                    returnURL: res.callbackUrl,
                });
                this.setState({appKey: res.appKey})
                this.setState({appSecret: res.appSecret})
            })
            : null
    }

    createAppKey() {
        const value = this.randomWord(false, 32);
        this.setState({appKey: value})
    }

    createSecretKey() {
        const value = this.randomWord(false, 32);
        this.setState({appSecret: value})
    }


    submit() {
        const {validateFields, getFieldsValue, onCancel, editId} = this.props;
        const value = getFieldsValue();
        delete value.appKey;
        delete value.appSecret;

        if (this.state.appKey == '') {
            openNotification('error', 'App Key is empty');
        }

        if(this.state.appSecret == '') {
            openNotification('error' , 'App Secret is empty');
        }

        if (this.IsUndefined(value)) {
            openNotification('error', 'The information is not complete')
        } else {
            const param = {
                appName: value.appAddName,
                packageName: value.packageName,
                description: value.note,
                appKey: this.state.appKey,
                appSecret: this.state.appSecret,
                currency: value.currency,
                callbackUrl: value.returnURL,
                redirectUrl: value.paymentUrl,
            }
            editId != -1 ? param.id = editId : null;
            this.setState({loading: true});
            handleChangeApp(param).then(res => {
                this.setState({loading: false});
                openNotification('success', 'Successfully');
                onCancel();
                this.props.getDataList();
            }).catch(err => {
                openNotification('error', err.message);
                this.setState({loading: false});
            })
        }

        validateFields(
            (err) => {
                if (!err) {
                    console.info('success');
                }
            },
        );
    }

    delete() {
        const {getDataList, onCancel, editId} = this.props;
        this.setState({loading: true});
        deleteApp(editId).then(res => {
            this.setState({loading: false});
            openNotification('success', 'Successfully');
            onCancel();
            getDataList();
        }).catch(err => {
            openNotification('error', err.message);
            this.setState({loading: false});
        })
    }


    render() {
        const {getFieldDecorator, editStatus, addModalVisible} = this.props;
        const form = {
            style: {margin: '10px 50px'}
        }
        const input = {
            style: {width: 250}
        }
        const button = {
            style: {width: 100, marginTop: '40px'}
        }
        return (
            <div>
                <Modal
                    footer={null}
                    width='630px'
                    title={editStatus ? "App Edit" : "App Add"}
                    visible={addModalVisible}
                    onCancel={() => this.props.onCancel()}
                >
                    <Spin spinning={this.state.loading}>
                        <Form>
                            <FormItem
                                label="App Name"
                                {...form}
                            >
                                {getFieldDecorator('appAddName', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input App Name',
                                    }],
                                })(
                                    <Input  {...input}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="Package Name"
                                {...form}
                            >
                                {getFieldDecorator('packageName', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input Package Name',
                                    }],
                                })(
                                    <Input {...input}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="Currency Unit"
                                {...form}
                            >
                                {getFieldDecorator('currency', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input Currency Unit',
                                    }],
                                })(
                                    <Select {...input}>
                                        <Option value="Rp">Rp</Option>
                                        {/*<Option value="USD">USD</Option>*/}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="Note"
                                {...form}
                            >
                                {getFieldDecorator('note', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input Note',
                                    }],
                                })(
                                    <Input type="textarea" style={{width: 400}}/>
                                )}
                            </FormItem>
                            <FormItem
                                    label="URL Notify"
                                    {...form}
                            >
                                {getFieldDecorator('returnURL', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input URL Notify',
                                    }],
                                })(
                                        <Input style={{width: 400}}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="URL Redirect"
                                {...form}
                            >
                                {getFieldDecorator('paymentUrl', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input URL Redirect',
                                    }],
                                })(
                                    <Input style={{width: 400}}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="App Key"
                                {...form}
                            >
                                {getFieldDecorator('appKey', {
                                    required: true,
                                    message: 'Please input App Key',
                                })(
                                    editStatus ?
                                        <Input disabled style={{width: 400, display: 'inline-block', color: '#000'}}/>
                                        : <div>
                                        <Input disabled style={{width: 400, display: 'inline-block', color: '#000'}}
                                               value={this.state.appKey}/>
                                        <Button
                                            type='primary'
                                            onClick={() => this.createAppKey()}
                                            style={{marginLeft: '5px'}}
                                        >Create</Button>
                                    </div>
                                )}
                            </FormItem>
                            <FormItem
                                    label="Secret Key"
                                    {...form}
                            >
                                {getFieldDecorator('appSecret', {
                                    required: true,
                                    message: 'Please input Secret Key',
                                })(
                                        editStatus ?
                                                <Input disabled style={{width: 400, display: 'inline-block', color: '#000'}}/>
                                                : <div>
                                                    <Input disabled style={{width: 400, display: 'inline-block', color: '#000'}}
                                                           value={this.state.appSecret}/>
                                                    <Button
                                                            type='primary'
                                                            onClick={() => this.createSecretKey()}
                                                            style={{marginLeft: '5px'}}
                                                    >Create</Button>
                                                </div>
                                )}
                            </FormItem>
                            <FormItem
                                {...form}
                            >
                                <Button type='primary'
                                        onClick={() => this.submit()}
                                        {...button}
                                >
                                    Submit
                                </Button>
                                {
                                    editStatus ?
                                        <Popconfirm title="Are you sure delete this App?"
                                                    onConfirm={() => this.delete()}
                                                    onCancel={() => console.log(onCancel)} okText="Yes" cancelText="No">
                                            <Button
                                                type='primary'
                                                style={{
                                                    width: 100,
                                                    marginLeft: '10px',
                                                    boxShadow: '0 0 9px #C32',
                                                    color: '#fff',
                                                    background: '#C32',
                                                    borderColor: '#C32',
                                                    lineHeight: '20px',
                                                    height: '32px'
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Popconfirm>
                                        : null
                                }
                                <Button type='primary'
                                        onClick={() => this.props.onCancel()}
                                        style={{
                                            width: 100,
                                            marginLeft: '10px',
                                            background: '#aaa',
                                            borderColor: '#aaa',
                                            boxShadow: '0 0 9px #aaa'
                                        }}
                                >
                                    Cancel
                                </Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </Modal>
            </div>
        )
    }
}

