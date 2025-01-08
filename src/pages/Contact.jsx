import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">お問い合わせ</h1>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Mail className="w-12 h-12 text-pink-500" />
          <h2 className="text-xl font-semibold text-gray-800">メールでのお問い合わせ</h2>
          <p className="text-gray-600 text-center">
            ご質問、ご意見、ご要望がございましたら、<br />
            下記のメールアドレスまでお気軽にご連絡ください。
          </p>
          <a 
            href="mailto:stellafortunetelling@gmail.com"
            className="text-lg font-medium text-pink-500 hover:text-pink-600 flex items-center gap-2"
          >
            stellafortunetelling@gmail.com
          </a>
          <p className="text-sm text-gray-500 mt-4">
            ※ご返信まで数日かかる場合がございます。<br />
            お急ぎの場合はその旨を件名にお書き添えください。
          </p>
        </div>
      </div>

      {/* 追加部分 */}
      <div className="bg-white rounded-xl p-6 shadow-sm mt-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <ExternalLink className="w-12 h-12 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">個人占いページ</h2>
          <p className="text-gray-600 text-center">
            個別の占いをご希望の方は、<br />
            以下のリンクより専用ページをご覧ください。
          </p>
          <a 
            href="https://truthtold.static.jp/eastwizard/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium text-blue-500 hover:text-blue-600 flex items-center gap-2"
          >
            個人占いページはこちら
          </a>
          <p className="text-sm text-gray-500 mt-4">
            ※占いサービスの詳細や料金については専用ページにてご確認ください。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
