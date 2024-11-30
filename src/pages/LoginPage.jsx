import React, { useState, useEffect } from "react";
import {
  X,
  ChevronRight,
  TrendingUp,
  Users,
  Target,
  Zap,
  ArrowLeft,
  Send,
  HelpCircle,
  Info,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from "recharts";

const Modal = ({ game, onClose }) => {
  const [modalState, setModalState] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (game) {
      setModalState({
        title: game.title || "",
        description: game.description || "",
      });
    } else {
      setModalState({
        title: "",
        description: "",
      });
    }
  }, [game]);

  const navigate = useNavigate();

  const handleClose = () => {
    setModalState({
      title: "",
      description: "",
    });
    onClose && onClose();
  };

  if (!game) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-gray-800 text-gray-50 rounded-lg shadow-xl p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">{modalState.title}</h2>
        <textarea
          value={modalState.description}
          onChange={(e) =>
            setModalState((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
          className="w-full p-2 bg-gray-700 text-gray-50 rounded"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-violet-500 hover:bg-violet-400 text-gray-50 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
const DashboardLayout = () => {
  const [notifications, setNotifications] = useState([]);
  const [animateStats, setAnimateStats] = useState(false);
  const [hoveredGame, setHoveredGame] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'vip', 'support', 'about', or 'login'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    {
      id: 1,
      title: "Total Predictions",
      value: "1,234",
      icon: Target,
      trend: "+12.5%",
      detail: "152 predictions today",
    },
    {
      id: 2,
      title: "Accuracy",
      value: "86%",
      icon: Zap,
      trend: "+5.2%",
      detail: "Up from 81% last week",
    },
    {
      id: 3,
      title: "Active Users",
      value: "20.2K",
      icon: Users,
      trend: "+8.1%",
      detail: "2.3K new today",
    },
  ];

  const sampleChartData = [
    { name: "Mon", value: 65 },
    { name: "Tue", value: 78 },
    { name: "Wed", value: 82 },
    { name: "Thu", value: 75 },
    { name: "Fri", value: 85 },
  ];

  const games = [
    {
      id: 1,
      title: "82lottery",
      players: "1300",
      prediction: "93%",
      nextUpdate: "3h",
      winStreak: 7,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 50 + Math.random() * 40,
        })),
      trend: "upward",
    },
    {
      id: 2,
      title: "TC Lottery",
      players: "900",
      prediction: "82%",
      nextUpdate: "5h",
      winStreak: 2,
      lastPredictions: sampleChartData,
    },
    {
      id: 3,
      title: "Tiranga",
      players: "950",
      prediction: "86%",
      nextUpdate: "1h",
      winStreak: 3,
      lastPredictions: sampleChartData,
    },
    {
      id: 4,
      title: "Diuwib",
      players: "1000",
      prediction: "89%",
      nextUpdate: "4h",
      winStreak: 4,
      lastPredictions: sampleChartData,
    },
    {
      id: 5,
      title: "Big Daddy",
      players: "2000",
      prediction: "97%",
      nextUpdate: "3h",
      winStreak: 10,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 50 + Math.random() * 40,
        })),
      trend: "upward",
    },
    {
      id: 6,
      title: "Daman",
      players: "800",
      prediction: "80%",
      nextUpdate: "6h",
      winStreak: 2,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 50 + Math.random() * 40,
        })),
      trend: "upward",
    },
    {
      id: 7,
      title: "Big Mumbai",
      players: "1800",
      prediction: "94%",
      nextUpdate: "5h",
      winStreak: 8,
      lastPredictions: sampleChartData,
    },
    {
      id: 8,
      title: "Goa Games",
      players: "1250",
      prediction: "92%",
      nextUpdate: "2h",
      winStreak: 7,
      lastPredictions: sampleChartData,
    },
    {
      id: 9,
      title: "Sikkim",
      players: "700",
      prediction: "84%",
      nextUpdate: "5h",
      winStreak: 3,
      lastPredictions: sampleChartData,
    },
    {
      id: 10,
      title: "51game",
      players: "1100",
      prediction: "90%",
      nextUpdate: "3h",
      winStreak: 6,
      lastPredictions: sampleChartData,
    },
    {
      id: 11,
      title: "Dmwin",
      players: "1050",
      prediction: "87%",
      nextUpdate: "4h",
      winStreak: 5,
      lastPredictions: sampleChartData,
    },
    {
      id: 12,
      title: "Rang",
      players: "950",
      prediction: "85%",
      nextUpdate: "2h",
      winStreak: 4,
      lastPredictions: sampleChartData,
    },
    {
      id: 13,
      title: "55Club",
      players: "1200",
      prediction: "88%",
      nextUpdate: "2h",
      winStreak: 5,
      lastPredictions: sampleChartData,
    },
    {
      id: 14,
      title: "66lottery",
      players: "800",
      prediction: "83%",
      nextUpdate: "6h",
      winStreak: 3,
      lastPredictions: sampleChartData,
    },
    {
      id: 15,
      title: "Cock Fight",
      players: "1400",
      prediction: "95%",
      nextUpdate: "2h",
      winStreak: 8,
      lastPredictions: sampleChartData,
    },
    {
      id: 16,
      title: "Okwin",
      players: "1500",
      prediction: "91%",
      nextUpdate: "4h",
      winStreak: 6,
      lastPredictions: sampleChartData,
    },

    {
      id: 17,
      title: "BIG DADDY MOD",
      players: "2.3M",
      prediction: "85%",
      nextUpdate: "2h",
      winStreak: 5,
      lastPredictions: sampleChartData,
    },
    {
      id: 18,
      title: "TIRANGA MOD",
      players: "1.8M",
      prediction: "78%",
      nextUpdate: "1h",
      winStreak: 3,
      lastPredictions: sampleChartData,
    },
    {
      id: 19,
      title: "91 CLUB",
      players: "1.5M",
      prediction: "92%",
      nextUpdate: "3h",
      winStreak: 7,
      lastPredictions: sampleChartData,
    },
    {
      id: 20,
      title: "In999",
      players: "1000",
      prediction: "93%",
      nextUpdate: "3h",
      winStreak: 7,
      lastPredictions: sampleChartData,
    },
  ];

  // Mock user credentials
  const mockUser = [
    { email: "user1@vip.com", password: "password123" },
    { email: "user2@vip.com", password: "securePass456" },
    { email: "user3@vip.com", password: "welcome789" },
    { email: "user4@vip.com", password: "letMeIn321" },
    { email: "user5@vip.com", password: "mySecret567" },
    { email: "user6@vip.com", password: "hunter123" },
    { email: "user7@vip.com", password: "passcode999" },
    { email: "user8@vip.com", password: "safeKey888" },
    { email: "user9@vip.com", password: "login007" },
    { email: "user10@vip.com", password: "doorKey678" },
    { email: "user11@vip.com", password: "access2023" },
    { email: "user12@vip.com", password: "vaultLock234" },
    { email: "user13@vip.com", password: "strongPass202" },
    { email: "user14@vip.com", password: "alpha12345" },
    { email: "user15@vip.com", password: "omega98765" },
    { email: "user16@vip.com", password: "keyToDoor42" },
    { email: "user17@vip.com", password: "enterHere88" },
    { email: "user18@vip.com", password: "goldenPass77" },
    { email: "user19@vip.com", password: "openSesame22" },
    { email: "user20@vip.com", password: "hiddenDoor33" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = mockUser.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      navigate("/LoginPage/homepage");
    } else {
      setError("Invalid email or password.");
    }
  };
  const firstNames = [
    "Alex",
    "Sam",
    "Jordan",
    "Riley",
    "Morgan",
    "Casey",
    "Taylor",
    "Quinn",
    "Ash",
    "Sky",
  ];
  const lastNames = [
    "X",
    "Shadow",
    "Phantom",
    "Ghost",
    "Striker",
    "Ninja",
    "Stealth",
    "Cyber",
    "Elite",
    "Zero",
  ];

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const getRandomName = () => {
    const useAnonymous = Math.random() > 0.5;
    if (useAnonymous) {
      return "Anonymous" + Math.floor(Math.random() * 1000);
    }
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]}${
      lastNames[Math.floor(Math.random() * lastNames.length)]
    }`;
  };

  const getRandomAmount = () => Math.floor(Math.random() * 9000 + 1000);

  useEffect(() => {
    setAnimateStats(true);

    const generateNotification = () => {
      const types = [
        { type: "win", color: "text-green-500", icon: "🎯" },
        { type: "vip", color: "text-purple-500", icon: "👑" },
        { type: "join", color: "text-blue-500", icon: "🎮" },
      ];

      const type = types[Math.floor(Math.random() * types.length)];
      const name = getRandomName();
      const amount = getRandomAmount();

      let message = "";
      switch (type.type) {
        case "win":
          message = `won ₹${amount}`;
          break;
        case "vip":
          message = "joined VIP club";
          break;
        case "join":
          message = "started playing";
          break;
        default:
          break;
      }

      return {
        id: Date.now() + Math.random(),
        name,
        message,
        color: type.color,
        icon: type.icon,
      };
    };

    const interval = setInterval(() => {
      setNotifications((prev) => {
        const newNotif = generateNotification();
        const updated = [newNotif, ...prev].slice(0, 5);
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-50">
      {isMobileView && showSearch && (
        <div className="fixed inset-0 bg-gray-900/95 z-50 p-4">
          <div className="flex items-center gap-2">
            <button onClick={toggleSearch}>
              <ArrowLeft className="text-purple-400" />
            </button>
            <input
              autoFocus
              type="text"
              className="w-full bg-gray-800 border border-purple-500/30 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search games..."
            />
          </div>
        </div>
      )}

      <>
        {/* Navigation Bar */}
        <nav className="bg-gray-900/90 backdrop-blur-xl shadow-xl border-b border-violet-600/20 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-violet-500 hover:scale-105 transition-transform cursor-default">
                <span className="text-emerald-400 font-normal animate-pulse">
                  &lt;
                </span>
                Lucifer Mod
                <span className="text-emerald-400 font-normal animate-pulse">
                  /&gt;
                </span>
              </h1>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-violet-400 hover:text-violet-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation Items */}
            <div
              className={`flex items-center gap-3 ${
                isMobileMenuOpen
                  ? "flex-col absolute top-16 right-0 bg-gray-800 w-full px-4 py-2"
                  : "hidden sm:flex"
              }`}
            >
              {/* Support Button */}
              <button
                onClick={() => setActiveModal("support")}
                className="px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-violet-500/20 hover:border-violet-500/50 text-violet-400 hover:text-violet-300 transition-all duration-200"
              >
                <HelpCircle size={18} />
                <span>Support</span>
              </button>

              {/* About Button */}
              <button
                onClick={() => setActiveModal("about")}
                className="px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-violet-500/20 hover:border-violet-500/50 text-violet-400 hover:text-violet-300 transition-all duration-200"
              >
                <Info size={18} />
                <span>About</span>
              </button>

              {/* Telegram Channel Button */}
              <a
                href="https://telegram.me/luciffer_mod7"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-violet-500/20 hover:border-violet-500/50 text-violet-400 hover:text-violet-300 transition-all duration-200"
              >
                <button className="inline-flex items-center">
                  <Send className="w-4 h-4 mr-1" />
                  Join Telegram Channel
                </button>
              </a>

              {/* Login Button */}
              <button
                onClick={() => setActiveModal("login")}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-violet-500/20 border border-violet-500/20 transition-all duration-300"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            </div>
          </div>
        </nav>{" "}
        {/* Modal */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setActiveModal(null)}
            />

            <div
              className="relative w-full max-w-lg m-4 p-8 rounded-3xl shadow-2xl 
            bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
            border border-gray-700/50
            animate-in zoom-in-95 duration-300"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full 
                bg-gray-800/80 hover:bg-gray-700/80
                border border-gray-700/50 hover:border-violet-500/50
                transition-all duration-200"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>

              {/* Modal Content */}
              <div>
                {activeModal === "login" && (
                  <div className="space-y-6">
                    <h2
                      className="text-2xl font-bold text-center bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 
            bg-clip-text text-transparent"
                    >
                      Login to Lucifer mod
                    </h2>
                    <form className="space-y-4" onSubmit={handleLogin}>
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 
                  bg-gray-800/30 backdrop-blur-sm
                  border border-gray-700/50 
                  rounded-xl
                  text-gray-200
                  placeholder:text-gray-500
                  focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
                  transition-all duration-200"
                        />
                      </div>
                      <div>
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 
                  bg-gray-800/30 backdrop-blur-sm
                  border border-gray-700/50 
                  rounded-xl
                  text-gray-200
                  placeholder:text-gray-500
                  focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
                  transition-all duration-200"
                        />
                      </div>
                      {error && (
                        <p className="text-red-500 text-sm text-center">
                          {error}
                        </p>
                      )}
                      <button
                        type="submit"
                        className="w-full py-3 px-4 
                bg-gradient-to-r from-violet-600 to-purple-600 
                hover:from-violet-500 hover:to-purple-500
                rounded-xl font-medium text-white
                shadow-lg shadow-violet-500/20
                border border-violet-500/20
                transition-all duration-300"
                      >
                        Login
                      </button>
                      <div className="text-center">
                        <a
                          href="#"
                          className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            setModalOpen(true);
                          }}
                        >
                          Not a member? Join VIP now
                        </a>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {activeModal === "support" && (
                <div className="space-y-6">
                  <h2
                    className="text-2xl font-bold text-center bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 
                  bg-clip-text text-transparent"
                  >
                    24/7 Support
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4">
                      <a
                        href="https://t.me/Luciffer712"
                        className="flex items-center gap-2 px-6 py-3 
                      bg-violet-600 hover:bg-violet-500 
                      rounded-xl text-white font-medium
                      transition-all duration-200"
                      >
                        <Send size={20} />
                        Telegram Support
                      </a>
                    </div>
                    <p className="text-gray-400 text-center text-sm">
                      Average response time: 5 minutes
                    </p>
                  </div>
                </div>
              )}

              {activeModal === "about" && (
                <div className="space-y-6">
                  <h2
                    className="text-2xl font-bold text-center bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 
                  bg-clip-text text-transparent"
                  >
                    About Lucifer mod
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Lucifer mod is your premier platform for accessing premium
                      gaming predictions and analysis.
                    </p>
                    <ul className="space-y-2">
                      <li>• Access to 15+ Premium Apps</li>
                      <li>• 24/7 Customer Support</li>
                      <li>• Regular Updates</li>
                      <li>• Secure Payment Methods</li>
                    </ul>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setModalOpen(true);
                      }}
                      type="JOIN VIP"
                      className="w-full py-3 px-4 
                      bg-gradient-to-r from-violet-600 to-purple-600 
                      hover:from-violet-500 hover:to-purple-500
                      rounded-xl font-medium text-white
                      shadow-lg shadow-violet-500/20
                      border border-violet-500/20
                      transition-all duration-300"
                    >
                      JOIN VIP MEMBERSHIP
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>

      {/* Live Activity Feed with enhanced animations */}
      <div className="fixed right-6 top-20 w-72 z-40 space-y-3">
        {notifications.map((notif, index) => (
          <div
            key={notif.id}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
            className="bg-gray-900/90 backdrop-blur-xl border border-violet-600/30 rounded-xl p-4 shadow-xl animate-slide-left hover:border-violet-500/50 hover:translate-x-1 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl animate-bounce">{notif.icon}</span>
              <div>
                <span className="font-semibold text-sm text-violet-300">
                  {notif.name}
                </span>
                <span className="text-sm ml-1 text-gray-200">
                  {notif.message}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content with animations */}
      <main className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
              className={`bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-xl border border-violet-600/20 p-6 hover:border-violet-500/40 hover:transform hover:scale-105 transition-all duration-300 ${
                animateStats ? "animate-fade-in-up" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-violet-500">
                    {stat.value}
                  </h3>
                </div>
                <div className="bg-violet-500/20 p-3 rounded-xl group-hover:rotate-12 transition-transform">
                  <stat.icon className="h-6 w-6 text-violet-400" />
                </div>
              </div>
              <p className="text-sm text-emerald-400 mt-2 flex items-center gap-1 font-medium">
                <TrendingUp size={16} className="animate-pulse" />
                {stat.trend} vs last week
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <div
              key={game.id}
              onClick={() => {
                setSelectedGame(game);
                setModalOpen(true);
              }}
              className={`bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-xl border border-violet-600/20 p-6 hover:border-violet-500/40 transition-all duration-300 ${
                animateStats ? "animate-fade-in-up" : ""
              }`}
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-violet-500 group-hover:from-violet-200 group-hover:to-violet-400">
                    {game.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p className="text-sm font-medium text-gray-300">
                      {game.players} active
                    </p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30 hover:scale-105 transition-transform">
                  {game.prediction} Win Rate
                </span>
              </div>

              <div className="h-16 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={game.lastPredictions}>
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip
                      content={({ payload }) =>
                        payload?.length ? (
                          <div className="bg-gray-900/95 backdrop-blur-xl border border-violet-500/30 rounded-lg p-2 text-xs font-medium shadow-xl">
                            {`Value: ${payload[0].value.toFixed(1)}%`}
                          </div>
                        ) : null
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <div className="text-sm font-medium text-gray-300">
                    Next update in {game.nextUpdate}
                  </div>
                  <div className="text-sm font-medium text-violet-400 mt-1">
                    {game.winStreak} win streak
                  </div>
                </div>
                <button className="flex items-center gap-1 text-violet-400 hover:text-violet-300 px-3 py-1 rounded-lg hover:bg-violet-500/15 transition-all duration-300 font-medium">
                  View Details
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setModalOpen(false)}
            />

            {/* Modal Container */}
            <div
              className="relative w-full max-w-lg m-4 p-8 rounded-3xl shadow-2xl 
          bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
          border border-gray-700/50
          animate-in zoom-in-95 duration-300"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full 
              bg-gray-800/80 hover:bg-gray-700/80
              border border-gray-700/50 hover:border-violet-500/50
              transition-all duration-200"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center space-y-6 text-center">
                {/* Title */}
                <h2
                  className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 
              bg-clip-text text-transparent"
                >
                  Join VIP Subscription
                </h2>

                {/* Benefits */}
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-white">
                    Unlimited Benefits
                  </p>
                  <p className="text-lg text-violet-400">
                    Access to 15+ Premium Apps
                  </p>
                  <p className="text-2xl font-bold text-white">₹1,499 Only</p>
                </div>
                {/* QR Code Placeholder */}
                <div className="bg-white p-4 rounded-xl">
                  <img
                    src="/QRCODE.jpg" // Correct path for the image in the public folder
                    alt="Payment QR Code"
                    className="w-48 h-48"
                  />
                </div>

                {/* Instructions */}
                <div className="bg-gray-800/50 p-4 rounded-xl text-gray-300 text-sm">
                  <p>After payment, either:</p>
                  <ul className="mt-2 space-y-2">
                    <li>
                      1. Fill the Google Form:{" "}
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSf9Tx3_rDIahRFE5zzvfPMsWlWTpfmQDg9vhdtOmFg4dd8Mwg/viewform?usp=sf_link"
                        className="text-violet-400 hover:text-violet-300"
                      >
                        Form Link
                      </a>
                    </li>
                    <li>
                      2. Or message us on Telegram:
                      <a
                        href="https://telegram.me/Luciffer712"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center text-violet-400 hover:text-violet-300"
                      >
                        <button className="inline-flex items-center">
                          <Send className="w-4 h-4 mr-1" />
                          Open Telegram Link
                        </button>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf9Tx3_rDIahRFE5zzvfPMsWlWTpfmQDg9vhdtOmFg4dd8Mwg/viewform?usp=sf_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 
                hover:from-violet-500 hover:to-purple-500
                rounded-xl font-medium text-lg text-white
                shadow-lg shadow-violet-500/20
                border border-violet-500/20
                transition-all duration-300"
                >
                  Fill Google Form
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardLayout;
