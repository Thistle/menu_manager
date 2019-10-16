import React from 'react';
import {shallow} from "enzyme";

import InputWidget from './InputWidget';

describe('InputWidget widget tests', () => {
    let wrapper: any;
    let spy: any;
    let input_element: any;
    const onHandleUpdate = jest.fn();

    beforeEach(() => {
        wrapper = shallow(<InputWidget initial_value={'initial_value_text'}
                                       onHandleUpdate={onHandleUpdate}
                                       placeholder={'test_placeholder'}
        />);
        input_element = wrapper.find('input');
    });

    it('should fill in INPUT', () => {
        expect(input_element.prop('value')).toBe('initial_value_text');
    });

    it("should not UPDATE if text hasn't changed", () => {
        input_element.simulate('change', {
            target: {
                value: 'initial_value_text'
            }
        });
        wrapper.instance().sendUpdate();
        expect(onHandleUpdate).toHaveBeenCalledTimes(0);
    });

    it("should UPDATE if text has changed", () => {
        input_element.simulate('change', {
            target: {
                value: 'updated_value_text'
            }
        });
        wrapper.instance().sendUpdate();
        expect(onHandleUpdate).toHaveBeenCalledTimes(1);
    });

    it('should call sendUpdate on "enter"', () => {
        spy = jest.spyOn(wrapper.instance(), 'sendUpdate').mockImplementation(jest.fn());

        input_element
            .simulate('change', {
                target: {
                    value: 'updated_value_text'
                }
            })
            .simulate('keypress', {key: 'Enter'});
        expect(spy).toHaveBeenCalledTimes(0);
    });
});