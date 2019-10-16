import {RMModel} from '../base_classes/RMModel';

export class Ingredient extends RMModel {
    public _resource = 'ingredient';
    public _model = 'ingredient';

    public thistle_culinary_name: string = '';
    public menu_display_name: string = '';
    public is_organic: boolean = false;
    public recipal_ingredient: number | null = null;

    public allergens: any[] = [];
    public preparations: any[] = [];

    public constructor() {
        super();
        this.init();
    }

    public setForTesting(index: number = 1) {
        this.thistle_culinary_name = `culinary_name_${index}`;
        this.menu_display_name = `display_name_${index}`;
        this.is_organic = true;
        this.recipal_ingredient = 666;
        this.allergens = [101, 102];
        this.preparations = [201, 202];
    }
}

export class Allergen extends RMModel {
    public _resource = 'ingredient';
    public _model = 'allergen';

    public name: string = '';

    public constructor() {
        super();
        this.init();
    }
}

export class Preparation extends RMModel {
    public _resource = 'ingredient';
    public _model = 'preparation';

    public description: string = '';

    public constructor() {
        super();
        this.init();
    }
}