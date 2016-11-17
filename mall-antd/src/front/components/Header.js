import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Input } from 'antd';
import { withRouter } from 'react-router';

const Header = React.createClass({
  handleMore(value) {
    event.preventDefault();
  },
  handleDetail(value) {
    event.preventDefault();
  },
  handlerKeyUp(event){
    if(event.keyCode === 13){
      var keyword = event.target.value;
      if(this.props.load==null){
        if(keyword!=""){
          this.props.router.push("/product?name="+keyword);
        }else{
          this.props.router.push("/product");
        }
      }else{
        this.props.load(keyword);
      }
    }
  },
  handleClick(){
    if(this.props.load==null){
      var keyword = document.getElementById("searchInput").value;
      if(keyword!=""){
        this.props.router.push("/product?name="+keyword);
      }else{
        this.props.router.push("/product");
      }
    }else{
      var keyword = document.getElementById("searchInput").value;
      this.props.load(keyword);
    }
  },
  render() {
  return (
    <div style={{minWidth:990}}>
      <Row type="flex" justify="center">
        <Col xs={{span:0}} sm={{span:0}} md={{span:24}} lg={{span:24}} style={{width:990,height:120,textAlign:'center'}}>
          <div style={{float:'left',width:335,height:35,marginTop:35}}>
            <img src="images/logo.png" />
          </div>
          <div style={{float:'left',marginLeft:40,marginTop:45}}>
            <p style={{fontSize:20,color:'#999999'}}>New · Essential · Original</p>
          </div>
          <div style={{float:'right',textAlign:'left',width:294,marginTop:45}}>
            <div style={{float:'left',width:260,marginTop:0}}>
              <Input id="searchInput" size="large" style={{borderRadius:0,height:34}} onKeyUp={this.handlerKeyUp}/>
            </div>
            <div style={{float:'right',width:34,marginTop:0}}>
              <img src="images/04.png" onClick={this.handleClick}/>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(Header);
