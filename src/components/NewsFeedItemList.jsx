import React from "react";

import FeedItem from "./FeedItem";

import { Card, Header, Grid } from "semantic-ui-react";

class NewsFeedItemList extends React.Component {
  render() {
    const items = this.props.items.map((item, index) => {
      const liked = this.props.interactions.likes.indexOf(item.entity_id) > -1;
      const favorited =
        this.props.interactions.favorites.indexOf(item.entity_id) > -1;
      let component = (
        <Grid.Row columns={12} key={index}>
          <Grid.Column>
            <FeedItem
              key={index}
              item={item}
              handleInteraction={this.props.handleInteraction}
              liked={liked}
              favorited={favorited}
            />
          </Grid.Column>
        </Grid.Row>
      );
      return component;
    });
    return items.length > 0 ? (
      <Card.Group> {items} </Card.Group>
    ) : (
      <Header as="h1">No items match this filtering criteria</Header>
    );
  }
}

export default NewsFeedItemList;
