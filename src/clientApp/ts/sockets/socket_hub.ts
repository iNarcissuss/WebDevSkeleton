///<reference path='../../typing/skeleton/index.d.ts' />

declare var kernel: skeleton.webapp.kernel;
namespace skeleton.sockets
{
    const HANDSHAKE_MESSAGE = "handshake"; 
    export interface ISocketHubOptions {
        logger: skeleton.logger.ILogger,
        socket: ReconnectingSocket,
        security: skeleton.security.IUserManager;
    }
    export class socket_hub {
        time: KnockoutObservable<number>;
        _logger: skeleton.logger.ILogger;
        _socket: ReconnectingSocket;
        _messages: KnockoutObservableArray<any>;
        _callbacks: {[id:string]:any[]}
        _security: skeleton.security.IUserManager;

        constructor(options: ISocketHubOptions){
            this._security = options.security;
           this._callbacks = {};
           this.time = ko.observable(-1);
           this._logger = options.logger;
           this._socket = options.socket;
           this.subscribeMessage(HANDSHAKE_MESSAGE, this.handshake);
           this._socket.subscribe_event("on_message", (data:any) =>{
                this.processResponse(data);
           });
    }
       public handshake(data:any){
        //TODO:

       }
       private _publishMessage(message:any){
                this._socket.send(JSON.stringify(message));
       }
       private publishUserMessage(message_type: string, data:any){
                this._publishMessage({
                   "message_type": message_type,
                   'user_id_token':this._security.id_token(),
                   "data": data
                });
       }
       private publishAnonMessage(message_type: string, data:any){
                 this._publishMessage({
                   "message_type": message_type,
                   "data": data
                });
      }
       public publishMessage(message_type: string, data:any){
                if(this._security.isSignedIn()){
                    this.publishUserMessage(message_type, data);
                } else {
                    /* TODO: confirm security */
                    this.publishAnonMessage(message_type, data);
                }
       }
       public subscribeMessage(name:string, callback: (data:any)=>void){
            if(!(name in this._callbacks)){
                this._callbacks[name] = <any>[];
            }
            this._logger.log({message:"subscribeMessage  name:"+name,tags:[]})
            this._callbacks[name].push(callback);
       }
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