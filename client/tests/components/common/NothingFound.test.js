import React from 'react';

import NothingFound from '../../../components/common/NothingFound';

const wrapper = shallow(<NothingFound />);

test('<NothingFound /> mounts correctly', () => {
  expect(wrapper).toMatchSnapshot();
})

