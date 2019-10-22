import React, {Fragment} from "react";
import {UISref} from "@uirouter/react";
import ItemsBrowser from "../base_classes/ItemsBrowser/ItemsBrowser";
import {Recipe} from "../../ResourceManager/resources/Menu";

export default class RecipeBrowser extends ItemsBrowser<any> {
    constructor(props: any) {
        super(props, new Recipe());
    }

    formContent = () => (
        <Fragment>
            <div className={'row browser-headers'}>
                <div className={'col-9'}>Name</div>
                <div className={'col-1'}>version</div>
                <div className={'col-1'}>buffer</div>
                <div className={'col-1'}>reviewed</div>
            </div>
            <div className={'row'}>
                <div className={'col-12 browser-content'}>
                    {
                        Object.keys(this.state.list).map(key => {
                            return (
                                <UISref to={'root.home.recipe_editor'} params={{itemId: this.state.list[key].id}}
                                        key={`${key}_browse_item`}>
                                    <div className={'row browser-list-line'}>
                                        <div className={'col-9'}>
                                            {this.state.list[key].name}
                                        </div>
                                        <div className={'col-1'}>
                                            {this.state.list[key].version}
                                        </div>
                                        <div className={'col-1'}>
                                            {this.state.list[key].buffer}
                                        </div>
                                        <div className={'col-1'}>
                                            {this.state.list[key].reviewed}
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