import React from 'react';
import ReactDOM from 'react-dom';

import { Input } from 'antd';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { withRouter } from 'react-router';

import HeaderPage from './HeaderPage.js';

const ProductDetail = React.createClass({
  handleMore(value) {
    event.preventDefault();
	  this.props.router.push("/product");
  },
  handleDetail(value) {
    event.preventDefault();
	  this.props.router.push("/product/detail/1");
  },
  render() {
  return (
    <div>
      <Row style={{height:30,marginTop:20,marginBottom:0}}>
        <Col span={4} offset={2} style={{height:40,background:'#ededed',textAlign:'center'}}>
          <h2><a href="#/">首页</a></h2>
        </Col>
        <Col span={4} style={{height:40,background:'#989898',textAlign:'center'}}>
          <h2><a href="#/product">所有产品</a></h2>
        </Col>
        <Col span={4} style={{height:40,background:'#ededed',textAlign:'center'}}>
          <h2>关于我们</h2>
        </Col>
        <Col span={4} style={{height:40,background:'#ededed',textAlign:'center'}}>
          <h2>联系我们</h2>
        </Col>
        <Col span={4} style={{height:40,background:'#ededed',textAlign:'center'}}>
         <h2>收藏</h2>
        </Col>
      </Row>
      <div style={{height:40}}></div>
      <Row>
        <Col lg={{span:6,offset:2}} md={{span:8,offset:2}} sm={{span:12,offset:0}} xs={{span:14,offset:0}}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0,width:'100%',padding:20}}>
                <img src="/images/small.png" style={{padding:5}}/>
                <img src="/images/small.png" style={{padding:5}}/>
                <img src="/images/small.png" style={{padding:5}}/>
                <img src="/images/small.png" style={{padding:5}}/>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={6} md={8} sm={12} xs={10}>
          <div style={{float:'left',margin:40,width:'100%'}}>
            <p>产品名称:蓝山</p>
            <p>可选颜色:灰,棕</p>
            <p>直径:</p>
            <p>基弧:</p>
            <p>含水量:</p>
            <p>产地:</p>
            <p>佩戴周期:</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={20} offset={2}>
           <hr/>
        </Col>
      </Row>
      <Row>
        <Col lg={16} offset={4}>
          <img src="/images/detail02.png" />
          <img src="/images/detail03.png" />
        </Col>
      </Row>
      <div style={{height:40}}></div>
      <Row style={{height:100,marginTop:20,marginBottom:50}}>
        <Col span={3} offset={6}>
          关于我们
        </Col>
        <Col span={3}>
          我们的产品
        </Col>
        <Col span={3}>
          微信公众号
        </Col>
        <Col span={3}>
          备案号
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(ProductDetail);
