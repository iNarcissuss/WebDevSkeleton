#!/usr/bin/env python

#import pika
import json
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

class client(object):
    token = None
    def __init__(self):
        self.token = str(uuid.uuid4())

    def get_token(self):
        return str(self.token)        

class ClientSocketApplication(WebSocketApplication):
    #all the clients
    #self.ws.handler.server.clients.
    def on_open(self):
        current_client = client()
        print("on_open for client %s" % (current_client.get_token(),) )
        self.ws.handler.active_client.custom_client = current_client
        self.ws.send(
            json.dumps({
                "client_id":current_client.get_token(),
                "message_type":"handshake",
                "data":{},
                "warnings":[],
                "errors":[]}))
        self.broadcast_exclude_sender(json.dumps({"action":"joined","client_id":current_client.get_token()}), self.ws.handler.active_client)

    def on_message(self, message):
        current_client = self.ws.handler.active_client.custom_client
        token = current_client.get_token()
        print("on_message for client %s" % (token,))
        #Handle peer messages
        print("%s: %s" % (token, json.dumps(message)))
        #self.ws.send()

        # self.broadcast(json.dumps({
        #     "message_received":message, 
        #     "client_id":token
        # }))

        self.send_message(json.dumps({
            "message_type":"widget",
            "data":{
                "firstName":"JoeBob",
                "visitorCounter":999,
            },
            "errors":[],
            "warnings":[]
        }), [self.ws.handler.active_client])

    def send_message(self, message, targets):
        for target in targets:
            target.ws.send(message)

    def broadcast(self, message):
        self.send_message(message, self.ws.handler.server.clients.values())

    def broadcast_exclude_sender(self, message, sender):
        sender_token = sender.custom_client.get_token()
        self.send_message(message, filter( lambda c: c.custom_client.get_token() != sender_token,self.ws.handler.server.clients.values()))

    def on_close(self, reason):
        current_client = self.ws.handler.active_client.custom_client
        token = current_client.get_token()
        print("on_close %s" % token)
        print(reason)
        self.broadcast_exclude_sender(json.dumps({"action":"left","client_id":current_client.get_token()}), self.ws.handler.active_client)

#clients=ClientKeeper()

WebSocketServer(
    ('', 5000),
    Resource({'/': ClientSocketApplication})
).serve_forever()

# from geventwebsocket import WebSocketServer, WebSocketApplication, Resource

# class EchoApplication(WebSocketApplication):
#     def on_open(self):
#         print("Connection opened")

#     def on_message(self, message):
#         self.ws.send(message)

#     def on_close(self, reason):
#         print(reason)

# WebSocketServer(
#     ('', 5000),
#     Resource({'/': EchoApplication})
# ).serve_forever()
