import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState('about');

  const stats = [
    { value: "69", label: "Hectares", sublabel: "Protected Area" },
    { value: "44+", label: "Years", sublabel: "Conservation Legacy" },
    { value: "100+", label: "Species", sublabel: "Under Care" },
    { value: "50K+", label: "Visitors", sublabel: "Annual Education" }
  ];

  const features = [
    {
      icon: "🏥",
      title: "Digital Health Records",
      description: "Comprehensive veterinary care tracking and medical history management for all species."
    },
    {
      icon: "📊",
      title: "Conservation Analytics",
      description: "Advanced data insights for breeding programs and population management strategies."
    },
    {
      icon: "🤝",
      title: "Team Collaboration",
      description: "Seamless communication tools for keepers, veterinarians, and research staff."
    },
    {
      icon: "📚",
      title: "Educational Platform",
      description: "Interactive learning modules for visitor engagement and conservation awareness."
    }
  ];

  const timeline = [
    { year: "1981", title: "Foundation", desc: "Established as Kurumbapatti Zoological Park in Salem's Eastern Ghats" },
    { year: "1990s", title: "Expansion", desc: "Infrastructure development and habitat enhancement programs" },
    { year: "2010s", title: "Modernization", desc: "Partnership with leading conservation organizations" },
    { year: "2025", title: "Digital Era", desc: "Launch of ZooKeeper Hub management platform" }
  ];

  const animals = [
    { name: "White Peacocks", category: "Signature Species", status: "Thriving", count: "12+" },
    { name: "Sambar Deer", category: "Mammals", status: "Stable", count: "25+" },
    { name: "Star Tortoises", category: "Reptiles", status: "Breeding Program", count: "18+" },
    { name: "Alexandrine Parakeets", category: "Avian", status: "Conservation", count: "30+" }
  ];

  const tabContent = {
    about: (
      <div className="space-y-8">
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-xl text-slate-600 leading-relaxed">
            Kurumbapatti Zoological Park stands as Tamil Nadu's premier wildlife conservation facility, 
            nestled in the scenic foothills of the Shevaroyan Hills. Since 1981, we have been dedicated 
            to wildlife preservation, education, and research.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-xl">
            <h4 className="font-semibold text-slate-900 mb-3">Our Mission</h4>
            <p className="text-slate-600">
              To conserve endangered species, educate the public about wildlife, and contribute to 
              global conservation efforts through research and breeding programs.
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl">
            <h4 className="font-semibold text-slate-900 mb-3">Conservation Focus</h4>
            <p className="text-slate-600">
              Specializing in native Tamil Nadu species with successful breeding programs for 
              star tortoises, indigenous birds, and regional wildlife preservation.
            </p>
          </div>
        </div>
      </div>
    ),
    timeline: (
      <div className="space-y-6">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-6 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <div className="flex-shrink-0 w-20 text-center">
              <div className="text-2xl font-bold text-emerald-600">{item.year}</div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
    animals: (
      <div className="grid md:grid-cols-2 gap-6">
        {animals.map((animal, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-slate-900">{animal.name}</h4>
                <p className="text-slate-500">{animal.category}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">{animal.count}</div>
                <div className="text-sm text-slate-500">Population</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${animal.status === 'Thriving' ? 'bg-green-400' : 
                animal.status === 'Stable' ? 'bg-blue-400' : 'bg-amber-400'}`}></div>
              <span className="text-sm text-slate-600">{animal.status}</span>
            </div>
          </div>
        ))}
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">ZooKeeper Hub</h1>
                <p className="text-xs text-slate-500">Wildlife Management Platform</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">About</a>
              <a href="#platform" className="text-slate-600 hover:text-slate-900 transition-colors">Platform</a>
              <a href="#conservation" className="text-slate-600 hover:text-slate-900 transition-colors">Conservation</a>
              <Link 
                to="/login" 
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Staff Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Est. 1981 • Salem, Tamil Nadu
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Advanced Wildlife
                  <span className="text-emerald-600"> Management</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Empowering conservation professionals with cutting-edge digital tools 
                  for animal care, research, and education at Kurumbapatti Zoological Park.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/demo" 
                  className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors text-center"
                >
                  Explore Platform
                </Link>
                <button className="border border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm font-medium text-slate-900">{stat.label}</div>
                    <div className="text-xs text-slate-500">{stat.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center">
                <div className="w-4/5 h-4/5 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-emerald-600 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-3xl text-white">🦚</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Kurumbapatti</h3>
                      <p className="text-slate-600">Zoological Park</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <span className="text-3xl">🌿</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section id="platform" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Platform Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive digital solutions designed specifically for modern zoo management and wildlife conservation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Tabs */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-900">About Kurumbapatti</h2>
            <p className="text-xl text-slate-600">
              Four decades of wildlife conservation in the Eastern Ghats
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="border-b border-slate-200">
              <nav className="flex">
                {[
                  { id: 'about', label: 'Overview' },
                  { id: 'timeline', label: 'History' },
                  { id: 'animals', label: 'Wildlife' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-emerald-600 border-b-2 border-emerald-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="p-8">
              {tabContent[activeTab]}
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Impact */}
      <section id="conservation" className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Conservation Impact</h2>
                <p className="text-xl text-emerald-100">
                  Our digital platform enables data-driven conservation decisions and measurable outcomes.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-emerald-800/50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-emerald-300">15+</div>
                  <div className="text-emerald-100">Successful breeding cycles annually</div>
                </div>
                <div className="bg-emerald-800/50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-emerald-300">12</div>
                  <div className="text-emerald-100">Research papers published</div>
                </div>
                <div className="bg-emerald-800/50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-emerald-300">5,000+</div>
                  <div className="text-emerald-100">Students educated annually</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Research & Breeding</h3>
                <p className="text-emerald-100 mb-6">
                  Active collaboration with Tamil Nadu Agricultural University for wildlife behavior studies 
                  and captive breeding programs for endangered species.
                </p>
                <div className="flex items-center gap-2 text-emerald-300">
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">Z</span>
                </div>
                <div>
                  <h3 className="font-bold">ZooKeeper Hub</h3>
                  <p className="text-slate-400 text-sm">Wildlife Management</p>
                </div>
              </div>
              <p className="text-slate-400">
                Advancing wildlife conservation through innovative digital solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Location</h4>
              <div className="space-y-2 text-slate-400">
                <p>Kurumbapatti Village</p>
                <p>Salem District, Tamil Nadu</p>
                <p>📞 0427-2912197</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Visiting Hours</h4>
              <div className="space-y-2 text-slate-400">
                <p>Daily: 9:00 AM - 5:30 PM</p>
                <p>Adults: ₹10 | Children: ₹5</p>
                <p>12 km from Salem Bus Stand</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Partnership</h4>
              <div className="space-y-2 text-slate-400">
                <p>Tamil Nadu Forest Department</p>
                <p>Salem District Administration</p>
                <p>Conservation Organizations</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>© 2025 ZooKeeper Hub. Honoring 44+ years of Eastern Ghats biodiversity preservation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}