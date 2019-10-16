export interface IServiceRequest {
    url: string;
    content?: any;
}

export default class Service {
    private _service_url: string = `${process.env.REACT_APP_API_SERVER}/resource_manager/`;

    private _execute(url: string, args: any): Promise<any> {
        Object.assign(args, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return (
            fetch((url.startsWith('http') ? url : this._service_url + url), args)
                .then(response => {
                    return (response.json())
                })
        )
    };

    public get<T>(url: string, content?: any): Promise<T> {
        return this._execute(url, {});
    }

    public post<T>(url: string, content: any): Promise<T> {
        return this._execute(url, {
            method: 'POST',
            body: JSON.stringify(content)
        })
    }

    public put<T>(url: string, content: any): Promise<T> {
        return this._execute(url, {
            method: 'PUT',
            body: JSON.stringify(content)
        })
    }

    async delete<T>(url: string): Promise<T> {
        return await this._execute(url, {method: 'DELETE'})
    }

}