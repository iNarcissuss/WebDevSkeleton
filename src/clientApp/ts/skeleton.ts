///<reference path='../typing/requirejs/index.d.ts' />
///<reference path='../typing/jquery/index.d.ts' />
///<reference path='../typing/knockout/index.d.ts' />
///<reference path='../typing/bootstrap/index.d.ts' />
///<reference path='../typing/skeleton/skeleton.d.ts' />
///<reference path='routing/router.ts' />
///<reference path='routing/view_model_routes.ts' />
///<reference path='routing/view_routes.ts' />
///<reference path='kernel_extensions/root_locator.ts' />

declare var kernel: skeleton.webapp.kernel;

// import kernel = require('kernel.config');
// import $ = require('jquery-3.1.1');
// import ko = require('knockout-3.4.1');
// import mustache = require('mustache');
// import socket = require('socket/socket');
// import bs = require('bootstrap.min');


$().ready(()=>{

    var root_locator = new skeleton.kernel_extensions.kernel_script_utilities();
    root_locator.kernel_apply_script_info(kernel);
    kernel.repo = new skeleton.data.repo();
    var router: skeleton.routing.router = new skeleton.routing.router($("#content-container"));
    router.activate();



});
