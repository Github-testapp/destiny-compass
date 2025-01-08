import React from 'react';
import { Calendar, Edit2, Trash2, Book } from 'lucide-react';

const DiaryEntry = ({ entry, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center">
          <Calendar className="w-6 h-6 text-pink-500" />
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{entry.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(entry)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(entry.id)}
              className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-4">
          <div>{entry.date}</div>
          {entry.mood && <div className="mt-1">心の色: {entry.mood}</div>}
        </div>
        <div className="prose text-gray-600 whitespace-pre-wrap">
          {entry.content}
        </div>
      </div>
    </div>
  </div>
);

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
    <div className="space-y-6">
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