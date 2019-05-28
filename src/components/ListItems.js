import React from 'react';
import moment from 'moment';
// import TextTruncate from 'react-text-truncate';
const calendar = require('../images/icon-calendar.png');

class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isRight: true
    };

    this.handleListsToggle = this.handleListsToggle.bind(this);
    this.handleListItemSlide = this.handleListItemSlide.bind(this);
  }
  handleListsToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleClick = (e) => {
    alert(`You have clicked the entire list item with index of ${e.currentTarget.id}.`);
  };

  handleAddItem = () => {
    const openModal = document.getElementsByClassName('listItemModal')[0];
    openModal.classList.toggle('hide');
    // alert('You are adding a list item. (This is going to open a modal window with a form to add a new list item.)');
  };

  handleListItemSlide = (e) => {
    const target = document.getElementsByClassName('list-content')[e.currentTarget.id];
    target.classList.toggle('slide');
  };

  handleListItemDownload = (e) => {
    alert(`You are about to download this list item of index ${e.currentTarget.id}!`);
  };

  handleListItemDelete = (e) => {
    alert(`You are about to delete this list item of index ${e.currentTarget.id}!`);
    const target = document.getElementsByClassName('list-item')[e.currentTarget.id];
    target.classList.add('hide');
  };

  handleLoadMore = () => {
    alert('This button should load more items if there is a constraint on the number of list items showing.');
  };

  handleModalClose = () => {
    const modal = document.getElementsByClassName('listItemModal')[0];
    modal.classList.toggle('hide');
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    alert('The list has been added');
    this.handleModalClose();
  };

  render() {
    const lists = this.props.lists;
    const countLists = this.props.lists.length;
    var isNew = lists.filter((e) => {
      return e.isNew === true;
    });
    return (
      <React.Fragment>
        {/* Lists Header */}
        <div className="lists-container">
          <div className="lists-header">
            <div className="lists-title">
              <h3>List Name</h3>
              <div className="new-lists">
                <span className="total-new">{isNew.length}</span>
              </div>
              <div className="total-lists">Total {countLists}</div>
            </div>
            <div className="header-options">
              <div className="add-list" onClick={this.handleAddItem}>
                <i className="fas fa-plus" />
              </div>
              <div className={this.state.isOpen ? 'toggle-list-items open' : 'toggle-list-items'}>
                <i
                  className={this.state.isOpen ? 'fas fa-caret-down' : 'fas fa-caret-down caret-up'}
                  onClick={this.handleListsToggle}
                />
              </div>
            </div>
          </div>
          {/* List Items */}
          <div className={this.state.isOpen ? 'lists open' : 'lists'}>
            {lists.map((list, index) => (
              <React.Fragment>
                <div className="item-options">
                  <div id={index} className="item-download" onClick={this.handleListItemDownload}>
                    <i className="fas fa-cloud-download-alt" />
                  </div>
                  <div id={index} className="item-delete" onClick={this.handleListItemDelete}>
                    <i className="fas fa-trash-alt" />
                  </div>
                </div>
                <div className={this.state.isRight ? 'list-content' : 'list-content slide'}>
                  <div id={index} className={`list-item ${list.isNew ? 'is-new' : ''}`}>
                    <div id={index} className="avatar" onClick={this.handleClick}>
                      {!this.props.list && list.avatar !== '' ? (
                        <img src={`./../images/${list.avatar}`} alt={list.avatar} />
                      ) : (
                        <img src={require('./../images/avatar-unknown.png')} alt="avatar" />
                      )}
                    </div>
                    <div id={index} className="list-item-content" onClick={this.handleClick}>
                      <div key={index + 1} className="list-title">
                        {list.title}
                      </div>
                      <div key={index + 2} className="list-description">
                        {list.description}
                      </div>
                      <div key={index + 3} className="list-contents">
                        {list.contents}
                      </div>
                      <div key={index + 4} className="created-date">
                        <img src={calendar} alt="calendar icon" />
                        <span className="dateString">{moment(list.publishedDate).format('ddd MMM D YYYY')}</span>
                      </div>
                    </div>
                    <div id={index} className="list-item-options" onClick={this.handleListItemSlide}>
                      <div className="list-options">
                        <i className="fas fa-ellipsis-v" />
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          {/* Lists Footer */}
          <div className="list-footer">
            <button onClick={this.handleLoadMore}>Load more</button>
          </div>
        </div>
        <div className="listItemModal hide">
          <div className="modalContent">
            <button onClick={this.handleModalClose} className="closeBtn">
              X
            </button>
            <div className="modalContentTitle">Add a List</div>
            <div className="addForm">
              <form>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" />
                <label htmlFor="description">Byline</label>
                <input type="text" name="btline" id="description" />
                <label htmlFor="content">Content</label>
                <textarea name="content" id="content" cols="30" rows="4" />
                <label htmlFor="avatar">Icon image</label>
                <input type="text" name="avatar" id="avatar" />
                <input onClick={this.handleFormSubmit} type="submit" value="Add List Item" />
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ListItems;
