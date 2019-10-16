import React, {Component, Fragment} from 'react';
import {UIView, UIViewInjectedProps} from '@uirouter/react';

export class Root extends Component<UIViewInjectedProps> {
    render() {
        return (
            <Fragment>
                <UIView/>
            </Fragment>
        )
    }
}