import {IModel, RMModel} from '../base_classes/RMModel';

interface IMenuItem extends IModel {
    name: string;
}

export class Menu extends RMModel implements IMenuItem {
    public _resource: string = 'menu';
    public _model = 'Menu';

    name: string = '';

}

export class Meal extends RMModel implements IMenuItem {
    public _resource = 'menu';
    public _model = 'Meal';

    name: string = '';
}

export class Component extends RMModel implements IMenuItem {
    public _resource = 'menu';
    public _model = 'Component';

    name: string = '';

    public constructor() {
        super();
        this.init();
    }

}