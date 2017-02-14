import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { Timeline } from 'antd';

const OrderExpressPage = React.createClass({
  getInitialState() {
    return {
      showResult:false,
      orderId:"",
      expressId:null,
      data: [],
      searchButtonFlag:true,
    };
  },
  handleChange(event) {
    this.setState({orderId:event.target.value});
  },
  handleSearch() {
    if(this.state.orderId==null||this.state.orderId==""){
      return;
    }
    var param = {};
    this.handleSlider();
    $.get('/api/order/receive/'+this.state.orderId,param,function(data){
      if(data.list==null){
        this.setState({data: [],expressId:data.expressId,showResult:true,searchButtonFlag:true});
      }else{
        this.setState({data: data.list,expressId:data.expressId,showResult:true,searchButtonFlag:true});
      }
		}.bind(this));
  },
  handlerKeyUp(event){
    if(event.keyCode === 13){
      if(event.target.value!=null&&event.target.value!=""){
        var param = {};
        this.handleSlider();
        $.get('/api/order/receive/'+event.target.value,param,function(data){
          if(data.list==null){
            this.setState({data: [],expressId:data.expressId,showResult:true,searchButtonFlag:true});
          }else{
            this.setState({data: data.list,expressId:data.expressId,showResult:true,searchButtonFlag:true});
          }
    		}.bind(this));
      }
    }
  },
  handleSlider() {
    var that = this;
    var slider = new SliderUnlock("#slider",{
			successLabelTip:"验证通功，请点按钮开始查询"	
		},function(){
      that.setState({searchButtonFlag:false});
    });
    slider.init();
    $("#labelTip").html("拖动滑块验证");
  },
  componentDidMount() {	  
    this.handleSlider();
  },
  render() {
    var display = "none";
    if(this.state.showResult){
      display = "";
    }
    var expressId = this.state.expressId;
    var itemList = this.state.data.map(function(data) {
      return (
        <Timeline.Item key={data.upload_Time}><p style={{fontSize:16}}>{data.upload_Time}</p><p style={{fontSize:16}}>{data.processInfo}</p></Timeline.Item>
      );
    });
    var searchButtonDiv = <Button disabled type="primary" style={{height:45,background:'#ad5ca0',fontSize:22,width:'100%',lineHeight:'30px'}} onClick={this.handleSearch}>开始查询</Button>;
    if(!this.state.searchButtonFlag){
      searchButtonDiv = <Button type="primary" style={{height:45,background:'#ad5ca0',fontSize:22,width:'100%',lineHeight:'30px'}} onClick={this.handleSearch}>开始查询</Button>;
    }
    return (
      <div>
        <Row type="flex" justify="center">
          <Col xs={{span:24}} sm={{span:24}} lg={{span:24}} md={{span:24}} style={{textAlign:'center'}}>
            <div style={{marginTop:60,marginLeft:30,marginRight:30}}>
              <Input style={{height:45,fontSize:22,textAlign:'center',lineHeight:'30px'}} placeholder="请输入您的订单号" onChange={this.handleChange} onKeyUp={this.handlerKeyUp}/>
            </div>
            <div style={{marginTop:30,marginLeft:30,marginRight:30}}>
              <div id="slider" style={{width:'100%'}}>
                <div id="slider_bg"></div>
                <span id="label">>></span> <span id="labelTip">拖动滑块验证</span> 
              </div>
            </div>
            <div style={{marginTop:30,marginLeft:30,marginRight:30}}>
              {searchButtonDiv}
            </div>
            <div style={{marginTop:30,marginLeft:30,marginRight:30,textAlign:'left',display:display}}>
              <hr style={{marginTop:30,border:'1px dashed #000000'}}/>
              <p style={{fontSize:22,height:30,marginTop:30,marginBottom:30,lineHeight:'30px',textAlign:'center'}}>快递单号：<strong>{expressId==null?"订单不存在或尚未发货":expressId}</strong></p>
              <Timeline>
                {itemList}
              </Timeline>
            </div>            
            <div style={{marginTop:60,marginLeft:0,marginRight:0}}>
              <p style={{fontSize:22,height:30,marginTop:30,marginBottom:0,lineHeight:'30px'}}>扫描关注公众号  物流信息早知道</p>
              <center><img width="50%" src="/weixin/weixin.jpg"/></center>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
});

export default OrderExpressPage;
