import {RMModelBase} from '../base_classes/RMModelBase';

export class RecipalIngredient extends RMModelBase {
    public _resource = 'recipal';
    public _model = 'recipalIngredient';

    public recipal_id: number = -1;
    public name: string = '';

    public constructor() {
        super();
        this.init();
    }
}

