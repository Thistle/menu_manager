import React from 'react';
import Browser from './Browser';
import Editor from './Editor';
import {shallow} from "enzyme";
import {Ingredient} from "../../ResourceManager/resources/Ingredient";

let wrapper: any;
let spy: any;

describe('browser tests', () => {

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
        wrapper = shallow(<Browser list={list}/>);
    });

    it('should render a list with the correct number of items', () => {
        expect(wrapper.find('.browser-content').children()).toHaveLength(list.length);
    });
});