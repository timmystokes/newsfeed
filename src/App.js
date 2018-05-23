import React, { Component } from "react";
import "./App.css";

import _ from "lodash";
import FeedControls from "./components/FeedControls";
import NewsFeedItemList from "./components/NewsFeedItemList";
import dataFeed from "./data/feed";

import {
  Dimmer,
  Icon,
  Grid,
  Loader,
  Pagination,
  Segment
} from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: {
        items: [],
        filteredItems: [],
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

  /*
  handles all of the filtering functionality like a master controller
  */
  filterItems = () => {
    const { type, query, interactions } = this.state.feed.filters;
    console.log(this.state)

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

    const filteredItems = this.state.feed.items
      .filter(filterInteractions)
      .filter(byType)
      .filter(searchByMessage);

    const feed = Object.assign(this.state.feed, {
      filteredItems: filteredItems,
      filters: this.state.feed.filters,
      interactions: this.state.feed.interactions
    });

    const pagingSettings = this.state.pagingSettings;
    pagingSettings.pages = Math.ceil(
      feed.filteredItems.length / pagingSettings.perPage
    );

    this.setState({ feed, pagingSettings });
    this.getPage(pagingSettings.activePage);
  };


  // sets currently active page, then invokes getPage method to fetch it's pagination data
  handlePaginationChange = (e, { activePage }) => {
    const { pagingSettings } = this.state;
    pagingSettings.activePage = activePage;
    this.setState({ pagingSettings });
    this.getPage(activePage);
  };

  // sets perPage value (from dropdown), then invokes getPage with updated pagination data
  handlePerPageChange = (perPage) => {
    const { pagingSettings } = this.state;
    pagingSettings.perPage = perPage;
    pagingSettings.pages = Math.ceil(dataFeed.total / pagingSettings.perPage);
    this.setState({ pagingSettings });
    this.getPage();
  }

  // grabs data from cached localStorage and sets it to state's feed data
  initializeStoredInteractions = () => {
    const { feed } = this.state;
    const stored = localStorage.getItem("newsFeedInteractions");

    if (typeof stored === "string") {
      feed.interactions = JSON.parse(stored);
      this.setState({ feed });
    }
  };

  // toggles the interactions, i.e. (likes, favorites) filters, then invokes filter method
  toggleInteraction = (item, type) => {
    const state = Object.assign({}, this.state);
    let index = state.feed.interactions[type].indexOf(item.entity_id);

    // remove if already exists (toggle off), otherwise push to interactions lists
    if (index > -1) {
      state.feed.interactions[type].splice(index, 1);
    } else {
      state.feed.interactions[type].push(item.entity_id);
    }

    this.setState({ state });
    this.filterItems();

    localStorage.setItem(
      "newsFeedInteractions",
      JSON.stringify(state.feed.interactions)
    );
  };


  /* 
   sets the applied filters, i.e. interactions (likes, favorites), 
   searching by message, and filtering by feed item type
   sets pagination settings, then invokes filter manager method
   */
  filterBy = (type, value = null) => {
    const { feed, pagingSettings } = this.state;

    if (type === "likes" || type === "favorites") {
      const index = feed.filters.interactions.indexOf(type);
      if (index > -1) {
        feed.filters.interactions.splice(index, 1);
      } else {
        feed.filters.interactions.push(type);
      }
    } else {
      feed.filters[type] = value;
    }

    pagingSettings.activePage = 1;

    this.setState({ feed, pagingSettings });
    this.filterItems();
  };


  // gets the page and changes display items to reflect the current pagination
  getPage(page = 1) {
    let { loading } = this.state;
    const { feed, pagingSettings } = this.state;

    loading = true;
    this.setState({ loading });

    const start = (page - 1) * pagingSettings.perPage;
    const end = start + pagingSettings.perPage;
    feed.displayItems = feed.filteredItems.slice(start, end);
    loading = false;
    setTimeout(() => {
      this.setState({ feed, loading });
    }, 300);
  }

  // gets the feed data and initial paging settings
  mockGetJsonFeed = () => {
    let { feed, pagingSettings } = this.state;

    feed = Object.assign(feed, dataFeed);
    feed.displayItems = [];
    feed.filteredItems = dataFeed.items;
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
              <Grid.Column className="menu-container">
                <FeedControls
                  activeFilters={this.state.feed.filters}
                  filterBy={this.filterBy}
                  handleSearchChange={this.searchByMessage}
                  handlePerPageChange={this.handlePerPageChange}
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
