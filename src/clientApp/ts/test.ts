///<reference path='../typing/jquery/index.d.ts' />
///<reference path='../typing/knockout/index.d.ts' />
///<reference path='../typing/lodash/index.d.ts' />
///<reference path='../typing/bootstrap/index.d.ts' />
//declare var $:any;
interface IApiResponse {
    hello: string;
}

class AppViewModel {
    firstName: KnockoutObservable<string>;
    constructor(){
        this.firstName = ko.observable("0");
    }
}
$(()=>{

var vm = new AppViewModel();

(()=>{
    $.ajax({url:"http://127.0.0.1:5000/",
    crossDomain: true, 
    success:(result:IApiResponse)=>{
        vm.firstName(result.hello);
    },error:function(ex:any){

        
    }})
})();


ko.applyBindings(vm);

});
