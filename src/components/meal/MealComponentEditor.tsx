/*
    This widget handles editing/creating meal components.

 */
import React, {Component as ReactComponent, Fragment} from 'react';
import InputWidget from "../widgets/InputWidget/InputWidget";
import SearchAndSelectWidget from "../widgets/SearchAndSelectWidget/SearchAndSelectWidget";
import {Recipe} from "../../ResourceManager/resources/Recipe";
import {InventoryPackaging} from "../../ResourceManager/resources/Inventory";
import ButtonWidget from "../widgets/ButtonWidget/ButtonWidget";
import {Component} from "../../ResourceManager/resources/Menu";

export interface IMealComponentEditorProps{
    model: Component,
    onUpdateComponent: any
}

interface IState{
    model: Component,
    is_loading: boolean,
    containers: [],
    isNewComponent: boolean
}

export default class MealComponentEditor extends ReactComponent<IMealComponentEditorProps, IState> {
    state: IState;
    constructor(props: any){
        super(props);

        this.state = {
            model: props.model,
            is_loading: true,
            containers: [],
            isNewComponent: (props.componentID === -1)
        };
    }

    updateProperty = (property: string, value: any): Promise<any> => {
        return this.state.model.update({[property]: value})
            .then((r: any) => {
                this.setState({
                    model: this.state.model
                });
            });
    };

    handleInputWidgetUpdate = (id: string, value: any) => {
        this.updateProperty(id, value);
    };

    handleOnBlur = (e: any) => {
        console.log(e.target.id);
        e.preventDefault();
        this.updateProperty(e.target.id, e.target.value);
    };

    handleSetRecipe = () => {

    };

    updateComponent = () => {

    };

    cancelUpdating = () => {

    };

    componentDidMount = () => {
        // load component
        new InventoryPackaging().objects.all()
            .then((values) => {
                this.setState({
                    is_loading: false,
                    containers: values.results
                })
            })
    };

    render(){
        return (
            <Fragment>
                <div id={'meal-component-editor'} className={'row'}>
                    <div className={'col-12'}>
                        <div className={'row'}>
                            <div className={'col-12'}>
                                <h3>{`${(this.state.isNewComponent)? 'Edit':'Add'} Component`}</h3>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-12'}>
                                <form className={'form-group'}>
                                    <div className={'row'}>
                                        <div className={'col-6 col-md-3'}>
                                            <label htmlFor="serving_amount">Serving Amount</label>
                                            <InputWidget id={'serving_amount'}
                                                         initialValue={this.props.model.serving_amount}
                                                         onUpdate={this.handleInputWidgetUpdate}
                                            />
                                        </div>
                                        <div className={'col-6 col-md-3'}>
                                            <label htmlFor="serving_amount">Consumption YLD</label>
                                            <InputWidget id={'consumption_yield'}
                                                         initialValue={this.props.model.consumption_yield}
                                                         onUpdate={this.handleInputWidgetUpdate}
                                            />
                                        </div>
                                        <div className={'col-6 col-md-3'}>
                                            <label htmlFor="serving_amount">Servings</label>
                                            <InputWidget id={'servings'}
                                                         initialValue={this.props.model.servings}
                                                         onUpdate={this.handleInputWidgetUpdate}
                                            />
                                        </div>
                                        <div className={'col-6 col-md-3'}>
                                            <label htmlFor="serving_amount">Suggested Serv.</label>
                                            <select id={'suggested_serving'}
                                                    className={'form-control'}
                                                    value={this.props.model.suggested_serving}
                                                    >
                                                <option value={0}>oz</option>
                                                <option value={1}>ea</option>
                                                <option value={2}>fl oz</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={'row'}>
                                        <div className={'col-12 col-md-6'}>
                                            <label htmlFor="container">Container</label>
                                            <select className={'form-control'}
                                                    id={'container'}
                                                    onChange={this.handleOnBlur}
                                                    value={(this.props.model.container !== null)? this.props.model.container.id:''}
                                            >
                                                <option value={''}>
                                                    {(this.state.is_loading)? 'Loading...':'No Container Selected'}
                                                </option>

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
                                    </div>
                                    <div className={'row'}>
                                        <div className={'col-12'}>
                                            <label htmlFor="recipe">Recipe</label>
                                            <input disabled={true}
                                                   value={(this.props.model.recipe)? this.props.model.recipe.name:'Select A Recipe'}
                                                   id={'recipe'}
                                                   className={'form-control'}
                                            />
                                        </div>
                                        <div className={'col-12'}>
                                            <SearchAndSelectWidget id={'ingredientsas'}
                                                                   onSelect={this.handleSetRecipe}
                                                                   placeholder={'Enter Recipe Name'}
                                                                   searchModels={[
                                                                       {
                                                                           model: new Recipe(),
                                                                           displayField: 'name'
                                                                       }]}
                                            />
                                        </div>
                                    </div>
                                    <div className={'row buttons-row'}>
                                        <div className={'col-12'}>
                                            <ButtonWidget id={'save-btn'}
                                                          classes={'bg-success text-white'}
                                                          label={'Save'}
                                                          onClickHandler={this.updateComponent}
                                                          mode={'active'}
                                                          />
                                          <ButtonWidget id={'save-btn'}
                                              classes={'bg-danger text-white'}
                                              label={'Cancel'}
                                              onClickHandler={this.cancelUpdating}
                                              mode={'active'}
                                              />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}