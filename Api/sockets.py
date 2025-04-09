import socketio
from Rag.retrive import retrive
from Rag.chat_retriver import chat_retrive
from Rag.chat_rag import add_chat

sio_server = socketio.AsyncServer(
    async_mode = 'asgi',
    cors_allowed_origins=[],
        ping_interval=120, 
    ping_timeout=300,


) # type: ignore

sio_app = socketio.ASGIApp(
    socketio_server= sio_server
)

@sio_server.event
async def connect(sid, environ):
    print(f"Client {sid} connected")

@sio_server.event
async def Query(sid, environ):
    response = chat_retrive(environ['query'],environ['url'])
    if(response != []):
        environ['response'] = response[0].metadata['response']
        await sio_server.emit("Response",data=environ, to=sid)
    else:
        print(f"Client {sid} connected", environ)
        environ['response'] = retrive( environ['query'],environ['url'])
        add_chat(environ['query'],environ['url'],environ['response'] )
        await sio_server.emit("Response",data=environ, to=sid)

    