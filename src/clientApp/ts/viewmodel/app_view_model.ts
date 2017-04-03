///<reference path='base_view_model.ts' />
///<reference path='../../typing/skeleton/index.d.ts' />


declare var kernel: skeleton.webapp.kernel;
namespace skeleton.viewmodel {
        export class app_view_model extends skeleton.viewmodel.base_view_model {
            public firstName: KnockoutObservable<string> = ko.observable("");
            public visitorCounter: KnockoutObservable<number> = ko.observable(-1);
            constructor(options:IOptions){
                super(options);
            }
            on_widget_message(data:skeleton.model.widget){
                    // window.alert(JSON.stringify(data));
                    this.firstName(data.firstName);
                    this.visitorCounter(data.visitorCounter);
            } 
            on_initialized(routeData:skeleton.routing.route_request){
                kernel.socket_hub.subscribeMessage("widget",(data)=>{this.on_widget_message(data);});   
                kernel.socket_hub.publishMessage({"message_type":"widget"});
            }
        }
}