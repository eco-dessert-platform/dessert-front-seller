import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from '../lib/shadcn/components/ui/sidebar'








const BgSside = () => {
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default BgSside