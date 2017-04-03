///<reference path='../../typing/skeleton/index.d.ts' />

declare var kernel: skeleton.webapp.kernel;
namespace skeleton.sockets
{
    export class socket_hub {
        time: KnockoutObservable<number>;
        _logger: skeleton.logger.ILogger;
        _socket: WebSocket;
        _messages: KnockoutObservableArray<any>;
        _callbacks: {[id:string]:any[]}
        constructor(logger:skeleton.logger.ILogger, socket: WebSocket){
           this._callbacks = {};
           this.time = ko.observable(-1);
           this._logger = logger;
           this._socket = socket;
           this.subscribeMessage("handshake", this.handshake);
           this._socket.onmessage = (data:any) =>{
                this.processResponse(data);
           }
        //    this._socket.onopen = (data:any) => this.sendRequests(data);
        //    this._messages = ko.observableArray();
    }
       public handshake(data:any){
        //TODO:

       }
       public publishMessage(data:any){
           if(typeof(data)!=="string"){
               this._socket.send(JSON.stringify(data));
           } else {
               this._socket.send(data);
           }
                // this._messages.push(data);
       }
       public subscribeMessage(name:string, callback: (data:any)=>void){
            if(!(name in this._callbacks)){
                this._callbacks[name] = <any>[];
            }
            this._logger.log({message:"subscribeMessage  name:"+name,tags:[]})
            this._callbacks[name].push(callback);
       }
    //    public sendRequests(data:any){
    //        while(this._messages.length > 0){
    //             this._socket.send(JSON.stringify(this._messages.shift()));
    //        }
    //    }
    //    public processRequest(data:any){
    //        this._socket.send(data);
    //    }
       public processResponse(data:any){
           var innerData = JSON.parse(data.data);
           if('message_type' in innerData){
                var payload = <skeleton.sockets.response>(innerData);
                if(payload.message_type in this._callbacks){
                    payload.errors.forEach((error)=>{
                        this._logger.error({
                            message:JSON.stringify(error),
                            tags: [
                                "JSON",
                                "Repo",
                                "Payload",
                                "fc39ed04-0a70-4979-a9fc-3d131638c35a"
                            ]
                        })
                    });
                    payload.warnings.forEach((warning)=>{
                        this._logger.info({
                            message:JSON.stringify(warning),
                            tags: [
                                "JSON",
                                "Repo",
                                "Payload",
                                "a0866046-8193-4bfd-b992-056c7479ff73"
                            ]
                        })
                    });
                    
                    this._callbacks[payload.message_type].forEach((callback)=>{
                        callback(payload.data)
                    });

                } else {
                        this._logger.error({
                            message:JSON.stringify({"unsupported message":innerData}),
                            tags: [
                                "JSON",
                                "Repo",
                                "unsupported message",
                                "48224ced-4de0-410d-9024-c67cdcd8f50e"
                            ]
                        })
                }

           } else {
               this._logger.error({
                   message: JSON.stringify(innerData),
                   tags: [
                       "JSON",
                       "invalid message",
                       "61faf435-ef07-4331-b67b-448b666ca6ef"
                   ]
               })
           }
             this._logger.log({"message":"end of processmessage",tags:[]});
        }
    }
}