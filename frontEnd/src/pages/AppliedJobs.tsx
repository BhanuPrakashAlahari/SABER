import { useState, useEffect } from 'react';
import { MapPin, Briefcase, Trash2 } from 'lucide-react';

const AppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState<any[]>([]);

    const allJobs = [
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

    useEffect(() => {
        const loadAppliedJobs = () => {
            const saved = localStorage.getItem('appliedJobs');
            if (saved) {
                const appliedIds = JSON.parse(saved);
                const jobs = allJobs.filter(job => appliedIds.includes(job.id));
                setAppliedJobs(jobs);
            }
        };

        loadAppliedJobs();
        // Simple listener for local storage changes within the same tab/window mainly if needed, 
        // though usually across pages the mount effect is enough.
        window.addEventListener('storage', loadAppliedJobs);
        return () => window.removeEventListener('storage', loadAppliedJobs);
    }, []);

    const removeApplication = (id: number) => {
        const updatedJobs = appliedJobs.filter(job => job.id !== id);
        setAppliedJobs(updatedJobs);

        // Update local storage
        const saved = localStorage.getItem('appliedJobs');
        if (saved) {
            const appliedIds: number[] = JSON.parse(saved);
            const newIds = appliedIds.filter((jobId: number) => jobId !== id);
            localStorage.setItem('appliedJobs', JSON.stringify(newIds));
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pb-24 pt-8 px-4">
            <h1 className="text-2xl font-bold mb-6 px-2">Applied Jobs</h1>

            {appliedJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh] text-zinc-500">
                    <Briefcase className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-lg">No applications yet</p>
                    <p className="text-sm">Pull the avatar on a job card to apply!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {appliedJobs.map((job) => (
                        <div key={job.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">{job.title}</h3>
                                    <p className="text-sm text-zinc-400">{job.company}</p>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-900/30 text-green-400 border border-green-900/50">
                                    Applied
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-zinc-400">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Briefcase className="w-3 h-3" />
                                    {job.type}
                                </span>
                            </div>

                            <button
                                onClick={() => removeApplication(job.id)}
                                className="mt-2 text-xs text-red-400 flex items-center gap-1 hover:text-red-300 transition-colors self-start"
                            >
                                <Trash2 className="w-3 h-3" />
                                Withdraw Application
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppliedJobs;
