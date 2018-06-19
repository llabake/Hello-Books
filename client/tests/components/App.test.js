
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { MemoryRouter, Switch } from 'react-router-dom'

import reducer from '../../reducers'
import App from '../../components/App';

test('The App component mounts correctly', () => {
  let spy = jest.spyOn(App.prototype, 'componentDidMount');

  const store = createStore(reducer)
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Switch>
          <App />
        </Switch>
      </MemoryRouter>
    </Provider>)
  expect(wrapper).toMatchSnapshot();
  expect(spy).toHaveBeenCalled();


})