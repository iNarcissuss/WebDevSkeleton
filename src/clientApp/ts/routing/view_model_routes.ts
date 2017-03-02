///<reference path='../../typing/skeleton/skeleton.d.ts' />
///<reference path='../viewmodel/app_view_model.ts' />
namespace skeleton.routing {
    export var view_model_routes:{[id:string]:skeleton.viewmodel.base_view_model} = {
        "":new skeleton.viewmodel.app_view_model()
    };
}