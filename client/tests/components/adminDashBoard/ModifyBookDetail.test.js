import React from 'react';

import {
  ModifyBookDetail,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/adminDashBoard/ModifyBookDetail';

import adminData from '../../mocks/userData'

function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    errors: {},
    loading: false,
    updateBook: jest.fn(),
    checkIsbnExist: jest.fn().mockImplementation(() => Promise.resolve(1)),
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    handleBlur: jest.fn(),
    book: {
      id: 3,
      isbn: 526875,
      title: 'The Secret life of Baba Segi\'s wives',
      author: 'Lola Shoneyin',
      description: 'The secret of the lorax features a man selling air',
      image: 'book image',
      quantity: 23,
      updatedAt: '2018-02-20T35:20:01.852Z',
      createdAt: '2018-02-20T35:20:01.852Z'
    }
  };

  const state = {
    title: '',
    author: '',
    publishedYear: '',
    isbn: '',
    quantity: '',
    description: '',
    aboutAuthor: '',
    image: '',
    errors: {},
    isValid: false,
  };

  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'title',
      value: 'title'
    }
  };
  const wrapper = shallow(<ModifyBookDetail {...props} {...state} />);

  return {
    wrapper,
    props,
    state,
    event
  };
}


describe('Modify Book page', () => {
  test('should render with the right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should change state for title', () => {
    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      loading: false,
      updateBook: jest.fn(),
      checkIsbnExist: jest.fn().mockImplementation(() => Promise.resolve(1)),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      handleBlur: jest.fn(),
      book: {}
    };
    const { event, state } = setup();
    const wrapper = shallow(<ModifyBookDetail {...props} /> )
    wrapper.find('#title').simulate('change', event);
    wrapper.instance().handleChange(event)
    expect(wrapper.instance().state.title).toBe('title');
  });

  test('should call handle change', () => {
    const { state } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {
        title: 'another title'
      }
    }
    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      loading: false,
      updateBook: jest.fn(),
      checkIsbnExist: jest.fn().mockImplementation(() => Promise.resolve(1)),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      handleBlur: jest.fn(),
      book: {}
    };
    const wrapper = shallow(<ModifyBookDetail {...props} /> )
    wrapper.setState({
      title: 'another title',
    });
    props.updateBook.mockReset();
    wrapper.instance().handleChange(event)
    expect(wrapper.instance().state.title).toBe('another title');
  });

  test('should call book exist to check if book exists before modifying book', () => {
    const { wrapper, props, state } = setup();
    const handleBlurSpy = jest.spyOn(ModifyBookDetail.prototype, 'handleBlur')
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'isbn',
        value: '9871645327878'
      }
    }
    wrapper.setState({
      isbn: '9871645327878',
      // isbnExist: {
      //   isbn: 'isbn error'
      // }
    });
    wrapper.instance().handleBlur(event)
    expect(wrapper.instance().state.isbn).toBe('9871645327878');
    expect(props.checkIsbnExist).toHaveBeenCalled()
  });


  test('should handle form submission when the form inputs are valid', () => {
    const { state } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {}
    }

    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      loading: false,
      updateBook: jest.fn(),
      checkIsbnExist: jest.fn().mockImplementation(() => Promise.resolve(1)),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      handleBlur: jest.fn(),
      book: {}
    };
    const wrapper = shallow(<ModifyBookDetail {...props} {...state} /> )
    wrapper.setState({
      title: 'title',
      author: 'author'
    });
    props.updateBook.mockReset();
    wrapper.instance().handleSubmit(event)
    expect(wrapper.instance().state.title).toBe('title');
    expect(wrapper.instance().state.author).toBe('author');
    // expect(props.updateBook).toHaveBeenCalled()
  });

  test('should dispatch needed actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).toHaveProperty('checkIsbnExist')
    expect(mapDispatchToProps(dispatch)).toHaveProperty('updateBook')
    const { checkIsbnExist, updateBook } = mapDispatchToProps(dispatch);
    checkIsbnExist();
    updateBook();
    expect(dispatch).toHaveBeenCalled();
  })

  test('should return an object with props required by component from store', () => {
    const store = {
      errors: {},
    };
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('errors');
  });
})