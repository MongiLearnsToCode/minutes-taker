import MeetingCard from '@/components/MeetingCard';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import MainLayout from '@/layouts/MainLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

// Define the Meeting interface based on your database structure
interface Meeting {
    id: number;
    title: string;
    summary?: string;
    created_at: string;
    status: 'processing' | 'completed' | 'failed' | 'processing'; // Adjust based on DB
    // Add other fields as necessary
}

interface AllNotesProps {
    meetingList?: Meeting[];
}

export default function AllNotes({ meetingList = [] }: AllNotesProps) {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest');
    const [meetingToDelete, setMeetingToDelete] = useState<number | null>(null);

    // Helper to format date consistent with design (e.g., "Oct 24")
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    const confirmDelete = () => {
        if (meetingToDelete) {
            router.delete(`/meetings/${meetingToDelete}`, {
                preserveScroll: true,
                onSuccess: () => setMeetingToDelete(null),
                onFinish: () => setMeetingToDelete(null),
            });
        }
    };

    // Filter and Sort meetings
    const filteredMeetings = meetingList
        .filter(
            (meeting) =>
                meeting.title.toLowerCase().includes(search.toLowerCase()) ||
                (meeting.summary &&
                    meeting.summary
                        .toLowerCase()
                        .includes(search.toLowerCase())),
        )
        .sort((a, b) => {
            if (sort === 'oldest') {
                return (
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
                );
            }
            return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
        });

    return (
        <MainLayout>
            <Head title="All Meetings" />
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-extrabold tracking-tight text-text-main">
                            All Meetings
                        </h1>
                        <p className="font-medium text-text-sub">
                            Browse and manage your entire meeting history.
                        </p>
                    </div>
                    <div className="w-full md:w-96">
                        <div className="group relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                <span className="material-symbols-outlined text-text-sub/70 transition-colors group-focus-within:text-black">
                                    search
                                </span>
                            </div>
                            <Input
                                className="block w-full rounded-2xl border-none bg-white py-6 pr-3 pl-11 text-text-main placeholder-text-sub/60 shadow-soft transition-all focus-visible:ring-0"
                                placeholder="Search by title, participant..."
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-text-sub">
                                    ⌘K
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border-subtle/40 bg-surface-card p-2 shadow-sm">
                    <div className="flex flex-col items-center justify-between gap-4 px-2 lg:flex-row">
                        <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto pb-2 lg:w-auto lg:pb-0">
                            <Button
                                variant="ghost"
                                className="flex h-auto items-center gap-2 rounded-xl border border-transparent bg-gray-50 px-4 py-2 text-sm font-semibold text-text-main transition-colors hover:bg-gray-100"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    calendar_month
                                </span>
                                All Time
                                <span className="material-symbols-outlined text-[16px] text-text-sub">
                                    expand_more
                                </span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex h-auto items-center gap-2 rounded-xl border border-border-subtle/50 bg-white px-4 py-2 text-sm font-medium text-text-sub shadow-none transition-colors hover:bg-gray-50 hover:text-text-main"
                            >
                                Participants
                                <span className="material-symbols-outlined text-[16px]">
                                    expand_more
                                </span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex h-auto items-center gap-2 rounded-xl border border-border-subtle/50 bg-white px-4 py-2 text-sm font-medium text-text-sub shadow-none transition-colors hover:bg-gray-50 hover:text-text-main"
                            >
                                Status
                                <span className="material-symbols-outlined text-[16px]">
                                    expand_more
                                </span>
                            </Button>
                            <div className="mx-1 hidden h-6 w-px bg-gray-200 md:block"></div>
                            <Button
                                variant="outline"
                                className="flex h-auto items-center gap-2 rounded-xl border border-border-subtle/50 bg-white px-4 py-2 text-sm font-medium text-text-sub shadow-none transition-colors hover:bg-gray-50 hover:text-text-main"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    filter_list
                                </span>
                                More Filters
                            </Button>
                        </div>
                        <div className="flex w-full items-center justify-between gap-3 border-t border-gray-100 pt-3 lg:w-auto lg:justify-end lg:border-t-0 lg:pt-0">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-text-sub">
                                    Sort by:
                                </span>
                                <Select value={sort} onValueChange={setSort}>
                                    <SelectTrigger className="h-auto w-[180px] gap-1 border-none bg-transparent p-0 font-bold text-text-main shadow-none focus:ring-0">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">
                                            Newest First
                                        </SelectItem>
                                        <SelectItem value="oldest">
                                            Oldest First
                                        </SelectItem>
                                        <SelectItem value="duration">
                                            Duration
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-md bg-white text-black shadow-sm hover:bg-white hover:text-black"
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        grid_view
                                    </span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-text-sub transition-colors hover:bg-gray-200/50 hover:text-black"
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        view_list
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {filteredMeetings.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {filteredMeetings.map((meeting) => (
                            <MeetingCard
                                key={meeting.id}
                                id={meeting.id}
                                title={meeting.title}
                                description={
                                    meeting.summary ||
                                    'No summary available yet.'
                                }
                                date={formatDate(meeting.created_at)}
                                duration="--" // No duration in DB yet
                                type="mic" // Default type
                                status={
                                    meeting.status === 'processing'
                                        ? 'Processing...'
                                        : meeting.status === 'completed'
                                          ? 'Processed'
                                          : 'Draft'
                                }
                                participants={[]} // No participants in DB yet
                                onDelete={(id) => setMeetingToDelete(id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-text-sub">
                        <p className="text-lg">No meetings found.</p>
                    </div>
                )}

                {/* Pagination placeholder if needed, or keeping Load More for now but disabling if no logic */}
                <div className="flex justify-center pt-8 pb-4">
                    <Button
                        variant="outline"
                        className="text-md flex h-auto items-center gap-2 rounded-xl border border-border-subtle bg-white px-6 py-6 font-semibold text-text-main shadow-sm transition-all hover:bg-gray-50"
                    >
                        Load More Notes
                        <span className="material-symbols-outlined text-sm">
                            expand_more
                        </span>
                    </Button>
                </div>
            </div>

            <AlertDialog
                open={!!meetingToDelete}
                onOpenChange={(open) => !open && setMeetingToDelete(null)}
            >
                <AlertDialogContent className="max-w-[400px] rounded-2xl border-none bg-white p-8 shadow-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold text-text-main">
                            Delete Meeting?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="mt-2 text-base font-medium text-text-sub">
                            This action cannot be undone. This will permanently
                            delete the meeting and remove all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6 gap-3 sm:space-x-0">
                        <AlertDialogCancel className="flex-1 rounded-xl border-transparent bg-gray-50 py-6 font-semibold text-text-main hover:bg-gray-100">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="flex-1 rounded-xl bg-red-600 py-6 font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </MainLayout>
    );
}
