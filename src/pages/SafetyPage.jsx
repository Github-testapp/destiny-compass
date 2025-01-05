import React from 'react';
import { Shield, AlertTriangle, Phone, Heart } from 'lucide-react';

const SafetyCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-pink-500" />
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

const EmergencyContact = () => (
  <div className="bg-pink-50 rounded-xl p-6">
    <div className="flex items-center gap-3 mb-4">
      <Phone className="w-5 h-5 text-pink-500" />
      <h3 className="text-lg font-semibold text-gray-800">緊急連絡先</h3>
    </div>
    <div className="space-y-3">
      <div className="bg-white rounded-lg p-4">
        <div className="font-medium text-gray-800">警察（緊急）</div>
        <div className="text-pink-500 font-bold">110</div>
      </div>
      <div className="bg-white rounded-lg p-4">
        <div className="font-medium text-gray-800">DV相談ホットライン</div>
        <div className="text-pink-500 font-bold">#8008</div>
      </div>
    </div>
  </div>
);

export const SafetyPage = () => {
  const safetyGuidelines = [
    {
      icon: Shield,
      title: "個人情報の保護",
      description: "初対面の相手には個人情報を安易に教えないようにしましょう。住所や職場などの情報は、十分な信頼関係ができてから共有することをお勧めします。",
    },
    {
      icon: AlertTriangle,
      title: "安全な待ち合わせ場所",
      description: "初めて会う時は、必ず人通りの多い公共の場所を選びましょう。カフェやショッピングモールなど、多くの人がいる場所がお勧めです。",
    },
    {
      icon: Heart,
      title: "境界線の設定",
      description: "自分の心地よい範囲を明確にし、それを相手に伝えることは重要です。無理な要求には毅然と断る勇気を持ちましょう。",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">安全ガイド</h1>
        <p className="text-gray-600">
          安全で健全な恋愛関係を築くためのガイドラインです。
          これらの注意点を意識することで、より良い関係を築くことができます。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {safetyGuidelines.map((guideline, index) => (
            <SafetyCard key={index} {...guideline} />
          ))}
        </div>
        
        <div className="space-y-6">
          <EmergencyContact />
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              デートDVについて
            </h3>
            <div className="prose text-gray-600">
              <p>
                デートDVとは、恋人間で起こる暴力のことです。
                身体的な暴力だけでなく、精神的な暴力や、SNSでの監視なども含まれます。
              </p>
              <p className="mt-4">
                以下のような行為は要注意です：
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>執拗な連絡や行動の監視</li>
                <li>SNSのパスワードを要求する</li>
                <li>他の異性との付き合いを制限する</li>
                <li>暴言や脅し</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};