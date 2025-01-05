import React, { useState, useEffect } from "react";
import { X, Image, MapPin, Calendar, Smile } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">日記を書く</h2>
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

export const CreateDiaryForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    content: "",
    location: "",
    mood: "",
    images: [],
    isPublic: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date || new Date().toISOString().split("T")[0],
      });
    } else {
      setFormData({
        title: "",
        date: new Date().toISOString().split("T")[0],
        content: "",
        location: "",
        mood: "",
        images: [],
        isPublic: false,
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 画像のBase64変換
    const processedData = { ...formData };
    if (formData.images.length > 0) {
      const imagePromises = Array.from(formData.images).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      processedData.imageData = await Promise.all(imagePromises);
    }

    onSubmit(processedData);
    onClose();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="今日の出来事のタイトル"
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
                onClick={() =>
                  setFormData((prev) => ({ ...prev, mood: label }))
                }
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
            内容
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            rows="6"
            placeholder="今日あった出来事や感じたことを書いてみましょう"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            場所
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="場所を入力（任意）"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            写真を追加
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-pink-500 hover:text-pink-400">
                  <span>写真をアップロード</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {formData.images.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {formData.images.map((file, index) => (
                <div key={index} className="text-sm text-gray-500 truncate">
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublic"
            checked={formData.isPublic}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isPublic: e.target.checked }))
            }
            className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
          />
          <label htmlFor="isPublic" className="text-sm text-gray-700">
            公開する（他のユーザーも閲覧可能になります）
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 rounded-lg"
          >
            {initialData ? "更新する" : "保存する"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
