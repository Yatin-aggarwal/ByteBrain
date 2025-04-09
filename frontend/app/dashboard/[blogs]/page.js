'use client'
import useSWR from 'swr';
import { Suspense } from 'react'
import Loading from "@/app/dashboard/loading";
import {Card} from "@/app/dashboard/card";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {redirect} from "next/navigation";
import {useParams} from "next/navigation";
import {Pagination_component} from "@/app/dashboard/pagination_component";
const fetcher = (url) => fetch(url).then((r) => r.json())
export default function  page(){
    const { getUser,isAuthenticated, loading} = useKindeBrowserClient()
    if(loading){
        return(<>
            <Loading/>
        </>)
    }
    const {blogs} = useParams();
    if(isAuthenticated===false && loading===false){
        redirect('/')
    };
    console.log(blogs)
    const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blog/${blogs}`,
    fetcher
  )
    if(isLoading){
        return (
            <Loading/>
        )
    }
    if(data=== undefined){
        return (
            <>
                <div className={"text-white h-full flex justify-center items-center w-full font-bold text-4xl"}>
                     Blogs not exist
                </div>
            </>
        )
    }

    return (<>
        <div className={"text-white pt-[1%] h-dvh w-full  "}>
            <div className={"w-full h-[90%] overflow-y-scroll"}>
            {data.map((val, index) => {
                val = JSON.parse(val)
                return (<>
                    <Card content={{
                        id: index,
                        heading: val.heading,
                        subheading: val.subheading,
                        content: val.content,
                        username: val.username
                    }}/>
                </>)
            })}
                </div>
            <div className={"w-full flex overflow-hidden pt-[1%]"}>
                <Pagination_component content={blogs}/>
            </div>

        </div>
    </>)
}