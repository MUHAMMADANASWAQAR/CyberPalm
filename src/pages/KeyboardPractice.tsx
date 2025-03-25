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

  const [text, setText] = useState<string>('');

  const handleKeyPress = (char: string) => {
    setText(prevText => prevText + char);
  };

  const handleBackspace = () => {
    setText(prevText => prevText.slice(0, -1));
  };

  const handleClear = () => {
    setText('');
  };

  const handleNextLine = () => {
    setText(prevText => prevText + '\n');
  };

  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  return (
    <Layout
      title="Let's Commmunicate"
      subtitle="Communicte through sign language using keyboard inputs  "
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
              <div className="relative max-w-3xl overflow-hidden rounded-lg shadow-lg bg-white/90 backdrop-blur-sm h-[500px] w-[700px] flex flex-col items-start justify-start p-4">
                <div className="text-[1.5rem] font-bold text-cyber animate-float break-words" style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                  {text}
                </div>
              </div>
            </div>
          </div>
        </PageTransition>

        <PageTransition animationType="slide-up" delay={300}>
          <div className="mt-16 w-full max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {imageArray.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleKeyPress(String.fromCharCode(65 + index))}
                  className="h-14 w-14 md:h-16 md:w-16 rounded-lg border-2 border-gray-300 bg-gray-50 hover:scale-105 transition-transform duration-200 flex items-center justify-center hover:bg-blue-400"
                >
                  <img
                    src={img}
                    alt={`Sign for ${String.fromCharCode(65 + index)}`}
                    className="h-8 w-8 object-contain"
                  />
                </button>
              ))}
              <button
                onClick={handleBackspace}
                className="h-14 w-28 md:h-16 md:w-28 rounded-lg border-2 border-gray-300 bg-gray-50 hover:scale-105 transition-transform duration-200 flex items-center justify-center hover:bg-red-400"
              >
                Backspace
              </button>
              <button
                onClick={handleClear}
                className="h-14 w-28 md:h-16 md:w-28 rounded-lg border-2 border-gray-300 bg-gray-50 hover:scale-105 transition-transform duration-200 flex items-center justify-center hover:bg-red-400"
              >
                Clear
              </button>
              <button
                onClick={handleNextLine}
                className="h-14 w-28 md:h-16 md:w-28 rounded-lg border-2 border-gray-300 bg-gray-50 hover:scale-105 transition-transform duration-200 flex items-center justify-center hover:bg-blue-400"
              >
                Next Line
              </button>
              <button
                onClick={handleSpeech}
                className="h-14 w-14 md:h-16 md:w-16 rounded-lg border-2 border-gray-300 bg-gray-50 hover:scale-105 transition-transform duration-200 flex items-center justify-center hover:bg-yellow-400"
              >
                🎤
              </button>
              <div className="w-full flex justify-center mt-3">
                <button
                  onClick={() => handleKeyPress(' ')}
                  className="h-14 w-60 md:h-16 md:w-96 rounded-lg border-2 border-gray-300 bg-gray-50 hover:scale-105 transition-transform duration-200 flex items-center justify-center hover:bg-green-400"
                >
                  Space
                </button>
              </div>
            </div>
          </div>
        </PageTransition>
      </div>
    </Layout>
  );
};

export default KeyboardPractice;