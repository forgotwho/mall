import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Table} from 'antd';
import { Button,Modal } from 'antd';
import { withRouter } from 'react-router';

var dataList = [
    {id: 1, name: "蓝山", image: "images/21.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 2, name: "星河", image: "images/22.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 3, name: "流沙", image: "images/23.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 4, name: "玛瑙", image: "images/24.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 5, name: "蜜恋", image: "images/25.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 6, name: "蓝山2", image: "images/21.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 7, name: "星河2", image: "images/22.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 8, name: "流沙2", image: "images/23.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 9, name: "玛瑙2", image: "images/24.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 10, name: "蜜恋2", image: "images/25.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 11, name: "蓝山3", image: "images/21.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 12, name: "星河3", image: "images/22.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 13, name: "流沙3", image: "images/23.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 14, name: "玛瑙3", image: "images/24.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"},
    {id: 15, name: "蜜恋3", image: "images/25.png",colors:["red","black"],key1:"key1",key2:"14.00 mm",key3:"8.6",key4:"42.5%",key5:"韩国",key6:"1年"}
];
const columns = [{
  title: '产品编码',
  dataIndex: 'id',
  render(text) {
    return <a href="#">{text}</a>;
  },
}, {
  title: '产品名称',
  dataIndex: 'name',
}, {
  title: '产品图片',
  dataIndex: 'image',
  render: (text, record) => (
    <img src={record.image} />
  ),
}, {
}, {
  title: '可选颜色',
  dataIndex: 'colors',
  render: (text, record) => (
    <div style={{width:30}}>
      <div style={{float:'left',width:10,height:10,background:record.colors[0]}}></div>
      <div style={{float:'right',width:10,height:10,background:record.colors[1]}}></div>
    </div>
  ),
}, {
  title: '直径',
  dataIndex: 'key2',
}, {
  title: '基弧',
  dataIndex: 'key3',
}, {
  title: '含水量',
  dataIndex: 'key4',
}, {
  title: '产地',
  dataIndex: 'key5',
}, {
  title: '佩戴周期',
  dataIndex: 'key6',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href={"#/product/detail/"+record.id}>详情</a>
      <span className="ant-divider" />
      <a href={"#/product/edit/"+record.id}>编辑</a>
      <span className="ant-divider" />
      <a href="#">删除</a>
    </span>
  ),
}];

const pagination = {
  total: dataList.length,
  showSizeChanger: true,
  onShowSizeChange(current, pageSize) {
    console.log('Current: ', current, '; PageSize: ', pageSize);
  },
  onChange(current) {
    console.log('Current: ', current);
  },
};

const AddView = React.createClass({
  getInitialState() {
    return {
      loading: false,
      visible: false,
    };
  },
  showModal() {
    this.setState({
      visible: true,
    });
  },
  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  },
  handleCancel() {
    this.setState({ visible: false });
  },
  render() {
    return (
      <div>
        <Button type="primary" style={{marginTop:10,marginBottom:10,width:100,height:30,border:0,fontSize:16}} onClick={this.showModal}>
          新增产品
        </Button>
        <Modal
          visible={this.state.visible}
          title="新增产品"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返回</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  },
});

const ProductPage = React.createClass({
  handleAdd() {
    
  },
  render() {
  return (
    <div>
      <Row>
        <Col>
          <AddView />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table columns={columns} dataSource={dataList} pagination={pagination} />
        </Col>
      </Row>
      
    </div>
  );
  }
});

export default withRouter(ProductPage);
