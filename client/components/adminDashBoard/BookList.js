import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
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

            {/* <!-- Modal Trigger -->
                <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a> */}

            {/* <!-- Modal Structure --> */}
            {/* <div id="edit-book-modal" class="modal modal-fixed-footer">
              <div class="modal-content">
                <h4>Edit Book</h4>
                <p>A bunch of text</p>
              </div>
              <div class="modal-footer">
                <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
              </div>
            </div> */}
          
          </div> : 
          <div className="card-panel row">
            <p>
              Ooppss!!! You have not added any books to the library at the moment.
            </p>
          </div>
        }
         { this.state.editing ? <Modal id='edit-book-modal'>
             <ModifyBookDetail book={bookToEdit} />
           </Modal >: null 
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

