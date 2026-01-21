import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

const Search = () => {
    const [query, setQuery] = useState('');

    const users = [
        { id: '1', name: 'John Doe', username: '@johndoe', role: 'Frontend Developer', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop' },
        { id: '2', name: 'Jane Smith', username: '@janesmith', role: 'UI/UX Designer', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop' },
        { id: '3', name: 'Mike Ross', username: '@mikeross', role: 'Product Manager', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop' },
        { id: '4', name: 'Sarah Connor', username: '@sarahc', role: 'Software Engineer', avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop' },
        { id: '5', name: 'Alex Murphy', username: '@alexm', role: 'Full Stack Dev', avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop' },
        { id: '6', name: 'Bruce Wayne', username: '@batman', role: 'CEO & Founder', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop' },
        { id: '7', name: 'Diana Prince', username: '@wonderwoman', role: 'Creative Director', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop' },
        { id: '8', name: 'Peter Parker', username: '@spidey', role: 'Web Developer', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop' },
        { id: '9', name: 'Tony Stark', username: '@ironman', role: 'Tech Lead', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop' },
        { id: '10', name: 'Natasha Romanoff', username: '@blackwidow', role: 'Security Ops', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop' },
    ];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
    );

    const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

    const toggleFollow = (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent row click
        setFollowedUsers(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white pb-24">
            {/* Search Header */}
            <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-xl border-b border-zinc-900 px-4 py-4 space-y-4">
                <h1 className="text-xl font-bold tracking-tight">Search</h1>
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-zinc-700 transition-colors placeholder:text-zinc-600"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Results List */}
            <div className="flex-1 px-4 py-2">
                {filteredUsers.length > 0 ? (
                    <div className="space-y-4 mt-2">
                        {filteredUsers.map(user => {
                            const isFollowing = followedUsers.has(user.id);
                            return (
                                <div key={user.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900/50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-zinc-800">
                                            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm text-white group-hover:text-blue-400 transition-colors">{user.name}</h3>
                                            <p className="text-xs text-zinc-500">{user.username}</p>
                                            <p className="text-[10px] text-zinc-600 mt-0.5 uppercase tracking-wide">{user.role}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => toggleFollow(user.id, e)}
                                        className={`text-xs font-medium px-4 py-1.5 rounded-full transition-colors ${isFollowing
                                                ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                                                : 'bg-blue-600 text-white hover:bg-blue-500'
                                            }`}
                                    >
                                        {isFollowing ? 'Following' : 'Follow'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : ( // ... remainder triggers normal diff context
                    <div className="flex flex-col items-center justify-center mt-20 text-zinc-500">
                        <SearchIcon className="w-10 h-10 mb-4 opacity-20" />
                        <p>No users found matching "{query}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
