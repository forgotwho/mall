import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Carousel } from 'antd';
import { withRouter } from 'react-router';

const Banner = React.createClass({
  getInitialState() {
    return {
      data: [],
      background:''
    };
  },
  fetch(params = {}) {
    $.get('/api/banner',function(data){
      this.setState({data: data,background:data[0].color});
		}.bind(this));
  },
  componentDidMount() {
    this.fetch();
  },
  onChange(index) {
    this.setState({background:this.state.data[index].color});
  },
  render() {
    var pcPicture = [];
    var mobilePicture=[];
    var pcDefatult = "";
    var pcLink = "";
    var mobileDefatult = "";
    var mobileLink = "";
    this.state.data.map(function(data) {
      if(data.source=="01"){
        if(pcDefatult==""){
          pcDefatult = data.picture;
          pcLink = data.link;
        }else{
          pcPicture.push(<div key={data.picture}><a href={data.link}><img  width="100%" src={"/api/img/thumb/"+data.picture} /></a></div>);
        }
      }else if(data.source=="02"){
        if(mobileDefatult==""){
          mobileDefatult = data.picture;
          mobileLink = data.link;
        }else{
          mobilePicture.push(<div key={data.picture}><a href={data.link}><img width="100%" src={"/api/img/thumb/"+data.picture} /></a></div>);
        }
      }else{
        if(pcDefatult==""){
          pcDefatult = data.picture;
          pcLink = data.link;
        }else{
          pcPicture.push(<div key={data.picture}><a href={data.link}><img width="100%" src={"/api/img/thumb/"+data.picture} /></a></div>);
        }
        if(mobileDefatult==""){
          mobileDefatult = data.picture;
          mobileLink = data.link;
        }else{
          mobilePicture.push(<div key={data.picture}><a href={data.link}><img width="100%" src={"/api/img/thumb/"+data.picture} /></a></div>);
        }
      }
    });
  return (
    <Row type="flex" justify="center" style={{background:this.state.background}}>
      <Col xs={{span:0}} sm={{span:0}} md={{span:24}} lg={{span:24}} style={{width:990,height:300}}>
        <Carousel autoplay beforeChange={this.onChange}>
          <div><a href={pcLink}><img width="100%" src={"/api/img/thumb/"+pcDefatult} /></a></div>
          {pcPicture}
        </Carousel>
      </Col>
      <Col xs={{span:24}} sm={{span:24}} md={{span:0}} lg={{span:0}} style={{width:990,background:'#FFFFFF'}}>
        <Carousel autoplay beforeChange={this.onChange}>
          <div><a href={mobileLink}><img width="100%" height="100%" src={"/api/img/thumb/"+mobileDefatult} /></a></div>
          {mobilePicture}
        </Carousel>
      </Col>
    </Row>
  );
  }
});

export default withRouter(Banner);
