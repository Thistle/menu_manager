import {IModel, RMModelBase} from '../base_classes/RMModelBase';

interface IMenuItem extends IModel {
}

export class Meal extends RMModelBase implements IMenuItem {
    public _resource = 'menu';
    public _model = 'Meal';

    name: string = '';
    slug: string = '';
    description: string = '';
    kitchen_instructions: string = '';
    heating_instructions: string = '';
    servings: number = 0;
    suggested_serving: number = 0;
    start_date: string = '';
    end_date: string = '';
    customer_photo: string = '';
    plating_photo: string = '';

    type: number = 0; //choices=((0, '---'), (1, 'salad'), (2, 'soup'), (3, 'breakfast'),(4, 'lunch'), (5, 'dinner'), (6, 'snack')))
    container: number = 0;

    public constructor() {
        super();
        this.init();
    }


}

export class Component extends RMModelBase implements IMenuItem {
    public _resource = 'menu';
    public _model = 'Component';

    serving_amount: number = 0.0;
    container: any = null;
    recipe: any = null;
    kitchen_instructions: string = '';
    meal: any = null;

    public constructor() {
        super();
        this.init();
    }

}

export class Recipe extends RMModelBase {
    public _resource = 'recipe';
    public _model = 'Recipe';

    public name: string = '';
    public slug: string = '';
    public version: string = '';
    public buffer: number = 0.0;
    public has_been_reviewed: boolean = false;
    public suggested_serving: number = 1;
    public suggested_serving_unit:number = 0;  //choices=((0, 'oz'), (1, 'ea'), (2, 'fl oz')))
    public consumption_yield: number = 0.0;
    public servings: number = 0.0;
    public recipal_results: string = '';

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