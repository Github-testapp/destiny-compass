import React from 'react';
import { X, Heart, Lightbulb, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const ScoreCard = ({ category, score }) => (
  <div className="bg-white rounded-lg p-4 text-center">
    <div className="text-gray-600 mb-1">{category}</div>
    <div className="text-2xl font-bold text-gray-800">{Math.round(score)}%</div>
    <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
      <div
        className="bg-pink-500 h-full rounded-full transition-all duration-500"
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);

const AnalysisCard = ({ icon: Icon, title, description, type }) => (
  <div className={`rounded-lg p-4 ${
    type === 'strength' ? 'bg-green-50' : 'bg-blue-50'
  }`}>
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-full ${
        type === 'strength' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
      }`}>
        <Icon className="w-5 h-5" />
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

  const { overallScore, categoryScores, details } = results;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
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

          {/* 総合スコア */}
          <div className="mb-8 text-center">
            <div className="inline-block p-4 bg-pink-50 rounded-full mb-4">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {overallScore}点
            </div>
            <p className="text-gray-600">
              {overallScore >= 80 
                ? '素晴らしい相性です！お二人の関係は非常に良好です。'
                : overallScore >= 60
                ? '良好な相性です。さらなる関係の発展が期待できます。'
                : 'これからお互いをより深く理解していくことで、関係は発展していくでしょう。'}
            </p>
          </div>

          {/* カテゴリ別スコア */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {categoryScores.map(({ category, score }) => (
              <ScoreCard key={category} category={category} score={score} />
            ))}
          </div>

          {/* 強みと改善点 */}
          <div className="space-y-6">
            {/* 強み */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                お二人の強み
              </h3>
              <div className="space-y-3">
                {details.strengths.map((strength, index) => (
                  <AnalysisCard
                    key={index}
                    icon={CheckCircle}
                    title={strength.title}
                    description={strength.description}
                    type="strength"
                  />
                ))}
              </div>
            </div>

            {/* 改善のアドバイス */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 text-blue-500 mr-2" />
                さらなる関係発展のために
              </h3>
              <div className="space-y-3">
                {details.recommendations.map((recommendation, index) => (
                  <AnalysisCard
                    key={index}
                    icon={TrendingUp}
                    title={recommendation.title}
                    description={recommendation.description}
                    type="recommendation"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-pink-500 hover:bg-pink-50 rounded-lg transition-colors"
            >
              閉じる
            </button>
            <button
              onClick={() => {
                // 結果の共有や保存の機能をここに追加
                window.print();
              }}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              結果を保存
            </button>
          </div>

          {/* アドバイス */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              この診断結果は、お二人の関係の現状を理解するための参考情報です。
              定期的にチェックすることで、関係の変化や成長を確認できます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};