import React, {Component, Fragment} from 'react';
import IngredientEditor from '../ingredient/Editor';
import {RMModel} from "../../ResourceManager/base_classes/RMModel";

interface IItemSearchState {
    item_id: number,
    model: RMModel,
    is_loading: boolean
}

export default class ItemsEditor extends Component<any, IItemSearchState> {
    private search_limit: number = 25;

    state: IItemSearchState;


    constructor(props: any) {
        super(props);
        this.state = {
            item_id: props.$stateParams.itemId,
            model: props.edit.model,
            is_loading: true
        };
    }

    componentDidMount() {
        this.state.model.load(this.state.item_id).then((response: any) => {
                this.setState({
                    model: this.state.model,
                    is_loading: false
                })
            }
        )
    };

    updateProperty = (property: string, value: any, save: boolean = true) => {
        console.log(value);
        (this.state.model as any)[property] = value;
        this.setState({
            model: this.state.model
        });
        if (save && this.state.model.hasUnsavedUpdates) this.state.model.save();
    };

    render() {
        if (this.state.is_loading) return (<div>Loading...</div>);

        let EditorContent;
        switch (this.state.model._model) {
            case 'ingredient':
                EditorContent = <IngredientEditor model={this.state.model} updateProperty={this.updateProperty}/>;
                break;
        }

        return (
            <Fragment>
                <div className={'col-12'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <h1>Edit {this.state.model._model.charAt(0).toUpperCase() + this.state.model._model.slice(1)}</h1>
                        </div>
                    </div>
                    <div className={'row '} id={'editor-content'}>
                        {EditorContent}
                    </div>
                </div>
            </Fragment>
        )
    }
}