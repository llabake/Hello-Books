import React from 'react';

import BookCard from '../../../components/common/BookCard';
import { book2 } from '../../mocks/bookData';

test('The header component mounts correctly if all props it needs are passed into it.', () => {
  const props = {
    book: book2,
  }
  const wrapper = shallow(<BookCard {...props} />)
  // console.log(wrapper.debug(), 'uhm')
  expect(wrapper.exists()).toBe(true);

  // expect(wrapper.find('img').length).toBe(1);
  expect(wrapper).toMatchSnapshot();  
})