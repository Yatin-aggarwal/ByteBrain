'use client'
import io from "socket.io-client"
import {useEffect, useState, useRef, useContext, use} from "react";
import Image from 'next/image'
import { Pop_up} from "@/app/paper_bot/modal";
import { context} from "@/app/paper_bot/context_provider";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {redirect} from "next/navigation";
import { Input } from "@/components/ui/input"
import {Ai} from "@/app/paper_bot/Ai";
import {Human} from "@/app/paper_bot/Human";
import Ai_loading from "@/app/paper_bot/Ai_loading";

const connect = io("http://localhost:8000",{ autoConnect: true })

export default function  page(){
   const [chat , set_chat] = useState([])
   let  conv= useRef([]);
   const [url, set_url]= useState();
   const [input, set_input] = useState("");
   const [request, set_request] = useState(false)
    const [query , set_query] = useState()
   const { getUser,isAuthenticated, isLoading} = useKindeBrowserClient();
    useEffect(()=>{
         connect.on("client", (data) => {
            conv.current = [...conv.current , data];
             set_chat((prev)=> [...conv.current]);
            set_request(false);
            set_query(false)
        });
        return () => {
            connect.off('client')
            }
        },[])
    if(isLoading){
        return(<>
            "loading"
        </>)
    }
    if(isAuthenticated===false && isLoading===false){
        redirect('/')
    }
    console.log(chat)
    if(url === undefined){
        return (
            <context.Provider value={{url, set_url}}>
                <>
                    <Pop_up/>
                </>
            </context.Provider>
        )
    }
    const  send_chat = ()=> {
        connect.emit('LLM', {query:input, url:url});
        set_query(input)
        set_input("");
        set_request(true);

    }
    return (<>
        <div className={"w-full h-dvh flex flex-col "}>
            <div className={"w-full  flex flex-col h-[84%] overflow-y-scroll"}>
                {chat.map((data)=>{
                    return(<>
                        <Human content = {data.query}/>
                        <Ai content = {data.response}/>
                    </>)
                })}
                <>
                    {
                        request&& (
                            <>
                                 <Human content = {query}/>
                                 <Ai_loading/>
                            </>
                        )
                    }
                </>
            </div>
            <div className={"w-full h-[16%] flex items-start pt-[2%]  px-[3%] gap-[2%] "}>
                    <Input value={input} onChange={(e)=>{set_input(e.target.value)}} placeholder="Unravel the mystery you seek, and let it emerge from the depths of the unknown." className={"border-white h-[70%] font-semibold text-2xl text-white rounded focus:ring-amber-50 focus:border-white"} />
                    <button onClick={send_chat} className={"rounded-full hover:bg-orange-500 w-[70px] h-[70px] pr-[0.3%] pt-[0.2%]  text-white border border-orange-500 flex justify-center items-center" }> <Image
                                src="/submit.svg"
                                width={40}
                                height={40}
                                alt="Picture of the author"
                        />
                    </button>
            </div>

        </div>
    </>)


}

