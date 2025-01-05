import React from 'react';
import { X, Heart, Lightbulb, TrendingUp } from 'lucide-react';

const ResultCard = ({ icon: Icon, title, description }) => (
  <div className="bg-pink-50 rounded-lg p-4">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-white rounded-full">
        <Icon className="w-5 h-5 text-pink-500" />
      </div>
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  </div>
);

export const CompatibilityResult = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null;

  // 結果に基づいてスコアと提案を生成
  const getAdvice = (score) => {
    if (score >= 80) {
      return "とても良好な関係です。さらなる成長のために、新しい共通の趣味を見つけてみましょう。";
    } else if (score >= 60) {
      return "良好な関係ですが、コミュニケーションを深めることでより良い関係を築けます。";
    } else {
      return "お互いの価値観や考え方をよく理解し合うことが大切です。ゆっくり時間をかけて関係を築いていきましょう。";
    }
  };

  // サンプルの結果データ
  const score = 85;
  const advice = getAdvice(score);

  const recommendations = [
    {
      icon: Heart,
      title: "共感力が高い",
      description: "お互いの気持ちをよく理解し合えています。この強みを活かして、より深い絆を築いていけるでしょう。"
    },
    {
      icon: Lightbulb,
      title: "価値観の一致",
      description: "将来の目標や生活スタイルについて、多くの部分で価値観が合っています。"
    },
    {
      icon: TrendingUp,
      title: "成長のポイント",
      description: "お互いの個性を尊重しながら、新しい経験を共有していくことで、さらに関係が深まるでしょう。"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">相性診断結果</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-8 text-center">
            <div className="inline-block p-4 bg-pink-50 rounded-full mb-4">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {score}点
            </div>
            <p className="text-gray-600">{advice}</p>
          </div>

          <div className="space-y-4 mb-6">
            {recommendations.map((rec, index) => (
              <ResultCard key={index} {...rec} />
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">
              これからの関係をより良くするために
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>・定期的な対話の時間を設けましょう</li>
              <li>・お互いの趣味や興味を共有し合いましょう</li>
              <li>・一緒に新しい経験にチャレンジしてみましょう</li>
            </ul>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};