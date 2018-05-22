import React from "react";
import _ from "lodash";
import { Dropdown, Menu, Search } from "semantic-ui-react";

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

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    this.props.handleSearchChange(value);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Menu>
        <Search
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          showNoResults={false}
          value={value}
          placeholder="Search by message"
        />
        <Dropdown
          onChange={(e, { value }) => this.filterFeedByType(value)}          
          fluid
          selection
          options={typeOptions}
          placeholder="Select type"
        />
      </Menu>
    );
  }
}

export default FeedControls;
