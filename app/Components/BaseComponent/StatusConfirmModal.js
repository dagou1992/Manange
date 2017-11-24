import React, {Component} from 'react';
import {Modal, Form, Input, Button, Spin, notification} from 'antd';
const FormItem = Form.Item;

export default class StatusConfirmModal extends Component {
    submitChange() {
        const value = this.props.getFieldsValue();
        if (value.id == value.confirmId) {
            this.props.changeStatus(value.id);
        } else {
            notification['error']({
                message: 'Error',
                description: 'The ID is wrong!',
            });
        }
    }

    render() {
        const {getFieldDecorator, getFieldsValue} = this.props;
        const form = {
            style: {margin: '10px 30px'}
        }
        const input = {
            style: {width: 250}
        }
        const button = {
            style: {margin: '5px'}
        };
        return (
            <div>
                <Modal
                    footer={null}
                    width={400}
                    visible={this.props.confirmModalShow}
                    onCancel={() => this.props.onCancel()}
                >
                    <Spin spinning={this.props.loading}>
                        <Form>
                            <FormItem
                                label="ID"
                                {...form}
                            >
                                {getFieldDecorator('id')(
                                    <Input disabled  {...input}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="Confirm ID"
                                {...form}
                            >
                                {getFieldDecorator('confirmId')(
                                    <Input {...input}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...form}
                            >
                                <Button type='primary'
                                        onClick={() => this.submitChange()}
                                >
                                    Submit
                                </Button>
                                <Button type='primary'
                                        onClick={() => this.props.onCancel()}
                                        style={{background: '#aaa', borderColor: '#aaa'}}
                                        {...button}
                                >
                                    Cancel
                                </Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </Modal>
            </div>
        )
    }
}