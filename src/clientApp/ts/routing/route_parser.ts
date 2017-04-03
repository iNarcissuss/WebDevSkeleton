namespace skeleton.routing {
    export interface IRouteParser{
        getRequest (options: IRouteParserRequestOptions): skeleton.routing.route_request;
    }
    export interface IRouteParserOptions {
        root_url: string;
        routes: {[id:string]:string};
        view_model_routes: {[id:string]:string};
        default_route: skeleton.routing.route_request;
    }
    export interface IRouteParserRequestOptions {
        url: string;
        default_route?: skeleton.routing.route_request;
    }
    export class route_parser implements IRouteParser {
        private readonly _root_url: string;
        private readonly _routes: {[id:string]:string};
        private readonly _view_model_routes: {[id:string]:string};
        private readonly _default_route: skeleton.routing.route_request;
        
        constructor(options:IRouteParserOptions ){
            this._root_url = options.root_url;
            this._routes = options.routes;
            this._view_model_routes = options.view_model_routes;
            this._default_route = options.default_route;
        }
        getRequest (options: IRouteParserRequestOptions): skeleton.routing.route_request{

            var result:skeleton.routing.route_request;
            if(typeof(options.default_route)!=="undefined"){
                result = $.extend({},options.default_route);
            } else {
                result = $.extend({},this._default_route);
            }
            result.url = options.url;
            // remove the root url
            var url_pieces = options.url.split("#");
            if(url_pieces.length > 0){
                // divide the parameters
                var hierarchy_pieces = [options.url];
                if(url_pieces.length > 1){
                    hierarchy_pieces = url_pieces[1].split("?");
                } 
                result.route_hierarchy = hierarchy_pieces[0].replace(this._root_url,"");
                if(this._view_model_routes[result.route_hierarchy]){
                    result.view_model_class= this._view_model_routes[result.route_hierarchy];
                    result.view_url= this._routes[result.route_hierarchy];
                }
                
                if(hierarchy_pieces.length > 1){
                    // Process the URL parameters
                    var parameters_pieces = hierarchy_pieces[1].split("&");
                    for(var i = 0; i<parameters_pieces.length; i+=1){
                        var key_pieces = parameters_pieces[i].split("=");
                        if(key_pieces[0] in result.parameters){
                            // we already added the key
                            if(key_pieces.length>1){ // a value assigned
                                if((typeof(result.parameters[key_pieces[0]]) =="string") || !Array.isArray(result.parameters[key_pieces[0]])){
                                    // make it an array
                                    result.parameters[key_pieces[0]] = [result.parameters[key_pieces[0]]];
                                } 
                                result.parameters[key_pieces[0]].append(key_pieces[1]);
                            }
                        } else {
                            // New key
                            if(key_pieces.length>1){
                                // assign a value
                                result.parameters[key_pieces[0]]=key_pieces[1];
                            } else {
                                // assign a value
                                result.parameters[key_pieces[0]]=null;
                            }
                        }
                    };
                }
            } 
            return result ;
        }
    }
}