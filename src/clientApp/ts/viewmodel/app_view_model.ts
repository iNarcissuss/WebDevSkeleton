///<reference path='base_view_model.ts' />
///<reference path='../../typing/skeleton/skeleton.d.ts' />


declare var kernel: skeleton.webapp.kernel;
namespace skeleton.viewmodel {
        export class app_view_model extends skeleton.viewmodel.base_view_model {
            public firstName: KnockoutObservable<string> = ko.observable("");
            public visitorCount: KnockoutObservable<number> = ko.observable(-1);
            constructor(){
                super();
            }
            on_initialized(routeData:skeleton.routing.route_request){
                kernel.repo.requestPayload<skeleton.model.widget,skeleton.model.base>(
                "",
                {
                    data: {}
                },
                (r:skeleton.model.widget)=>{
                    this.firstName(r.name);
                    this.visitorCount(r.counter);
                })

            }
        }
}