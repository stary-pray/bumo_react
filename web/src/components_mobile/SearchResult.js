import React, {Component, PropTypes} from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import {connect} from "react-redux";
import {logSearch} from "../redux/modules/containers_mobile/searchInfo";
import {doSearch} from "../redux/modules/containers_mobile/searchResult";
import lodash from "lodash";


class SearchResult extends Component {

  static propTypes = {
    logSearch: PropTypes.func
  };

  componentWillMount() {
  }

  constructor() {
    super();
    this.debounceDoSearch = lodash.debounce((value)=> {
      if (value) {
        this.props.doSearch(value);
      }
    }, 1500);
  }

  handleLogSearch(searchResult) {
    this.props.logSearch(searchResult);
    this.debounceDoSearch(searchResult);
  }

  handleCancel() {
    this.props.navigator.pop({
      animated: true
    })
  }

  render() {
    const {component} = this.props;
    const {isSearching, results, count} = component;
    const resultGroups = lodash.groupBy(results, 'modelType');
    const windowWidth = Dimensions.get('window').width;

    console.log(resultGroups);
    return (
      <View>
        <View style={styles.search}>
          <TextInput style={styles.input} placeholder='搜索' onChangeText={this.handleLogSearch.bind(this)}/>
          <TouchableHighlight onPress={this.handleCancel.bind(this)}>
            <Text style={styles.cancel}>取消</Text>
          </TouchableHighlight>
        </View>

        {count == 0 ?
          <View style={styles.resultContainer}>
            <Text style={styles.result}>还没有相关结果</Text>
          </View> :
          <View style={styles.resultContainer}>
            {resultGroups.PaintingTag &&
            <View>
              <Text style={styles.label}>标签</Text>
              <ScrollView style={styles.scrollView} horizontal={true}>
                {resultGroups.PaintingTag.map((tag)=><View>
                  <Text style={styles.result}>{tag.name} : {tag.type}</Text>
                </View>)}
              </ScrollView>
            </View>}
            {resultGroups.Painting &&
            <View>
              <Text style={styles.label}>画作</Text>
              <ScrollView style={styles.scrollView} horizontal={true}>

                {resultGroups.Painting.map((painting)=>
                  <View key={painting.id} style={styles.result}>
                  <Image style={{width: windowWidth/3, height:windowWidth/3, marginTop:10, marginRight:10, paddingRight:5}}
                         resizeMode={Image.resizeMode.cover}
                         source={{uri: `https://o4dv415rs.qnssl.com/${painting.attachment}?imageMogr2/thumbnail/${windowWidth}x/interlace/1`}}/>
                </View>)}
              </ScrollView>
            </View>}
            {resultGroups.Profile &&
            <View>
              <Text style={styles.label}>用户</Text>
              <ScrollView style={styles.scrollView} horizontal={true}>
                {resultGroups.Profile.map((profile)=><View>
                  <Text style={styles.result}>{profile.nickname}</Text>
                </View>)}
              </ScrollView>
            </View>}
          </View>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    marginTop: 10,
    height: 30,
    alignItems: 'center'
  },
  input: {
    marginLeft: 7.5,
    marginRight: 7.5,
    borderRadius: 5,
    backgroundColor: 'rgba(3,3,3,0.09)',
    flex: 5
  },
  cancel: {
    flex: 1,
    color: '#8F8E94',
    alignSelf: "center",
    margin: 5
  },
  resultContainer: {
    marginTop:10,
    borderTopWidth: 1,
    borderColor: '#C7C7CD',
  },
  label: {
    backgroundColor: 'rgba(3,3,3,0.09)',
    fontSize: 15,
    color: '#8F8E94',
    padding: 5,
    shadowColor: '#8F8E94',
    shadowOffset: {x: 0, y: 5},
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  result: {

  },

  scrollView: {
    height:Dimensions.get('window').width/2.5
  }
});
export default connect(
  (state, ownProps) =>
    ({component: state.containers.searchResult,}),
  {
    logSearch,
    doSearch
  })(SearchResult);
