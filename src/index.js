import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
// Create a new Component, This Component should produce
//some HTML
const API_KEY = 'AIzaSyBc3lYFmiHnSiGINYxE-WIqM5ctmKVp508';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        videos: [],
        selectedVideo: null
     };
     this.videoSearch('surfboards');

      //this.setState({ videos : videos});
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos : videos,
        selectedVideo : videos[0]
      });
    });
  }

  render () {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange = {videoSearch}/>
        <VideoDetail video = {this.state.selectedVideo}/>
        <VideoList
          onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
          videos = {this.state.videos} />
      </div>
    );
  }
}

//Take this component's generated HTML and put it
//on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
