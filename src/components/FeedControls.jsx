import React from "react";
import _ from "lodash";
import { Dropdown, Icon, Menu, Search } from "semantic-ui-react";

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

class FeedControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      value: "",
      results: []
    };
  }

  filterFeedByType = value => {
    this.props.filterFeedByType(value);
  };

  filterFeedByInteraction = value => {
    this.props.filterFeedByInteraction(value);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    this.props.handleSearchChange(value);
  };

  render() {
    const { isLoading, value, results } = this.state;
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
            value={value}
            placeholder="Search by message"
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            onChange={(e, { value }) => this.filterFeedByType(value)}
            selection
            options={typeOptions}
            placeholder="Select type"
          />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item active={likesFiltered}>
            <Icon
              className="star icon"
              color={likesFiltered ? "yellow" : "grey"}
              onClick={e => this.filterFeedByInteraction("likes")}
            />
          </Menu.Item>
          <Menu.Item active={favoritesFiltered}>
            <Icon
              className="heart icon"
              color={favoritesFiltered ? "red" : "grey"}
              onClick={e => this.filterFeedByInteraction("favorites")}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default FeedControls;
