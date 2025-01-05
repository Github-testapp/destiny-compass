import React from "react";

export const DiaryList = ({ entries, onDelete, onEdit }) => {
  const getMoodDisplay = (mood) => {
    const moodMap = {
      とても良い: "😊 とても良い",
      良い: "🙂 良い",
      普通: "😐 普通",
      悪い: "☹️ 悪い",
      とても悪い: "😢 とても悪い",
    };
    return moodMap[mood] || mood;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    return date.toLocaleDateString("ja-JP", options);
  };

  return (
    <div className="space-y-4">
      {entries
        .slice()
        .reverse()
        .map((entry, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-700">
                {formatDate(entry.date)}
              </span>
              <span className="text-gray-500">
                {getMoodDisplay(entry.mood)}
              </span>
            </div>
            <div className="border-l-4 border-pink-200 pl-4 mb-3">
              <p className="text-gray-700 mb-2 whitespace-pre-line">
                {entry.content}
              </p>
            </div>
            {entry.reflection && (
              <div className="bg-pink-50 p-3 rounded">
                <p className="text-gray-600 text-sm italic whitespace-pre-line">
                  【振り返り】
                  {entry.reflection}
                </p>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onEdit(index)}
                className="text-blue-500 hover:underline"
              >
                編集
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:underline"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      {entries.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          まだ日記が書かれていません。
          <br />
          今日の出来事を記録してみましょう！
        </div>
      )}
    </div>
  );
};
