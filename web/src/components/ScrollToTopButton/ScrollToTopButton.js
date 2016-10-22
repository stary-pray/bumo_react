import React, {Component, PropTypes} from "react";
import Scroll from "react-scroll";
import throttle from "lodash/throttle";
import "./ScrollToTopButton.scss";

export default class ScrollToTopButton extends Component {
  constructor(){
    super();
    this.state = {
      show: false
    };
    this.handleScroll = throttle(()=> {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      this.setState({show: top * 1.5 > windowHeight});
    }, 100);
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  scrollToTop(){
    Scroll.animateScroll.scrollToTop({duration: 200});
  }

  render() {
    return (
      <button
        onClick={this.scrollToTop}
        className={"button ScrollToTopButton__button " + (this.state.show ? '' : 'ScrollToTopButton__button-hide')}>
        <i className="zmdi zmdi-chevron-up"/>
      </button>
    );
  }
}
