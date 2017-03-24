declare var gapi: any;
namespace skeleton.security {
    export function sign_in(googleUser) {
        skeleton.security.getUserManager().assign_user(googleUser);
    }
    export function sign_out() {
        skeleton.security.getUserManager().clear_user();
    }
    export interface IUserManager{
        id: KnockoutObservable<string>;
        name: KnockoutObservable<string>;
        image_url: KnockoutObservable<string>;
        email: KnockoutObservable<string>;
        given_name:  KnockoutObservable<string>;
        family_name:  KnockoutObservable<string>;
        id_token:  KnockoutObservable<string>;
        isSignedIn: KnockoutObservable<boolean>;
        clear_user:()=>void;
        assign_user:(googleUser)=>void;
    }
    export class UserManager implements IUserManager{
        id: KnockoutObservable<string>=ko.observable("");
        name: KnockoutObservable<string>=ko.observable("");
        image_url: KnockoutObservable<string>=ko.observable("");
        email: KnockoutObservable<string>=ko.observable("");
        given_name:  KnockoutObservable<string>=ko.observable("");
        family_name:  KnockoutObservable<string>=ko.observable("");
        id_token:  KnockoutObservable<string>=ko.observable("");
        isSignedIn: KnockoutObservable<boolean>=ko.observable(false);

        clear_user(){
              this.isSignedIn(false);
               var auth2 = gapi.auth2.getAuthInstance();
                    auth2.signOut().then(()=> {
                        this.id(null);
                        this.name(null);
                        this.image_url(null);
                        this.email(null);
                        this.given_name(null);
                        this.family_name(null);
                });
        }
        assign_user(googleUser){
            var profile = googleUser.getBasicProfile();
           
            this.id(profile.getId());// Don't use in back end
            this.id_token(googleUser.getAuthResponse().id_token); // for back end
            
            this.name(profile.getName());
            this.given_name(profile.getGivenName());
            this.family_name(profile.getFamilyName());

            this.image_url(profile.getImageUrl());
            this.email(profile.getEmail());
            this.isSignedIn(true);
        }
    
    }
    export var getUserManager: ()=>IUserManager = (function(){
        var closure = new UserManager();
        return function(){
            return closure;
        };
     }());

}