import {IModel, RMModelBase} from '../base_classes/RMModelBase';

interface IInventory extends IModel {
    order_name: string;
}

export class InventoryPackaging extends RMModelBase {
    public _resource: string = 'inventory';
    public _model = 'inventorypackaging';

    is_cupping: boolean = false;
    weight: number = 0;


    public constructor() {
        super();
        this.init();
    }
}