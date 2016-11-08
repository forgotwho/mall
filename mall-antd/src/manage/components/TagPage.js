import React from 'react';
import ReactDOM from 'react-dom';
import { Table} from 'antd';
import { Button,Modal } from 'antd';
import reqwest from 'reqwest';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox } from 'antd';

import {
  InputNumber, Switch, Radio,
  Slider, Upload,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
  dataIndex: 'picture',
  render: (text, record) => (
    <img src={record.picture} />
  ),
}, {
  title: '分类描述',
  dataIndex: 'memo',
}, {
}, {
  title: '推荐首页',
  dataIndex: 'recommend',
  render: (text, record) => (
    <span>{record.recommend=="1"?"是":"否"}</span>
  ),
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
           <RegistrationForm/>
        </Modal>
      </div>
    );
  },
});

const TableList = React.createClass({
  getInitialState() {
    return {
      data: [],
      pagination: {},
      loading: false,
    };
  },
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  },
  fetch(params = {}) {
    console.log('params:', params);
    this.setState({ loading: true });
     $.get('/api/tag',{recommend:"0"},function(data){
			const pagination = this.state.pagination;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data,
        pagination,
      });
		 }.bind(this));
  },
  componentDidMount() {
    this.fetch();
  },
  render() {
    return (
      <Table columns={columns}
        rowKey={record => record.registered}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  },
});

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

const RegistrationForm = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        $.post('/api/tag',values,function(data){
		    }.bind(this));
      }
    });
  },
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  },
  checkPassowrd(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  },
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  },
  recommendChange(e){
    const form = this.props.form;
    form.recommend = "1";
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="分类名称"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类图标"
          hasFeedback
        >
          {getFieldDecorator('picture', {
            rules: [{
              required: true, message: 'Please input your password!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类描述"
          hasFeedback
        >
          {getFieldDecorator('memo', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="首页推荐"
          hasFeedback
        >
          {getFieldDecorator('recommend', {
            rules: [],
          })(
            <div>
              <Input  type="hidden"/>
              <Switch onChange={this.recommendChange}/>
            </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="显示顺序"
          hasFeedback
        >
          {getFieldDecorator('sortNum', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">保存</Button>
        </FormItem>
      </Form>
    );
  },
}));

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
          <TableList />
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(ProductPage);
