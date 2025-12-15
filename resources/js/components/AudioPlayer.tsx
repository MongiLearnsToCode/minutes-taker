import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Checking if we have a Slider component. If not I'll implement a simple one or use 'input type="range"'. 
// The prompt "Replace all default components..." implied we might have Shadcn components. 
// I'll assume we might not have 'ui/slider' yet based on previous file lists, so I'll stick to standard HTML or a simple custom implementation for safety, 
// OR I check first. Let's use a standard implementation that looks like the design.

export default function AudioPlayer({ src, className = "" }: { src: string, className?: string }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            setCurrentTime(current);
            setProgress((current / total) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (audioRef.current) {
            const time = (value / 100) * duration;
            audioRef.current.currentTime = time;
            setProgress(value);
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`flex items-center gap-3 bg-gray-50 rounded-full px-4 py-3 border border-gray-100 shadow-sm ${className}`}>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                className="hidden"
            />

            <Button
                onClick={togglePlay}
                size="icon"
                className="h-10 w-10 shrink-0 rounded-full bg-black hover:bg-gray-800 text-white shadow-md transition-all active:scale-95"
            >
                <span className="material-symbols-outlined text-[20px] ml-0.5">
                    {isPlaying ? 'pause' : 'play_arrow'}
                </span>
            </Button>

            <div className="flex-1 flex flex-col justify-center gap-1 min-w-0">
                <div className="flex justify-between text-[10px] font-bold text-text-sub uppercase tracking-wider px-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                <div className="relative h-2 w-full group cursor-pointer">
                    <div className="absolute top-0 left-0 h-full w-full bg-gray-200 rounded-full"></div>
                    <div
                        className="absolute top-0 left-0 h-full bg-accent-custom rounded-full transition-all duration-100 ease-linear group-hover:bg-blue-600"
                        style={{ width: `${progress}%` }}
                    ></div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleSeek}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}
