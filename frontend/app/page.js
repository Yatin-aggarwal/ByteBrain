import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from 'next/image'

export default function Home() {
  return (
      <div className={"h-dvh w-dvw bg-black flex  flex-row"}>
          <div className={"w-[50%]  flex justify-center flex-col  pl-[1.6%] pb-[3%] "}>
              <div className="w-[100%]text-gray-400 text-6xl font-extrabold">
                  <div className="text-orange-500">Byte Brain:</div>
                  <div className={"text-white"}>Learn, Innovate, Elevate in ML!</div>
                  <div className={"text-3xl text-gray-400"}>Where Minds Meet Machines, and Ideas Shape the Future!</div>
              </div>
              <div className={"pt-[8%]  flex gap-[3%]"}>
                  <LoginLink className={"bg-orange-500 px-[7%] py-[1%] text-white rounded hover:bg-orange-700 hover:text-black"}>
                      Login
                  </LoginLink>
                  <RegisterLink className={"bg-black border-white border px-[7%] py-[1%] text-white rounded hover:text-black hover:bg-white "}>
                      SignUp
                  </RegisterLink>
              </div>

          </div>
          <div className="w-[50%] flex justify-center items-center ">
              <div className={""}>
              <Image src={"/Home.png"} alt={"image"} height="700" width="650"/>
              </div>
          </div>
      </div>
  );
}
