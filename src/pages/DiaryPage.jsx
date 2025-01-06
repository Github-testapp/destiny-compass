import React, { useState, useEffect } from 'react';
import { Book, Calendar, PlusCircle, Image, MapPin, Smile, Edit2, Trash2 } from 'lucide-react';
import { CreateDiaryForm } from '../components/diary/CreateDiaryForm';
import { getAllItems, deleteItem, addItem, updateItem } from '../utils/db';

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
        <p className="text-sm text-gray-500">{entry.date}</p>
        <p className="text-gray-600 mt-2 mb-4">{entry.content}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {entry.location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {entry.location}
            </div>
          )}
          {entry.mood && (
            <div className="flex items-center">
              <Smile className="w-4 h-4 mr-1" />
              {entry.mood}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export const DiaryPage = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [statistics, setStatistics] = useState({
    totalEntries: 0,
    withPhotos: 0,
    withLocations: 0
  });

  // 日記エントリーの読み込み
  const loadEntries = async () => {
    try {
      const entries = await getAllItems('diaries');
      const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDiaryEntries(sortedEntries);
      
      // 統計情報の更新
      setStatistics({
        totalEntries: entries.length,
        withPhotos: entries.filter(entry => entry.images?.length > 0).length,
        withLocations: entries.filter(entry => entry.location).length
      });
    } catch (error) {
      console.error('Failed to load diary entries:', error);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleCreateSubmit = async (data) => {
    try {
      await addItem('diaries', {
        ...data,
        createdAt: new Date()
      });
      await loadEntries();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create diary entry:', error);
    }
  };

  const handleUpdateSubmit = async (data) => {
    try {
      await updateItem('diaries', editingEntry.id, {
        ...data,
        updatedAt: new Date()
      });
      await loadEntries();
      setEditingEntry(null);
    } catch (error) {
      console.error('Failed to update diary entry:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('この日記を削除してもよろしいですか？')) {
      try {
        await deleteItem('diaries', id);
        await loadEntries();
      } catch (error) {
        console.error('Failed to delete diary entry:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">心結びの日記</h1>
          <p className="text-gray-600">
            日々の想いを心を込めて綴り、魂の成長を見守りましょう
          </p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          想いを綴る
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {diaryEntries.length > 0 ? (
            diaryEntries.map(entry => (
              <DiaryEntry
                key={entry.id}
                entry={entry}
                onEdit={setEditingEntry}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                まだ心の記録が綴られていません。<br />
            あなたの大切な想いを紡いでいきましょう
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            心の軌跡
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">想いを綴った日々</span>
              <span className="font-semibold text-gray-800">{statistics.totalEntries}日</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">想い出の写真</span>
              <span className="font-semibold text-gray-800">{statistics.withPhotos}件</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">心が留まった場所</span>
              <span className="font-semibold text-gray-800">{statistics.withLocations}件</span>
            </div>
          </div>
        </div>
      </div>

      <CreateDiaryForm
        isOpen={isCreateModalOpen || editingEntry !== null}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingEntry(null);
        }}
        onSubmit={editingEntry ? handleUpdateSubmit : handleCreateSubmit}
        initialData={editingEntry}
      />
    </div>
  );
};