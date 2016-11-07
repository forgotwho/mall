import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Table} from 'antd';
import { Button,Modal } from 'antd';
import { withRouter } from 'react-router';

var dataList = [
    {id: 1, name: "14.00mm", image: "images/21.png",memo:"蓝山1",sortNum:1,recomment:"是"},
    {id: 2, name: "16.00mm", image: "images/22.png",memo:"星河2",sortNum:2,recomment:"否"},
    {id: 3, name: "18.00mm", image: "images/23.png",memo:"流沙3",sortNum:3,recomment:"是"},
    {id: 4, name: "20.00mm", image: "images/24.png",memo:"玛瑙4",sortNum:4,recomment:"否"},
    {id: 5, name: "22.00mm", image: "images/25.png",memo:"蜜恋5",sortNum:5,recomment:"是"}
];
const columns = [{
  title: '分类编码',
  dataIndex: 'id',
  render(text) {
    return <a href="#">{text}</a>;
  },
}, {
  title: '分类名称',
  dataIndex: 'name',
}, {
  title: '分类图标',
  dataIndex: 'image',
  render: (text, record) => (
    <img src={record.image} />
  ),
}, {
  title: '分类描述',
  dataIndex: 'memo',
}, {
}, {
  title: '推荐首页',
  dataIndex: 'recomment',
}, {
  title: '显示排序',
  dataIndex: 'sortNum',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href={"#/tag/detail/"+record.id}>详情</a>
      <span className="ant-divider" />
      <a href={"#/tag/edit/"+record.id}>编辑</a>
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
          新增分类
        </Button>
        <Modal
          visible={this.state.visible}
          title="新增分类"
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
