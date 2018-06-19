import React from 'react';

import {
  AddBook,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/adminDashBoard/AddBook'
import userData from '../../mocks/userData';


jest.useFakeTimers();

function setup() {
  const props = {
    dispatch: jest.fn(),
    location: {
      state: {
        from: {}
      }
    },
    isAuthenticated: false,
    saveBook: jest.fn(),
    checkIsbnExist: jest.fn().mockImplementation(() => Promise.resolve(1)),
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    handleBlur: jest.fn(),
    handleFileChange: jest.fn(),
    errors: {}
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
    isbnExist: '',
    saving: false,
    isValid: false,
    userExist: {},
    redirect: false,
    uploadedImage: null
  };
  const wrapper = shallow(<AddBook {...props} {...state} />);

  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'title',
      value: 'title'
    }
  };

  return {
    wrapper,
    props,
    state,
    event
  };
}

describe('Add book component', () => {
  test('should render appropriately', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should change state for title', () => {
    const { wrapper, props, event, state } = setup();
    wrapper.find('.signup').simulate('change', event);
    wrapper.instance().handleChange(event)
    expect(wrapper.instance().state.title).toBe('title');
  });

  test('should call book exist to check if book exists before adding book', () => {
    const { wrapper, props, state } = setup();
    const handleBlurSpy = jest.spyOn(AddBook.prototype, 'handleBlur')
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
      user: userData.admin,
      errors: {},
      loading: false,
      updateBook: jest.fn(),
      checkIsbnExist: jest.fn().mockImplementation(() => Promise.resolve(1)),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      handleBlur: jest.fn(),
      book: {}
    };
    const wrapper = shallow(<AddBook {...props} {...state} /> )
    wrapper.setState({
      title: 'title',
      author: 'author'
    });
    props.updateBook.mockReset();
    wrapper.instance().handleSubmit(event)
    expect(wrapper.instance().state.title).toBe('title');
    expect(wrapper.instance().state.author).toBe('author');
    // expect(props.saveBook).toHaveBeenCalled()
    
  });

  test('should handle image upload', () => {
    const { wrapper, props, state } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {
        files: ['well firts image link',]
      }
    }
    wrapper.setState({
      title: 'title',
      author: 'author',
      publishedYear: '2012',
      isbn: '9874763528198',
      quantity: '9',
      description: 'description',
      aboutAuthor: 'aboutAothor',
      image: '',
      uploadedImage: event.target.files[0],
    });
    props.saveBook.mockReset();
    wrapper.instance().handleFileChange(event)
    expect(wrapper.instance().state.uploadedImage).toBe('well firts image link');
  });

  test('should return an object with props required by component from store', () => {
    const store = {
      errors: {},
      user: {}
    };
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('errors');
  });

  test('should dispatch needed actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).toHaveProperty('checkIsbnExist')
    expect(mapDispatchToProps(dispatch)).toHaveProperty('saveBook')
    const { checkIsbnExist, saveBook } = mapDispatchToProps(dispatch);
    checkIsbnExist();
    saveBook();
    expect(dispatch).toHaveBeenCalled();
  })
})

