import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { router } from '@inertiajs/react';

interface MeetingCardProps {
    id?: number;
    title: string;
    description: string;
    date: string;
    duration: string;
    type: 'mic' | 'video' | 'group' | 'chart' | 'design';
    status: 'Processed' | 'Processing...' | 'Draft';
    participants: string[];
    extraParticipants?: number;
    colorFn?: (type: string) => { bg: string; text: string };
    onDelete?: (id: number) => void;
}

export default function MeetingCard({
    id,
    title,
    description,
    date,
    duration,
    type,
    status,
    participants,
    extraParticipants,
    onDelete,
}: MeetingCardProps) {
    const handleDeleteClick = () => {
        if (id && onDelete) {
            onDelete(id);
        }
    };

    const handleCardClick = (e: React.MouseEvent) => {
        if (id && typeof id === 'number') {
            router.get(`/meetings/${id}`);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'mic':
                return 'mic';
            case 'video':
                return 'video_camera_front';
            case 'group':
                return 'groups';
            case 'chart':
                return 'show_chart';
            case 'design':
                return 'design_services';
            default:
                return 'mic';
        }
    };

    const getColorClass = (type: string) => {
        switch (type) {
            case 'mic':
                return 'bg-orange-50 text-orange-600';
            case 'video':
                return 'bg-purple-50 text-purple-600';
            case 'group':
                return 'bg-blue-50 text-blue-600';
            case 'chart':
                return 'bg-cyan-50 text-cyan-600';
            case 'design':
                return 'bg-pink-50 text-pink-600';
            default:
                return 'bg-gray-50 text-gray-600';
        }
    };

    const getStatusClass = (status: string) => {
        if (status === 'Processing...')
            return 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200 animate-pulse';
        if (status === 'Draft')
            return 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200';
        return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200';
    };

    return (
        <Card
            onClick={handleCardClick}
            className="group flex h-full cursor-pointer flex-col justify-between gap-5 rounded-3xl border border-transparent bg-surface-card p-6 shadow-soft transition-all duration-300 hover:translate-y-[-4px] hover:border-border-subtle/50 hover:shadow-xl"
        >
            <div className="flex items-start justify-between">
                <div
                    className={`rounded-xl p-2.5 shadow-sm ${getColorClass(type)}`}
                >
                    <span className="material-symbols-outlined">
                        {getIcon(type)}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className={`rounded-full border-0 px-2.5 py-1 font-semibold ring-1 ring-inset ${getStatusClass(status)}`}
                    >
                        {status}
                    </Badge>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-black"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    more_horiz
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.stopPropagation(); /* Edit logic */
                                }}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600 focus:bg-red-50 focus:text-red-600"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick();
                                }}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div>
                <h3 className="mb-2 text-lg font-bold text-text-main transition-colors group-hover:text-accent-custom">
                    {title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-text-sub">
                    {description}
                </p>
            </div>
            <div className="mt-1 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-xs font-medium text-text-sub">
                    <span className="material-symbols-outlined text-sm">
                        calendar_today
                    </span>
                    <span>{date}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                    <span>{duration}</span>
                </div>
                <div className="flex -space-x-2">
                    {participants.map((url, index) => (
                        <Avatar
                            key={index}
                            className="h-7 w-7 border-0 shadow-sm ring-2 ring-white"
                        >
                            <AvatarImage src={url} alt="Participant" />
                            <AvatarFallback className="text-[9px] font-bold">
                                P{index}
                            </AvatarFallback>
                        </Avatar>
                    ))}
                    {extraParticipants && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-text-sub shadow-sm ring-2 ring-white">
                            +{extraParticipants}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
