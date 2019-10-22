/*
    Used for browsing given RMModelBase objects. Used at '/home/{modelName}'
    Extending class passes the RMModelBase during constructor().
    Extending class must provide a formContent() to format list of objects.
 */

import React, {Component, Fragment} from 'react';
import AddItemWidget from "../../widgets/AddItem/AddItemWidget";
import InputWidget from "../../widgets/InputWidget/InputWidget";

export default class ItemsBrowser<T> extends Component<any, any> {
    private search_limit: number = 25;
    state: any;
    add_item_name = 'name';

    constructor(props: any, model: any, stateDefaults: any = {}) {
        super(props);
        this.state = {
            ...{
                model: model,
                is_loading: true,
                list: [],
                pagination: {
                    pages: 0,
                    page: 0
                }
            },
            ...{stateDefaults}
        };
    }

    componentDidMount = () => {
        this.doSearch();
    };

    handleOnSearch = (element_id: string, value: string) => {
        this.doSearch(value);
    };

    doSearch = (searchPattern: string = '', page: number = 1, offset: number = 0, limit: number = this.search_limit) => {
        this.state.model.objects.search(searchPattern, {limit: limit, page: page, offset: offset})
            .then((response: any) => {
                this.setState({
                    is_loading: false,
                    list: response.results,
                    pagination: {
                        page: 1,
                        pages: response.count / limit
                    }
                })
            });
    };

    formContent = () => <div>implement getFormContent</div>;

    handlePageChange = (new_page: any) => {
        this.doSearch('', new_page, (new_page - 1) * this.search_limit)
    };

    render() {
        if (this.state.is_loading) return (<div>Loading...</div>);

        return (
            <Fragment>
                <div id={'items-browser'} className={'col-12'}>
                    <div className={'row'}>
                        <div className={'col-12 col-md-6'}>
                            <div className={'browser-title'}>
                                {this.state.model._model.charAt(0).toUpperCase() + this.state.model._model.slice(1)}s
                            </div>
                        </div>
                        <div className={'col-12 col-md-6'}>
                            <AddItemWidget model={this.state.model} itemNameField={this.add_item_name}/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <InputWidget
                            id={'search-bar'}
                            initialValue={''}
                            onUpdate={this.handleOnSearch}
                            placeholder={`Search ${this.state.model.modelName}s`}
                        />
                    </div>
                    {/*<ResultsPagePicker pagination={this.state.pagination} changePage={this.handlePageChange}/>*/}
                </div>
                <Fragment>
                    {this.formContent()}
                </Fragment>
            </Fragment>
        )

    }
}