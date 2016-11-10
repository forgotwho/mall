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
  handleSubmit(param,recommend) {
    var datas = {name:param.name,picture:param.picture[0].thumbUrl,memo:param.memo,recommend:recommend,sortNum:param.sortNum};
    $.post('/api/tag/add',datas,function(data){
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
      recommend:'0'
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values,this.state.recommend);
      //   $.post('/api/tag/add',values,function(data){
          
		    // }.bind(this));
      }
    });
  },
  recommendChange(checked){
    const form = this.props.form;
    if(checked){
      this.setState({recommend:"1"});
    }else{
      this.setState({recommend:"0"});
    }
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
      name:'file',
      action: '/api/img',
      listType: 'picture',
      defaultFileList: [],
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
            <Upload name="file" action="/api/img" listType="picture" onChange={this.handleUpload}>
              <Button type="ghost">
                <Icon type="upload" /> Click to upload
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

const EditForm = Form.create()(React.createClass({
  getInitialState() {
    return {
      data:{},
      recommend:'0'
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values,this.state.recommend);
      //   $.post('/api/tag/add',values,function(data){
          
		    // }.bind(this));
      }
    });
  },
  recommendChange(checked){
    const form = this.props.form;
    if(checked){
      this.setState({recommend:"1"});
    }else{
      this.setState({recommend:"0"});
    }
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
      name:'file',
      action: '/api/img',
      listType: 'picture',
      defaultFileList: [
      ],
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
            normalize: this.normFile
          })(
            <Upload name="file" action="/api/img" listType="picture" onChange={this.handleUpload}>
              <Button type="ghost">
                <Icon type="upload" /> Click to upload
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
            rules: [],
            initialValue:this.props.data.recommend
          })(
            <div>
              <Input  type="hidden"/>
              <Switch defaultChecked={this.props.data.recommend=='1'?true:false} onChange={this.recommendChange}/>
            </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="显示顺序"
          hasFeedback
        >
          {getFieldDecorator('sortNum', {
            rules: [{type: 'number',
              required: true, message: '请输入显示顺序!',
            }],
            initialValue:this.props.data.sortNum
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
     $.get('/api/tag',{recommend:"0"},function(data){
      this.setState({
        data: data,
      });
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
  handleSubmit(param,recommend) {
    var datas = {name:param.name,picture:this.state.editData.picture,memo:param.memo,recommend:recommend,sortNum:param.sortNum};
    if(param.picture){
      datas = {name:param.name,picture:param.picture[0].thumbUrl,memo:param.memo,recommend:recommend,sortNum:param.sortNum};
    }
    $.post('/api/tag/edit/'+this.state.defaultData,datas,function(data){
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
          <a id={record.id} onClick={this.editTag}>编辑</a>
          <span className="ant-divider" />
          <a href="#/tag" id={record.id} onClick={this.deleteTag}>删除</a>
        </span>
      ),
    }];
  return (
    <div>
      <Row>
        <Col>
          <AddView reload={this.fetch}/>
          <Modal
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
