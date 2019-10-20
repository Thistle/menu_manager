import {RMModelBase} from '../base_classes/RMModelBase';

export class Recipe extends RMModelBase {
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

export class RecipeIngredient extends RMModelBase {
    public _resource = 'recipe';
    public _model = 'RecipeIngredient';

    quantity: number = 0;
    recipe: any = null;
    base_ingredient: any = null;

    public constructor() {
        super();
        this.init();
    }
}