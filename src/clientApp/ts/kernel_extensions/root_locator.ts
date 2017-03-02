declare var kernel: skeleton.webapp.kernel;
    
namespace skeleton.kernel_extensions {



    var scripts: [string];
    
    export class kernel_script_utilities{
        kernel_apply_script_info(kernel: skeleton.webapp.kernel){

            if(typeof(kernel.scripts) == "undefined"){
                kernel.scripts = <[string]>[];                        
            }

            for(var i=0; i < document.scripts.length; i+=1){
               var scriptElement = document.scripts[i];
                    if(scriptElement.src != null && scriptElement.src != ""){
                    var script = scriptElement.src;

                    
                    kernel.scripts.push(script);
                    // Using the known script file that ts creates to determine root_url
                    var tsc_index: number = script.indexOf("js/tsc.js");
                    if(tsc_index > -1){
                        
                        kernel.root_url = script.slice(0,tsc_index);
                    }

                }

            }
        }
    }


}