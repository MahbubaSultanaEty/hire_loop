
import {Bars, Bell, Envelope, Gear, House, LayoutSideContentLeft, Magnifier, Person, PlusShape} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { Building, Plus } from "lucide-react";
import Link from "next/link";

export function DashboardSidebar() {
  const navItems = [
    {icon: House, href: "/dashboard/recruiter", label: "Home"},
    {icon: Magnifier,href: "/dashboard/recruiter/jobs", label: "Jobs"},
    {icon: PlusShape, href: "/dashboard/recruiter/jobs/new", label: "Create a Job"},
    {icon: Building, href: "/dashboard/recruiter/company", label: "Company"},
    {icon: Envelope, label: "Messages"},
    {icon: Person, label: "Profile"},
    {icon: Gear, label: "Settings"},
    ];
    
    const navContent=  <nav className="flex flex-col gap-1 mt-12">
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
                <div className="hidden fixed lg:block w-64 shrink-0 border-r border-default p-4 ">
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
              <Drawer.Heading>Navigation</Drawer.Heading>
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