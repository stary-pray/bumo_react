import React, {Component, PropTypes} from "react";
import "./MainFooter.scss";

export default class MainFooter extends Component {
  render() {
    const {pathname} = window.location;
    const onRedirectPath = pathname === '/redirect';
    return (<div className={"MainFooter__container " + (onRedirectPath ? 'is-redirect-page' : '') }>
      <div className="MainFooter__left">
        <span className="secondary-color"> © 2016 星祈 </span>
      </div>
      <div className="MainFooter__right">
        <a className="secondary-color small-font" href="http://shang.qq.com/wpa/qunwpa?idkey=8e9e80abd52fa64506f08514fcfc17f7243e46195e60c79faee27c92074dbfba">恋绘QQ群: 539351114</a>
        <span className="secondary-color small-font"> | </span>
        <a className="secondary-color small-font" href="http://www.miitbeian.gov.cn">粤ICP备14019972号</a>
      </div>
    </div>);
  }
}
