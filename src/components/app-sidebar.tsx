"use client";

import {
  BarChartIcon,
  BrainCircuit,
  ClipboardListIcon,
  DatabaseIcon,
  FileIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import * as React from "react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { useSession } from "@/components/session/provider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Dictionary } from "@/lib/i18n/types";
import Link from "next/link";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  dict: Dictionary;
};

export function AppSidebar({ dict, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <BrainCircuit className="size-8" />
                <span className="text-base font-semibold">Aioneers</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getNavMain(dict)} />
        <NavDocuments items={getNavDocuments(dict)} />
        <NavSecondary items={getNavSecondary(dict)} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <SideBarSessionUser dict={dict} />
      </SidebarFooter>
    </Sidebar>
  );
}

function SideBarSessionUser({ dict }: { dict: Dictionary }) {
  const session = useSession();
  if (!session?.user) {
    return null;
  }
  return (
    <SidebarFooter>
      <NavUser
        user={{
          name: session.user.name ?? "",
          email: session.user.email ?? "",
          avatar: session.user.image ?? "",
        }}
        dict={dict}
      />
    </SidebarFooter>
  );
}

const getNavMain = (dict: Dictionary) => {
  return [
    {
      title: dict?.dashboard?.title,
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: dict?.dashboard?.overview,
      url: "/lifecycle",
      icon: ListIcon,
    },
    {
      title: dict?.dashboard?.analytics,
      url: "/analytics",
      icon: BarChartIcon,
    },
    {
      title: dict?.dashboard?.reports,
      url: "/reports",
      icon: FolderIcon,
    },
  ];
};

const getNavDocuments = (dict: Dictionary) => {
  return [
    {
      title: dict?.dashboard?.title,
      url: "#",
      icon: DatabaseIcon,
    },
    {
      title: dict?.dashboard?.reports,
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      title: dict?.dashboard?.analytics,
      url: "#",
      icon: FileIcon,
    },
  ];
};

const getNavSecondary = (dict: Dictionary) => {
  return [
    {
      title: dict?.dashboard?.settings,
      url: "/settings",
      icon: SettingsIcon,
    },
    {
      title: dict?.dashboard?.help,
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: dict?.dashboard?.search,
      url: "#",
      icon: SearchIcon,
    },
  ];
};
