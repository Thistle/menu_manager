import React from 'react';
import ResultsPagePicker from './ResultsPagePicker';
import {shallow} from "enzyme";

describe('tests', () => {
    let wrapper: any;
    let onClickFunc: any;
    let pagination = {
        page: 5,
        pages: 107
    };
    beforeEach(() => {
        onClickFunc = jest.fn();
        wrapper = shallow(<ResultsPagePicker pagination={pagination} changePage={onClickFunc}/>)
    });

    it('should have the correct number of pages', () => {
        expect(wrapper.find('.numbers-holder').children()).toHaveLength(pagination.pages);
    });

    it('should callback with correct number when clicked', () => {
        wrapper.find('.selected-number').simulate('click');
        expect(onClickFunc).toBeCalled();
        expect(onClickFunc).toBeCalledWith(parseInt(wrapper.find('.selected-number').text()));
    });

    it('should highlight current page', () => {
        expect(wrapper.find('.selected-number').text()).toBe(pagination.page.toString())
    });
});
