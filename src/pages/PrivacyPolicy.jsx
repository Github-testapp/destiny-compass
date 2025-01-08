import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">プライバシーポリシー</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. 個人情報の取り扱いについて</h2>
          <p>当サービスは、ユーザーの個人情報を適切に管理し、以下の目的以外では利用いたしません。</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>サービスの提供・運営</li>
            <li>ユーザーサポート</li>
            <li>サービスの改善・新機能の開発</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">2. 収集する情報</h2>
          <p>当サービスでは、以下の情報を収集する場合があります：</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>入力された日記内容</li>
            <li>記録された思い出の情報</li>
            <li>相性チェックの結果</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">3. 情報の保護</h2>
          <p>収集した情報は、適切な安全対策を実施し、不正アクセス、紛失、破壊、改ざん、漏洩などを防止するために必要な措置を講じています。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">4. 情報の開示・訂正・削除</h2>
          <p>ユーザーは自身の情報について、開示、訂正、削除を求めることができます。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">5. プライバシーポリシーの変更</h2>
          <p>本プライバシーポリシーの内容は、法令その他本プライバシーポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく変更することができます。</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;