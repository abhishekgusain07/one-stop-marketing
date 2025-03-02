"use client"

import * as React from "react"
import {
  Activity,
  AudioWaveform,
  BookOpen,
  Bot,
  Briefcase,
  Calendar,
  ChevronsUpDown,
  Clapperboard,
  Command,
  CreditCard,
  Frame,
  FrameIcon,
  GalleryHorizontal,
  GalleryVerticalEnd,
  Image,
  Images,
  Layers,
  Link,
  Map,
  Package2,
  PieChart,
  PlusIcon,
  Settings2,
  Settings2Icon,
  SquareTerminal,
  Video,
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
import { useUser } from "@clerk/nextjs"

// This is sample data.
const data = {
  user: {
    name: "abhishek gusain",
    email: "abhishek.gusain1007fb@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "One Stop Marketing",
      logo: Briefcase,
      plan: "Enterprise",
    }
  ],
  navMain:[
    {
      title: "Images",
      url: "/images",
      icon: Images,
      isActive: true,
      items: [
        {
          title: "dashboard",
          url: "/dashboard/images/images-dashboard",
          icon: SquareTerminal
        },
        {
          title: "Generate Image",
          url: "/dashboard/images/image-generation",
          icon: Image
        },
        {
          title: "My Models",
          url: "/dashboard/images/models",
          icon: FrameIcon
        },
        {
          title: "Train Model",
          url: "/dashboard/images/model-training",
          icon: Layers
        },
        {
          title: "My Images",
          url: "/dashboard/images/gallery",
          icon: Images
        },
        {
          title: "Billing",
          url: "/dashboard/images/billing",
          icon: CreditCard
        },
        {
          title: "Settings",
          url: "/dashboard/images/account-settings",
          icon: Settings2Icon
        },
      ],
    },
    {
      title: "UGC",
      url: "dashboard/ugc",
      icon: Clapperboard,
      isActive: true,
      items: [
        {
          title: "Create",
          url: "/dashboard/ugc/create",
          icon: PlusIcon
        },
        {
          title: "Videos",
          url: "/dashboard/ugc/videos",
          icon: Video
        },
        {
          title: "connect",
          url: "/dashboard/ugc/connect",
          icon: Link
        },
        {
          title: "product",
          url: "/dashboard/ugc/product",
          icon: Package2
        },
        {
          title: "schedule",
          url: "/dashboard/ugc/schedule",
          icon: Calendar
        },
        {
          title: "campaign",
          url: "/dashboard/ugc/campaign",
          icon: Activity
        }
      ],
    },
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
  const { user } = useUser();
  const userData = {
    name: user?.fullName!,
    email: user?.primaryEmailAddress?.emailAddress!,
    avatar: user?.imageUrl!
  }
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
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
