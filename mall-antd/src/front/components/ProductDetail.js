import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { withRouter } from 'react-router';

import Header from './Header.js';
import Menu from './MenuBar.js';
import Line from './Line.js';
import Footer from './Footer.js';

const ProductDetail = React.createClass({
  getInitialState() {
    return {
      data: {},
    };
  },
  fetch(params = {}) {
     $.get('/api/product/'+this.props.params.id,function(data){
      this.setState({data: data});
		 }.bind(this));
  },
  componentDidMount() {
    this.fetch();
  },
  render() {
    var pictureList = [];
    var pictureList2 = [];
    if(this.state.data.pictureSet!=null){
      var pictureSet = this.state.data.pictureSet.split(","); 
      for(var i=0;i<pictureSet.length;i++){
        pictureList.push(<img key={pictureSet[i]} width="100" height="100" style={{marginLeft:5,padding:5,border:'1px solid #666666'}} src={"/api/img/thumb/"+pictureSet[i]} />);
        pictureList2.push(<div key={pictureSet[i]} ><img width="100%" src={"/api/img/thumb/"+pictureSet[i]} /></div>);
      }
    }
    var colorList = [];
    if(this.state.data.colors!=null){
      var color = this.state.data.colors.split(","); 
      for(var i=0;i<color.length;i++){
        colorList.push(<div key={i+"_"+color[i]} style={{float:'left',width:15,height:15,background:color[i]}}></div>);
      }
    }
  return (
    <div style={{minWidth:990}}>
      <Header/>
      <Menu menuId={2}/>
      <Line/>
      <Row type="flex" justify="center">
        <Col xs={{span:0}} sm={{span:0}} md={{span:24}} lg={{span:24}} style={{width:990,textAlign:'left'}}>
          <div style={{float:'left',border:1,width:600,textAlign:'center'}}>
            <div style={{padding:100,margin:0,border:'1px solid #666666'}}><img width="100%" src={"/api/img/thumb/"+this.state.data.picture} /></div>
            <div style={{marginLeft:60,marginRight:60,marginTop:10,marginBottom:10}}>
              {pictureList}
            </div>
          </div>
          <div style={{float:'left',marginLeft:20,marginTop:100,color:'#666666',fontSize:16}}>
            <p>产品名称：<span style={{marginLeft:5}}>{this.state.data.name}</span></p>
            <p>可选颜色：
              <div style={{float:'right',width:60,marginRight:10,marginTop:5}}>
                {colorList}
              </div>
            </p>
            <p>直径：<span style={{marginLeft:5}}>{this.state.data.diameter}</span></p>
            <p>基弧：<span style={{marginLeft:5}}>{this.state.data.baseCurve}</span></p>
            <p>含水量：<span style={{marginLeft:5}}>{this.state.data.waterContent}</span></p>
            <p>产地：<span style={{marginLeft:5}}>{this.state.data.originPlace}</span></p>
            <p>佩戴周期：<span style={{marginLeft:5}}>{this.state.data.wearCycle}</span></p>
          </div>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:0}} lg={{span:0}}>
          <Carousel autoplay dots="false" style={{marginTop:45,marginBottom:45,marginLeft:55,marginRight:55}}>
            <div>{pictureList2}</div>
          </Carousel>
          <div style={{marginLeft:40,marginTop:20,marginBottom:20,color:'#666666',fontSize:16}}>
            <div style={{float:'left',width:'50%',marginLeft:0}}>
              <p style={{marginTop:20,fontSize:24}}>产品名称：<span style={{marginLeft:5}}>蓝山</span></p>
              <p style={{marginTop:20,fontSize:24,textAlign:'left'}}>
                可选颜色：
                <div style={{float:'right',width:60,marginRight:10,marginTop:5}}>
                  {colorList}
                </div>
              </p>
              <p style={{marginTop:20,fontSize:24}}>直径：<span style={{marginLeft:5}}>14.00 mm</span></p>
              <p style={{marginTop:20,fontSize:24}}>基弧：<span style={{marginLeft:5}}>8.6</span></p>
            </div>
            <div style={{float:'right',width:'50%',marginLeft:0}}>
              <p style={{marginTop:20,fontSize:24}}>含水量：<span style={{marginLeft:5}}>42.5%</span></p>
              <p style={{marginTop:20,fontSize:24}}>产地：<span style={{marginLeft:5}}>韩国</span></p>
              <p style={{marginTop:20,fontSize:24}}>佩戴周期：<span style={{marginLeft:5}}>1年</span></p>
            </div>
            
          </div>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col style={{width:990,textAlign:'left'}}>
          <hr/>
          {this.state.data.detail}
        </Col>
      </Row>
      <Line/>
      <Footer/>
    </div>
  );
  }
});

export default withRouter(ProductDetail);
