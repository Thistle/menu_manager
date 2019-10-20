import React, {Fragment} from 'react';
import ItemsEditor from "../base_classes/ItemsEditor/ItemsEditor";
import {Component} from "../../ResourceManager/resources/Menu";
import InputWidget from "../widgets/InputWidget/InputWidget";
import {InventoryPackaging} from "../../ResourceManager/resources/Inventory";
import SearchAndSelectWidget from "../widgets/SearchAndSelectWidget/SearchAndSelectWidget";
import {Recipe} from "../../ResourceManager/resources/Recipe";

export default class ComponentEditor extends ItemsEditor<any> {

    constructor(props: any) {
        super(props, new Component(), {
            loading_extras: true,
            containers: []
        });
    }

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

    handleSetRecipe = (id: number, modelName: string, value: string) => {
        this.state.model.update({recipe: id})
            .then((r: any) => {
                this.state.model[id] = value;
                this.setState({model: this.state.model})
            })

    };

    formContent = () => {
        return (
            <Fragment>
                <div className={'row item-editor'}>
                    <div className={'col-12'}>
                        <div className={'row'}>
                            <div className={'col-12'}>
                                <h1>Edit Component</h1>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-md-6 col-12'}>
                                <form className={'form-group'}>
                                    <div className={'row'}>
                                        <div className={'col-md-6 col-12'}>
                                            <label htmlFor="name">Name</label>
                                            <InputWidget id={'name'}
                                                         initialValue={this.state.model.name}
                                                         onHandleUpdate={this.handleInputWidgetUpdate}
                                            />
                                        </div>
                                        <div className={'col-md-6 col-12'}>
                                            <label htmlFor="slug">Slug</label>
                                            <InputWidget id={'slug'}
                                                         initialValue={this.state.model.slug}
                                                         onHandleUpdate={this.handleInputWidgetUpdate}
                                            />
                                        </div>
                                    </div>
                                    <div className={'row'}>
                                        <div className={'col-md-6 col-12'}>
                                            <label htmlFor="serving_amount">Serving Amount (oz)</label>
                                            <InputWidget id={'serving_amount'}
                                                         initialValue={this.state.model.serving_amount}
                                                         onHandleUpdate={this.handleInputWidgetUpdate}
                                            />
                                        </div>
                                        <div className={'col-md-6 col-12'}>
                                            <label htmlFor="container">Container</label>
                                            <select className={'form-control'}
                                                    id={'container'}
                                                    onChange={this.handleOnBlur}
                                                    value={this.state.model.container}
                                            >
                                                <option value={''}>No Container</option>
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
                                                   value={this.state.model.recipe.name}
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}