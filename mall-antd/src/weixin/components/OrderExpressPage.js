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
        this.setState({data: [],expressId:data.expressId,showResult:true});
      }else{
        this.setState({data: data.list,expressId:data.expressId,showResult:true});
      }
		}.bind(this));
  },
  handlerKeyUp(event){
    if(event.keyCode === 13){
      if(event.target.value!=null&&event.target.value!=""){
        var param = {};
        $.get('/api/order/receive/'+event.target.value,param,function(data){
          if(data.list==null){
            this.setState({data: [],expressId:data.expressId,showResult:true});
          }else{
            this.setState({data: data.list,expressId:data.expressId,showResult:true});
          }
    		}.bind(this));
      }
    }
  },
  handlerPopup(captchaObj){
    // 成功的回调
    $("#embed-submit").click(function (e) {
        var validate = captchaObj.getValidate();
        if (!validate) {
            $("#notice")[0].className = "show";
            setTimeout(function () {
                $("#notice")[0].className = "hide";
            }, 2000);
            e.preventDefault();
        }
    });
    // 将验证码加到id为captcha的元素里，同时会有三个input的值：geetest_challenge, geetest_validate, geetest_seccode
    captchaObj.appendTo("#embed-captcha");
    captchaObj.onReady(function () {
        $("#wait")[0].className = "hide";
    });
  },
  componentDidMount() {	  
    var that = this;
    // 验证开始需要向网站主后台获取id，challenge，success（是否启用failback）
    $.ajax({
        url: "/api/verify/captcha?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
            // 使用initGeetest接口
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                product: "embed", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            }, that.handlerPopup);
        }
    });
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
    return (
      <div>
        <Row type="flex" justify="center">
          <Col xs={{span:24}} sm={{span:24}} lg={{span:24}} md={{span:24}} style={{textAlign:'center'}}>
            <div style={{marginTop:60,marginLeft:30,marginRight:30}}>
              <Input style={{height:45,fontSize:22,textAlign:'center',lineHeight:'30px'}} placeholder="请输入您的订单号" onChange={this.handleChange} onKeyUp={this.handlerKeyUp}/>
            </div>
            <div style={{marginTop:30,marginLeft:30,marginRight:30}}>
              <form className="popup" action="/api/verify/verify" method="post">
                <div id="embed-captcha"></div>
                <p id="wait" className="show">正在加载验证码......</p>
                <p id="notice" className="hide">请先拖动验证码到相应位置</p>
                <br>
                <input className="btn" id="embed-submit" type="submit" value="提交"/>
            </form>
            </div>
            <div style={{marginTop:30,marginLeft:30,marginRight:30}}>
              <Button type="primary" style={{height:45,background:'#ad5ca0',fontSize:22,width:'100%',lineHeight:'30px'}} onClick={this.handleSearch}>开始查询</Button>
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
