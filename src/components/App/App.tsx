import React, {Component} from 'react';
import './App.css';
import {pushStateLocationPlugin, UIRouter, UIView} from "@uirouter/react";

import {Root} from "./Root";
import {Home} from "./Home";
import RecipeEditor from "../recipe/RecipeEditor";
import IngredientEditor from "../ingredient/IngredientEditor";
import IngredientsBrowser from "../ingredient/IngredientBrowser";
import RecipeBrowser from "../recipe/RecipeBrowser";
import MealsBrowser from "../meal/MealBrowser";
import MealEditor from "../meal/MealEditor";

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
        component: IngredientsBrowser
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
        name: 'root.home.meal_browser',
        url: '/meal',
        component: MealsBrowser
    },
    {
        name: 'root.home.meal_editor',
        url: '/meal/edit/:itemId',
        component: MealEditor
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

