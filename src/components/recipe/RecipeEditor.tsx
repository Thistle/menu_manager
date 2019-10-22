import React, {Component, Fragment} from "react";
import InputWidget from "../widgets/InputWidget/InputWidget";
import ItemsEditor from "../base_classes/ItemsEditor/ItemsEditor";
import {Recipe, RecipeIngredient} from "../../ResourceManager/resources/Menu";
import SearchAndSelectWidget from "../widgets/SearchAndSelectWidget/SearchAndSelectWidget"
import "./index.css";
import {Ingredient} from "../../ResourceManager/resources/Ingredient";

export default class RecipeEditor extends ItemsEditor<any> {
    recipeIngredientCTRL = new RecipeIngredient();

    constructor(props: any) {
        super(props, new Recipe());
    }

    handleAddIngredient = (id: number, modelName: string, value: string) => {
        if (this.state.model.ingredients.filter((ingredient: any) => {
            if (ingredient.base_ingredient.id === id) return ingredient;
        }).length > 0) {
            window.alert(`'${value}' is already in this recipe`);
            return;
        }

        this.recipeIngredientCTRL.objects.create({
            base_ingredient: id,
            recipe: this.state.model.id
        })
            .then((response: any) => {
                this.state.model.ingredients.push(response);
                this.setState({model: this.state.model});
            });
    };

    updateRecipeIngredientQuantity = (id: number, quantity: number) => {
        this.recipeIngredientCTRL.objects.update(id, {quantity});
    };

    deleteRecipeIngredient = (id: number, base_ingredient_name: string) => {
        if (!window.confirm(`Are you sure you want to remove '${base_ingredient_name}'?`)) return;
        this.recipeIngredientCTRL.objects.delete(id)
            .then(() => {
                this.state.model.ingredients = this.state.model.ingredients.filter((ingredient: any) => {
                    if (ingredient.id !== id) return ingredient;
                });
                this.setState({model: this.state.model})
            })
    };

    formContent = () => {
        const ingredientComponents = this.state.model.ingredients.map((ingredient: RecipeIngredient) =>
            <RecipeIngredientWidget recipeIngredient={ingredient}
                                    onDelete={this.deleteRecipeIngredient}
                                    onUpdate={this.updateRecipeIngredientQuantity}
                                    key={`riw_${ingredient.id}`}

            />);
        return (
            <div className={'row'}>
                <div className={'col-12'}>
                    <form className={'form-group'}>
                        <div className={'row'}>
                            <div className={'col-md-6 col-12'}>
                                <label htmlFor="name">Recipe Name</label>
                                <InputWidget id={'name'}
                                             initialValue={this.state.model.name}
                                             onUpdate={this.handleInputWidgetUpdate}
                                />
                            </div>
                            <div className={'col-md-6 col-12'}>
                                <label htmlFor="version">Version</label>
                                <select id={'version'}
                                        className={'form-control'}
                                        onChange={(e) => this.handleOnBlur(e)}
                                        value={this.state.model.version}
                                >
                                    <option value={'1'}>vegan</option>
                                    <option value={'2'}>meat</option>
                                </select>
                            </div>
                            <div className={'col-md-6 col-12'}>
                                <label htmlFor="buffer">Buffer</label>
                                <InputWidget id={'buffer'}
                                             initialValue={this.state.model.buffer}
                                             onUpdate={this.handleInputWidgetUpdate}
                                             defaultUpdateValue={'0'}
                                />
                            </div>
                            <div className={'hidden-sm col-md-6'}></div>
                            <div className={'col-6 col-md-3'}>
                                <label htmlFor="consumption_yield">Consumption YLD</label>
                                <InputWidget id={'consumption_yield'}
                                             initialValue={this.state.model.consumption_yield}
                                             onUpdate={this.handleInputWidgetUpdate}
                                />
                            </div>
                            <div className={'col-6 col-md-3'}>
                                <label htmlFor="servings">Servings</label>
                                <InputWidget id={'servings'}
                                             initialValue={this.state.model.servings}
                                             onUpdate={this.handleInputWidgetUpdate}
                                />
                            </div>
                            <div className={'col-6 col-md-3'}>
                                <div className={'row'}>
                                    <div className={'col-12'} style={{paddingTop: '3px', paddingBottom: '3px'}}>
                                        <b>Suggested Serving</b>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-5'}>
                                        <InputWidget id={'suggested_serving'}
                                                     initialValue={this.state.model.suggested_serving}
                                                     onUpdate={this.handleInputWidgetUpdate}
                                        />
                                    </div>
                                    <div className={'col-7'}>
                                        <select id={'suggested_serving_unit'}
                                                className={'form-control'}
                                                onChange={this.handleOnBlur}
                                                value={this.state.model.suggested_serving_unit}
                                                >
                                            <option value={0}>oz</option>
                                            <option value={1}>ea</option>
                                            <option value={2}>fl oz</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={'col-12 col-lg-6'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className={'row'}>
                                <div className={'col-12 list-title'}>
                                    <b>Ingredients</b>
                                </div>
                            </div>
                            <hr/>
                            <div className={'row'}>
                                <div className={'col-12 list-box'}>
                                    {
                                        ingredientComponents
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={'col-12'}>
                            <div className={'row'}>
                                <div className={'col-12'}>
                                    <div className={'row'}>
                                        <div className={'col-12 list-title'}>
                                            <b>+ Add Ingredient</b>
                                        </div>
                                    </div>
                                    <div className={'row'}>
                                        <div className={'col-12'}>
                                            <SearchAndSelectWidget id={'ingredientsas'}
                                                                   onSelect={this.handleAddIngredient}
                                                                   searchModels={[
                                                                       {
                                                                           model: new Ingredient(),
                                                                           displayField: 'thistle_culinary_name'
                                                                       }]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

interface IRIWProps {
    recipeIngredient: RecipeIngredient,
    onDelete: any,
    onUpdate: any
}

export class RecipeIngredientWidget extends Component<IRIWProps, any> {
    state: any;

    constructor(props: any) {
        super(props);
        this.state = {
            amount: props.recipeIngredient.quantity
        };
    }

    updateQuantity = (id: string, value: string) => {
        this.setState({amount: value});
        this.props.onUpdate(this.props.recipeIngredient.id, value);
    };

    render() {
        return (
            <Fragment key={`recping_${this.props.recipeIngredient.id}`}>
                <div className={'row list-item'}>
                    <div className={'col-12'}>
                        <div className={'row'}>
                            <div className={'col-10'}>
                                <u>{this.props.recipeIngredient.base_ingredient.thistle_culinary_name}</u>
                            </div>
                            <div className={'col-2'}>
                                <button className={'bg-danger text-white'}
                                        onClick={() => this.props.onDelete(this.props.recipeIngredient.id, this.props.recipeIngredient.base_ingredient.thistle_culinary_name)}>-
                                </button>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-12'}>
                                <div className={'row'}>
                                    <div className={'col-5'}>
                                        <InputWidget id={`recping_amt_${this.props.recipeIngredient.id}`}
                                                     initialValue={this.state.amount}
                                                     onUpdate={this.updateQuantity}
                                                     defaultUpdateValue={0}
                                        />
                                    </div>
                                    <div className={'col-3'}>
                                        OZ
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </Fragment>
        )
    }
}
