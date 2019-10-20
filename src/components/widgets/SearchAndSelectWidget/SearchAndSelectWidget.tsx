/*
    This widget combines an InputWidget with a list area that allows the consumer to search 1 or more RMmodels.
    Can search multiple RMModels
        <SearchAndSelectWidget searchModels={[
                                                {
                                                    model: new Recipe(),
                                                    displayField: 'name'
                                                 },
                                                 {
                                                    model: new Ingredient,
                                                    displayField: 'thistle_culinary_name'
                                                 }
                                             ]};
    <SearchAndSelectWidget  id: this will be applied to the ID property on the INPUT
                            searchModels: array of RMModels to search
                            onSelect: callback when item is selected
                            placeholder: placeholder for the INPUT
    returns     id: number
                model: from RMModelBase.modelName
                value: string

 */
import React, {Component} from 'react';
import InputWidget from "../InputWidget/InputWidget";

interface IProps {
    id: string,
    searchModels: any [],
    onSelect: any
    placeholder?: string;
}

export default class SearchAndSelectWidget extends Component<IProps, any> {
    state: any;

    constructor(props: any) {
        super(props);
        this.state = {
            isSearching: false,
            list: []
        };
    }

    handleInputWidgetUpdated = (id: string, searchPattern: string) => this.search(searchPattern);

    search = (searchPattern: String) => { /* id is for compatibility with callback from InputWidget */
        this.setState({isSearching: true});
        Promise.all(this.props.searchModels.map((searchModel: any) => searchModel.model.objects.search(searchPattern)))
            .then((values) => {
                let list: any [] = [];
                for (let x = 0; x < this.props.searchModels.length; x++)
                    list = list.concat(this.buildListFromResults(values[x].results, this.props.searchModels[x]));

                this.setState({
                    isSearching: false,
                    list: list
                });
            })
    };

    buildListFromResults = (list: any [], searchModel: any) => {
        return list.map((result: any, index: any) => {
            return (
                <div className={'row'} key={`sas_${searchModel.model.modelName}_${index}`}>
                    <div className={'col-12 browser-list-line'}
                         onClick={() => this.props.onSelect(result.id, searchModel.model.modelName, result[searchModel.displayField])}>
                        {result[searchModel.displayField]}
                    </div>
                </div>
            )
        });
    };

    componentDidMount = () => {
        this.search('');
    };

    render() {
        return (
            <div className={`row IngredientSAS`}>
                <div className={'col-12'} id={this.props.id}>
                    <InputWidget id={'ingredientSAS-input'}
                                 placeholder={(typeof this.props.placeholder !== 'undefined') ? this.props.placeholder : ''}
                                 onHandleUpdate={this.handleInputWidgetUpdated}/>
                    <div className={'row IngredientSAS-list'} style={{height: '200px'}}>
                        <div className={'col-12'}>
                            {!this.state.isSearching
                            &&
                            <div>{this.state.list}</div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}