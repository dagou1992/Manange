import React from "react";
import {connect} from "react-redux";

import LayoutContainer from '../BaseComponent/LayoutContainer';

class Analysis extends React.Component {
    render() {
        const linkList = [
            {
                key: 'Transaction',
                linkTo: 'Analysis/Transaction',
                value: 'Transaction',
            },
            {
                key: 'TotalRevenue',
                linkTo: 'Analysis/TotalRevenue',
                value: 'Total Revenue',
            },
            {
                key: 'PaymentType',
                linkTo: 'Analysis/PaymentType',
                value: 'Payment Type',
            },
        ]
        return (
            <LayoutContainer linkList={linkList} children={this.props.children}/>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Analysis)




