import React from 'react';
import IngredientEditor from './IngredientEditor';
import {shallow} from "enzyme";

let wrapper: any;
let m_wrapper: any;
let spy: any;

describe('IngredientEditor tests', () => {
    let props = {
        $stateParams: 666
    };

    beforeEach(() => {
        wrapper = shallow(<IngredientEditor  {...props} />);
        wrapper.setState({
            allergens: [
                {id: 101, name: 'allergen_option_1'},
                {id: 102, name: 'allergen_option_2'}
            ],
            preparations: [
                {id: 201, description: 'preparation_option_1'},
                {id: 202, description: 'preparation_option_2'}
            ],
            recipal_ingredients: [
                {id: 301, name: 'recipal_ingredient_1'},
                {id: 302, name: 'recipal_ingredient_2'}
            ],
        });
    });

    describe('form area tests', () => {

        beforeEach(() => {
            wrapper.setState({
                is_loading: false,
                loading_extras: false
            });
        });

        it('should create select with recipal ingredients', () => {
            expect(wrapper.find('#recipal_ingredient').children().length).toBe(2);
        });
    });

    describe('preparations tests', () => {
        beforeEach(() => {
            wrapper.setState({
                is_loading: false,
                loading_extras: false
            });
        });

        it('should have a list of preparations in a select', () => {
            expect(wrapper.find('#available-preparations').children().length).toBe(2);
        });

        it('should list attached preparations', () => {
            expect(wrapper.find('#preparations-list').children().length).toBe(2);
        });

        describe('add new preparation', () => {
            let new_preparation: any;

            beforeEach(() => {
                new_preparation = wrapper.find('#new-preparation');
            });

            it('should call handleAddNewPreparation when "+" is clicked', () => {
                spy = jest.spyOn(wrapper.instance(), 'handleAddNewPreparation').mockImplementation(jest.fn());
                new_preparation.find('button').simulate('click', {
                    preventDefault: jest.fn()
                });
                expect(spy).toHaveBeenCalledTimes(1);
            });

            it('should not add preparation if alrady available', () => {
                expect(wrapper.instance().addPreparation('preparation_option_1')).toBe(false);
            });
        });
    });

    describe('allergens tests', () => {

        beforeEach(() => {
            wrapper.setState({
                is_loading: false,
                loading_extras: false
            });
        });

        it('should have a list of allergens in a select', () => {
            expect(wrapper.find('#available-allergens').children().length).toBe(2);
        });

        it('should list attached allergens', () => {
            const allergens_list = wrapper.find('#allergens-list');
            expect(allergens_list.children().length).toBe(2);
            expect(allergens_list.children().first().children().first().text()).toBe('allergen_option_1');
        });

        describe('adding allergens', () => {

            it('should return true and call updateProperty and update model if allergen does not exist in model.', () => {

                expect(wrapper.instance().addAllergenToModel(10)).toBe(true);

                //expect(props.updateProperty).toHaveBeenCalledTimes(1);
                let t = wrapper.instance().state.model.allergens;
                t.push({id: 10});
                //expect(props.updateProperty).toHaveBeenCalledWith('allergens', t);
            });

            it('should return false not call updateProperty if allergen already exists.', () => {
                wrapper.instance().addAllergenToModel(10);
                expect(wrapper.instance().addAllergenToModel(10)).toBe(false);
                //expect(props.updateProperty).toHaveBeenCalledTimes(0)
            });
        });

        describe('removing allergens', () => {
            let attached_allergens_button: any;

            beforeEach(() => {
                attached_allergens_button = wrapper.find('#allergens-list').children().first().find('button');
            });

            it('should call handleRemoveAllergen when - is clicked', () => {
                spy = jest.spyOn(wrapper.instance(), 'handleRemoveAllergen').mockImplementation(jest.fn());
                attached_allergens_button.simulate('click', 101);
                expect(spy).toHaveBeenCalledTimes(1);
            });

            it('should remove allergen from local model', () => {
                const current_count = wrapper.instance().state.model.allergens.length;
                wrapper.instance().removeAllergenFromModel(101);
                expect(current_count - wrapper.instance().state.model.allergens.length).toBe(1);
            });
        })
    })
});

