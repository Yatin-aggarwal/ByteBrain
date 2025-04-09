'use client'
import useSWR from 'swr';
import {useParams} from "next/navigation";

const fetcher = (url) => fetch(url).then((r) => r.json())

export default  function  page({
  params,
}){
    const {blog} = useParams()
    const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blog/blogs/${blog}`,
    fetcher
  )
    if(isLoading){
        return<>
        Loading
        </>
    }


    console.log(data)
    return<>
        <div className="h-full w-full text-white flex flex-col items-center px-[5%]">
            <div className={"w-full flex justify-start pt-[1%]"}>
                {data.Date}
            </div>
            <div className={"text-orange-500 font-bold text-4xl pt-[1%] w-full flex justify-center"}>
                {data.heading}
            </div>
            <div className={"w-full flex justify-center  text-xl font-semibold pt-[1%] "}>
                {data.subheading}
            </div>

            <div className={"w-full flex justify-center pt-[2%] text-gray-300"}>
                {data.content}
            </div>
            <div className={"w-full flex justify-start  text-xl font-semibold pt-[1%] "}>
                {data.username}
            </div>

        </div>
    </>
}