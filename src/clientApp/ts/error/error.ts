namespace skeleton.error {
   export interface IErrorHandlerProvider {
        getHandler():(error:JQueryXHR)=>void;
   }
   export class error_handler_provider implements IErrorHandlerProvider {
        
        _logger: skeleton.logger.ILogger;
        constructor(logger: skeleton.logger.ILogger){
            this._logger = logger;
        }
        getHandler():(error:JQueryXHR)=>void {
            return (error)=>{
                this._logger.error({
                    message: JSON.stringify(error),
                    tags: ["69833d77-7e5d-4b86-b663-7c440390653a"]
                })
            }
        }
    }

}