"use client"

import { Card, CardContent } from "./card"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { cn } from "../../lib/utils"
import { Bookmark } from "lucide-react"

interface JobCardProps {
    title?: string
    company?: string
    rate?: string
    location?: string
    type?: string
    experience?: string
    expectations?: string
    skills?: string[]
    logoUrl?: string
    coverImageUrl?: string
    className?: string
    onSave?: () => void
}

export default function JobCard({
    title = "Software Engineer",
    company = "Tech Corp",
    rate = "$80k - $100k",
    location = "Remote",
    type = "Full-time",
    experience = "2+ years",
    expectations = "",
    skills = [],
    logoUrl = "",
    coverImageUrl = "",
    className,
    onSave,
}: JobCardProps) {
    return (
        <Card className={cn("w-full max-w-sm rounded-[32px] shadow-2xl border border-white/10 bg-[#0A0A0A] text-white transition-all overflow-hidden relative", className)}>
            {/* Cover Image Section */}
            <div className="h-28 w-full relative overflow-hidden bg-zinc-900">
                {coverImageUrl ? (
                    <img src={coverImageUrl} alt="Cover" className="w-full h-full object-cover opacity-60" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black opacity-80" />
                )}
                {/* Decorative Dots Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                {/* Branding Signature Mockup */}
                <div className="absolute bottom-4 right-6 opacity-40">
                    <p className="font-serif italic text-xl tracking-widest text-white/50 select-none">{company}</p>
                </div>
            </div>

            {/* Avatar & Action Section */}
            <div className="px-6 -mt-10 relative z-10 flex justify-between items-end">
                <div className="relative">
                    <Avatar className="h-20 w-20 rounded-full border-[6px] border-[#0A0A0A] bg-zinc-800 shadow-2xl overflow-hidden">
                        <AvatarImage src={logoUrl} alt={company} className="object-cover" />
                        <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xl font-bold">
                            {company.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {/* Verified Status Badge */}
                    <div className="absolute bottom-1 right-1 bg-emerald-500 rounded-full p-0.5 border-4 border-[#0A0A0A]">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <div className="flex gap-2 -mb-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSave?.();
                        }}
                        className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-amber-500 transition-all border border-white/5 backdrop-blur-md"
                    >
                        <Bookmark className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <CardContent className="px-6 pt-4 pb-6 overflow-y-auto max-h-[340px] no-scrollbar">
                <div className="mb-4">
                    <h2 className="text-xl font-black text-white leading-tight mb-1">
                        {company}
                    </h2>
                    <h3 className="text-base font-bold text-zinc-300 leading-snug">
                        {title}
                    </h3>
                </div>

                <div className="flex gap-4 text-[12px] text-zinc-500 mb-6 font-bold uppercase tracking-wider">
                    <p className="flex items-center gap-1.5">
                        <span className="text-emerald-500 font-black">{rate}</span>
                    </p>
                    <span className="opacity-20">|</span>
                    <p>{location}</p>
                </div>

                {expectations && (
                    <div className="mb-6">
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Expectations</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                            {expectations}
                        </p>
                    </div>
                )}

                {skills.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Skills Required</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {skills.map((skill, idx) => (
                                <span key={idx} className="px-2.5 py-1 bg-zinc-900/50 border border-white/5 rounded-lg text-[11px] text-zinc-300 font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Networking Stats Mockup */}
                <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-600 border-t border-white/5 pt-4 mt-auto">
                    <span className="text-emerald-500/80">Active Hiring</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-800" />
                    <span>{type}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-800" />
                    <span>{experience}</span>
                </div>
            </CardContent>
        </Card>
    )
}
