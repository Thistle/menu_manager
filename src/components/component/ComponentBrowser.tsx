import React, {Fragment} from "react";
import {UISref} from "@uirouter/react";
import ItemsBrowser from "../base_classes/ItemsBrowser/ItemsBrowser";
import {Component} from "../../ResourceManager/resources/Menu";

export default class ComponentsBrowser extends ItemsBrowser<any> {

    constructor(props: any) {
        super(props, new Component());
    }

    formContent = () => {
        return (
            <Fragment>
                <div className={'row browser-headers'}>
                    <div className={'col-4'}>Component Name</div>
                    <div className={'col-8'}>Recipe Name</div>
                </div>
                <div className={'row'}>
                    <div className={'col-12 browser-content'}>
                        {
                            Object.keys(this.state.list).map(key => {
                                return (
                                    <UISref to={'root.home.component_editor'}
                                            params={{itemId: this.state.list[key].id}}
                                            key={`${key}_browse_item`}
                                    >
                                        <div className={'row browser-list-line'}>
                                            <div className={'col-5'}>
                                                {this.state.list[key].name}
                                            </div>
                                            <div className={'col-4'}>
                                                {this.state.list[key].recipe.name}
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