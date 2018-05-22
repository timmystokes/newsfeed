import React, { Component } from "react";
import "./App.css";

import _ from "lodash";
import FeedControls from "./components/FeedControls";
import NewsFeedItemList from "./components/NewsFeedItemList";

import {
  Dimmer,
  Icon,
  Grid,
  Loader,
  Pagination,
  Segment
} from "semantic-ui-react";

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
          query: "",
          interactions: []
        },
        interactions: {
          favorites: [],
          likes: []
        }
      },
      pagingSettings: {
        perPage: 5,
        activePage: 1,
        pages: 1
      },
      loading: true
    };
  }

  componentWillMount() {
    this.initializeStoredInteractions();
    this.mockGetJsonFeed();
  }
  componentDidMount() {
    this.getPage();
  }

  filterItems = () => {
    const { type, query, interactions } = this.state.feed.filters;

    // if type is "*" don't filter, otherwise filter to match types
    const byType = item => (type === "*" ? item : item.type === type);
    const searchByMessage = item =>
      new RegExp(_.escapeRegExp(query), "i").test(item.message);

    const filterInteractions = x => {
      if (interactions.length < 1) return true;
      let results = interactions.map(
        interaction =>
          this.state.feed.interactions[interaction].indexOf(x.entity_id) > -1
      );
      return results.every(result => result);
    };

    const items = this.state.feed.items
      .filter(filterInteractions)
      .filter(byType)
      .filter(searchByMessage);

    const feed = Object.assign(this.state.feed, {
      displayItems: items,
      filters: this.state.feed.filters,
      interactions: this.state.feed.interactions
    });

    const pagingSettings = this.state.pagingSettings;
    pagingSettings.pages = Math.ceil(feed.displayItems.length / pagingSettings.perPage);

    this.setState({ feed, pagingSettings });
  };

  handlePaginationChange = (e, { activePage }) => {
    const pagingSettings = Object.assign({}, this.state.pagingSettings);
    pagingSettings.activePage = activePage;
    this.setState({ pagingSettings });
    this.getPage(activePage);
  };

  initializeStoredInteractions = () => {
    const feed = Object.assign({}, this.state.feed);

    const stored = localStorage.getItem("newsFeedInteractions");
    if (typeof stored === "string") {
      feed.interactions = JSON.parse(stored);
      this.setState({ feed });
    }
  };

  toggleInteraction = (item, type) => {
    const state = Object.assign({}, this.state);
    let index = state.feed.interactions[type].indexOf(item.entity_id);

    if (index > -1) {
      state.feed.interactions[type].splice(index, 1);
    } else {
      state.feed.interactions[type].push(item.entity_id);
    }

    this.setState({ state });

    this.filterItems();

    // cache like and favorite settings in browser's localStorage
    localStorage.setItem(
      "newsFeedInteractions",
      JSON.stringify(state.feed.interactions)
    );
  };

  filterFeedByInteraction = type => {
    const feed = Object.assign({}, this.state.feed);
    let index = feed.filters.interactions.indexOf(type);

    if (index > -1) {
      feed.filters.interactions.splice(index, 1);
    } else {
      feed.filters.interactions.push(type);
    }
    this.setState({ feed });
    this.filterItems();
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

  getPage(page = 1) {
    let { loading } = this.state;
    const { feed, pagingSettings } = this.state;

    loading = true;
    this.setState({ loading });
    
    const start = (page - 1) * pagingSettings.perPage;
    const end = start + pagingSettings.perPage;
    feed.displayItems = feed.items.slice(start, end);
    console.log(feed.displayItems);
    loading = false;
    setTimeout(() => {
      this.setState({ feed, loading });
    }, 300);
  }

  mockGetJsonFeed = () => {
    const pagingSettings = this.state.pagingSettings;
    const feed = Object.assign(dataFeed, {
      displayItems: dataFeed.items,
      filters: this.state.feed.filters,
      interactions: this.state.feed.interactions
    });
    pagingSettings.pages = Math.ceil(feed.total / pagingSettings.perPage);
    this.setState({ feed, pagingSettings });
  };

  render() {
    const { activePage, pages } = this.state.pagingSettings;
    const { loading } = this.state;

    return (
      <div className="App">
        <Dimmer.Dimmable as={Segment} dimmed={loading}>
          <Dimmer active={loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>

          <Grid container padded="vertically" divided="vertically">
            <Grid.Row columns={1}>
              <Grid.Column>
                <FeedControls
                  activeFilters={this.state.feed.filters}
                  filterFeedByType={this.filterFeedByType}
                  filterFeedByInteraction={this.filterFeedByInteraction}
                  handleSearchChange={this.searchByMessage}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid
            className="feed-grid"
            padded="vertically"
            container
            divided="vertically"
          >
            <NewsFeedItemList
              interactions={this.state.feed.interactions}
              items={this.state.feed.displayItems}
              handleInteraction={this.toggleInteraction}
            />
          </Grid>

          <Grid container padded="vertically">
            <Grid.Row columns={1}>
              <Pagination
                activePage={activePage}
                onPageChange={this.handlePaginationChange}
                ellipsisItem={{
                  content: <Icon name="ellipsis horizontal" />,
                  icon: true
                }}
                firstItem={{
                  content: <Icon name="angle double left" />,
                  icon: true
                }}
                lastItem={{
                  content: <Icon name="angle double right" />,
                  icon: true
                }}
                prevItem={{ content: <Icon name="angle left" />, icon: true }}
                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                totalPages={pages}
              />
            </Grid.Row>
          </Grid>
        </Dimmer.Dimmable>
      </div>
    );
  }
}

export default App;
