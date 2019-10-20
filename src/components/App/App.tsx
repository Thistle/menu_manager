import React, {Component} from 'react';
import './App.css';
import {pushStateLocationPlugin, UIRouter, UIView} from "@uirouter/react";

import {Root} from "./Root";
import {Home} from "./Home";
import {Ingredient} from "../../ResourceManager/resources/Ingredient"
import RecipeEditor from "../recipe/RecipeEditor";
import IngredientEditor from "../ingredient/IngredientEditor";
import IngredientsBrowser from "../ingredient/IngredientBrowser";
import RecipeBrowser from "../recipe/RecipeBrowser";
import ComponentsBrowser from "../component/ComponentBrowser";
import ComponentEditor from "../component/ComponentEditor";

let states = [
    {
        name: 'root',
        url: '',
        component: Root
    },
    {
        name: 'root.home',
        url: '/home',
        component: Home
    },
    {
        name: 'root.home.ingredient_browser',
        url: '/ingredient',
        component: IngredientsBrowser,
        resolve: [{
            token: 'browse',
            resolveFn: () => {
                return ({
                    model: new Ingredient()
                })
            }
        }]
    },
    {
        name: 'root.home.ingredient_editor',
        url: '/ingredient/edit/:itemId',
        component: IngredientEditor
    },
    {
        name: 'root.home.recipe_browser',
        url: '/recipe',
        component: RecipeBrowser
    },
    {
        name: 'root.home.recipe_editor',
        url: '/recipe/edit/:itemId',
        component: RecipeEditor
    },
    {
        name: 'root.home.component_browser',
        url: '/component',
        component: ComponentsBrowser
    },
    {
        name: 'root.home.component_editor',
        url: '/component/edit/:itemId',
        component: ComponentEditor
    }
];

const plugins = [pushStateLocationPlugin];

const config = (router: any) => {
    router.urlRouter.otherwise("/home");
};

export default class App extends Component {

    render() {
        return (
            <div className={'fluid-container'}>
                <UIRouter plugins={plugins} states={states} config={config}>
                    <UIView/>
                </UIRouter>
            </div>
        );
    }
}

