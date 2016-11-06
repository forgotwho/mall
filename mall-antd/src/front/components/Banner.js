import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Carousel } from 'antd';
import { withRouter } from 'react-router';

const Banner = React.createClass({
  render() {
  return (
    <Row type="flex" justify="center" style={{background:'#d8dbe4'}}>
      <Col style={{width:990,height:300}}>
        <Carousel autoplay dots="false">
          <div><img src="images/01.png" /></div>
          <div><img src="images/01.png" /></div>
          <div><img src="images/01.png" /></div>
          <div><img src="images/01.png" /></div>
        </Carousel>
      </Col>
    </Row>
  );
  }
});

export default withRouter(Banner);
