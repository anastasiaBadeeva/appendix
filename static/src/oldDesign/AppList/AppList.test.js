import React from 'react';
import {configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import AppList from './AppList';

configure({adapter: new Adapter()});

describe('<AppList />', () => {
	it('should render', () => {
		let apps = [{application: "Client App: test@7parkdata.com-cf9cd395-82ea-48fd-953d-835bcb94c4a1", client_id: "test1234"},
					{application: "Client App: test@7parkdata.com-cf9cd395-82ea-48fd-953d-835bcb94c4a2", client_id: "test5678"},
					{application: "Client App: test@7parkdata.com-cf9cd395-82ea-48fd-953d-835bcb94c4a3", client_id: "test9012"},]
		const rendered = renderer.create(<AppList apps={apps}/>);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});