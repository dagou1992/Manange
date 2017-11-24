import React from "react";
import {connect} from "react-redux";
import {Button, Switch, Input, Table, Form, Select, Row, Col, DatePicker, Icon} from 'antd';


import ListComponent from '../BaseComponent/ListComponent';
import StatusConfirmModal from '../BaseComponent/StatusConfirmModal';
import * as UserContentAction from '../../Action/User/UserContentAction';
import {getApp} from '../../Services/AppServices';
import {formatDate, timeReverseReverse, changeToStamp} from '../base/timeCount';

const FormItem = Form.Item;

class UserContent extends ListComponent {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            startTime: '',
            endTime: '',
            title: 'User ID',
            appList: [],
        }
    }

    componentDidMount() {
        this.props.initPage();
        this.getPayTypeAndAppList();
    }

    getPayTypeAndAppList() {
        getApp().then(res => {
            this.setState({appList: res})
        });
    }


    getTable() {
        return [
            {
                title: 'NO',
                dataIndex: 'NO',
                className: 'column-center',
                render: (value, record, index) => value = index + 1,
            },
            {
                title: 'User ID',
                dataIndex: 'id',
                className: 'column-center',
            },
            {
                title: 'App Name',
                dataIndex: 'appName',
                className: 'column-center',
            },
            {
                title: 'App User ID',
                dataIndex: 'appUserId',
                className: 'column-center',
            },
            {
                title: 'App User Name',
                dataIndex: 'appUserName',
                className: 'column-center',
            },
            {
                title: 'Registered Time',
                dataIndex: 'createdAt',
                className: 'column-center',
                sorter: true,
                sortField: "create_at",
                render: (value) => value = formatDate(parseInt(value) * 1000),
                type: 'datetime',
            },
            {
                title: 'Status',
                dataIndex: 'isEnabled',
                key: 'isEnabled',
                className: 'column-center',
                render: (value, record) => value = (
                    <Switch checked={value == '1' ? true : false} onChange={(checked) => {
                        console.log(record.id);
                        this.setState({checked: checked});
                        this.props.confirmModalShow(true);
                        this.props.form.setFieldsValue({
                            id: record.id,
                            confirmId: '',
                        })
                    }}/>
                )
            }
        ]
    }

    search() {
        const value = this.props.form.getFieldsValue();
        for (var i in value) {
            value[i] == undefined ? value[i] = '' : null
        }
        const param = {
            id: value.userId_search,
            appId: this.state.appId_search,
            appUserId: value.appUserId_search,
            createAtStart: this.state.startTime.length == 0 ? '' : changeToStamp(timeReverseReverse(this.state.startTime)) / 1000 - 28800,
            createAtEnd: this.state.endTime.length == 0 ? '' : changeToStamp(timeReverseReverse(this.state.endTime)) / 1000 - 28800,
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
        const {getFieldDecorator, resetFields, getFieldsValue} = this.props.form;
        const button = {
            style: {margin: '5px', marginTop: '43px'}
        };
        const input = {
            style: {width: 280, color: '#000'}
        };
        const form = {
            style: {margin: '10px 30px'}
        };
        return (
            <div>
                <Form>
                    <Row>
                        <Col span={8}>
                            <FormItem
                                label="User ID"
                                {...form}
                            >
                                {getFieldDecorator('userId_search')(
                                    <Input
                                        {...input}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                    label="App User ID"
                                    {...form}
                            >
                                {getFieldDecorator('appUserId_search')(
                                        <Input
                                                {...input}
                                        />
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
                                        style={{width: 120, marginLeft: '30px'}}
                                        onChange={(date, dateString) => this.setState({endTime: dateString})}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                    label="App Name"
                                    {...form}
                            >
                                {getFieldDecorator('appName_search')(
                                        <Select {...input} onSelect={(appId_search) => this.setState({appId_search})}>
                                            {
                                                this.state.appList.map((item, index) => {
                                                    return <Option key={item.id}>{item.appName}</Option>
                                                })
                                            }
                                        </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}></Col>
                        <Col span={8}>
                            <Button type="primary"
                                    onClick={() => this.search()}
                                    {...button}
                                    size="large">
                                <Icon type="search"/>
                                Search
                            </Button>
                            <Button type="primary"
                                    onClick={() => {
                                        resetFields();
                                        this.setState({
                                            startTime: '',
                                            endTime: '',
                                            appId_search: '',
                                        })
                                    }}
                                    {...button}
                                    size="large">
                                <Icon type="sync"/>
                                Clear
                            </Button>
                            <Button type="primary"
                                    onClick={() => this.handleExport()}
                                    {...button}
                                    size="large">
                                <Icon type="export"/>
                                Export
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Table
                    bordered
                    rowKey='id'
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
                <StatusConfirmModal
                    getFieldsValue={getFieldsValue}
                    getFieldDecorator={getFieldDecorator}
                    loading={this.props.Data.buttonLoading}
                    confirmModalShow={this.props.Data.confirmModalShow}
                    onCancel={() => this.props.confirmModalShow(false)}
                    changeStatus={(id) => this.props.changeStatus(id, this.state.checked)}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        Data: state.UserContent
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initPage: (...args) => dispatch(UserContentAction.initPage(...args)),
        updatePage: (...args) => dispatch(UserContentAction.updatePage(...args)),
        changeStatus: (...args) => dispatch(UserContentAction.changeStatus(...args)),
        confirmModalShow: (...args) => dispatch(UserContentAction.confirmModalShow(...args)),
        updateSearchParams: (...args) => dispatch(UserContentAction.updateSearchParams(...args)),
        requestExportList: (...args) => dispatch(UserContentAction.requestExportList(...args)),
    }
}

UserContent = Form.create()(UserContent)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserContent)


