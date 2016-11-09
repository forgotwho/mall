import React from 'react';
import ReactDOM from 'react-dom';
import { Table} from 'antd';
import { Button,Modal } from 'antd';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox } from 'antd';
import { InputNumber, Switch, Radio, Slider, Upload,message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import reqwest from 'reqwest';
import { withRouter } from 'react-router';

const AddView = withRouter(React.createClass({
  getInitialState() {
    return {
      loading: false,
      visible: false,
    };
  },
  showModal() {
    this.setState({
      visible: true,
      param:{},
    });
  },
  handleSubmit(param) {
    this.setState({ param: param });
    this.handleOk();
  },
  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
    $.post('/api/tag/add',this.state.param,function(data){
		}.bind(this));
      this.setState({ loading: false, visible: false });
      this.props.router.push("/tag");
    }, 1000);
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
          ]}
        >
           <AddForm submit={this.handleSubmit} cancel={this.handleCancel}/>
        </Modal>
      </div>
    );
  },
}));

const formProps = {
  name: 'file',
  action: '/api/img',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const AddForm = Form.create()(React.createClass({
  getInitialState() {
    return {
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values);
      //   $.post('/api/tag/add',values,function(data){
          
		    // }.bind(this));
      }
    });
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
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="分类名称"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入分类名称!',
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
            }],
          })(
            <Upload {...formProps}>
              <Button type="ghost">
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类描述"
          hasFeedback
        >
          {getFieldDecorator('memo', {
            rules: [{
              required: true, message: '请输入分类描述!',
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
              required: true, message: '请输入显示顺序!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button key="back" type="ghost" size="large" onClick={this.props.cancel}>返回</Button>,
          <Button type="primary" htmlType="submit" size="large">保存</Button>
        </FormItem>
      </Form>
    );
  },
}));

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

const TableList = React.createClass({
  getInitialState() {
    return {
      data: [],
    };
  },
  fetch(params = {}) {
     $.get('/api/tag',{recommend:"0"},function(data){
      this.setState({
        data: data,
      });
		 }.bind(this));
  },
  componentDidMount() {
    this.fetch();
  },
  render() {
    return (
      <Table columns={columns}
        dataSource={this.state.data}
      />
    );
  },
});

const TagPage = React.createClass({
  render() {
  return (
    <div>
      <Row>
        <Col>
          <AddView />
          <TableList/>
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(TagPage);
