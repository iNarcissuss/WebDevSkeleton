///<reference path='../../typing/skeleton/skeleton.d.ts' />

declare var kernel: skeleton.webapp.kernel;
namespace skeleton.data
{
    
    export class repo {
        widgets: skeleton.model.widget[];
        time: KnockoutObservable<number>;
        constructor(){
           this.widgets = [];
           this.time = ko.observable(-1);
           //kernel.config.site.url;
        }
       public payloadResolver<T extends skeleton.model.base>(payload:skeleton.socket.response<T>,callback:(data: T)=>void){
            payload.errors.forEach((error)=>{
                //TODO: handle errors
            });
            payload.errors.forEach((warnings)=>{
                //TODO: handle warnings
            });
            callback(payload.data);
        }
        public requestPayload<TResponse extends skeleton.model.base, TRequest extends skeleton.model.base>(route:string, data: skeleton.socket.request<TRequest>, callback: (response:TResponse)=>void):void{
            $.ajax({
                url: kernel.config.site.url + route,
                data: data,
                success: (payload: skeleton.socket.response<TResponse>)=>{
                    this.payloadResolver<TResponse>(payload, callback);
                },
                error:(error:JQueryXHR )=>{
                    //TODO:
                }

            })
        }
    }
}