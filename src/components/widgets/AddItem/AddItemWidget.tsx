/*
    Can be placed on any page to allow ability to create a new API model.

    <AddItemWidget  model: RMModelBase object
                    itemNameField: every RMModelBase needs at least 1 field to create the model. This is the field in the
                                    RMModelBase that should receive the name entered into the INPUT.
                    />
    If a new model is successfully created, redirects to '/home/{modelName}/edit/{id of new model}'
 */
import React, {Component} from 'react';
import {RMModelBase} from "../../../ResourceManager/base_classes/RMModelBase";
import ButtonWidget from "../ButtonWidget/ButtonWidget";

interface IProps {
    model: RMModelBase,
    itemNameField: string
}

interface IState {
    response_text: string,
    button_mode: string
}

export default class AddItemWidget extends Component <IProps, IState> {
    state: any;
    input_element: any = document.getElementsByClassName('aiwi');

    constructor(props: any) {
        super(props);
        this.state = {
            response_text: '',
            button_mode: 'active'
        };
    }

    createNewItem = (e: any) => {
        if (this.input_element[0].value === '') return;
        this.setState({button_mode: 'disabled'});
        (this.props.model as RMModelBase).objects.create({
            [this.props.itemNameField]: this.input_element[0].value
        })
            .then((response) => {
                window.location.href = `/home/${this.props.model.modelName}/edit/${response.id}`;
            })
            .catch((error) => {
                console.log(error.status);
                let error_message: string = 'Unknown Reason';
                if (error.status === 400) error_message = `An entry with that name already exists.`;
                window.alert(`Error:\n${error_message}`);
                this.setState({button_mode: 'active'});
            })
    };

    render() {
        return (
            <div className={'row'}>
                <div className={'col-12'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <input
                                className={'aiwi'}
                                id={'add-item-input'}
                                placeholder={`Add ${this.props.model.modelName.charAt(0).toUpperCase() + this.props.model.modelName.slice(1)}`}
                            />
                            <ButtonWidget
                                id={'add-item-btn'}
                                label={'+'}
                                onClickHandler={this.createNewItem}
                                classes={'bg-success text-white'}
                                mode={this.state.button_mode}
                            />
                        </div>
                    </div>
                    <div className={'row'}>

                    </div>
                </div>
            </div>
        )
    }
}