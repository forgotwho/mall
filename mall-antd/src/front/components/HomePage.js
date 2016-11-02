import React from 'react';
import ReactDOM from 'react-dom';

import { Input } from 'antd';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { withRouter } from 'react-router';

import HeaderPage from './HeaderPage.js';

const HomePage = React.createClass({
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
        <Col span={4} offset={2} style={{height:40,background:'#989898',textAlign:'center'}}>
          <h2><a href="#/">首页</a></h2>
        </Col>
        <Col span={4} style={{height:40,background:'#ededed',textAlign:'center'}}>
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
      <Row>
        <Col span={24} style={{margin:0,padding:0}}>
          <Carousel autoplay>
            <div><img width="100%" src="/images/banner01.jpg" /></div>
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col lg={{span:20,offset:2}} md={{span:20,offset:2}} sm={{span:24,offset:0}} xs={{span:24,offset:0}} style={{marginTop:10,marginBottom:10,height:40,background:'#ededed'}} onClick={this.handleMore}>
          <div style={{float:'left',margin:0}}>
            <img width="100%" src="/images/tag01.png" />
          </div>
          <div style={{float:'right',margin:0,paddingTop:5,paddingRight:10}}>
            <h2>more&nbsp;></h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={{span:4,offset:2}} md={{span:4,offset:2}} sm={{span:8,offset:0}} xs={{span:12,offset:0}}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>蓝山</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={8} xs={12}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>星河</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={8} xs={12}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>流沙</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={8} xs={12}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>玛瑙</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={8} xs={12}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>蜜恋</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <div style={{height:20}}></div>
      <Row>
        <Col lg={{span:20,offset:2}} md={{span:20,offset:2}} sm={{span:24,offset:0}} xs={{span:24,offset:0}} style={{marginTop:10,marginBottom:10,height:40,background:'#ededed'}} onClick={this.handleMore}>
          <div style={{float:'left',margin:0}}>
            <img width="100%" src="/images/tag02.png" />
          </div>
          <div style={{float:'right',margin:0,paddingTop:5,paddingRight:10}}>
            <h2>more&nbsp;></h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={{span:4,offset:2}} md={{span:4,offset:2}} sm={{span:8,offset:0}} xs={{span:12,offset:0}}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>蓝山</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={8} xs={12}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>星河</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={8} xs={12}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>流沙</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={8} xs={12}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>玛瑙</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={8} xs={12}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>蜜恋</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <div style={{height:20}}></div>
      <Row>
        <Col lg={{span:20,offset:2}} md={{span:20,offset:2}} sm={{span:24,offset:0}} xs={{span:24,offset:0}} style={{marginTop:10,marginBottom:10,height:40,background:'#ededed'}} onClick={this.handleMore}>
          <div style={{float:'left',margin:0}}>
            <img width="100%" src="/images/tag03.png" />
          </div>
          <div style={{float:'right',margin:0,paddingTop:5,paddingRight:10}}>
            <h2>more&nbsp;></h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={{span:4,offset:2}} md={{span:4,offset:2}} sm={{span:8,offset:0}} xs={{span:12,offset:0}}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>蓝山</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={8} xs={12}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>星河</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={8} xs={12}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>流沙</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={8} xs={12}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>玛瑙</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={8} xs={12}>
          <Card style={{}} bodyStyle={{ padding: 20 }} onClick={this.handleDetail}>
            <div >
              <img width="100%" src="/images/eye01.png" />
            </div>
            <div>
              <div style={{float:'left',margin:0}}>
                <h3>蜜恋</h3>
              </div>
              <div style={{float:'right',width:30,margin:3}}>
                <div style={{float:'left',width:10,height:10,background:'red'}}></div>
                <div style={{float:'right',width:10,height:10,background:'black'}}></div>
              </div>
            </div>
          </Card>
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

export default withRouter(HomePage);
