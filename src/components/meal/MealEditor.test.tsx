import React from 'react';
import MealEditor from './MealEditor';
import {shallow} from "enzyme";

describe('MealEditor tests', () => {
    let wrapper: any;

    describe('updating dates', () => {
        let props: any = {
            $stateParams: {
                itemId: 666
            }
        };
        wrapper = shallow(<MealEditor {...props} />);
        let alertSpy = jest.spyOn(window, 'alert').mockImplementation();
        let updatePropertiesSpy = jest.spyOn(wrapper.instance(), 'updateProperties').mockImplementation(jest.fn());

        beforeEach(() => {
            alertSpy.mockClear();
            updatePropertiesSpy.mockClear();
        });

        describe('should not allow start_date > end_date', () => {
            it('should handle updating start_date', () => {
                wrapper.instance().setState({
                    model: {
                        end_date: '2019-10-10'
                    }
                });

                wrapper.instance().updateDate('start_date', '2019-10-13');

                expect(alertSpy).toHaveBeenCalledTimes(1);
                expect(updatePropertiesSpy).toHaveBeenCalledTimes(0);
            });

            it('should handle updating end_date', () => {
                wrapper.instance().setState({
                    model: {
                        start_date: '2019-10-15'
                    }
                });

                wrapper.instance().updateDate('end_date', '2019-10-13');

                expect(alertSpy).toHaveBeenCalledTimes(1);
                expect(updatePropertiesSpy).toHaveBeenCalledTimes(0);
            });
        });

        describe('auto update missing date', () => {
            wrapper = shallow(<MealEditor {...props} />);
            let updatePropertiesSpy = jest.spyOn(wrapper.instance(), 'updateProperties').mockImplementation(jest.fn());
            let alertSpy = jest.spyOn(window, 'alert').mockImplementation();



            describe('setting start_date', () => {

                beforeEach(() => {
                    updatePropertiesSpy.mockClear();
                    alertSpy.mockClear();
                });

                it('should update end_date if end_date == null', () => {
                    wrapper.instance().setState({
                        model: {
                            start_date: null,
                            end_date: null
                        }
                    });

                    wrapper.instance().updateDate('start_date', '2019-10-13');

                    expect(alertSpy).toHaveBeenCalledTimes(0);
                    expect(updatePropertiesSpy).toHaveBeenCalledTimes(1);
                    expect(updatePropertiesSpy).toHaveBeenCalledWith({
                        start_date: '2019-10-13',
                        end_date: '2019-10-13'
                    });
                });


                it('should not update end_date if already set', () => {
                    wrapper.instance().setState({
                        model: {
                            start_date: null,
                            end_date: '2019-10-15'
                        }
                    });

                    wrapper.instance().updateDate('start_date', '2019-10-13');

                    expect(alertSpy).toHaveBeenCalledTimes(0);
                    expect(updatePropertiesSpy).toHaveBeenCalledTimes(1);
                    expect(updatePropertiesSpy).toHaveBeenCalledWith({
                        start_date: '2019-10-13'
                    });
                });
            });

            describe('setting end date', () => {
                beforeEach(() => {
                    updatePropertiesSpy.mockClear();
                    alertSpy.mockClear();
                });

                it('should update start_date if start_date == null', () => {
                    wrapper.instance().setState({
                        model: {
                            start_date: null,
                            end_date: '2019-10-15'
                        }
                    });

                    wrapper.instance().updateDate('end_date', '2019-10-13');

                    expect(alertSpy).toHaveBeenCalledTimes(0);
                    expect(updatePropertiesSpy).toHaveBeenCalledTimes(1);
                    expect(updatePropertiesSpy).toHaveBeenCalledWith({
                        start_date: '2019-10-13',
                        end_date: '2019-10-13'
                    });
                });
            });
        })
    })
});