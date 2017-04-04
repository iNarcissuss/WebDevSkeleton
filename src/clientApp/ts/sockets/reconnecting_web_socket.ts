///<reference path='../../typing/skeleton/index.d.ts' />

declare var window:any;
//declare var window;// = window['Socket'] || window['MozSocket'];

// Adapted from the brilliant Joe Walnes's 
// https://github.com/joewalnes/reconnecting-Socket/
namespace skeleton.sockets {
    export class ReconnectingSocket //extends WebSocket
    { 
     //   _protocols: any;
        _url: string;
        _forced_close = false;
        _timeout_interval = 2000;
        _reconnect_interval = 1000;
        public readyState: number;
        _timed_out = false;
        _logger: skeleton.logger.ILogger;
        _ws: WebSocket;
        _timer_timeout: number;
        _reconnect_attempt: boolean;
        _events: IReconnectingSocketEvents; 
        _protocols: string[];
        _queue: any[];
        constructor(options: IReconnectingSocketOptions){
            this._queue = [];
            this._logger = options.logger;
            this._protocols = options.protocols;
            this._url = options.url;
            this._events = options.events;
            this._timeout_interval = options.timeout_interval;
            this._reconnect_interval = options.reconnect_interval;
        }
        subscribe_event(name, callback:any){
            this._events[name] =callback;
        }
        _on_open(event) {
            if(this._events.on_open){
                this._events.on_open(event);
            }
        }
        _on_close(event) {
            if(this._events.on_close){
                this._events.on_close(event);
            }
        }
        _on_connecting(event) {
            if(this._events.on_connecting){
                this._events.on_connecting(event);
            }
        }
        _on_message(event) {
            if(this._events.on_message){
                this._events.on_message(event);
            }
        };
        _on_error(event) {
            if(this._events.on_error){
                this._events.on_error(event);
            }
        };
        _wait_until_true(condition: ()=>boolean, interval: number, isTrue:()=>void, isFalse:()=>void){
            if(condition()){
                isTrue();
            } else {
                window.setTimeout(isFalse,interval);
            }
        }
        _send(data){
            this._ws.send(data);
        }
        send(data) {
            this._wait_until_true(()=>{
                return this._ws && this._ws.readyState ===1; 
            }, 
            1000,
            ()=>{
                this._send(data);
            },
            ()=>{
                if(typeof(this._ws)==="undefined"){
                    this.connect();
                }
                this.send(data);});
        };
        onopen(data:any){
            this._on_open(data);
        }
        onclose(data:any){
            this._on_close(data);
        }
        onmessage(data:any){
           this._on_message(data);
        }
        onerror(data:any){
            this._on_error(data);
        }
        close() {
            if (this._ws) {
                this._forced_close = true;
                this._ws.close();
            }
        };
        _timed_out_tick(){
               this._logger.log({message:JSON.stringify({
                    source:'ReconnectingSocket',
                    'message_type':'connection-timeout', 
                    'url': this._url}),
                    tags: ["JSON"]
                });
                this._timed_out = true;
                this._ws.close();
                this._timed_out = false;
                while(((data:any)=>{
                    if(data) this.send(data);
                    return typeof(data) !== 'undefined';})(this._queue.shift())
                );
        };
        _ws_on_open(event){
                window.clearTimeout(this._timer_timeout);
                this._logger.log({message:JSON.stringify({
                        source:'ReconnectingSocket',
                        'message_type':'onopen', 
                        'url': this._url}),
                        tags: ["JSON"]
                    });
                
                this.readyState = WebSocket.OPEN;
                this._reconnect_attempt = false;
                this._on_open(event);
        };
        _ws_on_close(event){
            window.clearTimeout(this._timer_timeout);
                this._ws = null;
                if (this._forced_close) {
                    this.readyState = WebSocket.CLOSED;
                    this._on_close(event);
                } else {
                    this.readyState = WebSocket.CONNECTING;
                    this._on_connecting(event);
                    if (!this._reconnect_attempt && !this._timed_out) {
                        this._logger.log({message:JSON.stringify({
                                source:'ReconnectingSocket',
                                'message_type':'onclose', 
                                'url': this._url}),
                                tags: ["JSON"]
                            });
                        this._on_close(event);
                    }
                    window.setTimeout(()=> {
                        this._reconnect_attempt = true;
                        this.connect();
                    }, this._reconnect_interval);
                }
        };
        _ws_on_message(event){
           this._logger.log({message:JSON.stringify({
                source:'ReconnectingSocket',
                'message_type':'onmessage', 
                'url': this._url}),
                tags: ["JSON"]
            });
            this.onmessage(event);
        };
        _ws_on_error(event){
        this._logger.log({message:JSON.stringify({
                source:'ReconnectingSocket',
                'message_type':'onerror', 
                'url': this._url}),
                tags: ["JSON"]
            });
            this._on_error(event);
        };
        connect(){
            if(this._protocols != undefined){
                this._ws = new WebSocket(this._url, this._protocols);
            } else {
                this._ws = new WebSocket(this._url);
            }
            this._on_connecting(null);
            this._logger.log({message:JSON.stringify({
                source:'ReconnectingSocket',
                'attempt-connect':'connect', 
                'url': this._url}),
                tags: ["JSON",
                "05d5ccc8-59bb-4ebe-9186-86584ec85e49"]
            });
            this._ws.onopen = (event)=>{this._ws_on_open(event);}; 
            this._ws.onclose = (event)=>{this._ws_on_close(event);};
            this._ws.onmessage = (event)=>{this._ws_on_message(event);};
            this._ws.onerror = (event)=>{this._ws_on_error(event)};
            this._timer_timeout = window.setTimeout(()=> this._timed_out_tick, this._timeout_interval);
        }
        refresh() {
            if (this._ws) {
                this._ws.close();
            }
        };
    }
}