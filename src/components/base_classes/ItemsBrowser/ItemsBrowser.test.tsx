import React from 'react';
import IngredientBrowser from '../../ingredient/IngredientBrowser';

import {shallow} from "enzyme";

describe('ItemsBrowser tests', () => {
    let wrapper: any;
    let list: any[] = [
        {
            thistle_culinary_name: 'culinary_name_1',
            menu_display_name: 'display_name_1'
        },
        {
            thistle_culinary_name: 'culinary_name_2',
            menu_display_name: 'display_name_2'
        }
    ];

    beforeEach(() => {
        wrapper = shallow(<IngredientBrowser/>);
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

    it('should render a list with the correct number of items', () => {
        wrapper.setState({list: list});
        console.log(wrapper.instance().state);
        expect(wrapper.update().find('.browser-content').children()).toHaveLength(list.length);
    });

});