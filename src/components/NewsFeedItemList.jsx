import React from "react";

import FeedItem from "./FeedItem";

import { Feed, Header, Transition } from "semantic-ui-react";

class NewsFeedItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items.map((item, index) => {
    let component = (
          <FeedItem key={index} item={item} />
    );
      return component;
    });
  return items.length > 0 ? (<Feed> {items} </Feed>) : (<Header as="h1">No items match this filtering criteria</Header>);
  }
}

export default NewsFeedItemList;
