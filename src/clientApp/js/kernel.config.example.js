// This file should be dropped in
var kernel = {
    config: {
        site: {   
            views: {
                "":"home.mustache"
            },
            view_models: {
                "":"app_view_model"
            },
            url: "ws://127.0.0.1:5000",
            timeout_interval:2000,
            reconnect_interval:1000,
            protocols: null
        },
        OAuth: {
            client_id:"nicetry",
            client_secret:"ditto"
        }

    }
};