import { Link } from '@inertiajs/react';
import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupContent
} from '@/components/ui/sidebar';

export default function Sidebar() {
    return (
        <ShadcnSidebar variant="inset" className="border-r border-border-subtle/50 bg-surface-card" collapsible="icon">
            <SidebarHeader className="p-6 pb-2">
                <div className="flex items-center gap-3 mb-6 px-1">
                    <div className="bg-black text-white p-2 rounded-xl shadow-lg shadow-black/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">graphic_eq</span>
                    </div>
                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                        <h1 className="text-text-main text-lg font-bold leading-none tracking-tight">AI Notes</h1>
                        <p className="text-text-sub text-xs font-medium mt-1">Pro Workspace</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild size="lg" isActive={window.location.pathname === '/dashboard'}
                                    className={`rounded-2xl px-5 py-7 transition-all duration-300 font-medium text-text-sub hover:text-text-main hover:bg-gray-100/80 data-[active=true]:bg-black data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-black/20 data-[active=true]:hover:bg-black/90 group`}
                                >
                                    <Link href="/dashboard" className="flex items-center gap-3.5 w-full">
                                        <span className={`material-symbols-outlined text-[22px] transition-colors ${window.location.pathname === '/dashboard' ? 'text-white' : 'text-gray-400 group-hover:text-text-main'}`}>dashboard</span>
                                        <span className="text-base tracking-tight">Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild size="lg" isActive={window.location.pathname === '/notes'}
                                    className={`rounded-2xl px-5 py-7 transition-all duration-300 font-medium text-text-sub hover:text-text-main hover:bg-gray-100/80 data-[active=true]:bg-black data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-black/20 data-[active=true]:hover:bg-black/90 group`}
                                >
                                    <Link href="/notes" className="flex items-center gap-3.5 w-full">
                                        <span className={`material-symbols-outlined text-[22px] transition-colors ${window.location.pathname === '/notes' ? 'text-white' : 'text-gray-400 group-hover:text-text-main'}`}>library_music</span>
                                        <span className="text-base tracking-tight">All Notes</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild size="lg" isActive={window.location.pathname === '/team'}
                                    className={`rounded-2xl px-5 py-7 transition-all duration-300 font-medium text-text-sub hover:text-text-main hover:bg-gray-100/80 data-[active=true]:bg-black data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-black/20 data-[active=true]:hover:bg-black/90 group`}
                                >
                                    <Link href="/team" className="flex items-center gap-3.5 w-full">
                                        <span className={`material-symbols-outlined text-[22px] transition-colors ${window.location.pathname === '/team' ? 'text-white' : 'text-gray-400 group-hover:text-text-main'}`}>group</span>
                                        <span className="text-base tracking-tight">Team</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild size="lg" isActive={window.location.pathname === '/settings'}
                                    className={`rounded-2xl px-5 py-7 transition-all duration-300 font-medium text-text-sub hover:text-text-main hover:bg-gray-100/80 data-[active=true]:bg-black data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-black/20 data-[active=true]:hover:bg-black/90 group`}
                                >
                                    <Link href="/settings" className="flex items-center gap-3.5 w-full">
                                        <span className={`material-symbols-outlined text-[22px] transition-colors ${window.location.pathname === '/settings' ? 'text-white' : 'text-gray-400 group-hover:text-text-main'}`}>settings</span>
                                        <span className="text-base tracking-tight">Settings</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-border-subtle/50">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group-data-[collapsible=icon]:justify-center">
                    <div className="w-9 h-9 flex-shrink-0 rounded-full bg-cover bg-center ring-2 ring-white shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-D7jBEqvvDI7R1uudJbyDzQ3ebEXzlF9GTuEcTVAxh3vZ1Ex9IrGcjm9vljmJwm9lihImHW9rAem2kzHWGcWcXUU6mv-jMuklLvKY5RT021cxvKy8M7dm1kIco0DQVfb960I8P2Vs9nRZSapbd1mGMHeHM5L7HHZRK5oNdxkw4y4mnyV7ecsRFyuoCBD7sDN--opKDKhmvGiG0gFpqDMHDR9E_j-9Gbme3oWxAW67TnsySb03INdL_beXdBi5rTBpbwoQDzn9bHzE')" }}></div>
                    <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
                        <p className="text-text-main text-sm font-bold truncate">Sarah Connor</p>
                        <p className="text-text-sub text-xs truncate">sarah@skynet.com</p>
                    </div>
                    <span className="material-symbols-outlined text-text-sub ml-auto text-[18px] group-data-[collapsible=icon]:hidden">more_vert</span>
                </div>
            </SidebarFooter>
        </ShadcnSidebar>
    );
}
