// src/data/timeline.js
import { Heart, Users, Home, Calendar } from 'lucide-react';

export const timelineCards = [
  {
    day: 30,
    title: "初期段階",
    description: "連絡の取り方、基本的な相性確認",
    icon: Heart
  },
  {
    day: 90,
    title: "関係性の確認",
    description: "将来のビジョン共有、価値観の確認",
    icon: Users
  },
  {
    day: 180,
    title: "同居検討",
    description: "具体的な生活設計の話し合い",
    icon: Home
  },
  {
    day: 360,
    title: "結婚準備",
    description: "入籍・結婚式の計画開始",
    icon: Calendar
  }
];