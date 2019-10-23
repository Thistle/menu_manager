import React from "react";
import {Allergen, Ingredient, Preparation} from "../../ResourceManager/resources/Ingredient";
import {RecipalIngredient} from "../../ResourceManager/resources/Ingredient";
import InputWidget from "../widgets/InputWidget/InputWidget"
import ButtonWidget from "../widgets/ButtonWidget/ButtonWidget";
import ItemsEditor from "../base_classes/ItemsEditor/ItemsEditor";
import "./Ingredient.css";
import SearchAndSelectWidget from "../widgets/SearchAndSelectWidget/SearchAndSelectWidget";

export default class IngredientEditor extends ItemsEditor<any> {

    constructor(props: any) {
        super(props, new Ingredient(), {
            allergens: [],
            preparations: [],
            recipal_ingredients: [],
            add_allergen_btn_mode: 'active'
        });
    }

    handleButtonWidgetClicked = (target_element_id: string) => {
            if (target_element_id === 'available-allergens') {
                this.addAllergen();
            }else{
                window.alert(`Invalid button widget ID: ${target_element_id}`);
            }
    };

    addAllergen = () => {
        this.setState({add_allergen_btn_mode: 'disabled'});

        let id = parseInt((document.getElementById('available-allergens') as any).value);
        this.updateProperty('allergens', this.state.model.allergens.concat({id: id}))
            .then(() => {
                this.setState({add_allergen_btn_mode: 'active'});
            });
    };

    removeAllergen = (allergenIdToRemove: number) => {
        if (!window.confirm('Are you sure you want to remove this allergen?')) return;

        this.updateProperty('allergens', this.state.model.allergens.filter((allergen: any) => {
                                                        if (allergen.id !== allergenIdToRemove) return allergen }))
    };

    handleAddNewPreparation = (e: any) => {
        e.preventDefault();
        const preparation = (document.getElementById('new-preparation-InputWidget') as any).value;
        if (!this.addPreparation(preparation)) window.alert(`That preparation has already been added.`);
    };

    addPreparation = (new_preparation: string) => {
        const matches = this.state.preparations.filter((preparation: any) => {
            return preparation.description === new_preparation;});
        if (matches.length > 0) return false;

        this.setState({is_loading: true});
        new Preparation().objects.create({description: new_preparation})
            .then((added_preparation) => {
                    this.state.preparations.push(added_preparation);
                    this.setState({
                        is_loading: false,
                        preparations: this.state.preparations
                    })
                });

        return true;
    };

    updateRecipalIngredient = (id: number, modeNameN: any, value: any) => {
        this.updateProperty('recipal_ingredient', {id: id, name: value});
    };

    componentDidMount = () => {
        super.componentDidMount();

        Promise.all([
            new Allergen().objects.all(),
            new Preparation().objects.all(),
            new RecipalIngredient().objects.all()
        ])
            .then((values) => {
                this.setState({
                    loading_extras: false,
                    allergens: values[0].results,
                    preparations: values[1].results,
                    recipal_ingredients: values[2].results
                })
            })
            .catch((e: any) => {
                window.alert(`unable to load extras:\n\n${e}`)
            })
    };

