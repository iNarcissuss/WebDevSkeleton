///<reference path='../../typing/skeleton/index.d.ts' />
namespace skeleton.routing {
    var view_routes:{[id:string]:string} = {
        "":"view/home.mustache"
    };
    export function getRoutes(){
        return view_routes;
    }
}