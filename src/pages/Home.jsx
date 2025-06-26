import { Link } from "react-router-dom";
import { useState } from "react";
import whitePeacock from '../assets/white_peacock.jpg';
import sambarDeer from '../assets/sambar_deer.jpg';
import starTortoise from '../assets/star_tot.jpg';
import parakeet from '../assets/indian_kili.jpg';
import leopard from '../assets/indian_leoooo.jpg';
import cobra from '../assets/indian_cobraaaaa.jpg';
import conservation from '../assets/Conservation Work.jpg';
import education from '../assets/Educational Tour.jpg';

export default function Home() {
  const [activeTab, setActiveTab] = useState('about');
  const [darkMode, setDarkMode] = useState(false);

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
      description: "Comprehensive veterinary care tracking and medical history management for all species with real-time monitoring."
    },
    {
      icon: "📊",
      title: "Conservation Analytics",
      description: "Advanced data insights for breeding programs, population management, and predictive conservation strategies."
    },
    {
      icon: "🤝",
      title: "Team Collaboration",
      description: "Seamless communication tools for keepers, veterinarians, researchers, and educational staff coordination."
    },
    {
      icon: "📚",
      title: "Educational Platform",
      description: "Interactive learning modules for visitor engagement, virtual tours, and conservation awareness programs."
    },
    {
      icon: "🔬",
      title: "Research Management",
      description: "Comprehensive research project tracking, data collection, and scientific publication management system."
    },
    {
      icon: "🌍",
      title: "Global Network",
      description: "Connected to international zoo consortiums and wildlife conservation databases for knowledge sharing."
    }
  ];

  const timeline = [
    { year: "1981", title: "Foundation", desc: "Established as Kurumbapatti Zoological Park in Salem's Eastern Ghats covering 69 hectares" },
    { year: "1985", title: "First Breeding Success", desc: "Successful breeding of indigenous star tortoises marking our conservation milestone" },
    { year: "1990s", title: "Infrastructure Expansion", desc: "Major habitat development with specialized enclosures for different species groups" },
    { year: "2000s", title: "Educational Programs", desc: "Launch of comprehensive visitor education and school outreach programs" },
    { year: "2010s", title: "Research Partnerships", desc: "Collaboration with Tamil Nadu Agricultural University and international conservation bodies" },
    { year: "2020", title: "Digital Transformation", desc: "Implementation of modern wildlife management systems and digital record keeping" },
    { year: "2025", title: "ZooKeeper Hub", desc: "Launch of comprehensive digital platform for next-generation zoo management" }
  ];

  const animals = [
    { name: "White Peacocks", category: "Signature Species", status: "Thriving", count: "12+", habitat: "Native Forest" },
    { name: "Sambar Deer", category: "Mammals", status: "Stable", count: "25+", habitat: "Grassland" },
    { name: "Star Tortoises", category: "Reptiles", status: "Breeding Program", count: "18+", habitat: "Dry Scrub" },
    { name: "Alexandrine Parakeets", category: "Avian", status: "Conservation", count: "30+", habitat: "Mixed Forest" },
    { name: "Indian Leopard", category: "Big Cats", status: "Protected", count: "3", habitat: "Dense Forest" },
    { name: "King Cobra", category: "Reptiles", status: "Research", count: "5+", habitat: "Forest Edge" }
  ];

  const researchProjects = [
    {
      title: "Star Tortoise Conservation Genetics",
      lead: "Dr. Priya Krishnan",
      duration: "2023-2026",
      funding: "₹15 Lakhs",
      description: "Genetic diversity analysis for captive breeding program optimization"
    },
    {
      title: "Avian Behavior in Captivity",
      lead: "Prof. Raman Sethu",
      duration: "2024-2025",
      funding: "₹8 Lakhs",
      description: "Studying stress indicators and welfare improvements for native bird species"
    },
    {
      title: "Habitat Enrichment Impact Study",
      lead: "Dr. Meera Anand",
      duration: "2024-2027",
      funding: "₹12 Lakhs",
      description: "Measuring behavioral changes through advanced enclosure design implementations"
    }
  ];

  const partnerships = [
    { name: "Tamil Nadu Forest Department", role: "Primary Conservation Partner", since: "1981" },
    { name: "Tamil Nadu Agricultural University", role: "Research Collaboration", since: "2010" },
    { name: "Central Zoo Authority", role: "Regulatory & Standards", since: "1992" },
    { name: "Wildlife Institute of India", role: "Training & Capacity Building", since: "2015" },
    { name: "Zoo Outreach Organisation", role: "Education & Outreach", since: "2005" }
  ];

  const tabContent = {
    about: (
      <div className="space-y-8">
        <div className="prose prose-lg max-w-none">
          <p className={`text-xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Kurumbapatti Zoological Park stands as Tamil Nadu's premier wildlife conservation facility, 
            nestled in the scenic foothills of the Shevaroyan Hills. Since 1981, we have been dedicated 
            to wildlife preservation, education, and research, serving as a beacon for conservation in South India.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
            <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Our Mission</h4>
            <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
              To conserve endangered species, educate the public about wildlife, and contribute to 
              global conservation efforts through research, breeding programs, and habitat preservation.
            </p>
          </div>
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
            <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Conservation Focus</h4>
            <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
              Specializing in native Tamil Nadu species with successful breeding programs for 
              star tortoises, indigenous birds, and regional wildlife preservation in the Eastern Ghats ecosystem.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className={`text-center p-6 rounded-xl ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'}`}>
            <div className="text-3xl mb-2">🎯</div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Ex-situ Conservation</h4>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Protecting species outside their natural habitat</p>
          </div>
          <div className={`text-center p-6 rounded-xl ${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-50'}`}>
            <div className="text-3xl mb-2">🔬</div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-cyan-400' : 'text-cyan-700'}`}>Scientific Research</h4>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Contributing to global conservation knowledge</p>
          </div>
          <div className={`text-center p-6 rounded-xl ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'}`}>
            <div className="text-3xl mb-2">🎓</div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Public Education</h4>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Inspiring conservation awareness</p>
          </div>
        </div>
      </div>
    ),
    timeline: (
      <div className="space-y-6">
        {timeline.map((item, i) => (
          <div key={i} className={`flex gap-6 p-6 rounded-xl transition-colors ${
            darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-50 hover:bg-slate-100'
          }`}>
            <div className="flex-shrink-0 w-20 text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{item.year}</div>
            </div>
            <div>
              <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
              <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
    animals: (
      <div className="grid md:grid-cols-2 gap-6">
        {animals.map((animal, i) => (
          <div key={i} className={`border rounded-xl p-6 hover:shadow-lg transition-shadow ${
            darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{animal.name}</h4>
                <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>{animal.category}</p>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{animal.habitat}</p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{animal.count}</div>
                <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Population</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${animal.status === 'Thriving' ? 'bg-green-400' : 
                animal.status === 'Stable' ? 'bg-blue-400' : 
                animal.status === 'Protected' ? 'bg-purple-400' : 'bg-amber-400'}`}></div>
              <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{animal.status}</span>
            </div>
          </div>
        ))}
      </div>
    ),
    research: (
      <div className="space-y-6">
        {researchProjects.map((project, i) => (
          <div key={i} className={`p-6 rounded-xl border ${
            darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{project.title}</h4>
                <p className={`mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{project.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Lead: {project.lead}</span>
                  <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Duration: {project.duration}</span>
                </div>
              </div>
              <div className={`text-right ml-4 px-3 py-1 rounded-lg ${
                darkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
              }`}>
                <div className="font-semibold">{project.funding}</div>
                <div className="text-xs">Funding</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${
        darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-emerald-500' : 'bg-emerald-600'
              }`}>
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>ZooKeeper Hub</h1>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Wildlife Management Platform</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className={`transition-colors ${
                darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}>About</a>
              <a href="#platform" className={`transition-colors ${
                darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}>Platform</a>
              <a href="#conservation" className={`transition-colors ${
                darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}>Conservation</a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <Link 
                to="/login" 
                className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                  darkMode 
                    ? 'bg-emerald-500 text-white hover:bg-emerald-400' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Staff Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative py-20 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-emerald-900/20 to-cyan-900/20' 
          : 'bg-gradient-to-br from-emerald-50 to-cyan-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  darkMode 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    darkMode ? 'bg-emerald-400' : 'bg-emerald-500'
                  }`}></span>
                  Est. 1981 • Salem, Tamil Nadu
                </div>
                <h1 className={`text-5xl lg:text-6xl font-bold leading-tight ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Advanced Wildlife
                  <span className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}> Management</span>
                </h1>
                <p className={`text-xl leading-relaxed ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Empowering conservation professionals with cutting-edge digital tools 
                  for animal care, research, and education at Kurumbapatti Zoological Park.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/demo" 
                  className={`px-8 py-4 rounded-xl font-semibold transition-colors text-center ${
                    darkMode 
                      ? 'bg-emerald-500 text-white hover:bg-emerald-400' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  Explore Platform
                </Link>
                <button className={`px-8 py-4 rounded-xl font-semibold transition-colors border ${
                  darkMode 
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-800' 
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}>
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{stat.value}</div>
                    <div className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-900'}`}>{stat.label}</div>
                    <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{stat.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className={`aspect-square rounded-3xl flex items-center justify-center ${
                darkMode 
                  ? 'bg-gradient-to-br from-emerald-900/30 to-cyan-900/30' 
                  : 'bg-gradient-to-br from-emerald-100 to-cyan-100'
              }`}>
                <div className={`w-4/5 h-4/5 rounded-2xl shadow-2xl flex items-center justify-center ${
                  darkMode ? 'bg-slate-800' : 'bg-white'
                }`}>
                  <div className="text-center space-y-4">
                    <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${
                      darkMode ? 'bg-emerald-500' : 'bg-emerald-600'
                    }`}>
                      <span className="text-3xl text-white">🦚</span>
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Kurumbapatti</h3>
                      <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Zoological Park</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl shadow-lg flex items-center justify-center ${
                darkMode ? 'bg-slate-800' : 'bg-white'
              }`}>
                <span className="text-3xl">🌿</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section id="platform" className={`py-20 transition-colors duration-300 ${
        darkMode ? 'bg-slate-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Platform Features</h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Comprehensive digital solutions designed specifically for modern zoo management and wildlife conservation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className={`rounded-2xl p-8 transition-all duration-300 border ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 hover:shadow-xl hover:border-emerald-500/30' 
                  : 'bg-white border-slate-200 hover:shadow-xl hover:border-emerald-200'
              }`}>
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-6 ${
                  darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
                }`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Tabs */}
      <section id="about" className={`py-20 transition-colors duration-300 ${
        darkMode ? 'bg-slate-800' : 'bg-slate-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>About Kurumbapatti</h2>
            <p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Four decades of wildlife conservation in the Eastern Ghats
            </p>
          </div>

          <div className={`rounded-2xl shadow-sm border overflow-hidden ${
            darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <div className={`border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <nav className="flex">
                {[
                  { id: 'about', label: 'Overview' },
                  { id: 'timeline', label: 'History' },
                  { id: 'animals', label: 'Wildlife' },
                  { id: 'research', label: 'Research' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? darkMode 
                          ? 'text-emerald-400 border-b-2 border-emerald-400'
                          : 'text-emerald-600 border-b-2 border-emerald-600'
                        : darkMode
                          ? 'text-slate-400 hover:text-slate-300'
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

          {/* Gallery Section */}
<section className={`py-20 transition-colors duration-300 ${
  darkMode ? 'bg-slate-900' : 'bg-white'
}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center space-y-4 mb-16">
      <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Wildlife Gallery</h2>
      <p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
        Discover the incredible diversity of species in our care
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[
               { src: whitePeacock, title: "White Peacock" },
               { src: sambarDeer, title: "Sambar Deer" },
               { src: starTortoise, title: "Star Tortoise" },
               { src: parakeet, title: "Alexandrine Parakeet" },
               { src: leopard, title: "Indian Leopard" },
               { src: cobra, title: "King Cobra" },
                { src: conservation, title: "Conservation Work" },
               { src: education, title: "Educational Tour" },
      ].map((image, i) => (
        <div key={i} className={`group relative aspect-square overflow-hidden rounded-lg cursor-pointer ${
          i < 2 ? 'md:col-span-2 md:row-span-2' : ''
        }`}>
          <img 
            src={image.src} 
            alt={image.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <h3 className="text-white font-semibold text-lg">{image.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Partnerships Section */}
      <section className={`py-20 transition-colors duration-300 ${
        darkMode ? 'bg-slate-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Strategic Partnerships</h2>
            <p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Collaborative conservation efforts with leading institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerships.map((partner, i) => (
              <div key={i} className={`p-6 rounded-xl border transition-colors ${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{partner.name}</h4>
                <p className={`text-sm mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{partner.role}</p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Since {partner.since}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conservation Impact */}
      <section id="conservation" className={`py-20 text-white transition-colors duration-300 ${
        darkMode ? 'bg-emerald-900' : 'bg-emerald-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Conservation Impact</h2>
                <p className="text-xl text-emerald-100">
                  Our digital platform enables data-driven conservation decisions and measurable outcomes 
                  across multiple research initiatives and breeding programs.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-emerald-800/50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-emerald-300">15+</div>
                  <div className="text-emerald-100">Successful breeding cycles annually</div>
                </div>
                <div className="bg-cyan-800/50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-cyan-300">25+</div>
                  <div className="text-emerald-100">Research papers published</div>
                </div>
                <div className="bg-emerald-800/50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-emerald-300">50,000+</div>
                  <div className="text-emerald-100">Students educated annually</div>
                </div>
                <div className="bg-cyan-800/50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-cyan-300">8</div>
                  <div className="text-emerald-100">Species reintroduction programs</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Research Excellence</h3>
                <p className="text-emerald-100 mb-6">
                  Our research initiatives focus on behavioral ecology, conservation genetics, and 
                  habitat optimization, contributing valuable insights to global conservation efforts.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
                    <span className="text-emerald-100">Genetic diversity studies for breeding programs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                    <span className="text-emerald-100">Behavioral enrichment effectiveness research</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
                    <span className="text-emerald-100">Native species habitat restoration studies</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Educational Outreach</h3>
                <p className="text-emerald-100 mb-6">
                  Transforming conservation awareness through innovative digital education programs 
                  and immersive wildlife experiences for visitors of all ages.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-300">12</div>
                    <div className="text-sm text-emerald-200">School Programs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-300">6</div>
                    <div className="text-sm text-emerald-200">Virtual Tours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 transition-colors duration-300 ${
        darkMode ? 'bg-slate-800' : 'bg-slate-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Ready to Transform Wildlife Management?
              </h2>
              <p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Join the digital conservation revolution with ZooKeeper Hub's comprehensive platform.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className={`px-8 py-4 rounded-xl font-semibold transition-colors ${
                  darkMode 
                    ? 'bg-emerald-500 text-white hover:bg-emerald-400' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Start Free Trial
              </Link>
              <Link 
                to="/contact" 
                className={`px-8 py-4 rounded-xl font-semibold transition-colors border ${
                  darkMode 
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Schedule Demo
              </Link>
            </div>
            
            <div className={`grid md:grid-cols-3 gap-8 pt-12 ${
              darkMode ? 'border-t border-slate-700' : 'border-t border-slate-200'
            }`}>
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
                }`}>
                  <span className="text-2xl">🚀</span>
                </div>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Quick Setup</h4>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Deploy in days, not months with our guided implementation process
                </p>
              </div>
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  darkMode ? 'bg-cyan-500/20' : 'bg-cyan-100'
                }`}>
                  <span className="text-2xl">🔒</span>
                </div>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Secure & Compliant</h4>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Enterprise-grade security meeting international zoo management standards
                </p>
              </div>
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
                }`}>
                  <span className="text-2xl">🌐</span>
                </div>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Global Network</h4>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Connect with conservation facilities worldwide for knowledge sharing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 transition-colors duration-300 ${
        darkMode ? 'bg-slate-900' : 'bg-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">Z</span>
                </div>
                <h3 className="text-white font-bold text-lg">ZooKeeper Hub</h3>
              </div>
              <p className="text-slate-400 text-sm">
                Advanced wildlife management platform for modern conservation facilities.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                  <span className="text-slate-400">📧</span>
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                  <span className="text-slate-400">🐦</span>
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                  <span className="text-slate-400">💼</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Platform</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors block">Features</a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors block">Pricing</a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors block">Integrations</a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors block">API Documentation</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Conservation</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors block">Research Programs</a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors block">Breeding Management</a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors block">Educational Resources</a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors block">Species Database</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors block">Help Center</a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors block">Training</a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors block">Community</a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors block">Contact Us</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 ZooKeeper Hub. All rights reserved. | Kurumbapatti Zoological Park, Salem, Tamil Nadu
            </p>
            <div className="flex gap-6 text-sm mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    );
}