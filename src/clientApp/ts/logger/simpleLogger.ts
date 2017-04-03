///<reference path='../../typing/jsnlog/index.d.ts' />
///<reference path='../../typing/skeleton/index.d.ts' />
namespace skeleton.logger {
    export class ConsoleLogAdapter implements ILogger {
       //Assumes console log exists
       _console: any;
       constructor(console: any){
           this._console = console;
       }
       
       log(message:ILoggerMessageOptions){
           this._console.log(JSON.stringify(message));
       }
       error(message:ILoggerMessageOptions){
            this._console.info(JSON.stringify(message));
       }
       info(message: ILoggerMessageOptions){
            this._console.info(JSON.stringify(message));
       }
    }
}
