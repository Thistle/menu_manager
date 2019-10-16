import React, {Fragment} from "react";

export default (props: any) => {
    return (
        <Fragment>
            {
                Object.keys(props.list).map(key => {
                    return (
                        <div className={'col-3'} key={`${key}_key`}>
                            {props.list[key].name}
                        </div>
                    )
                })
            }
        </Fragment>
    )
}