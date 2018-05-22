import React, { Component } from "react";
import "./App.css";

import _ from "lodash";
import FeedControls from "./components/FeedControls";
import NewsFeedItemList from "./components/NewsFeedItemList";
import Pagination from "./components/Pagination";

import dataFeed from "./data/feed";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feed: {
                items: [],
                displayItems: [],
                filters: {
                    type: "*",
                    query: ""
                }
            }
        };
    }

    componentDidMount() {
        this.mockGetJsonFeed();
    }

    filterItems = () => {

        const { type, query } = this.state.feed.filters;
        
        // if type is "*" don't filter, otherwise filter to match types
        const byType = item => type === '*' ? item : item.type === type;            
        const searchByMessage = item => new RegExp(_.escapeRegExp(query), "i").test(item.message);

        const items = this.state.feed.items
            .filter(byType)
            .filter(searchByMessage);
        
        const feed = Object.assign(this.state.feed, { displayItems: items, filters: this.state.feed.filters });

        this.setState({ feed });
    };


    filterFeedByType = type => {
        const state = Object.assign({}, this.state);
        state.feed.filters.type = type;
        this.setState({ state });
        this.filterItems();
    };


    searchByMessage = query => {
        const state = Object.assign({}, this.state);
        state.feed.filters.query = query;
        this.setState({ state });
        this.filterItems();
    };

    mockGetJsonFeed = () => {
        // this method simulates a 300ms AJAX call to fetch the feed data

        const feed = Object.assign(dataFeed, { displayItems: dataFeed.items, filters: this.state.feed.filters });
        
        setTimeout(() => {
            this.setState({ feed });
        }, 300);
    };

    render() {
      return (
        <div className="App">
          <FeedControls
            filterFeedByType={this.filterFeedByType}
            handleSearchChange={this.searchByMessage}
          />
          <NewsFeedItemList items={this.state.feed.displayItems} />
          <Pagination />
        </div>
      );
    }
}

export default App;