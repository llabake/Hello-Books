import React from 'react';

import Footer from '../../../components/common/Footer'

const wrapper = shallow(<Footer />);

test('The Footer component mounts correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Footer renders with a footer element', () => {
  expect(wrapper.find('footer').length).toBe(1);
});

test('Footer should have an unordered list element', () => {
  expect(wrapper.find('ul').length).toBe(2);
});

test('Footer list items has seven child elements', () => {
  expect(wrapper.find('ul').children().length).toBe(7);
});

test('Footer links should be rendered', () => {
  expect(wrapper.find('Link').length).toBe(3);

})
test('Footer displays the current year', () => {
  const currentYear = (new Date).getFullYear()

  const copyrightText = wrapper.find('.footer-copyright').text()
  expect(copyrightText).toMatch(String(currentYear))
});

// import React from 'react';
// import { MemoryRouter } from 'react-router-dom';

// import Footer from '../../../components/common/Footer'

// test(' the Footer component mounts correctly', () => {
//   const wrapper = mount(
//     <MemoryRouter>
//       <Footer />
//     </MemoryRouter>
//   );

//   expect(wrapper).toMatchSnapshot();
// })

// test('Footer displays the current year', () => {
//   const currentYear = (new Date).getFullYear()

  
//   const wrapper = shallow(<Footer />);
//   const copyrightText = wrapper.find('.footer-copyright').text()
//   expect(copyrightText).toMatch(String(currentYear))
// })

