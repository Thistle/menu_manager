import React, {Component} from 'react';

export default class AddItemWidget extends Component <any, any> {
    state: any;

    constructor(props: any){
        super(props);
        this.state = {
            response_text: ''
        }
    }
    HandelAddItem = (e: any) => {

    };

    createNewItem = () => {

    };

    render(){
        return(
            <div className={'row'}>
                <div className={'col-12'}>
                    <div className={'row'}>
                        <div className={'col-11'}>
                            <input
                                id={'add-item-input'}
                                placeholder={`Add ${this.props.model.modelName.charAt(0).toUpperCase() + this.props.model.modelName.slice(1)}`}
                                />
                        </div>
                        <div className={'col-1'}>
                            <button
                                id={'add-item-btn'}
                                className={'bg-success text-white'}
                                onClick={(e) => this.HandelAddItem(e)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className={'row'}>

                    </div>
                </div>
            </div>
        )
    }
}