import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Pagination } from 'react-materialize';

import BookListRow from '../adminDashBoard/BookListRow';
import { fetchAllBooks } from '../../actions/bookAction';

/**
 * 
 * 
 * @class BookList
 * @extends {Component}
 */
class BookList extends Component {

  /**
   * Creates an instance of BookList.
   * @param {any} props 
   * @memberof BookList
   */
  constructor(props) {
    super(props);
    this.state = {
      maxItems: 2,
      showPagination: false,
      displayedBooks: [],
      activePage: 1,
      maxItemsPerPage: 8,
    }

    this.handleSelectedPage = this.handleSelectedPage.bind(this)

  }


  /**
   * @returns {Array} response containing all books 
   * 
   * @memberof BookList
   */
  componentDidMount() {
    this.props.fetchAllBooks();
  }

  /**
   * 
   * @param {any} newProps 
   * @returns {Array} response containing all books 
   * @memberof BookList
   */
  componentWillReceiveProps(newProps) {
    if(newProps === this.props) return;
    const { allBooks } = newProps;
    const noOfBooks = allBooks.length;
    const maxItems = Math.ceil(noOfBooks / this.state.maxItemsPerPage);
    this.setDisplayedBooks(allBooks);
    if (maxItems > 1) {
      this.setState({
        maxItems: maxItems,
        showPagination: true
      })
    }
  }

  /**
   * 
   * @returns {Array} an array of books to be displayed on each page
   * @param {any} allBooks 
   * @memberof BookList
   */
  setDisplayedBooks(allBooks) {
    const displayedBooks = allBooks.slice((this.state.activePage - 1) *
    this.state.maxItemsPerPage,
    (this.state.activePage) * this.state.maxItemsPerPage);
    this.setState({
      displayedBooks
    })
  }



  /**
   * @returns {void}
   * 
   * @param {any} activePage 
   * @memberof BookList
   */
  handleSelectedPage(activePage) {
    this.setState({
      activePage
    }, () => this.setDisplayedBooks(this.props.allBooks))

  }

  /**
   * 
   * 
   * @returns {object} admin component
   * @memberof BookList
   */
  render () {
    const {  loading, allBooks } = this.props;
    const { showPagination, displayedBooks } = this.state;
    return (
      <div id="allbooks">
        { displayedBooks.length ?
          <div  className="col s12">
            <div className="card-panel responsive-table">
              <table className="bordered centered highlight ">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Book ID</th>
                    <th>Title</th>
                    <th>Author </th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                { displayedBooks ? displayedBooks.map((book, index) =>
                  <BookListRow key={book.id} book={book} index={index} />
                  ) : 
                  null
                }
                </tbody>
              </table>
              { showPagination ?
                <Pagination
                  className={'center-align'}
                  items={this.state.maxItems}
                  activePage={1} maxButtons={4}
                  onSelect={this.handleSelectedPage}
                /> :
                null }
            </div>

          </div> :
         !loading && !allBooks.length ?
          <div className="card-panel row center-align" >
            <p>
              Ooppss!!! You have not added any books to the library at the moment.
            </p>
          </div> : null
        }
        
      </div>
      
    )
  } 
}

const mapStateToProps = (state) => {
  return {
    allBooks: state.adminReducer.allBooks,
    loading: state.adminReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBooks: () => dispatch(fetchAllBooks())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

