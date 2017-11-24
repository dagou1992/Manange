import React from "react";
import createG2 from 'g2-react';
import G2, {Stat, Frame} from 'g2';
import {Button, Table, Form, Select, Row, Col, DatePicker, Icon, Card} from 'antd';
import {timeReverseReverse, changeToStamp} from '../base/timeCount';

import '../../less/PaymentType.less';
import ListComponent from '../BaseComponent/ListComponent';
import {getApp} from '../../Services/AppServices';


const FormItem = Form.Item;
const Option = Select.Option;
const PieChart = createG2(chart => {
    chart.coord('theta', {
        radius: 0.8 // 设置饼图的大小
    });
    chart.legend('payTypeName', {
        position: 'bottom',
        itemWrap: true,
        formatter: function (val) {
            return val;
        }
    });
    chart.tooltip({
        title: null,
        map: {
            value: 'totalGoodsPrice'
        }
    });
    chart.intervalStack()
        .position(Stat.summary.percent('totalGoodsPrice'))
        .color('payTypeName')
        .label('payTypeName*..percent', (name, percent) => {
            percent = (percent * 100).toFixed(2) + '%';
            return name + ' ' + percent;
        });
    chart.render();
    // 设置默认选中
    var geom = chart.getGeoms()[0]; // 获取所有的图形
    var items = geom.getData(); // 获取图形对应的数据
    geom.setSelected(items[0]); // 设置选中
})

const PieChart2 = createG2(chart => {
    chart.coord('theta', {
        radius: 0.8 // 设置饼图的大小
    });
    chart.legend('payTypeName', {
        position: 'bottom',
        itemWrap: true,
        formatter: function (val) {
            return val;
        }
    });
    chart.tooltip({
        title: null,
        map: {
            value: 'payTypeNameCount'
        }
    });
    chart.intervalStack()
        .position(Stat.summary.percent('payTypeNameCount'))
        .color('payTypeName', ['#C3DEFA','#95C0ED','#7DA8E1','#8C99DC','#BA96E0','#FFA6A8'])
        .label('payTypeName*..percent', (name, percent) => {
            percent = (percent * 100).toFixed(2) + '%';
            return name + ' ' + percent;
        });
    chart.render();
    // 设置默认选中
    var geom = chart.getGeoms()[0]; // 获取所有的图形
    var items = geom.getData(); // 获取图形对应的数据
    geom.setSelected(items[0]); // 设置选中
})

export default class Payment extends ListComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            pieHeight: 300,
            visible: false,
            startTime: '',
            endTime: '',
            appList: [],
        }
    }

    componentDidMount() {
        getApp().then(res => {
            this.setState({appList: res})
        });
    }


    search() {
        const value = this.props.getFieldsValue();
        const param = {
            appId: value.appName_search,
            startTime: this.state.startTime.length == 0 ? '' : changeToStamp(timeReverseReverse(this.state.startTime)) / 1000 - 28800,
            endTime: this.state.endTime.length == 0 ? '' : changeToStamp(timeReverseReverse(this.state.endTime)) / 1000 - 28800,
        }
        for (var i in param) {
            if (param[i] == '') {
                delete param[i];
            }
        }
        this.props.updateSearchParams(param)
        console.log(param)

    }

    render() {
        const {getFieldDecorator, resetFields, getFieldsValue} = this.props;
        const {Data} = this.props;
        const form = {
            style: {margin: '10px'}
        }
        const input = {
            style: {width: '92%'}
        }
        const button = {
            style: {marginTop: '30px', width: '31%'}
        }
        return (
            <div>
                <Row>
                    <Col span={16}>
                        <div style={{
                            marginBottom: '30px',
                            background: '#ecf6fd',
                            height: '30px',
                            lineHeight: '30px',
                            paddingLeft: '30px'
                        }}>
                            <span style={{fontWeight: 'bold'}}><Icon type="area-chart"/> {this.props.title}</span>
                        </div>
                        <Row>
                            <Col span={12}>
                                <Button style={{width: 100}}>Revenue</Button>
                                <PieChart
                                    data={Data.paymentList}
                                    width={this.state.width}
                                    height={this.state.pieHeight}
                                    forceFit={true}
                                />
                            </Col>
                            <Col span={12}>
                                <Button style={{width: 100}}>Transactions</Button>
                                <PieChart2
                                    data={Data.paymentList}
                                    width={this.state.width}
                                    height={this.state.pieHeight}
                                    forceFit={true}
                                />
                            </Col>
                        </Row>
                        <Table
                            bordered
                            dataSource={Data.paymentList}
                            columns={this.props.columns}
                            style={{marginTop: '20px'}}
                            loading={Data.loading}
                            pagination={false}
                        />
                    </Col>
                    <Col span={1}/>
                    <Col span={7}>
                        <Card>
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
                            <FormItem
                                label="Registered Time"
                                {...form}
                            >
                                {getFieldDecorator('startTime')(
                                    <DatePicker
                                        allowClear={false}
                                        style={{width: "45%"}}
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
                                        style={{width: '45%', marginLeft: '10px'}}
                                        onChange={(date, dateString) => this.setState({endTime: dateString})}
                                    />
                                )}
                            </FormItem>
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
                                                startTime: '',
                                                endTime: '',
                                            })
                                        }}
                                        {...button}
                                        style={{width: '31%', margin: '6px'}}
                                >

                                    <Icon type="sync"/>
                                    Clear
                                </Button>
                                <Button type="primary"
                                        onClick={() => this.props.export()}
                                        {...button}
                                >
                                    <Icon type="export"/>
                                    Export
                                </Button>
                            </FormItem>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
