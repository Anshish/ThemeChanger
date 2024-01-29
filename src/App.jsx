import { ChangeEvent, useState } from 'react'
import './App.css'

function App() {
  const [bgColor, setBgColor] = useState('')
  const [textColor,setTextColor]=useState('')

  const handleBgClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [bgColor],
      func: function(bgColor){
        if(bgColor!==""){
          document.body.style.backgroundColor = bgColor;
        }
      }
    });
  }

  const handleTextClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [textColor],
      func: function(textColor){
        if(textColor!==""){
          document.querySelectorAll('p,h1,h2,h2,li').forEach(element=>{
            element.style.color=textColor
          })
        }
      }
    });
  }

  

  return (
    <>
      <h1>Theme Changer</h1>
      <div className="card">
        <input 
          type="color" 
          value={bgColor} 
          onChange={(e)=>setBgColor(e.currentTarget.value)}
          className='bg-color-input'
        />
        <button 
          onClick={handleBgClick} 
          className='bg-color-button'
        >Change Background</button>

        <br />
        <hr />

        <input 
          type="color" 
          value={textColor} 
          onChange={(e)=>setTextColor(e.currentTarget.value)}
          className='text-color-input'
        />
        <button 
          onClick={handleTextClick}
          className='text-color-button'
        >Change Text</button>
      </div>
    </>
  )
}

export default App
