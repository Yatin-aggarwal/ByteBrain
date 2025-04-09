
export function Human(props){
    return(<>
        <div className="w-full  flex justify-end gap-[1%] pt-[1%]">
            <div className={"w-[60%] rounded-xl bg-neutral-900 text-white flex px-[2%] py-[0.8%]"}>
                {props.content}
            </div>
        </div>


    </>)
}