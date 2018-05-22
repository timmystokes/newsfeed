import React from "react";

import { Card, Grid, Icon, Image, Label } from "semantic-ui-react";

class FeedItem extends React.Component {
  render() {
    const type = this.props.item.type;
    const estimated_subscribers =
      type === "milestone-subs" ? (
        <Label color="red">{this.props.item.est_subs}</Label>
      ) : (
        ""
      );

    const interactionMenu = this.props.item.id ? (
      <Card.Content extra>
        <Icon
          className="right floated like icon"
          color={this.props.favorited ? "red" : "grey"}
          onClick={e =>
            this.props.handleInteraction(this.props.item, "favorites")
          }
        />
        <Icon
          className="right floated star icon"
          color={this.props.liked ? "yellow" : "grey"}
          onClick={e => this.props.handleInteraction(this.props.item, "likes")}
        />
      </Card.Content>
    ) : (
      ""
    );

    return (
      <Card fluid>
        <Card.Content>
          <Grid>
            <Grid.Row columns={12}>
              <Grid.Column width={2}>
                <Image
                  floated="left"
                  size="tiny"
                  src={this.props.item.thumbnail}
                />
              </Grid.Column>
              <Grid.Column width={12} verticalAlign="middle">
                <Card.Description as="span">
                  {this.props.item.message}
                </Card.Description>

                {estimated_subscribers}
              </Grid.Column>

              <Grid.Column width={2} verticalAlign="middle">
              {interactionMenu}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}
export default FeedItem;
