'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Paper_Table} from "@/app/request_paper/Table";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {redirect} from "next/navigation";
import {useState} from "react";
import axios from "axios";
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Page(){
    const [input , set_input] = useState("")
    const { getUser,isAuthenticated, isLoading} = useKindeBrowserClient();
    const { data, error, Loading } = useSWR(
    `http://localhost:8000/paper`,
    fetcher
  )
    if(isLoading){
        return(<>
            "loading"
        </>)
    }
    if(isAuthenticated===false && isLoading===false){
        redirect('/')
    };
    const user = getUser();

    if(Loading === true){
        return (
            <>
                "loading"
            </>
        )
    }
    console.log(data)
    return(<>
        <div className=" h-dvh  flex overflow-hidden flex-col  gap-[2%]  ">
          <div className={"h-[88%] flex overflow-y-scroll  text-white flex-col  px-[20%] pt-[2%] justify-center w-full"}>
                  <Paper_Table  content = {data}/>
          </div>
            <div className={"w-full  h-[12%]  pb-[3%]  flex gap-[1%]   px-[12%] "}>
                <Input type="email"  value={input} onChange={(e) => set_input(e.target.value)} placeholder="Arxiv PDF Link" className={"border-white h-full text-white rounded focus:ring-amber-50 focus:border-white"} />
                <Button type="submit" onClick = {async ()=>{
                    const form = new FormData();
                    form.append('email',user.email)
                    form.append('url',input );
                    set_input("");

                    const res = await axios.post('http://localhost:8000/paper', form, {headers: {'Content-Type': 'multipart/form-data'}})
                    alert(res.data)
                }} className={"border-white border text-orange-500 hover:bg-white rounded h-full"}>Subscribe</Button>
            </div>
        </div>
    </>)
}