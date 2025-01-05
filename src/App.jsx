// src/App.jsx
import React, { useState } from "react";
import {
  Calendar,
  CheckSquare,
  Book,
  Shield,
  Home,
  Menu,
  X,
} from "lucide-react";

// レイアウトコンポーネント
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

// ページコンポーネント
import { TimelinePage } from "./components/timeline/TimelinePage";
import { CompatibilityChecklist } from "./components/checklist/CompatibilityChecklist";
import { DiaryPage } from "./pages/DiaryPage";
import HomePage from "./pages/HomePage";
import { SafetyPage } from "./pages/SafetyPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // メニュー項目の定義
  const menuItems = [
    { 
      id: "home", 
      name: "ホーム", 
      icon: Home,
      description: "アプリのホーム画面に戻ります"
    },
    { 
      id: "timeline", 
      name: "タイムライン", 
      icon: Calendar,
      description: "思い出を時系列で振り返ります"
    },
    { 
      id: "checklist", 
      name: "相性チェック", 
      icon: CheckSquare,
      description: "二人の相性を確認できます"
    },
    { 
      id: "diary", 
      name: "日記", 
      icon: Book,
      description: "日々の出来事を記録します"
    },
    { 
      id: "safety", 
      name: "安全ガイド", 
      icon: Shield,
      description: "安全に関する重要な情報"
    },
  ];

  // ページコンテンツのレンダリング
  const renderContent = () => {
    const pages = {
      timeline: <TimelinePage />,
      checklist: <CompatibilityChecklist />,
      diary: <DiaryPage />,
      safety: <SafetyPage />,
      home: <HomePage setCurrentPage={setCurrentPage} />,
    };

    return pages[currentPage] || pages.home;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        menuItems={menuItems}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="page-transition">
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;