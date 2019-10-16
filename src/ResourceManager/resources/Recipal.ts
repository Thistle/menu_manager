import {RMModel} from '../base_classes/RMModel';

export class RecipalIngredient extends RMModel {
    public _resource = 'recipal';
    public _model = 'recipal_ingredient';

    public recipal_id: number = -1;
    public name: string = '';

    public constructor() {
        super();
        this.init();
    }
}

