import React from "react";
import {connect} from "react-redux";
import {Button, Table, Form, Input, Select, Row, Col, DatePicker, Icon} from 'antd';

import {getApp} from '../../Services/AppServices';
import {getPayTypeList} from '../../Services/PayServices';
import ListComponent from '../BaseComponent/ListComponent';
import * as TransactionAction from '../../Action/Analysis/TransactionAction';
import {formatDate, timeReverseReverse, changeToStamp} from '../base/timeCount';

const FormItem = Form.Item;
const Option = Select.Option;

class Transaction extends ListComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            startTime: '',
            endTime: '',
            fill: false,
            appList: [],
            payTypeList: [],
        }
    }

    componentDidMount() {
        this.props.initPage();
        getApp().then(res => {
            this.setState({appList: res})
        });
        getPayTypeList().then(res => {
            this.setState({payTypeList: res})
        })
    }

    getTable() {
        return [
            {
                title: 'App ID',
                dataIndex: 'appId',
                key: 'appId',
                className: 'column-center',
                render: (value, record, index) => value = index + 1,
            },
            {
                title: 'App Name',
                dataIndex: 'appName',
                key: 'appName',
                className: 'column-center',
            },
            {
                title: 'User ID',
                dataIndex: 'userId',
                key: 'userId',
                className: 'column-center',
            },
            {
                title: 'Transaction No',
                dataIndex: 'orderNo',
                key: 'orderNo',
                className: 'column-center',
            },
            {
                title: 'Payment Type',
                dataIndex: 'payTypeName',
                key: 'payTypeName',
                className: 'column-center',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                className: 'column-center'
            },
            {
                title: 'Transaction Type',
                dataIndex: 'transactionStatus',
                key: 'transactionStatus',
                className: 'column-center',
                render: (value) => value = value == 1 ? 'Done' : 'UnDone'
            },
            {
                title: 'Time',
                dataIndex: 'createdAt',
                key: 'createdAt',
                className: 'column-center',
                sorter: true,
                sortField: "created_at",
                render: (value) => value = formatDate(parseInt(value) * 1000),
                type: 'datetime',
            }
        ]
    }

    search() {
        const value = this.props.form.getFieldsValue();
        for (var i in value) {
            value[i] == undefined ? value[i] = '' : null
        }
        const param = {
            appId: value.appName_search,
            payTypeId: value.paymentType_search,
            orderNo: value.transactionNo_search,
            status: value.transactionType_search,
            userId: value.userId_search,
            startTime: this.state.startTime.length == 0 ? '' : changeToStamp(timeReverseReverse(this.state.startTime)) / 1000 - 28800,
            endTime: this.state.endTime.length == 0 ? '' : changeToStamp(timeReverseReverse(this.state.endTime)) / 1000 - 28800,
        }
        console.log(param);
        for (var i in param) {
            if (param[i] == '') {
                delete param[i];
            }
        }
        this.props.updateSearchParams(param)
    }

    render() {
        const {Data} = this.props;
        const {getFieldDecorator, resetFields} = this.props.form;

        const form = {
            style: {margin: '10px 30px'}
        }
        const input = {
            style: {width: 250}
        }
        const button = {
            style: {margin: '5px', marginTop: '20px'}
        }
        return (
            <div>
                <Form>
                    <Row>
                        <Col span={8}>
                            <FormItem
                                label="Transaction No"
                                {...form}
                            >
                                {getFieldDecorator('transactionNo_search')(
                                    <Input {...input}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="User ID"
                                {...form}
                            >
                                {getFieldDecorator('userId_search')(
                                    <Input {...input}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="Registered Time"
                                {...form}
                            >
                                {getFieldDecorator('startTime')(
                                    <DatePicker
                                        allowClear={false}
                                        style={{width: 120}}
                                        format={'DD-MM-YYYY'}
                                        placeholder={['Start Time']}
                                        onChange={(date, dateString) => this.setState({startTime: dateString})}
                                    />
                                )}
                                {getFieldDecorator('endTime')(
                                    <DatePicker
                                        allowClear={false}
                                        format={'DD-MM-YYYY'}
                                        placeholder={['End Time']}
                                        style={{width: 120, marginLeft: '5px'}}
                                        onChange={(date, dateString) => this.setState({endTime: dateString})}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem
                                label="Transaction Type"
                                {...form}
                            >
                                {getFieldDecorator('transactionType_search')(
                                    <Select {...input}>
                                        <Option value="0">UnDone</Option>
                                        <Option value="1">Done</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="App Name"
                                {...form}
                            >
                                {getFieldDecorator('appName_search')(
                                    <Select {...input}>
                                        {
                                            this.state.appList.map((item, index) => {
                                                return <Option key={item.id}>{item.appName}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="Payment Type"
                                {...form}
                            >
                                {getFieldDecorator('paymentType_search')(
                                    <Select {...input} >
                                        {
                                            this.state.payTypeList.map((item, index) => {
                                                return <Option key={item.id}>{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8} offset={8}
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
                                            startTime: '',
                                            endTime: '',
                                        })
                                    }}
                                    {...button}
                            >
                                <Icon type="sync"/>
                                Clear
                            </Button>
                            <Button type="primary"
                                    onClick={() => this.handleExport()}
                                    {...button}>
                                <Icon type="export"/>
                                Export
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Table
                    bordered
                    rowKey='appId'
                    loading={Data.loading}
                    dataSource={Data.data}
                    columns={this.getTable()}
                    style={{marginTop: '20px'}}
                    onChange={(...args) => this.props.updatePage(...args)}
                    pagination={{
                        total: Data.total,
                        defaultPageSize: 20,
                        showSizeChanger: true,
                        current: Data.page.current,
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
        Data: state.Transaction
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initPage: (...args) => dispatch(TransactionAction.initPage(...args)),
        updatePage: (...args) => dispatch(TransactionAction.updatePage(...args)),
        getListData: (...args) => dispatch(TransactionAction.getListData(...args)),
        updateSearchParams: (...args) => dispatch(TransactionAction.updateSearchParams(...args)),
        requestExportList: (...args) => dispatch(TransactionAction.requestExportList(...args)),
    }
}

Transaction = Form.create()(Transaction);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Transaction)

