import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Youtube, Twitch, Twitter, MessageSquare, ExternalLink, Image as ImageIcon, Video, MapPin, Heart, MessageCircle, Share2, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ImageWithFallback from './ImageWithFallback';

const socialLinks = [
  {
    name: 'Discord',
    icon: MessageSquare,
    url: '#',
    color: 'hover:border-[#5865F2] hover:text-[#5865F2] hover:shadow-[0_0_30px_rgba(88,101,242,0.3)]',
    description: 'Join the Horizon Crew. Tuning setups, car meets, and daily chat.'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: '#',
    color: 'hover:border-[#FF0000] hover:text-[#FF0000] hover:shadow-[0_0_30px_rgba(255,0,0,0.3)]',
    description: 'Cinematic edits, tuning guides, and full gameplay walkthroughs.'
  },
  {
    name: 'Twitch',
    icon: Twitch,
    url: '#',
    color: 'hover:border-[#9146FF] hover:text-[#9146FF] hover:shadow-[0_0_30px_rgba(145,70,255,0.3)]',
    description: 'Live touge battles, livery creation, and viewer lobbies.'
  },
  {
    name: 'Twitter / X',
    icon: Twitter,
    url: '#',
    color: 'hover:border-[#FFB7C5] hover:text-[#FFB7C5] hover:shadow-[0_0_20px_rgba(255,183,197,0.5)] transition-all duration-300',
    description: 'Quick updates, photo mode shots, and community polls.'
  }
];

const initialPosts = [
  {
    id: 1,
    user: "DriftKing_99",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    verified: true,
    content: "Just finished tuning the R34 for the new Hakone downhill. The grip is insane! 🚗💨 #FH6 #JDM",
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop",
    likes: 245,
    comments: 18,
    time: "2 hours ago"
  },
  {
    id: 2,
    user: "TokyoTuner",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=crop",
    verified: false,
    content: "Spotted this beauty at the Daikoku PA meet last night. The lighting in this game is unreal. 📸",
    image: "./large_Forza_Horizon6_Touge.webp",
    likes: 112,
    comments: 5,
    time: "5 hours ago"
  }
];

