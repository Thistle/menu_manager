import {Component} from '../resources/Menu';

jest.mock('../base_classes/Service');

//const mockedService = Service as jest.

describe('instantiating RMModelBase', () => {
    let o: Component;

    beforeEach(() => {
        o = new Component();
    });

    it('should graft model data to RMModelBase', async () => {
        let t = await o.load(1);
        expect(t.name).toEqual('test_name');
        //expect(Service.mock.instances[0].get).toHaveBeenCalledTimes(1);
    });
});

describe('loading RMMODEL data', () => {
    let o: Component;

    beforeEach(() => {
        o = new Component();
    });

    it('should return errors', async () => {
        //const spy = jest.spyOn(Service.prototype, 'get').mockImplementation(() => Promise.reject('rejected'));
        let t = await o.load(1).catch((error) => error);
        //expect(t).toHaveProperty('error');
    });

    it('should throw an error if LOAD is called more than once', async () => {
        o.id = 1;
        let t = await o.load(2).catch((error) => error);
        expect(t).toEqual({error: 'cannot_be_reloaded'})
    });
});

describe('saving RMModelBase data', () => {

});

describe('test hasUnsavedUpdates()', () => {
    let o: Component;

    beforeEach(() => {
        o = new Component();
    });

    it('should default to FALSE when instantiated', () => {
        expect(o.hasUnsavedUpdates).toBe(false);
    });

    it('should return TRUE after value is set.', () => {
        o.name = 'updated_model_name';
        expect(o.hasUnsavedUpdates).toBe(true);
    });

    it('should return FALSE after saving', () => {
    });
});
