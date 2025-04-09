"use client";

import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { Textarea } from "@/components/ui/textarea";
import {redirect} from "next/navigation";
import {useState} from "react";
import axios from "axios";
import Loading from "@/app/create_blog/loading";



export default function Create_blog(){
    const [heading  , set_heading ] = useState("");
    const [subheading  , set_subheading ] = useState("");
    const [content , set_content] = useState("");
    const { getUser,isAuthenticated, isLoading} = useKindeBrowserClient();
    const user = getUser();
    if(isLoading){
        return(
            <Loading/>
        )
    }
    if(isAuthenticated===false && isLoading===false){
        redirect('/')
    }


    const submit  = async ()=>{
        const words =  content.trim().split(/\s+/).filter(word => word).length;
            if(words >= 800 || words<= 200){
                alert("Words must be in range 200 to 800");
            }
            else{

                    const form = new FormData();
                    form.append('email',user['email']);
                    form.append('username',`${user['given_name']} ${user['family_name']}`)
                    form.append('content',content);
                    form.append('subheading',subheading)
                    form.append('heading',heading );
                    set_heading("");set_subheading("");set_content("");
                    await axios.post('http://localhost:8000/blog', form, {headers: {'Content-Type': 'multipart/form-data'}})
                    alert("submitted");
                }

    }

    return (<>
    <div className={"h-full w-full  flex flex-col "}>
        <div className={"w-full flex text-white pt-[3%]"}>
            <div className={"w-[50%] px-[5%] flex flex-col items-center"}>
                <div className={"text-white w-full  font-sans font-thin text-2xl"}>
                    Heading
                </div>
                <input value={heading} maxLength={"23"} onChange={(e)=>{set_heading(e.target.value)}}
                    className={"border-b w-full  bg-black border-b-gray-600  text-lg font-thin  focus:border-b focus:border-white  pb-[1%] pt-[1%] text-white focus:ring-0 focus:ring-offset-0 focus:outline-0 "} />
            </div>
            <div  className={"w-[50%] px-[5%] flex flex-col items-center"}>
                <div className={"text-white w-full  font-sans font-thin text-2xl"}>
                    Sub Heading
                </div>
                <input value={subheading} maxLength={"100"} onChange={(e)=>{set_subheading(e.target.value); }}
                    className={"border-b w-full  bg-black border-b-gray-600  text-lg font-thin  focus:border-b focus:border-white  pb-[1%] pt-[1%] text-white focus:ring-0 focus:ring-offset-0 focus:outline-0 "}/>
            </div>
        </div>
        <div className={"w-full h-full text-white pl-[3%] pr-[5%] text-2xl font-thin pt-[3%] "}>
            <span className={"pl-[1%]"}>Content</span>
            <Textarea value={content} style={{fontSize: '1.3rem'}} className={"p-[1%] h-[75%] font-thin text-white text-4xl mt-[1%] rounded-2xl"} onChange={(e)=>{set_content(e.target.value) }}
                      placeholder="Type your message here."/>
            <div className={"w-full pt-[2%]"}>
                <button className={"w-full py-[0.5%] text-white border-white border hover:text-black hover:bg-white"} onClick={submit}>
                    Light Up Minds
                </button>
            </div>
        </div>
    </div>
    </>)
}