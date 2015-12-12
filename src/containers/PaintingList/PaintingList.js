import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { load as loadPaintings } from 'redux/modules/paintings';

@connect(
  state => ({
    profiles: state.profiles,
    paintings: state.paintings
  }),
  {loadPaintings}
)
export default class PaintingList extends Component {
  static propTypes = {
    profiles: PropTypes.object,
    paintings: PropTypes.object,
    loadPaintings: PropTypes.func
  };

  componentWillMount() {
    this.props.loadPaintings();
  }

  render() {
    const styles = require('./PaintingList.scss');
    const {paintings} = this.props;
    const meta = paintings._meta;
    const paintingIds = meta.result;
    return (<div className={styles.paintingList}>
      {
        paintingIds.map((id)=> {
          const painting = paintings[id];
          return (
              <div className={styles.painting}>
                <img src={painting.attachment.url} alt=""/>
                <h2>{painting.title}</h2>
              </div>
            );
        })
      }
    </div>);
  }
}
