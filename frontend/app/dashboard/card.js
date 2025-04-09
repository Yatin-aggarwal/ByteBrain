import {redirect} from "next/navigation";
export function Card(props){
    return(<>
        <button id={props.content.id} onClick={()=>{redirect(`/Blogs/${props.content.id}`)}} className="w-full h-1/3 px-[3%] py-[0.5%] ">
            <div className={"w-full h-full    border-white border rounded-2xl"}>
                <div className={"font-bold text-4xl flex w-full justify-start pt-[1%] px-[2%]"}> {props.content.heading}
                </div>
                <div className={" text-lg flex w-full justify-start pt-[1%] px-[2%]"}> {props.content.subheading}
                </div>
                <span
                    className={" text-sm text-gray-400 flex w-full items-start justify-start pt-[1%] px-[2%] text-left"}> {props.content.content.slice(0,500)} </span>
                <div className={"w-full flex justify-start px-[2%] pt-[0.5%] pb-[0.5%]"}>
                    {props.content.username}
                </div>

            </div>

        </button>
    </>)
}