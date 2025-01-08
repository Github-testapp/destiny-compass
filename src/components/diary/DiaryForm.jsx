import React from "react";
import { Calendar } from "lucide-react";

const moods = [
  { emoji: "😊", label: "幸せ" },
  { emoji: "🥰", label: "感動" },
  { emoji: "😌", label: "穏やか" },
  { emoji: "🤗", label: "ワクワク" },
  { emoji: "🤔", label: "考え中" },
  { emoji: "😢", label: "切ない" },
];

const placeholderText = 
  "【今日の出来事】\n" +
  "今日あった出来事や感じたことを書いてみましょう\n";

const DiaryForm = ({ formData, setFormData, onSubmit, onCancel }) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        タイトル
      </label>
      <input
        type="text"
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        placeholder="今日の心の記録"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        日付
      </label>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          required
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        今日の気分
      </label>
      <div className="grid grid-cols-3 gap-3">
        {moods.map(({ emoji, label }) => (
          <button
            key={label}
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, mood: label }))}
            className={`p-3 rounded-lg border flex items-center justify-center gap-2
              ${
                formData.mood === label
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
          >
            <span className="text-xl">{emoji}</span>
            <span className="text-sm text-gray-700">{label}</span>
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        今日の振り返り
      </label>
      <textarea
        value={formData.content}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, content: e.target.value }))
        }
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        rows="6"
        placeholder={placeholderText}
        required
      />
      <div className="mt-3 text-sm text-gray-600 space-y-3 bg-gray-50 p-4 rounded-lg">
 <p className="font-medium text-gray-700 border-b border-gray-200 pb-2">書き方ガイド：</p>
 
 <div>
   <p className="font-medium text-pink-600">【今日の出来事】</p>
   <p className="pl-4">・今日あった出来事や感じたことを書きましょう</p>
   <p className="pl-4">・大切な思い出（デート、プレゼント、記念日など）</p>
   <p className="pl-4">・使った時間や金額も記録しておくと振り返りに役立ちます</p>
 </div>

 <div>
   <p className="font-medium text-pink-600">【自己分析・内省】</p>
   <p className="pl-4">・今日の自分の言動や感情を振り返ってみましょう</p>
   <p className="pl-4">・なぜそのように感じたのか、深く考えてみましょう</p>
   <p className="pl-4">・二人の関係性について気づいたことはありますか？</p>
 </div>

 <div>
   <p className="font-medium text-pink-600">【感謝の気持ち】</p>
   <p className="pl-4">・今日、特に感謝を感じた出来事は何ですか？</p>
   <p className="pl-4">・相手のどんなところに心が温まりましたか？</p>
   <p className="pl-4">・些細な幸せや喜びも大切に書き留めましょう</p>
 </div>

 <div>
   <p className="font-medium text-pink-600">【改善したい点】</p>
   <p className="pl-4">・今日の自分の言動で反省すべき点はありましたか？</p>
   <p className="pl-4">・より良い関係のために工夫できることは？</p>
   <p className="pl-4">・相手の気持ちに寄り添えていましたか？</p>
 </div>

 <div>
   <p className="font-medium text-pink-600">【明日への誓い】</p>
   <p className="pl-4">・明日、具体的に実践したいことは何ですか？</p>
   <p className="pl-4">・二人の関係をより良くするための小さな一歩</p>
   <p className="pl-4">・相手に伝えたい想いや実現したい計画</p>
 </div>

 <p className="text-xs text-gray-500 mt-4 pt-2 border-t border-gray-200">
   ※ 毎日の記録が二人の絆を深め、より良い関係への道しるべとなります
 </p>
</div>
    </div>

    <div className="flex justify-end gap-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
      >
        キャンセル
      </button>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 rounded-lg"
      >
        心を綴る
      </button>
    </div>
  </form>
);

export default DiaryForm;
