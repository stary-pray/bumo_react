import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import lodash from "lodash";
import PaintingDetail from "../PaintingDetail/PaintingDetail";
import * as PaintingModalActions from "../../redux/modules/containers/PaintingModal";
import "./PaintingModal.scss";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Mousetrap from "mousetrap";

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
    this.goLeft = false;
    this.goRight = false;
  }

  changeItem(id) {
    this.props.changeItem({id: id});
  }

  closeModal() {
    this.props.closeModal();
  }

  goNext() {
    const {id, indexes} = this.props;
    const idIndex = lodash.indexOf(indexes, id);
    const nextId = indexes[idIndex + 1];
    nextId && this.changeItem(nextId);
  }

  goPrevious() {
    const {id, indexes} = this.props;
    const idIndex = lodash.indexOf(indexes, id);
    const previousId = indexes[idIndex - 1];
    previousId && this.changeItem(previousId);
  }

  componentWillReceiveProps(nextProps) {
    const {id, indexes} = this.props;
    if (indexes) {
      const idIndex = lodash.indexOf(indexes, id);
      const nextId = indexes[idIndex + 1];
      const previousId = indexes[idIndex - 1];

      const comingId = nextProps.id;
      this.goLeft = comingId == previousId;
      this.goRight = comingId == nextId;
    }

    if(!this.props.isOpened && nextProps.isOpened){
      Mousetrap.bind(['l', 'right'], () => this.goNext());
      Mousetrap.bind(['h', 'left'], () => this.goPrevious());
      Mousetrap.bind('esc', () => this.closeModal())
    }

    if(this.props.isOpened && !nextProps.isOpened){
      Mousetrap.unbind(['l', 'right', 'h', 'left', 'esc']);
    }
  }

  renderModal() {
    const {id, indexes} = this.props;
    const idIndex = lodash.indexOf(indexes, id);
    const nextId = indexes[idIndex + 1];
    const previousId = indexes[idIndex - 1];
    return (
      <div key={`PaintingModal`} className="PaintingModal">
        <span onClick={() => this.goNext()} className={"previous " + (previousId ? '' : 'disabled')}
              href=""><i className="zmdi zmdi-chevron-left"/></span>
        <span onClick={() => this.goPrevious()} className={"next " + (nextId ? '' : 'disabled')}><i
          className="zmdi zmdi-chevron-right"/></span>
        <ReactCSSTransitionGroup
          transitionName={ this.goLeft ? ("PaintingModalSwitchTransitionLeft") : (this.goRight ? "PaintingModalSwitchTransitionRight" : '')}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          <div key={`PaintingDetail-${id}`} className="PaintingModal__transition-wrapper">
            <PaintingDetail id={id} isInModal={true}/>
          </div>
        </ReactCSSTransitionGroup>
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
      </ReactCSSTransitionGroup>
    );
  }
}