    formContent = () => {
        const available_allergens = this.state.allergens.map((allergen: any) => {
            return (<option key={`allergen_${allergen.id}`} value={allergen.id}>{allergen.name}</option>)
        });

        const attached_allergens = this.state.model.allergens.map((allergen: any) => {
            return (
                <div className={'row list-item'} key={`${allergen.name}_allergen_option`}>
                    <div className={'col-10'}>
                        {allergen.name}
                    </div>
                    <div className={'col-2'}>
                        <button
                            className={'bg-danger text-white'}
                            onClick={() => this.removeAllergen(allergen.id)}
                        >
                            -
                        </button>
                    </div>
                </div>
            )
        });

        const available_preparations = this.state.preparations.map((preparation: any) =>
            <option key={`preparation_${preparation.id}`}
                    value={preparation.id}>{preparation.description}</option>);

        const attached_preparations = this.state.model.preparations.map((preparation: any) => {
            return (
                <div className={'row list-item'} key={`attached_preparation_${preparation.id}`}>
                    <div className={'col-10'}>
                        {preparation.name}
                    </div>
                    <div className={'col-2'}>
                        <button
                            className={'bg-danger text-white'}
                        >
                            -
                        </button>
                    </div>
                </div>
            )
        });

        return (
            <div className={'row item-editor'}>
                <div className={'col-12'}>
                    <div className={'row'}>
                        <div className={'col-md-6 col-sm-12'}>
                            <form className={'form-group'}>
                                <div className={'row'}>
                                    <div className={'col-md-6 col-sm-12'}>
                                        <label htmlFor="thistle_culinary_namex">Thistle Culinary Name</label>
                                        <InputWidget
                                            id={'thistle_culinary_name'}
                                            initialValue={this.state.model.thistle_culinary_name}
                                            onUpdate={this.handleInputWidgetUpdate}
                                        />
                                    </div>
                                    <div className={'col-md-6 col-sm-12'}>
                                        <label htmlFor="menu_display_name">Menu Name</label>
                                        <InputWidget
                                            id={'menu_display_name'}
                                            initialValue={this.state.model.menu_display_name}
                                            onUpdate={this.handleInputWidgetUpdate}
                                        />
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-md-6 col-sm-12'}>
                                        <label htmlFor="is_organic">Is Organic</label>
                                        <select value={this.state.model.is_organic}
                                                className={'form-control'}
                                                id={`is_organic`}
                                                name={'is_organic'}
                                                onChange={(e) => this.handleOnBlur(e)}
                                        >
                                            <option value={'false'}>No</option>
                                            <option value={'true'}>Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-12'}>
                                        <label htmlFor="recipal_ingredient">Recipal Ingredient</label>
                                        <input id={'recipal-ingredient'}
                                               className={'form-control disabled'}
                                               disabled={true}
                                               value={(this.state.model.recipal_ingredient !== null)? this.state.model.recipal_ingredient.name:''}
                                        />
                                        <SearchAndSelectWidget id={'recipal-ingredient-sas'}
                                                               searchModels={[
                                                                   {
                                                                       model: new RecipalIngredient(),
                                                                       displayField: 'name'
                                                                   }]}
                                                               onSelect={this.updateRecipalIngredient}
                                        />
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className={'col-md-3 col-12'}>
                            <div className={'row'}>
                                <div className={'col-12'}>
                                    <div className={'row'}>
                                        <div className={'col-12 list-title'}>
                                            Allergens:
                                        </div>
                                    </div>
                                    <div className={'row'}>
                                        <div className={'col-10 '}>
                                            <select className={'form-control'} id={'available-allergens'}
                                                    name={'allergens'}>
                                                {
                                                    available_allergens
                                                }
                                            </select>
                                        </div>
                                        <div className={'col-2'}>
                                            <ButtonWidget
                                                id={'add-allergen-btn'}
                                                label={'+'}
                                                onClickHandler={this.handleButtonWidgetClicked}
                                                classes={'bg-success text-white'}
                                                mode={this.state.add_allergen_btn_mode}
                                                target_element_id={'available-allergens'}
                                            />

                                        </div>
                                    </div>
                                    <hr/>
                                    <div className={'row'}>
                                        <div className={'col-sm-12 list-box'} id={'allergens-list'}>
                                            {
                                                attached_allergens
                                            }
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            </div>
                        </div>
                        <div className={'col-md-3 col-12'}>
                            <div className={'row'}>
                                <div className={'col-12'}>
                                    <div className={'row'}>
                                        <div className={'col-12 list-title under-construction'}>
                                            Preparations:
                                        </div>
                                    </div>
                                    <div className={'row'} id={'new-preparation'}>
                                        <div className={'col-10'}>
                                            <input className={'form-control'} placeholder={'Add New Preparation'}
                                                   id={'new-preparation-InputWidget'}/>
                                        </div>
                                        <div className={'col-2'}>
                                            <button
                                                className={'bg-success text-white'}
                                                onClick={(e) => this.handleAddNewPreparation(e)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className={'row under-construction'}>
                                        <div className={'col-10 '}>
                                            <div className={'row'}>
                                                <div className={'col-7'}>
                                                    <select className={'form-control'} id={'available-preparations'}
                                                            name={'preparations'}>
                                                        {
                                                            available_preparations
                                                        }
                                                    </select>
                                                </div>
                                                <div className={'col-5'}>
                                                    <input type={'number'} className={'form-control'}
                                                           placeholder={'Yield'}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={'col-2'}>
                                            <button className={'bg-success text-white'}>+</button>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className={'row under-construction'}>
                                        <div className={'col-sm-12 list-box'} id={'preparations-list'}>
                                            {
                                                attached_preparations
                                            }
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}