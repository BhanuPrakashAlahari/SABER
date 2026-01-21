import { MapPin, DollarSign, Briefcase, Bookmark } from 'lucide-react';
import { SpringElement } from '../components/ui/spring-element';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';

import { useState, useEffect } from 'react';

const Jobs = () => {
    const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [savedJobs, setSavedJobs] = useState<number[]>([]);

    useEffect(() => {
        const savedApplied = localStorage.getItem('appliedJobs');
        if (savedApplied) {
            setAppliedJobs(JSON.parse(savedApplied));
        }

        const savedBookmarks = localStorage.getItem('savedJobs');
        if (savedBookmarks) {
            setSavedJobs(JSON.parse(savedBookmarks));
        }
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => prev + 1);
    };

    const handleSave = (jobId: number) => {
        let newSaved;
        if (savedJobs.includes(jobId)) {
            newSaved = savedJobs.filter(id => id !== jobId);
        } else {
            newSaved = [...savedJobs, jobId];
        }
        setSavedJobs(newSaved);
        localStorage.setItem('savedJobs', JSON.stringify(newSaved));
    };

    const handleApply = (jobId: number) => {
        if (appliedJobs.includes(jobId)) return;
        const newApplied = [...appliedJobs, jobId];
        setAppliedJobs(newApplied);
        localStorage.setItem('appliedJobs', JSON.stringify(newApplied));

        // Wait for visual feedback then advance
        setTimeout(() => {
            handleNext();
        }, 500);
    };

    const jobs = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            poster: { name: "John Doe", avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop", role: "Frontend Lead" },
            company: "TechFlow",
            location: "San Francisco, CA (Remote)",
            salary: "$120k - $160k",
            type: "Full-time",
            postedAt: "2h ago",
            color: "bg-blue-600",
            description: "We are looking for an experienced Frontend Developer to lead our core product team. You will be working with React, TypeScript, and Tailwind CSS to build beautiful user interfaces."
        },
        {
            id: 2,
            title: "Product Designer",
            poster: { name: "Jane Smith", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop", role: "Head of Design" },
            company: "Creative Studio",
            location: "New York, NY",
            salary: "$100k - $140k",
            type: "Full-time",
            postedAt: "5h ago",
            color: "bg-purple-600",
            description: "Join our award-winning design team. We are looking for someone with a keen eye for detail and a passion for creating intuitive user experiences."
        },
        {
            id: 3,
            title: "Product Manager",
            poster: { name: "Mike Ross", avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop", role: "Product Director" },
            company: "Pearson Hardman",
            location: "Chicago, IL",
            salary: "$130k - $180k",
            type: "Full-time",
            postedAt: "1d ago",
            color: "bg-emerald-600",
            description: "Lead the strategy and execution of our flagship product. You will work closely with engineering and design to deliver value to our customers."
        },
        {
            id: 4,
            title: "Software Engineer (Backend)",
            poster: { name: "Sarah Connor", avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop", role: "Engineering Manager" },
            company: "Skynet Systems",
            location: "Austin, TX (Hybrid)",
            salary: "$115k - $155k",
            type: "Full-time",
            postedAt: "1d ago",
            color: "bg-red-600",
            description: "Build scalable backend services using Go and Kubernetes. Experience with distributed systems is a huge plus."
        },
        {
            id: 5,
            title: "Full Stack Developer",
            poster: { name: "Alex Murphy", avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop", role: "Tech Lead" },
            company: "OCP Corp",
            location: "Detroit, MI",
            salary: "$110k - $150k",
            type: "Contract",
            postedAt: "2d ago",
            color: "bg-slate-600",
            description: "We are modernizing our legacy systems. Looking for a developer proficient in both React and Node.js to help us transition."
        },
        {
            id: 6,
            title: "Chief Executive Officer",
            poster: { name: "Bruce Wayne", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop", role: "Owner" },
            company: "Wayne Enterprises",
            location: "Gotham City",
            salary: "$500k+",
            type: "Full-time",
            postedAt: "3d ago",
            color: "bg-indigo-900",
            description: "Looking for a capable executive to manage day-to-day operations while I am... away. Must be discreet and handle high-pressure situations."
        },
        {
            id: 7,
            title: "Creative Director",
            poster: { name: "Diana Prince", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop", role: "Design Lead" },
            company: "Themyscira Arts",
            location: "Washington, DC",
            salary: "$140k - $190k",
            type: "Full-time",
            postedAt: "3d ago",
            color: "bg-amber-600",
            description: "Lead our creative vision across all media channels. We cherish strength, wisdom, and beautiful design."
        },
        {
            id: 8,
            title: "Junior Web Developer",
            poster: { name: "Peter Parker", avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop", role: "Freelancer" },
            company: "Daily Bugle",
            location: "New York, NY",
            salary: "$60k - $80k",
            type: "Part-time",
            postedAt: "4d ago",
            color: "bg-red-500",
            description: "Help us maintain our news website. Flexible hours. Must be able to get pictures of Spiderman... I mean, bugs. Fix bugs."
        },
        {
            id: 9,
            title: "Lead Robotics Engineer",
            poster: { name: "Tony Stark", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop", role: "CTO" },
            company: "Stark Industries",
            location: "Malibu, CA",
            salary: "$250k - $400k",
            type: "Full-time",
            postedAt: "5d ago",
            color: "bg-yellow-600",
            description: "Working on cutting-edge armor technology. Need someone who understands AI, propulsion systems, and advanced metallurgy."
        },
        {
            id: 10,
            title: "Security Operations Specialist",
            poster: { name: "Natasha Romanoff", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop", role: "Head of Security" },
            company: "SHIELD",
            location: "Unknown",
            salary: "$120k - $160k",
            type: "Full-time",
            postedAt: "1w ago",
            color: "bg-zinc-800",
            description: "Cybersecurity and physical security role. Requires extensive background checks. Travel required."
        },
        {
            id: 11,
            title: "Marketing Manager",
            poster: { name: "Mike Ross", avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop", role: "Product Director" },
            company: "Pearson Hardman",
            location: "New York, NY",
            salary: "$110k - $150k",
            type: "Full-time",
            postedAt: "1w ago",
            color: "bg-teal-600",
            description: "Drive growth for our new legal tech division. Looking for someone with a strong background in B2B marketing."
        },
        {
            id: 12,
            title: "AI Research Scientist",
            poster: { name: "Sarah Connor", avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop", role: "Engineering Manager" },
            company: "Cyberdyne",
            location: "San Francisco, CA",
            salary: "$180k - $250k",
            type: "Full-time",
            postedAt: "1w ago",
            color: "bg-cyan-600",
            description: "Researching neural networks and autonomous learning. Help us build the future of intelligence."
        },
        {
            id: 13,
            title: "UI Engineer",
            poster: { name: "Jane Smith", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop", role: "Head of Design" },
            company: "Creative Studio",
            location: "Remote",
            salary: "$90k - $120k",
            type: "Contract",
            postedAt: "2w ago",
            color: "bg-pink-600",
            description: "Implement pixel-perfect designs. Must know Storybook and Motion libraries."
        },
        {
            id: 14,
            title: "DevOps Engineer",
            poster: { name: "John Doe", avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop", role: "Frontend Lead" },
            company: "TechFlow",
            location: "Denver, CO",
            salary: "$130k - $170k",
            type: "Full-time",
            postedAt: "2w ago",
            color: "bg-orange-600",
            description: "Manage our CI/CD pipelines and AWS infrastructure. Terraform experience required."
        },
        {
            id: 15,
            title: "Data Analyst",
            poster: { name: "Diana Prince", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop", role: "Design Lead" },
            company: "Museum of Antiquities",
            location: "Paris, France",
            salary: "$80k - $110k",
            type: "Full-time",
            postedAt: "3w ago",
            color: "bg-rose-600",
            description: "Analyze historical data trends. Must be fluent in multiple ancient languages... or just SQL."
        }
    ];

    const currentJob = jobs[currentIndex];

    if (!currentJob) {
        return (
            <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 text-center">
                <Briefcase className="w-16 h-16 text-zinc-600 mb-6" />
                <h2 className="text-2xl font-bold mb-2">No more jobs!</h2>
                <p className="text-zinc-400">You've viewed all available listings for now.</p>
                <button
                    onClick={() => setCurrentIndex(0)}
                    className="mt-8 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors"
                >
                    Start Over
                </button>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-black text-white overflow-hidden relative">
            <div key={currentJob.id} className="h-full w-full flex flex-col p-6 pt-16 pb-24 relative">

                {/* Background decoration/Gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1/3 ${currentJob.color} opacity-20 blur-[100px] pointer-events-none transition-colors duration-500`} />

                {/* Header: Poster Info */}
                <div className="flex items-center gap-3 mb-6 z-10">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10">
                        <img src={currentJob.poster.avatarUrl} alt={currentJob.poster.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white">{currentJob.poster.name}</p>
                        <p className="text-[10px] text-zinc-400">{currentJob.poster.role} at {currentJob.company}</p>
                    </div>

                    <div className="ml-auto z-50">
                        <SpringElement
                            onDragEnd={(_, info) => {
                                if (info.offset.y > 100) {
                                    handleApply(currentJob.id);
                                }
                            }}
                        >
                            <Avatar className={`w-10 h-10 border-2 shadow-xl cursor-grab active:cursor-grabbing transition-colors duration-300 ${appliedJobs.includes(currentJob.id) ? 'border-green-500' : 'border-white/10'}`}>
                                <AvatarImage src={currentJob.poster.avatarUrl} className="object-cover" draggable={false} />
                                <AvatarFallback className="bg-zinc-800 text-zinc-400">
                                    {currentJob.poster.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </SpringElement>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center z-10 space-y-6">

                    <div>
                        <div className="flex items-start justify-between">
                            <h2 className="text-2xl font-bold leading-tight mb-2 max-w-[90%]">{currentJob.title}</h2>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <span className="h-8 px-3 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-xs font-medium flex items-center justify-center backdrop-blur-md">
                                {currentJob.postedAt}
                            </span>

                            <button
                                onClick={handleNext}
                                className="flex-1 h-8 rounded-full bg-transparent border border-zinc-800 text-zinc-400 text-xs font-bold flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-colors"
                            >
                                Not Interested
                            </button>
                            <button
                                onClick={() => handleSave(currentJob.id)}
                                className={`w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors ${savedJobs.includes(currentJob.id) ? 'text-zinc-100 bg-zinc-800' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                            >
                                <Bookmark className={`w-4 h-4 ${savedJobs.includes(currentJob.id) ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                            <Briefcase className="w-3 h-3" />
                            {currentJob.type}
                        </span>
                        <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                            <MapPin className="w-3 h-3" />
                            {currentJob.location}
                        </span>
                        <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                            <DollarSign className="w-3 h-3" />
                            {currentJob.salary}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Job Description</h4>
                        <p className="text-zinc-200 leading-relaxed font-light text-sm">
                            {currentJob.description}
                        </p>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="mt-auto pt-6 flex flex-col gap-3 z-10 w-full">

                </div>
            </div>
        </div>

    );
};

export default Jobs;
