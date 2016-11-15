import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Carousel } from 'antd';
import { withRouter } from 'react-router';

const Banner = React.createClass({
  getInitialState() {
    return {
      pcData:[],
      mobileData:[],
      background:'',
      pcDefatult:'',
      pcDefatultLink:'#',
      mobileDefatult:'',
      mobileDefatultLink:'#'
    };
  },
  fetch(params = {}) {
    var param = {recommend:true};
    $.get('/api/banner',param,function(result){
      var pcData = [];
      var mobileData = [];
      result.map(function(data) {
        if(data.source=="01"){
          pcData.push(data);
        }else if(data.source=="02"){
          mobileData.push(data);
        }else{
          pcData.push(data);
          mobileData.push(data);
        }
      });
      this.setState({
        pcData:pcData,
        mobileData:mobileData,
        background:pcData[0].color,
        pcDefatult:pcData[0].picture,
        pcDefatultLink:pcData[0].link,
        mobileDefatult:mobileData[0].picture,
        mobileDefatultLink:mobileData[0].link,
      });
		}.bind(this));
  },
  componentDidMount() {
    this.fetch();
  },
  onChange(index) {
     index = index +1;
     if(index>=this.state.pcData.length){
       index = 0;
     }
     console.log(index,this.state.pcData[index].color);
    this.setState({background:this.state.pcData[index].color});
  },
  render() {
    if(this.state.pcData==null||this.state.pcData.length==0){
      return (<div></div>);
    }
    var pcPicture = [];
    var mobilePicture=[];
    for(var i=1;i<this.state.pcData.length;i++){
      pcPicture.push(<div key={this.state.pcData[i].picture} style={{background:this.state.background,width:990,height:300}}>
      <center><a href={this.state.pcData[i].link}><img  width="990" height="300" src={"/api/img/thumb/"+this.state.pcData[i].picture} /></a></center></div>);
    }
    for(var i=1;i<this.state.mobileData.length;i++){
      mobilePicture.push(<div key={this.state.mobileData[i].picture}><center><a href={this.state.pcData[i].link}><img width="100%" src={"/api/img/thumb/"+this.state.mobileData[i].picture} /></a></center></div>);
    }
  return (
    <Row type="flex" justify="center">
      <Col xs={{span:0}} sm={{span:0}} md={{span:24}} lg={{span:24}} >
        <Carousel autoplay={true} dots={true} beforeChange={this.onChange}>
          <div style={{background:this.state.background,height:300}}>
            <center><a href={this.state.pcDefatultLink}><img width="990" height="300" src={"/api/img/thumb/"+this.state.pcDefatult} /></a></center>
          </div>
          {pcPicture}
        </Carousel>
      </Col>
      <Col xs={{span:24}} sm={{span:24}} md={{span:0}} lg={{span:0}} style={{width:990,background:'#FFFFFF'}}>
        <Carousel autoplay={true} dots={true}>
          <div>
            <center><a href={this.state.mobileDefatultLink}><img width="100%" height="100%" src={"/api/img/thumb/"+this.state.mobileDefatult} /></a></center>
          </div>
          {mobilePicture}
        </Carousel>
      </Col>
    </Row>
  );
  }
});

export default withRouter(Banner);
