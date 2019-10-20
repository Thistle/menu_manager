import React from 'react';
import {shallow} from "enzyme";

import AddItemWidget from "./AddItemWidget";
import {Ingredient} from "../../../ResourceManager/resources/Ingredient";

describe('AddItem Widget tests', () => {
    let wrapper: any;
    let spy: any;

    let model: any = new Ingredient();

    beforeEach(() => {
        wrapper = shallow(<AddItemWidget model={model} itemNameField={'thistle_culinary_name'}/>)
    });

    it('should set the prompt to the correct model name', () => {
        expect(wrapper.find('#add-item-input').prop('placeholder')).toContain('Ingredient')
    });

    it('should attempt to add an item.', () => {
        // manually test
    });

    it('should show errros', () => {
        // manually test
    });

    it('should redirect through uirouter', () => {
        throw new Error();
    });
});