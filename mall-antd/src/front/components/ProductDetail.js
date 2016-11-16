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
      data: null,
      showPicture:"",
      mobileData:[],
      mobileDefatult:''
    };
  },
  handleSwitch(event){
    this.setState({showPicture:event.target.id});
  },
  fetch(params = {}) {
     $.get('/api/product/'+this.props.params.id,function(data){
        var mobileData = data.pictureSet.split(","); 
        this.setState({
          data:data,
          showPicture:data.picture,
          mobileData:mobileData,
          mobileDefatult:mobileData[0],
        });
		 }.bind(this));
  },
  componentDidMount() {
    this.fetch();
  },
  render() {
    if(this.state.data==null){
      return (<div></div>);
    }
    var pictureList = [];
    var pictureList2 = [];
    var defaultPicture = "";
    if(this.state.data.pictureSet!=null){
      var pictureSet = this.state.data.pictureSet.split(","); 
      for(var i=0;i<pictureSet.length;i++){
        if(this.state.showPicture==pictureSet[i]){
          pictureList.push(<img id={pictureSet[i]} key={pictureSet[i]} onClick={this.handleSwitch} width="100" height="100" style={{marginLeft:5,padding:5,border:'2px solid #666666'}} src={"/api/img/thumb/"+pictureSet[i]} />);
        }else{
          pictureList.push(<img id={pictureSet[i]} key={pictureSet[i]} onClick={this.handleSwitch} width="100" height="100" style={{marginLeft:5,padding:5,border:'1px solid #666666'}} src={"/api/img/thumb/"+pictureSet[i]} />);
        }
        defaultPicture = pictureSet[0];
      }
      
      for(var i=1;i<this.state.mobileData.length;i++){
        pictureList2.push(<div key={this.state.mobileData[i]} ><img width="100%" src={"/api/img/thumb/"+this.state.mobileData[i]} /></div>);
      }
    }
    var colorList = [];
    if(this.state.data.colors!=null){
      var color = this.state.data.colors.split(","); 
      for(var i=0;i<color.length;i++){
        colorList.push(<span key={i+"_"+color[i]} style={{float:'left',marginLeft:2,width:15,height:15,background:color[i]}}></span>);
      }
    }
    if(this.state.data==null){
      return (<div></div>);
    }
  return (
    <div style={{}}>
      <Header/>
      <Menu menuId={2}/>
      <Line/>
      <Row type="flex" justify="center">
        <Col xs={{span:0}} sm={{span:0}} md={{span:24}} lg={{span:24}} style={{minWidth:990,width:990,textAlign:'left'}}>
          <div style={{float:'left',border:1,textAlign:'center'}}>
            <div style={{padding:0,margin:0,border:'1px solid #666666'}}>
              <img width="350" height="350" src={"/api/img/thumb/"+this.state.showPicture} /></div>
            <div style={{marginLeft:60,marginRight:60,marginTop:10,marginBottom:10}}>
              {pictureList}
            </div>
          </div>
          <div style={{float:'left',marginLeft:20,marginTop:100,color:'#666666',fontSize:16}}>
            <p>产品名称：<span style={{marginLeft:5}}>{this.state.data.name}</span></p>
            <p>可选颜色：
              <span style={{float:'right',width:60,marginRight:10,marginTop:5}}>
                {colorList}
              </span>
            </p>
            <p>直径：<span style={{marginLeft:5}}>{this.state.data.diameter}</span></p>
            <p>基弧：<span style={{marginLeft:5}}>{this.state.data.baseCurve}</span></p>
            <p>含水量：<span style={{marginLeft:5}}>{this.state.data.waterContent}</span></p>
            <p>产地：<span style={{marginLeft:5}}>{this.state.data.originPlace}</span></p>
            <p>佩戴周期：<span style={{marginLeft:5}}>{this.state.data.wearCycle}</span></p>
          </div>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:0}} lg={{span:0}}>
          <Carousel dots="false" style={{marginTop:5,marginBottom:5,marginLeft:5,marginRight:5}}>
            <div><img width="100%" src={"/api/img/thumb/"+this.state.mobileDefatult} /></div>
            {pictureList2}
          </Carousel>
          <div style={{marginLeft:40,marginTop:20,marginBottom:20,color:'#666666',fontSize:16}}>
            <div style={{float:'left',width:'50%',marginLeft:0}}>
              <p style={{marginTop:20,fontSize:24}}>产品名称：<span style={{marginLeft:5}}>蓝山</span></p>
              <p style={{marginTop:20,fontSize:24,textAlign:'left'}}>
                可选颜色：
                <span style={{float:'right',width:60,marginRight:10,marginTop:5}}>
                  {colorList}
                </span>
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
        <Col xs={{span:0}} sm={{span:0}} md={{span:24}} lg={{span:24}} style={{minWidth:990,width:990,textAlign:'center'}}>
          <hr/>
          <div dangerouslySetInnerHTML={{__html:this.state.data.detail}}></div>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:0}} lg={{span:0}} style={{textAlign:'center'}}>
          <hr/>
          <div dangerouslySetInnerHTML={{__html:this.state.data.detail}}></div>
        </Col>
      </Row>
      <Line/>
      <Footer/>
    </div>
  );
  }
});

export default withRouter(ProductDetail);
