import { useState, useEffect } from 'react';
import { MapPin, Briefcase, Trash2, Clock, CheckCircle2, AlertCircle, XCircle, Search } from 'lucide-react';
import { applicationsService } from '../services/applications';
import type { Application } from '../services/jobs';
import { motion, AnimatePresence } from 'framer-motion';

import { ApplicationSkeleton } from '../components/applications/ApplicationSkeleton';

const AppliedJobs = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        loadApplications();
    }, [filter]);

    const loadApplications = async () => {
        try {
            setLoading(true);
            const statusFilter = filter === 'all' ? undefined : filter;
            const data = await applicationsService.getAllApplications(statusFilter);
            setApplications(data);
        } catch (error) {
            console.error("Failed to load applications:", error);
        } finally {
            setLoading(false);
        }
    };

    const withdrawApplication = async (applicationId: string) => {
        try {
            // Optimistic update
            setApplications(prev => prev.filter(a => a.id !== applicationId));
            await applicationsService.withdrawApplication(applicationId);
        } catch (error) {
            console.error("Failed to withdraw application:", error);
            // Refresh on error
            loadApplications();
        }
    };

    const getStatusStyles = (status: Application['status']) => {
        switch (status) {
            case 'pending': return { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', icon: <Clock className="w-3 h-3" /> };
            case 'reviewing': return { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: <Search className="w-3 h-3" /> };
            case 'interview': return { color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', icon: <Briefcase className="w-3 h-3" /> };
            case 'accepted': return { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', icon: <CheckCircle2 className="w-3 h-3" /> };
            case 'rejected': return { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', icon: <XCircle className="w-3 h-3" /> };
            case 'withdrawn': return { color: 'text-zinc-500', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20', icon: <AlertCircle className="w-3 h-3" /> };
            default: return { color: 'text-zinc-400', bg: 'bg-zinc-400/10', border: 'border-zinc-400/20', icon: <Clock className="w-3 h-3" /> };
        }
    };

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'pending', label: 'Pending' },
        { id: 'reviewing', label: 'Reviewing' },
        { id: 'accepted', label: 'Accepted' },
    ];

    return (
        <div className="min-h-screen bg-black text-white pb-24 pt-8 px-4">
            <header className="mb-8 px-2">
                <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
                <p className="text-zinc-500 text-sm mt-1">Track the status of your job applications</p>
            </header>

            {/* Status Filters */}
            <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar px-2">
                {filters.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 border ${filter === f.id
                            ? 'bg-white text-black border-white'
                            : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {loading && applications.length === 0 ? (
                <div className="space-y-5">
                    {[...Array(4)].map((_, i) => (
                        <ApplicationSkeleton key={i} />
                    ))}
                </div>
            ) : applications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[40vh] text-zinc-500 text-center">
                    <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800 opacity-50">
                        <Briefcase className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No applications found</h3>
                    <p className="max-w-xs text-sm leading-relaxed">
                        {filter === 'all'
                            ? "You haven't applied to any jobs yet. Start swiping on the jobs page!"
                            : `You have no ${filter} applications at the moment.`}
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    <AnimatePresence>
                        {applications.map((app) => {
                            const styles = getStatusStyles(app.status);
                            const canWithdraw = ['pending', 'reviewing', 'interview'].includes(app.status);

                            return (
                                <motion.div
                                    key={app.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden shadow-lg group"
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1 min-w-0 mr-4">
                                                <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors truncate">
                                                    {app.job.company.name}
                                                </h3>
                                                <p className="text-zinc-400 text-sm line-clamp-1 mt-0.5 font-light">
                                                    {app.job.problem_statement}
                                                </p>
                                            </div>
                                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${styles.bg} ${styles.color} ${styles.border} border text-[10px] font-black uppercase tracking-wider`}>
                                                {styles.icon}
                                                {app.status}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-zinc-500 mb-6 bg-black/20 p-3 rounded-2xl border border-white/5">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {app.job.constraints?.location || 'Remote'}
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-zinc-800" />
                                            <div className="flex items-center gap-1.5">
                                                <Briefcase className="w-3.5 h-3.5" />
                                                {app.job.constraints?.employment_type || 'Full-time'}
                                            </div>
                                        </div>

                                        {app.cover_note && (
                                            <div className="mb-6 p-4 bg-zinc-800/20 rounded-2xl border border-white/5">
                                                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-2">My Application Note</p>
                                                <p className="text-xs text-zinc-400 leading-relaxed italic">"{app.cover_note}"</p>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-5 border-t border-white/5">
                                            <div className="text-[10px] text-zinc-600 font-medium">
                                                Applied on {new Date(app.created_at).toLocaleDateString()}
                                            </div>

                                            {canWithdraw && (
                                                <button
                                                    onClick={() => withdrawApplication(app.id)}
                                                    className="flex items-center gap-1.5 text-xs text-red-500/80 hover:text-red-400 transition-colors py-1.5 px-3 hover:bg-red-500/5 rounded-xl border border-transparent hover:border-red-500/10"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    Withdraw
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default AppliedJobs;
