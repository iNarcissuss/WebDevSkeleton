namespace skeleton.viewmodel {

    export interface menu_options {
        user_manager: skeleton.security.IUserManager;
        selector: JQuery;
    }
    export class menu{
        constructor(options: menu_options){
            this._selector = options.selector;
            this.user_manager = options.user_manager;
            ko.applyBindings(this, options.selector[0]);
            
        }
        private _selector:JQuery=null;
        user_manager: skeleton.security.IUserManager;
    }
}
