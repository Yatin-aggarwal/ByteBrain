import Image from 'next/image'
export function Ai(props){
        return(<>
            <div className="w-full   flex gap-[1%] pt-[1%]">
                <div className={"bg-orange-600 rounded-full w-[40px] flex justify-center items-center h-[40px] "}>
                    <Image src={"human.svg"} alt={"AI"} width={30} height={30}/>
                </div>
                <div className={"w-[60%]  rounded-xl bg-neutral-900 text-white flex px-[2%] py-[0.8%]"}>
                    {props.content}
                </div>
            </div>
        </>)
}
