import React, { useState, useEffect } from 'react';
import { Book, Calendar, PlusCircle } from 'lucide-react';
import CreateDiaryForm from '../components/diary/CreateDiaryForm';
import DiaryList from '../components/diary/DiaryList';
import { getAllItems, deleteItem, addItem, updateItem } from '../utils/db';

const DiaryPage = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [statistics, setStatistics] = useState({
    totalEntries: 0,
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
          <DiaryList
            entries={diaryEntries}
            onEdit={setEditingEntry}
            onDelete={handleDelete}
          />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            心の軌跡
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-pink-50/50 rounded-lg">
              <span className="text-gray-600">想いを綴った日々</span>
              <span className="font-semibold text-gray-800">{statistics.totalEntries}日</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-pink-50/50 rounded-lg">
              <span className="text-gray-600">心が留まった瞬間</span>
              <span className="font-semibold text-gray-800">{statistics.withLocations}回</span>
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

export default DiaryPage;