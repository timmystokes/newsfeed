import React from "react";
import _ from "lodash";
import { Dropdown, Icon, Menu, Search } from "semantic-ui-react";

// I could minify/fold this, or store it externally, but I don't think it's too clunky for now
// As this newfeed scaled up though, and more types became apparent, we would store this collection externally
const typeOptions = [
  {
    value: "*",
    text: "All"
  },
  {
    value: "milestone-subs",
    text: "Subscriber Milestones"
  },
  {
    value: "stats-trend",
    text: "Stats Trend"
  },
  {
    value: "trending-video",
    text: "Trending Video"
  },
  {
    value: "channel-overlap",
    text: "Channel Overlap"
  },
  {
    value: "delta-subs",
    text: "Delta Subs"
  },
  {
    value: "video-objects",
    text: "Video Objects"
  },
  {
    value: "video-topics",
    text: "Video Topics"
  },
  {
    value: "channel-new",
    text: "Channel New"
  }
];

const perPageOptions = [
  {
    value: 5,
    text: "5 items per page"
  },
  {
    value: 10,
    text: "10 items per page"
  },  {
    value: 15,
    text: "15 items per page"
  },  {
    value: 20,
    text: "20 items per page"
  },
];

class FeedControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      value: "",
      results: []
    };
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    this.props.filterBy("query", value);
  };

  render() {
    const favoritesFiltered =
      this.props.activeFilters.interactions.indexOf("favorites") > -1;
    const likesFiltered =
      this.props.activeFilters.interactions.indexOf("likes") > -1;
    return (
      <Menu stackable>
        <Menu.Item>
          <Search
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            showNoResults={false}
            placeholder="Search by message"
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            onChange={(e, { value }) => this.props.filterBy("type", value)}
            selection
            options={typeOptions}
            placeholder="Select type"
            size="huge"
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            onChange={(e, { value }) => this.props.handlePerPageChange(value)}
            selection
            options={perPageOptions}
            placeholder="Select items per page"
            size="huge"
          />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item active={likesFiltered}>
            <Icon
              className="star icon"
              color={likesFiltered ? "yellow" : "grey"}
              onClick={e => this.props.filterBy("likes")}
            />
          </Menu.Item>
          <Menu.Item active={favoritesFiltered}>
            <Icon
              className="heart icon"
              color={favoritesFiltered ? "red" : "grey"}
              onClick={e => this.props.filterBy("favorites")}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default FeedControls;