export default React.memo(function Community() {
  useScrollReveal();
  const [postText, setPostText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [posts, setPosts] = useState(() => {
    const cached = localStorage.getItem('fh6_community_posts');
    return cached ? JSON.parse(cached) : initialPosts;
  });

  useEffect(() => {
    // Stale-while-revalidate: fetch fresh data silently
    const revalidatePosts = async () => {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, we'd merge fetched posts. Here we just ensure cache is updated.
      localStorage.setItem('fh6_community_posts', JSON.stringify(posts));
    };
    revalidatePosts();
  }, [posts]);

  const handlePost = () => {
    if (!postText.trim()) return;
    setIsPosting(true);
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        user: "GuestDriver",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
        verified: false,
        content: postText,
        image: "",
        likes: 0,
        comments: 0,
        time: "Just now"
      };
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      setIsPosting(false);
      setShowSuccess(true);
      setPostText('');
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-[100dvh] bg-zinc-950/80 border border-white/10 rounded-3xl mb-[50px] pt-24 pb-12 px-6 relative overflow-hidden reveal-section z-10">
      {/* Tire Track Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='200' viewBox='0 0 100 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v200M40 0v200M60 0v200M80 0v200' stroke='%23000000' stroke-width='4' stroke-dasharray='10 10'/%3E%3Cpath d='M10 10h80M10 30h80M10 50h80M10 70h80M10 90h80M10 110h80M10 130h80M10 150h80M10 170h80M10 190h80' stroke='%23000000' stroke-width='6'/%3E%3C/svg%3E")`,
             backgroundSize: '100px 200px',
             transform: 'rotate(-15deg) scale(2)',
             transformOrigin: 'center center'
           }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20 slide-in-left">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black text-[#D0D0D0] mb-6 tracking-tight heading-italic text-shadow-strong">
            Join the <span className="text-red-600 text-shadow-strong">Crew</span>
          </h1>
          <p className="text-xl text-[#D0D0D0] opacity-70 max-w-2xl mx-auto italic text-shadow-strong">
            Connect with thousands of other racers. Share your tunes, show off your liveries, and join our weekly car meets.
          </p>
        </div>

        {/* Rotating Rim Social Links */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto slide-in-right mb-24">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex items-center gap-6 transition-all duration-500 ${link.color} overflow-hidden shadow-lg shadow-black/50 bg-diagonal-stripes`}
              >
                {/* Interactive Rim Icon */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  <div className="absolute inset-0 border-4 border-current rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-2 border-2 border-current rounded-full border-dashed opacity-40 group-hover:animate-[spin_4s_linear_infinite] transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-zinc-400 group-hover:text-current transition-colors duration-500" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-orbitron font-bold text-[#D0D0D0] mb-2 flex items-center gap-2 heading-italic">
                    {link.name}
                    <ExternalLink className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-[#D0D0D0] opacity-60 text-sm leading-relaxed group-hover:text-white transition-colors italic">
                    {link.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* NEW: Community Feed Section */}
        <div className="max-w-3xl mx-auto relative z-10 mb-24">
          <div className="text-center mb-12 slide-in-left">
            <h2 className="text-4xl font-orbitron font-black text-white mb-2 flex items-center justify-center gap-3 heading-italic text-shadow-strong">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
              LIVE FEED: TOKYO STREETS
            </h2>
          </div>

          {/* Create Post Card */}
          <div className="bg-black/40 backdrop-blur-[15px] border border-white/10 rounded-3xl p-6 mb-12 shadow-xl slide-in-right">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Share your latest tune or photo session..."
              className="w-full bg-black/60 border border-white/5 rounded-2xl p-4 text-[#D0D0D0] focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all resize-none h-24 mb-4 font-sans"
            />
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-4 text-zinc-400">
                <button className="hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-bold">
                  <ImageIcon className="w-5 h-5" /> <span className="hidden sm:inline">Add Photo</span>
                </button>
                <button className="hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-bold">
                  <Video className="w-5 h-5" /> <span className="hidden sm:inline">Add Video</span>
                </button>
                <button className="hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-bold">
                  <MapPin className="w-5 h-5" /> <span className="hidden sm:inline">Tag Location</span>
                </button>
              </div>
              <button 
                onClick={handlePost}
                disabled={isPosting || !postText.trim()}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600 text-white font-orbitron font-bold uppercase tracking-widest rounded-full px-8 py-2.5 transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] flex items-center justify-center gap-2"
              >
                {isPosting ? 'POSTING...' : showSuccess ? 'POSTED!' : 'POST TO FEED'}
              </button>
            </div>
          </div>

          {/* Feed Posts */}
          <div className="space-y-8 slide-in-left">
            {posts.map((post: any) => (
              <div key={post.id} className="bg-black/40 backdrop-blur-[15px] border border-white/10 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] shrink-0 bg-[#121212]">
                    <ImageWithFallback src={post.avatar} alt={post.user} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-lg">{post.user}</h4>
                      {post.verified && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                    </div>
                    <p className="text-xs text-zinc-500">{post.time}</p>
                  </div>
                </div>
                <p className="text-[#D0D0D0] mb-4 font-sans leading-relaxed">
                  {post.content}
                </p>
                {post.image && (
                  <div className="rounded-2xl overflow-hidden mb-4 border border-white/5 bg-[#121212] min-h-[200px]">
                    <ImageWithFallback src={post.image} alt="Post content" className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                )}
                <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-zinc-400">
                  <button className="flex items-center gap-2 hover:text-red-500 transition-colors group">
                    <Heart className="w-5 h-5 group-hover:fill-red-500 transition-colors" /> <span className="text-sm font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" /> <span className="text-sm font-bold">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-white transition-colors ml-auto">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl shadow-black/50 slide-in-left bg-diagonal-stripes"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
          
          <h2 className="text-3xl font-orbitron font-bold text-[#D0D0D0] mb-4 heading-italic text-shadow-strong">Never Miss a Drop</h2>
          <p className="text-[#D0D0D0] opacity-70 mb-8 max-w-xl mx-auto italic">
            Get notified about new tuning guides, exclusive community events, and the latest FH6 news directly to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-black/60 border border-white/10 rounded-full px-6 py-3 text-[#D0D0D0] focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-zinc-500 italic"
            />
            <button 
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-orbitron font-bold uppercase tracking-widest rounded-full px-8 py-3 transition-colors shadow-lg shadow-red-600/20 burnout-btn"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
});
