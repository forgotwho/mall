import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { withRouter } from 'react-router';

import Header from './Header.js';
import Menu from './Menu.js';
import Line from './Line.js';
import Footer from './Footer.js';

const AboutUs = React.createClass({
  render() {
  return (
    <div style={{minWidth:990}}>
      <Header/>
      <Menu menuId={3}/>
      <Line/>
      <Row type="flex" justify="center">
        <Col style={{width:990,textAlign:'left'}}>
          <div style={{marginTop:60,background:'#FFFFFF'}}><img src="images/05.png" /></div>
          <div style={{marginTop:30,color:'#333333',fontSize:16}}>
            <p>最早驰名大陆地区的进口美瞳彩色隐形眼镜之一。</p> 
            <p>我们一贯秉承以优异的品质服务消费者。 </p>
            <p>靓丽的眼妆，不带给您任何风险。</p>
          </div>
          <div style={{marginTop:30,width:'100%'}}><img src="images/06.png" /></div>
          <div style={{marginTop:30,color:'#333333',fontSize:16}}>
            <p>优秀的设计打动您，让您的明眸打动更多身边的人。 </p> 
            <p>不论是</p>
          </div>
          <div style={{marginTop:30,width:'100%',height:60}}>
            <div style={{float:'left'}}><img src="images/07.png" />
              <p style={{marginTop:20}}>自然系的高雅大方</p>
            </div>
            <div style={{float:'left'}}><img style={{marginLeft:96}} src="images/08.png" />
              <p style={{marginLeft:96,marginTop:20}}>混血的炫彩妩媚</p>
            </div>
            <div style={{float:'right'}}><img style={{marginLeft:96}} src="images/09.png" />
              <p style={{marginLeft:96,marginTop:20}}>coser的魔力四射</p>
            </div>
          </div>
          <div style={{marginTop:400,marginBottom:90,color:'#333333',fontSize:16}}>
            <p>总有一款适合你。 </p> 
            <p>选择NEO COSMO，选择生活中的美丽，过美丽的生活。</p>
          </div>
        </Col>
      </Row>
      <Line/>
      <Footer/>
    </div>
  );
  }
});

export default withRouter(AboutUs);
