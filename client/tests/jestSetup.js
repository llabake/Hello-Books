import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from "jsdom"

Enzyme.configure({ adapter: new Adapter() })


global.mount = mount
global.shallow = shallow

const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window
global.scrollIntoView = () => {};

// global.$ = $;
global.$ = () => ({
  dropdown: jest.fn(),
  sideNav: jest.fn(),
  slider: jest.fn(),
  tabs: jest.fn(),  
  materialbox: jest.fn(),
  collapsible: jest.fn(),
  tooltip: jest.fn(),
  carousel: jest.fn(),
  tabs: jest.fn(),
  modal: jest.fn()
});

global.Materialize = { toast: () => {} };
global.swal = () => Promise.resolve(true);
// global.setTimeout = (callback) => {
//   callback();
// };
jest.setTimeout(10000);

