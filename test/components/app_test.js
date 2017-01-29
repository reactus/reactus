import React from "react";
import {shallow} from 'enzyme';

import App from "../../src/assets/scripts/components/app";

describe('<App />', () => {

    it('should render children when passed in', () => {
        const wrapper = shallow(
            <App><div/></App>
        );
        expect(wrapper.contains(<div/>)).toEqual(true);
    });

    it('should render an `.component-app`', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('.component-app').length).toBe(1);
    });

});
