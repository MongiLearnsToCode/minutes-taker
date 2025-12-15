import AudioPlayer from '@/components/AudioPlayer';
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
import MainLayout from '@/layouts/MainLayout';
import meetings from '@/routes/meetings';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { DragEvent, FormEvent, useEffect, useRef, useState } from 'react';

// Define the Meeting interface based on your database structure
interface Meeting {
    id: number;
    title: string;
    summary?: string;
    created_at: string;
    status: 'processing' | 'completed' | 'failed' | 'processing'; // Adjust based on DB
    // Add other fields as necessary
}

interface DashboardProps {
    meetingList?: Meeting[]; // Optional processing if initially empty or loading
}

export default function Dashboard({ meetingList = [] }: DashboardProps) {
    const [search, setSearch] = useState('');
    const [audioPreview, setAudioPreview] = useState<string | null>(null);
    const [meetingToDelete, setMeetingToDelete] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        data,
        setData,
        post,
        progress,
        processing: isUploading,
        reset,
    } = useForm<{ audio: File | null }>({
        audio: null,
    });

    const confirmDelete = () => {
        if (meetingToDelete) {
            router.delete(meetings.destroy.url(meetingToDelete), {
                preserveScroll: true,
                onSuccess: () => setMeetingToDelete(null),
                onFinish: () => setMeetingToDelete(null),
            });
        }
    };

    // ... (Existing helper: formatDate)
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    // Filtered meetings based on search
    const filteredMeetings = meetingList.filter(
        (meeting) =>
            meeting.title.toLowerCase().includes(search.toLowerCase()) ||
            (meeting.summary &&
                meeting.summary.toLowerCase().includes(search.toLowerCase())),
    );

    // File handlers
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('audio', file);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (
            file &&
            (file.type.startsWith('audio/') ||
                file.name.match(/\.(mp3|wav|m4a)$/i))
        ) {
            setData('audio', file);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/meetings', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setAudioPreview(null);
            },
        });
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    // Audio preview effect
    useEffect(() => {
        if (data.audio) {
            const url = URL.createObjectURL(data.audio);
            setAudioPreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setAudioPreview(null);
        }
    }, [data.audio]);

    return (
        <MainLayout>
            <Head title="Dashboard" />
            <div className="mx-auto max-w-6xl space-y-10">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-extrabold tracking-tight text-text-main md:text-4xl">
                            Welcome back, Sarah
                        </h1>
                        <p className="font-medium text-text-sub">
                            Manage your recordings and create new
                            transcriptions.
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
                                placeholder="Search transcripts..."
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

                {/* Upload Section */}
                <div
                    className={`group relative cursor-pointer ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {!data.audio && !isUploading && (
                        <div className="relative flex flex-col items-center justify-center gap-6 rounded-3xl border-2 border-dashed border-transparent bg-surface-card px-6 py-20 shadow-soft transition-all duration-300 hover:translate-y-[-2px] hover:border-accent-custom/20 hover:shadow-xl">
                            <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 shadow-inner-light">
                                <span className="material-symbols-outlined text-5xl text-black">
                                    cloud_upload
                                </span>
                            </div>
                            <div className="space-y-2 text-center">
                                <h3 className="text-2xl font-bold text-text-main">
                                    New Transcription
                                </h3>
                                <p className="mx-auto max-w-sm text-sm leading-relaxed font-medium text-text-sub">
                                    Drag & drop MP3, WAV, or M4A files here to
                                    start processing.
                                    <br />
                                    Max file size 25MB.
                                </p>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".mp3,.wav,.m4a"
                                onChange={handleFileSelect}
                            />
                            <Button
                                onClick={triggerFileSelect}
                                className="text-md flex transform items-center justify-center gap-2 rounded-full bg-black px-8 py-6 font-semibold text-white shadow-lg shadow-black/20 transition-all hover:bg-gray-800 hover:shadow-black/30 active:scale-95"
                            >
                                <span className="material-symbols-outlined text-sm">
                                    add
                                </span>
                                <span>Select Audio File</span>
                            </Button>
                        </div>
                    )}

                    {/* Pending Upload State - User selected file, show confirm */}
                    {data.audio && !isUploading && (
                        <div className="relative flex flex-col items-center justify-center gap-6 rounded-3xl bg-surface-card px-6 py-10 shadow-soft">
                            <div className="mb-2 flex h-20 w-20 animate-pulse items-center justify-center rounded-2xl bg-blue-50 shadow-inner-light">
                                <span className="material-symbols-outlined text-5xl text-blue-600">
                                    audio_file
                                </span>
                            </div>
                            <div className="mb-4 space-y-2 text-center">
                                <h3 className="text-2xl font-bold text-text-main">
                                    {data.audio.name}
                                </h3>
                                <p className="text-sm font-medium text-text-sub">
                                    Ready to process?
                                </p>
                            </div>

                            {/* Audio Preview */}
                            {audioPreview && (
                                <div className="mb-6 w-full max-w-md px-4">
                                    <AudioPlayer src={audioPreview} />
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Button
                                    onClick={() => setData('audio', null)}
                                    variant="outline"
                                    className="rounded-full px-8 py-6"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    className="rounded-full bg-black px-8 py-6 text-white shadow-lg shadow-black/20 hover:bg-gray-800"
                                >
                                    Start Processing
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Uploading State */}
                    {isUploading && (
                        <div className="relative flex flex-col items-center justify-center gap-6 rounded-3xl bg-surface-card px-6 py-20 shadow-soft">
                            <div className="w-full max-w-md space-y-4">
                                <div className="flex justify-between text-sm font-medium">
                                    <span>Uploading...</span>
                                    <span>{progress?.percentage}%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        className="h-full bg-black transition-all duration-300 ease-out"
                                        style={{
                                            width: `${progress?.percentage}%`,
                                        }}
                                    ></div>
                                </div>
                                <p className="mt-4 text-center text-xs text-text-sub">
                                    Please do not close this window.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-bold text-text-main">
                            Recent Meetings
                        </h2>
                        <Link
                            href="/notes"
                            className="flex items-center gap-1 text-sm font-semibold text-accent-custom transition-colors hover:text-blue-600"
                        >
                            View all
                            <span className="material-symbols-outlined text-sm font-bold">
                                arrow_forward
                            </span>
                        </Link>
                    </div>

                    {filteredMeetings.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                                    duration="--" // Duration not in DB model, usually computed after processing
                                    type="mic" // Defaulting to mic as type isn't in DB yet
                                    status={
                                        meeting.status === 'processing'
                                            ? 'Processing...'
                                            : meeting.status === 'completed'
                                              ? 'Processed'
                                              : 'Draft'
                                    }
                                    participants={[]} // Participants not in DB model yet
                                    onDelete={(id: number) =>
                                        setMeetingToDelete(id)
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-text-sub">
                            <p className="text-lg">
                                No recent meetings being processed.
                            </p>
                            <p className="mt-2 text-sm">
                                Upload an audio file to get started!
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {/* Pagination placeholder if needed, or keeping Load More for now but disabling if no logic */}

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
