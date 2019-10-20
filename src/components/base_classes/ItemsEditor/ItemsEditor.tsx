/*
    Base class for all editors.
    Extending class must provide an RMModelBase object in the constructor().
    Extending class must provide a formContent() to provide the actual content
    This class handles updating the provided RMModelBase object.
 */
import React, {Component, Fragment} from 'react';

export default class ItemsEditor<T> extends Component<any, any> {
    state: any;

    constructor(props: any, model: any, stateDefaults: any = {}) {
        super(props);
        this.state = {
            ...{
                item_id: props.$stateParams.itemId,
                model: model,
                is_loading: true,
                loading_extras: false
            },
            ...stateDefaults
        }
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

    updateProperty = (property: string, value: any) => {
        this.state.model.update({[property]: value})
            .then((r: any) => {
                //(this.state.model as any)[property] = value;
                this.setState({
                    model: this.state.model
                });
            });
    };

    handleInputWidgetUpdate = (id: string, value: any) => {
        this.updateProperty(id, value);
    };

    handleOnBlur = (e: any) => {
        console.log(e.target.id);
        e.preventDefault();
        this.updateProperty(e.target.id, e.target.value);
    };

    formContent = () => <div>implement formContent</div>;

    render() {
        if (this.state.is_loading || this.state.loading_extras) return (<div>Loading...</div>);

        return (
            <Fragment>
                {this.formContent()}
            </Fragment>
        )
    }
}