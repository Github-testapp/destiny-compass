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
      title: "縁結びタイムライン",
      description:
        "大切な思い出をすべて記録。いつ、どこで、何をしたのか。愛を育むために使った時間とお金を振り返りながら、より素敵な関係を築いていきましょう。",
      page: "timeline",
    },
    {
      icon: CheckSquare,
      title: "運命の相性チェック",
      description:
        "出会いの段階から細やかにチェック。大切な時間とご縁を大事にするための神秘の導き。運命の人との出会いを見極めます。",
      page: "checklist",
    },
    {
      icon: Book,
      title: "心結びの日記",
      description:
        "日々の想いを綴り、自分自身と向き合う大切な時間。純粋な気持ちと正直に向き合い、より良い関係を紡ぐための心の記録。",
      page: "diary",
    },
    {
      icon: Shield,
      title: "愛の守り書",
      description:
        "恋の迷路で迷わないように。不誠実な出会いを見分け、真実の愛を守るための占い師からの大切な助言と導き。安全に恋を育むためのガイドラインをお届けします。",
      page: "safety",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          縁結び占い師が導く ふたりの想いの物語
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          心を紡ぐ占いの力で 大切な絆を深めていきましょう{" "}
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