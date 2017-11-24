import React from "react";
import {connect} from "react-redux";
import createG2 from 'g2-react';
import G2, {Stat, Frame} from 'g2';
import {Button, Table, Form, Spin, Select, Row, Col, DatePicker, Icon} from 'antd';


import {getApp} from '../../Services/AppServices';
import ListComponent from '../BaseComponent/ListComponent';
import {getPayTypeList} from '../../Action/Pay/PaymentRankAction';
import {timeReverseReverse, changeToStamp} from '../base/timeCount';
import * as TotalRevenueAction from '../../Action/Analysis/TotalRevenueAction';

const FormItem = Form.Item;
const Option = Select.Option;

const Chart = createG2(chart => {
    chart.axis('createdAtFormat', {
        title: null,
    });
    chart.col('createdAtFormat', {
        type: 'timeCat',
        mask: 'yyyy-mm-dd',
        tickCount: 3
    })
    chart.col('totalGoodsPrice', {
        alias: 'Revenue'
    });
    chart.col('totalTransactions', {
        alias: 'Transactions'
    });
    chart.legend({
        position: 'bottom',
        spacingX: 40,
        dy: 10,
    });
    chart.interval().position('createdAtFormat*totalGoodsPrice').color('#108ee9');
    chart.line().position('createdAtFormat*totalTransactions').color('#09bd10').size(2).shape('smooth');
    chart.point().position('createdAtFormat*totalTransactions').color('#09bd10').shape('diamond');
    chart.render();
})
const Chart2 = createG2(chart => {
    chart.axis('createdAtFormat', {
        title: null,
    });
    chart.col('totalGoodsPrice', {
        alias: 'Revenue'
    });
    chart.col('totalTransactions', {
        alias: 'Transactions'
    });
    chart.legend({
        position: 'bottom',
        spacingX: 40,
        dy: 10,
    });
    chart.interval().position('createdAtFormat*totalGoodsPrice').color('#108ee9');
    chart.line().position('createdAtFormat*totalTransactions').color('#09bd10').size(2).shape('smooth');
    chart.point().position('createdAtFormat*totalTransactions').color('#09bd10').shape('diamond');
    chart.render();
})

class TotalRevenue extends ListComponent {
    constructor(props) {
        super(props);
        this.state = {
            forceFit: true,
            width: 0,
            height: 300,
            visible: false,
            startTime: '',
            endTime: '',
            appList: [],
            searchDay: true,
        }
    }

    componentDidMount() {
        this.props.initPage();
        getApp().then(res => {
            this.setState({appList: res})
        });
    }

    getTable() {
        return [
            {
                title: 'Period',
                dataIndex: 'createdAtFormat',
                key: 'createdAtFormat',
                className: 'column-center',
            },
            {
                title: 'Total Revenue',
                dataIndex: 'totalGoodsPrice',
                key: 'totalGoodsPrice',
                className: 'column-center',
            },
            {
                title: 'Number of Transactions',
                dataIndex: 'totalTransactions',
                key: 'totalTransactions',
                className: 'column-center',
            },
            {
                title: 'Number for Payer',
                dataIndex: 'totalPayerCount',
                key: 'totalPayerCount',
                className: 'column-center',
            },
            {
                title: 'Average Revenue',
                dataIndex: 'orderAvgRevenue',
                key: 'orderAvgRevenue',
                className: 'column-center',
                render: (value, record, index) => value = (parseInt(record.totalGoodsPrice / record.totalTransactions).toFixed(2))
            },
            {
                title: 'Average Consumption',
                dataIndex: 'userAvgConsumption',
                key: 'userAvgConsumption',
                className: 'column-center',
                render: (value, record, index) => value = (parseInt(record.totalGoodsPrice / record.totalPayerCount).toFixed(2))
            },
        ]
    }

    search() {
        const value = this.props.form.getFieldsValue();
        value.period_search == 'Day'? this.setState({searchDay: true}): this.setState({searchDay: false})
        const param = {
            appId: value.appName_search,
            period: value.period_search,
            startTime: this.state.startTime.length == 0 ? '' : changeToStamp(timeReverseReverse(this.state.startTime)) / 1000 - 28800,
            endTime: this.state.endTime.length == 0 ? '' : changeToStamp(timeReverseReverse(this.state.endTime)) / 1000 - 28800,
        }
        for (var i in param) {
            if (param[i] == '') {
                delete param[i];
            }
        }
        this.props.updateSearchParams(param)
    }

