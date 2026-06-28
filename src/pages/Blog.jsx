import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../supabaseClient';

import DOMPurify from 'dompurify';

function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  // Categories for the filter bar
  const categories = ['All', 'Hearing Health', 'Technology', 'Lifestyle', 'Clinic News'];

  useEffect(() => {
    const useDummyData = () => {
        const dummyPosts = [
            {
                id: '1',
                title: 'The Future of Invisible Hearing Aids: What to Expect in 2025',
                category: 'Technology',
                author: 'Dr. Marcus Chen',
                imageUrl: 'https://images.unsplash.com/photo-1598331668826-20cecb598181?auto=format&fit=crop&q=80&w=800',
                date: '2024-10-15',
                excerpt: 'As micro-engineering advances, the line between medical device and consumer wearable continues to blur. Discover how the next generation of Invisible-in-Canal (IIC) technology is changing everything we know about audiology.',
                is_featured: true
            },
            {
                id: '2',
                title: '5 Signs You Might Need a Hearing Evaluation',
                category: 'Hearing Health',
                author: 'Admin',
                imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
                date: '2024-10-10',
                excerpt: 'Hearing loss often happens gradually. Learn the subtle early warning signs that indicate it is time to schedule a professional assessment.',
                is_featured: false
            },
            {
                id: '3',
                title: 'Navigating Noisy Restaurants with Confidence',
                category: 'Lifestyle',
                author: 'Admin',
                imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
                date: '2024-10-05',
                excerpt: 'Socializing in crowded environments can be challenging. Here are expert tips and technology settings to help you hear clearly through the background noise.',
                is_featured: false
            }
        ];
        setPosts(dummyPosts);
        setFeaturedPost(dummyPosts[0]);
    };

    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setPosts(data);
          const featured = data.find(p => p.is_featured);
          setFeaturedPost(featured || (data.length > 0 ? data[0] : null));
        } else {
            useDummyData();
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        useDummyData();
      }
    };
    
    fetchBlogs();
  }, []);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Intersection Observer for scroll animations — re-runs when posts load
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const timeoutId = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(section => {
          observer.observe(section);
          // If already in viewport (e.g. top of page), mark visible immediately
          if (section.getBoundingClientRect().top < window.innerHeight) {
              section.classList.add('is-visible');
          }
      });
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [posts, featuredPost]);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus('loading');
    setNewsletterMsg('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: newsletterEmail }]);

      if (error) {
        if (error.code === '23505') {
            throw new Error("You're already subscribed!");
        }
        throw error;
      }

      setNewsletterStatus('success');
      setNewsletterMsg('Thanks for subscribing!');
      setNewsletterEmail('');
    } catch (err) {
      setNewsletterStatus('error');
      setNewsletterMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-xl px-gutter bg-surface-container-low overflow-hidden animate-on-scroll">
          <div className="max-w-container-max mx-auto text-center relative z-10">
            <span className="inline-block py-xs px-md bg-primary-container text-on-primary-container rounded-full text-label-md font-label-md uppercase tracking-wider mb-md">
              The Journal
            </span>
            <h1 className="text-display-lg font-display-lg text-primary mb-md">
              Hearing Health <span className="text-secondary">Insights</span>
            </h1>
            <p className="text-body-xl text-on-surface-variant max-w-2xl mx-auto">
              Expert advice, clinical updates, and inspiring stories from the Life Hearing Care community.
            </p>
            
            {/* Search Bar */}
            <div className="mt-lg max-w-xl mx-auto relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..." 
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-outline-variant/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-shadow group-hover:shadow-md text-body-lg"
              />
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-fixed/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-fixed/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-xl px-gutter max-w-container-max mx-auto animate-on-scroll">
            <div 
              className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row group cursor-pointer border border-outline-variant/20"
              onClick={() => setSelectedPost(featuredPost)}
            >
              <div className="lg:w-3/5 overflow-hidden relative">
                <img 
                  src={featuredPost.image_url || featuredPost.imageUrl} 
                  alt="Featured article" 
                  className="w-full h-[300px] lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-md left-md">
                  <span className="bg-secondary text-on-secondary px-sm py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-md">
                    Featured
                  </span>
                </div>
              </div>
              <div className="lg:w-2/5 p-lg xl:p-xl flex flex-col justify-center bg-white relative z-10">
                <div className="flex items-center gap-sm mb-md text-label-md text-on-surface-variant font-label-md">
                  <span className="text-secondary">{featuredPost.category}</span>
                  <span>•</span>
                  <span>{new Date(featuredPost.created_at || featuredPost.date).toLocaleDateString()}</span>
                </div>
                <h2 className="text-headline-md font-headline-md text-primary mb-md group-hover:text-secondary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-body-lg text-on-surface-variant mb-lg line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-sm">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold">
                      {featuredPost.author ? featuredPost.author.charAt(0) : 'A'}
                    </div>
                    <span className="font-label-md text-label-md text-on-surface">{featuredPost.author || 'Admin'}</span>
                  </div>
                  <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Categories Bar */}
        <section className="sticky top-20 z-40 bg-background/90 backdrop-blur-md py-sm border-y border-outline-variant/20 shadow-sm animate-on-scroll">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="flex overflow-x-auto custom-scrollbar pb-1 gap-sm">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-md py-xs rounded-full font-label-md text-label-md transition-all ${
                    activeCategory === category 
                      ? 'bg-primary text-on-primary shadow-md scale-105' 
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section className="py-xl px-gutter max-w-container-max mx-auto animate-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {filteredPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-outline-variant/20 transition-all duration-300 hover:-translate-y-1 flex flex-col group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={post.image_url || post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-sm left-sm bg-surface/90 backdrop-blur text-on-surface px-sm py-1 rounded text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <div className="p-md flex flex-col flex-grow">
                  <span className="text-xs text-outline mb-sm font-label-md">{new Date(post.created_at || post.date).toLocaleDateString()}</span>
                  <h3 className="text-title-lg font-title-lg text-primary mb-sm line-clamp-2 group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-body-lg text-on-surface-variant line-clamp-3 mb-md flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto border-t border-outline-variant/20 pt-sm flex items-center text-primary font-label-md text-label-md">
                    Read Article
                    <span className="material-symbols-outlined text-[20px] ml-1 group-hover:translate-x-1 transition-transform">
                      chevron_right
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-xl text-on-surface-variant text-body-lg">
              No articles found in this category.
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="mt-xl text-center">
              <button className="border-2 border-primary text-primary px-lg py-md rounded-xl font-label-md text-label-md hover:bg-primary/5 transition-all active:scale-95">
                Load More Articles
              </button>
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="py-xl px-gutter animate-on-scroll">
          <div className="max-w-4xl mx-auto rounded-3xl bg-secondary overflow-hidden relative p-lg md:p-xl text-center shadow-2xl">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[48px] text-secondary-fixed mb-sm">mail</span>
              <h2 className="text-display-lg-mobile md:text-display-lg font-display-lg text-white mb-sm">Stay in the Loop</h2>
              <p className="text-white/90 text-body-xl mb-lg max-w-xl mx-auto">
                Get the latest hearing health tips and clinic updates delivered directly to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-sm max-w-lg mx-auto" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-grow px-md py-md rounded-xl text-on-surface border-none focus:ring-2 focus:ring-white disabled:opacity-75"
                  required
                  disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                />
                <button 
                  type="submit" 
                  disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                  className="bg-primary text-on-primary font-bold px-lg py-md rounded-xl hover:scale-105 transition-transform shadow-lg whitespace-nowrap disabled:opacity-75 disabled:hover:scale-100"
                >
                  {newsletterStatus === 'loading' ? 'Subscribing...' : newsletterStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>
              {newsletterMsg && (
                <div className={`mt-md font-bold ${newsletterStatus === 'error' ? 'text-red-200 bg-red-900/30' : 'text-green-200 bg-green-900/30'} inline-block px-md py-xs rounded-lg`}>
                  {newsletterMsg}
                </div>
              )}
              <p className="text-xs text-white/70 mt-sm">We respect your privacy. Unsubscribe at any time.</p>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4"></div>
          </div>
        </section>

        {/* Modal for Read Article */}
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-md bg-black/50 backdrop-blur-sm" onClick={() => setSelectedPost(null)}>
            <div className="bg-white rounded-3xl p-lg md:p-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-md">
                <div className="flex items-center gap-sm text-label-md text-on-surface-variant font-label-md">
                  <span className="text-secondary bg-secondary-container text-on-secondary-container px-sm py-xs rounded">{selectedPost.category}</span>
                  <span>•</span>
                  <span>{new Date(selectedPost.created_at || selectedPost.date).toLocaleDateString()}</span>
                </div>
                <button onClick={() => setSelectedPost(null)} className="text-outline hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined text-3xl">close</span>
                </button>
              </div>
              
              <h2 className="text-display-sm md:text-display-md font-display-sm text-primary mb-md">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-sm mb-lg">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold">
                  {selectedPost.author ? selectedPost.author.charAt(0) : 'A'}
                </div>
                <span className="font-label-md text-label-md text-on-surface">{selectedPost.author || 'Admin'}</span>
              </div>
              
              <div className="aspect-video w-full rounded-2xl overflow-hidden mb-lg">
                <img src={selectedPost.image_url || selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>

              <div className="prose prose-lg max-w-none text-on-surface-variant">
                {selectedPost.content ? (
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPost.content) }} />
                ) : (
                  <p className="text-body-xl leading-relaxed">{selectedPost.excerpt}</p>
                )}
              </div>
              
              <div className="mt-xl flex justify-end border-t border-outline-variant/30 pt-md">
                <button onClick={() => setSelectedPost(null)} className="bg-primary text-on-primary px-xl py-sm rounded-lg font-label-md hover:shadow-lg transition-all active:scale-95">
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}

export default Blog;
