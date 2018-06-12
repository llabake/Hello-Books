import React from 'react'
import { NavLink } from 'react-router-dom'
import SideNav from '../../../components/common/SideNav'
import userData from '../../mocks/userData'

test('The SideNav component mounts correctly if all props it needs are passed into it.', () => {
  const props = {
    authenticated: false,
    user: {},
    errors: {},
    logout: jest.fn()
  }

  const wrapper = shallow(<SideNav {...props} />)
  expect(wrapper).toMatchSnapshot()
})

test('the user details are displayed when the user is logged in', () => {
  const props = {
    authenticated: true,
    user: userData.user,
    errors: {}
  }
  const wrapper = shallow(<SideNav {...props}  user={props.user} />)
  const usernameDropdown = wrapper.find('.collapsible-header')
  expect(usernameDropdown.text()).toMatch(`${props.user.username}account_circlearrow_drop_down`)
})

test('the admin details are displayed when the user is logged in as an admin', () => {
  const props = {
    authenticated: true,
    user: userData.admin,
    errors: {}
  }
  const wrapper = shallow(<SideNav {...props} user={props.user} role = {props.user.role}/>)
  const usernameDropdown = wrapper.find('.collapsible-header')
  expect(usernameDropdown.text()).toMatch(`${props.user.username}account_circlearrow_drop_down`)
});

