import React from 'react';
import {shallow} from 'enzyme';
import MealComponentEditor from "./MealComponentEditor";
import {Component} from "../../ResourceManager/resources/Menu";

describe('MealComponentEditor tests', () => {
    let wrapper: any;
    let updateComponent = jest.fn();
    let model: Component = new Component();
    model.setTestModelProperties({

    });

    beforeEach(() => {
        wrapper = shallow(<MealComponentEditor  model={model}
                                                onUpdateComponent={updateComponent}/>)
    });

    it('should set title to "Add Component"', () => {
        expect(wrapper.text()).toContain('Add Component');
    });

    it('should show "Loading..." in containers', () => {
        expect(wrapper.find('#container').children().at(0).text()).toBe('Loading...');
    });

    describe ('Editing tests', () => {

        beforeEach(() => {
            model.setTestModelProperties({
                id: 666
            });
            wrapper = shallow(<MealComponentEditor  model={model}
                                                    onUpdateComponent={updateComponent}/>)
        });

        it('should set title to "Edit Component"', () => {
            expect(wrapper.text()).toContain('Edit Component');
        });
    })
});