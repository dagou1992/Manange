import React, {Component} from 'react';
import {Modal, Form, Input, Button, Spin, Select, Popconfirm} from 'antd';

import {getAllPayProvider, getAllOperator} from '../../Services/PayServices';
import {openNotification} from '../../Components/BaseComponent/openNotification';

const FormItem = Form.Item;
const Option = Select.Option;

export default class AddPaymentChannel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            payProviderList: [],
            operatorList: [],
            operatorId: null,
            payTypeId: null,
        }
    }

    componentDidMount() {
        getAllPayProvider().then(res => {
            this.setState({payProviderList: res})
        })
        getAllOperator().then(res => {
            this.setState({operatorList: res})
        })
    }

    check() {
        const {payProviderList, operatorList} = this.state;
        const {edit, editId, payTypeList, addPaymentChannel, editPaymentChannel} = this.props;
        const value = this.props.getFieldsValue();
        let param = {};
        if (!edit) {
            param = {
                payProviderName: value.payProviderName,
                payTypeId: this.state.payTypeId,
                deduct: value.deduct,
                period: value.period,
                description: value.description == ''? null: value.description,
            }
            this.state.paymentType == 'SMS' ? param.operatorId = this.state.operatorId : null
            console.log(param);
        } else {
            param = {
                id: editId,
                payProviderName: value.payProviderName,
                deduct: value.deduct,
                period: value.period,
                description: value.description == ''? null: value.description,
            }
            if (this.state.payTypeId == null) {
                for (var i in payTypeList) {
                    if (payTypeList[i].name == value.paymentType) {
                        param.payTypeId = payTypeList[i].id;
                        break;
                    }
                }
            } else {
                param.payTypeId = this.state.payTypeId
            }
            value.paymentType == 'SMS' ? param.operatorId = value.operator : null
            this.state.paymentType == 'SMS' ? param.operatorId = this.state.operatorId : null
            console.log(param);
        }

        //获取payProviderId
        for (let i in payProviderList) {
            if (payProviderList[i].name == value.payProviderName) {
                param.payProviderId = payProviderList[i].id;
                break;
            }
        }

        //获取operatorId
        for (let i in operatorList) {
            if (operatorList[i].name == value.operator) {
                param.operatorId = operatorList[i].id;
                break;
            }
        }

        if (param.payProviderId && (this.state.paymentType == 'SMS' ?param.operatorId: true) && param.payTypeId) {
            edit ? editPaymentChannel(param) : addPaymentChannel(param);
        } else {
            openNotification('error', 'The information is not complete');
        }
    }

    handleCancel() {
        this.setState({
            visible: false,
        });
    }

    render() {
        const {getFieldDecorator, payTypeList, getFieldsValue, editId} = this.props;
        const form = {
            style: {margin: '10px 30px'}
        }
        const input = {
            style: {width: 250}
        }
        const select = {
            style: {width: 250}
        }
        const button = {
            style: {width: 85}
        };
        return (
            <div>
                <Modal
                    title={this.props.edit ? 'Edit Payment' : 'Add Payment'}
                    footer={null}
                    visible={this.props.addPaymentChannelModalShow}
                    onCancel={() => this.props.onCancel()}
                >
                    <Spin spinning={this.props.loading}>
                        <Form>
                            <FormItem
                                label="Payment Provider Name"
                                {...form}
                            >
                                {getFieldDecorator('payProviderName')(
                                    <Select  {...select} disabled={this.props.edit? true: false}>
                                        {
                                            this.state.payProviderList.map((item, index) => {
                                                return <Option key={item.id} value={item.name}>{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="Payment Type"
                                {...form}
                            >
                                {getFieldDecorator('paymentType')(
                                    <Select  {...select} onSelect={(payTypeId) => {
                                        this.setState({payTypeId});
                                        for (let i in payTypeList) {
                                            if (payTypeList[i].id == payTypeId) {
                                                this.setState({paymentType: payTypeList[i].name})
                                            }
                                        }
                                    }} disabled={this.props.edit? true: false}>
                                        {
                                            payTypeList.map((item, index) => {
                                                return <Option key={item.id}>{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            {
                                this.state.paymentType == 'SMS' || getFieldsValue().paymentType == 'SMS' || this.props.edit? <FormItem
                                    label="Operator"
                                    {...form}
                                >
                                    {getFieldDecorator('operator', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input Operator',
                                        }],
                                    })(
                                        <Select  {...select} onSelect={(operatorId) => this.setState({operatorId})}
                                                 disabled={this.props.edit ? true : false}>
                                            {
                                                this.state.operatorList.map((item, index) => {
                                                    return <Option key={item.id}>{item.name}</Option>
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>: null
                            }
                            <FormItem
                                label="Deducted"
                                {...form}
                            >
                                {getFieldDecorator('deduct')(
                                    <Input placeholder="Deducted" {...input}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="Account Period"
                                {...form}
                            >
                                {getFieldDecorator('period')(
                                    <Input placeholder="Account Period" {...input}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="Note"
                                {...form}
                            >
                                {getFieldDecorator('description',{
                                    initialValue: ""
                                })(
                                    <Input placeholder="description" {...input}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...form}
                            >
                                <Button type='primary'
                                        onClick={() => this.check()}
                                        {...button}
                                >
                                    Submit
                                </Button>
                                    {
                                        this.props.edit ?
                                            <Popconfirm
                                                placement="topLeft"
                                                title="Are you sure delete this payment"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => this.props.deletePaymentChannel([editId])}
                                            >
                                                <Button
                                                    style={{
                                                        background: 'red',
                                                        borderColor: 'red',
                                                        width: 85,
                                                        margin: '15px 0px 15px 10px',
                                                        boxShadow: '0 0 9px #aaa',
                                                        color: '#fff',
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
                                            background: '#aaa',
                                            borderColor: '#aaa',
                                            margin: '15px 0 0 10px',
                                            width: 85,
                                            boxShadow: '0 0 5px #aaa'
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