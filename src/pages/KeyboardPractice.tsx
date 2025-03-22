import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

const KeyboardPractice: React.FC = () => {
  const imageArray: string[] = [
    'https://static.thenounproject.com/png/7407924-200.png',
    'https://static.thenounproject.com/png/7407922-200.png',
    'https://static.thenounproject.com/png/7407908-200.png',
    'https://static.thenounproject.com/png/7407925-200.png',
    'https://static.thenounproject.com/png/7407904-200.png',
    'https://static.thenounproject.com/png/7407909-200.png',
    'https://static.thenounproject.com/png/7407900-200.png',
    'https://static.thenounproject.com/png/7407910-200.png',
    'https://static.thenounproject.com/png/7407906-200.png',
    'https://static.thenounproject.com/png/7407905-200.png',
    'https://static.thenounproject.com/png/7407907-200.png',
    'https://static.thenounproject.com/png/7407920-200.png',
    'https://static.thenounproject.com/png/7407914-200.png',
    'https://static.thenounproject.com/png/7407901-200.png',
    'https://static.thenounproject.com/png/7407903-200.png',
    'https://static.thenounproject.com/png/7407911-200.png',
    'https://static.thenounproject.com/png/7407917-200.png',
    'https://static.thenounproject.com/png/7407915-200.png',
    'https://static.thenounproject.com/png/7407919-200.png',
    'https://static.thenounproject.com/png/7407921-200.png',
    'https://static.thenounproject.com/png/7407912-200.png',
    'https://static.thenounproject.com/png/7407918-200.png',
    'https://static.thenounproject.com/png/7407913-200.png',
    'https://static.thenounproject.com/png/7407923-200.png',
    'https://static.thenounproject.com/png/7407916-200.png',
    'https://static.thenounproject.com/png/7407902-200.png',
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <Layout
      title="Keyboard Practice"
      subtitle="Press the key that matches the shown sign language gesture"
      showBackButton
      backTo="/main-menu"
      backgroundEffect="dots"
      className="bg-gradient-to-br from-cyber-super-light via-background to-background"
    >
      <div className="mt-10 flex flex-col items-center">
        <PageTransition animationType="fade">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-cyber rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative aspect-square max-w-sm overflow-hidden rounded-lg shadow-lg bg-white/90 backdrop-blur-sm h-[250px] w-[250px] flex items-center justify-center">
                {selectedIndex !== null ? (
                  <div className="text-[8rem] font-bold text-cyber animate-float">
                    {String.fromCharCode(65 + selectedIndex)}
                  </div>
                ) : (
                  <div className="text-6xl text-gray-400 animate-pulse">?</div>
                )}
              </div>

              {selectedIndex !== null && (
                <div className="absolute top-4 left-4">
                  <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 text-white font-bold text-lg animate-pulse-slow">
                    Letter {String.fromCharCode(65 + selectedIndex)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </PageTransition>

        <PageTransition animationType="slide-up" delay={300}>
          <div className="mt-16 w-full max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {imageArray.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className="h-14 w-14 md:h-16 md:w-16 rounded-lg border-2 border-gray-300 bg-gray-50 hover:scale-105 transition-transform duration-200 flex items-center justify-center hover:bg-blue-400"
                >
                  <img
                    src={img}
                    alt={`Sign for ${String.fromCharCode(65 + index)}`}
                    className="h-8 w-8 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        </PageTransition>
      </div>
    </Layout>
  );
};

export default KeyboardPractice;
