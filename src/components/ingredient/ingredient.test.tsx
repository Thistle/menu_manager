import React from 'react';
import Browser from './Browser';
import Editor from './Editor';
import {shallow} from "enzyme";
import {Ingredient} from "../../ResourceManager/resources/Ingredient";

let wrapper: any;
let spy: any;

describe('editor tests', () => {
    let model: Ingredient = new Ingredient();
    model.setForTesting();

    let props: any = {
        model: model,
        updateProperty: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<Editor  {...props} />);
        props.updateProperty.mockClear();
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
            ]
        });
    });

    it('should display correct loading message', () => {
        expect(wrapper.text()).toContain('Loading');
        wrapper.setState({is_loading: false});
        expect(wrapper.text()).not.toContain('Loading');
    });

    describe('form area tests', () => {

        beforeEach(() => {
            wrapper.setState({is_loading: false});
            props.updateProperty.mockClear();
        });

        it('all fields should be updated after loading', () => {
            expect(wrapper.find('#thistle_culinary_name').prop('value')).toBe('culinary_name_1');
            expect(wrapper.find('#menu_display_name').prop('value')).toBe('display_name_1');
            expect(wrapper.find('#is_organic').prop('value')).toBe(true);
        });

        it('should handleOnChange and properly call ItemsEditor.updateProperty', () => {
            const onChangeSpy = jest.spyOn(wrapper.instance(), 'handleOnChange');
            wrapper.find('#menu_display_name').simulate('change', {
                preventDefault: () => {
                },
                target: {
                    id: 'menu_display_name',
                    value: 'abc'
                }
            });
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
            expect(props.updateProperty).toHaveBeenCalledTimes(1);
            expect(props.updateProperty).toHaveBeenCalledWith('menu_display_name', 'abc', false);
        });

        it('should handleonBlur', () => {
            let input = wrapper.find('#thistle_culinary_name');
            const onBlurSpy = jest.spyOn(wrapper.instance(), 'handleOnBlur');

            input.simulate('blur', {
                preventDefault: () => {
                },
                target: {
                    id: 666,
                    value: 'test_value'
                }
            });

            expect(onBlurSpy).toHaveBeenCalledTimes(1);
            expect(props.updateProperty).toHaveBeenCalledTimes(1);
            expect(props.updateProperty).toHaveBeenCalledWith(666, 'test_value', true);
        });

        it('should create select with recipal ingredients', () => {
            expect(wrapper.find('#recipal_ingredient').children().length).toBe(2);
        });
    });

    describe('preparations tests', () => {
        beforeEach(() => {
            wrapper.setState({is_loading: false});
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

        describe('attching allergen', () => {

        })
    });

    describe('allergens tests', () => {

        beforeEach(() => {
            wrapper.setState({is_loading: false});
        });

        it('should have a list of allergens in a select', () => {
            expect(wrapper.find('#allergens').children().length).toBe(2);
        });

        it('should list attached allergens', () => {
            const allergens_list = wrapper.find('#allergens-list');
            expect(allergens_list.children().length).toBe(2);
            expect(allergens_list.children().first().children().first().text()).toBe('allergen_option_1');
        });

        describe('adding allergens', () => {

            it('should call handleAddAllergen when + is clicked', () => {
                jest.spyOn(wrapper.instance(), 'handleAddAllergen').mockImplementation(jest.fn());
                wrapper.find('#add_allergen_btn').simulate('click', {
                    preventDefault: jest.fn()
                });
                expect(wrapper.instance().handleAddAllergen).toHaveBeenCalledTimes(1);
            });

            it('should return true and call updateProperty and update model if allergen does not exist in model.', () => {

                expect(wrapper.instance().addAllergenToModel(10)).toBe(true);

                expect(props.updateProperty).toHaveBeenCalledTimes(1);
                let t = wrapper.instance().state.model.allergens;
                t.push({id: 10});
                expect(props.updateProperty).toHaveBeenCalledWith('allergens', t);
            });

            it('should return false not call updateProperty if allergen already exists.', () => {
                wrapper.instance().addAllergenToModel(10);
                expect(wrapper.instance().addAllergenToModel(10)).toBe(false);
                expect(props.updateProperty).toHaveBeenCalledTimes(0)
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
