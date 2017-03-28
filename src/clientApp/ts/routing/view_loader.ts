namespace skeleton.routing {
    export interface ILoadOptions {
        renderTarget: JQuery,
        renderTransform: (data:any)=>any,
        callback: (data:any)=>void
    }
    export interface ILoader {
        load(options: ILoadOptions):void;
    }
    export class Loader implements ILoader{
        readonly _view_cache: RouteViewCollection;
        constructor(view_cache: RouteViewCollection){
            this._view_cache = view_cache;
        }
        load(options:ILoadOptions){
            var handleData = (data:string)=>{
                var targetData = data;
                options.renderTarget.html(options.renderTransform(targetData));
                options.callback(targetData);
            };
            if(!(rr.route_hierarchy in this._view_cache)){
            } else {
                handleData(this._views[rr.route_hierarchy]);
            }
        }
    }
}