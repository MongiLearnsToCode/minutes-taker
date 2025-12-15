import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface TeamMemberCardProps {
    name: string;
    email: string;
    role: string;
    department: string;
    status: 'Active' | 'Away' | 'Pending';
    avatarUrl?: string; // Optional, might be just initials for pending
    initials?: string;
    joinedDate: string;
    lastActive: string;
    isCurrentUser?: boolean;
}

export default function TeamMemberCard({ name, email, role, department, status, avatarUrl, initials, joinedDate, lastActive, isCurrentUser }: TeamMemberCardProps) {
    const getStatusClass = (status: string) => {
        if (status === 'Active') return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200';
        if (status === 'Away') return 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200';
        if (status === 'Pending') return 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200';
        return 'bg-gray-50 text-gray-600';
    };

    const getRoleClass = (role: string) => {
        if (role === 'Admin') return 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200';
        if (role === 'Editor') return 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200';
        if (role === 'Viewer') return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200';
        return 'bg-gray-50 text-gray-600';
    };

    return (
        <Card className="group bg-surface-card rounded-3xl p-6 shadow-soft hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 cursor-pointer flex flex-col h-full justify-between gap-5 border border-transparent hover:border-border-subtle/50">
            <div className="flex justify-between items-start">
                {avatarUrl ? (
                    <Avatar className="w-16 h-16 rounded-2xl ring-4 ring-gray-50 shadow-md">
                        <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
                        <AvatarFallback className="text-xl font-bold bg-gray-100 text-gray-400 rounded-2xl">{initials || name.charAt(0)}</AvatarFallback>
                    </Avatar>
                ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center ring-4 ring-gray-50 shadow-inner">
                        <span className="text-xl font-bold text-gray-400">{initials}</span>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`rounded-full px-2.5 py-1 font-semibold border-0 ring-1 ring-inset ${getStatusClass(status)}`}>
                        {status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-300 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                    </Button>
                </div>
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-text-main group-hover:text-accent-custom transition-colors">{name}</h3>
                    {isCurrentUser && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide hover:bg-gray-200">You</Badge>
                    )}
                </div>
                <p className="text-sm text-text-sub">{email}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className={`rounded-md px-2 py-1 font-medium border-0 ring-1 ring-inset ${getRoleClass(role)}`}>{role}</Badge>
                    <Badge variant="outline" className="rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 hover:bg-gray-100 border-0">{department}</Badge>
                </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-1">
                {status === 'Pending' ? (
                    <div className="flex items-center gap-2 text-xs font-medium text-text-sub">
                        <span className="material-symbols-outlined text-sm">mail</span>
                        <span>Invited {lastActive}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-xs font-medium text-text-sub">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span>{lastActive}</span>
                    </div>
                )}

                {status === 'Pending' ? (
                    <button className="text-xs font-semibold text-accent-custom hover:text-blue-700 transition-colors">Resend Invite</button>
                ) : (
                    <div className="text-xs text-text-sub font-medium">Joined {joinedDate}</div>
                )}
            </div>
        </Card>
    );
}
