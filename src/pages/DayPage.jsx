// src/pages/DayPage.jsx
import React from "react";
import { Calendar, Heart, CheckSquare, AlertTriangle } from "lucide-react";
import { timelineCards } from "../data/timeline";

export const DayPage = ({ day }) => {
  const currentPhase = timelineCards.find((card) => card.day === day);

  if (!currentPhase) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          指定された期間のデータが見つかりませんでした。
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-pink-500 mr-3" />
          <h2 className="text-3xl font-bold">{currentPhase.day}目</h2>
        </div>
        <h3 className="text-xl text-gray-600">{currentPhase.title}</h3>
        <p className="mt-2 text-gray-500">{currentPhase.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* チェックポイント */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <CheckSquare className="w-6 h-6 text-green-500 mr-2" />
            <h4 className="text-lg font-bold">チェックポイント</h4>
          </div>
          <ul className="space-y-3">
            {currentPhase.checkpoints?.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 注意点 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
            <h4 className="text-lg font-bold">注意点</h4>
          </div>
          <ul className="space-y-3">
            {currentPhase.warnings?.map((warning, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 目標 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Heart className="w-6 h-6 text-pink-500 mr-2" />
            <h4 className="text-lg font-bold">目標</h4>
          </div>
          <ul className="space-y-3">
            {currentPhase.goals?.map((goal, index) => (
              <li key={index} className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DayPage;
