import React, {Fragment} from "react";
import {UISref} from "@uirouter/react";
import ItemsBrowser from "../base_classes/ItemsBrowser/ItemsBrowser";
import {Ingredient} from "../../ResourceManager/resources/Ingredient";

export default class IngredientsBrowser extends ItemsBrowser<any> {
    constructor(props: any) {
        super(props, new Ingredient());
        this.add_item_name = 'thistle_culinary_name';
    }

    formContent = () => {
        return (
            <Fragment>
                <div className={'row browser-headers'}>
                    <div className={'col-5'}>Culinary Name</div>
                    <div className={'col-4'}>Display Name</div>
                </div>
                <div className={'row'}>
                    <div className={'col-12 browser-content'}>
                        {
                            Object.keys(this.state.list).map(key => {
                                return (
                                    <UISref to={'root.home.ingredient_editor'}
                                            params={{itemId: this.state.list[key].id}}
                                            key={`${key}_browse_item`}
                                    >
                                        <div className={'row browser-list-line'}>
                                            <div className={'col-5'}>
                                                {this.state.list[key].thistle_culinary_name}
                                            </div>
                                            <div className={'col-4'}>
                                                {this.state.list[key].menu_display_name}
                                            </div>
                                        </div>
                                    </UISref>
                                )
                            })
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}