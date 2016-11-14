import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { Input } from 'antd';
import { withRouter } from 'react-router';

import Header from './Header.js';
import Menu from './MenuBar.js';
import Banner from './Banner.js';
import Line from './Line.js';
import Footer from './Footer.js';

const ProductItem = withRouter(React.createClass({
  handleClick(){
    this.props.router.push("/product/detail/"+this.props.data.id);
  },
  render() {
  return (
    <div>
      <Card style={{float:'left',width:'50%',background:'#FFFFFF'}} bodyStyle={{ padding: 0 }} onClick={this.handleClick}>
        <div style={{marginTop:45,marginBottom:45,marginLeft:55,marginRight:55}} >
          <img width="100%" height="100%" src={"/api/img/thumb/"+this.props.data.picture} />
        </div>
        <div>
          <div style={{float:'left',marginLeft:10}}>
            <p style={{fontSize:28}}>{this.props.data.name}</p>
          </div>
          <div style={{float:'right',width:60,marginRight:10,marginTop:5}}>
            <div style={{float:'left',width:20,height:20,background:'red'}}></div>
            <div style={{float:'right',width:20,height:20,background:'black'}}></div>
          </div>
        </div>
      </Card>
    </div>
  );
  }
}));

const ProductItem2 = withRouter(React.createClass({
  handleClick(){
    this.props.router.push("/product/detail/"+this.props.data.id);
  },
  render() {
  return (
    <div>
      <Card style={{float:'left',width:'20%',background:'#FFFFFF'}} bodyStyle={{ padding: 0 }} onClick={this.handleClick}>
        <div style={{marginTop:45,marginBottom:45,marginLeft:55,marginRight:55}} >
          <img width="100%" height="100%" src={"/api/img/thumb/"+this.props.data.picture} />
        </div>
        <div>
          <div style={{float:'left',marginLeft:10}}>
            <p style={{fontSize:16}}>{this.props.data.name}</p>
          </div>
          <div style={{float:'right',width:30,marginRight:10,marginTop:5}}>
            <div style={{float:'left',width:10,height:10,background:'red'}}></div>
            <div style={{float:'right',width:10,height:10,background:'black'}}></div>
          </div>
        </div>
      </Card>
    </div>
  );
  }
}));

const ProductList = React.createClass({
  render() {
    var itemList = this.props.data.productList.map(function(data) {
      return (
        <ProductItem data={data} key={data.id}/>
      );
    });
    var itemList2 = this.props.data.productList.map(function(data) {
      return (
        <ProductItem2 data={data} key={data.id}/>
      );
    });
  return (
    <div>
      <Row type="flex" justify="center">
        <Col xs={{span:24}} sm={{span:24}} lg={{span:0}} md={{span:0}} style={{width:990,background:this.props.data.tag.color}}>
          <div style={{width:250,height:60,magin:0,float:'left'}}>
            <img height="60" src={"/api/img/thumb/"+this.props.data.tag.picture} />
          </div>
          <div style={{height:60,marginRight:15,paddingTop:10,float:'right'}}>
            <p style={{fontSize:24,padding:0}}><a style={{color:'#666666'}} href={"#/product?tagId="+this.props.data.tag.id} >more ></a></p>
          </div>
        </Col>
        <Col lg={{span:24}} md={{span:24}} xs={{span:0}} sm={{span:0}} style={{width:990,background:this.props.data.tag.color}}>
          <div style={{width:250,height:40,float:'left'}}>
            <img height="100%" src={"/api/img/thumb/"+this.props.data.tag.picture} />
          </div>
          <div style={{height:40,marginRight:15,paddingTop:5,float:'right'}}>
            <p style={{fontSize:16,padding:0}}><a style={{color:'#666666'}} href={"#/product?tagId="+this.props.data.tag.id} >more ></a></p>
          </div>
        </Col>
        <Line/>
        <Col xs={{span:24}} sm={{span:24}} lg={{span:0}} md={{span:0}} style={{width:990}}>
          {itemList}
        </Col>
        <Col lg={{span:24}} md={{span:24}} xs={{span:0}} sm={{span:0}} style={{width:990,height:220}}>
          {itemList2}
        </Col>
      </Row>
    </div>
  );
  }
});

const HomePage = React.createClass({
  getInitialState() {
    return {
      data: [],
    };
  },
  fetch(params = {}) {
     $.get('/api/tag/product',{recommend:true},function(data){
      this.setState({data: data});
		 }.bind(this));
  },
  componentDidMount() {
    this.fetch();
  },
  render() {
    var itemList = this.state.data.map(function(data) {
      return (
        <ProductList data={data} key={data.tag.id}/>
      );
    });
  return (
    <div style={{minWidth:990}}>
      <Header/>
      <Menu menuId={1}/>
      <Banner/>
      <Line/>
      {itemList}
      <Footer/>
    </div>
  );
  }
});

export default withRouter(HomePage);
