import React from 'react';
import ReactDOM from 'react-dom';
import { Table} from 'antd';
import { Button,Modal } from 'antd';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox } from 'antd';
import { InputNumber, Switch, Radio, Slider, Upload,message } from 'antd';
const FormItem = Form.Item;
import reqwest from 'reqwest';
import { withRouter,Link } from 'react-router';
var cookie = require('cookie');

const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop:100,maxWidth: 300}}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住</Checkbox>
          )}
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            登录
          </Button>
        </FormItem>
      </Form>
    );
  },
}));



const LoginPage = React.createClass({
  getInitialState() {
    return {
    };
  },
  handleLogin(param) {
     var router = this.props.router;
     $.post('/api/user/login',param,function(data){
       if(data.id!=null){
        router.replace("/");
       }else{
         alert("登录失败");
       }
		 }.bind(this));
  },
  componentDidMount() {
  },
  render() {
  return (
    <div>
      <Row type="flex" justify="center">
        <Col offset={6} span={12}>
          <NormalLoginForm login={this.handleLogin}/>
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(LoginPage);