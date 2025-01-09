import React, { useState } from 'react';
import { Calendar, Edit2, Trash2, Book, ChevronDown, ChevronUp } from 'lucide-react';

const DiaryEntry = ({ entry, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* ヘッダー部分（常に表示） */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-start gap-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center">
            <Calendar className="w-6 h-6 text-pink-500" />
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{entry.title}</h3>
              <p className="text-sm text-gray-500">{entry.date}</p>
              {entry.mood && <p className="text-sm text-gray-500 mt-1">心の色: {entry.mood}</p>}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(entry);
                }}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(entry.id);
                }}
                className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 展開時に表示される内容部分 */}
      {isExpanded && (
        <div className="px-6 pb-4 pt-2 border-t border-gray-100">
          <div className="prose text-gray-600 whitespace-pre-wrap">
            {entry.content}
          </div>
        </div>
      )}
    </div>
  );
};

const DiaryList = ({ entries = [], onEdit, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
        <Book className="w-12 h-12 text-pink-300 mx-auto mb-4" />
        <p className="text-gray-600">
          まだ心の記録が綴られていません。<br />
          あなたの大切な想いを紡いでいきましょう
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <DiaryEntry
          key={entry.id}
          entry={entry}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default DiaryList;