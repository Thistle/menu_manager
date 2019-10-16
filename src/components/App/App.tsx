import React, {Component} from 'react';
import './App.css';
import {pushStateLocationPlugin, UIRouter, UIView} from "@uirouter/react";

import {Root} from "./Root";
import {Home} from "./Home";
import {Ingredient} from "../../ResourceManager/resources/Ingredient"
import ItemsBrowser from "../ItemsBrowser/ItemsBrowser"
import ItemsEditor from "../ItemsEditor/ItemsEditor"
import {Recipe} from "../../ResourceManager/resources/Recipe";

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
        component: ItemsBrowser,
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
        component: ItemsEditor,
        resolve: [{
            token: 'edit',
            resolveFn: () => {
                return ({
                    model: new Ingredient()
                })
            }
        }]
    },
    {
        name: 'root.home.recipe_browser',
        url: '/recipe',
        component: ItemsBrowser,
        resolve: [{
            token: 'browse',
            resolveFn: () => {
                return ({
                    model: new Recipe()
                })
            }
        }]
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

