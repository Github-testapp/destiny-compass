import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Image, Heart, Trash2, Edit2 } from 'lucide-react';
import { CreateMemoryForm } from './CreateMemoryForm';
import { addItem, getAllItems, deleteItem, updateItem } from '../../utils/db';

export const TimelinePage = () => {
  const [memories, setMemories] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);

  // メモリーの読み込み
  useEffect(() => {
    loadMemories();
  }, []);

  const loadMemories = async () => {
    try {
      const items = await getAllItems('memories');
      setMemories(items.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error('Failed to load memories:', error);
    }
  };

  // 新規メモリーの追加
  const handleAddMemory = async (data) => {
    try {
      await addItem('memories', data);
      await loadMemories();
    } catch (error) {
      console.error('Failed to add memory:', error);
    }
  };

  // メモリーの更新
  const handleUpdateMemory = async (id, data) => {
    try {
      await updateItem('memories', id, data);
      await loadMemories();
      setEditingMemory(null);
    } catch (error) {
      console.error('Failed to update memory:', error);
    }
  };

  // メモリーの削除
  const handleDeleteMemory = async (id) => {
    if (window.confirm('この思い出を削除してもよろしいですか？')) {
      try {
        await deleteItem('memories', id);
        await loadMemories();
      } catch (error) {
        console.error('Failed to delete memory:', error);
      }
    }
  };

  const TimelineEvent = ({ memory }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center">
            <Calendar className="w-6 h-6 text-pink-500" />
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{memory.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{memory.date}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingMemory(memory)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteMemory(memory.id)}
                className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 mt-2">{memory.description}</p>
          
          <div className="flex items-center gap-4 mt-4">
            {memory.location && (
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                {memory.location}
              </div>
            )}
            {memory.images?.length > 0 && (
              <div className="flex items-center text-sm text-gray-500">
                <Image className="w-4 h-4 mr-1" />
                写真: {memory.images.length}枚
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">縁結びタイムライン</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          <Heart className="w-4 h-4 mr-2" />
          想い出を結ぶ
        </button>
      </div>

      <div className="space-y-6">
        {memories.map((memory) => (
          <TimelineEvent key={memory.id} memory={memory} />
        ))}
        {memories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            大切な思い出を水晶玉に刻んでいきましょう！
          </div>
        )}
      </div>

      <CreateMemoryForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleAddMemory}
        initialData={editingMemory}
        mode={editingMemory ? "edit" : "create"}
      />
    </div>
  );
};