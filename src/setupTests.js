import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

//disabled lifecycle (options can apply in shallow enzyme)
Enzyme.configure({ adapter: new EnzymeAdapter(), disableLifecycleMethods: true });
