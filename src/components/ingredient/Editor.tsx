import React, {Component} from "react";
import {Allergen, Ingredient, Preparation} from "../../ResourceManager/resources/Ingredient";
import {RecipalIngredient} from "../../ResourceManager/resources/Recipal";
import InputWidget from "../widgets/InputWidget/InputWidget"

interface IIngredientEditorState {
    is_loading: boolean,
    model: any,
    allergens: Array<Number>,
    preparations: Array<Number>,
    recipal_ingredients: Array<any>
}

export default class IngredientEditor extends Component<any, IIngredientEditorState> {
    state: IIngredientEditorState;

    constructor(props: any) {
        super(props);
        this.state = {
            is_loading: true,
            model: props.model,
            allergens: [],
            preparations: [],
            recipal_ingredients: []
        };
    }

    handleOnChange = (e: any) => {
        e.preventDefault();
        this.props.updateProperty(e.target.id, e.target.value, false);
    };

    handleOnBlur = (e: any) => {
        e.preventDefault();
        this.props.updateProperty(e.target.id, e.target.value, true);
    };

    handleInputWidgetUpdate = (id: string, value: any) => {
        this.props.updateProperty(id, value, true);
    };

    handleAddAllergen = (e: any) => {
        e.preventDefault();
        const id = parseInt((document.getElementById('allergens') as any).value);
        if (!this.addAllergenToModel(id)) window.alert(`That allergen has already been added.`);
    };

    addAllergenToModel = (id: number): boolean => {
        if ((this.state.model as Ingredient).allergens.indexOf(id) > -1) return false;

        this.state.model.allergens.push(id);
        this.props.updateProperty('allergens', this.state.model.allergens);
        return true
    };

    handleRemoveAllergen = (allergen_id: number) => {
        if (!window.confirm('Are you sure you want to remove this allergen?')) return;
        this.removeAllergenFromModel(allergen_id);
    };

    removeAllergenFromModel = (allergen_id: number) => {
        console.log(allergen_id);
        const index = this.state.model.allergens.indexOf(allergen_id, 0);
        if (index > -1) {
            this.state.model.allergens.splice(index, 1);
        }
        this.props.updateProperty('allergens', this.state.model.allergens);
    };

    handleAddNewPreparation = (e: any) => {
        console.log(e);
        e.preventDefault();
        const preparation = (document.getElementById('new-preparation-InputWidget') as any).value;
        if (!this.addPreparation(preparation)) window.alert(`That preparation has already been added.`);
    };

    addPreparation = (new_preparation: string) => {
        const matches = this.state.preparations.filter((preparation: any) => {
            return preparation.description === new_preparation;
        });
        if (matches.length > 0) return false;
        this.setState({is_loading: true});
        new Preparation().objects.add({description: new_preparation})
            .then((added_preparation) => {
                    this.state.preparations.push(added_preparation);
                    this.setState({
                        is_loading: false,
                        preparations: this.state.preparations
                    })
                }
            );
        return true;
    };

    componentDidMount = () => {
        Promise.all([
            new Allergen().objects.all(),
            new Preparation().objects.all(),
            new RecipalIngredient().objects.all()
        ])
            .then((values) => {
                this.setState({
                    is_loading: false,
                    allergens: values[0].results,
                    preparations: values[1].results,
                    recipal_ingredients: values[2].results
                })
            })
    };

    render() {
        if (this.state.is_loading) return (<div>Loading...</div>);

        let allergen_names: any = {};
        const available_allergens = this.state.allergens.map((allergen: any) => {
            allergen_names[allergen.id] = allergen.name;
            return (<option key={`allergen_${allergen.id}`} value={allergen.id}>{allergen.name}</option>)
        });
        const attached_allergens = this.state.model.allergens.map((allergen: any) => {
            const allergen_name = allergen_names[allergen];
            return (
                <div className={'row list-item'} key={`${allergen_name}_allergen_option`}>
                    <div className={'col-10'}>
                        {allergen_name}
                    </div>
                    <div className={'col-2'}>
                        <button
                            className={'bg-danger text-white'}
                            onClick={() => this.handleRemoveAllergen(allergen)}
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
                <div className={'row list-item'} key={`${preparation.name}_preparation_option`}>
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
        const available_recipal_ingredients = this.state.recipal_ingredients.map((ingredient: any) =>
            <option key={`recipal_ingredient_${ingredient.id}`}
                    value={ingredient.id}>{ingredient.name}</option>);

        return (
            <div className={'row item-editor'}>
                <div className={'col-12'}>
                    <div className={'row'}>
                        <div className={'col-md-6 col-sm-12'}>
                            <form className={'form-group'}>
                                <div className={'row'}>
                                    <div className={'col-md-6 col-sm-12'}>
                                        <label htmlFor="thistle_culinary_name">Thistle Culinary Name</label>
                                        <InputWidget
                                            id={'thistle_culinary_name'}
                                            initial_value={this.props.model.thistle_culinary_name}
                                            onHandleUpdate={this.handleInputWidgetUpdate}
                                        />
                                    </div>
                                    <div className={'col-md-6 col-sm-12'}>
                                        <label htmlFor="menu_display_name">Menu Name</label>
                                        <InputWidget
                                            id={'menu_display_name'}
                                            initial_value={this.props.model.menu_display_name}
                                            onHandleUpdate={this.handleInputWidgetUpdate}
                                        />
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-md-6 col-sm-12'}>
                                        <label htmlFor="is_organic">Is Organic</label>
                                        <select value={this.props.model.is_organic}
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
                                        <select value={this.props.model.recipal_ingredient}
                                                className={'form-control'}
                                                id={`recipal_ingredient`}
                                                onChange={(e) => this.handleOnBlur(e)}>
                                            {
                                                available_recipal_ingredients
                                            }
                                        </select>
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
                                            <select className={'form-control'} id={'allergens'} name={'allergens'}>
                                                {
                                                    available_allergens
                                                }
                                            </select>
                                        </div>
                                        <div className={'col-2'}>
                                            <button className={'bg-success text-white'} id={'add_allergen_btn'}
                                                    onClick={(e) => this.handleAddAllergen(e)}>+
                                            </button>
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