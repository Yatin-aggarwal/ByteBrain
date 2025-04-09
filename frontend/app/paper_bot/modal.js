"use client";
import {useContext, useState} from "react";
import {context} from "@/app/paper_bot/context_provider";
import { Input } from "@/components/ui/input"
export  function Pop_up() {
   const{url , set_url} = useContext(context);
   const[value , set_value ] = useState()
  return (
    <>
        <div className={" flex justify-center items-center h-full w-full "}>
            <div className={"w-full h-[30%] flex gap-[3%] items-center justify-center"}>
                <Input  placeholder={"Please provide the URL of the ML paper you'd like to analyze"} onChange ={(e)=>{set_value(e.target.value)}}  value={value} className={"h-[20%] w-[50%] border-white-white text-gray-500"}/>
                <button className={"border-orange-500 border text-white h-[20%] w-[10%] hover:bg-orange-500"} onClick={()=>{
                   set_url(value)
                    set_value("")
                }}> Enter </button>
            </div>

        </div>


    </>
  );
}
