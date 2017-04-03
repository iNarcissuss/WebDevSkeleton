///<reference path='../../typing/skeleton/index.d.ts' />
namespace skeleton.routing {
   export interface RouterOptions {
       errorHandler: skeleton.error.IErrorHandlerProvider;
       renderTarget: JQuery;
       logger: skeleton.logger.ILogger;
       route_parser: skeleton.routing.IRouteParser;
   }
   export class router {
        _errorHandler: skeleton.error.IErrorHandlerProvider;
        _logger: skeleton.logger.ILogger;
        _view_model_routes: {[id:string]:string};
        constructor(options: RouterOptions){
            this._logger = options.logger;
            this._errorHandler = options.errorHandler;
            this._renderTarget = options.renderTarget;
            this._currentRoute = ko.observable(document.location.href);
            this._currentRequest = ko.observable(options.route_parser.getRequest({url:this._currentRoute()}));
            this._views = new skeleton.cache.AsyncLazy<string>()
            this._view_models = new skeleton.cache.AsyncLazy<skeleton.viewmodel.base_view_model>()
            var setFromCurrent = ()=>{
                var request = options.route_parser.getRequest({url:this._currentRoute()});
                this._currentRequest(request);
                
                this._currentViewModel= new skeleton.viewmodel[request.view_model_class]({
                    logger: this._logger
                });
            };
            var crSubscription = this._currentRoute.bind("change",setFromCurrent());
            setFromCurrent();
        }
        _views: skeleton.cache.AsyncLazy<string>;
        _view_models: skeleton.cache.AsyncLazy<skeleton.viewmodel.base_view_model>;
        _renderTarget: JQuery;
        _currentRoute: KnockoutObservable<string>;
        _origin: KnockoutObservable<skeleton.routing.route_information<skeleton.viewmodel.base_view_model>>;
        _currentRequest: KnockoutObservable<skeleton.routing.route_request>;        
        _currentViewModel: skeleton.viewmodel.base_view_model;        
        _history: KnockoutObservableArray<skeleton.routing.route_information<skeleton.viewmodel.base_view_model>>;
        _navigate(route: skeleton.routing.route_request):void{
            //TODO:
        }
        _navigateToOrigin():void{
            //TODO:
            // move to origin;
        }
        _back():void{
            //TODO:
            // move one back in history;
        }
        _removeBindings():void{
            if(ko.dataFor(this._renderTarget[0])){
                ko.cleanNode(this._renderTarget[0]);
            }
        }
        _loadIn(rr: route_request,callback:(data:string)=>void):void{
            this._views.get(rr.route_hierarchy, (key, internal_callback)=>{
                $.ajax(
                    {
                        url:  "view/"+rr.view_url,
                        data: rr.parameters,
                        success: internal_callback,
                        error: (error)=>{
                            this._errorHandler.getHandler()(error); 
                        }
                    }
                );
            },callback);
        }
        activate():void{
            this._removeBindings();
            this._loadIn(this._currentRequest(), (data:string)=>{
                this._renderTarget.html(data); // TODO: handle templates 
                this._currentViewModel.initialize(<any>this._currentRequest());
                ko.applyBindings(this._currentViewModel,this._renderTarget[0]);                
            });
        }

   }
}