/*
    Provides a mutable button.

    <ButtonWidget   id: applied to BUTTON property ID
                    classes: string to add to the BUTTON CLASSNAME property
                    label: text displayed in the button
                    onClickHandler: callback
                    mode: 'active' / 'disabled'
                    target_element_id: This ID can be used to identify what element this button is related to.
                    />
 */

import React, {Component} from 'react';

interface IProps {
    id: string,
    classes?: string,
    label: string
    onClickHandler: any,
    mode: string,
    target_element_id?: string
}

export default class ButtonWidget extends Component <IProps, any> {

    constructor(props: IProps) {
        super(props);
    }

    handleOnClick = (e: any) => {
        e.preventDefault();
        this.props.onClickHandler(this.props.target_element_id)
    };

    render() {
        return (
            <button
                id={this.props.id}
                className={`${this.props.classes} ${this.props.mode}`}
                onClick={(e) => this.handleOnClick(e)}
            >
                {this.props.label}
            </button>
        )
    }
}
