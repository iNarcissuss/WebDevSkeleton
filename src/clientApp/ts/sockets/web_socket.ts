declare class WebSocket {
    constructor(url: string, protocols?:any[]);
    static OPEN: any;
    static CLOSED: any;
    static CONNECTING: any;
    send: (data:any)=>void;
    connect: ()=>void;
    close: ()=>void;
    onopen: (data:any)=>void;
    onclose: (data:any)=>void;
    onmessage: (data:any)=>void;
    onerror: (data:any)=>void;
}
