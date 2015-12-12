import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { load as loadPaintings } from 'redux/modules/paintings';
import CatName from './CatName';

@connect(
  state => ({cat: state.cat}),
  {loadPaintings}
)
export default class Cat extends Component {
  static propTypes = {
    cat: PropTypes.array,
    loadPaintings: PropTypes.func
  };

  render() {
    return (
      <div>
        {
          this.props.cat.map((name)=> {
            return <CatName miao={name}/>;
          })
        }
        <button onClick={()=> {
          console.log('clicked');
          this.props.loadPaintings();
        }}> give me new cat </button>
      </div>
    );
  }
}


