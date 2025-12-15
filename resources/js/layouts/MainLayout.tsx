import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <SidebarProvider>
            <Sidebar />
            <SidebarInset className="flex-1 flex flex-col h-full overflow-hidden relative w-full bg-background-main font-display text-text-main antialiased selection:bg-black selection:text-white">
                <header className="md:hidden flex h-14 items-center gap-4 border-b bg-surface-card px-6 shadow-sm z-20">
                    <SidebarTrigger className="text-text-sub hover:text-text-main" />
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-black">graphic_eq</span>
                        <span className="font-bold text-text-main">AI Notes</span>
                    </div>
                </header>
                {/* Desktop Trigger could be added here if we want collapsibility for desktop users too, likely in the top bar if one existed */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
