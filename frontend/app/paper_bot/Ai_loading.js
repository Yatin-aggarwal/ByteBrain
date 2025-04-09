import Image from "next/image";

export default  function Ai_loading(){
    return <>
        <div className="w-full   flex gap-[1%] pt-[1%]">
            <div className={"bg-orange-600 rounded-full w-[40px] flex justify-center items-center h-[40px] "}>
                <Image src={"human.svg"} alt={"AI"} width={30} height={30}/>
            </div>
            <div className={"w-[60%]  rounded-xl bg-neutral-900 text-gray-500 flex px-[2%] animate-pulse  py-[0.8%]"}>
                <span className="w-3 h-3 bg-neutral-700 rounded-full"></span> &nbsp; <span
                className="w-3 h-3 bg-neutral-700 rounded-full"></span> &nbsp; <span
                className="w-3 h-3 bg-neutral-700 rounded-full"></span>
            </div>
        </div>

    </>
}