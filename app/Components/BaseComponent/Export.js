import React from "react";
import {Modal, Form, Input, Spin} from 'antd';
const FormItem = Form.Item;
export default class Export extends React.Component {
    render() {
        const formItemLayout = {
            style: {width: "60%", marginLeft: '20px'}
        };
        const {getFieldDecorator} = this.props;
        return (
            <Modal
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                onOk={() => this.props.submitExport()}
                title="Export Data"
            >
                <Spin spinning={this.props.loading}>
                    <Form>
                        <FormItem
                            label="Page"
                            {...formItemLayout}>
                            {getFieldDecorator('page', {
                                initialValue: 1,
                                rules: [{required: true, message: 'Please input page!'}],
                            })(
                                <Input placeholder="input page...."/>
                            )}
                        </FormItem>
                        <FormItem
                            label="PageSize"
                            {...formItemLayout}>
                            {getFieldDecorator('pageSize', {
                                initialValue: 50,
                                rules: [{required: true, message: 'Please input pageSize!'}],
                            })(
                                <Input placeholder="input pageSize...."/>
                            )}
                        </FormItem>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}