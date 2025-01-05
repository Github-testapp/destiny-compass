import React, { useState } from 'react';
import { X, Image, MapPin, Calendar, Smile } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">新しい日記を書く</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const moods = [
  { emoji: "😊", label: "幸せ" },
  { emoji: "🥰", label: "感動" },
  { emoji: "😌", label: "穏やか" },
  { emoji: "🤗", label: "ワクワク" },
  { emoji: "🤔", label: "考え中" },
  { emoji: "😢", label: "切ない" },
];

export const CreateDiaryForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    content: '',
    location: '',
    mood: '',
    images: [],
    isPublic: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.