import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';

const OrderExpressPage = React.createClass({
  getInitialState() {
    return {
      showResult:false,
      orderId:"",
      data: {},
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
    $.get('/api/order/'+this.state.orderId,param,function(data){
      this.setState({data: data,showResult:true});
		}.bind(this));
  },
  handlerKeyUp(event){
    if(event.keyCode === 13){
      if(event.target.value!=null&&event.target.value!=""){
        var param = {};
        $.get('/api/order/'+event.target.value,param,function(data){
          this.setState({data: data,showResult:true});
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
    return (
      <div>
        <Row type="flex" justify="center">
          <Col xs={{span:24}} sm={{span:24}} lg={{span:24}} md={{span:24}} style={{textAlign:'center'}}>
            <div style={{marginTop:100,marginLeft:30,marginRight:30}}>
              <Input style={{height:90,fontSize:34,textAlign:'center'}} placeholder="请输入您的订单号" onChange={this.handleChange} onKeyUp={this.handlerKeyUp}/>
            </div>
            <div style={{marginTop:30,marginLeft:30,marginRight:30}}>
              <Button type="primary" style={{height:90,background:'#ad5ca0',fontSize:34,width:'100%'}} onClick={this.handleSearch}>开始查询</Button>
            </div>
            <div style={{marginTop:30,marginLeft:30,marginRight:30,textAlign:'left',display:display}}>
              <hr style={{marginTop:30,border:'1px dashed #000000'}}/>
              <p style={{fontSize:34,height:30,marginTop:30,lineHeight:'30px'}}>查询结果：</p>
              <p style={{fontSize:34,height:30,marginTop:30,lineHeight:'30px'}}><strong>{this.state.data.expressId==""?"订单号不存在,未找到快递单号":this.state.data.expressId}</strong></p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
});

export default OrderExpressPage;
