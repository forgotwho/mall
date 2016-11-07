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

const ProductDetail = React.createClass({
  render() {
  return (
    <div style={{minWidth:990}}>
      <Header/>
      <Menu menuId={2}/>
      <Line/>
      <Row type="flex" justify="center">
        <Col xs={{span:0}} sm={{span:0}} md={{span:24}} lg={{span:24}} style={{width:990,textAlign:'left'}}>
          <div style={{float:'left',border:1}}>
            <img width="100%" src="images/10.png" />
            <div style={{marginLeft:60,marginRight:60,marginTop:10,marginBottom:10}}>
              <img style={{padding:5,border:'1px solid #666666'}} src="images/21.png" />
              <img style={{marginLeft:5,padding:5,border:'2px solid #666666'}} src="images/21.png" />
              <img style={{marginLeft:5,padding:5,border:'1px solid #666666'}} src="images/21.png" />
              <img style={{marginLeft:5,padding:5,border:'1px solid #666666'}} src="images/21.png" />
            </div>
          </div>
          <div style={{float:'left',marginLeft:20,marginTop:100,color:'#666666',fontSize:16}}>
            <p>产品名称：<span style={{marginLeft:5}}>蓝山</span></p>
            <p>可选颜色：</p>
            <p>直径：<span style={{marginLeft:5}}>14.00 mm</span></p>
            <p>基弧：<span style={{marginLeft:5}}>8.6</span></p>
            <p>含水量：<span style={{marginLeft:5}}>42.5%</span></p>
            <p>产地：<span style={{marginLeft:5}}>韩国</span></p>
            <p>佩戴周期：<span style={{marginLeft:5}}>1年</span></p>
          </div>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:0}} lg={{span:0}} style={{}}>
          <Carousel autoplay dots="false" style={{marginTop:45,marginBottom:45,marginLeft:55,marginRight:55}}>
            <div><img width="100%" src="images/10.png" /></div>
            <div><img width="100%" src="images/10.png" /></div>
            <div><img width="100%" src="images/10.png" /></div>
            <div><img width="100%" src="images/10.png" /></div>
          </Carousel>
          <div style={{marginLeft:40,marginTop:20,marginBottom:20,color:'#666666',fontSize:16}}>
            <div style={{float:'left',width:'50%',marginLeft:0}}>
              <p style={{marginTop:20,fontSize:24}}>产品名称：<span style={{marginLeft:5}}>蓝山</span></p>
              <p style={{marginTop:20,fontSize:24}}>可选颜色：</p>
              <p style={{marginTop:20,fontSize:24}}>直径：<span style={{marginLeft:5}}>14.00 mm</span></p>
              <p style={{marginTop:20,fontSize:24}}>基弧：<span style={{marginLeft:5}}>8.6</span></p>
            </div>
            <div style={{float:'right',width:'50%',marginLeft:0}}>
              <p style={{marginTop:20,fontSize:24}}>含水量：<span style={{marginLeft:5}}>42.5%</span></p>
              <p style={{marginTop:20,fontSize:24}}>产地：<span style={{marginLeft:5}}>韩国</span></p>
              <p style={{marginTop:20,fontSize:24}}>佩戴周期：<span style={{marginLeft:5}}>1年</span></p>
            </div>
            
          </div>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col style={{width:990,textAlign:'left'}}>
          <img src="images/12.png" />
        </Col>
      </Row>
      <Line/>
      <Footer/>
    </div>
  );
  }
});

export default withRouter(ProductDetail);
