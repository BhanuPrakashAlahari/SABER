import { useState, useEffect } from 'react';
import { MapPin, Briefcase, Trash2, Bookmark as BookmarkIcon, Loader2, DollarSign, ExternalLink } from 'lucide-react';
import { bookmarksService } from '../services/bookmarks';
import type { Bookmark } from '../services/jobs';
import { motion, AnimatePresence } from 'framer-motion';

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookmarks();
    }, []);

    const loadBookmarks = async () => {
        try {
            setLoading(true);
            const data = await bookmarksService.getAllBookmarks();
            setBookmarks(data);
        } catch (error) {
            console.error("Failed to load bookmarks:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeBookmark = async (id: string) => {
        try {
            // Optimistic update
            setBookmarks(prev => prev.filter(b => b.job_id !== id));
            await bookmarksService.deleteBookmark(id);
        } catch (error) {
            console.error("Failed to remove bookmark:", error);
            // Refresh on error
            loadBookmarks();
        }
    };

    const formatSalary = (range: number[] | undefined) => {
        if (!range || range.length !== 2) return '';
        const min = Math.round(range[0] / 1000);
        const max = Math.round(range[1] / 1000);
        return `₹${min}k - ₹${max}k`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pb-24 pt-8 px-4">
            <header className="mb-8 px-2">
                <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
                <p className="text-zinc-500 text-sm mt-1">Jobs you've saved for later review</p>
            </header>

            {bookmarks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh] text-zinc-500 text-center">
                    <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800 opacity-50">
                        <BookmarkIcon className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No bookmarks yet</h3>
                    <p className="max-w-xs text-sm leading-relaxed">
                        Tap the bookmark icon on any job card to save it here for later.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {bookmarks.map((bookmark) => (
                            <motion.div
                                key={bookmark.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-[#121212] border border-white/5 rounded-3xl p-6 relative overflow-hidden group shadow-xl"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors line-clamp-1">{bookmark.job.company.name}</h3>
                                                {bookmark.job.company.website && (
                                                    <a href={bookmark.job.company.website} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-white transition-colors">
                                                        <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                                                {bookmark.job.problem_statement}
                                            </p>
                                        </div>
                                        <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                                            <BookmarkIcon className="w-5 h-5 text-white fill-current" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 text-xs text-zinc-500 bg-black/30 p-2 rounded-xl border border-white/5">
                                            <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                                            <span className="truncate">{bookmark.job.constraints?.location || 'Remote'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500 bg-black/30 p-2 rounded-xl border border-white/5">
                                            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                                            <span className="truncate">
                                                {formatSalary(bookmark.job.constraints?.salary_range)}
                                            </span>
                                        </div>
                                    </div>

                                    {bookmark.notes && (
                                        <div className="p-3 bg-zinc-800/30 rounded-2xl border border-dashed border-zinc-700/50">
                                            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">My Notes</p>
                                            <p className="text-xs text-zinc-400 italic font-light">"{bookmark.notes}"</p>
                                        </div>
                                    )}

                                    <div className="mt-2 flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase font-bold tracking-widest">
                                            <Briefcase className="w-3 h-3" />
                                            {bookmark.job.constraints?.employment_type || 'Full-time'}
                                        </div>
                                        <button
                                            onClick={() => removeBookmark(bookmark.job_id)}
                                            className="text-xs text-red-500/80 flex items-center gap-1.5 hover:text-red-400 transition-colors py-1 px-3 hover:bg-red-500/5 rounded-lg border border-transparent hover:border-red-500/10"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
