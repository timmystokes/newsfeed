import React from "react";

import { Feed, Label, Image } from "semantic-ui-react";

class SubscribeMilestoneFeedItem extends React.Component {
  render() {
    return (
      <Feed.Event>
        <Feed.Label>
          <Image src={this.props.item.thumbnail} />
          <Label>
                {this.props.item.est_subs}
            </Label>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            {this.props.item.message}

            {/* <Feed.Date>DATE FILTER GOES HERE</Feed.Date> */}
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export default SubscribeMilestoneFeedItem