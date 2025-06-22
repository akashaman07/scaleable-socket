import { Server } from "socket.io";
import Redis from 'ioredis'

const pub =new Redis({
    host: '',
    // port: ,
    username: '',
    password: '',
});
const sub = new Redis({
    host: '',
    // port: ,
    username: '',
    password: '',
});

class SocketService {
    private _io: Server;

    constructor(){
        console.log("Init Socket Server....")
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin:"*",
            }
        });
        sub.subscribe("MESSAGE");
    }

    public initListeners(){
        const io=this.io;
        console.log('Init Socket Listeners...');
        
        io.on('connect',(socket)=>{
            console.log(`New Socket Connectefd`, socket.id);

            socket.on('event:message',async ({message}:{message :string}) =>{
                console.log("New Message Rec.",message);

                await pub.publish('MESSAGES',JSON.stringify({message}));

            });
        });

        sub.on('message',(channel,message)=>{
            if(channel === 'MESSAGE'){
                console.log('new message from Valkey',message)
                io.emit("message",message);
            }
        })
    }

    get io(){
        return this._io;
    }
}

export default SocketService;
