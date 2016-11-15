import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Carousel } from 'antd';
import { withRouter } from 'react-router';

const Banner = React.createClass({
  getInitialState() {
    return {
      data: [],
      pcData:[],
      mobileData:[],
      background:''
    };
  },
  fetch(params = {}) {
    var param = {recommend:true};
    $.get('/api/banner',function(result){
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
      this.setState({data: result,pcData:pcData,mobileData:mobileData,background:pcData[0].color});
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
    var pcPicture = [];
    var mobilePicture=[];
    var pcDefatult = "";
    var pcLink = "";
    var mobileDefatult = "";
    var mobileLink = "";
    this.state.pcData.map(function(data) {
      if(pcDefatult==""){
        pcDefatult = data.picture;
        pcLink = data.link;
      }else{
        pcPicture.push(<div key={data.picture} style={{width:990,height:300}}><a href={data.link}><img  width="990" height="300" src={"/api/img/thumb/"+data.picture} /></a></div>);
      }
    });
    this.state.mobileData.map(function(data) {
      if(mobileDefatult==""){
        mobileDefatult = data.picture;
        mobileLink = data.link;
      }else{
        mobilePicture.push(<div key={data.picture}><a href={data.link}><img width="100%" src={"/api/img/thumb/"+data.picture} /></a></div>);
      }
    });
  return (
    <Row type="flex" justify="center" style={{background:this.state.background,height:300}}>
      <Col xs={{span:0}} sm={{span:0}} md={{span:24}} lg={{span:24}} >
        <Carousel autoplay beforeChange={this.onChange}>
          <div style={{width:990,height:300}}><a href={pcLink}><img width="990" height="300" src={"/api/img/thumb/"+pcDefatult} /></a></div>
          {pcPicture}
        </Carousel>
      </Col>
      <Col xs={{span:24}} sm={{span:24}} md={{span:0}} lg={{span:0}} style={{width:990,background:'#FFFFFF'}}>
        <Carousel autoplay >
          <div><a href={mobileLink}><img width="100%" height="100%" src={"/api/img/thumb/"+mobileDefatult} /></a></div>
          {mobilePicture}
        </Carousel>
      </Col>
    </Row>
  );
  }
});

export default withRouter(Banner);
