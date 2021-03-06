#!/usr/bin/env python

import asyncio
import datetime
import random
import websockets

# async def time(websocket, path):
#     while True:
#         now = datetime.datetime.utcnow().isoformat() + 'Z'
#         await websocket.send(now)
#         await asyncio.sleep(random.random() * 3)

@asyncio.coroutine
def producer():
    websocket = yield from websockets.connect('ws://localhost:8765/')
    try:
        name = datetime.datetime.utcnow().isoformat() + 'Z'
        yield from websocket.send(name)
    finally:
        yield from websocket.close()

async def handler(websocket, path):
    while True:
        listener_task = asyncio.ensure_future(websocket.recv())
        producer_task = asyncio.ensure_future(producer())
        done, pending = await asyncio.wait(
            [listener_task, producer_task],
            return_when=asyncio.FIRST_COMPLETED)

        if listener_task in done:
            message = listener_task.result()
            await consumer(message)
        else:
            listener_task.cancel()

        if producer_task in done:
            message = producer_task.result()
            await websocket.send(message)
        else:
            producer_task.cancel()

start_server = websockets.serve(handler, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

