import React from 'react';
import { X, Heart, Stars, Zap, Lightbulb, TrendingUp } from 'lucide-react';

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

const CompatibilityResult = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null;

  // スコアに基づいて表示するメッセージと色を決定
  const getResultContent = (score) => {
    if (score >= 80) {
      return {
        title: '運命的な相性！',
        message: '素晴らしい相性です！お二人の関係には特別な輝きがあります。',
        icon: Stars,
        recommendations: [
          {
            icon: Heart,
            title: "最高レベルの相性",
            description: "お二人の関係は非常に強い絆で結ばれています。互いを高め合える素晴らしい関係です。"
          },
          {
            icon: Lightbulb,
            title: "価値観の一致",
            description: "人生の重要な価値観が見事に調和しています。共に歩む未来に大きな可能性を感じられます。"
          },
          {
            icon: TrendingUp,
            title: "さらなる成長の機会",
            description: "この素晴らしい相性を活かして、新しい挑戦を共に楽しんでいけるでしょう。"
          }
        ]
      };
    } else if (score >= 60) {
      return {
        title: '良い相性',
        message: '良好な相性です。お互いを理解し合える関係が築けそうです。',
        icon: Heart,
        recommendations: [
          {
            icon: Heart,
            title: "安定した関係性",
            description: "お互いを理解し、支え合える関係性が築けています。"
          },
          {
            icon: Lightbulb,
            title: "コミュニケーションの可能性",
            description: "より深い対話を重ねることで、さらに関係性が深まるでしょう。"
          },
          {
            icon: TrendingUp,
            title: "成長のポイント",
            description: "共通の趣味や活動を見つけることで、絆が強まる可能性があります。"
          }
        ]
      };
    } else {
      return {
        title: '興味深い組み合わせ',
        message: '異なる個性が刺激し合える関係です。新しい発見があるかもしれません。',
        icon: Zap,
        recommendations: [
          {
            icon: Heart,
            title: "個性の違いを活かす",
            description: "お互いの違いを理解し、補い合うことで、新たな可能性が広がります。"
          },
          {
            icon: Lightbulb,
            title: "学び合いの機会",
            description: "異なる視点や考え方から、お互いに新しい気づきが得られるでしょう。"
          },
          {
            icon: TrendingUp,
            title: "関係性の発展",
            description: "時間をかけて理解を深めることで、より良い関係を築けます。"
          }
        ]
      };
    }
  };

  const score = results.totalScore;
  const result = getResultContent(score);
  const Icon = result.icon;

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
              <Icon className="w-8 h-8 text-pink-500" />
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {score}%
            </div>
            <p className="text-gray-600">{result.message}</p>
          </div>

          <div className="space-y-4 mb-6">
            {result.recommendations.map((rec, index) => (
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

export default CompatibilityResult;