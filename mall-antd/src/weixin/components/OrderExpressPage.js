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
      if(event.target.value==null||event.target.value==""){
        return;
      }
      var param = {orderId:event.target.value};
      $.get('/api/order/express',param,function(data){
        this.setState({data: data,showResult:true});
  		}.bind(this));
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
            <div style={{width:'100%',marginTop:390,paddingLeft:60,paddingRight:60}}>
              <Input size="large" style={{height:90,fontSize:34,textAlign:'center'}} placeholder="请输入您的订单号" onChange={this.handleChange} onKeyUp={this.handlerKeyUp}/>
            </div>
            <div style={{width:'100%',marginTop:60,paddingLeft:60,paddingRight:60}}>
              <Button type="primary" style={{background:'#ad5ca0',fontSize:34,width:'100%',height:90}} onClick={this.handleSearch}>开始查询</Button>
            </div>
            <div style={{width:'100%',marginTop:60,paddingLeft:60,paddingRight:60,textAlign:'left',display:display}}>
              <hr style={{border:'1px dashed #000'}}/>
              <p style={{fontSize:34,width:'100%',height:60,marginTop:60}}>查询结果:</p>
              <p style={{fontSize:34,width:'100%',height:60,marginTop:60}}><strong>{this.state.data.expressId==""?"订单号不存在,未找到快递单号":this.state.data.expressId}</strong></p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
});

export default OrderExpressPage;
