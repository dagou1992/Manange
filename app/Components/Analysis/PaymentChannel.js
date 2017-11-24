import React from "react";
import {connect} from "react-redux";
import {Form} from 'antd';

import '../../less/PaymentType.less';
import Payment from './Payment';
import ListComponent from '../BaseComponent/ListComponent';
import * as PaymentTypeAction from '../../Action/Analysis/PaymentTypeAction';

class PaymentChannel extends ListComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getTable() {
        return [
            {
                title: 'Payment Channel',
                dataIndex: 'paymentChannel',
                key: 'paymentChannel',
                className: 'column-center',
            },
            {
                title: 'Revenue',
                dataIndex: 'Revenue',
                key: 'Revenue',
                className: 'column-center',
            },
            {
                title: 'Transactions',
                dataIndex: 'Transactions',
                key: 'Transactions',
                className: 'column-center',
            },
            {
                title: 'Average Revenue',
                dataIndex: 'averageRevenue',
                key: 'averageRevenue',
                className: 'column-center',
                render: (value, record, index) => value =(parseInt(record.totalGoodsPrice/record.payTypeNameCount).toFixed(2))
            },
            {
                title: 'Percent',
                dataIndex: 'Percent',
                key: 'Percent',
                className: 'column-center',
            },
        ]
    }

    render() {
        const {getFieldDecorator, resetFields, getFieldsValue} = this.props.form;
        const {Data} = this.props;
        return (
            <div>
                <Payment
                    Data={Data}
                    title="Payment Channel"
                    columns={this.getTable()}
                    resetFields={resetFields}
                    getFieldsValue={getFieldsValue}
                    getFieldDecorator={getFieldDecorator}
                    updateSearchParams={(param) =>this.props.updateSearchParams(param)}
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
        initPage: (...args) => dispatch(PaymentTypeAction.initPage(...args)),
        ExportModal: (...args) => dispatch(PaymentTypeAction.ExportModal(...args)),
        updateSearchParams: (...args) => dispatch(PaymentTypeAction.updateSearchParams(...args)),
        requestExportList: (...args) => dispatch(PaymentTypeAction.requestExportList(...args)),
    }
}
PaymentChannel = Form.create()(PaymentChannel);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentChannel)

