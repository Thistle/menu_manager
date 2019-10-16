import React, {Fragment} from "react";
import {UISref} from "@uirouter/react";

export default (props: any) => {
    return (
        <Fragment>
            <div className={'row browser-headers'}>
                <div className={'col-5'}>Culinary Name</div>
                <div className={'col-4'}>Display Name</div>
            </div>
            <div className={'row'}>
                <div className={'col-12 browser-content'}>
                    {
                        Object.keys(props.list).map(key => {
                            return (
                                <UISref to={'root.home.ingredient_editor'} params={{itemId: props.list[key].id}}
                                        key={`${key}_browse_item`}>
                                    <div className={'row browser-list-line'}>
                                        <div className={'col-5'}>
                                            {props.list[key].thistle_culinary_name}
                                        </div>
                                        <div className={'col-4'}>
                                            {props.list[key].menu_display_name}
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