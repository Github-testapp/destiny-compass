import React, { useState, useRef } from "react";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";
import { questions } from "../../data/questions";
import { calculateScore } from "../../utils/compatibilityUtils";
import CompatibilityResult from "./CompatibilityResult";
import { addItem } from "../../utils/db";

const RatingOption = ({ value, selected, onSelect }) => (
  <button
    onClick={() => onSelect(value)}
    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
      ${
        selected
          ? "bg-pink-500 text-white"
          : "bg-gray-50 text-gray-600 hover:bg-pink-50"
      }`}
  >
    {value}
  </button>
);

const QuestionItem = ({ category, question, questionId, answer, onAnswer }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="mb-4">
        <span className="text-sm text-pink-500 font-medium">{category}</span>
        <h3 className="text-gray-800 font-medium mt-1">{question}</h3>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          まったく
          <br />
          当てはまらない
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <RatingOption
              key={value}
              value={value}
              selected={answer === value}
              onSelect={(value) => onAnswer(questionId, value)}
            />
          ))}
        </div>
        <div className="text-sm text-gray-500 text-right">
          とても
          <br />
          当てはまる
        </div>
      </div>
    </div>
  );
};

export const CompatibilityChecklist = () => {
  const [answers, setAnswers] = useState({});
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState(null);
  const containerRef = useRef(null);

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const totalQuestions = questions.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );
  const answeredQuestions = Object.keys(answers).length;
  const completionRate = (answeredQuestions / totalQuestions) * 100;

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleNext = () => {
    if (currentCategory < questions.length - 1) {
      setCurrentCategory((prev) => prev + 1);
      scrollToTop();
    } else {
      const results = calculateScore(answers);
      setResults(results);
      setShowResult(true);

      // 結果をIndexedDBに保存
      addItem("compatibility", {
        date: new Date(),
        answers,
        results,
      });
    }
  };

  const handlePrevious = () => {
    if (currentCategory > 0) {
      setCurrentCategory((prev) => prev - 1);
      scrollToTop();
    }
  };

  if (showResult && results) {
    return (
      <CompatibilityResult
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        results={results}
      />
    );
  }

  const currentQuestions = questions[currentCategory];

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          運命の相性チェック
        </h1>
        <p className="text-gray-600">
          二人の絆をより深く理解するための神秘の導き。
          定期的に想いを確かめ合い、共に歩む道を照らしていきましょう。
        </p>
        <p className="text-sm text-gray-500 mt-2">
          それぞれの質問に正直な気持ちで答えることで、より確かな導きが得られます。
        </p>
      </div>

      {/* 進捗バー */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{currentQuestions.category}</span>
          <span>{Math.round(completionRate)}% 完了</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-pink-500 transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* 質問リスト */}
      <div className="space-y-4 mb-8">
        {currentQuestions.items.map((question, index) => {
          const questionId = `${currentQuestions.category}-${index}`;
          return (
            <QuestionItem
              key={questionId}
              category={currentQuestions.category}
              question={question}
              questionId={questionId}
              answer={answers[questionId]}
              onAnswer={handleAnswer}
            />
          );
        })}
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          className={`px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50
            ${currentCategory === 0 ? "invisible" : ""}`}
        >
          前のカテゴリー
        </button>
        <button
          onClick={handleNext}
          className="flex items-center px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          {currentCategory < questions.length - 1 ? (
            <>
              次のカテゴリー
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            "結果を見る"
          )}
        </button>
      </div>
    </div>
  );
};