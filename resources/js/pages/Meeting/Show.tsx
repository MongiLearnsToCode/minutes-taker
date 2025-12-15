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
import MainLayout from '@/layouts/MainLayout';
import { Head, Link, router, usePoll } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    Copy,
    Download,
    FileText,
    Play,
    PlayCircle,
    PlusCircle,
    Search,
    Sparkles,
    Timer,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

interface ActionItem {
    id: number;
    content: string;
}

interface Meeting {
    id: number;
    title: string;
    created_at: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    summary: string | null;
    transcription: string | null;
    action_items: ActionItem[];
}

export default function Show({
    meeting,
    audio_url,
}: {
    meeting: Meeting;
    audio_url: string | null;
}) {
    const [copied, setCopied] = useState(false);
    const [meetingToDelete, setMeetingToDelete] = useState<number | null>(null);

    // Poll every 3 seconds if processing
    const { stop } = usePoll(3000, {
        only: ['meeting'],
        keepAlive: true,
    });

    // Stop polling when not processing
    if (meeting.status === 'completed' || meeting.status === 'failed') {
        stop();
    }

    const copyToClipboard = () => {
        const text = `Meeting: ${meeting.title}\nDate: ${new Date(meeting.created_at).toLocaleDateString()}\n\nSummary:\n${meeting.summary}\n\nAction Items:\n${meeting.action_items.map((i) => `- ${i.content}`).join('\n')}\n\nTranscript:\n${meeting.transcription}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadTxt = () => {
        const text = `Meeting: ${meeting.title}\nDate: ${new Date(meeting.created_at).toLocaleDateString()}\n\nSummary:\n${meeting.summary}\n\nAction Items:\n${meeting.action_items.map((i) => `- ${i.content}`).join('\n')}\n\nTranscript:\n${meeting.transcription}`;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${meeting.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_minutes.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const confirmDelete = () => {
        if (meetingToDelete) {
            router.delete(`/meetings/${meetingToDelete}`, {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit('/dashboard');
                },
            });
        }
    };

    // Placeholder data for UI elements not yet in DB
    const participants = [
        'https://ui-avatars.com/api/?name=Sarah+Connor&background=random',
        'https://ui-avatars.com/api/?name=John+Doe&background=random',
        'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
    ];

    const tags = [
        '#Q4 Roadmap',
        '#AI Module',
        '#Mobile App',
        '#Budgeting',
        '#Jira',
    ];

    return (
        <MainLayout>
            <Head title={meeting.title} />

            <div className="mx-auto max-w-7xl space-y-8">
                {/* Header Navigation */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/dashboard"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-text-sub transition-colors hover:text-text-main"
                    >
                        <ArrowLeft className="text-lg transition-transform group-hover:-translate-x-1" />
                        Back to All Meetings
                    </Link>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={downloadTxt}
                            className="rounded-lg p-2 text-text-sub transition-colors hover:bg-white hover:text-text-main"
                            title="Export"
                        >
                            <Download className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => setMeetingToDelete(meeting.id)}
                            className="rounded-lg p-2 text-text-sub transition-colors hover:bg-white hover:text-red-600"
                            title="Delete"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="relative overflow-hidden rounded-3xl bg-surface-card p-6 shadow-soft md:p-8">
                    <div className="flex flex-col justify-between gap-6 md:flex-row">
                        {/* Title and Metadata */}
                        <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-2xl font-bold text-text-main md:text-3xl">
                                    {meeting.title}
                                </h1>
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${meeting.status === 'completed'
                                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/10'
                                        : meeting.status === 'processing'
                                            ? 'animate-pulse bg-blue-50 text-blue-700 ring-blue-600/10'
                                            : 'bg-gray-50 text-gray-600 ring-gray-600/10'
                                        }`}
                                >
                                    {meeting.status === 'completed'
                                        ? 'Processed'
                                        : meeting.status
                                            .charAt(0)
                                            .toUpperCase() +
                                        meeting.status.slice(1)}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-text-sub ring-1 ring-gray-200 ring-inset">
                                    Product Team
                                </span>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-text-sub">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {formatDate(meeting.created_at)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        {formatTime(meeting.created_at)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Timer className="h-4 w-4" />
                                    <span>45m 12s</span> {/* Placeholder */}
                                </div>
                            </div>

                            {/* Audio Player Visualizer */}
                            {audio_url ? (
                                <div className="mt-6 flex max-w-2xl items-center gap-4 rounded-2xl border border-border-subtle/40 bg-gray-50 p-4">
                                    <button className="flex h-10 w-10 shrink-0 transform items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/20 transition-transform hover:scale-105">
                                        <PlayCircle className="h-5 w-5 fill-current" />
                                    </button>
                                    <div className="flex h-8 flex-1 items-center gap-1 opacity-60">
                                        {/* Mock visualizer bars */}
                                        {[
                                            3, 5, 4, 6, 8, 5, 3, 5, 7, 4, 6, 3,
                                            5, 2, 4, 6, 8, 5, 3, 4, 2, 3,
                                        ].map((h, i) => (
                                            <div
                                                key={i}
                                                className={`w-1 rounded-full ${i === 16 ? 'bg-accent-custom' : 'bg-primary-custom'}`}
                                                style={{ height: `${h * 4}px` }}
                                            ></div>
                                        ))}
                                    </div>
                                    <span className="font-mono text-xs text-text-sub">
                                        12:34 / 45:12
                                    </span>
                                </div>
                            ) : (
                                <div className="mt-6 flex max-w-2xl items-center gap-4 rounded-2xl border border-border-subtle/40 bg-gray-50 p-4">
                                    <span className="text-sm text-text-sub">
                                        Audio unavailable
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Participants Section */}
                        <div className="flex min-w-[200px] flex-col items-start gap-4 md:items-end">
                            <h3 className="text-xs font-semibold tracking-wider text-text-sub uppercase">
                                Participants
                            </h3>
                            <div className="flex -space-x-3">
                                {participants.map((src, i) => (
                                    <div
                                        key={i}
                                        className="h-10 w-10 rounded-full bg-cover bg-center shadow-sm ring-2 ring-white"
                                        style={{
                                            backgroundImage: `url('${src}')`,
                                        }}
                                    ></div>
                                ))}
                                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-text-sub shadow-sm ring-2 ring-white transition-colors hover:bg-gray-200">
                                    +2
                                </div>
                            </div>
                            <button className="mt-1 flex items-center gap-1 text-sm font-medium text-accent-custom hover:underline">
                                <PlusCircle className="h-4 w-4" />
                                Add participant
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                    {/* Transcript Section (Left Column) */}
                    <div className="space-y-6 lg:col-span-8">
                        <div className="flex h-[800px] flex-col rounded-3xl bg-surface-card shadow-soft">
                            <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b border-border-subtle/50 bg-surface-card p-6">
                                <h2 className="flex items-center gap-2 text-xl font-bold text-text-main">
                                    <FileText className="h-6 w-6 text-text-sub" />
                                    Transcript
                                </h2>
                                <div className="relative w-64">
                                    <Search className="absolute top-2.5 left-3 h-4 w-4 text-text-sub" />
                                    <input
                                        className="w-full rounded-xl border-none bg-background-main py-2 pr-4 pl-9 text-sm text-text-main placeholder-text-sub/60 transition-all focus:ring-2 focus:ring-accent-custom/20"
                                        placeholder="Search in transcript..."
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 space-y-8 overflow-y-auto p-6">
                                {meeting.transcription ? (
                                    meeting.transcription
                                        .split('\n\n')
                                        .map((paragraph, idx) => (
                                            <div
                                                key={idx}
                                                className="group flex gap-4"
                                            >
                                                <div className="mt-1 shrink-0">
                                                    <div
                                                        className="h-8 w-8 rounded-full bg-cover bg-center shadow-sm"
                                                        style={{
                                                            backgroundImage: `url('${participants[idx % participants.length]}')`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <span className="text-sm font-bold text-text-main">
                                                            Speaker {idx + 1}
                                                        </span>
                                                        <span className="font-mono text-xs text-text-sub">
                                                            00:
                                                            {idx * 15 < 10
                                                                ? '0'
                                                                : ''}
                                                            {idx * 15}
                                                        </span>
                                                    </div>
                                                    <p className="leading-relaxed text-text-main">
                                                        {paragraph}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                                    <button className="rounded p-1 text-text-sub hover:bg-gray-100 hover:text-black">
                                                        <Play className="h-4 w-4" />
                                                    </button>
                                                    <button className="rounded p-1 text-text-sub hover:bg-gray-100 hover:text-black">
                                                        <Copy className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center text-center text-text-sub">
                                        <p className="italic">
                                            No transcript available yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (Right Column) */}
                    <div className="space-y-6 lg:col-span-4">
                        {/* AI Summary Card */}
                        <div className="rounded-3xl border border-transparent bg-surface-card p-6 shadow-soft transition-colors hover:border-border-subtle/50">
                            <div className="mb-4 flex items-center gap-2">
                                <div className="rounded-lg bg-blue-50 p-1.5 text-blue-600">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <h3 className="font-bold text-text-main">
                                    AI Summary
                                </h3>
                            </div>
                            <div className="space-y-3 text-sm leading-relaxed text-text-main">
                                {meeting.summary ? (
                                    <p>{meeting.summary}</p>
                                ) : (
                                    <p className="text-text-sub italic">
                                        Generating summary...
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action Items Card */}
                        <div className="rounded-3xl border border-transparent bg-surface-card p-6 shadow-soft transition-colors hover:border-border-subtle/50">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-lg bg-orange-50 p-1.5 text-orange-600">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-bold text-text-main">
                                        Action Items
                                    </h3>
                                </div>
                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-text-sub">
                                    {meeting.action_items.length} Open
                                </span>
                            </div>
                            <div className="space-y-3">
                                {meeting.action_items.map((item, idx) => (
                                    <div key={item.id}>
                                        <label className="group flex cursor-pointer items-start gap-3">
                                            <input
                                                className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                type="checkbox"
                                            />
                                            <span className="text-sm text-text-main transition-colors group-hover:text-black">
                                                {item.content}
                                            </span>
                                        </label>
                                        <div className="mb-1 pl-7">
                                            <div className="flex items-center gap-1.5">
                                                <img
                                                    className="h-4 w-4 rounded-full"
                                                    src={
                                                        participants[
                                                        idx %
                                                        participants.length
                                                        ]
                                                    }
                                                    alt="Assignee"
                                                />
                                                <span className="text-xs text-text-sub">
                                                    Assigned to User {idx + 1}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="mt-4 w-full rounded-xl border border-dashed border-gray-300 py-2 text-sm font-medium text-text-sub transition-colors hover:bg-gray-50 hover:text-black">
                                    + Add manual item
                                </button>
                            </div>
                        </div>

                        {/* Key Topics Card */}
                        <div className="rounded-3xl border border-transparent bg-surface-card p-6 shadow-soft transition-colors hover:border-border-subtle/50">
                            <h3 className="mb-4 text-sm font-bold tracking-wider text-text-sub uppercase">
                                Key Topics
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="cursor-pointer rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-text-main hover:bg-gray-100"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete Confirmation Dialog */}
                <AlertDialog
                    open={meetingToDelete !== null}
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
            </div>
        </MainLayout>
    );
}
