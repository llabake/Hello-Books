import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Pagination } from 'react-materialize';

import { fetchSuggestedBooks } from '../../actions/adminAction';
import { maxPageLimit } from '../../helpers/utils';
import TableRowNotFound from '../common/TableRowNotFound';
import Loader from '../common/Loader';

/**
 *
 * @class RequestedBooks
 * 
 * @extends {Component}
 */
class RequestedBooks extends Component {
  /**
   *Creates an instance of RequestedBooks.
   * @param {any} props
   * 
   * @memberof RequestedBooks
   */
  constructor(props) {
    super(props);
    this.state = {
      maxItems: 2,
      showPagination: false,
      activePage: 1,
    }

    this.handleSelectedPage = this.handleSelectedPage.bind(this);
  }

  /**
   *
   * @memberof RequestedBooks
   * 
   * @returns {Array} a list of suggested books by users 
   */
  componentDidMount() {
    this.props.fetchSuggestedBooks();
  }

  /**
   *
   * @param {any} nextProps
   * 
   * @returns {Array} paginated set of suggested books
   * 
   * @memberof RequestedBooks
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps === this.props) return;
    const { suggestedBookCount, suggestedBooks } = nextProps
    const maxItems = Math.ceil(suggestedBookCount / maxPageLimit);
    if (maxItems > 1) {
      this.setState({
        maxItems: maxItems,
        showPagination: true
      })
    } else {
      this.setState({
        showPagination: false
      })
    }

    if (suggestedBookCount && !suggestedBooks.length && this.state.activePage > 1) {
      this.handleSelectedPage(this.state.activePage - 1)
    }
  }

  /**
   *
   * @param {any} page
   * 
   * @returns {void}
   * 
   * @memberof RequestedBooks
   */
  handleSelectedPage(page) {
    this.props.fetchSuggestedBooks(page, maxPageLimit);
    this.setState({
      activePage: page
    });
  }

  /**
   *
   * @returns {JSX}  Suggested Books
   * 
   * @memberof RequestedBooks
   */
  render() {
    const { suggestedBooks, suggestedBookCount, loading } = this.props;
    const { showPagination, activePage } = this.state;
    return (
      <div className="col s12 m3  profile-bio">
        <div className="card-panel">
          <table className="bordered centered highlight responsive-table">
            <thead>
              <tr>
                <th id='title'>Requested Books</th>
              </tr>
            </thead>
          </table>
          {
            loading ? <Loader /> :
              <table className="bordered centered highlight responsive-table">
                <tbody>
                  {
                    !suggestedBookCount ?
                      <TableRowNotFound
                        text={'There are no suggested books'}
                      /> :
                      suggestedBooks && suggestedBooks.length ?
                        suggestedBooks.map((suggestion) =>
                          <tr key={suggestion.id}>
                            <td>
                              <a>{suggestion.title}
                                <span
                                  className="new badge"
                                  style={{ backgroundColor: "#8c4e4e" }}
                                  data-badge-caption={suggestion.author}>
                                </span>
                              </a>
                            </td>
                          </tr>) : null
                  }
                </tbody>
              </table>
          }
          {showPagination ?
            <Pagination
              className={'center-align'}
              items={this.state.maxItems}
              activePage={activePage} maxButtons={4}
              onSelect={this.handleSelectedPage}
            /> :
            null}
        </div>
      </div>
    )
  }
}

RequestedBooks.propTypes = {
  loading: PropTypes.bool,
  suggestedBookCount: PropTypes.number,
  suggestedBooks: PropTypes.array,
  fetchSuggestedBooks: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    suggestedBooks: state.adminReducer.suggestedBooks,
    suggestedBookCount: state.adminReducer.suggestedBookCount,
    loading: state.adminReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSuggestedBooks: (page) => dispatch(fetchSuggestedBooks(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestedBooks);

