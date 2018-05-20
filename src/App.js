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

        console.log(this.state.feed.filters);
        const typeFilter = this.state.feed.filters.type;
        const searchFilter = this.state.feed.filters.query;
        const byType = x => x.type === typeFilter;
        const searchByMessage = x => new RegExp(_.escapeRegExp(x), "i").test(x.message);

        console.log("ITEMS BEFORE: ", this.state.feed.items);
        const items = this.state.feed.items
            .filter(byType)
            //.filter(searchByMessage);
        
        console.log("ITEMS AFTER: ", items)

        const feed = Object.assign(this.state.feed, { displayItems: items, filters: this.state.feed.filters });


        this.setState({ feed });
    };


    filterFeedByType = type => {
        const state = Object.assign({}, this.state);
        state.feed.filters.type = type;
        this.setState({ state });
        console.log(this.state.feed.filters)
        this.filterItems();
    };


    searchByMessage = value => {
        // if (this.state.value.length < 1) return this.resetComponent()
        const re = new RegExp(_.escapeRegExp(value), "i");
        const isMatch = result => { console.log(re.test(result.message)); return re.test(result.message) };

        const items = this.state.feed.items.filter(isMatch);
        const feed = Object.assign(this.state.feed, { displayItems: items });

        this.setState({ feed });
    };


    // filterFeedByType = filter => {
    //   const items =
    //     filter === "*"
    //       ? this.state.feed.items
    //       : this.state.feed.items.filter(item => item.type === filter);
    //   const feed = Object.assign(this.state.feed, { displayItems: items });

    //   this.setState({ feed });
    // };



    // searchByMessage = value => {
    //   // if (this.state.value.length < 1) return this.resetComponent()
    //   const re = new RegExp(_.escapeRegExp(value), "i");
    //   const isMatch = result => { console.log(re.test(result.message)); return re.test(result.message)};

    //   const items = this.state.feed.items.filter(isMatch);
    //   const feed = Object.assign(this.state.feed, { displayItems: items });

    //   this.setState({ feed });
    // };

    mockGetJsonFeed = () => {
        const unique = (cur, i, self) => self.indexOf(cur) === i;
        // console.log(dataFeed.items.map(i => i.type).filter(unique));

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