import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import lodash from "lodash";
import PaintingDetail from "../PaintingDetail/PaintingDetail";
import * as PaintingModalActions from "../../redux/modules/containers/PaintingModal";
import "./PaintingModal.scss";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

@connect(
  (state, ownProps) => ({
    id: state.containers.PaintingModal.id,
    indexes: state.containers.PaintingModal.indexes,
    isOpened: state.containers.PaintingModal.isOpened,
  }),
  {...PaintingModalActions}
)

export default class PaintingModal extends Component {
  static propTypes = {
    id: PropTypes.number,
    indexes: PropTypes.array,
    isOpened: PropTypes.bool,

    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    changeItem: PropTypes.func,
  };

  constructor() {
    super();
    this.changeItem = this.changeItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  changeItem(id) {
    this.props.changeItem({id: id});
  }

  closeModal() {
    this.props.closeModal();
  }

  renderModal() {
    const {id, indexes} = this.props;
    const idIndex = lodash.indexOf(indexes, id);
    const nextId = indexes[idIndex + 1];
    const previousId = indexes[idIndex - 1];
    return (
      <div className="PaintingModal">
        <span onClick={()=>this.changeItem(previousId)} className={"previous " + (previousId ? '' : 'disabled')}
              href=""><i className="zmdi zmdi-chevron-left"/></span>
        <span onClick={()=>this.changeItem(nextId)} className={"next " + (nextId ? '' : 'disabled')} href=""><i
          className="zmdi zmdi-chevron-right"/></span>
        <PaintingDetail id={id} isInModal={true}/>
        <span onClick={this.closeModal} className="close" href=""><i className="zmdi zmdi-close"/></span>
      </div>
    );
  }

  render() {
    const {isOpened} = this.props;
    return (
      <ReactCSSTransitionGroup 
        transitionName="PaintingModalTransition" 
        transitionEnterTimeout={300} 
        transitionLeaveTimeout={300}
      >
      {isOpened ? this.renderModal() : ''}
    </ReactCSSTransitionGroup>);
  }
}
