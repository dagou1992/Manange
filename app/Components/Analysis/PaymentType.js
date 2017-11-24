import React from "react";
import {connect} from "react-redux";
import {Form} from 'antd';

import '../../less/PaymentType.less';
import Payment from './Payment';
import ListComponent from '../BaseComponent/ListComponent';

import {getPayTypeList} from '../../Action/Pay/PaymentRankAction';
import * as PaymentTypeAction from '../../Action/Analysis/PaymentTypeAction';

class PaymentType extends ListComponent {
    constructor(props) {
        super(props);
        this.state = {
            allRevenue: 0
        }
    }
    componentDidMount() {
        this.props.initPage();
    }

    getTable() {
        return [
            {
                title: 'Payment Type',
                dataIndex: 'payTypeName',
                key: 'payTypeName',
                className: 'column-center',
            },
            {
                title: 'Revenue',
                dataIndex: 'totalGoodsPrice',
                key: 'totalGoodsPrice',
                className: 'column-center',
                colSpan: 2,
            },
            {
                title: 'Percent',
                dataIndex: 'revenuePercent',
                key: 'revenuePercent',
                className: 'column-center',
                colSpan: 0,
                render: (value, record) => value = ((record.totalGoodsPrice/this.props.Data.allRevenue)*100).toFixed(2) + '%'
            },
            {
                title: 'Transactions',
                dataIndex: 'payTypeNameCount',
                key: 'payTypeNameCount',
                className: 'column-center',
                colSpan: 2,
            },
            {
                title: 'Percent',
                dataIndex: 'transactionsPercent',
                key: 'transactionsPercent',
                className: 'column-center',
                colSpan: 0,
                render: (value, record) => value = ((record.payTypeNameCount/this.props.Data.allTransaction)*100).toFixed(2) + '%'
            },
            {
                title: 'Average Revenue',
                dataIndex: 'avgRevenue',
                key: 'avgRevenue',
                className: 'column-center',
                render: (value, record, index) => value = (parseInt(record.totalGoodsPrice / record.payTypeNameCount).toFixed(2))
            },
        ]
    }

    render() {
        const {getFieldDecorator, resetFields, getFieldsValue} = this.props.form;
        const {Data} = this.props;
        return (
            <div>
                {
                    Data.paymentList instanceof Array? <Payment
                        title="Payment Type"
                        columns={this.getTable()}
                        getFieldDecorator={getFieldDecorator}
                        resetFields={resetFields}
                        getFieldsValue={getFieldsValue}
                        Data={Data}
                        getPayTypeList={(appId) => this.props.getPayTypeList(appId)}
                        updateSearchParams={(param) => this.props.updateSearchParams(param)}
                        initPage={() => this.props.initPage()}
                        export={() => this.handleExport()}
                    />: null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        Data: state.PaymentType
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initPage: (...args) => dispatch(PaymentTypeAction.initPage(...args)),
        updateSearchParams: (...args) => dispatch(PaymentTypeAction.updateSearchParams(...args)),
        requestExportList: (...args) => dispatch(PaymentTypeAction.requestExportList(...args)),
        getPayTypeList: (...args) => dispatch(PaymentTypeAction.getPayTypeList(...args))
    }
}
PaymentType = Form.create()(PaymentType);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentType)
