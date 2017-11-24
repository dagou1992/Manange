import React from "react";
import {connect} from "react-redux";

import LayoutContainer from '../BaseComponent/LayoutContainer';

class Account extends React.Component {
    render() {
        const linkList = [
            {
                key: 'Account',
                linkTo: 'Account/AccountContent',
                value: 'Account',
            },
        ]
        return (
            <LayoutContainer linkList={linkList} children={this.props.children}/>
        )
    }
}

function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return {}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account)




