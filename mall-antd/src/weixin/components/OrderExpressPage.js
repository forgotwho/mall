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
      data: [],
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
    $.get('/api/order/receive/'+this.state.orderId,param,function(data){
      if(data.list==null){
        this.setState({data: [],showResult:true});
      }else{
        this.setState({data: data.list,showResult:true});
      }
		}.bind(this));
  },
  handlerKeyUp(event){
    if(event.keyCode === 13){
      if(event.target.value!=null&&event.target.value!=""){
        var param = {};
        $.get('/api/order/receive/'+event.target.value,param,function(data){
          if(data.list==null){
            this.setState({data: [],showResult:true});
          }else{
            this.setState({data: data.list,showResult:true});
          }
    		}.bind(this));
      }
    }
  },
  componentDidMount() {
  },
  render() {
    var display = "none";
    if(this.state.showResult){
      display = "";
    }
    var expressId = "";
    var itemList = this.state.data.map(function(data) {
      expressId = data.waybill_No;
      return (
        <Timeline.Item key={data.upload_Time}><p style={{fontSize:16}}>{data.upload_Time}</p><p style={{fontSize:16}}>{data.processInfo}</p></Timeline.Item>
      );
    });
    return (
      <div>
        <Row type="flex" justify="center">
          <Col xs={{span:24}} sm={{span:24}} lg={{span:24}} md={{span:24}} style={{textAlign:'center'}}>
            <div style={{marginTop:100,marginLeft:30,marginRight:30}}>
              <Input style={{height:45,fontSize:22,textAlign:'center',lineHeight:'30px'}} placeholder="请输入您的订单号" onChange={this.handleChange} onKeyUp={this.handlerKeyUp}/>
            </div>
            <div style={{marginTop:30,marginLeft:30,marginRight:30}}>
              <Button type="primary" style={{height:45,background:'#ad5ca0',fontSize:22,width:'100%',lineHeight:'30px'}} onClick={this.handleSearch}>开始查询</Button>
            </div>
            <div style={{marginTop:30,marginLeft:30,marginRight:30,textAlign:'left',display:display}}>
              <hr style={{marginTop:30,border:'1px dashed #000000'}}/>
              <p style={{fontSize:22,height:30,marginTop:30,marginBottom:30,lineHeight:'30px'}}>快递单号：<strong>{expressId==""?"订单号不存在,未找到快递单号":expressId}</strong></p>
              <Timeline>
                {itemList}
              </Timeline>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
});

export default OrderExpressPage;
