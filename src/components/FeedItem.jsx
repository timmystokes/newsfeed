import React from "react";

import { Card, Grid, Icon, Image, Label } from "semantic-ui-react";

const PATTERN = /\B(?=(\d{3})+(?!\d))/g;

class FeedItem extends React.Component {
  render() {
    const type = this.props.item.type;
    const numbersWithCommas = number => number.toString().replace(PATTERN, ",");
    const estimated_subscribers =
      type === "milestone-subs" ? (
        <Card.Description as="span">
          <Label size="tiny" color="blue">
            Estimated 7 Day: {numbersWithCommas(this.props.item.estimated_subscribers_7_days)}
          </Label>
          <Label size="tiny" color="yellow">
            Estimated 30 Day: {numbersWithCommas(this.props.item.estimated_subscribers_30_days)}
          </Label>
          <Label size="tiny" color="green">Estimated Total: {this.props.item.est_subs}</Label>
        </Card.Description>
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
                <Grid.Row columns={1}>
                  <Card.Description as="span">
                    {this.props.item.message}
                  </Card.Description>
                </Grid.Row>
                <Grid.Row columns={1}>{estimated_subscribers}</Grid.Row>
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
