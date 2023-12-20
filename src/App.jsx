
// https://dictionaryapi.dev/

import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [font, setFont] = useState("Sans Serif");
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [speach, setSpeach] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [meaning, setMeaning] = useState(false);
  const [examples, setExamples] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [darkMode, setDarkMode] = useState("light");
  const [side, setSide] = useState("left")

  // const getSynonyms = async (word) => {
  //   try {
  //     const synonymsResponse = await axios.get(
  //       `https://api.datamuse.com/words?rel_syn=` + word
  //     );

  //     const synonymsData = synonymsResponse.data.map((item) => item.word);

  //     setSynonyms(synonymsData);
  //   } catch (error) {
  //     setSynonyms([]);
  //     console.error("Error fetching synonyms:", error);
  //   }
  // };

  


  const getData = async () => {
    try {

      const response = await axios.get(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + inputValue
      );

      const firstEntry = response.data[0];

      if (firstEntry && firstEntry.meanings && firstEntry.meanings.length > 0) {
        setDefinitions(firstEntry.meanings);
      } else {
        setDefinitions([]);
      }

      if (firstEntry && firstEntry.phonetics && firstEntry.phonetics.length > 0) {
        setPhonetic(firstEntry.phonetics[0].text);
      }
      else {
        setPhonetic("");
      }
      if (firstEntry.phonetics[0].audio) {
        const audio = new Audio(firstEntry.phonetics[0].audio);
        audio.play()
          .then(() => console.log("Audio played successfully"))
          .catch(error => console.error("Error playing audio:", error));
      }
      if (firstEntry && firstEntry.meanings[0] && firstEntry.meanings[0].definitions) {
        const firstMeaning = firstEntry.meanings[0];
        if (firstMeaning.definitions.length > 0) {
          setSpeach(firstMeaning.partOfSpeech);
          setExamples(firstMeaning.definitions[0].example || []);
        }
      } else {
        setSpeach("");
      }
      
    console.log(firstEntry)
    } catch (error) {
        setDefinitions([]);
        setPhonetic(false);
        setSpeach("");
        console.error("Error fetching data:", error);
    }
  };
  

  return (
    <div className={`w-full min-h-screen ${darkMode === "light" ? 'bg-[#FFF]' : 'bg-darkMode'}`}>
      <div className={`max-w-[737px] mx-auto`}>

        {/* Header */}

        <div className=" w-full h-[37px] flex justify-between items-center">

          <img src="./assets/images/logo.svg" alt="Logo" className='mt-[58px]'/>
          
          <div className="relative w-[253px] h-[full] flex items-center justify-between mt-[58px]">

            <div className="flex items-center hover:cursor-pointer" onClick={() => setBurgerMenu(true)}>
              <span className={`text-18px ${darkMode === "light" ? ' text-blackOne' : 'text-[#FFF]'}`}>{font}</span>
              <img src="./assets/images/icon-arrow-down.svg" alt="" className="ml-[16px]" />
            </div>

            <div className={`absolute w-[183px] h-[152px] rounded-[16px] bg-[#FFF] shadow-fontShadow top-[25px] left-[-70px] flex-col ${burgerMenu === false ? 'hidden' : 'flex'}`}>

              <span className=' hover:cursor-pointer' onClick={() => {
                setFont("Sans Serif")
                setBurgerMenu(false)
                }}>Sans Serif</span>

              <span className=' hover:cursor-pointer' onClick={() => {
                setFont("Serif")
                setBurgerMenu(false)
                }}>Serif</span>

              <span className=' hover:cursor-pointer' onClick={() => {
                setFont("Mono")
                setBurgerMenu(false)
                }}>Mono</span>

            </div>

            <div className={`w-[1px] h-[36px] ${darkMode === "light" ? 'bg-line' : ' bg-search'}`}></div>

            <div className="w-[80px] flex justify-between">

              <div className={`w-[40px] h-[20px] rounded-[10px] flex items-center hover:cursor-pointer ${darkMode === "light" ? 'bg-darkBtn' : 'bg-racxanairiPurple'}`}
               onClick={() => {
                if (darkMode === "light") {
                  setDarkMode("dark")
                } else {
                  setDarkMode("light")
                }
               }}>
                <div className={`w-[14px] h-[14px] bg-[#FFF] rounded-[50%] ${darkMode === "light" ? "ml-[3px]" : " ml-auto mr-[3px]"}`}></div>
              </div>

              <img src="./assets/images/icon-moon.svg" alt="Moon" className="" />

            </div>

          </div>

        </div>

        {/* Header */}

        <div>

          <div className={`max-w-[736px] h-[64px] flex justify-between items-center pl-[24px] pr-[24px] rounded-[16px] mt-[51px] ${darkMode === "light" ? 'bg-search' : 'bg-searchBg'}`}>

            <input className={`outline-none w-[95%] ${darkMode === "light" ? "bg-search text-blackOne" : "bg-searchBg text-[#FFF]"} ${font === "Sans Serif" ? 'font-lato' : font === "Serif" ? 'font-garamond' : 'font-roboto'}`}
            type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

            <img className='w-[16px] h-[16px]'
            src="./assets/images/icon-search.svg" alt="" onClick={() => {
              inputValue !== "" ? getData() : null;
            }} />

          </div>

          <div className={`w-[100%] h-[204px] mt-[132px] text-center ${phonetic === false ? 'block' : 'hidden'}`}>
            <p>😕</p>

            <h3 className={`text-blackOne mt-[44px] ${font === "Sans Serif" ? 'font-lato' : font === "Serif" ? 'font-garamond' : 'font-roboto'}`}>No Definitions Found</h3>

            <p className={`text-darkBtn mt-[24px] ${font === "Sans Serif" ? 'font-lato' : font === "Serif" ? 'font-garamond' : 'font-roboto'}`}>
              Sorry pal, we couldn't 
              find definitions for the word you were looking for. 
              You can try <br></br> the search again at later time or head to the web instead.</p>
          </div>

          <div className={phonetic === false ? 'hidden' : phonetic === "" ? 'hidden' : 'block'}>

            <div className={` w-full justify-between mt-[45px] flex`}>

              <div className="">
                <p className={`text-64px font-bold ${darkMode === "light" ? ' text-blackOne' : 'text-[#FFF]'} ${font === "Sans Serif" ? 'font-lato' : font === "Serif" ? 'font-garamond' : 'font-roboto'}`}>{inputValue}</p>

                <p className={`text-racxanairiPurple text-24px ${font === "Sans Serif" ? 'font-lato' : font === "Serif" ? 'font-garamond' : 'font-roboto'}`}>{phonetic}</p>
              </div>

              <img src="/assets/images/icon-play.svg" alt="" 
              onClick={() => {
                inputValue !== "" && getData();
              }} />

            </div>
            
           {definitions.length > 0 ? (
              <ul className="list-disc mt-[25px]">
                {definitions.map((meaning, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mt-[40px]">
                      <p className={`text-24px font-bold ${darkMode === "light" ? "text-blackOne" : "text-[#FFF]"} ${font === "Sans Serif" ? 'font-lato' : font === "Serif" ? 'font-garamond' : 'font-roboto'}`}>{meaning.partOfSpeech}</p>
                      <hr className="w-[90%] h-[1px] bg-line" />
                    </div>
                    <p className={`text-20px mt-[40px] ${darkMode === "light" ? 'text-darkBtn' : 'text-[#FFF]'} ${font === "Sans Serif" ? 'font-lato' : font === "Serif" ? 'font-garamond' : 'font-roboto'}`}>Meaning</p>
                    <ul className=' list-disc mt-[25px] flex flex-col gap-[13px]'>
                      {meaning.definitions.map((definition, index) => (
                        <li key={index} className={`text-16px ${darkMode === "light" ? 'text-darkBtn' : 'text-[#FFF]'} ${font === "Sans Serif" ? 'font-lato' : font === "Serif" ? 'font-garamond' : 'font-roboto'}`}>{definition.definition}
                        {definition.synonyms && definition.synonyms.length > 0 && (
                          <div className="mt-[10px] flex">
                            <p className={`text-darkBtn ${font === "Sans Serif" ? 'font-lato' : font === "Serif" ? 'font-garamond' : 'font-roboto'}`}>Synonyms:</p>
                            <ul className=" flex gap-[22px] ml-[22px]">
                              {definition.synonyms.map((synonym, sIdx) => (
                                <li key={sIdx} className={`text-16px text-racxanairiPurple ${font === "Sans Serif" ? 'font-lato' : font === "Serif" ? 'font-garamond' : 'font-roboto'}`}>
                                  {synonym}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        </li>
                      ))}
                      
                    {meaning.examples && meaning.examples.length > 0 && (
                      <ul className="">
                        {meaning.examples.map((example, eIdx) => (
                          <li key={eIdx} className={`text-16px text-red-600 ${font === "Sans Serif" ? 'font-lato' : font === "Serif" ? 'font-garamond' : 'font-roboto'}`}>
                            {example}
                          </li>
                        ))}
                      </ul>
                    )}
                    </ul>
                  </div>
                ))}
              </ul>
              
            ) : (
              <p className={`text-darkBtn mt-[25px] ${font === "Sans Serif" ? 'font-lato' : font === "Serif" ? 'font-garamond' : 'font-roboto'}`}>No definitions found.</p>
            )}

            

          </div>
        
        </div>


      </div>
    </div>
  )
}

export default App;

