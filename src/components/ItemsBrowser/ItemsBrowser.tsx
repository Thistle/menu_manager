import React, {Component, Fragment} from 'react';
import IngredientBrowser from '../ingredient/Browser';
import ResultsPagePicker from '../ResultsPagePicker/ResultsPagePicker'

interface IItemSearchState {
    model: any,
    list: [],
    is_loading: boolean,
    pagination: {
        pages: number,
        page: number
    }
}

export default class ItemsBrowser extends Component<any, IItemSearchState> {
    private search_limit: number = 25;

    state: IItemSearchState;


    constructor(props: any) {
        super(props);
        this.state = {
            model: props.browse.model!,
            is_loading: true,
            list: [],
            pagination: {
                pages: 0,
                page: 0
            }
        };
    }

    componentDidMount = () => {
        this.doSearch();
    };

    doSearch = (search: string = '', page: number = 1, offset: number = 0, limit: number = this.search_limit) => {
        this.state.model.objects.search({search: search, limit: limit, page: page, offset: offset})
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

    handlePageChange = (new_page: any) => {
        this.doSearch('', new_page, (new_page - 1) * this.search_limit)
    };

    render() {
        if (this.state.is_loading) return (<div>Loading...</div>);

        let BrowserContent;
        switch (this.state.model._model) {
            case 'ingredient':
                BrowserContent = <IngredientBrowser list={this.state.list}/>;
                break;
            case 'recipe':
                BrowserContent = <IngredientBrowser/>;
                break;
        }

        return (
            <Fragment>
                <div className={'col-12'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className={'browser-title'}>
                                {this.state.model._model.charAt(0).toUpperCase() + this.state.model._model.slice(1)}s
                            </div>
                        </div>
                    </div>
                    <ResultsPagePicker pagination={this.state.pagination} changePage={this.handlePageChange}/>
                </div>

                {BrowserContent}
            </Fragment>
        )

    }
}