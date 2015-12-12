import React, {Component, PropTypes} from 'react';

export default class CatName extends Component {
  static propTypes = {
    miao: PropTypes.string
  };

  render() {
    return (
      <h1>{this.props.miao}</h1>
    );
  }
}
