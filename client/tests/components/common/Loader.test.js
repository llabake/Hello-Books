import React from 'react';

import Loader from '../../../components/common/Loader';

const wrapper = shallow(<Loader />);

test('The Loader mounts correctly', () => {
  expect(wrapper).toMatchSnapshot();
})

