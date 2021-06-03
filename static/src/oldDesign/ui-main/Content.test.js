import React from 'react';
import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import App from './Content';
import {isUserInGroups} from "../../utils/AuthService";

configure({adapter: new Adapter()});

jest.mock("../../utils/AuthService");
isUserInGroups.mockReturnValue(true);

describe('<App />', () => {
	it('should render', () => {
		const rendered = renderer.create(<App/>);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
