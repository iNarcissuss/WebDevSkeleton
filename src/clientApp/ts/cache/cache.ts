namespace skeleton.cache {
    interface ICache< TValue> {
        get: (key:string, load: (key: string, callback:(value: TValue)=>void)=>void, callback:(value: TValue)=>void)=>void;
    }
    export class AsyncLazy<TValue> implements ICache<TValue>{
        private _cache:{[id:string]: TValue}={};
        private _awaiting:{[id:string]: ((value: TValue)=>void)[]}={};
        get(key:string, load: (key: string, callback:(value: TValue)=>void)=>void, callback:(value: TValue)=>void):void{
            if(!(key in this._cache)){
                if(!(key in this._awaiting)){
                    this._awaiting[key] = [];
                    load(key, (value:TValue)=>{
                        this._cache[key] = value;
                        callback(value); 
                        this._awaiting[key].forEach((awaiting_callback)=>{
                            awaiting_callback(value);                                                       
                        });
                    })
                } else {
                    this._awaiting[key].push((value:TValue)=>{ 
                        this._cache[key] = value;
                        callback(value);
                    });
                }

            } else {
                callback(this._cache[key]);
            }

        }
    }
}