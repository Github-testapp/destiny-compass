import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">利用規約</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. 利用規約の適用</h2>
          <p>本規約は、当サービスの利用に関する条件を定めるものです。ユーザーは本規約に同意の上、当サービスをご利用ください。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">2. 禁止事項</h2>
          <p>当サービスの利用にあたり、以下の行為を禁止します：</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>法令または公序良俗に違反する行為</li>
            <li>他のユーザーに害を及ぼす行為</li>
            <li>当サービスの運営を妨げる行為</li>
            <li>その他、当サービスが不適切と判断する行為</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">3. サービスの変更・中断</h2>
          <p>当サービスは、事前の通知なく、サービスの内容を変更したり、提供を中断・終了したりする場合があります。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">4. 免責事項</h2>
          <p>当サービスの利用により生じた損害について、当サービスは一切の責任を負いません。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">5. 規約の変更</h2>
          <p>本規約は、予告なく変更される場合があります。変更後の規約は、当サービス上に掲載された時点で効力を生じるものとします。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">6. 準拠法</h2>
          <p>本規約の解釈にあたっては、日本法を準拠法とします。</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;