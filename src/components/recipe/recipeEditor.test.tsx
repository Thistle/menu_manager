import React from 'react';
import {RecipeIngredientWidget} from "./RecipeEditor";
import {RecipeIngredient} from "../../ResourceManager/resources/Recipe";
import {shallow} from "enzyme";

let wrapper: any;
let spy: any;

describe('editor tests', () => {

    it('should do something');
});

describe('RecipeIngredientWidget tests', () => {
    let recipeIngredient: RecipeIngredient = new RecipeIngredient();
    recipeIngredient.setTestModelProperties({
        id: 666,
        quantity: 24,
        base_ingredient: {
            thistle_culinary_name: 'culinary_name'
        }
    });
    let onDelete = jest.fn();
    let onUpdate = jest.fn();

    beforeEach(() => {
        onDelete.mockClear();
        onUpdate.mockClear();
    });

    describe('convert to/from LB', () => {
        beforeEach(() => {
            recipeIngredient.setTestModelProperties({
                quantity: 24
            });

            wrapper = shallow(<RecipeIngredientWidget recipeIngredient={recipeIngredient}
                                                      onDelete={onDelete}
                                                      onUpdate={onUpdate}
            />)
        });

        it('should calcualte properly for amount >15oz (LB)', () => {
            expect(wrapper.instance().state.unit).toBe('lb');
            expect(wrapper.instance().state.amount).toBe(1.5);
        });

        it('should calculae LB to OZ before updating', () => {
            wrapper.instance().sendUpdate();
            expect(onUpdate).toHaveBeenCalledTimes(1);
            expect(onUpdate).toHaveBeenCalledWith(666, 24);
        })
    });

    describe('convert to/from OZ', () => {
        beforeEach(() => {
            recipeIngredient.setTestModelProperties({
                quantity: 14
            });
            wrapper = shallow(<RecipeIngredientWidget recipeIngredient={recipeIngredient}
                                                      onDelete={onDelete}
                                                      onUpdate={onUpdate}
            />)
        });

        it('should calculate properly for OZ', () => {
            expect(wrapper.instance().state.unit).toBe('oz');
            expect(wrapper.instance().state.amount).toBe(14);
        });

        it('should not convert if OZ', () => {
            wrapper.instance().sendUpdate();
            expect(onUpdate).toHaveBeenCalledTimes(1);
            expect(onUpdate).toHaveBeenCalledWith(666, 14);
        })
    });

    describe('convert to/from G', () => {
        beforeEach(() => {
            recipeIngredient.setTestModelProperties({
                quantity: .5
            });
            wrapper = shallow(<RecipeIngredientWidget recipeIngredient={recipeIngredient}
                                                      onDelete={onDelete}
                                                      onUpdate={onUpdate}
            />)
        });

        it('should calcualte properly for G', () => {
            expect(wrapper.instance().state.unit).toBe('g');
            expect(wrapper.instance().state.amount).toBe(14.175);
        });

        it('should calculae G to OZ before updating', () => {
            wrapper.instance().sendUpdate();
            expect(onUpdate).toHaveBeenCalledTimes(1);
            expect(onUpdate).toHaveBeenCalledWith(666, .5);
        })
    });
});