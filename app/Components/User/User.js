import React from "react";
import {connect} from "react-redux";

import LayoutContainer from '../BaseComponent/LayoutContainer';

class Pay extends React.Component {
    render() {
        const linkList = [
            {
                key: 'User',
                linkTo: 'User/UserContent',
                value: 'User',
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
)(Pay)




