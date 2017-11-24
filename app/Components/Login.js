import React from "react";
import {connect,} from "react-redux";
import {
    action_login_modal_visible,
    action_login_timestamp,
    action_login_requestLogin
} from "../Action/login/LoginAction";
import {Modal, Form, Input, Spin} from "antd";
import {applyBasePath} from '.././utils/FetchUtil';

const captchaImgUrl = applyBasePath('/auth/captcha');
const FormItem = Form.Item;

class Login extends React.Component {
    componentDidMount() {

    }

    render() {

        const {login, visible, updateTimestamp, requestLogin} = this.props;
        const {getFieldDecorator, validateFields} = this.props.form;

        const captchaImgUrlWithTimestamp = captchaImgUrl + '?timestamp=' + login.timestamp;

        return (

            <Modal
                title="Login"
                closable={false}
                maskClosable={false}
                visible={login.modal_visible}
                confirmLoading={login.confirmLoading}
                onOk={e => {
                    validateFields((err, value) => {
                        console.log(err, value)
                        if (!err) {
                            requestLogin(
                                value.username,
                                value.password,
                                value.captcha
                            )
                        }
                    })
                }}
                onCancel={e => {
                    visible(false)
                }}
            >
                <Spin spinning={login.confirmLoading}>
                    <Form>
                        <FormItem
                            hasFeedback
                            label="Username"
                            validateStatus={ login.validateStatus_user_pas }
                        >
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Required'}],
                            })(
                                <Input
                                    placeholder="Username"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            hasFeedback
                            label="Password"
                            validateStatus={ login.validateStatus_user_pas }
                        >
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Required'}],
                            })(
                                <Input
                                    placeholder="Password"
                                    type="password"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            hasFeedback
                            label="Captcha"
                            validateStatus={ login.validateStatus_cap }
                        >
                            {getFieldDecorator('captcha', {
                                rules: [{required: true, message: 'Required'}],
                                //initialValue: 100
                            })(
                                <Input
                                    placeholder="Captcha"
                                />
                            )}
                        </FormItem>
                        <img src={captchaImgUrlWithTimestamp} onClick={e => updateTimestamp(Date.now())}/>
                    </Form>
                </Spin>
            </Modal>

        )
    }
}

Login = Form.create()(Login);

function mapStateToProps(state) {
    return {
        login: state.Login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        visible: (...args) => dispatch(action_login_modal_visible(...args)),
        updateTimestamp: (...args) => dispatch(action_login_timestamp(...args)),
        requestLogin: (...args) => dispatch(action_login_requestLogin(...args)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
