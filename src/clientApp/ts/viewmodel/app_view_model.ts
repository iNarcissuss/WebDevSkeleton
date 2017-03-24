///<reference path='base_view_model.ts' />
///<reference path='../../typing/skeleton/index.d.ts' />


declare var kernel: skeleton.webapp.kernel;
namespace skeleton.viewmodel {
        export class app_view_model extends skeleton.viewmodel.base_view_model {
            public firstName: KnockoutObservable<string> = ko.observable("");
            public visitorCount: KnockoutObservable<number> = ko.observable(-1);
            constructor(){
                super();
            }
            on_widget_message(data:skeleton.model.widget){
                    this.firstName(data.name);
                    this.visitorCount(data.counter);
            }
            on_initialized(routeData:skeleton.routing.route_request){
                kernel.socket_hub.subscribeMessage("widget",(data)=>this.on_widget_message);
                kernel.socket_hub.publishMessage({"message_type":"widget"});
            }
        }
}