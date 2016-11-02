import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { Menu, Icon } from 'antd';
import { Collapse } from 'antd';
import { withRouter } from 'react-router';
const Panel = Collapse.Panel;

import HeaderPage from './HeaderPage.js';


function onSelect(value) {
  console.log('onSelect', value);
}

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const ProductDetail = React.createClass({
  getInitialState() {
    return {
    };
  },
  handleChange(value) {
    
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
            <h2>商品详情</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={8} sm={12} xs={24} >
          <Card style={{}} bodyStyle={{ padding: 20 }}>
            <div className="custom-image">
              <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <div className="custom-card">
              <h3>Europe Street beat</h3>
            </div>
          </Card>
        </Col>
         <Col lg={16} md={16} sm={12} xs={24} >
          <Collapse defaultActiveKey={['1']} onChange={callback}>
            <Panel header="商品详情" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="商品说明" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="售后服务" key="3">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
    );
  },
});

export default withRouter(ProductDetail);
