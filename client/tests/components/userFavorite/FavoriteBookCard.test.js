import React from 'react';

import {
  FavoriteBookCard,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/userFavorite/FavoriteBookCard';
import adminData from '../../mocks/userData';

function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    handleDelete: jest.fn(),
    removeFromFavorite: jest.fn().mockImplementation(() => Promise.resolve(1)),
    handleSelectedPage: jest.fn(),
    errors: {},
    favoriteBook: {
      "createdAt": "2018-03-14T07:03:45.278Z",
      "book":
        {
          "id": 3,
          "title": "Never eat alone ",
          "description": "Finally we have a real-world guide to how to create your own high-powered network tailored to your career goals and personal style.\"",
          "upVotes": 2,
          "downVotes": 1,
          "image": "book image",
          "reviews": [],
          "favorited": []
        }
    }
  }

  const wrapper = shallow(<FavoriteBookCard {...props} />);

  return {
    wrapper,
    props,
  };
};


describe('Favorite Card', () => {
  test('should render correctely', () => {
    const { wrapper, props } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should handle favorite book delete action', () => {
    const { wrapper, props } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {}
    }
    props.removeFromFavorite.mockReset()
    wrapper.instance().handleDelete(event)
    // expect(props.removeFromFavorite).toHaveBeenCalled()
    // expect(props.handleDelete).toHaveBeenCalled()
  });

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('removeFromFavorite');

    const { removeFromFavorite } = mapDispatchToProps(dispatch);
    removeFromFavorite();
    expect(dispatch).toHaveBeenCalled();
  });


  test('mapStateToProps', () => {
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('errors');
  });
})