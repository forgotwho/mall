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
var cookie = require('cookie');
import reqwest from 'reqwest';
import { withRouter,Link } from 'react-router';

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
    $.post('/api/order/add',param,function(data){
      this.setState({ loading: false, visible: false });
      this.props.reload();
		}.bind(this));
  },
  handleChange(){
    this.props.reload();
  },
  handleCancel() {
    this.setState({ visible: false });
  },
  handleBatchDelete() {
    this.props.batchDelete();
  },
  handleEmpty() {
    $.post('/api/order/deleteAll',function(data){
		  this.props.reload();
		 }.bind(this));
  },
  handleTemplate() {
    window.location.href = "/order/订单批量导入模板.xls";
  },
  render() {
    const uploadProps = {
      name: 'file',
      action: '/api/order/upload',
      listType:'text',
    };
    return (
      <div>
        <Button type="primary" style={{marginTop:10,marginBottom:10,width:100,height:30,border:0,fontSize:16}} onClick={this.showModal}>
          新增单号
        </Button>
        <Button type="primary" style={{marginLeft:10,marginTop:10,marginBottom:10,width:100,height:30,border:0,fontSize:16}} onClick={this.handleBatchDelete}>
          批量删除
        </Button>
        <Button type="primary" style={{marginLeft:10,marginTop:10,marginBottom:10,width:100,height:30,border:0,fontSize:16}} onClick={this.handleEmpty}>
          全部清空
        </Button>
        <Button type="primary" style={{marginLeft:10,marginTop:10,marginBottom:10,width:100,height:30,border:0,fontSize:16}} onClick={this.handleTemplate}>
          模板下载
        </Button>
        <Upload {...uploadProps} onChange={this.handleChange}>
          <Button type="primary" style={{marginLeft:10,marginTop:10,marginBottom:10,width:100,height:30,border:0,fontSize:16}}>
            批量上传
          </Button>
        </Upload>
        <Modal
          maskClosable={false}
          visible={this.state.visible}
          title="新增单号"
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

const AddForm = Form.create({
  mapPropsToFields(props) {
    return {
    };
  },
})(React.createClass({
  getInitialState() {
    return {
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values);
      }
    });
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
        offset: 6
      },
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="订单号"
          hasFeedback
        >
          {getFieldDecorator('orderId', {
            rules: [{
              required: true, message: '请输入订单号!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="快递单号"
          hasFeedback
        >
          {getFieldDecorator('expressId', {
            rules: [{
              required: true, message: '请输入快递单号!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{textAlign:'center'}}>
          <Button style={{marginRight:10}} key="back" type="ghost" size="large" onClick={this.props.cancel}>返回</Button>,
          <Button style={{marginLeft:10}} type="primary" htmlType="submit" size="large">保存</Button>
        </FormItem>
      </Form>
    );
  },
}));

const EditForm = Form.create({
  mapPropsToFields(props) {
    return {
    };
  },
})(React.createClass({
  getInitialState() {
    return {
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values);
      }
    });
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
          label="订单号"
          hasFeedback
        >
          {getFieldDecorator('orderId', {
            rules: [{
              required: true, message: '请输入订单号!',
            }],
            initialValue:this.props.data.orderId
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="快递单号"
          hasFeedback
        >
          {getFieldDecorator('expressId', {
            rules: [{
              required: true, message: '请输入快递单号!',
            }],
            initialValue:this.props.data.expressId
          })(
            <Input  />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{textAlign:'center'}}>
          <Button style={{marginRight:10}} key="back" type="ghost" size="large" onClick={this.props.cancel}>返回</Button>,
          <Button style={{marginLeft:10}} type="primary" htmlType="submit" size="large">保存</Button>
        </FormItem>
      </Form>
    );
  },
}));

const OrderPage = React.createClass({
  getInitialState() {
    return {
      data: [],
      loading:false,
      showEdit:false,
      defaultData:{},
      editData:{},
      selectedRowKeys: [],
      selectedRows:[],
      pagination: {},
    };
  },
  fetch(params = {}) {
     console.log('params:', params);
     var page = 1;
     if(params.page!=null&&params.page!=0){
       page = params.page;
     }
     $.get('/api/order/search?page='+page,function(data){
      const pagination = this.state.pagination;
      pagination.total = data.totalElements;
      this.setState({data: data.content,showEdit:false,pagination:pagination});
		 }.bind(this));
  },
  editTag(event){
    var id = event.target.id;
    $.get('/api/order/get/'+id,function(data){
      this.setState({showEdit:true,defaultData:id,editData:data});
		 }.bind(this));
  },
  handleSubmit(param) {
    $.post('/api/order/edit/'+this.state.defaultData,param,function(data){
      this.setState({ loading: false, showEdit: false });
      this.fetch();
		}.bind(this));
  },
  handleCancel() {
    this.setState({ showEdit: false });
  },
  deleteTag(event){
    var id = event.target.id;
    $.post('/api/order/delete/'+id,function(data){
		  this.fetch();
		 }.bind(this));
  },
  deleteBatchTag(){
    var ids = [];
    for(var i=0;i<this.state.selectedRows.length;i++){
      ids.push(this.state.selectedRows[i].id);
    }
    if(ids.length>0){
      $.post('/api/order/batchDelete',{ids:ids.join(",")},function(data){
        this.setState({selectedRowKeys:[],selectedRows:[]});
  		  this.fetch();
  		 }.bind(this));
    }
  },
  onSelectChange(selectedRowKeys,selectedRows) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys,selectedRows });
  },
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      page: pagination.current,
    });
  },
  componentDidMount() {
    var cookies = cookie.parse(document.cookie);
    if(cookies==null){
      this.props.router.replace("/login");
    }else{
      var uid = cookies.uid;
      if(uid==undefined){
        this.props.router.replace("/login");
      }else{
		this.fetch({page:1});
	  }
    }
  },
  render() {
    const columns = [{
      title: '序号',
      dataIndex: 'index',
      render: (text, record) => (
        <a href="#">{record.index}</a>
      ),
    }, {
      title: '订单号',
      dataIndex: 'orderId',
    }, {
      title: '快递号',
      dataIndex: 'expressId',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link id={record.id} onClick={this.editTag}>编辑</Link>
          <span className="ant-divider" />
          <Link id={record.id} onClick={this.deleteTag}>删除</Link>
        </span>
      ),
    }];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
  return (
    <div>
      <Row>
        <Col>
          <AddView reload={this.fetch} batchDelete={this.deleteBatchTag}/>
          <Modal
            maskClosable={false}
            visible={this.state.showEdit}
            title="修改单号"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
            ]}
          >
             <EditForm tagId={this.state.defaultData} data={this.state.editData} submit={this.handleSubmit} cancel={this.handleCancel}/>
          </Modal>
          <Table 
            rowSelection={rowSelection} 
            columns={columns} 
            dataSource={this.state.data} 
            pagination={this.state.pagination}
            onChange={this.handleTableChange}/>
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(OrderPage);
