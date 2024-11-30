import React, { useRef, useState, useEffect } from "react";
import {
  X,
  User,
  Gift,
  Crown,
  ChevronRight,
  TrendingUp,
  Users,
  Target,
  Zap,
  Send,
  Laptop,
  ArrowLeft,
} from "lucide-react";
import Button from "@mui/material/Button";
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import { HelpCircle, Volume2, VolumeX } from "lucide-react";

const Modal = ({ game, onClose }) => {
  const [modalState, setModalState] = useState({
    title: "",
    download: "",
  });

  useEffect(() => {
    if (game) {
      setModalState({
        title: game.title || "",
        download: game.download || "",
      });
    } else {
      setModalState({
        title: "",
        download: "",
      });
    }
  }, [game]);

  const handleClose = () => {
    setModalState({
      title: "",
      download: "",
    }); // Reset the state
    onClose && onClose();
  };

  if (!game) return null;

  return (
    <div className="fixed inset-0 bg-gray-1000/100 backdrop-blur-md flex items-center justify-center z-70">
      <div className="bg-gray-1000 text-gray-50 rounded-lg shadow-xl p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">{modalState.title}</h2>
        <textarea
          value={modalState.download}
          onChange={(e) =>
            setModalState((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
          className="w-full p-2 bg-gray-1000 text-gray-90 rounded"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-violet-800 hover:bg-violet-800 text-gray-50 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [animateStats, setAnimateStats] = useState(false);
  const [hoveredGame, setHoveredGame] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [serverActive, setServerActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [resultColors, setResultColors] = useState([]);
  const colors = ["red", "green", "purple"];
  const [numbers, setNumbers] = useState("");
  const [randomText, setRandomText] = useState("");
  const [randomNumber, setRandomNumber] = useState(null); // Store the random number
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [showPopup, setShowPopup] = useState(true);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/LoginPage");
  };

  // const getRandomColors = () => {
  //   const randomCount = Math.random() > 0.5 ? 1 : 2; // Randomly select 1 or 2 colors
  //   const shuffledColors = colors.sort(() => 0.5 - Math.random()); // Shuffle the array
  //   return shuffledColors.slice(0, randomCount); // Return the selected colors
  // };

  // const randomBigSmall = () => {
  //   const randomNumber = Math.floor(Math.random() * 10); // Generate random number between 0 and 9
  //   const randomValue = randomNumber <= 4 ? "SMALL" : "BIG"; // Determine BIG or SMALL
  //   setRandomText(randomValue); // Update the random text state
  //   setRandomNumber(randomNumber); // Update the random number state
  // };

  const handleClear = () => {
    setNumbers("");
    randomText("");
    randomNumber("");
  };

  const getRandomColorsAndValues = () => {
    const randomCount = Math.random() > 0.5 ? 1 : 2;
    let selectedColors;

    if (randomCount === 1) {
      // Select one random color
      selectedColors = [colors[Math.floor(Math.random() * colors.length)]];
    } else {
      // Ensure only the allowed two-color combinations
      const allowedCombinations = [
        ["purple", "green"],
        ["purple", "red"],
      ];
      selectedColors =
        allowedCombinations[
          Math.floor(Math.random() * allowedCombinations.length)
        ];
    }

    const randomNumber = Math.floor(Math.random() * 10);
    const randomValue = randomNumber <= 4 ? "SMALL" : "BIG";

    return {
      colors: selectedColors,
      text: randomValue,
      number: randomNumber,
    };
  };
  const validateInput = (input) => {
    return /^\d{3}$/.test(input);
  };

  const handleSubmit = () => {
    if (!validateInput(numbers)) {
      alert("Please valid numbers.");
      return;
    }
    setIsLoading(true); // Start loading

    setTimeout(() => {
      const { colors, text, number } = getRandomColorsAndValues(); // Use the merged function
      setResultColors(colors);
      setRandomText(text);
      setRandomNumber(number);
      setIsLoading(false); // Stop loading
    }, 2000); // Simulate delay for demonstration
  };
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDownloadApp = () => {
    setIsPlaying(true);
    audioRef.current.play();
    if (selectedGame?.download) {
      window.open(selectedGame.download, "_blank");
    }
  };

  const handleHomePageNavigation = () => {
    navigate("/HomePage/ExpandedGameCard");
  };

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
      title: "55Club",
      download: "https://55666.in/#/register?invitationCode=188475762718",
      players: "1200",
      prediction: "88%",
      nextUpdate: "2h",
      winStreak: 5,
      lastPredictions: sampleChartData,
    },
    {
      id: 2,
      title: "Okwin",
      download:
        "https://www.okwin.plus//#/register?invitationCode=677225404085",
      players: "1500",
      prediction: "91%",
      nextUpdate: "4h",
      winStreak: 6,
      lastPredictions: sampleChartData,
    },
    {
      id: 3,
      title: "Tiranga",
      download:
        "https://tirangagame.top/#/register?invitationCode=1278817357545",
      players: "950",
      prediction: "86%",
      nextUpdate: "1h",
      winStreak: 3,
      lastPredictions: sampleChartData,
    },
    {
      id: 4,
      title: "Big Mumbai",
      download: "https://bigmumbai7.com/#/register?invitationCode=286255270778",
      players: "1800",
      prediction: "94%",
      nextUpdate: "5h",
      winStreak: 8,
      lastPredictions: sampleChartData,
    },
    {
      id: 5,
      title: "Big Daddy",
      download:
        "https://www.bdg4455.com//#/register?invitationCode=578113016536",
      players: "2000",
      prediction: "97%",
      nextUpdate: "3h",
      winStreak: 10,
      lastPredictions: sampleChartData,
    },
    {
      id: 6,
      title: "Daman",
      download: "https://indian8.in/#/register?invitationCode=EQqCR1955554",
      players: "800",
      prediction: "80%",
      nextUpdate: "6h",
      winStreak: 2,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 50 + Math.random() * 30,
        })),
      trend: "downward",
    },
    {
      id: 7,
      title: "Diuwib",
      download: "https://diuapk.com/#/register?invitationCode=861455559105",
      players: "1000",
      prediction: "89%",
      nextUpdate: "4h",
      winStreak: 4,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 65 + Math.random() * 25,
        })),
      trend: "steady",
    },
    {
      id: 8,
      title: "Goa Games",
      download: "https://goagames.icu/#/register?invitationCode=726316058319",
      players: "1250",
      prediction: "92%",
      nextUpdate: "2h",
      winStreak: 7,
      lastPredictions: sampleChartData,
    },
    {
      id: 9,
      title: "Sikkim",
      download: "https://sikkim6.com/#/register?invitationCode=212763366802",
      players: "700",
      prediction: "84%",
      nextUpdate: "5h",
      winStreak: 3,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 60 + Math.random() * 30,
        })),
      trend: "downward",
    },
    {
      id: 10,
      title: "51game",
      download: "https://51game6.in/#/register?invitationCode=273123511310",
      players: "1100",
      prediction: "90%",
      nextUpdate: "3h",
      winStreak: 6,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 55 + Math.random() * 35,
        })),
      trend: "steady",
    },
    {
      id: 11,
      title: "Dmwin",
      download: "https://55666.in/#/register?invitationCode=188475762718",
      players: "1050",
      prediction: "87%",
      nextUpdate: "4h",
      winStreak: 5,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 65 + Math.random() * 25,
        })),
      trend: "upward",
    },
    {
      id: 12,
      title: "Rang",
      download: "https://ranggame.in/?code=T5RHNQ",
      players: "950",
      prediction: "85%",
      nextUpdate: "2h",
      winStreak: 4,
      lastPredictions: sampleChartData,
    },
    {
      id: 13,
      title: "82lottery",
      download: "https://82lottery9.com/#/register?invitationCode=751354229228",
      players: "1300",
      prediction: "93%",
      nextUpdate: "3h",
      winStreak: 7,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 70 + Math.random() * 25,
        })),
      trend: "steady",
    },
    {
      id: 14,
      title: "66lottery",
      download: "https://55666.in/#/register?invitationCode=188475762718",
      players: "800",
      prediction: "83%",
      nextUpdate: "6h",
      winStreak: 3,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 60 + Math.random() * 30,
        })),
      trend: "upward",
    },
    {
      id: 15,
      title: "Cock Fight",
      download: "https://cockfightbet.xyz/#HomeIndex?inviteCode=14G191",
      players: "1400",
      prediction: "95%",
      nextUpdate: "2h",
      winStreak: 8,
      lastPredictions: sampleChartData,
    },
    {
      id: 16,
      title: "TC Lottery",
      download: "https://tcvvip2.com/#/register?invitationCode=5562111628472",
      players: "900",
      prediction: "82%",
      nextUpdate: "5h",
      winStreak: 2,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 50 + Math.random() * 40,
        })),
      trend: "downward",
    },
    {
      id: 17,
      title: "BIG DADDY MOD",
      download:
        "https://www.bdg4455.com//#/register?invitationCode=578113016536",
      players: "2.3M",
      prediction: "85%",
      nextUpdate: "2h",
      winStreak: 5,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 50 + Math.random() * 40,
        })),
      trend: "upward",
    },
    {
      id: 18,
      title: "TIRANGA MOD",
      download:
        "https://tirangagame.top/#/register?invitationCode=1278817357545",
      players: "1.8M",
      prediction: "78%",
      nextUpdate: "1h",
      winStreak: 3,
      lastPredictions: sampleChartData,
    },
    {
      id: 19,
      title: "91 CLUB",
      download: "https://91clubaa.com/#/register?invitationCode=2424614751485",
      players: "1.5M",
      prediction: "92%",
      nextUpdate: "3h",
      winStreak: 7,
      lastPredictions: Array(20)
        .fill()
        .map((_, i) => ({
          value: 40 + Math.random() * 50,
        })),
      trend: "downward",
    },
    {
      id: 20,
      title: "In999",
      download: "https://in999.game/#/register?invitationCode=631263545072",
      players: "1000",
      prediction: "93%",
      nextUpdate: "3h",
      winStreak: 7,
      lastPredictions: sampleChartData,
    },
  ];

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

      <nav className="bg-gray-900/90 backdrop-blur-xl shadow-xl border-b border-violet-600/20 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          {/* Left Section: Menu & Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-violet-500/15 rounded-lg transition-all duration-300 ease-in-out hover:rotate-180"
            ></button>

            <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-violet-500 hover:scale-105 transition-transform cursor-default">
              <span className="text-emerald-400 font-normal animate-pulse">
                &lt;
                {/* Back Button */}
                <button
                  onClick={() => navigate(-1)} // Navigate back to the previous page
                  className="p-2 hover:bg-violet-500/15 rounded-lg transition-all duration-300 ease-in-out"
                >
                  🔙 Back
                </button>
              </span>
              Lucifer mod
              <span className="text-emerald-400 font-normal animate-pulse">
                /&gt;
              </span>
            </h1>
          </div>
          <a
            href="https://telegram.me/luciffer_mod7"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg
  bg-gray-800/50 hover:bg-gray-700/50
  border border-violet-500/20 hover:border-violet-500/50
  text-violet-400 hover:text-violet-300
  transition-all duration-200"
          >
            <button className="inline-flex items-center">
              <Send className="w-4 h-4 mr-1" />
              Join Telegram Channel
            </button>
          </a>
          {/* Right Section: Logout Button */}
          <div>
            <button
              onClick={handleLogout}
              className="py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl font-medium text-white shadow-lg shadow-violet-500/20 border border-violet-500/20 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

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
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => {
              setModalOpen(false);
              setNumbers("");
              setRandomNumber("");
              setResultColors("");
            }}
          />
          {/* Modal Container */}
          <div
            className="relative w-full max-w-2xl h-[80vh] m-4 p-8 rounded-3xl shadow-2xl overflow-y-auto 
      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
      border border-gray-700/50
      animate-in zoom-in-95 duration-300"
          >
            <button
              onClick={handleLogout}
              className="py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl font-medium text-white shadow-lg shadow-violet-500/20 border border-violet-500/20 transition-all duration-300"
            >
              Logout
            </button>

            {/* Pop-up Message */}
            {showPopup && (
  <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-xl text-center space-y-6 w-96">
      <p className="text-lg font-semibold">
        Important Notice: To enjoy the mod, please create a new account by clicking the 'Register' button. If you try to use the mod on an existing account, it may not work. So, click on 'Register' to create a new account and get started. Thank you!
      </p>
      <div className="flex justify-between space-x-4">
        {/* Register Button */}
        <button
          onClick={handleDownloadApp}
          className="w-1/2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-lg font-medium text-white shadow-lg transition-all duration-300"
        >
          Register
          <audio
            ref={audioRef}
            src="/wws.mp3"
            onEnded={() => setIsPlaying(false)}
          />
        </button>
        {/* Continue Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="w-1/2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-lg font-medium text-white shadow-lg transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
)}



            {/* Game Title */}
            <h2
              className="text-4xl font-bold text-center mt-16
        bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 
        bg-clip-text text-transparent mb-10"
            >
              {selectedGame?.title}
            </h2>

            {/* Rest of the Modal Content */}
            <div className="flex flex-col items-center space-y-10">
              {/* Server Status */}
              <div
                className="flex items-center space-x-3 
          bg-gray-800/40 backdrop-blur-sm
          px-5 py-2.5 rounded-full
          border border-gray-700/50 shadow-lg"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full 
              ${
                serverActive
                  ? "bg-green-500 animate-pulse shadow-lg shadow-green-500/50"
                  : "bg-red-500 shadow-lg shadow-red-500/50"
              }`}
                />
                <span className="text-sm font-medium text-gray-200">
                  Server Status: {serverActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Input and Submit Section */}
              <div className="w-full max-w-md space-y-6">
                <h3 className="text-lg font-semibold text-gray-200 text-center">
                  Enter up to 3 Numbers
                </h3>
                <input
                  type="text"
                  placeholder="Enter period"
                  value={numbers}
                  onChange={(e) => setNumbers(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-800/30 border rounded-xl text-lg"
                />
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl"
                >
                  Submit Period
                </button>

                <div className="w-full max-w-2xl mx-auto mt-8">
                  {/* Main Result Container */}
                  <div className="bg-gray-800/50 rounded-xl p-8 w-full max-w-md mx-auto">
                    {isLoading ? (
                      <div className="flex flex-col items-center py-8">
                        <div className="w-10 h-10 border-3 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                        <p className="mt-4 text-gray-400 animate-pulse">
                          Processing...
                        </p>
                      </div>
                    ) : (
                      resultColors.length > 0 && (
                        <div className="space-y-8">
                          {/* Centered Color Circles Container */}
                          <div className="flex justify-center items-center">
                            <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
                              {resultColors.map((color, index) => (
                                <div
                                  key={index}
                                  className="w-20 h-20 rounded-full transition-transform duration-200 
                    hover:scale-110 cursor-pointer shadow-lg
                    flex items-center justify-center"
                                  style={{
                                    backgroundColor: color,
                                    boxShadow: `0 0 20px ${color}40`,
                                  }}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Result Section */}
                          <div className="w-full mt-8">
                            {/* Divider with enhanced styling */}
                            <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700/50" />
                              </div>
                              <div className="relative flex justify-center">
                                <span className="bg-gray-800/50 px-4 text-sm text-gray-500 uppercase tracking-wider">
                                  Result
                                </span>
                              </div>
                            </div>

                            {/* Result Text Container */}
                            <div className="mt-6 text-center">
                              <div
                                className="inline-flex items-center justify-center gap-3 px-6 py-3 
                bg-gray-800/30 rounded-full border border-gray-700/30"
                              >
                                <span
                                  className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-violet-500 
                    bg-clip-text text-transparent"
                                >
                                  {randomText}
                                </span>
                                <span className="text-3xl font-bold text-white">
                                  {randomNumber}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600">
            <div className="relative w-full overflow-hidden bg-red-600">
              <div className="overflow-hidden bg-red-600"></div>
            </div>{" "}
          </div>{" "}
        </div>
      )}

      <Button
        onClick={handleHomePageNavigation}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Go to COLOR BIG SMALL
      </Button>
    </div>
  );
};

export default DashboardLayout;
