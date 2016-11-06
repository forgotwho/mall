import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { withRouter } from 'react-router';

var dataList = [
  {id: 1, name: "首页", href: "#/"},
  {id: 2, name: "所有产品", href: "#/product"},
  {id: 3, name: "关于我们", href: "#/about"},
  {id: 4, name: "联系我们", href: "#/contact"}
];

const Menu = React.createClass({
  handleMore(value) {
    event.preventDefault();
  },
  handleDetail(value) {
    event.preventDefault();
  },
  render() {
    var menuId = this.props.menuId;
    var menuNodes = dataList.map(function(data) {
      if(data.id==menuId){
        return (
        <div style={{float:'left',width:'20%',height:'100%',padding:8,background:"#999999"}}>
          <a style={{fontSize:16,color:'#f7f7f7'}} href={data.href}>{data.name}</a>
        </div>
      );
      }else{
        return (
        <div style={{float:'left',width:'20%',height:'100%',padding:8,background:"#f7f7f7"}}>
          <a style={{fontSize:16,color:'#666666'}} href={data.href}>{data.name}</a>
        </div>
      );
      }
    });
  return (
    <div style={{minWidth:990}}>
      <Row type="flex" justify="center" style={{background:'#f7f7f7'}}>
        <Col style={{width:990,height:42,textAlign:'center'}}>
          {menuNodes}
          <div style={{float:'right',textAlign:'right',width:'20%',height:'100%',padding:8,background:'#f7f7f7'}}>
            <a style={{fontSize:16,color:'#666666'}} href="#/">收藏</a>
          </div>
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(Menu);
