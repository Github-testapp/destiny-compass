// 回答の重みづけと分析を行うユーティリティ関数
export const calculateScore = (answers) => {
  // カテゴリごとの回答数を集計
  const categoryCounts = {};
  const categoryScores = {};
  let totalScore = 0;
  let totalQuestions = 0;

  Object.entries(answers).forEach(([questionId, value]) => {
    const [category] = questionId.split('-');

    if (!categoryCounts[category]) {
      categoryCounts[category] = 0;
      categoryScores[category] = 0;
    }

    categoryCounts[category]++;
    categoryScores[category] += value;
    totalScore += value;
    totalQuestions++;
  });

  // カテゴリごとの平均スコアを計算
  const categoryAnalysis = Object.entries(categoryScores).map(([category, score]) => ({
    category,
    score: Math.round((score / (categoryCounts[category] * 5)) * 100), // 5段階評価を100点満点に換算
    count: categoryCounts[category]
  }));

  // 総合スコアを計算（100点満点）
  const overallScore = Math.round((totalScore / (totalQuestions * 5)) * 100);

  const analysis = analyzeResults(categoryAnalysis);

  return {
    totalScore: overallScore,
    categoryScores: categoryAnalysis,
    recommendations: analysis.recommendations,
    strengths: analysis.strengths
  };
};

const analyzeResults = (categoryScores) => {
  const recommendations = [];
  const strengths = [];

  categoryScores.forEach(({ category, score }) => {
    if (score >= 80) {
      const strength = getStrengthMessage(category);
      if (strength) strengths.push(strength);
    } else {
      const recommendation = getRecommendation(category);
      if (recommendation) recommendations.push(recommendation);
    }
  });

  return { recommendations, strengths };
};

const getStrengthMessage = (category) => {
  const messages = {
    価値観: {
      title: "価値観の一致",
      description: "お二人の価値観は非常に近く、将来の目標や人生の優先順位について強い共感があります。"
    },
    コミュニケーション: {
      title: "円滑なコミュニケーション",
      description: "お互いの気持ちをよく理解し、効果的なコミュニケーションが取れています。"
    },
    生活習慣: {
      title: "調和の取れた生活",
      description: "生活リズムや習慣が合っており、快適な共同生活が期待できます。"
    }
  };
  return messages[category] || null;
};

const getRecommendation = (category) => {
  const recommendations = {
    価値観: {
      title: "価値観の理解を深める",
      description: "お互いの将来の展望や人生の優先順位について、より深い対話を持つことをお勧めします。"
    },
    コミュニケーション: {
      title: "コミュニケーションの改善",
      description: "定期的な対話の時間を設け、お互いの気持ちをより丁寧に共有することを心がけましょう。"
    },
    生活習慣: {
      title: "生活習慣の調整",
      description: "お互いの生活リズムや習慣を理解し、折り合いをつける方法を話し合ってみましょう。"
    }
  };
  return recommendations[category] || null;
};