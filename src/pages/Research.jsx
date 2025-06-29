//src/pages/Research.jsx
import { useState } from "react";
import ResearchPage from "./ResearchPage";

export default function Research() {
  const [tab, setTab] = useState("animals");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-teal-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
              <svg className="w-10 h-10 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              ZooKeeper Hub
              <span className="block text-2xl font-normal text-emerald-200 mt-2">Research Dashboard</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Advanced research data management platform with comprehensive logging tools for animal studies and medical research
            </p>
          </div>

          {/* Glassmorphism Tab Navigation */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 mb-8 p-3 max-w-4xl mx-auto">
            <div className="flex space-x-3">
              <button
                onClick={() => setTab("animals")}
                className={`
                  flex-1 px-8 py-5 rounded-2xl font-semibold text-sm uppercase tracking-wider
                  transition-all duration-500 ease-out transform hover:scale-[1.02]
                  ${tab === "animals" 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/30 border border-emerald-400/30" 
                    : "text-white/80 hover:text-white hover:bg-white/10 border border-transparent"
                  }
                `}
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {tab === "animals" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-ping"></div>
                    )}
                  </div>
                  <span>Animal & Feeding Logs</span>
                </div>
              </button>
              
              <button
                onClick={() => setTab("medical")}
                className={`
                  flex-1 px-8 py-5 rounded-2xl font-semibold text-sm uppercase tracking-wider
                  transition-all duration-500 ease-out transform hover:scale-[1.02]
                  ${tab === "medical" 
                    ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-xl shadow-cyan-500/30 border border-cyan-400/30" 
                    : "text-white/80 hover:text-white hover:bg-white/10 border border-transparent"
                  }
                `}
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    {tab === "medical" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-300 rounded-full animate-ping"></div>
                    )}
                  </div>
                  <span>Medical Research</span>
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Tab Content Container */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Dynamic Tab Indicator */}
            <div className="px-8 py-6 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <div className={`
                  w-4 h-4 rounded-full animate-pulse shadow-lg
                  ${tab === "animals" ? "bg-emerald-400 shadow-emerald-400/50" : "bg-cyan-400 shadow-cyan-400/50"}
                `}></div>
                <h2 className="text-2xl font-bold text-white">
                  {tab === "animals" ? "Animal & Feeding Research" : "Medical Research"}
                </h2>
                <div className="ml-auto">
                  <span className={`
                    inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm
                    ${tab === "animals" 
                      ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/30" 
                      : "bg-amber-500/20 text-amber-200 border-amber-400/30"
                    }
                  `}>
                    <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${tab === "animals" ? "bg-emerald-400" : "bg-amber-400"}`}></div>
                    {tab === "animals" ? "Active Research" : "Coming Soon"}
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Content Area */}
            <div className="p-8">
              {tab === "animals" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Research Data Management</h3>
                      <p className="text-white/70 text-lg">Track animals, feeding schedules, and behavioral observations with real-time updates</p>
                    </div>
                    <div className="flex items-center space-x-3 bg-emerald-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-emerald-400/30">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                      <span className="text-emerald-200 font-medium">Live Data</span>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <ResearchPage />
                  </div>
                </div>
              )}
              
              {tab === "medical" && (
                <div className="text-center py-16">
                  <div className="mx-auto w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 border border-cyan-400/30 animate-pulse">
                    <svg className="w-16 h-16 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Medical Research Suite</h3>
                  <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                    Advanced medical research tracking and analysis tools are currently in development. 
                    This comprehensive suite will include patient data management, treatment protocols, and clinical trial tracking.
                  </p>
                  <div className="space-y-6">
                    <div className="inline-flex items-center px-6 py-3 bg-amber-500/20 backdrop-blur-sm text-amber-200 rounded-full text-sm font-semibold border border-amber-400/30">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Feature in Development
                    </div>
                    <div className="flex justify-center space-x-6 mt-10">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="w-12 h-12 bg-emerald-400/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-emerald-400/30">
                          <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-white">Patient Records</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="w-12 h-12 bg-teal-400/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-teal-400/30">
                          <svg className="w-6 h-6 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-white">Analytics</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="w-12 h-12 bg-cyan-400/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
                          <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-white">Security</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Glassmorphism Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">Active Research</p>
                  <p className="text-4xl font-bold text-white mb-2">1</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <p className="text-sm text-emerald-300 font-medium">Animal Studies</p>
                  </div>
                </div>
                <div className="w-16 h-16 bg-emerald-400/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-emerald-400/30 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">Total Categories</p>
                  <p className="text-4xl font-bold text-white mb-2">2</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                    <p className="text-sm text-teal-300 font-medium">Animal & Medical</p>
                  </div>
                </div>
                <div className="w-16 h-16 bg-teal-400/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-teal-400/30 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">Last Updated</p>
                  <p className="text-4xl font-bold text-white mb-2">Today</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <p className="text-sm text-cyan-300 font-medium">Real-time sync</p>
                  </div>
                </div>
                <div className="w-16 h-16 bg-cyan-400/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}