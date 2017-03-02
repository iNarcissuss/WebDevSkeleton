///<reference path='../routing/router.ts' />
namespace skeleton.viewmodel {
        export abstract class base_view_model {
            constructor(){
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