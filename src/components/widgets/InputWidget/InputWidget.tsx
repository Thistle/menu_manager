/*
    Provides an INPUT field.
    Provides updated text when:
        The user has stopped typing for 750ms, hits 'ENTER' or the INPUT field loses focus
        The text has changed since last time an update was sent

    <InputWidget    initialValue: starting value
                    defaultUpdateValue: if the INPUT field is empty, this value will be returned instead.
                    onHandleUpdate: callback when there is new text
                    placeholder: text for PLACEHOLDER property on INPUT
                    type: not yet implemented

    returns     id: value of ID sent through props
                value: string
 */

import React, {Component} from 'react';

interface IState {
    currentValue: string;
    defaultUpdateValue: string;
}

interface IProps {
    id: string,
    initialValue?: string
    onHandleUpdate: any,
    placeholder?: string,
    type?: string
    defaultUpdateValue?: any
}

//todo: get type='number' to work

export default class InputWidget extends Component<IProps, IState> {
    state: IState;
    timer: any;
    type: string;
    lastSavedValue: string | null = null;

    constructor(props: any) {
        super(props);
        this.state = {
            currentValue: (typeof props.initialValue !== 'undefined') ? props.initialValue : '',
            defaultUpdateValue: props.defaultUpdateValue
        };
        this.type = (typeof this.props.type !== 'undefined') ? this.props.type : 'text';
    };

    handleOnKeyPress = (e: any) => {
        this.resetTimer();
        if (e.keyCode === 13) this.sendUpdate();
    };

    handleOnChange = (e: any) => {
        this.setState({
            currentValue: e.target.value
        });
    };

    sendUpdate = () => {
        if (this.state.currentValue !== this.lastSavedValue) {
            this.lastSavedValue = this.state.currentValue;
            let value = this.state.currentValue;
            if (this.state.defaultUpdateValue !== '' && value === '') value = this.state.defaultUpdateValue;
            this.props.onHandleUpdate(this.props.id, value);
            clearInterval(this.timer);
        }
    };

    resetTimer = () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.sendUpdate, 750)
    };

    render() {
        return (
            <div className={'row input-widget'}>
                <div className={'col-12'}>
                    <input
                        className={'form-control iw'}
                        id={this.props.id}
                        placeholder={this.props.placeholder}
                        value={this.state.currentValue}
                        onBlur={() => this.sendUpdate()}
                        onChange={(e) => this.handleOnChange(e)}
                        onInput={(e) => this.handleOnChange(e)}
                        onKeyUp={(e) => this.handleOnChange(e)}
                        onKeyDown={(e) => this.handleOnKeyPress(e)}
                    />
                </div>
            </div>
        )
    }
}