    render() {
        const {getFieldDecorator, resetFields, setFieldsValue, getFieldsValue} = this.props.form;
        const {Data} = this.props;
        const form = {
            style: {margin: '10px 30px'}
        }
        const input = {
            style: {width: 250}
        }
        const button = {
            style: {margin: '5px', marginTop: '30px', width: 100}
        }
        return (
            <div>
                <Spin spinning={Data.loading}>
                    <Form>
                        <Row>
                            <Col span={6}>
                                <FormItem
                                    label="Period"
                                    {...form}
                                >
                                    {getFieldDecorator('period_search', {
                                        initialValue: "Day"
                                    })(
                                        <Select  {...input} >
                                            <Option value="Day">Day</Option>
                                            <Option value="Week">Week</Option>
                                            <Option value="Month">Month</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
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
                            <Col span={6}>
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
                            <Col span={6}>
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
                                                setFieldsValue({
                                                    Dayperiod_search: 'Day'
                                                })
                                                this.setState({
                                                    startTime: '',
                                                    endTime: '',
                                                })
                                            }}
                                            {...button}>
                                        <Icon type="sync"/>
                                        Clear
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <div style={{
                        margin: '30px 0',
                        background: '#ecf6fd',
                        height: '30px',
                        lineHeight: '30px',
                        paddingLeft: '30px'
                    }}>
                        <span style={{fontWeight: 'bold'}}><Icon type="area-chart"/> Total Revenue</span>
                    </div>
                    {
                        this.state.searchDay?
                            <Chart
                                data={Data.data.length > 0? Data.data.slice(Data.data.length - 31 < 0? 0: Data.data.length - 31, Data.data.length): []}
                                width={this.state.width}
                                height={this.state.height}
                                forceFit={this.state.forceFit}
                            />
                            :
                            <Chart2
                                data={Data.data.length > 0? Data.data.slice(Data.data.length - 31 < 0? 0: Data.data.length - 31, Data.data.length): []}
                                width={this.state.width}
                                height={this.state.height}
                                forceFit={this.state.forceFit}
                            />
                    }
                    <Row>
                        <Col span={6}/>
                        <Col span={6}/>
                        <Col span={6}/>
                        <Col span={6}>
                            <FormItem
                                label=""
                                {...form}
                            >
                                <Button type="primary"
                                        onClick={() => this.handleExport()}
                                        style={{marginLeft: '110px', width: 100}}
                                >
                                    <Icon type="export"/>
                                    Export
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                    {
                        Data.data instanceof Array ?
                            <Table
                                bordered
                                rowKey="createdAtFormat"
                                dataSource={Data.data}
                                columns={this.getTable()}
                                style={{marginTop: '20px'}}
                                loading={Data.loading}
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
                            /> : null
                    }
                </Spin>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        Data: state.TotalRevenue
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initPage: (...args) => dispatch(TotalRevenueAction.initPage(...args)),
        updatePage: (...args) => dispatch(TotalRevenueAction.updatePage(...args)),
        updateSearchParams: (...args) => dispatch(TotalRevenueAction.updateSearchParams(...args)),
        requestExportList: (...args) => dispatch(TotalRevenueAction.requestExportList(...args)),
    }
}
TotalRevenue = Form.create()(TotalRevenue);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TotalRevenue)

/*
    [
    {'createdAtFormat':"2017-09-24",
        'totalGoodsPrice':5000,
        'totalPayerCount':2,
        'totalTransactions':2},
        {'createdAtFormat':"2017-09-25",
            'totalGoodsPrice':5000,
            'totalPayerCount':2,
            'totalTransactions':2},
        {'createdAtFormat':"2017-09-26",
            'totalGoodsPrice':50000,
            'totalPayerCount':2,
            'totalTransactions':2},
        {'createdAtFormat':"2017-09-27",
            'totalGoodsPrice':500000,
            'totalPayerCount':1,
            'totalTransactions':1},
        {'createdAtFormat':"2017-09-28",
            'totalGoodsPrice':50000,
            'totalPayerCount':2,
            'totalTransactions':2}]*/
