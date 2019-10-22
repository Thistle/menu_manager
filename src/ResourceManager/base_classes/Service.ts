/*
    Basic Service. Is used primarily by RMModelBase.
    Available to non RM consumers.
 */
export default class Service {
    private _service_url: string = `${process.env.REACT_APP_API_SERVER}/resource_manager/`;

    private api(url: string, args: any): Promise<any> {
        Object.assign(args, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return (
            fetch((url.startsWith('http') ? url : this._service_url + url), args)
                .then(response => {
                    if (!response.ok) return Promise.reject(response);
                    return ((args.method !== 'DELETE') ? response.json() : '')
                })
        )
    };

    public get<T>(url: string, content?: any): Promise<T> {
        return this.api(url, {});
    }

    public post<T>(url: string, content: any): Promise<T> {
        return this.api(url, {
            method: 'POST',
            body: JSON.stringify(content)
        })
    }

    public patch<T>(url: string, content: any): Promise<T> {
        return this.api(url, {
            method: 'PATCH',
            body: JSON.stringify(content)
        })
    }

    public put<T>(url: string, content: any): Promise<T> {
        return this.api(url, {
            method: 'PUT',
            body: JSON.stringify(content)
        })
    }

    async delete<T>(url: string): Promise<T> {
        return await this.api(url, {method: 'DELETE'})
    }

}