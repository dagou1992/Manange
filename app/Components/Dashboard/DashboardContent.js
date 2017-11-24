import React from "react";
import {connect} from "react-redux";
import {Link} from 'react-router';
import createG2 from 'g2-react';
import G2, {Stat, Frame} from 'g2';
import {Row, Col, Radio, Icon, Spin} from 'antd';

import '../../less/Dashboard.less';
import * as DashboardAction from '../../Action/Dashboard/DashboardAction';
import {numberDivideWithDot, numberDivideWithComma} from '../base/base';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Chart = createG2(chart => {
    chart.axis('createdAtFormat', {
        title: null,
    });
    chart.col('createdAtFormat', {
        type: 'cat',
        tickCount: 6
    })
    chart.col('totalGoodsPrice', {
        alias: 'Revenue'
    });
    chart.col('totalTransactions', {
        alias: 'Transactions'
    })
    chart.legend('totalGoodsPrice', false);
    chart.legend({
        position: 'bottom',
        spacingX: 40,
        dy: 10,
    })
    chart.interval().position('createdAtFormat*totalGoodsPrice').color('#108ee9');
    chart.line().position('createdAtFormat*totalTransactions').color('#09bd10').size(2).shape('smooth');
    chart.point().position('createdAtFormat*totalTransactions').color('#09bd10').shape('diamond');
    chart.render();
})

const PieChart = createG2(chart => {
    chart.coord('theta', {
        radius: 0.5 // 设置饼图的大小
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
        radius: 0.5 // 设置饼图的大小
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
        .color('payTypeName',['#E6C6F4','#BA96E0','#FFCFD4','#FFA6A8','#C3DEFA','#ED3D04'])
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

class DashboardContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forceFit: true,
            width: 0,
            height: 300,
            pieHeight: 500,
            month: '',
        }
    }

    componentDidMount() {
        const date = new Date();
        let month = date.getMonth() + 1;
        month = month.toString();
        switch (month) {
            case '1':
                month = 'Jan';
                break;
            case '2':
                month = 'Feb';
                break;
            case '3':
                month = 'Mar';
                break;
            case '4':
                month = 'Apr';
                break;
            case '5':
                month = 'May';
                break;
            case '6':
                month = 'Jun';
                break;
            case '7':
                month = 'Jul';
                break;
            case '8':
                month = 'Aug';
                break;
            case '9':
                month = 'Sep';
                break;
            case '10':
                month = 'Oct';
                break;
            case '11':
                month = 'Nov';
                break;
            case '12':
                month = 'Dec';
                break;
        }
        this.setState({month});
        this.props.initPage();
    }

    onTrendChange(e) {
        this.props.getDashboardTrendList(e.target.value);
    }

    onOverviewChange(e) {
        this.props.getDashboardOverviewList(e.target.value);
    }

    render() {
        const {Data} = this.props;
        console.log(Data.DashboardTrendList);
        const totalRevenue = numberDivideWithDot(Data.DashboardOverviewList.totalGoodsPrice);
        const totalTransactions = numberDivideWithComma(Data.DashboardOverviewList.totalTransactions);
        const totalPayerCount = numberDivideWithComma(Data.DashboardOverviewList.totalPayerCount);
        const totalGoodsPrice = numberDivideWithComma((Number(Data.DashboardOverviewList.totalGoodsPrice) / Number(Data.DashboardOverviewList.totalTransactions)).toFixed(2));
        return (
            <div>
                <Spin spinning={Data.DashboardOverviewLoading}>
                    <div style={{textAlign: 'right', marginBottom: '20px'}}>
                        <RadioGroup onChange={(...args) => this.onOverviewChange(...args)} defaultValue="daily">
                            <RadioButton value="daily" style={{width: '70px', textAlign: 'center'}}>Day</RadioButton>
                            <RadioButton value="weekly">Week</RadioButton>
                            <RadioButton value="monthly">Month</RadioButton>
                        </RadioGroup>
                    </div>
                    <Row>
                        <Col span={6}>
                            <div className="statistics" style={{border: 0}}>
                                <p style={{fontSize: '15px'}}>{'Rp ' + (totalRevenue == null? 0: totalRevenue)} </p>
                                <p>Total Revenue</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className="statistics">
                                <p style={{fontSize: '15px'}}>{totalTransactions == null? 0: totalTransactions}</p>
                                <p>Number of Transactions</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className="statistics">
                                <p style={{fontSize: '15px'}}>{totalPayerCount == null? 0: totalPayerCount}</p>
                                <p>Number of Payer</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className="statistics">
                                <p>{'Rp ' + totalGoodsPrice}</p>
                                <p>Average Revenue</p>
                            </div>
                        </Col>
                    </Row>
                </Spin>
                <div className="totalRevenue">
                    <span><Icon type="area-chart"/><Link to="Analysis/TotalRevenue"
                                                         onClick={() => {
                                                             window.localStorage.setItem('hostKey', 'Analysis');
                                                             window.localStorage.setItem('subKey', 'TotalRevenue');
                                                         }}> Total Revenue</Link></span>
                    <RadioGroup onChange={(...args) => this.onTrendChange(...args)} defaultValue="monthly">
                        <RadioButton value="monthly">month</RadioButton>
                        <RadioButton value="yearly">Year</RadioButton>
                    </RadioGroup>
                </div>
                <Spin spinning={Data.DashboardLoading}>
                    <Chart
                        data={Data.DashboardTrendList}
                        width={this.state.width}
                        height={this.state.height}
                        forceFit={this.state.forceFit}/>
                </Spin>
                <Row>
                    <Col span={11}>
                        <div className="totalRevenue">
                            <span><Icon type="pie-chart"/><Link to="Analysis/PaymentType" onClick={() => {
                                window.localStorage.setItem('hostKey', 'Analysis');
                                window.localStorage.setItem('subKey', 'PaymentType');
                            }}> Top 5 of Payment Type —— From Total Revenue</Link></span>
                            <span style={{float: 'right', marginRight: '10px'}}>{this.state.month}</span>
                        </div>
                        <PieChart
                            data={Data.RevenueByPayTypeList}
                            width={this.state.width}
                            height={this.state.pieHeight}
                            forceFit={true}
                        />
                    </Col>
                    <Col span={2}/>
                    <Col span={11}>
                        <div className="totalRevenue">
                            <span><Icon type="pie-chart"/><Link to="Analysis/PaymentType" onClick={() => {
                                window.localStorage.setItem('hostKey', 'Analysis');
                                window.localStorage.setItem('subKey', 'PaymentType');
                            }}> Top 5 of Payment Type —— From Transactions</Link></span>
                            <span style={{float: 'right', marginRight: '10px'}}>{this.state.month}</span>
                        </div>
                        <PieChart2
                            data={Data.TransactionsByPayTypeList}
                            width={this.state.width}
                            height={this.state.pieHeight}
                            forceFit={true}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        Data: state.Dashboard
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initPage: (...args) => dispatch(DashboardAction.initPage(...args)),
        getDashboardTrendList: (...args) => dispatch(DashboardAction.getDashboardTrendList(...args)),
        getDashboardOverviewList: (...args) => dispatch(DashboardAction.getDashboardOverviewList(...args)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContent)



