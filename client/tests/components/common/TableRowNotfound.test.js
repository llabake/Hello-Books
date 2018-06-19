import React from 'react';

import TableRowNotFound from '../../../components/common/TableRowNotFound';

const wrapper = shallow(<TableRowNotFound />);

test('<TableRowNotFound /> mounts correctly', () => {
  expect(wrapper).toMatchSnapshot();
})

