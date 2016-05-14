import React, {Component, PropTypes} from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./BumoDropdown.scss";
import onClickOutside from "react-onclickoutside";

@onClickOutside
export default class BumoDropdown extends Component {
  static propTypes = {
    isOpened: PropTypes.bool,
    close: PropTypes.func.isRequired,
    positionClass: PropTypes.string,
  };

  constructor() {
    super();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside() {
    if (this.props.isOpened) {
      this.props.close();
    }
  }

  renderOpened() {
    const {positionClass} = this.props;
    return (<div className={"BumoDropdown " + positionClass}>
      {this.props.children}
    </div>);
  }

  render() {
    const {isOpened} = this.props;
    return (
      <ReactCSSTransitionGroup
        transitionName="BumoDropdownTransition"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
      >
        {isOpened ? this.renderOpened() : ''}
      </ReactCSSTransitionGroup>
    );
  }
}
