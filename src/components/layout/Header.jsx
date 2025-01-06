import React from "react";
import { X } from "lucide-react";

export const Header = ({
  setCurrentPage,
  currentPage,
  menuItems,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <div className="bg-gradient-to-b from-white to-pink-50 sticky top-0 z-50">
      <header className="border-b border-pink-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* ロゴ */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentPage("home")}
            >
              <img src="/favicon.svg" alt="Logo" className="w-8 h-8" />
              <div>
                <div className="text-xl font-bold text-pink-500">
                  縁結びの占い師
                </div>
                <div className="text-xs text-gray-500">
                  Ethan - The Love Oracle
                </div>
              </div>
            </div>

            {/* デスクトップナビゲーション */}
            <nav className="hidden md:flex items-center space-x-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${
                        currentPage === item.id
                          ? "bg-pink-100 text-pink-600"
                          : "text-gray-600 hover:bg-pink-50"
                      }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </button>
                );
              })}
            </nav>

            {/* モバイルメニューボタン */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-pink-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* モバイルメニュー */}
          {isMenuOpen && (
            <div className="md:hidden py-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${
                        currentPage === item.id
                          ? "bg-pink-100 text-pink-600"
                          : "text-gray-600 hover:bg-pink-50"
                      }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
