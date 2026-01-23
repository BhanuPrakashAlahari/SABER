import { useState, useEffect } from 'react';
import { Loader2, MessageSquare, Send, Calendar, ChevronRight } from 'lucide-react';
import { matchesService } from '../services/matches';
import type { Match, Message } from '../services/jobs';
import { motion, AnimatePresence } from 'framer-motion';

const Matches = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        try {
            setLoading(true);
            const data = await matchesService.getMatches();
            setMatches(data);
        } catch (error) {
            console.error("Failed to load matches:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMatch || !message.trim()) return;

        try {
            const res = await matchesService.sendMessage(selectedMatch.id, message);
            const newMessage = res.data as Message;

            // Optimistically update local state if we had a full message history
            // But since getMatches returns messages, we might want to refresh or manually push
            setMatches(prev => prev.map(m =>
                m.id === selectedMatch.id
                    ? { ...m, messages: [...(m.messages || []), newMessage] }
                    : m
            ));

            if (selectedMatch.id === newMessage.match_id) {
                setSelectedMatch(prev => prev ? { ...prev, messages: [...(prev.messages || []), newMessage] } : null);
            }

            setMessage('');
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
                <p className="text-zinc-500 text-sm mt-1">Chat with recruiters who matched with you</p>
            </header>

            {matches.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500 text-center">
                    <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800 opacity-50">
                        <MessageSquare className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No matches yet</h3>
                    <p className="max-w-xs text-sm leading-relaxed">
                        Keep exploring jobs! When a recruiter likes your profile back, they'll appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {matches.map((match) => (
                        <motion.div
                            key={match.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => setSelectedMatch(match)}
                            className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors cursor-pointer group"
                        >
                            <div className="p-5 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-zinc-800 overflow-hidden border border-white/5 flex-shrink-0">
                                    {match.job.company.logo ? (
                                        <img src={match.job.company.logo} alt={match.job.company.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold text-xl uppercase">
                                            {match.job.company.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-lg text-white truncate">{match.job.company.name}</h3>
                                        <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                                            {match.reveal_status ? 'Matched' : 'Pending'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-500 truncate mb-2">{match.job.problem_statement}</p>
                                    <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(match.created_at).toLocaleDateString()}
                                        {match.messages?.length > 0 && (
                                            <>
                                                <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                                <span className="text-blue-400">{match.messages.length} messages</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Chat Overlay Modal */}
            <AnimatePresence>
                {selectedMatch && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-black flex flex-col"
                    >
                        {/* Chat Header */}
                        <div className="p-4 border-b border-white/5 flex items-center gap-4 bg-[#0A0A0A]">
                            <button onClick={() => setSelectedMatch(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <ChevronRight className="w-6 h-6 rotate-180" />
                            </button>
                            <div className="w-10 h-10 rounded-xl bg-zinc-800 overflow-hidden border border-white/5">
                                {selectedMatch.job.company.logo ? (
                                    <img src={selectedMatch.job.company.logo} alt={selectedMatch.job.company.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold uppercase">
                                        {selectedMatch.job.company.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-white truncate">{selectedMatch.job.company.name}</h3>
                                <p className="text-[10px] text-zinc-500 truncate uppercase tracking-widest">{selectedMatch.job.problem_statement}</p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                            <div className="bg-zinc-900/30 p-4 rounded-2xl border border-white/5 mb-8">
                                <p className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest mb-2">Why you matched</p>
                                <p className="text-sm text-zinc-400 leading-relaxed italic">
                                    "{selectedMatch.explainability_json.reason}"
                                </p>
                            </div>

                            {selectedMatch.messages?.map((msg, idx) => {
                                const isMe = msg.sender_id === selectedMatch.candidate_id; // Simple assumption for candidate view
                                return (
                                    <div key={msg.id || idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-4 rounded-3xl ${isMe ? 'bg-white text-black rounded-tr-none' : 'bg-zinc-900 text-white rounded-tl-none border border-white/5'}`}>
                                            <p className="text-sm leading-relaxed">{msg.content}</p>
                                            <p className={`text-[9px] mt-2 opacity-50 ${isMe ? 'text-black' : 'text-zinc-500'}`}>
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

                            {(!selectedMatch.messages || selectedMatch.messages.length === 0) && (
                                <div className="text-center py-12 opacity-30">
                                    <p className="text-sm">No messages yet. Start the conversation!</p>
                                </div>
                            )}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 bg-[#0A0A0A] border-t border-white/5">
                            <form onSubmit={handleSendMessage} className="flex gap-3">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Message..."
                                    className="flex-1 bg-zinc-900 border-none rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 text-white"
                                />
                                <button
                                    disabled={!message.trim()}
                                    className="bg-white text-black p-4 rounded-2xl hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center justify-center"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Matches;
