import React from "react";
import Sortable from 'sortablejs';
import {connect} from "react-redux";
import {Button, Select, Form, Spin, Row, Card} from 'antd';

import * as PaymentRankAction from '../../Action/Pay/PaymentRankAction';
import {getApp} from '../../Services/AppServices';

const FormItem = Form.Item;
const Option = Select.Option;

class PaymentRank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentTypeVisible: false,
            appList: [],
        }
    }

    componentDidMount() {
        this.props.initPage();
        getApp().then(res => {
            this.setState({appList: res})
        });
        var list = document.getElementById("my-ui-list");
        new Sortable(list);
    }

    submit() {
        const cardList = document.getElementsByClassName('ant-card');
        console.log(cardList)
        let arr = [];
        for(let i = 0; i < cardList.length; i++) {
            arr.push(cardList[i].getAttribute('id'))
        }
        this.props.submitSort({
            appId: this.state.appId,
            payTypeIds: arr
        })
    }

    render() {
        const {Data} = this.props;
        const form = {
            style: {margin: '10px', marginLeft: '30px'}
        }
        return (
            <div>
                <Form layout="inline">
                    <FormItem label="App Name" {...form}>
                        <Select
                            style={{width: 200}}
                            onSelect={(appId) => {
                                this.setState({appId})
                                this.props.getPayTypeList(appId);
                            }}
                        >
                            {
                                this.state.appList.map((item, index) => {
                                    return <Option key={item.id}>{item.appName}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                    <FormItem {...form}>
                        <Button
                            key="submit"
                            type="primary"
                            size="large"
                            onClick={() => this.submit()}
                            style={{width: 100, float: 'right', marginLeft: '40px'}}

                        >
                            Submit
                        </Button>
                    </FormItem>
                </Form>
                <hr style={{marginTop: '45px', width: '98%'}}/>
                <Spin spinning={Data.loading}>
                    <Row gutter={16} style={{marginTop: '45px'}}>
                    <div id="my-ui-list">
                        {
                            Data.data.length > 0?
                                    Data.data.map((item, index) => {
                                        return<Card id={item.id} key={index} style={{textAlign: 'center', width: '285px', margin: '0 0 20px 20px'}}>
                                                <p>{item.payTypeName}</p>
                                            </Card>
                                    })
                            :  <p style={{textAlign: 'center', marginTop: '100px'}}>No Data...</p>
                        }
                    </div>
                    </Row>
                </Spin>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        Data: state.PaymentRank
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initPage: (...args) => dispatch(PaymentRankAction.initPage(...args)),
        submitSort: (...args) => dispatch(PaymentRankAction.submitSort(...args)),
        getPayTypeList: (...args) => dispatch(PaymentRankAction.getPayTypeList(...args)),
    }
}

PaymentRank = Form.create()(PaymentRank)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentRank)



