import React, {Component} from 'react';
import {UIView, UIViewInjectedProps} from '@uirouter/react';
import Navigator from './Navigator';

export class Home extends Component<UIViewInjectedProps> {

    render() {
        return (
            <div className={'home'}>
                <Navigator/>
                <UIView/>
            </div>
        )
    }
}