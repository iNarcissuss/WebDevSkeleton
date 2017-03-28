///<reference path='../routing/router.ts' />
namespace skeleton.viewmodel {
    export interface IOptions {
        logger: skeleton.logger.ILogger;
    }
        export abstract class base_view_model {
            
            protected _logger: skeleton.logger.ILogger;
            constructor(options: IOptions){
                this._logger = options.logger;              
            }
            public initialized: KnockoutObservable<boolean> = ko.observable(false);
            initialize(routeData:skeleton.routing.route_request){         
                this.on_initialized(routeData);
                this.initialized_complete();
            }
            
            protected on_initialized(routeData:skeleton.routing.route_request){};
            protected on_initialized_complete(){};

            initialized_complete(){
                this.initialized(true);
                this.on_initialized_complete();
            }
        }
}