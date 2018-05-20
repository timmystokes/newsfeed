import React from "react";

import { Feed } from "semantic-ui-react";

class StatsTrendFeedItem extends React.Component {
  render() {
    return (
      <Feed.Event>
        <Feed.Label>
          <img src={this.props.item.thumbnail} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary as="p">
            {this.props.item.message}
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}
export default StatsTrendFeedItem;
