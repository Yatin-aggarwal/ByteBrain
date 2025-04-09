'use client'
import useSWR from 'swr';
import { Suspense } from 'react'
import Loading from "@/app/dashboard/loading";
import {Card} from "@/app/dashboard/card";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {redirect} from "next/navigation";
import {Pagination_component} from "@/app/dashboard/pagination_component";
const fetcher = (url) => fetch(url).then((r) => r.json())
export default function  page(){
    const { getUser,isAuthenticated, loading} = useKindeBrowserClient()
    if(loading){
        return(<>
            <Loading/>
        </>)
    }
    if(isAuthenticated===false && loading===false){
        redirect('/')
    };
    const { data, error, isLoading } = useSWR(
    'http://localhost:8000/blog',
    fetcher
  )
    if(isLoading){
        return (
            <Loading/>
        )
    }


    return (<>
        <div className={"text-white pt-[1%] h-dvh w-full  "}>
            <div className={"w-full h-[90%] overflow-y-scroll"}>
                {data!= undefined&&data.map((val, index) => {
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
                <Pagination_component content={1}/>
            </div>

        </div>
    </>)
}