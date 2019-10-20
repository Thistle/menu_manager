import React, {Fragment} from "react";
import InputWidget from "../widgets/InputWidget/InputWidget";
import ItemsEditor from "../base_classes/ItemsEditor/ItemsEditor";
import {Recipe, RecipeIngredient} from "../../ResourceManager/resources/Recipe";
import SearchAndSelectWidget from "../widgets/SearchAndSelectWidget/SearchAndSelectWidget"
import "./index.css";
import {Ingredient} from "../../ResourceManager/resources/Ingredient";

export default class RecipeEditor extends ItemsEditor<any> {
    recipeIngredientCTRL = new RecipeIngredient();

    constructor(props: any) {
        super(props, new Recipe());
    }

    handleRemoveIngredient = (id: number, base_ingredient_name: string) => {
        if (!window.confirm(`Are you sure you want to remove '${base_ingredient_name}'?`)) return;
        this.recipeIngredientCTRL.objects.delete(id)
            .then(() => {
                this.state.model.reload()
                    .then((response: any) => {
                        this.setState({model: this.state.model})
                    });
            })
            .catch((error: string) => {
                window.alert('Unable to remove ingredient')
            })
    };

    handleAddIngredient = (id: number, modelName: string, value: string) => {
        if (this.state.model.ingredients.filter((ingredient: any) => {
            if (ingredient.base_ingredient.id === id) return ingredient;
        }).length > 0) {
            window.alert(`'${value}' is already in this recipe`);
            return;
        }

        //todo: No good. Need to get a response that can be pushed onto INGREDIENTS instead of reloading the model.
        this.recipeIngredientCTRL.objects.create({
            base_ingredient: id,
            recipe: this.state.model.id
        })
            .then((response: any) => {
                this.state.model.reload()
                    .then((response: any) => {
                        this.setState({model: this.state.model})
                    });
            })
            .catch((error: any) => {
                window.alert('Unable to add ingredient')
            })
    };

    handleUpdateAmount = (id: string, value: string) => {
        this.recipeIngredientCTRL.objects.update(parseInt(id.split('_')[2]), {quantity: value})
            .catch((response: any) => {
                window.alert('Unable to update ingredient.')
            })
    };

    formContent = () => {
        return (
            <div className={'row'}>
                <div className={'col-md-6 col-12'}>
                    <form className={'form-group'}>
                        <div className={'row'}>
                            <div className={'col-md-6 col-12'}>
                                <label htmlFor="name">Recipe Name</label>
                                <InputWidget id={'name'}
                                             initialValue={this.state.model.name}
                                             onHandleUpdate={this.handleInputWidgetUpdate}
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
                        </div>
                        <div className={'row'}>
                            <div className={'col-md-6 col-12'}>
                                <label htmlFor="buffer">Buffer</label>
                                <InputWidget id={'buffer'}
                                             initialValue={this.state.model.buffer}
                                             onHandleUpdate={this.handleInputWidgetUpdate}
                                             defaultUpdateValue={'0'}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className={'col-12 col-lg-6'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className={'row'}>
                                <div className={'col-12 list-title'}>
                                    Ingredients
                                </div>
                            </div>
                            <hr/>
                            <div className={'row'}>
                                <div className={'col-12 list-box'}>
                                    {this.state.model.ingredients &&

                                    this.state.model.ingredients.map((ingredient: any, index: number) => {
                                        return (
                                            <Fragment key={`recping_${index}`}>
                                                <div className={'row list-item'}>
                                                    <div className={'col-5'}>
                                                        {ingredient.base_ingredient.thistle_culinary_name}
                                                    </div>
                                                    <div className={'col-4'}>
                                                        <div className={'row'}>
                                                            <div className={'col-9'}>
                                                                <InputWidget id={`recping_amt_${ingredient.id}`}
                                                                             initialValue={ingredient.quantity}
                                                                             onHandleUpdate={this.handleUpdateAmount}
                                                                             defaultUpdateValue={0}
                                                                />
                                                            </div>
                                                            <div className={'col-2'}>
                                                                oz
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={'col-1'}>
                                                    </div>
                                                    <div className={'col-2'}>
                                                        <button className={'bg-danger text-white'}
                                                                onClick={() => this.handleRemoveIngredient(ingredient.id, ingredient.base_ingredient.thistle_culinary_name)}>-
                                                        </button>
                                                    </div>
                                                </div>
                                                <hr/>
                                            </Fragment>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={'col-12'}>
                            <div className={'row'}>
                                <div className={'col-12'}>
                                    <div className={'row'}>
                                        <div className={'col-12 list-title'}>
                                            Add Ingredient
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

const RecipeIngredientDisplay = (props: any) => {
    console.log(props)

};