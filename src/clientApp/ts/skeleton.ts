///<reference path='../typing/requirejs/index.d.ts' />
///<reference path='../typing/jquery/index.d.ts' />
///<reference path='../typing/knockout/index.d.ts' />
///<reference path='../typing/bootstrap/index.d.ts' />
///<reference path='../typing/jsnlog/index.d.ts' />
///<reference path='../typing/skeleton/index.d.ts' />
///<reference path='routing/router.ts' />
///<reference path='viewmodel/menu.ts' />
///<reference path='routing/view_routes.ts' />
///<reference path='kernel_extensions/root_locator.ts' />

declare var kernel: skeleton.webapp.kernel;

declare var console;
$().ready(()=>{
    var root_locator = new skeleton.kernel_extensions.kernel_script_utilities();
    root_locator.kernel_apply_script_info(kernel);
    kernel.logger = new skeleton.logger.ConsoleLogAdapter(console);

    //TODO: this should only connect once signed in
    // It should pass the token
    // The server should validate then terminate the socket for non-valid sockets

    kernel.socket =new skeleton.sockets.ReconnectingSocket({
        logger: kernel.logger,
        url: kernel.config.site.url,
        reconnect_interval: kernel.config.site.reconnect_interval,
        timeout_interval: kernel.config.site.reconnect_interval,
        protocols: null,
        events: {
            on_open:()=>{

            },
            on_close:()=>{

            },
            on_connecting:()=>{

            },
            on_error:()=>{

            },
            on_message:()=>{
                
            }
        }
    })

    kernel.socket_hub = new skeleton.sockets.socket_hub({
        logger:kernel.logger,
        socket: kernel.socket,
        security: skeleton.security.getUserManager()
    });
    kernel.error_handler = new skeleton.error.error_handler_provider(kernel.logger);
    var router: skeleton.routing.router = new skeleton.routing.router({
        errorHandler: kernel.error_handler,
        renderTarget: $("#content-container"),
        logger: kernel.logger,
        route_parser: new skeleton.routing.route_parser({
            root_url:kernel.root_url,
            routes:kernel.config.site.views,
            view_model_routes: kernel.config.site.view_models,
            default_route: kernel.config.default_route
        }),        
    });
    var menu: skeleton.viewmodel.menu = new skeleton.viewmodel.menu({
        user_manager: skeleton.security.getUserManager(),
        selector: $("#menu-container")
    });
   router.activate();


});
