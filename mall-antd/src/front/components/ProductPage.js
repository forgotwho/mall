import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { Input } from 'antd';
import { withRouter } from 'react-router';

import Header from './Header.js';
import Menu from './MenuBar.js';
import Line from './Line.js';
import Footer from './Footer.js';

const ProductItem = withRouter(React.createClass({
  handleClick(){
    this.props.router.push("/product/detail/"+this.props.data.id);
  },
  render() {
    var colorList = [];
    if(this.props.data.colors!=null){
      var color = this.props.data.colors.split(","); 
      for(var i=0;i<color.length;i++){
        colorList.push(<div key={i+"_"+color[i]} style={{float:'left',width:20,height:20,background:color[i]}}></div>);
      }
    }
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
            {colorList}
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
    var colorList = [];
    if(this.props.data.colors!=null){
      var color = this.props.data.colors.split(","); 
      for(var i=0;i<color.length;i++){
        colorList.push(<div key={i+"_"+color[i]} style={{float:'right',marginLeft:2,width:10,height:10,background:color[i]}}></div>);
      }
    }
  return (
    <div>
      <Card style={{float:'left',width:'20%',background:'#FFFFFF'}} bodyStyle={{ padding: 0 }} onClick={this.handleClick}>
        <div style={{marginTop:5,marginBottom:5,marginLeft:5,marginRight:5}} >
          <img width="190" height="190" src={"/api/img/thumb/"+this.props.data.picture} />
        </div>
        <div>
          <div style={{float:'left',marginLeft:10}}>
            <p style={{fontSize:16}}>{this.props.data.name}</p>
          </div>
          <div style={{float:'right',width:50,marginRight:10,marginTop:5}}>
            {colorList}
          </div>
        </div>
      </Card>
    </div>
  );
  }
}));

const ProductList = withRouter(React.createClass({
  render() {
    var itemList = this.props.data.map(function(data) {
      return (
        <ProductItem data={data} key={data.id}/>
      );
    });
    var itemList2 = this.props.data.map(function(data) {
      return (
        <ProductItem2 data={data} key={data.id}/>
      );
    });
    var searchText = "";
    if(this.props.location.query.tagName!=null){
      searchText = "所有产品>搜索>"+"\""+this.props.location.query.tagName+"\"";
    }else if(this.props.location.query.name!=null){
      searchText = "所有产品>搜索>"+"\""+this.props.location.query.name+"\"";
    }
  return (
    <div>
      <Row type="flex" justify="center">
        <Col xs={{span:24}} sm={{span:24}} lg={{span:0}} md={{span:0}} style={{width:'100%'}}>
          <div style={{marginBottom:20,float:'left'}}>
            <p style={{fontSize:24}}>{searchText}</p>
          </div>
        </Col>
        <Col lg={{span:24}} md={{span:24}} xs={{span:0}} sm={{span:0}} style={{minWidth:990,width:990}}>
          <div style={{width:250,marginBottom:20,float:'left'}}>
            <p style={{fontSize:16}}>{searchText}</p>
          </div>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} lg={{span:0}} md={{span:0}} style={{width:'100%'}}>
          {itemList}
        </Col>
        <Col lg={{span:24}} md={{span:24}} xs={{span:0}} sm={{span:0}} style={{minWidth:990,width:990}}>
          {itemList2}
        </Col>
      </Row>
    </div>
  );
  }
}));

const ProductPage = React.createClass({
  getInitialState() {
    return {
      data: [],
    };
  },
  fetch(params = {}) {
    var param = {recommend:true};
    if(params.length>0){
      param = {recommend:true,name:params.trim()};
    }else if(this.props.location.query.tagId!=null){
      param = {recommend:true,tagId:this.props.location.query.tagId};
    }else if(this.props.location.query.name!=null){
      param = {recommend:true,name:this.props.location.query.name};
    }else if(this.props.location.query.type!=null){
      param = {recommend:true};
    }
    $.get('/api/product',param,function(data){
      this.setState({data: data});
		}.bind(this));
  },
  componentDidMount() {
    this.fetch();
  },
  render() {
  return (
    <div style={{}}>
      <Header load={this.fetch}/>
      <Menu menuId={2} load={this.fetch}/>
      <Line/>
      <ProductList data={this.state.data}/>
      <Line/>
      <Footer/>
    </div>
  );
  }
});

export default withRouter(ProductPage);
