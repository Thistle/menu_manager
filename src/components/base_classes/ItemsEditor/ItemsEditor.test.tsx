import React from 'react';
import {shallow} from "enzyme";
import IngredientEditor from "../../ingredient/IngredientEditor";

describe('ItemsEditor tests', () => {
    let wrapper: any;
    let props = {
        $stateParams: 666
    };

    beforeEach(() => {
        wrapper = shallow(<IngredientEditor {...props} />, {disableLifecycleMethods: true});
    });

    it('should display loading message until loading completes', () => {
        expect(wrapper.text()).toContain('Loading...');
        wrapper.setState({is_loading: false, loading_extras: false});
        expect(wrapper.text()).not.toContain('Loading...');
    });

    it('should update model when updatePropery is called', () => {
        wrapper.instance().updateProperty('thistle_culinary_name', 'updated_name', false);
        expect(wrapper.instance().state.model.thistle_culinary_name).toBe('updated_name');
    });
});