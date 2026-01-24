import { Bookmark, Music } from 'lucide-react';

interface FeedPostProps {
    id: number;
    username: string;
    avatarUrl: string;
    imageUrl: string;
    caption: string;
    likes: number;
    comments: number;
    timeAgo: string;
    location?: string;
    musicTrack?: string;
    isSaved: boolean;
    onSave: () => void;
}

export function FeedPost({

    username,
    avatarUrl,
    imageUrl,
    caption,

    timeAgo,
    location,
    musicTrack,
    isSaved,
    onSave
}: FeedPostProps) {
    return (
        <div className="w-full max-w-md mx-auto mb-6 border-b border-zinc-900 pb-4">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-3">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-zinc-800">
                        <img src={avatarUrl} alt={username} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold text-white">{username}</span>
                            {/* Blue Tick Simulation */}
                            <svg className="w-3 h-3 text-blue-500 fill-current" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                        </div>
                        {musicTrack && (
                            <div className="flex items-center gap-1 text-xs text-zinc-400">
                                <Music className="w-3 h-3" />
                                <span className="truncate max-w-[150px]">{musicTrack}</span>
                            </div>
                        )}
                        {!musicTrack && location && (
                            <span className="text-xs text-zinc-400">{location}</span>
                        )}
                    </div>
                </div>

            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-square bg-zinc-900 overflow-hidden">
                <img src={imageUrl} alt="Post content" className="w-full h-full object-cover" />
            </div>

            {/* Action Buttons */}
            <div className="px-3 pt-3 pb-2">
                <div className="flex items-center justify-between">
                    <div className="px-3 space-y-1">

                        <div className="text-sm text-white">
                            <span className="font-semibold mr-2">{username}</span>
                            <span className="text-zinc-200">{caption}</span>
                        </div>

                        <p className="text-[10px] text-zinc-600 uppercase tracking-wide mt-1">{timeAgo}</p>
                    </div>

                    <button
                        onClick={onSave}
                        className="text-white hover:text-zinc-300 transition-colors"
                    >
                        <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-white' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Likes & Caption */}

        </div>
    );
}
