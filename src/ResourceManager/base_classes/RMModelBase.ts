/*
    This is the base class for all resource models.
    Provides functionality for loading, saving and managing model data
    RMModelBase objects can be handled similarly to Django models in your code.
    Any functionality that involves communicating with the API will return a promise. ex;

        RMModelObject.update({name: 'new_name})
            .then((response: any) => {
                this.setState({model: this.state.model}) <== IMPORTANT, after updating the model, setState() must be
            })                                                  called to trigger the updates in your GUI.
            .catch((response: any) => response
 */
import Service from './Service';

export interface IModel {
    readonly id?: number;
    readonly date_created?: string;
    readonly last_updated?: string;
    readonly last_updated_by?: string;

    soft_lock?: boolean;
}

export abstract class RMModelBase {
    public id: number = -1;

    // Any private and protected properties MUST begin with '_'.
    protected abstract _resource: string = '';
    protected abstract _model: string = '';

    private _objects: ObjectsManager = new ObjectsManager();
    private _service: Service = new Service();
    private _start_data: any = this.getRawModel(this);
    private _has_loaded: boolean = false;// todo: get rid of this. Test ID instead
    private _in_test_mode: boolean = false;
    private _is_new: boolean = false; // is used by applications to know if the instance is a placeholder while user creates initial data

    // the name expected by the API.
    public get modelName(): string {
        return this._model.toLowerCase();
    }

    public get objects(): ObjectsManager {
        return this._objects;
    }

    public get hasUnsavedUpdates(): boolean {
        return (JSON.stringify(this.getRawModel(this)) !== JSON.stringify(this._start_data))
    }

    // the most currently loaded/saved model values.
    public get startData(): any {
        return this._start_data
    }

    public get isNew(): boolean{
        return this._is_new
    }

    public constructor() {
    }

    public setTestModelProperties(properties: any) {
        this._in_test_mode = true;
        this.synthesize(properties);
    }

    public load(id: number = -1): Promise<any> {
        if (this._has_loaded) return Promise.reject({error: 'cannot_be_reloaded'});
        if (id !== -1){// loading existing model
            return this._service.get(this.getURL(`${id}/`))
            .then((response: any) => {
                this._is_new = true;
                return (this.synthesize(response));
            })
        }else{
            return this.objects.create(this.getRawModel(this))
                .then((resp: any) => {
                    return this.synthesize(resp);
                });
        }
    }

    public save(): Promise<any> {
        this._start_data = this.getRawModel(this);
        return this._service.patch(this.getURL(`${this.id}/`), this._start_data)
            .then((response: any) => {
                return (this.synthesize(response));
            })
    }

    public update(properties_to_update: any): Promise<any> {
        return this._service.patch(this.getURL(`${this.id}/`), properties_to_update)
            .then((response: any) => {
                return (this.synthesize(response));
            })
    }

    public delete(): Promise<any> {
        return this._service.delete(this.getURL(`${this.id}/`))
    }

    // Models must call this in their constructor
    protected init = () => {
        this._start_data = this.getRawModel(this);
        this._objects = new ObjectsManager(this.getURL(), this._service);
    };

    /*
        This function extracts and returns the model specific properties.
        Takes an RMModelBase object.
        performs JSON.parse creating an object from the RMModelBase without functions.
        keeps any remaining properties without an underscore at the beginning.
        This result of this function is often sent directly to the API. Any properties you want to use in your models
        or RMModelBase that are not part of the API models, should either begin with an underscore or you can use a GETTER.
     */
    private getRawModel(model: RMModelBase): IModel {
        let o: any = {};
        let m: any = JSON.parse(JSON.stringify(model));
        Object.keys(m).forEach((key: string) => {
            if (!key.startsWith('_')) o[key] = m[key]
        });
        return o;
    }

    private synthesize(modelData: any) {
        Object.assign(this, modelData);
        this._start_data = this.getRawModel(this);
        this._has_loaded = true;
        return this._start_data;
    }

    private getURL = (ext: string = '') => `${this._model.toLowerCase()}/${ext}`;
}

/*
    Handles model as a group functionality.
 */
export class ObjectsManager {
    constructor(private resource_url: string = '', private service: Service = new Service()) {
    }

    public search(searchPattern: string = '', params: any = {}): Promise<any> {
        params['search'] = searchPattern;
        return this.service.get(`${this.resource_url}?${this.buildQuery(params)}`)
    }

    public all(): Promise<any> {
        return this.service.get(`${this.resource_url}`);
    }

    public update(id: number, params: any): Promise<any> {
        return this.service.patch(`${this.resource_url}${id}/`, params)
    };

    public create(model_data: any): Promise<any> {
        return this.service.post(this.resource_url, model_data);
    }

    public delete(id: number): Promise<any> {
        return this.service.delete(`${this.resource_url}${id}/`);
    }

    protected buildQuery(data: any) {
        if (typeof (data) === 'string') return data;
        let query = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
        }
        return query.join('&');
    };
}

