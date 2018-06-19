import React from 'react';

import {
  SingleBook,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/main/SingleBook';
import NotFound from '../../../components/NotFound'
import Loader from '../../../components/common/Loader'
import ReviewArea from '../../../components/main/ReviewArea'
import AllBookReviews from '../../../components/main/AllBookReviews'

import adminData from '../../mocks/userData';
import userData from '../../mocks/userData';
import { bookAfterReviewAction } from '../../mocks/bookData'


function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    handleAddFavorite: jest.fn(),
    handleUpvote: jest.fn(),
    handleDownvote: jest.fn().mockImplementation(() => Promise.resolve(1)),
    handleShowAllReview: jest.fn(),
    handleBorrow: jest.fn(),
    handleShowAboutTheAuthor: jest.fn(),
    handleShowOverview: jest.fn(),
    fetchSingleBook: jest.fn(),
    favoriteABook: jest.fn(),
    upVoteBook: jest.fn(),
    downVoteBook: jest.fn().mockImplementation(() => Promise.resolve(1)),
    showReviewTextArea: jest.fn(),
    showAllReviews: jest.fn(),
    borrowBook: jest.fn(),
    errors: {},
    book: bookAfterReviewAction,
    match: {
      params: {
        bookId: 2
      }
    }
  };

  const state = {
    redirect: false,
    favorited: false,
    upvoted: false,
    downvoted: false,
    reviewed: false,
    showAboutTheAuthor: true,
    showOverview: false
  };
  const wrapper = shallow(<SingleBook {...props} {...state} />);

  return {
    wrapper,
    props,
    state,
  };
}

