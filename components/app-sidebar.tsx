"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronsUpDown,
  Command,
  CreditCard,
  Frame,
  FrameIcon,
  GalleryVerticalEnd,
  Image,
  Images,
  Layers,
  Map,
  PieChart,
  Settings2,
  Settings2Icon,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMainV2 } from "./nav-main-v2"

// This is sample data.
const data = {
  user: {
    name: "abhishek gusain",
    email: "abhishek.gusain1007fb@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain:[
    {
      title: "dashboard",
      url: "/dashboard",
      icon: SquareTerminal
    },
    {
      title: "Generate Image",
      url: "/image-generation",
      icon: Image
    },
    {
      title: "My Models",
      url: "/models",
      icon: FrameIcon
    },
    {
      title: "Train Model",
      url: "/model-training",
      icon: Layers
    },
    {
      title: "My Images",
      url: "/gallery",
      icon: Images
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard
    },
    {
      title: "Settings",
      url: "account-settings",
      icon: Settings2Icon
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const activeTeam = data.teams[0];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
            </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMainV2 items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
