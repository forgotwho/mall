import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { withRouter } from 'react-router';

const Footer = React.createClass({
  handleMore(value) {
    event.preventDefault();
  },
  handleDetail(value) {
    event.preventDefault();
  },
  render() {
  return (
    <div style={{}}>
      <Row type="flex" justify="center" style={{background:'#f7f7f7'}}>
        <Col xs={{span:0}} sm={{span:0}} md={{span:24}} lg={{span:24}}  style={{minWidth:990,width:990,height:250,marginTop:40,paddingLeft:150,paddingRight:150,textAlign:'center'}}>
          <div style={{float:'left',width:'25%'}}><a style={{fontSize:14,color:'#666666'}} href="#/about">关于我们</a></div>
          <div style={{float:'left',width:'25%'}}><a style={{fontSize:14,color:'#666666'}} href="#/product">我们的产品</a></div>
          <div style={{float:'left',width:'25%'}}><p style={{fontSize:14}}>微信公众号</p></div>
          <div style={{float:'left',width:'25%'}}><p style={{fontSize:14}}>粤ICPj000099s9f号</p></div>
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(Footer);
