import { Card, CardContent, CardFooter } from "../ui/card";

export const JobSkeleton = () => {
    return (
        <Card className="w-full max-w-sm rounded-[32px] border border-white/10 bg-[#0A0A0A] overflow-hidden animate-pulse">
            {/* Cover Skeleton */}
            <div className="h-32 w-full bg-zinc-900/50" />

            {/* Avatar Skeleton Section */}
            <div className="px-6 -mt-12 relative z-10 flex justify-between items-end">
                <div className="h-24 w-24 rounded-full border-[6px] border-[#0A0A0A] bg-zinc-800" />
                <div className="flex gap-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5" />
                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5" />
                </div>
            </div>

            {/* Content Skeleton */}
            <CardContent className="px-6 pt-6 pb-2">
                <div className="space-y-3 mb-6">
                    <div className="h-7 w-2/3 bg-zinc-800 rounded" />
                    <div className="h-5 w-3/4 bg-zinc-800 rounded opacity-60" />
                </div>

                <div className="space-y-4 mb-6">
                    <div className="h-3 w-1/2 bg-zinc-800 rounded opacity-50" />
                    <div className="h-3 w-1/3 bg-zinc-800 rounded opacity-50" />
                </div>

                {/* Bottom Row Skeleton */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                    <div className="h-3 w-16 bg-zinc-900 rounded" />
                    <div className="h-3 w-20 bg-zinc-900 rounded opacity-50" />
                </div>
            </CardContent>

            {/* Footer Skeleton */}
            <CardFooter className="px-6 py-6 border-none">
                <div className="h-14 w-full bg-zinc-800 rounded-2xl opacity-40" />
            </CardFooter>
        </Card>
    );
};
