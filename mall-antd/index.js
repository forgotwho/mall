import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DatePicker } from 'antd';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { AutoComplete } from 'antd';
import { Input } from 'antd';
import { Menu, Icon } from 'antd';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Header = React.createClass({
  getInitialState() {
    return {
      current: 'mail',
    };
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  },
  render() {
    return (
      <Menu onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <Icon type="mail" />首页
        </Menu.Item>
        <Menu.Item key="app">
          <Icon type="appstore" />公司介绍
        </Menu.Item>
        <SubMenu title={<span><Icon type="setting" />全部商品</span>}>
          <MenuItemGroup title="直径">
            <Menu.Item key="setting:1">14mm</Menu.Item>
            <Menu.Item key="setting:2">16mm</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="颜色">
            <Menu.Item key="setting:3">白色</Menu.Item>
            <Menu.Item key="setting:4">黑色</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="其它">
            <Menu.Item key="setting:5">混搭</Menu.Item>
            <Menu.Item key="setting:6">经典</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="#" target="_blank" rel="noopener noreferrer">联系我们</a>
        </Menu.Item>
        <div style={{float:'right',margin:10}}>
          <Input size="large" placeholder="请输入关键字搜索" />
        </div>
      </Menu>
    );
  },
});

function onSelect(value) {
  console.log('onSelect', value);
}

const Complete = React.createClass({
  getInitialState() {
    return {
      dataSource: [],
    };
  },
  handleChange(value) {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  },
  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={onSelect}
        onChange={this.handleChange}
      />
    );
  },
});

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
          <Header />
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

const ProductList = React.createClass({
  getInitialState() {
    return {
    };
  },
  handleChange(value) {
    ReactDOM.render(<ProductDetail />, document.getElementById('root'));
  },
  render() {
    return (
      <div>
      <Row>
        <Col span={18} offset={3}>
          <Header />
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



const App = React.createClass({
  handleMore(value) {
    ReactDOM.render(<ProductList />, document.getElementById('root'));
  },
  handleDetail(value) {
    ReactDOM.render(<ProductDetail />, document.getElementById('root'));
  },
  render() {
  return (
    <div>
      <Row>
        <Col span={18} offset={3}>
          <Header />
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
            <h2>热门推荐</h2>
          </div>
          <div style={{float:'right',margin:10}}>
            <h2><a href="#" onClick={this.handleMore}>更多</a></h2>
          </div>
        </Col>
      </Row>
      <Row>
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
      <Row>
        <Col span={24}>
          <div style={{float:'left',margin:10}}>
            <h2>新品推荐</h2>
          </div>
          <div style={{float:'right',margin:10}}>
            <h2><a href="#" onClick={this.handleMore}>更多</a></h2>
          </div>
        </Col>
      </Row>
      <Row>
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
      <Row>
        <Col span={24}>
          <div style={{float:'left',margin:10}}>
            <h2>销量排名</h2>
          </div>
          <div style={{float:'right',margin:10}}>
            <h2><a href="#" onClick={this.handleMore}>更多</a></h2>
          </div>
        </Col>
      </Row>
      <Row>
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
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
