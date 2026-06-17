
import { getUserSession } from "@/lib/core/session";
import {Bars, Bell, Bookmark, Box, Briefcase, Envelope, FileText, Gear, House, LayoutSideContentLeft, Magnifier, Person, PlusShape} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { Building, Handshake, Plus } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {
  const user = await getUserSession();

  const recruiterNavLinks = [
    {icon: House, href: "/dashboard/recruiter", label: "Home"},
    {icon: Magnifier,href: "/dashboard/recruiter/jobs", label: "Jobs"},
    {icon: PlusShape, href: "/dashboard/recruiter/jobs/new", label: "Create a Job"},
    {icon: Building, href: "/dashboard/recruiter/company", label: "Company"},
    {icon: Envelope, label: "Messages"},
    {icon: Person, label: "Profile"},
    {icon: Gear, label: "Settings"},
  ];

  const jobSeekerNavItems = [
  {
    icon: House, 
    href: "/dashboard/seeker", 
    label: "Dashboard"
  },
  {
    icon: Briefcase, 
    href: "/dashboard/seeker/jobs", 
    label: "Jobs"
  },
  {
    icon: Bookmark, 
    href: "/dashboard/seeker/saved", 
    label: "Saved Jobs" 
  },
  {
    icon: FileText, 
    href: "/dashboard/seeker/applications", 
    label: "Applications"
  },
  {
    icon: Handshake, 
    href: "/dashboard/seeker/billing", 
    label: "Billing"
  }
];
  const navLinksMap = {
    seeker: jobSeekerNavItems,
    recruiter: recruiterNavLinks
  }
  const navItems = navLinksMap[user?.role || "seeker"];
    
    const navContent=  <nav className="flex flex-col gap-1 mt-2">
                {navItems.map((item) => (
                  <Link
                    href={`${item.href}`}
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>

    return (
      
        <>
            <aside className="relative">
                <div className="hidden fixed lg:block w-64 shrink-0 border-r border-default p-4  ">
                    {navContent}
                </div>
            </aside>
        <Drawer className="relative">
      <Button className="lg:hidden fixed" variant="secondary">
        <LayoutSideContentLeft  />
        
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading className="mt-22">Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
             {navContent}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
        </>
  );
}