import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Pagination } from 'react-materialize';

import BookListRow from '../adminDashBoard/BookListRow';
import { fetchAllBooks } from '../../actions/bookAction';
import { maxPageLimit } from '../../helpers/utils';

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
      activePage: 1,
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
    //TODO: check the number iin the redux store has reduced and
    if(newProps === this.props) return;
    const { bookCount } = newProps;
    const maxItems = Math.ceil(bookCount / maxPageLimit);
    if (maxItems > 1) {
      this.setState({
        maxItems: maxItems,
        showPagination: true
      })
    }
  }

  /**
   * @returns {void}
   * 
   * @param {any} page 
   * @memberof BookList
   */
  handleSelectedPage(page) {
    this.props.fetchAllBooks(page, maxPageLimit)

  }

  /**
   * 
   * 
   * @returns {object} admin component
   * @memberof BookList
   */
  render () {
    const {  loading, allBooks } = this.props;
    const { showPagination } = this.state;
    return (
      <div id="allbooks">
        { allBooks.length ?
          <div  className="col s12">
            <div className="card-panel">
              <table className="bordered highlight responsive-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Title</th>
                    <th>Author </th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                { allBooks ? allBooks.map((book, index) =>
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
    loading: state.adminReducer.loading,
    bookCount: state.adminReducer.bookCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBooks: (page) => dispatch(fetchAllBooks(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

