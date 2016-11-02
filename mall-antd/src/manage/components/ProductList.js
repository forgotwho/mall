import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { withRouter } from 'react-router';

import HeaderPage from './HeaderPage.js';


function onSelect(value) {
  console.log('onSelect', value);
}


const ProductList = React.createClass({
  getInitialState() {
    return {
    };
  },
  handleChange(value) {
    event.preventDefault();
	  this.props.router.push("/product/detail/1");
  },
  render() {
    return (
      <div>
      <Row>
        <Col span={18} offset={3}>
          <HeaderPage />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Carousel autoplay>
          <div><img alt="example" width="100%" src="/images/01.jpg" /></div>
          <div><img alt="example" width="100%" src="/images/02.jpg" /></div>
          <div><img alt="example" width="100%" src="/images/03.jpg" /></div>
          <div><img alt="example" width="100%" src="/images/04.jpg" /></div>
          <div><img alt="example" width="100%" src="/images/05.jpg" /></div>
        </Carousel>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{float:'left',margin:10}}>
            <h2>全部>热门推荐</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span="4" lg={4} md={6} sm={8} xs={12} >
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleChange}>
            <div className="custom-image">
              <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <div className="custom-card">
              <h3>Europe Street beat</h3>
            </div>
          </Card>
        </Col>
        <Col span="4" lg={4} md={6} sm={8} xs={12} >
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div className="custom-image">
              <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <div className="custom-card">
              <h3>Europe Street beat</h3>
            </div>
          </Card>
        </Col>
       <Col span="4" lg={4} md={6} sm={8} xs={12} >
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div className="custom-image">
              <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <div className="custom-card">
              <h3>Europe Street beat</h3>
            </div>
          </Card>
        </Col>
       <Col span="4" lg={4} md={6} sm={8} xs={12} >
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div className="custom-image">
              <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <div className="custom-card">
              <h3>Europe Street beat</h3>
            </div>
          </Card>
        </Col>
        <Col span="4" lg={4} md={6} sm={8} xs={12} >
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div className="custom-image">
              <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <div className="custom-card">
              <h3>Europe Street beat</h3>
            </div>
          </Card>
        </Col>
        <Col span="4" lg={4} md={6} sm={8} xs={12} >
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div className="custom-image">
              <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <div className="custom-card">
              <h3>Europe Street beat</h3>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
    );
  },
});


export default withRouter(ProductList);
