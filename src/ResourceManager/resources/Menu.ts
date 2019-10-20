import {IModel, RMModelBase} from '../base_classes/RMModelBase';

interface IMenuItem extends IModel {
    name: string;
}

export class Menu extends RMModelBase implements IMenuItem {
    public _resource: string = 'menu';
    public _model = 'Menu';

    name: string = '';

}

export class Meal extends RMModelBase implements IMenuItem {
    public _resource = 'menu';
    public _model = 'Meal';

    name: string = '';
}

export class Component extends RMModelBase implements IMenuItem {
    public _resource = 'menu';
    public _model = 'Component';

    name: string = '';

    public constructor() {
        super();
        this.init();
    }

}