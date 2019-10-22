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
    private _in_test_mode: boolean = false;

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

    public constructor() {
    }

    public setTestModelProperties(properties: any) {
        this._in_test_mode = true;
        this.synthesize(properties);
    }

    public load(id: number = -1): Promise<any> {
        if (this.id !== -1) return Promise.reject({error: 'cannot_be_reloaded'});
        return this._service.get(this.getURL(`${id}/`))
            .then((r: any) => {
                return this.synthesize(r);
            })
            .catch((e: any) => {
                this.displayPromiseError('unable to load model', e);
                return e;
            })
    }

    /*
        save:
            id == -1 - the object will be created on RM.
            id > -1 - the object is updated.
     */
    public save(): Promise<any> {//todo: testing
        if (this.id !== -1) {// save
            return this._service.patch(this.getURL(`${this.id}/`), this._start_data)
                .then((r: any) => {
                    return (this.synthesize(r));
                })
                .catch((e: any) => {
                    this.displayPromiseError(`Unable to save model`, e)
                    return e;
                })
        }else{// create
            return this.objects.create(this.getRawModel(this))
                .then((r: any) => {
                    return this.synthesize(r);
                })
        }
    }

    /*
        update: updates to RM, updates own properties, returns updated model data

        if the id == -1, the RM will not be updated, .save() must be called to create the object on the RM.

     */
    public update(properties_to_update: any): Promise<any> {//todo: testing
        if (this.id !== -1){// update API if model has already loaded
            return this._service.patch(this.getURL(`${this.id}/`), properties_to_update)
            .then((r: any) => {
                return (this.synthesize(r));
            })
            .catch((e: any) => {
                this.displayPromiseError(`Unable to update property`, e);
                return e
            })
        }else{
            return Promise.resolve(this.synthesize(properties_to_update, false));
        }

    }

    public delete(): Promise<any> {
        return this._service.delete(this.getURL(`${this.id}/`))
            .catch((e: any) => {
                this.displayPromiseError('unable to delete model', e);
                return e
            })
    }

    /* Models must call this in their constructor */
    protected init = () => {
        this._start_data = this.getRawModel(this);
        this._objects = new ObjectsManager(this.getURL(), this._service);
    };

    /*
        getRawModel: extracts and returns the model specific properties.

        Takes an RMModelBase object.
        performs JSON.parse creating a functionless object from the RMModelBase.
        strips out properties that begin with '_'.
        This result of this function is often sent directly to the API. Any properties you want to use in your models
          or RMModelBase that are not part of the RM models, should either begin with an underscore or you can use a GETTER.
     */
    private getRawModel(model: RMModelBase): IModel {
        let o: any = {};
        let m: any = JSON.parse(JSON.stringify(model));
        Object.keys(m).forEach((key: string) => {
            if (!key.startsWith('_')) o[key] = m[key]
        });
        return o;
    }

    /*
        synthesize: assigns given properties to this

        returns unaltered data.
     */
    private synthesize(modelData: any, recordChanges: boolean = false) {
        Object.assign(this, modelData);
        if (recordChanges) this._start_data = this.getRawModel(this);
        return modelData;
    }

    private displayPromiseError = (message: string, e: any) => {
        window.alert(`${message}:\n\n${e}`)
    };

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
            .catch((e: any) => {
                this.displayPromiseError('unable to search model', e);
                return e;
            })
    }

    public all(): Promise<any> {
        return this.service.get(`${this.resource_url}`)
        .catch((e: any) => {
                this.displayPromiseError('unable to perform all() on  model', e);
                return e;
            })
    }

    public update(id: number, params: any): Promise<any> {
        return this.service.patch(`${this.resource_url}${id}/`, params)
            .catch((e: any) => {
                    this.displayPromiseError('unable to update model', e);
                    return e;
                })
    };

    public create(model_data: any): Promise<any> {
        return this.service.post(this.resource_url, model_data)
            .catch((e: any) => {
                this.displayPromiseError('unable to create model', e);
                return e;
            })
    }

    public delete(id: number): Promise<any> {
        return this.service.delete(`${this.resource_url}${id}/`)
            .catch((e: any) => {
                this.displayPromiseError('unable to delete model', e);
                return e;
            })
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

    private displayPromiseError = (message: string, e: any) => {
        window.alert(`${message}:\n\n${e}`)
    };
}

