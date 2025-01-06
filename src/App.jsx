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
   name: "占いの間", 
   icon: Home,
   description: "縁結び占い師の玄関へ"
 },
 { 
   id: "timeline", 
   name: "縁結びタイムライン", 
   icon: Calendar,
   description: "大切な思い出を水晶玉に記します"
 },
 { 
   id: "checklist", 
   name: "運命の相性チェック", 
   icon: CheckSquare,
   description: "二人の絆を占いの力で紐解きます"
 },
 { 
   id: "diary", 
   name: "心結びの日記", 
   icon: Book,
   description: "日々の想いを心を込めて綴ります"
 },
 { 
   id: "safety", 
   name: "愛の守り書", 
   icon: Shield,
   description: "真実の愛を守るための占いの導き"
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