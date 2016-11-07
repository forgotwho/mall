import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Carousel } from 'antd';
import { withRouter } from 'react-router';

const Banner = React.createClass({
  render() {
  return (
    <Row type="flex" justify="center" style={{background:'#d8dbe4'}}>
      <Col xs={{span:0}} sm={{span:0}} md={{span:24}} lg={{span:24}} style={{width:990,height:300}}>
        <Carousel autoplay dots="false">
          <div><img width="100%" src="images/01.png" /></div>
          <div><img width="100%" src="images/01.png" /></div>
          <div><img width="100%" src="images/01.png" /></div>
          <div><img width="100%" src="images/01.png" /></div>
        </Carousel>
      </Col>
      <Col xs={{span:24}} sm={{span:24}} md={{span:0}} lg={{span:0}} style={{width:990,background:'#FFFFFF'}}>
        <Carousel autoplay dots="false">
          <div><img width="100%" height="100%" src="images/00.png" /></div>
        </Carousel>
      </Col>
    </Row>
  );
  }
});

export default withRouter(Banner);
