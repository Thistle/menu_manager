import React from 'react';
import {UISref} from "@uirouter/react";

export default () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="navbar-brand">Thistle Menu Monkey</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <UISref className="nav-link" to="/menu">
                            <div>Menus</div>
                        </UISref>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <UISref className="nav-link" to="/meal">
                            <div>Meals</div>
                        </UISref>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <UISref className="nav-link" to="/component">
                            <div>Components</div>
                        </UISref>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <UISref className="nav-link" to=".recipe_browser"><p>Recipes</p></UISref>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <UISref className="nav-link" to=".ingredient_browser"><p>Ingredients</p></UISref>
                    </li>
                </ul>
            </div>
        </nav>
    );
}