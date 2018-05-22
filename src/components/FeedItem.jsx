import React from "react";

import { Card, Feed, Image, Label } from "semantic-ui-react";

class FeedItem extends React.Component {
  render() {
    const type = this.props.item.type;
    const estimated_subscribers =
      type === "milestone-subs" ? (
        <Label color="red">{this.props.item.est_subs}</Label>
      ) : (
        ""
      );

    return (
      <Card>
        <Card.Content>
          <i className="right floated like icon"></i>    
          <i className="right floated star icon"></i>
          <Image floated="left" size="tiny" src={this.props.item.thumbnail} />
          <Feed.Event>
            <Feed.Label />
            <Feed.Content>
              <Feed.Summary as="span">{this.props.item.message}</Feed.Summary>
              {estimated_subscribers}
            </Feed.Content>
          </Feed.Event>
        </Card.Content>
      </Card>
    );
  }
}
export default FeedItem;
