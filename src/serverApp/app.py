#!/usr/bin/env python

# import asyncio
# import websockets

# @asyncio.coroutine
# def hello(websocket, path):
#     name = yield from websocket.recv()
#     print("< {}".format(name))

#     greeting = "Hello {}!".format(name)
#     yield from websocket.send(greeting)
#     print("> {}".format(greeting))

# start_server = websockets.serve(hello, 'localhost', 5000)

# asyncio.get_event_loop().run_until_complete(start_server)
# asyncio.get_event_loop().run_forever()

# import asyncio
# import datetime
# import random
# import websockets

# @asyncio.coroutine
# def time(websocket, path):
#     while True:
#         now = datetime.datetime.utcnow().isoformat() + 'Z'
#         yield from  websocket.send(now)
#         yield from  asyncio.sleep(random.random() * 3)

# start_server = websockets.serve(time, '127.0.0.1', 5000)

# asyncio.get_event_loop().run_until_complete(start_server)
# asyncio.get_event_loop().run_forever()
# import pika
# import json
# from features import IsInstanceOf
# from features import HasMethods
# from features import RequiredFeature
# from constants import *
from geventwebsocket import WebSocketServer, WebSocketApplication, Resource
import uuid
#from gevent import Queue


# class Sender(object):
    
#     def __init__(self, queue):
#         self._queue = queue
#         self._server = RequiredFeature(MESSAGE_QUEUE_SERVER_FEATURE,
#                                        IsInstanceOf(str)).Request()
#         self._user = RequiredFeature(MESSAGE_QUEUE_USER_FEATURE,
#                                      IsInstanceOf(str)).Request()
#         self._pass = RequiredFeature(MESSAGE_QUEUE_PASSWORD_FEATURE,
#                                      IsInstanceOf(str)).Request()

#     def send(self, data_to_send):
#         data = json.dumps(data_to_send)
#         self.emit(data)

#     def emit(self, data_to_send):
#         self.connection = pika.BlockingConnection(
#             pika.ConnectionParameters(
#                 self._server,
#                 credentials=pika.PlainCredentials(
#                     self._user,
#                     self._pass,
#                     erase_on_connect=False)))
#         self.channel = self.connection.channel()
#         self.channel.queue_declare(queue=self._queue)
#         self.channel.basic_publish(exchange='',
#                                    routing_key=self._queue,
#                                    body=data_to_send)
#         self.connection.close()

# Work in progress

class ClientKeeper(object):


     def addClient(self, client):
         self.clients[]

         

class ClientSocketApplication(WebSocketApplication):
    def on_open(self):
        globals()["clients"] +=1
        print("opening"+str(globals()["clients"]))
        # Obtain ClientID
        self.ws.send("echo")

    def on_message(self, message):
        print("on_message")
        #Handle peer messages
        print(message)
        self.ws.send(message)

    def on_close(self, reason):
        # Remove ClientID
        print("on_close")
        print(reason)

clients=ClientKeeper()

WebSocketServer(
    ('', 5000),
    Resource({'/': ClientSocketApplication})
).serve_forever()