import React from "react";
import {connect,} from "react-redux";
import {Modal, Button, Table, Form, Input} from 'antd';
import {updatePasswords} from '../Services/LoginService';
import {openNotification} from '../Components/BaseComponent/openNotification';

const FormItem = Form.Item;

class AlterPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            id: -1111,
            loading: false,
        }
    }

    componentDidMount() {

    }

    alterPassword() {
        const {getFieldsValue, resetFields} = this.props.form;
        let value = getFieldsValue();
        const param = {
            id: this.props.userId,
            oldPassword: value.oldPassword,
            password: value.newPassword,
            confirmPassword: value.confirmPassword
        }
        if (param.password != param.confirmPassword) {
            openNotification('error', 'The confirm password is error');
        } else {
            this.setState({loading: true})
            updatePasswords(param).then(res => {
                this.setState({loading: false});
                openNotification('success', 'Successfully');
                this.props.onCancel();
            }).catch(err => {
                openNotification('error', err.message);
                this.setState({loading: false})
            })
        }
    }

    render() {
        const {Data} = this.props;
        const form = {
            style: {margin: '10px 30px'}
        }
        const input = {
            style: {width: 200}
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <Modal
                visible={this.props.show}
                style={{marginTop: '50px'}}
                onCancel={this.props.onCancel}
                footer={[
                    <Button onClick={this.props.onCancel}>Cancel</Button>,
                    <Button type='primary' onClick={() => this.alterPassword()}
                            loading={this.state.loading}>Submit</Button>
                ]}
            >
                <Form layout="vertical">
                    <FormItem
                        label="Old Password"
                        {...form}
                    >
                        {getFieldDecorator('oldPassword')(
                            <Input {...input} type="password"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="New Password"
                        {...form}
                    >
                        {getFieldDecorator('newPassword')(
                            <Input {...input} type="password"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="confirm Password"
                        {...form}
                    >
                        {getFieldDecorator('confirmPassword')(
                            <Input {...input} type="password"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
function mapStateToProps(state) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {}
}
AlterPassword = Form.create()(AlterPassword);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlterPassword)
