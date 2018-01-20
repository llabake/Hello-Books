import React, { Component } from 'react';
import { connect } from 'react-redux'

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
    this.state = {}
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
   * 
   * @returns {object} admin component
   * @memberof BookList
   */
  render () {
    const { allBooks, } = this.props;
    return (
      <div id="allbooks">
        { allBooks.length ? 
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
                { allBooks ? allBooks.map((book, index) => 
                  <BookListRow key={book.id} book={book} index={index} />
                  ) : 
                  null
                }
                </tbody>
              </table>
            </div>
          
          </div> : 
          <div className="card-panel row">
            <p>
              Ooppss!!! You have not added any books to the library at the moment.
            </p>
          </div>
        }
        
      </div>
      
    )
  } 
}

const mapStateToProps = (state) => {
  return {
    allBooks: state.adminReducer.allBooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBooks: () => dispatch(fetchAllBooks())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

