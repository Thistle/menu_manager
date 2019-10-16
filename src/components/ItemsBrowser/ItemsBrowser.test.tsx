import React from 'react';
import ItemsBrowser from './ItemsBrowser';
import {Ingredient} from '../../ResourceManager/resources/Ingredient';

import {shallow} from "enzyme";

describe('ItemsBrowser tests', () => {
    let wrapper: any;
    let props = {
        browse: {
            model: new Ingredient()
        }
    };

    beforeEach(() => {
        wrapper = shallow(<ItemsBrowser {...props} />);
    });

    it('should display loading message until loading completes', () => {
        expect(wrapper.text()).toContain('Loading...');
        wrapper.setState({is_loading: false});
        expect(wrapper.text()).not.toContain('Loading...');
    });

    it('should display the model name of items being listed', () => {
        wrapper.setState({
            is_loading: false
        });
        expect(wrapper.find('.browser-title').text()).toBe('Ingredients')
    });

    it('should have the correct number of pages', () => {

    });

    it('should load the correct browser.', () => {

    });
});