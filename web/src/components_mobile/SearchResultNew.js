import React, {Component, PropTypes} from "react";
import {Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import {connect} from "react-redux";
import {logSearch} from "../redux/modules/containers_mobile/searchInfo";
import {doSearch, initSearch} from "../redux/modules/containers_mobile/searchResult";
import lodash from "lodash";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ResultListView from "./ResultListView";


class SearchResultNew extends Component {

  static propTypes = {
    logSearch: PropTypes.func,
  };

  componentWillMount() {
    console.log('props',this.props.navigator);
  }

  componentWillUnmount(){
    this.props.initSearch();
    console.log('unmount');
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
    this.props.initSearch();
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
    const initialPage = resultGroups.Painting ? 0 :(resultGroups.PaintingTag? 1: 2 );
    console.log(resultGroups);
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput style={styles.input} placeholder='搜索' onChangeText={this.handleLogSearch.bind(this)}/>
          <TouchableHighlight onPress={this.handleCancel.bind(this)}>
            <Text style={styles.cancel}>取消</Text>
          </TouchableHighlight>
        </View>
        {count == null ? <View/>:
        count == 0 ?
          <View style={styles.resultContainer}>
            <Text style={styles.noResult}>还没有相关的画作、标签、用户</Text>
          </View> :
          <View style={styles.resultContainer}>
            <ScrollableTabView
              tabBarTextStyle={{fontSize: 14}}
              tabBarInactiveTextColor={'#8F8E94'}
              tabBarActiveTextColor={'#05AD97'}
              tabBarUnderlineStyle ={{backgroundColor:'#05AD97'}}
              style={{
                flex:1,
                borderTopWidth: 0.5,
                borderTopColor: '#C7C7CD',
              }}
              initialPage={initialPage}
            >
              <ResultListView component={resultGroups.Painting?resultGroups.Painting:[]} type="painting" navigator={this.props.navigator} tabLabel="画作"/>
              <ResultListView component={resultGroups.PaintingTag?resultGroups.PaintingTag:[]} type="tag" navigator={this.props.navigator} tabLabel="标签"/>
              <ResultListView component={resultGroups.Profile?resultGroups.Profile:[]} type="owner" navigator={this.props.navigator} tabLabel="用户"/>
            </ScrollableTabView>
          </View>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1
  },
  search: {
    flexDirection: 'row',
    marginTop: 25,
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
    flex:1,
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
  noResult: {
    marginTop: 15,
    marginLeft:10,
    color:'#8F8E94'
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
    doSearch,
    initSearch
  })(SearchResultNew);
