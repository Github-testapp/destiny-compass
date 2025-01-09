import React from 'react';
import { Calendar } from 'lucide-react';

const DiaryCalendar = ({ entries, onDateSelect, selectedDate }) => {
  // 現在の年月を取得
  const today = new Date();
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());

  // カレンダーのデータを生成
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // 日付ごとのエントリーを整理
  const entryMap = entries.reduce((acc, entry) => {
    const date = new Date(entry.date).toISOString().split('T')[0];
    acc[date] = entry;
    return acc;
  }, {});

  // 前月・次月の移動
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 月の名前を取得
  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月",
    "7月", "8月", "9月", "10月", "11月", "12月"
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">
          {currentYear}年 {monthNames[currentMonth]}
        </h2>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} className="text-center p-2 text-sm font-medium">
            {day}
          </div>
        ))}

        {[...Array(firstDay)].map((_, index) => (
          <div key={`empty-${index}`} className="p-2" />
        ))}

        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasEntry = dateStr in entryMap;
          const isSelected = dateStr === selectedDate;

          return (
            <button
              key={day}
              onClick={() => hasEntry && onDateSelect(dateStr)}
              className={`p-2 text-center relative hover:bg-pink-50 rounded-lg transition-colors
                ${hasEntry ? 'font-semibold' : 'text-gray-400'}
                ${isSelected ? 'bg-pink-100' : ''}`}
            >
              {day}
              {hasEntry && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DiaryCalendar;