describe('Single Book page', () => {
  test('should render and not crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should render a preloader', () => {
    const { wrapper } = setup();
    wrapper.setProps({ book: {}, loading: true });
    expect(wrapper.find(Loader).length).toBe(1)  
  });

  test('should render a load text area', () => {
    const { wrapper, props } = setup();
    wrapper.setProps({ loadTextArea: true });
    expect(wrapper.find(ReviewArea).length).toBe(1)

    // wrapper.instance().scrollIntoView();
    // const event = {
    //   preventDefault: jest.fn(),
    //   target: {}
    // }
    // const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    // wrapper.instance().handleShowReviewTextArea(event);
    // wrapper.instance.showReviewTextArea()
    // expect(dispatchSpy).toHaveBeenCalledTimes();
  });

  test('should render all book review load text area', () => {
    const { wrapper, props } = setup();
    wrapper.setProps({ loadAllReview: true });
    expect(wrapper.find(AllBookReviews).length).toBe(1)  
    // const event = {
    //   preventDefault: jest.fn(),
    //   target: {}
    // }
    // const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    // wrapper.instance().handleShowAllReview(event);
    // wrapper.instance.showAllReviews()
    // expect(dispatchSpy).toHaveBeenCalledTimes();
  });

  test('should render not found component', () => {
    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      loading: false,
      book: {},
      match: {
        params: {
          bookId: 22
        }
      },
      resourceNotFound: true,
      fetchSingleBook: jest.fn(() => Promise.resolve(1)),
    }

    const wrapper = shallow(<SingleBook {...props}  />);
    expect(wrapper.find(NotFound).length).toBe(1)

  })

  test('should call component did mount', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });
    spy = jest.spyOn(SingleBook.prototype, 'componentDidMount')
    const { wrapper, props } = setup();
    expect(wrapper).toBeDefined();
    expect(SingleBook.prototype.componentDidMount).toHaveBeenCalledTimes(1)
  })
  
  // test('should dispatch an action to upvote for book when the method is called', () => {
  //   const { wrapper, props, state  } = setup();
  //   const event = {
  //     preventDefault: jest.fn(),
  //     target: {}
  //   }
  //   const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
  //   wrapper.instance().handleUpvote(event);
  //   wrapper.instance.upVoteBook(2)
  //   // expect(dispatchSpy).toHaveBeenCalledTimes();

  //   // props.upVoteBook.mockReset();
  //   // wrapper.instance().handleUpvote(event)
  //   // expect(props.upVoteBook).toHaveBeenCalled()
  // });

  // test('should dispatch an action to downvote for book when the method is called', () => {
  //   const { wrapper, props } = setup();
  //   const event = {
  //     preventDefault: jest.fn(),
  //     target: {}
  //   }
  //   // const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
  //   // wrapper.instance().handleDownvote(event);
  //   // wrapper.instance.downVoteBook(2)
  //   // expect(dispatchSpy).toHaveBeenCalledTimes();

  //   props.downVoteBook.mockReset();
  //   wrapper.instance().handleDownvote(event)
  //   expect(props.downVoteBook).toHaveBeenCalled()
  // });


  test('should dispatch an action to favorite a book when the method is called', () => {
    const { wrapper , props } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {}
    }
    props.favoriteABook.mockReset();
    wrapper.instance().handleAddFavorite(event)
    expect(props.favoriteABook).toHaveBeenCalled()
  });


  // test('should dispatch an action to borrow a book when the method is called', () => {
  //   const { wrapper } = setup();

  //   const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
  //   wrapper.instance().handleBorrow();
  //   wrapper.instance.borrowBook(2)
  //   // expect(dispatchSpy).toHaveBeenCalledTimes();


  // //   const handleBorrow =
  // //   jest.spyOn(wrapper.instance(), 'handleBorrow');
  // //   handleBorrow();
  // // wrapper.find('.btn').simulate('click');
  // // expect(wrapper.instance().handleBorrow).toHaveBeenCalled();
  // });

  test('should display about the author tab', () => {
    const { wrapper, props, state } = setup();
    wrapper.setState({
      showAboutTheAuthor: true,
      showOverview: false
    });
    props.handleShowAboutTheAuthor.mockReset();
    wrapper.instance().handleShowAboutTheAuthor()
    expect(wrapper.instance().state.showAboutTheAuthor).toBe(true);
    expect(wrapper.instance().state.showOverview).toBe(false);
  })

  test('should display overview tab', () => {
    const { wrapper, props, state } = setup();
    wrapper.setState({
      showAboutTheAuthor: false,
      showOverview: true
    });
    props.handleShowOverview.mockReset();
    wrapper.instance().handleShowOverview()
    expect(wrapper.instance().state.showAboutTheAuthor).toBe(false);
    expect(wrapper.instance().state.showOverview).toBe(true);
  })

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('fetchSingleBook');

    const {
      fetchSingleBook,
      favoriteABook,
      upVoteBook,
      downVoteBook,
      showReviewTextArea,
      showAllReviews,
      borrowBook
    } = mapDispatchToProps(dispatch);
    fetchSingleBook();
    favoriteABook();
    upVoteBook();
    downVoteBook();
    showReviewTextArea();
    showAllReviews();
    borrowBook();
    expect(dispatch).toHaveBeenCalled();
  });

  test('mapStateToProps', () => {


    const storeState = {
      userReducer: {
        authUser: {},
        authenticated: false
      },
      bookReducer: {
        book: {}
      },
    };
  
    expect(mapStateToProps(storeState).user).toEqual({});
    expect(mapStateToProps(storeState).book).toEqual({});
    // expect(mapStateToProps({ bookReducer: {} })).toHaveProperty('book');
    // expect(mapStateToProps({ bookReducer: {} })).toHaveProperty('loading');
    // expect(mapStateToProps({ bookReducer: {} })).toHaveProperty('loadTextArea');
    // expect(mapStateToProps({ bookReducer: {} })).toHaveProperty('loadAllReview');
    // expect(mapStateToProps({ bookReducer: {} })).toHaveProperty('resourceNotFound');
    // expect(mapStateToProps({ userReducer: {} })).toHaveProperty('user');
    // expect(mapStateToProps({ userReducer: {} })).toHaveProperty('authenticated');
  });




})