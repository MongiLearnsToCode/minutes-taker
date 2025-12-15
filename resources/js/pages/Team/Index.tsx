import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import TeamMemberCard from '@/components/TeamMemberCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    // Add other fields if available
}

interface TeamProps {
    team?: User[];
}

export default function Team({ team = [] }: TeamProps) {
    const [search, setSearch] = useState('');

    const filteredTeam = team.filter(member =>
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <MainLayout>
            <Head title="Team" />
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-extrabold text-text-main tracking-tight">Team Members</h1>
                        <p className="text-text-sub font-medium">Manage your team's access, roles, and collaboration settings.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                        <div className="relative group flex-1 sm:w-80">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-text-sub/70 group-focus-within:text-black transition-colors">search</span>
                            </div>
                            <Input
                                className="block w-full pl-11 pr-3 py-6 border-none rounded-2xl bg-white text-text-main placeholder-text-sub/60 focus-visible:ring-0 shadow-soft transition-all"
                                placeholder="Search by name or email..."
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button className="flex items-center justify-center gap-2 px-6 py-6 bg-black hover:bg-gray-800 text-white rounded-2xl font-semibold shadow-lg shadow-black/20 hover:scale-[1.02] transition-all whitespace-nowrap text-md">
                            <span className="material-symbols-outlined text-[20px]">person_add</span>
                            Invite Member
                        </Button>
                    </div>
                </div>

                <div className="bg-surface-card rounded-2xl p-2 shadow-sm border border-border-subtle/40">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between px-2">
                        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
                            <Button variant="ghost" className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-semibold text-text-main transition-colors border border-transparent h-auto">
                                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                                All Roles
                                <span className="material-symbols-outlined text-[16px] text-text-sub">expand_more</span>
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-xl text-sm font-medium text-text-sub hover:text-text-main transition-colors border border-border-subtle/50 h-auto shadow-none">
                                Status
                                <span className="material-symbols-outlined text-[16px]">expand_more</span>
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-xl text-sm font-medium text-text-sub hover:text-text-main transition-colors border border-border-subtle/50 h-auto shadow-none">
                                Department
                                <span className="material-symbols-outlined text-[16px]">expand_more</span>
                            </Button>
                            <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block"></div>
                            <Button variant="outline" className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-xl text-sm font-medium text-text-sub hover:text-text-main transition-colors border border-border-subtle/50 h-auto shadow-none">
                                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                More Filters
                            </Button>
                        </div>
                        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-text-sub font-medium">Sort by:</span>
                                <Select defaultValue="name">
                                    <SelectTrigger className="w-[180px] border-none shadow-none font-bold text-text-main focus:ring-0 p-0 h-auto gap-1 bg-transparent">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name">Name (A-Z)</SelectItem>
                                        <SelectItem value="recent">Recently Active</SelectItem>
                                        <SelectItem value="role">Role</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 bg-white shadow-sm rounded-md text-black hover:bg-white hover:text-black">
                                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-text-sub hover:text-black transition-colors hover:bg-gray-200/50">
                                    <span className="material-symbols-outlined text-[20px]">view_list</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {filteredTeam.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {filteredTeam.map((member) => (
                            <TeamMemberCard
                                key={member.id}
                                name={member.name}
                                email={member.email}
                                role="Member" // Default role as DB doesn't have it yet
                                department="General" // Default
                                status="Active"
                                // avatarUrl="" // Use default
                                joinedDate={formatDate(member.created_at)}
                                lastActive="--"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-text-sub">
                        <p className="text-lg">No team members found.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
