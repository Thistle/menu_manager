import React from 'react';
import {Ingredient} from "../../ResourceManager/resources/Ingredient";
import {shallow} from "enzyme";
import ItemsEditor from "../ItemsEditor/ItemsEditor";

describe('ItemsEditor tests', () => {
    let wrapper: any;
    let props = {
        $stateParams: {itemId: 666},
        edit: {
            model: new Ingredient()
        }
    };

    beforeEach(() => {
        wrapper = shallow(<ItemsEditor {...props} />, {disableLifecycleMethods: true});
    });

    it('should display loading message until loading completes', () => {
        expect(wrapper.text()).toContain('Loading...');
        wrapper.setState({is_loading: false});
        expect(wrapper.text()).not.toContain('Loading...');
    });

    it('should update model when updatePropery is called', () => {
        wrapper.instance().updateProperty('thistle_culinary_name', 'updated_name');
        expect(wrapper.instance().state.model.thistle_culinary_name).toBe('updated_name');
    });

    it('should render an item specific editor', () => {
        wrapper.setState({is_loading: false});
        expect(wrapper.find('#editor-content').children().length).toBe(1);
    });
});