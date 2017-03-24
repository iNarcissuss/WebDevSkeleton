///<reference path='../../typing/skeleton/index.d.ts' />
namespace skeleton.routing {
   export interface RouterOptions {
       errorHandler: skeleton.error.IErrorHandlerProvider;
       renderTarget: JQuery;
   }
   export class router {
        _errorHandler: skeleton.error.IErrorHandlerProvider;
        constructor(options: RouterOptions){
            this._errorHandler = options.errorHandler;
            this._renderTarget = options.renderTarget;
            this._currentRoute = ko.observable(document.location.href);
            this._currentRequest = ko.observable(this._parseRoute(this._currentRoute()));
            var setFromCurrent = ()=>{
                this._currentRequest(this._parseRoute(this._currentRoute()));
            };
            var crSubscription = this._currentRoute.bind("change",setFromCurrent());
            setFromCurrent();
        }

        _renderTarget: JQuery;
        _currentRoute: KnockoutObservable<string>;
        _origin: KnockoutObservable<skeleton.routing.route_information<skeleton.viewmodel.base_view_model>>;
        _currentRequest: KnockoutObservable<skeleton.routing.route_request>;        
        _currentViewModel: skeleton.viewmodel.base_view_model;        
        _history: KnockoutObservableArray<skeleton.routing.route_information<skeleton.viewmodel.base_view_model>>;
        _views: {[id:string]:string}={};
        // public registerRoute<T extends skeleton.viewmodel.base_view_model>(
        //     route_hierarchy: string, 
        //     view_model:T,
        //     view_path:string){
        //         if(this._routes[route_hierarchy]){
        //             throw("You may not register a hierarchy more than once.");
        //         }
        //         this._routes[route_hierarchy] = view_model;
        // }

        _parseRoute(url: string):skeleton.routing.route_request{

            var result = <skeleton.routing.route_request>{
                parameters:{},
                route_hierarchy:""            
            };

            var url_pieces = url.split("#");
            if(url_pieces.length > 0){
                var hierarchy_pieces = url_pieces[0].split("?");
                result.route_hierarchy = hierarchy_pieces[0].replace(kernel.root_url,"");

                if(hierarchy_pieces.length > 1){
                    var parameters_pieces = hierarchy_pieces[1].split("&");
                    parameters_pieces.forEach((s: string)=>{
                        s.split("=");

                    });
                }
            } 
            
            return result ;
        };

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
            this._currentViewModel = skeleton.routing.view_model_routes[rr.route_hierarchy];
             var handleData = (data:string)=>{
                var targetData = data;
                if(rr.route_hierarchy.indexOf("mustache")>-1){
                    //todo
                    // mustache it.
                    
                }
                this._renderTarget.html(targetData);
                callback(targetData);
            };
            if(!(rr.route_hierarchy in this._views)){
                $.ajax(
                    {
                        url: skeleton.routing.view_routes[rr.route_hierarchy],
                        /*data: rr.parameters,*/
                        success: handleData,
                        error: (error)=>{
                            this._errorHandler.getHandler()(error); 
                        }
                    }
                );
            } else {
                handleData(this._views[rr.route_hierarchy]);
            }
        }
        activate():void{
            this._removeBindings();
            this._loadIn(this._currentRequest(), (data:string)=>{
                this._currentViewModel.initialize(<any>this._currentRequest());
                ko.applyBindings(this._currentViewModel,this._renderTarget[0]);                
            });
        }

   }
}