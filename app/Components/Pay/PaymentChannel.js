import React from "react";
import {connect} from "react-redux";
import {Button, Table, Select, Form, Switch, Row, Col, Icon} from 'antd';

import SetPoints from './SetPoints';
import AddPaymentChannel from './AddPaymentChannel';
import StatusConfirmModal from '../BaseComponent/StatusConfirmModal';
import * as PaymentChannelAction from '../../Action/Pay/PaymentChannelAction';
import {getApp} from '../../Services/AppServices';
import ListComponent from '../BaseComponent/ListComponent';
import {getPayTypeList, getAppChargePoints, getPaymentInfo} from '../../Services/PayServices';

const FormItem = Form.Item;
const Option = Select.Option;

class PaymentChannel extends ListComponent {
    constructor(props) {
        super(props);
        this.state = {
            setPointsModalVisible: false,
            edit: false,
            payTypeList: [],
            appList: [],
            appId_search: null,
            payTypeId: null,
            pointsList: [],
        }
    }

    componentDidMount() {
        this.props.initPage();
        this.getPayTypeAndAppList();
    }

    getPayTypeAndAppList() {
        getPayTypeList().then(res => {
            this.setState({payTypeList: res})
        })
        getApp().then(res => {
            this.setState({appList: res})
        });
    }

