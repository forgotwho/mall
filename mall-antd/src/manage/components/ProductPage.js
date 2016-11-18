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
const CheckboxGroup = Checkbox.Group;

import reqwest from 'reqwest';
import { withRouter,Link } from 'react-router';

const AddView = withRouter(React.createClass({
  getInitialState() {
    return {
      loading: false,
      visible: false,
      tags:[]
    };
  },
  showModal() {
    $.get('/api/tag',function(data){
      var tags = [];
      var tagList = data.map(function(tag) {
        return { label: tag.name, value: ""+tag.id};
      });
      this.setState({tags: tagList,visible: true,param:{}});
		 }.bind(this));
  },
  handleSubmit(param) {
    $.post('/api/product/add',param,function(data){
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
          新增产品
        </Button>
        <Modal
          maskClosable={false}
          width={990}
          visible={this.state.visible}
          title="新增产品"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
          ]}
        >
           <AddForm tags={this.state.tags} submit={this.handleSubmit} cancel={this.handleCancel}/>
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
        if(values.pictureSet!=null){
          var pictureSet = "";
          for(var i=0;i<values.pictureSet.length;i++){
            var picture = values.pictureSet[i];
            var param = {
              name:picture.name,
              type:picture.type,
              uid:picture.uid,
              size:picture.size,
              thumbUrl:picture.thumbUrl,
              status:picture.status,
            };
            params.push(param);
            if(pictureSet==""){
              pictureSet = picture.uid;
            }else{
              pictureSet = pictureSet+ "," +picture.uid;
            }
          }
          values.pictureSet = pictureSet;
        }
        
        if(values.tagIds!=null){
          var tagIds = "";
          for(var i=0;i<values.tagIds.length;i++){
            var tagId = values.tagIds[i];
            if(tagIds==""){
              tagIds = tagId;
            }else{
              tagIds = tagIds+ "," +tagId;
            }
          }
          values.tagIds = tagIds;
        }
        values.detail = $("#addMarkItUp").val();
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
  handleResult(data){
  },
  componentDidMount() {
    $('#addMarkItUp').markItUp(mySettings);
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
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
      <Form horizontal onSubmit={this.handleSubmit} >
      <Row>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="产品名称"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入产品名称!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={24}>
      </Col>
      <Col span={24}>
        <FormItem
          labelCol= {{span: 4}}
        wrapperCol={{span: 20}}
          label="产品图片"
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
      </Col>
      <Col span={24}>
        <FormItem
          labelCol= {{span: 4}}
        wrapperCol={{span: 20}}
          label="缩略图"
        >
          {getFieldDecorator('pictureSet', {
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
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="可选颜色"
          hasFeedback
        >
          {getFieldDecorator('colors', {
            rules: [{
              required: true, message: '请选择可选颜色!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="直径"
          hasFeedback
        >
          {getFieldDecorator('diameter', {
            rules: [{
              required: true, message: '请输入直径!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="基弧"
          hasFeedback
        >
          {getFieldDecorator('baseCurve', {
            rules: [{
              required: true, message: '请输入基弧!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="含水量"
          hasFeedback
        >
          {getFieldDecorator('waterContent', {
            rules: [{
              required: true, message: '请输入含水量!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="产地"
          hasFeedback
        >
          {getFieldDecorator('originPlace', {
            rules: [{
              required: true, message: '请输入产地!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="佩戴周期"
          hasFeedback
        >
          {getFieldDecorator('wearCycle', {
            rules: [{
              required: true, message: '请输入佩戴周期!',
            }],
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
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
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="是否显示"
          hasFeedback
        >
          {getFieldDecorator('recommend', {
            rules: [{
            }],
            valuePropName: 'checked'
          })(
              <Switch onChange={this.handleChange}/>
          )}
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem
        labelCol= {{span: 4}}
        wrapperCol={{span: 20}}
          label="商品分类"
          hasFeedback
        >
          {getFieldDecorator('tagIds', {
          })(
            <CheckboxGroup options={this.props.tags} />
          )}
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem
        labelCol= {{span: 4}}
        wrapperCol={{span: 20}}
          label="商品详情"
          hasFeedback
        >
          {getFieldDecorator('detail', {
          })(
            <div><textarea id="addMarkItUp" style={{width:'100%',height:300}}></textarea></div>
          )}
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem {...tailFormItemLayout} style={{textAlign:'center'}}>
          <Button style={{marginRight:10}} key="back" type="ghost" size="large" onClick={this.props.cancel}>返回</Button>,
          <Button style={{marginLeft:10}} type="primary" htmlType="submit" size="large">保存</Button>
        </FormItem>
      </Col>
       </Row>
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
        if(values.pictureSet!=null){
          var pictureSet = "";
          for(var i=0;i<values.pictureSet.length;i++){
            var picture = values.pictureSet[i];
            var param = {
              name:picture.name,
              type:picture.type,
              uid:picture.uid,
              size:picture.size,
              thumbUrl:picture.thumbUrl,
              status:picture.status,
            };
            params.push(param);
            if(pictureSet==""){
              pictureSet = picture.uid;
            }else{
              pictureSet = pictureSet+ "," +picture.uid;
            }
          }
          values.pictureSet = pictureSet;
        }
        if(values.tagIds!=null){
          var tagIds = "";
          for(var i=0;i<values.tagIds.length;i++){
            var tagId = values.tagIds[i];
            if(tagIds==""){
              tagIds = tagId;
            }else{
              tagIds = tagIds+ "," +tagId;
            }
          }
          values.tagIds = tagIds;
        }
        values.detail = $("#editMarkItUp").val();
      //   $.post('/api/img/batchUpload',params,function(data){
      // 	}.bind(this));
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
  handlePictureSet(text){
    var dataList = [];
    if(text!=null){
      var pictureSet = text.split(","); 
      for(var i=0;i<pictureSet.length;i++){
        dataList.push({
          uid: pictureSet[i],
          status: 'done',
          url: "/api/img/thumb/"+pictureSet[i],
          thumbUrl: "/api/img/thumb/"+pictureSet[i],
        });
      }
    }
    return dataList;
  },
  handleTag(text){
    var dataList = [];
    if(text!=null&&text!=""){
      var tags = text.split(","); 
      for(var i=0;i<tags.length;i++){
        dataList.push(tags[i]);
      }
    }else{
      dataList.push("");
    }
    return dataList;
  },
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  },
  componentDidMount() {
    $('#editMarkItUp').markItUp(mySettings);
    //$("#editMarkItUp").val(this.props.data.detail);
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
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
      onRemove(file){
        console.log(file);
      },
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit} >
      <Row>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="产品名称"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入产品名称!',
            }],
            initialValue:this.props.data.name
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem
          labelCol= {{span: 4}}
        wrapperCol={{span: 20}}
          label="产品图片"
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
      </Col>
      <Col span={24}>
        <FormItem
          labelCol= {{span: 4}}
        wrapperCol={{span: 20}}
          label="缩略图"
        >
          {getFieldDecorator('pictureSet', {
            valuePropName: 'fileList',
            normalize: this.normFile,
            initialValue:this.handlePictureSet(this.props.data.pictureSet)
          })(
            <Upload {...uploadProps}>
              <Button type="ghost">
                <Icon type="upload" />点击上传
              </Button>
            </Upload>
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="可选颜色"
          hasFeedback
        >
          {getFieldDecorator('colors', {
            rules: [{
              required: true, message: '请选择可选颜色!',
            }],
            initialValue:this.props.data.colors
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="直径"
          hasFeedback
        >
          {getFieldDecorator('diameter', {
            rules: [{
              required: true, message: '请输入直径!',
            }],
            initialValue:this.props.data.diameter
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="基弧"
          hasFeedback
        >
          {getFieldDecorator('baseCurve', {
            rules: [{
              required: true, message: '请输入基弧!',
            }],
            initialValue:this.props.data.baseCurve
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="含水量"
          hasFeedback
        >
          {getFieldDecorator('waterContent', {
            rules: [{
              required: true, message: '请输入含水量!',
            }],
            initialValue:this.props.data.waterContent
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="产地"
          hasFeedback
        >
          {getFieldDecorator('originPlace', {
            rules: [{
              required: true, message: '请输入产地!',
            }],
            initialValue:this.props.data.originPlace
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="佩戴周期"
          hasFeedback
        >
          {getFieldDecorator('wearCycle', {
            rules: [{
              required: true, message: '请输入佩戴周期!',
            }],
            initialValue:this.props.data.wearCycle
          })(
            <Input  />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="显示顺序"
          hasFeedback
        >
          {getFieldDecorator('sortNum', {
            rules: [{
              required: true, message: '请输入显示顺序!',
            }],
            initialValue:""+this.props.data.sortNum
          })(
            <Input />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="是否显示"
          hasFeedback
        >
          {getFieldDecorator('recommend', {
            valuePropName: 'checked',
            initialValue:this.props.data.recommend
          })(
              <Switch onChange={this.handleChange}/>
          )}
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem
        labelCol= {{span: 4}}
        wrapperCol={{span: 20}}
          label="商品分类"
          hasFeedback
        >
          {getFieldDecorator('tagIds', {
          initialValue:this.handleTag(this.props.data.tagIds)
          })(
            <CheckboxGroup options={this.props.tags}/>
          )}
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem
        labelCol= {{span: 4}}
        wrapperCol={{span: 20}}
          label="商品详情"
          hasFeedback
        >
          {getFieldDecorator('detail', {
          })(
            <div><textarea id="editMarkItUp" style={{width:'100%',height:300}}></textarea></div>
          )}
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem {...tailFormItemLayout} style={{textAlign:'center'}}>
          <Button style={{marginRight:10}} key="back" type="ghost" size="large" onClick={this.props.cancel}>返回</Button>,
          <Button style={{marginLeft:10}} type="primary" htmlType="submit" size="large">保存</Button>
        </FormItem>
      </Col>
      </Row>
      </Form>
    );
  },
}));

const ProductPage = React.createClass({
  getInitialState() {
    return {
      data: [],
      loading:false,
      showEdit:false,
      defaultData:{},
      editData:{},
      tags:[]
    };
  },
  fetch(params = {}) {
     $.get('/api/product',function(data){
      this.setState({data: data,showEdit:false});
		 }.bind(this));
  },
  componentDidMount() {
    this.fetch();
  },
  editProduct(event){
    var id = event.target.id;
    $.get('/api/product/'+id,function(data){
      $("#editMarkItUp").val(data.detail);
      this.setState({showEdit:true,defaultData:id,editData:data});
		 }.bind(this));
		 $.get('/api/tag',function(data){
      var tags = [];
      var tagList = data.map(function(tag) {
        return { label: tag.name, value: ""+tag.id};
      });
      this.setState({tags: tagList});
		 }.bind(this));
  },
  handleSubmit(param) {
    $.post('/api/product/edit/'+this.state.defaultData,param,function(data){
      this.setState({ loading: false, showEdit: false });
      this.fetch();
		}.bind(this));
  },
  handleCancel() {
    this.setState({ showEdit: false });
  },
  deleteProduct(event){
    var id = event.target.id;
    $.post('/api/product/delete/'+id,function(data){
		  this.fetch();
		 }.bind(this));
  },
  handlePictureSet(text, record) {
    var imgList = [];
    if(text!=null){
      var pictureSet = text.split(","); 
      for(var i=0;i<pictureSet.length;i++){
        imgList.push(<img style={{padding:5}} key={i+"_"+pictureSet[i]} width="50" height="50" src={"/api/img/thumb/"+pictureSet[i]} />);
      }
    }
    return imgList;
  },
  handleColor(text, record) {
    var colorList = [];
    if(text!=null){
      var color = text.split(","); 
      for(var i=0;i<color.length;i++){
        colorList.push(<div key={i+"_"+color[i]} style={{marginLeft:5,float:'left',width:10,height:10,background:color[i]}}></div>);
      }
    }
    return colorList;
  },
  render() {
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
      dataIndex: 'picture',
      render: (text, record) => (
        <img width="50" height="50" src={"/api/img/thumb/"+record.picture} />
      ),
    }, {
    //   title: '缩略图',
    //   dataIndex: 'pictureSet',
    //   render: (text, record) => (
    //     <div>
    //       {this.handlePictureSet(text,record)}
    //     </div>
    //   ),
    // }, {
      title: '可选颜色',
      dataIndex: 'colors',
      render: (text, record) => (
        <div style={{width:100}}>
          {this.handleColor(text,record)}
        </div>
      ),
    }, {
      title: '直径',
      dataIndex: 'diameter',
    }, {
      title: '基弧',
      dataIndex: 'baseCurve',
    }, {
      title: '含水量',
      dataIndex: 'waterContent',
    }, {
      title: '产地',
      dataIndex: 'originPlace',
    }, {
      title: '佩戴周期',
      dataIndex: 'wearCycle',
    }, {
      title: '是否显示',
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
          <Link to={"/product/detail/"+record.id}>详情</Link>
          <span className="ant-divider" />
          <Link id={record.id} onClick={this.editProduct}>编辑</Link>
          <span className="ant-divider" />
          <Link id={record.id} onClick={this.deleteProduct}>删除</Link>
        </span>
      ),
    }];
  return (
    <div>
      <Row>
        <Col span={24}>
          <AddView reload={this.fetch}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Modal
            maskClosable={false}
            width={990}
            visible={this.state.showEdit}
            title="修改产品"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
            ]}
          >
             <EditForm tags={this.state.tags} productId={this.state.defaultData} data={this.state.editData} submit={this.handleSubmit} cancel={this.handleCancel}/>
          </Modal>
          <Table columns={columns} dataSource={this.state.data} />
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(ProductPage);
