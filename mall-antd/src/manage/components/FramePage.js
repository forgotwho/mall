import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { withRouter } from 'react-router';

import LeftMenu from './LeftMenu.js';

const FramePage = React.createClass({
  render() {
  return (
    <div style={{minWidth:990}}>
      <Row>
        <Col span={4}>
          <LeftMenu/>
        </Col>
        <Col span={20} style={{paddingLeft:40}}>
          {this.props.children}
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(FramePage);
