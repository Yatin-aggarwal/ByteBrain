import { Calendar, Home,LayoutList,LogOut, Layers,Bot,SquarePen,UserRoundPen} from "lucide-react"
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
    {
    title: "ML Paper Bot",
    url: "/paper_bot",
    icon: Bot,
  },

    
  {
    title: "Request Paper",
    url: "/request_paper",
    icon: Layers,
  },
  {
    title: "Compose",
    url: "/create_blog",
    icon: SquarePen,
  }
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon"  >
      <SidebarContent  className={"h-[100%] bg-[#1B1B1B]"}>
        <SidebarGroup className={"h-full"}>
          <SidebarGroupLabel className={" text-white"}>Application</SidebarGroupLabel>
          <SidebarGroupContent  className={"h-full"}>
            <SidebarMenu className={"h-full text-white"}>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={"hover:bg-orange-500 hover:text-white"} asChild>
                    <a href={item.url} >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className={"h-full flex items-end w-full"}>
              <SidebarMenuItem className={"w-full "} key={items[0].title}>
                  <SidebarMenuButton  className={"hover:bg-orange-500 hover:text-white"} asChild>
                    <LogoutLink>
                    <a href={items[0].url} className={"flex"}>
                        <LogOut/>
                        <span>&nbsp;&nbsp;Log Out</span>
                    </a>
                      </LogoutLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
