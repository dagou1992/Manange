import React from "react";
import {Button, Icon, Checkbox, Modal, Row, Col, Input} from 'antd';


export default class PaymentType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false,
            value: '',
            deleteData: [],
            deleted: false,
        }
    }

    componentDidMount() {
    }

    add() {
        let data = [...this.state.data];
        data.push(this.state.value);
        this.setState({data, add: false})
    }

    contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }

    splice(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                arr.splice(i, 1);
            }
        }
        return arr;
    }

    onChange(e, index) {
        let deleteData = [...this.state.deleteData];
        if (this.contains(deleteData, index)) {
            deleteData = this.splice(deleteData, index);
            document.getElementsByClassName('ant-checkbox')[index].className = 'ant-checkbox'
        } else {
            deleteData.push(index);
            document.getElementsByClassName('ant-checkbox')[index].className = 'ant-checkbox ant-checkbox-checked'
        }
        this.setState({deleteData});
        deleteData.length == 0 ? this.setState({deleted: false}) : this.setState({deleted: true})
    }

    delete() {
        let data = [...this.state.data];
        let Data = [], newD = [];
        let deleteData = [...this.state.deleteData];
        for (var i = 0; i < deleteData.length; i++) {
            Data.push(data[deleteData[i]]);
        }
        let a = new Set(data);
        let b = new Set(Data);
        let differenceABSet = new Set([...a].filter(x => !b.has(x)));
        let arr = Array.from(differenceABSet);
        this.setState({data: arr, deleteData: [], deleted: false});
        const checkedInput = document.getElementsByClassName('ant-checkbox');
        for (var i = 0; i < checkedInput.length; i++) {
            checkedInput[i].setAttribute('class', 'ant-checkbox');
        }
    }


    render() {
        const {paymentTypeVisible} = this.props;
        const Icons = {
            style: {
                color: "#108ee9",
                fontSize: '25px',
                verticalAlign: 'bottom',
                cursor: 'pointer'
            }
        }
        return (
            <Modal
                title="Payment Type"
                footer={null}
                visible={paymentTypeVisible}
                onCancel={() => this.props.onCancel()}
            >
                <Row>
                    {
                        this.state.data.map((item, index) => {
                            return <Col key={index} span={6} style={{marginBottom: '10px'}}>
                                <Checkbox checked={false} onChange={(e) => this.onChange(e, index)}
                                          style={{fontSize: '14px'}}>{item}</Checkbox>
                            </Col>
                        })
                    }
                </Row>
                <div>
                    {
                        this.state.add ? <div>
                            <Input onBlur={(e) => this.setState({value: e.target.value})}
                                   style={{display: 'inline-block', width: 'auto'}}/> <Icon
                            type="check-square" {...Icons} onClick={() => this.add()}/><Icon
                            type="close-square" {...Icons} onClick={() => this.setState({add: false})}/>
                        </div> : <Icon type="plus-square" {...Icons} onClick={() => this.setState({add: true})}/>
                    }
                </div>
                <Button type='primary'
                        onClick={() => this.setState({checked: false})}
                        style={{width: 100, marginTop: '30px'}}
                >
                    Submit
                </Button>
                <Button
                    disabled={this.state.deleted ? false : true}
                    type='primary'
                    onClick={() => this.delete()}
                    style={{
                        width: 100,
                        marginLeft: '10px',
                        boxShadow: '0 0 9px #C32',
                        color: '#fff',
                        background: '#C32',
                        borderColor: '#C32',
                    }}
                >
                    Delete
                </Button>
                <Button type='primary'
                        onClick={() => this.props.onCancel()}
                        style={{
                            background: '#aaa',
                            borderColor: '#aaa',
                            marginLeft: '10px',
                            boxShadow: '0 0 9px #aaa',
                            width: 100
                        }}
                >
                    Cancel
                </Button>
            </Modal>
        )
    }
}
