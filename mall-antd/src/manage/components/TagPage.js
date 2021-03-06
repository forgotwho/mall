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
    $.post('/api/tag/add',param,function(data){
      this.setState({ loading: false, visible: false });
      this.props.reload();
		}.bind(this));
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
          maskClosable={false}
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

const AddForm = Form.create({
  mapPropsToFields(props) {
    return {
    };
  },
})(React.createClass({
  getInitialState() {
    return {
      recommend:false
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var params = [];
        if(values.picture!=null){
          var picture = values.picture[0];
          var param = {
            name:picture.name,
            type:picture.type,
            uid:picture.uid,
            size:picture.size,
            thumbUrl:picture.thumbUrl,
            status:picture.status,
          };
          params.push(param);
          values.picture = picture.uid;
        }
        $.ajax({  
            url : '/api/img/batchUpload',  
            type : "POST",  
            datatype:"json",  
            contentType: "application/json; charset=utf-8",  
            data :JSON.stringify(params),  
            success : function(data, stats) {  
            },  
            error : function(data) {  
              alert("请求失败");  
            }  
        });
        values.recommend = this.state.recommend;
        this.props.submit(values);
      }
    });
  },
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  },
  handleChange(checked){
    this.setState({recommend:checked});
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
    const uploadProps = {
      name: 'file',
      action: '/api/img/preview',
      listType:'picture',
      multiple:true,
      onChange(info) {
        console.log("event=",info.event);
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
        >
          {getFieldDecorator('picture', {
            valuePropName: 'fileList',
            normalize: this.normFile,
          })(
            <Upload {...uploadProps}>
              <Button type="ghost">
                <Icon type="upload" />点击上传
              </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类背景"
          hasFeedback
        >
          {getFieldDecorator('color', {
            rules: [{
              required: true, message: '请输入分类背景!',
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
            rules: [{
            }],
            valuePropName: 'checked'
          })(
            <div>
              <Switch onChange={this.handleChange}/>
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
            <Input />
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
      recommend:false,
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var params = [];
        if(values.picture!=null){
          var picture = values.picture[0];
          var param = {
            name:picture.name,
            type:picture.type,
            uid:picture.uid,
            size:picture.size,
            thumbUrl:picture.thumbUrl,
            status:picture.status,
          };
          params.push(param);
          values.picture = picture.uid;
        }
        $.ajax({  
            url : '/api/img/batchUpload',  
            type : "POST",  
            datatype:"json",  
            contentType: "application/json; charset=utf-8",  
            data :JSON.stringify(params),  
            success : function(data, stats) {  
            },  
            error : function(data) {  
              alert("请求失败");  
            }  
        });
        values.recommend = this.state.recommend;
        this.props.submit(values);
      }
    });
  },
  handleChange(checked){
    this.setState({recommend:checked});
  },
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
    const uploadProps = {
      name: 'file',
      action: '/api/img/preview',
      listType:'picture',
      multiple:true,
      onChange(info) {
        console.log("event=",info.event);
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
            initialValue:this.props.data.name
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类图标"
        >
          {getFieldDecorator('picture', {
            valuePropName: 'fileList',
            normalize: this.normFile,
            initialValue:[{
              uid: this.props.data.picture,
              status: 'done',
              url: "/api/img/thumb/"+this.props.data.picture,
              thumbUrl: "/api/img/thumb/"+this.props.data.picture,
            }]
          })(
            <Upload {...uploadProps}>
              <Button type="ghost">
                <Icon type="upload" />点击上传
              </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类背景"
          hasFeedback
        >
          {getFieldDecorator('color', {
            rules: [{
              required: true, message: '请输入分类背景!',
            }],
            initialValue:this.props.data.color
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
              required: true, message: '请输入分类描述!',
            }],
            initialValue:this.props.data.memo
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
          valuePropName: 'checked',
          initialValue:this.props.data.recommend
          })(
              <Switch onChange={this.handleChange}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="显示顺序"
          hasFeedback
        >
          {getFieldDecorator('sortNum', {
            rules: [{required: true, message: '请输入显示顺序!',
            }],
            initialValue:""+this.props.data.sortNum
          })(
            <Input   />
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

const TagPage = React.createClass({
  getInitialState() {
    return {
      data: [],
      loading:false,
      showEdit:false,
      defaultData:{},
      editData:{}
    };
  },
  fetch(params = {}) {
     $.get('/api/tag',function(data){
      this.setState({data: data,showEdit:false});
		 }.bind(this));
  },
  componentDidMount() {
    this.fetch();
  },
  editTag(event){
    var id = event.target.id;
    $.get('/api/tag/'+id,function(data){
      this.setState({showEdit:true,defaultData:id,editData:data});
		 }.bind(this));
  },
  handleSubmit(param) {
    $.post('/api/tag/edit/'+this.state.defaultData,param,function(data){
      this.setState({ loading: false, showEdit: false });
      this.fetch();
		}.bind(this));
  },
  handleCancel() {
    this.setState({ showEdit: false });
  },
  deleteTag(event){
    var id = event.target.id;
    $.post('/api/tag/delete/'+id,function(data){
		  this.fetch();
		 }.bind(this));
  },
  render() {
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
        <img width="250" height="40" src={"/api/img/thumb/"+record.picture} />
      ),
    }, {
      title: '分类背景',
      dataIndex: 'color',
      render: (text, record) => (
        <div key={record.color} style={{marginLeft:5,float:'left',width:10,height:10,background:record.color}}></div>
      ),
    }, {
      title: '分类描述',
      dataIndex: 'memo',
    }, {
      title: '推荐首页',
      dataIndex: 'recommend',
      render: (text, record) => (
        <span>{record.recommend==true?"是":"否"}</span>
      ),
    }, {
      title: '显示排序',
      dataIndex: 'sortNum',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={"/tag/detail/"+record.id}>详情</Link>
          <span className="ant-divider" />
          <Link id={record.id} onClick={this.editTag}>编辑</Link>
          <span className="ant-divider" />
          <Link id={record.id} onClick={this.deleteTag}>删除</Link>
        </span>
      ),
    }];
  return (
    <div>
      <Row>
        <Col>
          <AddView reload={this.fetch}/>
          <Modal
            maskClosable={false}
            visible={this.state.showEdit}
            title="修改分类"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
            ]}
          >
             <EditForm tagId={this.state.defaultData} data={this.state.editData} submit={this.handleSubmit} cancel={this.handleCancel}/>
          </Modal>
          <Table columns={columns} dataSource={this.state.data} />
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(TagPage);
