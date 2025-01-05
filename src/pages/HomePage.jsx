import React from 'react';
import { Calendar, CheckSquare, Book, Shield, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
  >
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-pink-50 rounded-lg group-hover:bg-pink-100 transition-colors">
        <Icon className="w-6 h-6 text-pink-500" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-between">
          {title}
          <ArrowRight className="w-5 h-5 text-pink-500 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

const HomePage = ({ setCurrentPage }) => {
  const features = [
    {
      icon: Calendar,
      title: "タイムライン",
      description: "大切な思い出を記録し、二人の歴史を振り返ることができます。写真や場所も登録可能です。",
      page: "timeline"
    },
    {
      icon: CheckSquare,
      title: "相性チェック",
      description: "科学的な診断で二人の相性を分析。より良い関係づくりのアドバイスも提供します。",
      page: "checklist"
    },
    {
      icon: Book,
      title: "デイリー日記",
      description: "日々の出来事や感情を記録。二人の関係の成長を振り返ることができます。",
      page: "diary"
    },
    {
      icon: Shield,
      title: "安全ガイド",
      description: "安全に恋愛を楽しむためのアドバイスとガイドラインを提供します。",
      page: "safety"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          あなたの恋愛をサポート
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          タイムラインで思い出を記録し、相性チェックで二人の関係をより深く理解しましょう
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            onClick={() => setCurrentPage(feature.page)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;