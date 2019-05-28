import React from 'react';
import ListItems from './components/ListItems';
import { getListItems } from './services/listService';

class List extends React.Component {
  state = {
    lists: []
  };

  componentDidMount() {
    this.setState({ lists: getListItems() });
  }

  render() {
    return (
      <React.Fragment>
        <ListItems {...this.state} />
      </React.Fragment>
    );
  }
}

export default List;
