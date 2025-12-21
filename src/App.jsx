import { useState, useEffect } from 'react'
import ExpandableCard from './components/ExpandableCard'

function App() {
  /* -------------------------------- State ------------------------------- */
  const [step, setStep] = useState('landing');
  const [pitchMethod, setPitchMethod] = useState('text');
  const [rawPitch, setRawPitch] = useState("");
  const [startupName, setStartupName] = useState("");

  // Accordion Control
  const [expandedCard, setExpandedCard] = useState(null);

  const [refinedData, setRefinedData] = useState({
    problem: "",
    solution: "",
    competition: ""
  });

  const [discounts, setDiscounts] = useState({
    visuals: false,
    branding: false,
    interview: false,
    story: false
  });

  const [role, setRole] = useState('founder'); // 'founder' or 'affiliate'
  const [affiliateTab, setAffiliateTab] = useState('requests'); // 'requests', 'active', 'resources', 'settings'
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidValue, setBidValue] = useState(30);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(null); // id of pitch being declined
  const [showBackerPreview, setShowBackerPreview] = useState(null); // startup data for backer page preview
  const [publicBackerData, setPublicBackerData] = useState(null); // data for full-page backer view
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authError, setAuthError] = useState('');

  /* ---------------------- Session Restoration --------------------- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token payload (simple base64 decode since we don't have a library)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAuthenticated(true);
        setRole(payload.role);
        // Redirect to appropriate step if on landing
        if (step === 'landing') {
          if (payload.role === 'founder') setStep('pitch'); // Or dashboard if they have one
          else setStep('dashboard');
        }
      } catch (e) {
        console.error("Invalid token", e);
        localStorage.removeItem('token');
      }
    }
  }, []); // Run once on mount

  const handleAuth = async () => {
    setAuthError('');
    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/signup';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      // Ensure we set the role from the response (or the one we sent) to keep state consistent
      if (data.user && data.user.role) setRole(data.user.role);

      if (role === 'founder') setStep('pitch');
      else setStep('dashboard');
    } catch (err) {
      setAuthError(err.message);
    }
  };
  // Affiliate State
  const [extraPitchesPool] = useState([
    {
      id: 3, name: 'CyberShield', emoji: '🛡️', desc: 'Enterprise-grade zero trust security.',
      tagline: 'Lock down your perimeter with AI defense.',
      problem: 'Data breaches cost SMEs an average of $2.2M annually.',
      solution: 'Automated threat hunting and real-time incident response.',
      isHighEffort: true, commission: 30, price: 200,
      assets: ['scripts'],
      branding: ['#EF4444', '#1F2937'],
      qa: [{ q: "Cloud compatible?", a: "Supports AWS, GCP, and Azure natively." }]
    },
    {
      id: 4, name: 'SolarSync', emoji: '☀️', desc: 'Predictive solar energy management.',
      tagline: 'Optimize your grid with the power of the sun.',
      problem: 'Solar efficiency drops by 30% due to poor grid timing.',
      solution: 'Predictive algorithm that syncs appliances with peak sun.',
      isHighEffort: false, commission: 15, price: 80,
      assets: ['video', 'images', 'scripts'],
      branding: ['#F59E0B', '#FFFBEB'],
      qa: [{ q: "Hardware required?", a: "Works with any smart meter or gateway." }]
    }
  ]);

  // Affiliate State
  const [pitches, setPitches] = useState([]);
  const [activePartnerships, setActivePartnerships] = useState([
    {
      id: 101, name: 'BioSync Wearables', emoji: '🧬', desc: 'Tracking glucose and cortisol levels in real-time.',
      clicks: '12.4k', pledges: 842, conv: '6.8%', earned: 2450, status: 'Live',
      tagline: 'The future of metabolic health.',
      assets: ['video', 'images', 'scripts']
    }
  ]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/pitches');
      const data = await res.json();

      // Merge with pool and deduplicate
      setPitches(prev => {
        const combined = [...data, ...extraPitchesPool];
        const unique = [];
        const seen = new Set();
        for (const p of combined) {
          if (!seen.has(p.id)) {
            seen.add(p.id);
            unique.push(p);
          }
        }
        return unique;
      });
    } catch (err) {
      console.error("Refresh failed", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && role === 'affiliate') {
      handleRefresh();
    }
  }, [isAuthenticated, role]);

  const handleAcceptPitch = (pitch) => {
    setActivePartnerships(prev => [
      ...prev,
      { ...pitch, clicks: '0', pledges: 0, conv: '0%', earned: 0, status: 'Pending' }
    ]);
    setPitches(prev => prev.filter(p => p.id !== pitch.id));
    setSelectedPitch(null);
  };

  const handleDeclinePitch = (id, reason) => {
    setPitches(prev => prev.filter(p => p.id !== id));
    setShowDeclineModal(null);
  };

  // Auto-scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  /* ------------------------------- Helpers ------------------------------ */
  const baseFee = 125;
  const currentFee = baseFee
    - (discounts.visuals ? 15 : 0)
    - (discounts.branding ? 15 : 0)
    - (discounts.interview ? 15 : 0);

  const handleGeneratePitch = () => {
    if (!rawPitch) return;
    setStep('refining');

    // Simulating Agent Work
    setTimeout(() => {
      setRefinedData({
        problem: "Fragmented affiliate networks make it impossible for early-stage founders to validate demand without significant upfront ad spend.",
        solution: "Proovd: A decentralized validation protocol where affiliates stake reputation on pre-product startups.",
        competition: "Kickstarter (Public/High Friction), Gumroad (Post-Product), UserTesting (No Skin in Game)."
      });
      setStep('vetting');
    }, 2200);
  };

  const handleActivateCampaign = async () => {
    // Save pitch to DB
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/pitches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: startupName,
          problem: refinedData.problem,
          solution: refinedData.solution,
          competition: refinedData.competition,
          isHighEffort: !discounts.visuals, // Simple logic for now
          campaignDuration: 21,
          pricePerSale: 100 // Default
        })
      });
    } catch (err) {
      console.error("Failed to save pitch", err);
    }

    setStep('matching');
    setTimeout(() => {
      setStep('results');
    }, 3000);
  };

  const handleStartFlow = () => {
    setRole('founder');
    setStep('auth');
  };

  const handleStartAffiliate = () => {
    setRole('affiliate');
    setStep('auth');
  };

  /* -------------------------------- Render ------------------------------ */
  return (
    <div className="min-h-screen bg-[#030303] text-gray-200 font-sans selection:bg-violet-500/30">

      {/* 1. Conditional Header */}
      {step === 'landing' ? (
        <header className="fixed w-full z-50 transition-all duration-300 glass header">
          <div className="container h-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500"></div>
              <span className="text-2xl font-bold tracking-tight text-white">Proovd</span>
            </div>

            <nav className="hidden sm:flex items-center gap-8">
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="nav-link bg-transparent border-none cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => setStep('campaigns')}
                className="nav-link bg-transparent border-none cursor-pointer"
              >
                Explore
              </button>
              <button
                onClick={() => setStep('about')}
                className="nav-link bg-transparent border-none cursor-pointer"
              >
                About
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <button onClick={handleStartFlow} className="nav-link font-medium">Login</button>
              <button onClick={handleStartFlow} className="btn-primary py-2 px-6 text-sm">Get Started</button>
            </div>
          </div>
        </header>
      ) : (
        <header className="fixed top-0 inset-x-0 h-20 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-center">
          <div className="container max-w-3xl px-6 flex items-center justify-between w-full">
            <div
              onClick={() => setStep('landing')}
              className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors">
                <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
              </div>
              <span className="hidden sm:inline font-medium">Exit</span>
            </div>


            {/* Status Indicator */}
            <div className="flex items-center gap-3 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative z-10" />
                  <div className="absolute inset-0 bg-emerald-500/50 rounded-full animate-ping" />
                </div>
                <span className="text-[10px] font-mono font-bold text-gray-400 tracking-wider uppercase">
                  System Active
                </span>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* 2. Main Content Container */}
      <main className={`${step === 'landing' ? '' : 'pt-40 pb-48 px-4 sm:px-6 container mx-auto max-w-3xl min-h-screen flex flex-col'}`}>

        {/* ------------------------- STEP 0: LOGIN / SIGNUP ------------------------- */}
        {step === 'auth' && (
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in-up">
            <div className="glass-card w-full max-w-md p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-cyan-500" />
              <h2 className="text-3xl font-bold text-white mb-2 text-center">
                {isLoginMode ? 'Welcome Back' : 'Join Proovd'}
              </h2>
              <p className="text-gray-400 text-center mb-8">
                {role === 'founder' ? 'Validate your idea today.' : 'Start earning commissions.'}
              </p>

              {authError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
                  {authError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-premium w-full"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-premium w-full"
                    placeholder="••••••••"
                  />
                </div>

                <button onClick={handleAuth} className="btn-primary w-full py-3 mt-4">
                  {isLoginMode ? 'Login' : 'Create Account'}
                </button>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  {isLoginMode ? "Don't have an account? Sign up" : "Already have an account? Login"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------- STEP 0: LANDING ------------------------- */}
        {step === 'landing' && (
          <div className="relative overflow-hidden">
            {/* Background Glows */}
            <div className="glow-bg" style={{ top: "-20%", left: "-10%" }} />
            <div className="glow-bg" style={{ bottom: "-20%", right: "-10%", background: "radial-gradient(circle, var(--secondary-glow) 0%, transparent 70%)" }} />

            {/* Hero Section */}
            <section className="container hero-section">
              <div className="flex flex-col lg:flex-row items-center gap-12 w-full lg-row">
                <div className="lg:w-1/2 lg-half animate-fade-in">
                  <div className="hero-badge">
                    THE FUTURE OF CROWDFUNDING
                  </div>
                  <h1 className="hero-title text-white">
                    Prove your idea. <br />
                    <span className="text-gradient">Fund your dream.</span>
                  </h1>
                  <p className="hero-description text-gray-400">
                    Proovd connects visionary founders with passionate backers and powerful affiliates.
                    Validate your startup concept before you build, and grow with a community that believes in you.
                  </p>
                  <div className="flex items-center gap-4">
                    <button onClick={handleStartFlow} className="btn-primary">Start a Campaign</button>
                    <button onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary">Explore Projects</button>
                  </div>

                  <div className="stat-group">
                    <div>
                      <h3 className="stat-value text-white">220M+</h3>
                      <p className="stat-label">Raised</p>
                    </div>
                    <div>
                      <h3 className="stat-value text-white">12k+</h3>
                      <p className="stat-label">Projects</p>
                    </div>
                    <div>
                      <h3 className="stat-value text-white">98%</h3>
                      <p className="stat-label">Success Rate</p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 lg-half relative w-full flex items-center justify-center animate-float hidden lg:flex">
                  <div className="relative w-full h-[500px]">
                    {/* Main Floating Card */}
                    <div className="absolute glass-card flex items-center justify-center z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px]">
                      <div className="text-center">
                        <div className="mx-auto mb-4 rounded-full w-16 h-16 bg-gradient-to-br from-violet-600 to-cyan-500"></div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Launch</h3>
                        <p className="text-gray-400 text-sm">Go from zero to hero.</p>
                      </div>
                    </div>

                    {/* Floating Elements - Rocket */}
                    <div className="absolute glass-card flex items-center justify-center animate-float top-0 right-10 w-32 h-32 delay-75">
                      <div className="text-center">
                        <span className="text-3xl">🚀</span>
                        <p className="text-[10px] mt-2 font-bold text-violet-300 uppercase">Trending</p>
                      </div>
                    </div>

                    {/* Floating Elements - Volume */}
                    <div className="absolute glass-card flex items-center justify-center animate-float bottom-10 left-10 w-48 h-24 delay-150">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full w-10 h-10 flex items-center justify-center bg-cyan-500/20 text-cyan-400">
                          $
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500">Daily Volume</p>
                          <p className="font-bold text-lg text-white">$4.2M</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="section bg-dim border-y border-white/5">
              <div className="container">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-extrabold mb-4 text-white">Ecosystem for Everyone</h2>
                  <p className="text-gray-400 max-w-xl mx-auto">
                    Whether you're building, backing, or promoting, Proovd provides the tools you need to succeed.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* Founders Card */}
                  <div className="glass-card">
                    <div className="icon-lg rounded-xl flex items-center justify-center mb-6 bg-violet-500/10">
                      <svg className="icon-md text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">For Founders</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      Validate your idea with real users. Access instant funding without giving up equity.
                    </p>
                    <button onClick={handleStartFlow} className="text-violet-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                      Start Pitching <span>→</span>
                    </button>
                  </div>

                  {/* Affiliates Card */}
                  <div className="glass-card">
                    <div className="icon-lg rounded-xl flex items-center justify-center mb-6 bg-cyan-500/10">
                      <svg className="icon-md text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">For Affiliates</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      Monetize your influence by promoting high-potential startups. Earn commissions.
                    </p>
                    <button onClick={handleStartAffiliate} className="text-cyan-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                      Join Network <span>→</span>
                    </button>
                  </div>

                </div>
              </div>
            </section>

            {/* Featured Projects Section */}
            <section id="explore" className="section bg-black/40 relative overflow-hidden">
              <div className="container relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                  <div>
                    <h2 className="text-4xl font-extrabold mb-4 text-white tracking-tight">Featured Projects</h2>
                    <p className="text-gray-400 max-w-xl">
                      Back the next generation of founders. These startups are being validated by our creator network.
                    </p>
                  </div>
                  <button onClick={() => setStep('campaigns')} className="text-sm font-bold text-white uppercase tracking-[0.2em] border-b-2 border-violet-500 pb-1 hover:border-violet-400 transition-all">
                    View All Campaigns
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...pitches, ...extraPitchesPool].slice(0, 3).map((camp) => (
                    <div
                      key={camp.id}
                      onClick={() => {
                        setPublicBackerData(camp);
                        setStep('backer_view');
                      }}
                      className="glass-card hover:border-white/20 transition-all group cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl mb-6 shadow-xl group-hover:scale-110 transition-transform">
                        {camp.emoji}
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{camp.name}</h4>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
                        {camp.tagline}
                      </p>
                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Validating</span>
                        </div>
                        <span className="text-xs font-bold text-violet-400 group-hover:translate-x-1 transition-transform">View Project →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            {/* About Section */}
            <section id="about" className="section bg-[#050505] relative overflow-hidden">
              <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                  <div className="lg:w-1/2">
                    <div className="hero-badge mb-6">OUR MISSION</div>
                    <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">
                      Validation at the <span className="text-gradient">speed of light.</span>
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed mb-8">
                      Proovd was founded on a simple premise: Great ideas shouldn't die in obscurity.
                      By leveraging a decentralized network of specialized creators, we've built a trustless bridge
                      between early-stage concepts and market proof.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-white font-bold">
                          <span className="text-violet-500">◈</span> Trustless Staking
                        </div>
                        <p className="text-sm text-gray-500">Affiliates stake reputation and value on projects they believe in.</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-white font-bold">
                          <span className="text-cyan-500">◈</span> Instant Fund Release
                        </div>
                        <p className="text-sm text-gray-500">Funds are locked via Proovd Protocol and released only upon validation proof.</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/2 relative">
                    <div className="relative p-1 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-[3rem] overflow-hidden group hover:from-violet-500/40 hover:to-cyan-500/40 transition-all duration-700">
                      <div className="p-12 rounded-[2.8rem] bg-[#0A0A0E] space-y-8">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-violet-600/10 flex items-center justify-center text-3xl">🛡️</div>
                          <div>
                            <h4 className="text-white font-bold text-lg">Proovd Secure</h4>
                            <p className="text-gray-500 text-sm">Anti-fraud engine for backing.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-cyan-600/10 flex items-center justify-center text-3xl">🚀</div>
                          <div>
                            <h4 className="text-white font-bold text-lg">Creator Engine</h4>
                            <p className="text-gray-400 text-sm">AI-assisted marketing material generation.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-3xl">💎</div>
                          <div>
                            <h4 className="text-white font-bold text-lg">Reputation NFT</h4>
                            <p className="text-gray-500 text-sm">On-chain track record for every user.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/20 blur-[80px]" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/20 blur-[80px]" />
                  </div>
                </div>

                <div className="mt-32 pt-20 border-t border-white/5 text-center">
                  <h3 className="text-2xl font-bold text-white mb-12">Trusted by builders at</h3>
                  <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale invert">
                    <span className="text-2xl font-black italic tracking-tighter">PROTO-X</span>
                    <span className="text-2xl font-black italic tracking-tighter">NEXUS</span>
                    <span className="text-2xl font-black italic tracking-tighter">QUANTUM</span>
                    <span className="text-2xl font-black italic tracking-tighter">ORBIT.AI</span>
                    <span className="text-2xl font-black italic tracking-tighter">VELOCITY</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-20 bg-black border-t border-white/5">
              <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500"></div>
                      <span className="text-2xl font-bold tracking-tight text-white">Proovd</span>
                    </div>
                    <p className="text-gray-500 max-w-xs">
                      The premier decentralized validation and crowdfunding network for the next wave of startups.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
                    <div className="space-y-4">
                      <h4 className="text-white font-bold">Platform</h4>
                      <p className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">How it works</p>
                      <p className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">Pricing</p>
                      <p className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">Roadmap</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-white font-bold">Resources</h4>
                      <p className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">Documentation</p>
                      <p className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">Help Center</p>
                      <p className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">API</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-white font-bold">Social</h4>
                      <p className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">Twitter (X)</p>
                      <p className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">Discord</p>
                      <p className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">LinkedIn</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-white/5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                  <p>© 2025 PROOVD PROTOCOL INC.</p>
                  <p>BUILT ON EREBUS-7 NETWORK</p>
                </div>
              </div>
            </footer>
          </div>
        )}

        {/* ------------------------- CAMPAIGNS PAGE ------------------------- */}
        {step === 'campaigns' && (
          <div className="animate-fade-in-up">
            <div className="text-center space-y-6 pt-8 mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-bold tracking-[0.2em] uppercase">
                Explore Campaigns
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                Discover <span className="text-gradient">Innovative Startups</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Back the next generation of founders. These startups are being validated by our creator network.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...pitches, ...extraPitchesPool].map((camp) => (
                <div
                  key={camp.id}
                  onClick={() => {
                    setPublicBackerData(camp);
                    setStep('backer_view');
                  }}
                  className="glass-card hover:border-white/20 transition-all group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl mb-6 shadow-xl group-hover:scale-110 transition-transform">
                    {camp.emoji}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{camp.name}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
                    {camp.tagline}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Commission</span>
                      <span className="text-emerald-400 font-bold">{camp.commission}%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Price Point</span>
                      <span className="text-white font-bold">${camp.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Effort Level</span>
                      <span className={`font-bold ${camp.isHighEffort ? 'text-orange-400' : 'text-cyan-400'}`}>
                        {camp.isHighEffort ? 'High' : 'Low'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Validating</span>
                    </div>
                    <span className="text-xs font-bold text-violet-400 group-hover:translate-x-1 transition-transform">View Project →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------- ABOUT PAGE ------------------------- */}
        {step === 'about' && (
          <div className="animate-fade-in-up">
            <div className="text-center space-y-6 pt-8 mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold tracking-[0.2em] uppercase">
                Our Mission
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                Validation at the <span className="text-gradient">speed of light.</span>
              </h1>
            </div>

            <div className="space-y-20">
              {/* Mission Statement */}
              <div className="glass-card">
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Proovd was founded on a simple premise: <span className="text-white font-bold">Great ideas shouldn't die in obscurity.</span>
                  By leveraging a decentralized network of specialized creators, we've built a trustless bridge
                  between early-stage concepts and market proof.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white font-bold text-lg">
                      <span className="text-violet-500 text-2xl">◈</span> Trustless Staking
                    </div>
                    <p className="text-gray-400 leading-relaxed pl-9">
                      Affiliates stake reputation and value on projects they believe in. This creates skin in the game
                      and ensures only quality startups get promoted.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white font-bold text-lg">
                      <span className="text-cyan-500 text-2xl">◈</span> Instant Fund Release
                    </div>
                    <p className="text-gray-400 leading-relaxed pl-9">
                      Funds are locked via Proovd Protocol and released only upon validation proof. No middlemen,
                      no delays, just pure market validation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Platform Features */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Platform Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card text-center">
                    <div className="w-20 h-20 rounded-2xl bg-violet-600/10 flex items-center justify-center text-4xl mx-auto mb-6">🛡️</div>
                    <h4 className="text-white font-bold text-lg mb-3">Proovd Secure</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Anti-fraud engine for backing. Advanced algorithms detect and prevent fraudulent campaigns.
                    </p>
                  </div>
                  <div className="glass-card text-center">
                    <div className="w-20 h-20 rounded-2xl bg-cyan-600/10 flex items-center justify-center text-4xl mx-auto mb-6">🚀</div>
                    <h4 className="text-white font-bold text-lg mb-3">Creator Engine</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      AI-assisted marketing material generation. Create professional assets in minutes, not days.
                    </p>
                  </div>
                  <div className="glass-card text-center">
                    <div className="w-20 h-20 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-4xl mx-auto mb-6">💎</div>
                    <h4 className="text-white font-bold text-lg mb-3">Reputation NFT</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      On-chain track record for every user. Build your reputation and unlock exclusive opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="glass-card">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">By the Numbers</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <h3 className="text-5xl font-bold text-white mb-2">$220M+</h3>
                    <p className="text-gray-500 text-sm uppercase tracking-widest">Total Raised</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-5xl font-bold text-white mb-2">12k+</h3>
                    <p className="text-gray-500 text-sm uppercase tracking-widest">Projects Launched</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-5xl font-bold text-white mb-2">98%</h3>
                    <p className="text-gray-500 text-sm uppercase tracking-widest">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-5xl font-bold text-white mb-2">45k+</h3>
                    <p className="text-gray-500 text-sm uppercase tracking-widest">Active Creators</p>
                  </div>
                </div>
              </div>

              {/* Trusted By */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-12">Trusted by builders at</h3>
                <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale invert">
                  <span className="text-2xl font-black italic tracking-tighter">PROTO-X</span>
                  <span className="text-2xl font-black italic tracking-tighter">NEXUS</span>
                  <span className="text-2xl font-black italic tracking-tighter">QUANTUM</span>
                  <span className="text-2xl font-black italic tracking-tighter">ORBIT.AI</span>
                  <span className="text-2xl font-black italic tracking-tighter">VELOCITY</span>
                </div>
              </div>

              {/* CTA */}
              <div className="glass-card text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to validate your idea?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Join thousands of founders who have successfully validated and funded their startups through Proovd.
                </p>
                <button onClick={handleStartFlow} className="btn-primary py-4 px-12 text-lg">
                  Start Your Campaign
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------- STEP 1: PITCH ------------------------- */}
        {step === 'pitch' && (
          <div className="flex flex-col flex-1 animate-fade-in-up">
            <div className="text-center space-y-6 pt-8 mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold tracking-[0.2em] uppercase">
                Phase 1: Initiation
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                Pitch your idea.
              </h1>
              <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
                Don't worry about formatting. Just dump your brain. Our AI will structure the business case.
              </p>
            </div>

            <div className="bg-[#0A0A0E] rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 relative group">
              {/* Input Mode Switcher */}
              <div className="flex border-b border-white/5">
                <button
                  onClick={() => setPitchMethod('text')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${pitchMethod === 'text' ? 'bg-white/5 text-white' : 'text-gray-600 hover:bg-white/[0.02] hover:text-gray-400'}`}
                >
                  Text Input
                </button>
                <button
                  onClick={() => setPitchMethod('voice')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${pitchMethod === 'voice' ? 'bg-white/5 text-white' : 'text-gray-600 hover:bg-white/[0.02] hover:text-gray-400'}`}
                >
                  Voice Note
                </button>
              </div>

              <div className="p-6 sm:p-8 min-h-[320px] relative">
                <div className="mb-6">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] block mb-3 pl-1">Startup Name</label>
                  <input
                    type="text"
                    value={startupName}
                    onChange={(e) => setStartupName(e.target.value)}
                    placeholder="Enter your startup name..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-700 focus:border-violet-500/50 outline-none transition-all text-lg font-medium"
                  />
                </div>

                {pitchMethod === 'text' ? (
                  <textarea
                    value={rawPitch}
                    onChange={(e) => setRawPitch(e.target.value)}
                    placeholder="I'm building a platform that helps..."
                    className="w-full h-full min-h-[280px] bg-transparent border-none resize-none focus:ring-0 text-xl leading-relaxed text-gray-200 placeholder:text-gray-700 font-normal outline-none"
                    autoFocus
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-white/[0.01] transition-colors group">
                    <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-3xl">🎙️</span>
                    </div>
                    <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">Tap to Record</p>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-white/[0.02] border-t border-white/5 flex justify-between items-center backdrop-blur-sm">
                <span className="text-xs font-mono text-gray-600 uppercase tracking-wider pl-2">
                  {rawPitch.length} Chars
                </span>
                <button
                  onClick={handleGeneratePitch}
                  disabled={!rawPitch || !startupName}
                  className="btn-primary py-3 px-8 text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/20"
                >
                  Generate Pitch →
                </button>
              </div>
            </div>
          </div>
        )}


        {/* ------------------------- STEP 2: LOADING ------------------------- */}
        {step === 'refining' && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 animate-fade-in-up">
            <div className="relative w-32 h-32 mb-12">
              <div className="absolute inset-0 border-4 border-violet-500/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-violet-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-4xl animate-pulse">✨</div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Refining Concept</h2>
            <div className="h-6 overflow-hidden relative">
              <p className="text-gray-500 text-sm font-mono">
                Structuring value proposition...
              </p>
            </div>
          </div>
        )}


        {/* ------------------------- STEP 3: VETTING ------------------------- */}
        {step === 'vetting' && (
          <div className="animate-slide-up-fade space-y-12">
            {/* Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/5">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Validation Check</h1>
                <p className="text-gray-400 max-w-sm">Review your pitch and add assets to increase trust.</p>
              </div>
              <div className="text-left sm:text-right bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Current Listing Fee</p>
                <p className="text-3xl font-bold text-white tracking-tight leading-none">
                  ${currentFee}<span className="text-lg text-gray-600 font-normal">.00</span>
                </p>
              </div>
            </div>

            {/* Core Form */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1 mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-violet-500 rounded-full" />
                Core Business Case
              </h3>

              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 pl-1">The Problem</label>
                  <textarea
                    defaultValue={refinedData.problem}
                    className="input-premium h-32 text-base leading-relaxed bg-[#0A0A0E] border-white/10 focus:border-violet-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 pl-1">The Solution</label>
                  <textarea
                    defaultValue={refinedData.solution}
                    className="input-premium h-32 text-base leading-relaxed bg-[#0A0A0E] border-white/10 focus:border-violet-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Accordion Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 mt-8 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-500 rounded-full" />
                Trust & Validation Assets
              </h3>
              <p className="text-sm text-gray-500 mb-6 pl-1">Complete these to reduce your listing fee.</p>

              {/* 1. Visuals */}
              <ExpandableCard
                title="Visual Proof"
                icon="🖼️"
                description="Upload screens or mockups."
                isActive={expandedCard === 'visuals'}
                isCompleted={discounts.visuals}
                onToggle={() => setExpandedCard(prev => prev === 'visuals' ? null : 'visuals')}
              >
                <div className="border-2 border-dashed border-white/10 rounded-xl h-48 flex flex-col items-center justify-center bg-black/20 hover:bg-black/40 cursor-pointer transition-colors group mb-6">
                  <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">☁️</span>
                  <span className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">Click to Upload Image</span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</span>
                </div>
                <button
                  onClick={() => {
                    setDiscounts(d => ({ ...d, visuals: true }));
                    setExpandedCard(null);
                  }}
                  className="w-full py-4 bg-violet-600/10 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/20 hover:border-violet-500 font-bold rounded-xl transition-all"
                >
                  Save & Apply Discount (-$15)
                </button>
              </ExpandableCard>

              {/* 2. Branding */}
              <ExpandableCard
                title="Brand Identity"
                icon="✨"
                description="Logo, colors, and typography."
                isActive={expandedCard === 'branding'}
                isCompleted={discounts.branding}
                onToggle={() => setExpandedCard(prev => prev === 'branding' ? null : 'branding')}
              >
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Primary Color</label>
                    <div className="flex bg-black/40 p-1.5 rounded-lg border border-white/10 items-center gap-3">
                      <input type="color" className="w-10 h-10 rounded-md bg-transparent cursor-pointer" defaultValue="#7c3aed" />
                      <span className="text-sm font-mono text-gray-400">#7C3AED</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Font Family</label>
                    <select className="input-premium h-12">
                      <option>Inter (Modern Sans)</option>
                      <option>Roboto (Tech)</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setDiscounts(d => ({ ...d, branding: true }));
                    setExpandedCard(null);
                  }}
                  className="w-full py-4 bg-violet-600/10 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/20 hover:border-violet-500 font-bold rounded-xl transition-all"
                >
                  Save & Apply Discount (-$15)
                </button>
              </ExpandableCard>

              {/* 3. Interview */}
              <ExpandableCard
                title="Founder Interview"
                icon="🎙️"
                description="2-minute quick-fire AI interview."
                isActive={expandedCard === 'interview'}
                isCompleted={discounts.interview}
                onToggle={() => setExpandedCard(prev => prev === 'interview' ? null : 'interview')}
              >
                <div className="bg-[#050505] border border-white/10 rounded-xl p-8 text-center relative overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/10 to-transparent" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
                      <span className="text-3xl">🎤</span>
                    </div>
                    <h4 className="text-white font-bold mb-2">Ready to record?</h4>
                    <p className="text-sm text-gray-500 mb-6">Our AI will ask 3 questions about your target market.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setDiscounts(d => ({ ...d, interview: true }));
                    setExpandedCard(null);
                  }}
                  className="w-full py-4 bg-violet-600/10 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/20 hover:border-violet-500 font-bold rounded-xl transition-all"
                >
                  Connect Microphone & Start (-$15)
                </button>
              </ExpandableCard>

              {/* 4. Story (Essential) */}
              <ExpandableCard
                title="Founder Story"
                icon="📖"
                description="Why you? Why now?"
                isActive={expandedCard === 'story'}
                isCompleted={discounts.story}
                onToggle={() => setExpandedCard(prev => prev === 'story' ? null : 'story')}
                discountAmount={0}
              >
                <textarea
                  className="input-premium h-48 mb-6"
                  placeholder="I've been working in this industry for 10 years and noticed..."
                />
                <button
                  onClick={() => {
                    setDiscounts(d => ({ ...d, story: true }));
                    setExpandedCard(null);
                  }}
                  className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Save Story
                </button>
              </ExpandableCard>
            </div>

            {/* Sticky Bottom Bar for Next Step */}
            <div className="fixed bottom-0 inset-x-0 p-4 z-40 bg-gradient-to-t from-black via-black/90 to-transparent pt-12">
              <div className="container mx-auto max-w-3xl">
                <button
                  onClick={handleActivateCampaign}
                  className="w-full btn-primary py-4 text-lg shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:shadow-[0_0_60px_rgba(124,58,237,0.5)] transform hover:-translate-y-1 transition-all"
                >
                  Find Matching Affiliates →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------- STEP 4 & 5: MATCHING & RESULTS ------------------------- */}
        {(step === 'matching' || step === 'results') && (
          <div className="flex-1 flex flex-col pt-10 animate-slide-up-fade">
            {step === 'matching' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin mb-8" />
                <h2 className="text-3xl font-bold text-white mb-2">Broadcasting Pitch</h2>
                <p className="text-gray-500">Matching algorithm running...</p>
              </div>
            ) : (
              <div className="pb-32">
                <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-3xl p-10 text-center mb-10 overflow-hidden relative">
                  <div className="absolute inset-0 bg-emerald-500/5 blur-[100px]" />
                  <div className="relative z-10">
                    <span className="text-6xl mb-6 block drop-shadow-lg">🎉</span>
                    <h2 className="text-4xl font-bold text-white mb-4">12 Matches Found!</h2>
                    <p className="text-emerald-200/80 text-lg max-w-md mx-auto">
                      We found 12 high-signal affiliates ready to promote your product.
                    </p>
                  </div>
                </div>

                <div className="bg-[#0A0A0E] border border-white/10 rounded-3xl p-8">
                  <h3 className="font-bold text-white text-xl mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-violet-500 rounded-full" />
                    Activation Summary
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-gray-400">
                      <span>Base Listing Fee</span>
                      <span>$125.00</span>
                    </div>
                    {discounts.visuals && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Visuals Credit</span>
                        <span>-$15.00</span>
                      </div>
                    )}
                    {discounts.branding && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Identity Credit</span>
                        <span>-$15.00</span>
                      </div>
                    )}
                    {discounts.interview && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Interview Credit</span>
                        <span>-$15.00</span>
                      </div>
                    )}
                    <div className="h-px bg-white/10 my-4" />
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">Total Due</span>
                      <span className="text-4xl font-bold text-white tracking-tight">${currentFee}.00</span>
                    </div>
                  </div>

                  <button
                    onClick={handleActivateCampaign}
                    className="w-full btn-primary py-5 text-xl font-bold shadow-2xl shadow-violet-500/20"
                  >
                    Unlock Matches & Launch
                  </button>
                  <p className="text-center text-xs text-gray-600 mt-6 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-600" />
                    Secure Payment via Stripe
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------- STEP: AFFILIATE DASHBOARD ------------------------- */}
        {step === 'dashboard' && role === 'affiliate' && (
          <div className="fixed inset-0 z-50 bg-[#030303] flex animate-fade-in">
            {/* Sidebar */}
            <aside className="sidebar w-72 flex-shrink-0">
              <div className="flex items-center gap-3 px-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20" />
                <span className="text-xl font-bold tracking-tight text-white">Proovd</span>
              </div>

              <nav className="flex flex-col gap-1">
                <div
                  onClick={() => setAffiliateTab('requests')}
                  className={`sidebar-item ${affiliateTab === 'requests' ? 'active' : ''}`}
                >
                  <span className="text-xl">📥</span>
                  <span>Match Requests</span>
                  {affiliateTab !== 'requests' && (
                    <span className="ml-auto w-5 h-5 rounded-full bg-violet-500 text-[10px] flex items-center justify-center text-white font-bold">3</span>
                  )}
                </div>
                <div
                  onClick={() => setAffiliateTab('active')}
                  className={`sidebar-item ${affiliateTab === 'active' ? 'active' : ''}`}
                >
                  <span className="text-xl">🚀</span>
                  <span>Active Partnerships</span>
                </div>
                <div
                  onClick={() => setAffiliateTab('resources')}
                  className={`sidebar-item ${affiliateTab === 'resources' ? 'active' : ''}`}
                >
                  <span className="text-xl">📚</span>
                  <span>Resources</span>
                </div>
                <div
                  onClick={() => setAffiliateTab('settings')}
                  className={`sidebar-item ${affiliateTab === 'settings' ? 'active' : ''}`}
                >
                  <span className="text-xl">⚙️</span>
                  <span>Settings</span>
                </div>
              </nav>

              <div className="mt-auto pt-8 border-t border-white/5">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm">👤</div>
                    <div>
                      <p className="text-sm font-bold text-white leading-none mb-1">Seif S.</p>
                      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Affiliate</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsAuthenticated(false);
                      setStep('landing');
                    }}
                    className="w-full py-2 text-xs font-bold text-gray-500 hover:text-white transition-colors border border-white/5 rounded-lg hover:bg-white/5"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-[#050505] p-8 lg:p-12">
              <header className="flex items-center justify-between mb-12">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {affiliateTab === 'requests' && "Partnership Requests"}
                    {affiliateTab === 'active' && "Active Partnerships"}
                    {affiliateTab === 'resources' && "Resource Center"}
                    {affiliateTab === 'settings' && "Account Settings"}
                  </h1>
                  <p className="text-gray-400">
                    {affiliateTab === 'requests' && "Discover early-stage startups matching your audience."}
                    {affiliateTab === 'active' && "Track your campaign performance and earnings."}
                    {affiliateTab === 'resources' && "Guides and kits to help you scale your influence."}
                    {affiliateTab === 'settings' && "Manage your profile and payment preferences."}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-white/10 transition-colors">
                      🔔
                    </div>
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-[#050505] rounded-full" />
                  </div>
                </div>
              </header>

              {/* Notification Drawer */}
              {showNotifications && (
                <div className="fixed top-24 right-12 w-96 bg-[#0A0A0E] border border-white/10 rounded-3xl shadow-2xl z-[120] animate-fade-in overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <h4 className="font-bold text-white">Notifications</h4>
                    <button onClick={() => setShowNotifications(false)} className="text-gray-500 hover:text-white">✕</button>
                  </div>
                  <div className="max-h-[500px] overflow-y-auto">
                    {[
                      { icon: '💰', title: 'Commission Received', desc: 'You earned $45.00 from BioSync!', time: '2m ago', color: 'emerald' },
                      { icon: '🔥', title: 'New High Effort Pitch', desc: 'QuantumSaaS is looking for partners.', time: '1h ago', color: 'purple' },
                      { icon: '🧬', title: 'Campaign Update', desc: 'BioSync added new marketing assets.', time: '3h ago', color: 'cyan' },
                    ].map((n, i) => (
                      <div key={i} className="p-6 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors group">
                        <div className="flex gap-4">
                          <div className={`w-10 h-10 rounded-xl bg-${n.color}-500/10 flex items-center justify-center text-xl`}>
                            {n.icon}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors">{n.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{n.desc}</p>
                            <p className="text-[10px] font-mono text-gray-600 uppercase mt-2">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-white/[0.02] text-center">
                    <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}

              {/* Status Stats (Grid for Requests/Active) */}
              {(affiliateTab === 'requests' || affiliateTab === 'active') && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                  <div className="stat-card">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Active Campaigns</p>
                    <p className="text-3xl font-bold text-white">4</p>
                    <div className="mt-2 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <span>↑</span> 1 New this week
                    </div>
                  </div>
                  <div className="stat-card">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Pending Requests</p>
                    <p className="text-3xl font-bold text-white">12</p>
                    <div className="mt-2 text-[10px] font-bold text-violet-400 flex items-center gap-1">
                      <span>⚡</span> 3 High Priority
                    </div>
                  </div>
                  <div className="stat-card">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Total Earnings</p>
                    <p className="text-3xl font-bold text-white">$2,450</p>
                    <div className="mt-2 text-[10px] font-bold text-cyan-400 flex items-center gap-1">
                      <span>💎</span> $840 pending
                    </div>
                  </div>
                  <div className="stat-card">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Avg. Commission</p>
                    <p className="text-3xl font-bold text-white">22%</p>
                    <div className="mt-2 text-[10px] font-bold text-pink-400 flex items-center gap-1">
                      <span>🔥</span> Top performer
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content */}
              <div className="animate-slide-up-fade">
                {affiliateTab === 'requests' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Pitches for you</h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleRefresh}
                          disabled={isRefreshing}
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-400 hover:bg-white/10 transition-all ${isRefreshing ? 'opacity-50' : ''}`}
                        >
                          <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
                          {isRefreshing ? 'Refreshing...' : 'Refresh'}
                        </button>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-400 outline-none hover:bg-white/10 transition-colors">
                          <option>Sort by Date</option>
                          <option>Sort by Commission</option>
                          <option>Sort by Popularity</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {pitches.map(pitch => (
                        <div key={pitch.id} className="glass-card hover:border-violet-500/30 transition-all cursor-pointer group relative overflow-hidden">
                          {pitch.isHighEffort && (
                            <div className="absolute top-0 right-0 p-4">
                              <span className="badge badge-purple">High Effort Pitch</span>
                            </div>
                          )}
                          <div className="flex items-center gap-6 mb-6">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pitch.isHighEffort || pitch.is_high_effort ? 'from-violet-600 to-indigo-600' : 'from-cyan-500 to-blue-600'} flex items-center justify-center text-3xl shadow-xl transition-transform group-hover:scale-110`}>
                              {pitch.emoji || '🚀'}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-white mb-1">{pitch.name || pitch.title}</h4>
                              <p className="text-sm text-gray-400">{pitch.desc || pitch.solution || 'Fresh startup pitch incoming.'}</p>
                              <div className="flex items-center gap-4 mt-3">
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{pitch.commission || 15}% Commission</span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">•</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">${pitch.price || pitch.price_per_sale || 0} / Sale</span>
                              </div>
                            </div>
                          </div>
                          <div className="mb-6 flex flex-wrap gap-2">
                            {pitch.assets?.map(asset => (
                              <span key={asset} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                                {asset === 'video' && '🎬'}
                                {asset === 'images' && '🖼️'}
                                {asset === 'scripts' && '📜'}
                                {asset}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 italic">
                            "{pitch.problem || pitch.desc}"
                          </p>

                          {/* Detailed Materials Section */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {/* Video/Mockup Preview */}
                            <div className="relative aspect-video rounded-2xl bg-white/5 border border-white/10 overflow-hidden group/video">
                              {pitch.assets?.includes('video') ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-500/20 to-transparent">
                                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/video:scale-110 transition-transform">
                                    ▶
                                  </div>
                                  <span className="text-[10px] font-bold text-gray-400 mt-3 uppercase tracking-widest">Video Promo Available</span>
                                </div>
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-white/[0.02]">
                                  <span className="text-[10px] font-bold uppercase tracking-widest italic">No Video Provided</span>
                                </div>
                              )}
                              <div className="absolute bottom-2 left-2 flex gap-1">
                                {pitch.branding?.map(color => (
                                  <div key={color} className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                                ))}
                              </div>
                            </div>

                            {/* Q&A Snippets */}
                            <div className="space-y-3">
                              {pitch.qa?.map((item, i) => (
                                <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                  <p className="text-[9px] font-bold text-violet-400 uppercase tracking-wider mb-1">Q: {item.q}</p>
                                  <p className="text-[11px] text-gray-300 leading-tight line-clamp-2">{item.a}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAcceptPitch(pitch);
                              }}
                              className="flex-1 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-violet-600/20"
                            >
                              Accept Pitch
                            </button>
                            <button
                              onClick={() => setSelectedPitch(pitch)}
                              className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {affiliateTab === 'active' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {activePartnerships.map(camp => (
                        <div key={camp.id} className="glass-card flex flex-col md:flex-row gap-8 items-start md:items-center">
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${camp.emoji === '🧬' ? 'from-pink-500 to-violet-500' : 'from-violet-600 to-indigo-600'} flex items-center justify-center text-4xl shadow-xl shadow-pink-900/20`}>
                            {camp.emoji}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-2xl font-bold text-white">{camp.name}</h4>
                              <span className={`badge ${camp.status === 'Live' ? 'badge-emerald' : 'badge-cyan'}`}>{camp.status}</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">{camp.desc}</p>
                            <div className="flex flex-wrap gap-6">
                              <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Clicks</p>
                                <p className="text-xl font-bold text-white">{camp.clicks}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Pledges</p>
                                <p className="text-xl font-bold text-white">{camp.pledges}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Conv. Rate</p>
                                <p className="text-xl font-bold text-emerald-400">{camp.conv}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Earned</p>
                                <p className="text-xl font-bold text-cyan-400">${camp.earned}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 w-full md:w-auto">
                            <button
                              onClick={() => {
                                setPublicBackerData(camp);
                                setStep('backer_view');
                              }}
                              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-violet-600/20 text-sm whitespace-nowrap"
                            >
                              View Backer Page
                            </button>
                            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all text-sm">
                              Marketing Kit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {affiliateTab === 'resources' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="stat-card group cursor-pointer border-violet-500/20 hover:border-violet-500/50">
                      <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                        📖
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">Pitching Guide</h4>
                      <p className="text-sm text-gray-500 mb-4">Learn how to frame early-stage startups to your audience.</p>
                      <button className="text-sm font-bold text-violet-400 hover:text-violet-300">Download PDF →</button>
                    </div>
                    <div className="stat-card group cursor-pointer border-cyan-500/20 hover:border-cyan-500/50">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                        🎬
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">Video Scripts</h4>
                      <p className="text-sm text-gray-500 mb-4">15, 30, and 60-second scripts for TikTok & Reels.</p>
                      <button className="text-sm font-bold text-cyan-400 hover:text-cyan-300">View Scripts →</button>
                    </div>
                    <div className="stat-card group cursor-pointer border-emerald-500/20 hover:border-emerald-500/50">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                        🛡️
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">Risk Disclaimers</h4>
                      <p className="text-sm text-gray-500 mb-4">Mandatory legal text for your campaign promotions.</p>
                      <button className="text-sm font-bold text-emerald-400 hover:text-emerald-300">Copy to Clipboard →</button>
                    </div>
                  </div>
                )}

                {affiliateTab === 'settings' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                      <div className="stat-card p-10">
                        <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                          <span className="w-1.5 h-6 bg-violet-500 rounded-full" />
                          Profile Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                            <input type="text" defaultValue="Seif S." className="input-premium" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                            <input type="email" defaultValue="seif@example.com" className="input-premium" />
                          </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/5">
                          <button className="btn-primary py-3 px-8 text-sm">Save Profile</button>
                        </div>
                      </div>

                      <div className="stat-card p-10">
                        <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                          <span className="w-1.5 h-6 bg-cyan-500 rounded-full" />
                          Payout Settings
                        </h4>
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-2xl">💰</div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-white">Bank Transfer (SWIFT)</p>
                              <p className="text-xs text-gray-500">Last payout sent 4 days ago</p>
                            </div>
                            <button className="text-xs font-bold text-cyan-400">Edit</button>
                          </div>
                          <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-dashed border-white/20 transition-all text-sm">
                            + Add New Payout Method
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="stat-card">
                        <h5 className="font-bold text-white mb-6 uppercase text-[10px] tracking-[0.2em] text-gray-500">Notification Channels</h5>
                        <div className="space-y-4">
                          {[
                            { label: 'New Match Alerts', active: true },
                            { label: 'Commission Payouts', active: true },
                            { label: 'Founder Updates', active: false },
                            { label: 'Campaign Milestones', active: true },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="text-sm text-gray-300">{item.label}</span>
                              <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.active ? 'bg-violet-600' : 'bg-white/10'}`}>
                                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${item.active ? 'right-1' : 'left-1'}`} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </main>

            {/* Pitch Details Modal */}
            {selectedPitch && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
                <div className="bg-[#0A0A0E] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                  <button
                    onClick={() => setSelectedPitch(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    ✕
                  </button>

                  <div className="p-10">
                    <div className="flex items-center gap-6 mb-10">
                      <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center text-5xl">
                        {selectedPitch.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-3xl font-bold text-white">{selectedPitch.name}</h2>
                          {selectedPitch.isHighEffort && (
                            <span className="badge badge-purple">High Effort</span>
                          )}
                        </div>
                        <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Startup Pitch Detail</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <span className="w-1 h-3 bg-violet-500 rounded-full" />
                          The Problem
                        </h4>
                        <p className="text-lg text-gray-300 leading-relaxed italic">"{selectedPitch.problem}"</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <span className="w-1 h-3 bg-cyan-500 rounded-full" />
                          The Solution
                        </h4>
                        <p className="text-lg text-gray-300 leading-relaxed">{selectedPitch.solution}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Base Commission</p>
                          <p className="text-2xl font-bold text-emerald-400">{selectedPitch.commission}%</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Potential Reach</p>
                          <p className="text-2xl font-bold text-white">40k - 250k</p>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={() => handleAcceptPitch(selectedPitch)}
                          className="flex-1 btn-primary py-4 rounded-2xl text-lg"
                        >
                          Accept Partnership
                        </button>
                        <button
                          onClick={() => {
                            setShowDeclineModal(selectedPitch.id);
                            setSelectedPitch(null);
                          }}
                          className="flex-1 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-2xl border border-red-500/20 transition-all text-lg"
                        >
                          Decline Pitch
                        </button>
                        {selectedPitch.isHighEffort && (
                          <button
                            onClick={() => setShowBidModal(true)}
                            className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all text-lg"
                          >
                            Bid Commission
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Commission Bidding Modal */}
            {showBidModal && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-fade-in">
                <div className="bg-[#0A0A0E] border border-violet-500/30 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(124,58,237,0.2)] p-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-violet-500/10 flex items-center justify-center text-4xl mx-auto mb-6 border border-violet-500/20">
                    ⚖️
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Bid Commission</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                    This is a <span className="text-violet-400 font-bold">High Effort Pitch</span>. You can propose a higher commission rate to the founder.
                  </p>

                  <div className="mb-10">
                    <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                      <span>Proposed Rate</span>
                      <span className="text-violet-400">{bidValue}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="50"
                      value={bidValue}
                      onChange={(e) => setBidValue(e.target.value)}
                      className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-violet-500"
                    />
                    <div className="flex justify-between text-[10px] text-gray-600 mt-2 font-mono">
                      <span>30% (Standard)</span>
                      <span>50% (Max)</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setShowBidModal(false);
                        setSelectedPitch(null);
                        alert(`Bid of ${bidValue}% sent to founder!`);
                      }}
                      className="w-full btn-primary py-4 rounded-xl font-bold"
                    >
                      Send Proposal
                    </button>
                    <button
                      onClick={() => setShowBidModal(false)}
                      className="w-full py-3 text-gray-500 hover:text-white transition-colors font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Decline Pitch Modal */}
            {showDeclineModal && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-fade-in">
                <div className="bg-[#0A0A0E] border border-red-500/30 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(239,68,68,0.1)] p-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-4xl mx-auto mb-6 border border-red-500/20 text-red-500">
                    👋
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Decline Pitch</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                    Please let the founder know why you're passing on this opportunity.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      'Niche mismatch',
                      'Commission too low',
                      'Product not ready',
                      'Personal preference'
                    ].map((reason) => (
                      <button
                        key={reason}
                        onClick={() => handleDeclinePitch(showDeclineModal, reason)}
                        className="w-full py-4 px-6 text-left text-sm font-medium text-gray-400 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 rounded-2xl transition-all hover:text-white"
                      >
                        {reason}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowDeclineModal(null)}
                    className="w-full py-3 text-gray-500 hover:text-white transition-colors font-bold text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Backer Page Preview Modal */}
            {showBackerPreview && (
              <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-fade-in overflow-y-auto">
                <div className="bg-[#050505] border border-white/10 rounded-[3rem] w-full max-w-5xl my-8 relative shadow-[0_0_100px_rgba(124,58,237,0.1)]">
                  <button
                    onClick={() => setShowBackerPreview(null)}
                    className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors z-10 text-white"
                  >
                    ✕
                  </button>

                  <div className="p-12 md:p-20">
                    <div className="max-w-3xl mx-auto text-center mb-20">
                      <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center text-6xl mx-auto mb-8 shadow-2xl">
                        {showBackerPreview.emoji}
                      </div>
                      <h2 className="text-5xl font-black text-white mb-6 tracking-tight">{showBackerPreview.name}</h2>
                      <p className="text-2xl text-gray-400 font-medium leading-relaxed">
                        {showBackerPreview.tagline}
                      </p>

                      <div className="mt-8 flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-violet-500/10 border border-violet-500/20 w-fit mx-auto">
                        <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Recommended By</span>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                        <span className="text-xs font-bold text-white">Seif S.</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                      <div className="space-y-10 text-left">
                        <div>
                          <h4 className="text-[10px] font-bold text-violet-500 uppercase tracking-[0.3em] mb-4">The Mission</h4>
                          <h3 className="text-3xl font-bold text-white mb-4">Solving the Core Problem</h3>
                          <p className="text-gray-400 leading-relaxed text-lg">
                            {showBackerPreview.problem}
                          </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                          <h4 className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.3em] mb-4">Key Innovation</h4>
                          <p className="text-white text-xl font-medium leading-relaxed italic">
                            "{showBackerPreview.solution}"
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em] mb-4 text-left">Backing Tiers</h4>
                        {[
                          { name: 'Early Adopter', price: 49, perks: 'Lifetime access, Pro badge' },
                          { name: 'Founder Pack', price: 149, perks: 'All perks + Private Discord' },
                          { name: 'Angel Supporter', price: 499, perks: 'All perks + Mention in docs' },
                        ].map((tier, i) => (
                          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group cursor-pointer text-left">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-lg font-bold text-white">{tier.name}</span>
                              <span className="text-xl font-black text-emerald-400">${tier.price}</span>
                            </div>
                            <p className="text-sm text-gray-400">{tier.perks}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-12 border-t border-white/5">
                      <button className="w-full btn-primary py-6 rounded-2xl text-xl shadow-[0_20px_40px_rgba(124,58,237,0.3)]">
                        Pre-Order Now
                      </button>
                      <p className="text-center text-gray-600 text-[10px] uppercase font-bold tracking-widest mt-6">
                        Secured by Proovd Protocol • 100% Refundable if goal not met
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------- STEP: FULL-PAGE BACKER VIEW ------------------------- */}
        {step === 'backer_view' && publicBackerData && (
          <div className="animate-fade-in bg-[#030303] min-h-screen text-gray-200">
            {/* Minimal High-Tech Nav */}
            <nav className="fixed top-0 inset-x-0 h-24 flex items-center border-b border-white/5 bg-[#030303]/80 backdrop-blur-xl z-[200]">
              <div className="container px-8 flex justify-between items-center">
                <div onClick={() => setStep('landing')} className="flex items-center gap-2 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500"></div>
                  <span className="text-xl font-bold tracking-tight text-white">Proovd</span>
                </div>

                <button
                  onClick={() => {
                    if (isAuthenticated && role === 'affiliate') {
                      setStep('dashboard');
                    } else {
                      setStep('landing');
                    }
                  }}
                  className="flex items-center gap-3 py-3 px-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm"
                >
                  <span className="text-lg">←</span>
                  {(isAuthenticated && role === 'affiliate') ? 'Back to Dashboard' : 'Back to Home'}
                </button>
              </div>
            </nav>

            <div className="pt-32 pb-20">
              <div className="container max-w-5xl">
                <div className="max-w-3xl mx-auto text-center mb-20 px-8">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 flex items-center justify-center text-7xl mx-auto mb-10 shadow-2xl border border-white/10">
                    {publicBackerData.emoji}
                  </div>
                  <h2 className="text-6xl font-black text-white mb-8 tracking-tight">{publicBackerData.name}</h2>
                  <p className="text-2xl text-gray-400 font-medium leading-relaxed mb-8">
                    {publicBackerData.tagline}
                  </p>

                  <div className="flex items-center justify-center gap-4 py-4 px-8 rounded-full bg-violet-500/10 border border-violet-500/20 w-fit mx-auto">
                    <span className="text-xs font-bold text-violet-400 uppercase tracking-[0.2em]">Verified Project</span>
                    <div className="w-px h-4 bg-white/10" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Crowdfunding Proof Phase</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 px-8">
                  <div className="lg:col-span-7 space-y-16 text-left">
                    <div>
                      <h4 className="text-xs font-bold text-violet-500 uppercase tracking-[0.4em] mb-6">Introduction</h4>
                      <h3 className="text-4xl font-bold text-white mb-6">Why this exists.</h3>
                      <p className="text-gray-400 leading-relaxed text-xl">
                        {publicBackerData.problem}
                      </p>
                    </div>

                    <div className="p-12 rounded-[3rem] bg-gradient-to-br from-violet-500/10 via-transparent to-transparent border border-white/5 relative group overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
                        <span className="text-6xl">🚀</span>
                      </div>
                      <h4 className="text-xs font-bold text-cyan-500 uppercase tracking-[0.4em] mb-6">The Solution</h4>
                      <p className="text-white text-2xl font-bold leading-relaxed mb-4">
                        The Innovation Hub
                      </p>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {publicBackerData.solution}
                      </p>
                    </div>

                    <div className="space-y-8">
                      <h4 className="text-xs font-bold text-pink-500 uppercase tracking-[0.4em] mb-6">Market Potential</h4>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Target Market</p>
                          <p className="text-lg font-bold text-white">SaaS Tech</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Estimated TAM</p>
                          <p className="text-lg font-bold text-white">$4.2B</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-8">
                    <div className="sticky top-40 space-y-8">
                      <div className="p-10 rounded-[2.5rem] bg-[#0A0A0E] border border-white/10 shadow-2xl">
                        <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-[0.4em] mb-8">Backing Tiers</h4>
                        <div className="space-y-4">
                          {[
                            { name: 'Early Adopter', price: 49, perks: 'Lifetime access, Pro badge' },
                            { name: 'Founder Pack', price: 149, perks: 'All perks + Private Discord' },
                          ].map((tier, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group cursor-pointer text-left">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-bold text-white">{tier.name}</span>
                                <span className="text-xl font-black text-emerald-400">${tier.price}</span>
                              </div>
                              <p className="text-sm text-gray-400">{tier.perks}</p>
                            </div>
                          ))}
                        </div>
                        <button className="w-full btn-primary py-6 rounded-2xl text-xl mt-10 shadow-[0_20px_40px_rgba(124,58,237,0.3)]">
                          Back This Project
                        </button>
                      </div>

                      <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center">
                        <p className="text-xs text-gray-500 font-medium mb-4 uppercase tracking-widest">Payment Methods</p>
                        <div className="flex justify-center gap-6 opacity-40 grayscale">
                          <span className="text-2xl">💳</span>
                          <span className="text-2xl">🍎</span>
                          <span className="text-2xl">🪙</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