    getTable() {
        let normalArr =  [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                className: 'column-center',
            },
            {
                title: 'Setting ID',
                dataIndex: 'settingId',
                key: 'settingId',
                className: 'column-center',
            },
            {
                title: 'App Name',
                dataIndex: 'appName',
                key: 'appName',
                className: 'column-center',
            },
            {
                title: 'Payment Type',
                dataIndex: 'payTypeName',
                key: 'payTypeName',
                className: 'column-center',
            },
            {
                title: 'Payment Channel',
                dataIndex: 'payProviderName',
                key: 'payProviderName',
                className: 'column-center',
            },
            {
                title: 'Operator',
                dataIndex: 'operator',
                key: 'operator',
                className: 'column-center',
            },
            {
                title: 'Deducted',
                dataIndex: 'deduct',
                key: 'deduct',
                className: 'column-center',
            },
            {
                title: 'Account Period',
                dataIndex: 'period',
                key: 'period',
                className: 'column-center',
            },
            {
                title: 'Points',
                dataIndex: 'points',
                key: 'points',
                className: 'column-center',
                render: (value) => value = (
                    value? value.map((item, index) => {
                        return <span>{ index == 0? item: '/' + item}</span>
                    }): null
                )
            },
            {
                title: 'Set Points',
                dataIndex: 'setPoints',
                key: 'setPoints',
                className: 'column-center',
                render: (value, record) => value = (
                    <Button
                        type="primary"
                        onClick={() => {
                            this.props.loading(true);
                            this.setState({settingId: record.settingId})
                            getAppChargePoints(record.settingId).then(res => {
                                this.props.loading(false);
                                this.setState({
                                    pointsList: res,
                                    setPointsModalVisible: true,
                                    paymentType: record.payTypeName,
                                    paymentChannel: record.payProviderName,
                                })
                            })
                        }}
                    >Set Points</Button>
                )
            },
            {
                title: 'Status',
                dataIndex: 'isEnabled',
                key: 'isEnabled',
                className: 'column-center',
                render: (value, record) => value = (
                    <Switch checked={value == '1' ? true : false} onChange={(checked) => {
                        this.setState({checked: checked});
                        this.props.confirmModalShow(true);
                        this.props.form.setFieldsValue({
                            id: record.id,
                            confirmId: '',
                        })
                    }}/>
                )
            },
            {
                title: 'Edit',
                dataIndex: 'Edit',
                key: 'Edit',
                className: 'column-center',
                render: (value, record) => value = (
                    <Icon type="edit"
                          style={{cursor: 'pointer', fontSize: '16px'}}
                          onClick={() => {
                              this.props.loading(true);
                              getPaymentInfo(record.id).then(res => {
                                  this.props.loading(false);
                                  this.setState({edit: true, editId: record.id});
                                  this.props.addPaymentChannelModalShow(true);
                                  this.props.form.setFieldsValue({
                                      payProviderName: res.payProviderName,
                                      paymentType: record.payTypeName,
                                      operator: record.operator,
                                      deduct: res.deduct,
                                      period: res.period,
                                      description: res.description
                                  })
                                  console.log(record.operator)
                              })
                          }}
                    />
                )
            },
        ]
        if(window.localStorage.getItem('jurisdiction') == 1) {
            return normalArr
        }else {
            normalArr = normalArr.slice(0, 11);
            return normalArr
        }
    }

    search() {
        const param = {
            payType: this.state.payTypeId_search == 'all'? null: this.state.payTypeId_search,
            appId: this.state.appId_search == 'all'? null: this.state.appId_search
        }
        console.log(param);
        this.props.updateSearchParams(param);
    }

    changeStatus(id) {
        const param = {
            appId: this.state.appId_search,
            payChannelId: id,
            isEnabled: this.state.checked == true? 1: 0
        }
        this.props.setStatus(param);
    }

    render() {
        const {getFieldDecorator, resetFields, getFieldsValue, validateFields} = this.props.form;
        const {Data} = this.props;
        const form = {
            style: {margin: '10px 30px'}
        }
        const input = {
            style: {width: 250}
        }
        const bigButton = {
            style: {margin: '10px', marginLeft: '30px', width: 180}
        }
        const button = {
            style: {margin: '5px', marginTop: '30px', width: 100}
        }
        return (
            <div>
                <div>
                    {
                        window.localStorage.getItem('jurisdiction') == 1?
                            <Button
                                type="primary"
                                {...bigButton}
                                onClick={() => {
                                    this.props.addPaymentChannelModalShow(true);
                                    this.setState({edit: false})
                                }}
                            ><Icon type="plus" />Add Payment Channel
                            </Button>
                            : null
                    }

                </div>
                <Form>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="Payment Type"
                                {...form}
                            >
                                {getFieldDecorator('paymentType_search',{
                                    initialValue: 'all'
                                })(
                                    <Select {...input} onSelect={(payTypeId_search) => this.setState({payTypeId_search})}>
                                        <Option key={null} value="all">All</Option>
                                        {
                                            this.state.payTypeList.map((item, index) => {
                                                return <Option key={item.id}>{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="App Name"
                                {...form}
                            >
                                {getFieldDecorator('appName_search',{
                                    initialValue: 'all'
                                })(
                                    <Select {...input}  onSelect={(appId_search) => this.setState({appId_search})}>
                                        <Option key={null} value="all">All</Option>
                                        {
                                            this.state.appList.map((item, index) => {
                                                return <Option key={item.id}>{item.appName}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={4}/>
                        <Col span={8}>
                            <FormItem
                                label=""
                                {...form}
                            >
                                <Button type="primary"
                                        onClick={() => this.search()}
                                        {...button}>
                                    <Icon type="search"/>
                                    Search
                                </Button>
                                <Button type="primary"
                                        onClick={() => {
                                            resetFields();
                                            this.setState({
                                                appId_search: null,
                                                payTypeId_search: null,
                                            })
                                        }}
                                        {...button}>
                                    <Icon type="sync"/>
                                    Clear
                                </Button>
                                <Button type="primary"
                                        onClick={() => this.handleExport()}
                                        {...button}>
                                    <Icon type="export"/>
                                    Export
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                {
                    Data.addPaymentChannelModalShow? <AddPaymentChannel
                        edit={this.state.edit}
                        loading={Data.loading}
                        editId={this.state.editId}
                        getFieldsValue={getFieldsValue}
                        payTypeList={this.state.payTypeList}
                        getFieldDecorator={getFieldDecorator}
                        addPaymentChannelModalShow={Data.addPaymentChannelModalShow}
                        onCancel={() => this.props.addPaymentChannelModalShow(false)}
                        addPaymentChannel={(param) => this.props.addPaymentChannel(param)}
                        editPaymentChannel={(param) => this.props.editPaymentChannel(param)}
                        deletePaymentChannel={(ids) => this.props.deletePaymentChannel(ids)}
                    />: null
                }
                {
                    this.state.setPointsModalVisible? <SetPoints
                        settingId={this.state.settingId}
                        pointsList={this.state.pointsList}
                        getFieldDecorator={getFieldDecorator}
                        validateFields={validateFields}
                        getFieldsValue={getFieldsValue}
                        visible={this.state.setPointsModalVisible}
                        paymentType={this.state.paymentType}
                        paymentChannel={this.state.paymentChannel}
                        onCancel={() => {
                            this.props.getDataList();
                            this.setState({setPointsModalVisible: false});
                        }}
                    />: null
                }
                <StatusConfirmModal
                    loading={Data.loading}
                    getFieldsValue={getFieldsValue}
                    getFieldDecorator={getFieldDecorator}
                    confirmModalShow={Data.confirmModalShow}
                    changeStatus={(id) => this.changeStatus(id)}
                    onCancel={() => this.props.confirmModalShow(false)}
                />
                <Table
                    bordered
                    rowKey='settingId'
                    loading={Data.loading}
                    dataSource={Data.data}
                    style={{marginTop: '30px'}}
                    columns={this.getTable()}
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
        Data: state.PaymentChannel
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loading: (...args) => dispatch(PaymentChannelAction.loading(...args)),
        initPage: (...args) => dispatch(PaymentChannelAction.initPage(...args)),
        setStatus: (...args) => dispatch(PaymentChannelAction.setStatus(...args)),
        updatePage: (...args) => dispatch(PaymentChannelAction.updatePage(...args)),
        getDataList: (...args) => dispatch(PaymentChannelAction.getDataList(...args)),
        confirmModalShow: (...args) => dispatch(PaymentChannelAction.confirmModalShow(...args)),
        requestExportList: (...args) => dispatch(PaymentChannelAction.requestExportList(...args)),
        addPaymentChannel: (...args) => dispatch(PaymentChannelAction.addPaymentChannel(...args)),
        editPaymentChannel: (...args) => dispatch(PaymentChannelAction.editPaymentChannel(...args)),
        updateSearchParams: (...args) => dispatch(PaymentChannelAction.updateSearchParams(...args)),
        deletePaymentChannel: (...args) => dispatch(PaymentChannelAction.deletePaymentChannel(...args)),
        addPaymentChannelModalShow: (...args) => dispatch(PaymentChannelAction.addPaymentChannelModalShow(...args)),
    }
}
PaymentChannel = Form.create()(PaymentChannel)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentChannel)


