export const ApplicationSkeleton = () => {
    return (
        <div className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden shadow-lg animate-pulse">
            <div className="p-6">
                {/* Header Skeleton */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 space-y-2">
                        <div className="h-5 w-1/3 bg-zinc-800 rounded" />
                        <div className="h-4 w-2/3 bg-zinc-800 rounded opacity-50" />
                    </div>
                    <div className="h-6 w-20 bg-zinc-800 rounded-full" />
                </div>

                {/* Info Bar Skeleton */}
                <div className="flex items-center gap-4 h-11 bg-black/20 px-3 rounded-2xl border border-white/5 mb-6">
                    <div className="h-3 w-20 bg-zinc-800 rounded" />
                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                    <div className="h-3 w-24 bg-zinc-800 rounded" />
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                    <div className="h-3 w-28 bg-zinc-800 rounded opacity-50" />
                    <div className="h-4 w-16 bg-zinc-900 rounded" />
                </div>
            </div>
        </div>
    );
};
