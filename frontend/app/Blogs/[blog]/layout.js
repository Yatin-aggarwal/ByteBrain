import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/components/app-sidebar"

export default function Layout({ children }) {
  return (
      <SidebarProvider style={{
          "--sidebar-width": "14rem",
          "--sidebar-width-mobile": "20rem",}}>

          <AppSidebar/>
          <span
              className={"h-dvh flex items-end bg-black text-white hover:text-orange-500   "}><SidebarTrigger/></span>
          <main className={"w-full"}>
              {children}
          </main>
      </SidebarProvider>
  )
}