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
          <Feed.Event>
            <Feed.Label>
              <Image floated="left" size="mini" src={this.props.item.thumbnail} />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary as="span">
                {this.props.item.message}

                {estimated_subscribers}
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Card.Content>
      </Card>
    );
  }
}
export default FeedItem;
