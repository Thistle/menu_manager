export const mockGet = jest.fn(async () => Promise.resolve({name: 'test_name'}));
export const mockGetError = jest.fn(async () => Promise.reject({error: 'some_error'}));
const mock = jest.fn().mockImplementation(() => {
    return {
        get: mockGet
    }
});

export default mock;