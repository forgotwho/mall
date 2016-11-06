import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { withRouter } from 'react-router';

import Header from './Header.js';
import Menu from './MenuBar.js';
import Line from './Line.js';
import Footer from './Footer.js';

const ContactUs = React.createClass({
  render() {
  return (
    <div style={{minWidth:990}}>
      <Header/>
      <Menu menuId={4}/>
      <Line/>
      <Row type="flex" justify="center">
        <Col style={{width:990,height:400,textAlign:'center'}}>
          <div style={{textAlign:'left'}}><p style={{color:'#333333',fontSize:16}}>请将您的问题与您的联系方式一同发送给我们，我们会尽快与您取得联系</p></div>
          <div style={{width:600,marginTop:30}}><Input type="textarea" autosize={{ minRows: 10, maxRows: 12 }}/></div>
          <div style={{marginTop:30}}>
            <Button type="primary" style={{float:'left',width:100,height:40,background:'#999999',border:0}}>确定</Button>
            <Button type="primary" style={{float:'left',marginLeft:40,width:100,height:40,background:'#eeeeee',border:0}}>清空</Button>
          </div>
        </Col>
      </Row>
      <Line/>
      <Footer/>
    </div>
  );
  }
});

export default withRouter(ContactUs);
