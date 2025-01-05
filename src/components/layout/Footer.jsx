import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-600">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-pink-500" />
            <span>for happy relationships</span>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-600">プライバシーポリシー</a>
            <a href="#" className="hover:text-gray-600">利用規約</a>
            <a href="#" className="hover:text-gray-600">お問い合わせ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};