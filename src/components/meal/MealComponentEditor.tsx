/*
    This widget handles editing/creating meal components.

 */
import React, {Component as ReactComponent, Fragment} from 'react';
import SearchAndSelectWidget from "../widgets/SearchAndSelectWidget/SearchAndSelectWidget";
import {InventoryPackaging} from "../../ResourceManager/resources/Inventory";
import ButtonWidget from "../widgets/ButtonWidget/ButtonWidget";
import {Component, Recipe} from "../../ResourceManager/resources/Menu";

export interface IMealComponentEditorProps{
    model: Component,
    onFinishedUpdating: any
}

interface IState{
    model: Component,
    containers: any
}

export default class MealComponentEditor extends ReactComponent<IMealComponentEditorProps, IState> {
    state: IState;
    constructor(props: any){
        super(props);

        this.state = {
            model: props.model,
            containers: null
        };
    }

    updateProperty = (property: string, value: any) => {
        return this.state.model.update({[property]: new Date(value)})
    };

    setContainer = (e: any) => {
        this.updateProperty('container', {id: e.target.value})
    };

    setRecipe = (id: number, modelName: string, value: string) => {
        this.updateProperty('recipe', {id: id, name: value});
    };

    finishUpdating = () => {
        if(!this.state.model.hasUnsavedUpdates) {
            this.props.onFinishedUpdating();
            return;
        }

        if (this.formHasErrors()) return;

        this.state.model.save()
            .then((r: any) => {
                window.alert('Component has been added to your meal');
                this.props.onFinishedUpdating();
            })
    };

    formHasErrors = (): boolean => {
        let errors: string[] = [];
        if(this.state.model.recipe === null) errors.push('No recipe selected');

        if(errors.length > 0) window.alert(`Component cannot be saved for the following reasons:\n\n${errors.toString()}`);

        return (errors.length !== 0);
    };

    cancelUpdating = () => {
        if(this.state.model.id === -1 && this.state.model.hasUnsavedUpdates){
            if (!window.confirm('This new component has not been saved. Are you sure you want to cancel?')) return
        }
        this.props.onFinishedUpdating();
    };

    componentDidMount = () => {
        new InventoryPackaging().objects.all()
            .then((values) => {
                this.setState({
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
                                <h3>{`${(this.state.model.id === -1)? 'Add':'Edit'} Component`}</h3>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-12'}>
                                <form className={'form-group'}>

                                    <div className={'row'}>
                                        <div className={'col-12 col-md-6'}>
                                            <label htmlFor="container">Container</label>
                                            <select className={'form-control'}
                                                    id={'container'}
                                                    onChange={this.setContainer}
                                                    value={(this.props.model.container !== null)? this.props.model.container.id:''}
                                            >
                                                <option value={''}>
                                                    {(this.state.containers)? 'No Container Selected':'Loading...'}
                                                </option>

                                                {this.state.containers &&
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
                                            <SearchAndSelectWidget id={'recipeSAS'}
                                                                   onSelect={this.setRecipe}
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
                                                          label={'Finished'}
                                                          onClickHandler={this.finishUpdating}
                                                          mode={'active'}
                                                          />
                                            {this.state.model.id === -1 &&
                                                <ButtonWidget id={'save-btn'}
                                                          classes={'bg-danger text-white'}
                                                          label={'Cancel'}
                                                          onClickHandler={this.cancelUpdating}
                                                          mode={'active'}
                                                          />
                                            }
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