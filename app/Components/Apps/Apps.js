import React from "react";
import {connect} from "react-redux";

import LayoutContainer from '../BaseComponent/LayoutContainer';

class Apps extends React.Component {
    render() {
        const linkList = [
            {
                key: 'Apps',
                linkTo: 'Apps/AppsContent',
                value: 'Apps',
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
)(Apps)




