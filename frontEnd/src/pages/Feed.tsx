import { useMemo, useState, useEffect } from 'react';
import { SocialStories, type Story } from '../components/ui/social-stories';

import { FeedPost } from '../components/feed/FeedPost';

const Feed = () => {
    const [savedPosts, setSavedPosts] = useState<number[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('savedPosts');
        if (saved) {
            setSavedPosts(JSON.parse(saved));
        }
    }, []);

    const handleSavePost = (postId: number) => {
        let newSaved;
        if (savedPosts.includes(postId)) {
            newSaved = savedPosts.filter(id => id !== postId);
        } else {
            newSaved = [...savedPosts, postId];
        }
        setSavedPosts(newSaved);
        localStorage.setItem('savedPosts', JSON.stringify(newSaved));
    };
    // Dummy Data for the stories
    const stories: Story[] = useMemo(() => [
        {
            id: "1",
            platform: "instagram",
            mediaUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
            linkUrl: "https://instagram.com",
            caption: "Loving the new vibes!",
            duration: 5,
        },
        {
            id: "2",
            platform: "instagram",
            mediaUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
            linkUrl: "https://instagram.com",
            caption: "Work hard play hard.",
            duration: 5,
        }
    ], []);

    // Initial Profiles
    const initialProfiles = [
        { id: "1", name: "John Doe", avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop" },
        { id: "2", name: "Jane Smith", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop" },
        { id: "3", name: "Mike Ross", avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop" },
        { id: "4", name: "Sarah Connor", avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop" },
        { id: "5", name: "Alex Murphy", avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop" },
        { id: "6", name: "Bruce Wayne", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop" },
    ];

    // Dummy Post Data
    const posts = [
        {
            id: 1,
            username: "John Doe",
            avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop",
            imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=1000&auto=format&fit=crop",
            caption: "Coding late into the night. #developer #focus",
            likes: 1240,
            comments: 45,
            timeAgo: "2 HOURS AGO",
            location: "San Francisco, CA",
            musicTrack: "Lo-Fi Beats • Coding Mode"
        },
        {
            id: 2,
            username: "Jane Smith",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
            imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop",
            caption: "Team brainstorming session. 🚀",
            likes: 892,
            comments: 23,
            timeAgo: "4 HOURS AGO",
            location: "New York, NY"
        },
        {
            id: 3,
            username: "Mike Ross",
            avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop",
            imageUrl: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=1000&auto=format&fit=crop",
            caption: "Minimalist workspace setup.",
            likes: 3450,
            comments: 112,
            timeAgo: "6 HOURS AGO",
            musicTrack: "Hans Zimmer • Time"
        },
        {
            id: 4,
            username: "Sarah Connor",
            avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop",
            imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&auto=format&fit=crop",
            caption: "Coffee first, code later. ☕️",
            likes: 567,
            comments: 18,
            timeAgo: "8 HOURS AGO",
            location: "Seattle, WA"
        },
        {
            id: 5,
            username: "Alex Murphy",
            avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop",
            imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop",
            caption: "Future is now. #robotics #ai",
            likes: 2100,
            comments: 89,
            timeAgo: "10 HOURS AGO",
            musicTrack: "Daft Punk • Harder, Better, Faster, Stronger"
        },
        {
            id: 6,
            username: "Bruce Wayne",
            avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop",
            imageUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1000&auto=format&fit=crop",
            caption: "Night view from the top.",
            likes: 9999,
            comments: 500,
            timeAgo: "12 HOURS AGO",
            location: "Gotham City"
        },
        {
            id: 7,
            username: "John Doe",
            avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop",
            imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1000&auto=format&fit=crop",
            caption: "Debugging... typically.",
            likes: 670,
            comments: 34,
            timeAgo: "1 DAY AGO"
        },
        {
            id: 8,
            username: "Jane Smith",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
            imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&auto=format&fit=crop",
            caption: "Great diversity in the new hiring batch! 🌍",
            likes: 1540,
            comments: 67,
            timeAgo: "1 DAY AGO",
            musicTrack: "Pharrell Williams • Happy"
        },
        {
            id: 9,
            username: "Mike Ross",
            avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop",
            imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop",
            caption: "Design principles 101.",
            likes: 980,
            comments: 41,
            timeAgo: "2 DAYS AGO"
        },
        {
            id: 10,
            username: "Sarah Connor",
            avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop",
            imageUrl: "https://images.unsplash.com/photo-1531297461136-82lw8e3r2p?w=1000&auto=format&fit=crop",
            caption: "System upgrade complete.",
            likes: 2200,
            comments: 105,
            timeAgo: "2 DAYS AGO",
            musicTrack: "The Chemical Brothers • Go"
        }
    ];

    const [activeProfiles, setActiveProfiles] = useState(initialProfiles);
    const [visitedProfiles, setVisitedProfiles] = useState<typeof initialProfiles>([]);
    const [currentProfileId, setCurrentProfileId] = useState<string | null>(null);

    const handleStoryComplete = (profileId: string) => {
        // Move to visited if it's currently active
        const profileToMove = activeProfiles.find(p => p.id === profileId);
        if (profileToMove) {
            setActiveProfiles(prev => prev.filter(p => p.id !== profileId));
            setVisitedProfiles(prev => [...prev, profileToMove]);
        }
    };

    // Get the combined list of profiles for navigation order
    // Order: Active profiles, then Visited profiles (in their current order)
    const allProfiles = useMemo(() => [...activeProfiles, ...visitedProfiles], [activeProfiles, visitedProfiles]);

    const handleNextProfile = (currentId: string) => {
        const currentIndex = allProfiles.findIndex(p => p.id === currentId);
        if (currentIndex < allProfiles.length - 1) {
            // Check if we need to mark the current one as visited

            // Actually, if we move it to visited, it goes to the end of the list!
            // This disrupts the "linear swipe" if we strictly follow "active then visited".
            // If I finish Active #1, it becomes Visited #Last.
            // The Next profile is Active #2 (which becomes Active #1).

            // Simplest UX:
            // If I am browsing Active Profile #1 and finish it:
            // 1. Move #1 to Visited.
            // 2. Open Active #2 (which is now at index 0 of active list).

            // If I am browsing Visited Profile #1 and finish it:
            // 1. Open Visited Profile #2.

            // Let's rely on finding the next logical profile ID.

            // Finds the profile coming after the current one in the current view
            const indexInActive = activeProfiles.findIndex(p => p.id === currentId);
            if (indexInActive !== -1) {
                // It's an active profile
                if (indexInActive < activeProfiles.length - 1) {
                    // Go to next active
                    setCurrentProfileId(activeProfiles[indexInActive + 1].id);
                } else {
                    // No more active, go to first visited?
                    if (visitedProfiles.length > 0) {
                        setCurrentProfileId(visitedProfiles[0].id);
                    } else {
                        // End of all stories
                        setCurrentProfileId(null);
                    }
                }
                // Mark as completed/visited
                handleStoryComplete(currentId);
            } else {
                // It's a visited profile
                const indexInVisited = visitedProfiles.findIndex(p => p.id === currentId);
                if (indexInVisited !== -1 && indexInVisited < visitedProfiles.length - 1) {
                    setCurrentProfileId(visitedProfiles[indexInVisited + 1].id);
                } else {
                    // End of everything
                    setCurrentProfileId(null);
                }
            }
        } else {
            // Fallback or close
            // Mark as completed/visited just in case
            handleStoryComplete(currentId);
            setCurrentProfileId(null);
        }
    };

    const handlePrevProfile = (currentId: string) => {
        // Simple logic: navigate to the previous profile in the visual list
        // Note: We don't change visited status on prev
        const currentIndex = allProfiles.findIndex(p => p.id === currentId);
        if (currentIndex > 0) {
            setCurrentProfileId(allProfiles[currentIndex - 1].id);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            {/* Social Stories Section */}
            <div className="w-full border-b border-zinc-900 py-4">
                <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
                    {/* Active Stories (Unvisited) */}
                    {activeProfiles.map((profile) => (
                        <SocialStories
                            key={profile.id}
                            stories={stories}
                            profile={profile}
                            isVisited={false}
                            isOpen={currentProfileId === profile.id}
                            onOpen={() => setCurrentProfileId(profile.id)}
                            onClose={() => setCurrentProfileId(null)}
                            onNextProfile={() => handleNextProfile(profile.id)}
                            onPrevProfile={() => handlePrevProfile(profile.id)}
                            onAllStoriesViewed={() => handleStoryComplete(profile.id)}
                        />
                    ))}

                    {/* Visited Stories */}
                    {visitedProfiles.map((profile) => (
                        <SocialStories
                            key={profile.id}
                            stories={stories}
                            profile={profile}
                            isVisited={true}
                            isOpen={currentProfileId === profile.id}
                            onOpen={() => setCurrentProfileId(profile.id)}
                            onClose={() => setCurrentProfileId(null)}
                        />
                    ))}
                </div>
            </div>

            {/* Feed Section */}
            <div className="pb-20">
                {posts.map((post) => (
                    <FeedPost
                        key={post.id}
                        id={post.id}
                        username={post.username}
                        avatarUrl={post.avatarUrl}
                        imageUrl={post.imageUrl}
                        caption={post.caption}
                        likes={post.likes}
                        comments={post.comments}
                        timeAgo={post.timeAgo}
                        location={post.location}
                        musicTrack={post.musicTrack}
                        isSaved={savedPosts.includes(post.id)}
                        onSave={() => handleSavePost(post.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feed;
