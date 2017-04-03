var kernel = {
    config: {
        default_route:{
            url:"",
            route_hierarchy:"",
            view_url: "home.mustache",
            view_model_class: "app_view_model",
            parameters: {}
        },
        site: {
            views: {
                "":"home.mustache"
            },
            view_models: {
                "":"app_view_model"
            },
            url: "ws://127.0.01:5000",
            timeout_interval:2000,
            reconnect_interval:1000,
            protocols: null
        },
        OAuth: {
            client_id:"238289129311-qetjv4qruo4nbo2ssbea11uf8cs5n3mo.apps.googleusercontent.com",
            client_secret:"J2PEJyCcbuzC5bCT-RORNnSf"
        }

    }
};