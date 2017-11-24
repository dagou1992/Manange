import React from 'react';
import {Form, Input, Modal, Button, Icon, Table, Popconfirm,} from 'antd';

import ListComponent from '../BaseComponent/ListComponent';
import {
    getAppChargePoints,
    setAppChargePoint,
    deleteAppChargePoint,
} from '../../Services/PayServices';
import {openNotification} from '../../Components/BaseComponent/openNotification';

export default class setPoints extends ListComponent {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'ID',
                key: 'id',
                dataIndex: 'id',
                className: 'column-center',
            },
            {
                title: 'Points',
                dataIndex: 'name',
                key: 'name',
                className: 'column-center',
                render: (text, record, index) => {
                    const {editable} = this.state;
                    return (
                        <div>
                            {editable && this.state.id == index ?
                                <Input
                                    style={{width: 150}}
                                    type="number"
                                    defaultValue={text}
                                    onChange={(e) => this.setState({points: e.target.value})}
                                /> : text
                            }
                        </div>
                    );
                }
            },
            {
                title: '',
                dataIndex: 'equal',
                key: 'equal',
                className: 'column-center',
                render: value => value = '='
            },
            {
                title: 'Rp',
                dataIndex: 'price',
                key: 'price',
                className: 'column-center',
                render: (text, record, index) => {
                    const {editable} = this.state;
                    return (
                        <div>
                            {editable && this.state.id == index ?
                                <Input
                                    style={{width: 150}}
                                    defaultValue={text}
                                    type="number"
                                    onChange={(e) => this.setState({rp: e.target.value})}
                                /> : text
                            }
                        </div>
                    );
                }
            },
            {
                title: 'Edit',
                dataIndex: 'Edit',
                key: 'Edit',
                className: 'column-center',
                render: (text, record, index) => {
                    const {editable} = this.state;
                    return (
                        <div>
                            {editable && this.state.id == index ?
                                <span>
                                            <Icon type="check-square"
                                                  onClick={() => {
                                                      this.setState({editable: false});
                                                      const param = {
                                                          settingId: this.props.settingId,
                                                          name: this.state.points,
                                                          price: this.state.rp,
                                                      }
                                                      record.id ? param.id = record.id : null
                                                      this.setState({loading: true})
                                                      setAppChargePoint(param).then(res => {
                                                          openNotification('success', 'Successfully');
                                                          getAppChargePoints(param.settingId).then(res => {
                                                              this.setState({loading: false});
                                                              this.setState({dataSource: res})
                                                          })
                                                      }).catch(err => {
                                                          openNotification('error', err.message);
                                                      })
                                                  }}
                                                  style={{cursor: 'pointer', fontSize: '16px', margin: '0 10px'}}/>
                                            <Icon
                                                type="close-square"
                                                onClick={() => {
                                                    this.setState({editable: false})
                                                }}
                                                style={{cursor: 'pointer', fontSize: '16px'}}/>
                                        </span> : <span>
                                             <Icon
                                                 type="edit"
                                                 onClick={() => this.setState({
                                                     editable: true,
                                                     id: index,
                                                     points: record.name,
                                                     rp: record.price
                                                 })}
                                                 style={{cursor: 'pointer', fontSize: '16px'}}/>
                                                 </span>
                            }
                        </div>
                    );
                }
            },
            {
                title: 'Delete',
                dataIndex: 'Delete',
                key: 'Delete',
                className: 'column-center',
                render: (value, record) => value = (
                    <Popconfirm title="Are you sure delete this Points?"
                                onConfirm={() => this.onDelete(record.id)}
                                onCancel={() => console.log(onCancel)} okText="Yes" cancelText="No">
                        <Icon type="delete" onClick={() => {
                        }} style={{cursor: 'pointer', fontSize: '16px'}}/>
                    </Popconfirm>
                )
            }
        ];
        this.state = {
            selectValue: '',
            editable: false,
            value: this.props.value,
            disabled: false,
            dataSource: this.props.pointsList,
            loading: false,
        };
    }

    onDelete(key) {
        this.setState({loading: true})
        deleteAppChargePoint(key).then(res => {
            openNotification('success', 'Delete Successfully');
            this.setState({loading: false})
            const dataSource = [...this.state.dataSource];
            this.setState({dataSource: dataSource.filter(item => item.id != key)});
        })
    }

    componentDidMount() {
        console.log(this.props.pointsList);
    }

    render() {
        const {dataSource} = this.state;
        const count = dataSource.length;
        const columns = this.columns;
        const {visible} = this.props;
        const button = {
            style: {width: 150, margin: '30px 0'}
        }
        const add = () => {
            const newData = {
                key: count,
                points: '',
                equal: '=',
                rp: '',
            };
            this.setState({
                dataSource: [...dataSource, newData],
                count: count + 1,
                editable: true,
                id: this.state.dataSource.length
            });
        };

        const toggleStutas = () => {
            if (this.state.count == '6') {
                this.setState({
                    disabled: true
                })
            } else {
                this.setState({
                    count: 1
                })
                add();
            }
        };

        return (
            <div>
                <Modal
                    footer={null}
                    width='630px'
                    title=""
                    visible={visible}
                    onCancel={() => this.props.onCancel()}
                >
                    <Button type="primary" onClick={toggleStutas} {...button}>
                        <Icon type="plus"/> Add Points
                    </Button>
                    <Table
                        rowKey="id"
                        columns={columns}
                        pagination={false}
                        dataSource={dataSource}
                        loading={this.state.loading}
                        title={() => <p style={{
                            textAlign: 'center',
                            color: '#108ee9',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>{this.props.paymentType + '—' + this.props.paymentChannel + ' Points List'}</p>}
                    />
                </Modal>
            </div>
        )
    }
}

