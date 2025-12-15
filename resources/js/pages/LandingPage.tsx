import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
    return (
        <div className="bg-background-main font-display text-text-main antialiased selection:bg-black selection:text-white">
            <Head title="AI Notes - Smart Meeting Transcription" />
            <nav className="fixed top-0 w-full z-50 bg-background-main/80 backdrop-blur-md border-b border-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-black text-white p-2 rounded-xl shadow-lg shadow-black/20">
                                <span className="material-symbols-outlined text-2xl">graphic_eq</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight">AI Notes</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-text-sub hover:text-text-main font-medium transition-colors">Features</a>
                            <a href="#how-it-works" className="text-text-sub hover:text-text-main font-medium transition-colors">How it works</a>
                            <a href="#pricing" className="text-text-sub hover:text-text-main font-medium transition-colors">Pricing</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="hidden md:block text-text-main font-semibold hover:text-accent-custom transition-colors">Log in</Link>
                            <Link href="/register" className="bg-black text-white px-5 py-2.5 rounded-full font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-black/20 transform hover:-translate-y-0.5">Get Started</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-8 animate-fade-in-up">
                            <span className="flex h-2 w-2 rounded-full bg-accent-custom"></span>
                            <span className="text-sm font-medium text-text-sub">New: Export to Notion & Slack</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-text-main tracking-tight mb-8 leading-tight">
                            Turn your meetings into <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-custom to-purple-600">actionable insights</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-text-sub mb-10 max-w-2xl mx-auto leading-relaxed">
                            Automatically transcribe, summarize, and extract action items from your audio recordings. Never miss a detail again.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-black/20 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                                <span>Start for free</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                            <a href="#" className="w-full sm:w-auto px-8 py-4 bg-white text-text-main border border-border-subtle rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-soft flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">play_circle</span>
                                <span>View Demo</span>
                            </a>
                        </div>
                    </div>

                    <div className="relative mx-auto max-w-5xl mt-8">
                        <div className="relative rounded-3xl bg-surface-card p-2 shadow-2xl border border-white/50">
                            <div className="rounded-2xl overflow-hidden bg-background-main border border-border-subtle/50 aspect-[16/10] relative flex">
                                <div className="w-64 bg-surface-card border-r border-border-subtle/50 hidden md:flex flex-col p-4 gap-4">
                                    <div className="h-8 w-32 bg-gray-100 rounded-lg animate-pulse"></div>
                                    <div className="space-y-2 mt-4">
                                        <div className="h-10 w-full bg-black/5 rounded-lg"></div>
                                        <div className="h-10 w-full bg-transparent rounded-lg"></div>
                                        <div className="h-10 w-full bg-transparent rounded-lg"></div>
                                    </div>
                                </div>
                                <div className="flex-1 p-6 space-y-6 bg-white/50">
                                    <div className="flex justify-between items-center">
                                        <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
                                        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mt-8">
                                        <div className="h-40 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
                                            <div className="h-8 w-8 bg-orange-100 rounded-lg"></div>
                                            <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                                            <div className="h-12 w-full bg-gray-50 rounded"></div>
                                        </div>
                                        <div className="h-40 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
                                            <div className="h-8 w-8 bg-purple-100 rounded-lg"></div>
                                            <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                                            <div className="h-12 w-full bg-gray-50 rounded"></div>
                                        </div>
                                        <div className="h-40 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
                                            <div className="h-8 w-8 bg-blue-100 rounded-lg"></div>
                                            <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                                            <div className="h-12 w-full bg-gray-50 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                        <div className="absolute -top-20 -left-20 w-72 h-72 bg-accent-custom/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-24 bg-surface-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-base font-bold text-accent-custom tracking-wide uppercase mb-2">Capabilities</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-text-main mb-4">Everything you need to capture the conversation</h3>
                        <p className="text-lg text-text-sub">From simple recording to complex summarization, our AI handles the heavy lifting so you can focus on the discussion.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="group p-8 rounded-3xl bg-background-main hover:bg-white border border-transparent hover:border-border-subtle transition-all duration-300 hover:shadow-soft">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-orange-500 text-3xl">mic</span>
                            </div>
                            <h4 className="text-xl font-bold text-text-main mb-3">Crystal Clear Audio</h4>
                            <p className="text-text-sub leading-relaxed">Advanced noise cancellation and voice isolation ensure every word is captured perfectly, even in noisy environments.</p>
                        </div>
                        <div className="group p-8 rounded-3xl bg-background-main hover:bg-white border border-transparent hover:border-border-subtle transition-all duration-300 hover:shadow-soft">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-purple-500 text-3xl">auto_awesome</span>
                            </div>
                            <h4 className="text-xl font-bold text-text-main mb-3">AI Summaries</h4>
                            <p className="text-text-sub leading-relaxed">Get concise summaries, key takeaways, and bullet points instantly after your meeting ends.</p>
                        </div>
                        <div className="group p-8 rounded-3xl bg-background-main hover:bg-white border border-transparent hover:border-border-subtle transition-all duration-300 hover:shadow-soft">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-blue-500 text-3xl">check_circle</span>
                            </div>
                            <h4 className="text-xl font-bold text-text-main mb-3">Action Items</h4>
                            <p className="text-text-sub leading-relaxed">Automatically detect and assign action items to team members so nothing falls through the cracks.</p>
                        </div>
                        <div className="group p-8 rounded-3xl bg-background-main hover:bg-white border border-transparent hover:border-border-subtle transition-all duration-300 hover:shadow-soft">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-emerald-500 text-3xl">ios_share</span>
                            </div>
                            <h4 className="text-xl font-bold text-text-main mb-3">Easy Export</h4>
                            <p className="text-text-sub leading-relaxed">Export your notes to Notion, Slack, Google Docs, or PDF with a single click.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="py-24 bg-background-main relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main mb-6">Workflow that adapts to you</h2>
                            <p className="text-lg text-text-sub mb-10">Seamlessly integrate AI Notes into your daily routine. Whether you're uploading a file or recording live, the process is effortless.</p>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-black/20">1</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-text-main mb-2">Record or Upload</h4>
                                        <p className="text-text-sub">Start a live recording in the browser or upload existing audio/video files (mp3, wav, mp4).</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-card text-text-main border border-border-subtle flex items-center justify-center font-bold text-lg shadow-sm">2</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-text-main mb-2">Transcribe & Process</h4>
                                        <p className="text-text-sub">Our AI engine processes the audio in seconds, identifying speakers and formatting the text.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-card text-text-main border border-border-subtle flex items-center justify-center font-bold text-lg shadow-sm">3</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-text-main mb-2">Review & Share</h4>
                                        <p className="text-text-sub">Edit the transcript if needed, review the summary, and share with your team instantly.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative z-10 bg-surface-card rounded-3xl p-8 shadow-2xl border border-white/50 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <span className="material-symbols-outlined">description</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-main">Project Kickoff</h4>
                                            <p className="text-xs text-text-sub">Today at 10:00 AM</p>
                                        </div>
                                    </div>
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Completed</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-background-main rounded-xl">
                                        <h5 className="text-sm font-bold text-text-main mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-base">summarize</span> Summary
                                        </h5>
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-gray-200 rounded"></div>
                                            <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
                                            <div className="h-2 w-4/6 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-background-main rounded-xl">
                                        <h5 className="text-sm font-bold text-text-main mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-base">check_box</span> Action Items
                                        </h5>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                                                <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                                                <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-4 -right-4 w-full h-full bg-gray-200 rounded-3xl -z-10 transform -rotate-2"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-surface-card">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-black rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-black/20">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-gray-800 rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gray-800 rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to upgrade your meetings?</h2>
                            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">Join thousands of teams who are saving time and capturing better notes with AI.</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg transform hover:-translate-y-1">
                                    Get Started for Free
                                </Link>
                                <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-700 text-white rounded-full font-bold text-lg hover:bg-gray-900 transition-all">
                                    Contact Sales
                                </button>
                            </div>
                            <p className="mt-8 text-sm text-gray-500">No credit card required. Cancel anytime.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-surface-card border-t border-border-subtle py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-black text-white p-1.5 rounded-lg">
                                    <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
                                </div>
                                <span className="font-bold text-lg">AI Notes</span>
                            </div>
                            <p className="text-text-sub text-sm leading-relaxed">Making meetings productive again with the power of artificial intelligence.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-text-main mb-4">Product</h4>
                            <ul className="space-y-3 text-sm text-text-sub">
                                <li><a href="#" className="hover:text-black transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Integrations</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Changelog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-text-main mb-4">Company</h4>
                            <ul className="space-y-3 text-sm text-text-sub">
                                <li><a href="#" className="hover:text-black transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-text-main mb-4">Legal</h4>
                            <ul className="space-y-3 text-sm text-text-sub">
                                <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Security</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-text-sub">© 2023 AI Notes Inc. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="text-text-sub hover:text-black transition-colors">
                                <span className="material-symbols-outlined">public</span>
                            </a>
                            <a href="#" className="text-text-sub hover:text-black transition-colors">
                                <span className="material-symbols-outlined">mail</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
