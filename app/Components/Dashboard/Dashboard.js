import React from "react";
import {connect} from "react-redux";

import LayoutContainer from '../BaseComponent/LayoutContainer';

class Dashboard extends React.Component {
    render() {
        const linkList = [
            {
                key: 'Dashboard',
                linkTo: 'Dashboard/DashboardContent',
                value: 'Dashboard',
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
)(Dashboard)




