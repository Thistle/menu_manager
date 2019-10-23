import React, {Fragment} from 'react';
import ItemsEditor from "../base_classes/ItemsEditor/ItemsEditor";
import {Component, Meal} from "../../ResourceManager/resources/Menu";
import InputWidget from "../widgets/InputWidget/InputWidget";
import {InventoryPackaging} from "../../ResourceManager/resources/Inventory";
import MealComponentEditor from "./MealComponentEditor";
import "./Meal.css";
import ButtonWidget from "../widgets/ButtonWidget/ButtonWidget";
import DatePickerWidget from "../widgets/DatePickerWidget/DatePickerWidget";



export default class MealEditor extends ItemsEditor<any> {

    constructor(props: any) {
        super(props, new Meal(), {
            loading_extras: true,
            containers: [],
            component_being_edited: null
        });
    }

    addComponent = () => {
        let component: Component = new Component();
        this.setState({component_being_edited: component});
    };

    finishedUpdatingComponent = () => {
        this.setState({component_being_edited: null})
    };

    updateDate = (id: string, selectedDate: string) => {
        let dates: any = {[id]: selectedDate};
        let date: Date = new Date(new Date(selectedDate).toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
        let startDate: Date = new Date(this.state.model.start_date);// new Date(new Date(this.state.model.start_date).toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
        let endDate: Date = new Date(this.state.model.end_date);

        if ( (id === 'start_date' && this.state.model.end_date && (endDate.getTime() < date.getTime())) ||
            (id === 'end_date' && this.state.model.start_date && (startDate.getTime() > date.getTime()))){
            window.alert('The start date needs to be before or the same as the end date');
            return;
        }

        if (id === 'start_date' && this.state.model.end_date === null) dates['end_date'] = this.dateToString(date);
        if (id === 'end_date' && this.state.model.start_date === null) dates['start_date'] = this.dateToString(date);

        this.updateProperties(dates);
    };

    dateToString = (date: Date): string => {
        let d_string: string = date.toISOString();
        return d_string.substring(0, d_string.indexOf('T'));
    };

    updateContainer = (e: any) => {
        this.updateProperty('container', {id: parseInt(e.target.value)})
    };


    componentDidMount = () => {
        super.componentDidMount();
        new InventoryPackaging().objects.all()
            .then((values) => {
                this.setState({
                    loading_extras: false,
                    containers: values.results
                })
            })
    };

    formContent = () => {
        const components = (!this.state.model.components)?
            []: this.state.model.components.map((component: Component) => <div>component</div>);

        return (
            <Fragment>
                <div className={'row item-editor'}>
                    <div className={'col-12'}>
                        <div className={'row'}>
                            <div className={'col-12'}>
                                <h1>Edit Meal</h1>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-12'}>
                                <form className={'form-group'}>
                                    <div className={'row'}>
                                        <div className={'col-md-6 col-12'}>
                                            <label htmlFor="name">Name</label>
                                            <InputWidget
                                                id={'menu_display_name'}
                                                initialValue={this.state.model.name}
                                                onUpdate={this.handleInputWidgetUpdate}
                                            />
                                        </div>
                                        <div className={'col-md-6 col-12'}>
                                            <label htmlFor="slug">Slug</label>
                                            <InputWidget
                                                id={'slug'}
                                                initialValue={this.state.model.slug}
                                                onUpdate={this.handleInputWidgetUpdate}
                                            />
                                        </div>
                                        <div className={'col-md-6 col-12'}>
                                            <label htmlFor="start_date">Start Date</label>
                                            <DatePickerWidget id={'start_date'}
                                                              selected={this.state.model.start_date}
                                                              onChange={this.updateDate}
                                                              />
                                        </div>
                                        <div className={'col-md-6 col-12'}>
                                            <label htmlFor="start_date">End Date</label>
                                            <DatePickerWidget id={'end_date'}
                                                              selected={this.state.model.end_date}
                                                              onChange={this.updateDate}
                                                              />
                                        </div>
                                        <div className={'col-md-6 col-12'}>
                                            <label htmlFor="type">Meal Type</label>
                                            <select className={'form-control'}
                                                    id={'type'}
                                                    onChange={this.handleOnBlur}
                                                    value={this.state.model.type}>
                                                <option value={0}>---</option>
                                                <option value={1}>Salad</option>
                                                <option value={2}>Soup</option>
                                                <option value={3}>Breakfast</option>
                                                <option value={4}>Lunch</option>
                                                <option value={5}>Dinner</option>
                                                <option value={6}>Snack</option>
                                            </select>
                                        </div>
                                        <div className={'col-md-6 col-12'}>
                                            <label htmlFor="container">Container</label>
                                            <select className={'form-control'}
                                                    id={'container'}
                                                    onChange={this.updateContainer}
                                                    value={(this.state.model.container !== null)? this.state.model.container.id:''}>
                                                <option value={''}>No Container</option>
                                                {
                                                    this.state.containers.map((container: any, index: number) => {
                                                        return (
                                                            <option key={`container_${index}`}
                                                                    value={container.id}>{container.order_name}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className={'col-12'}>
                                            <label htmlFor="slug">Description</label>
                                            <InputWidget
                                                id={'description'}
                                                type={'textarea'}
                                                initialValue={this.state.model.description}
                                                onUpdate={this.handleInputWidgetUpdate}
                                            />
                                        </div>
                                        <div className={'col-12'}>
                                            <label htmlFor="slug">Heating Instructions</label>
                                            <InputWidget
                                                id={'heating_instructions'}
                                                type={'textarea'}
                                                initialValue={this.state.model.heating_instructions}
                                                onUpdate={this.handleInputWidgetUpdate}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={'col-12'}>
                                <div className={'row'}>
                                    <div className={'col-12'}>
                                        <div className={'row'}>
                                            <div className={'col-10 list-title'}>
                                                <b>Components</b>
                                            </div>
                                            <div className={'col-2'}>
                                                <ButtonWidget id={'add-component-btn'}
                                                              classes={'bg-success text-white'}
                                                              label={'+'}
                                                              onClickHandler={this.addComponent}
                                                              mode={'active'}
                                                              />
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className={'row'}>
                                            <div className={'col-12 list-box'}>
                                                {
                                                    components
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.component_being_edited &&
                        <div id={'component-editor-overlay'} className={'row'}>
                            <div className={'col-12'}>
                                <MealComponentEditor model={this.state.component_being_edited}
                                                     onFinishedUpdating={this.finishedUpdatingComponent}/>
                            </div>
                        </div>
                    }
                </div>
            </Fragment>
        )
    }
}