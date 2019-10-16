import {RMModel} from '../base_classes/RMModel';

export class Recipe extends RMModel {
    public _resource = 'recipe';
    public _model = 'Recipe';

    public name: string = '';
    public slug: string = '';
    public version: string = '';
    public buffer: number = 0;
    public has_been_reviewed: boolean = false;

    //instructions = models.ForeignKey('RecipeInstructions', null=True, default=None, related_name='recipes')

    public constructor() {
        super();
        this.init();
    }
}

export class RecipeIngredient extends RMModel {
    public _resource = 'recipe';
    public _model = 'RecipeIngredient';

    public constructor() {
        super();
        this.init();
    }
}