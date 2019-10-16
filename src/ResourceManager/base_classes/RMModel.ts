import Service from './Service';

export interface IModel {
    readonly id?: number;
    readonly date_created?: string;
    readonly last_updated?: string;
    readonly last_updated_by?: string;

    soft_lock?: boolean;
}

export abstract class RMModel {
    public id: number = -1;

    protected abstract _resource: string = '';
    protected abstract _model: string = '';

    private _objects: ObjectsManager = new ObjectsManager();
    private _service: Service = new Service();
    private _start_data: any = this.getRawModel(this);
    private _has_loaded: boolean = false;

    public get modelName(): string {
        return this._model;
    }

    public get objects(): ObjectsManager {
        return this._objects;
    }

    public get hasUnsavedUpdates(): boolean {
        return (JSON.stringify(this.getRawModel(this)) !== JSON.stringify(this._start_data))
    }

    public get startData(): any {
        return this._start_data
    }

    public constructor() {
    }

    public load(id: number): Promise<any> {
        if (this._has_loaded) return Promise.reject({error: 'cannot_be_reloaded'});
        return this._service.get(this.getURL(`${id}/`))
            .then((response: any) => {
                return (this.synthesize(response));
            })
    }

    public save(): Promise<any> {
        this._start_data = this.getRawModel(this);
        return this._service.put(this.getURL(`${this.id}/`), this._start_data)
            .then((response: any) => {
                return (this.synthesize(response));
            })
    }

    protected init = () => {
        this._start_data = this.getRawModel(this);
        this._objects = new ObjectsManager(this.getURL(), this._service);
    };

    private getRawModel(model: RMModel): IModel {
        let o: any = {};
        let m: any = JSON.parse(JSON.stringify(model));
        Object.keys(m).forEach((key: string) => {
            if (!key.startsWith('_')) o[key] = m[key]
        });
        return o;
    }

    private synthesize(model_data: any) {
        Object.assign(this, model_data);
        this._start_data = this.getRawModel(this);
        this._has_loaded = true;
        return this._start_data;
    }

    private getURL = (ext: string = '') => `${this._model.toLowerCase()}/${ext}`;
}

export class ObjectsManager {
    constructor(private resource_url: string = '', private service: Service = new Service()) {
    }

    public filter(params: object = {}): Promise<any> {
        return this.service.get(`${this.resource_url}?${this.buildQuery(params)}`);
    }

    public search(params: object = {}): Promise<any> {
        return this.service.get(`${this.resource_url}?${this.buildQuery(params)}`)
            .then((response: any) => response)
    }

    public all(): Promise<any> {
        return this.service.get(`${this.resource_url}`);
    }

    public add(model_data: any): Promise<any> {
        return this.service.post(this.resource_url, model_data);
    }

    private buildQuery(data: any) {

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

