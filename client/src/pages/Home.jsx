import React, { useState } from 'react';
import axios from 'axios';
import wallpaper from './newbg.jpg';
import scissorright from './scissorr.png';
import stoneright from './stoner.png';
import paperright from './paperr.png';
import scissorleft from './scissorl.png';
import stoneleft from './stonel.png';
import paperleft from './paperl.png';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState('');
  const [capitalizedOption, setCapitalizedOption] = useState('');
  const [winner, setWinner] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [showWinnerPopout, setShowWinnerPopout] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [aiChoiceImage, setAiChoiceImage] = useState(null);
  const [aiChoiceAnimation, setAiChoiceAnimation] = useState('');
  const [userChoiceAnimation, setUserChoiceAnimation] = useState('');

  const handleClick = async (option) => {
    setSelectedOption(option);
    let newImageURL = '';

    switch (option) {
      case 'Rock':
        newImageURL = stoneright;
        setAiChoiceAnimation('animate-slideInLeft');
        setUserChoiceAnimation('animate-slideInRight');
        break;
      case 'Paper':
        newImageURL = paperright;
        setAiChoiceAnimation('animate-slideInLeft');
        setUserChoiceAnimation('animate-slideInRight');
        break;
      case 'Scissors':
        newImageURL = scissorright;
        setAiChoiceAnimation('animate-slideInLeft');
        setUserChoiceAnimation('animate-slideInRight');
        break;
      default:
        break;
    }

    setImageURL(newImageURL);

    try {
      const response = await axios.post('http://localhost:5000/play', { option: option.toLowerCase() });
      setCapitalizedOption(response.data.user_choice);
      setWinner(response.data.winner);
      setUserScore(response.data.user_score);
      setAiScore(response.data.ai_score);
      setShowWinnerPopout(true);

      switch (response.data.computer_choice) {
        case 'Rock':
          setAiChoiceImage(stoneleft);
          break;
        case 'Paper':
          setAiChoiceImage(paperleft);
          break;
        case 'Scissors':
          setAiChoiceImage(scissorleft);
          break;
        default:
          break;
      }

      setTimeout(() => {
        setShowWinnerPopout(false);
        setAiChoiceAnimation('');
        setUserChoiceAnimation('');
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-full">
      <div className="h-full min-h-screen w-full min-w-screen overflow-hidden flex flex-col" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="flex-1 grid grid-cols-2 bg-transparent mt-20">
          
          {/* AI Score with AI choice image */}
          <div className="flex flex-col justify-center items-center bg-transparent ">
            {/* AI Choice Image */}
            {aiChoiceImage && (
              <div className={`flex justify-start items-center bg-transparent w-full ${aiChoiceAnimation}`}>
                <img src={aiChoiceImage} alt="AI Choice" className="w-45 h-auto mt-5" />
              </div>
            )}
            <h2 className="text-lg font-semibold mb-2">AI Score</h2>
            <div className="bg-gray-200 bg-opacity-50 shadow-md rounded-md p-4 w-48 h-26 flex justify-center items-center">
              <p className="text-3xl font-bold">{aiScore}</p>
            </div>
          </div>

          {/* User Score with User choice image */}
          <div className="flex flex-col justify-center items-center bg-transparent">
            {/* User Choice Image */}
            {imageURL && (
              <div className={`flex justify-end items-center bg-transparent w-full ${userChoiceAnimation}`}>
                <img src={imageURL} alt="User Choice" className="w-45 h-auto mt-5" />
              </div>
            )}
            <h2 className="text-lg font-semibold mb-2">User Score</h2>
            <div className="bg-gray-200 bg-opacity-50 shadow-md rounded-md p-4 w-48 h-26 flex justify-center items-center">
              <p className="text-3xl font-bold">{userScore}</p>
            </div>
          </div>
        </div>

        {capitalizedOption && (
          <div className="flex justify-center">
            <div className="bg-blue-200 bg-opacity-50 shadow-md rounded-md p-4 mt-5 w-64">
              <h2 className="text-lg font-semibold">Selected Option</h2>
              <p className="text-3xl font-bold mt-2">{capitalizedOption}</p>
            </div>
          </div>
        )}
        {showWinnerPopout && winner && (
          <div className="flex justify-center fixed top-0 left-0 right-0 bottom-0 items-center">
            <div className="bg-green-200 bg-opacity-50 shadow-md rounded-md p-4 mt-5 w-64 xl:p-6"> {/* Add padding utility class here */}
              <p className="text-3xl font-bold mt-2">{winner}</p>
            </div>
          </div>
        )}


        <div className="flex-1 grid grid-cols-2 bg-transparent">
          <div></div>
          <div className="flex justify-center items-center bg-transparent">
            <div className="px-4 py-5 flex items-center">
              <button
                type="button"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => handleClick('Rock')}
                style={{ width: '100px', backgroundColor: '#424242' }} 
              >
                Rock
              </button>
              <button
                type="button"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => handleClick('Paper')}
                style={{ width: '100px', backgroundColor: '#424242' }} 
              >
                Paper
              </button>
              <button
                type="button"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => handleClick('Scissors')}
                style={{ width: '100px', backgroundColor: '#424242' }} 
              >
                Scissors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
