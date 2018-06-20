// import React from 'react'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// import { MemoryRouter } from 'react-router-dom'

// import reducer from '../../../reducers'
// import { Header } from '../../../components/common/Header'

// test('The header component mounts correctly if all props it needs are passed into it.', () => {
//   const props = {
//     authenticated: false,
//     user: {},
//     errors: {}
//   }

//   const store = createStore(reducer)
//   const wrapper = mount(
//     <Provider store={store}>
//       <MemoryRouter>
//         <Header {...props} />
//       </MemoryRouter>
//     </Provider>)
// })

import React from 'react'
import { NavLink } from 'react-router-dom'
import { Header, mapStateToProps, mapDispatchToProps} from '../../../components/common/Header'
import userData from '../../mocks/userData'

test('The header component mounts correctly if all props it needs are passed into it.', () => {
  const props = {
    authenticated: false,
    user: {},
    errors: {}
  }

  const wrapper = shallow(<Header {...props} />)
  expect(wrapper).toMatchSnapshot()
})

test('the user details are displayed when the user is logged in', () => {
  const props = {
    authenticated: true,
    user: userData.user,
    errors: {}
  }
  const wrapper = shallow(<Header {...props} />)
  const usernameDropdown = wrapper.find('#username')
  expect(usernameDropdown.text()).toMatch(`${props.user.username}account_circlearrow_drop_down`)
})

test('the admin details are displayed when the user is logged in as an admin', () => {
  const props = {
    authenticated: true,
    user: userData.admin,
    errors: {}
  }
  const wrapper = shallow(<Header {...props} />)
  const usernameDropdown = wrapper.find('#username')
  expect(usernameDropdown.text()).toMatch(`${props.user.username}account_circlearrow_drop_down`)
});

test('calls component did update to reinitialize materialize dropdown ', () => {
  const props = {
    authenticated: false,
    user: {},
    errors: {},
    logout: jest.fn()
  };
  const nextProps = {
    authenticated: true,
    user: userData.user
  };
  const spy = jest.spyOn(Header.prototype, 'componentDidUpdate')
  const wrapper = shallow(<Header {...props} />)
  expect(wrapper).toBeDefined();
  wrapper.setProps(nextProps);
  expect(spy).toHaveBeenCalled();
  expect(wrapper).toMatchSnapshot();
})

test('user can logout when they click on logout from the dropdown', () => {
  const props = {
    authenticated: true,
    user: userData.user,
    errors: {},
    logout: jest.fn()
  };
  const wrapper = shallow(<Header {...props} />);
  const handleLogoutSpy = jest.spyOn(wrapper.instance(), 'handleLogout');
  wrapper.instance().handleLogout();
  expect(handleLogoutSpy).toHaveBeenCalledTimes(1);
});

test('mapDispatchToProps', () => {
  const dispatch = jest.fn();
  expect(mapDispatchToProps(dispatch)).toHaveProperty('logout');

  const { logout } = mapDispatchToProps(dispatch);
  logout();
  expect(dispatch).toHaveBeenCalled();
});