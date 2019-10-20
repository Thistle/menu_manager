import React from "react";
import ButtonWidget from "./ButtonWidget";
import {mount} from "enzyme";

describe('ButtonWidget tests', () => {
    let wrapper: any;
    let button: any;
    let spy: any;

    let onClick = jest.fn();
    let setStatePromise = (values: any) => new Promise(resolve => wrapper.setState(values, resolve));

    beforeEach(() => {
        wrapper = mount(<ButtonWidget
            id={'test_id'}
            label={'test_label'}
            classes={'bg-danger text-white'}
            onClickHandler={onClick}
            mode={'active'}
        />);
        button = wrapper.find('button');
    });

    it('should set the label and class', () => {
        expect(button.text()).toBe('test_label');
        expect(button.props('className')['className']).toContain('bg-danger text-white');
    });

    it('should call props onClick', () => {
        button.simulate('click', {
            preventDefault: () => {
            }
        });
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should be able to disable', () => {
        wrapper.setProps({mode: 'disabled'});
        expect(wrapper.update().find('button').props('className')['className']).toContain('disabled');
    });
});