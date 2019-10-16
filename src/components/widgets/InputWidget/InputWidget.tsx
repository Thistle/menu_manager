import React, {Component} from 'react';

interface IState {
    current_value: string;
}

export default class InputWidget extends Component<any, IState> {
    state: IState;
    input_element: any = document.getElementsByClassName('iw');
    timer: any;

    constructor(props: any) {
        super(props);
        this.state = {
            current_value: props.initial_value
        };
    };

    handleOnKeyPress = (e: any) => {
        this.resetTimer();
        if (e.keyCode === 13) this.sendUpdate();
    };

    handleOnChange = (e: any) => {
        this.setState({
            current_value: e.target.value
        });
    };

    sendUpdate = () => {
        if (this.state.current_value !== this.props.initial_value) {
            this.props.onHandleUpdate(this.props.id, this.state.current_value);
            clearInterval(this.timer);
        }
    };

    resetTimer = () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.sendUpdate, 3000)
    };

    render() {
        return (
            <div className={'row input-widget'}>
                <div className={'col-12'}>
                    <input className={'form-control iw'}
                           id={this.props.id}
                           placeholder={this.props.placeholder}
                           value={this.state.current_value}
                           onBlur={() => this.sendUpdate()}
                           onChange={(e) => this.handleOnChange(e)}
                           onKeyDown={(e) => this.handleOnKeyPress(e)}
                    />
                </div>
            </div>
        )
    }
}