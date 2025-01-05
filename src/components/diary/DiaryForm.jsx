import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";

export const DiaryForm = ({ onSave, initialEntry }) => {
  const [currentEntry, setCurrentEntry] = useState({
    date: new Date().toISOString().split("T")[0],
    content: "",
    reflection: "",
    mood: "普通",
  });

  useEffect(() => {
    if (initialEntry) {
      setCurrentEntry(initialEntry); // 編集用データをセット
    }
  }, [initialEntry]);

  const handleSubmit = () => {
    onSave(currentEntry);
    setCurrentEntry({
      date: new Date().toISOString().split("T")[0],
      content: "",
      reflection: "",
      mood: "普通",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          日付
        </label>
        <input
          type="date"
          value={currentEntry.date}
          onChange={(e) =>
            setCurrentEntry({ ...currentEntry, date: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          今日の出来事
        </label>
        <textarea
          value={currentEntry.content}
          onChange={(e) =>
            setCurrentEntry({ ...currentEntry, content: e.target.value })
          }
          className="w-full p-2 border rounded h-32"
          placeholder="今日あった出来事や感じたことを書きましょう"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          振り返り
        </label>
        <textarea
          value={currentEntry.reflection}
          onChange={(e) =>
            setCurrentEntry({ ...currentEntry, reflection: e.target.value })
          }
          className="w-full p-2 border rounded h-24"
          placeholder="今日の行動や感情を振り返ってみましょう"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          今日の気分
        </label>
        <select
          value={currentEntry.mood}
          onChange={(e) =>
            setCurrentEntry({ ...currentEntry, mood: e.target.value })
          }
          className="w-full p-2 border rounded"
        >
          <option value="とても良い">😊 とても良い</option>
          <option value="良い">🙂 良い</option>
          <option value="普通">😐 普通</option>
          <option value="悪い">☹️ 悪い</option>
          <option value="とても悪い">😢 とても悪い</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 flex items-center transition-colors"
      >
        <Save className="w-4 h-4 mr-2" />
        保存する
      </button>
    </div>
  );
};
