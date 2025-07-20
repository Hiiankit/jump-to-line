
import './App.css';
import React, { useRef, useState } from 'react';

function App() {
  const [text,setText] = useState("")
  const [jumpLine, setJumpLine] = useState("");
  const editorRef = useRef(null);
  const lineRef = useRef(null);
  const [highlight, sethightlight] = useState(null)
  
  const handleScroll= () =>{
    lineRef.current.scrollTop = editorRef.current.scrollTop;
  };

  const handleJump = () =>{
    const lines = text.split("\n");
    const lineHeight = 20;
    const lineNum = parseInt(jumpLine,10)

    if(!isNaN(lineNum) && lineNum >= 1 && lineNum <= lines.length){
      const scrollValue = (lineNum -1) * lineHeight;
      editorRef.current.scrollTop = scrollValue;
      lineRef.current.scrollTop = scrollValue;
      sethightlight(lineNum)

    }else{
      alert("invalid line number.")
    }
  };

  return (
  <div>
    <div>
      <input
        type='number'
        placeholder='Enter line Number'
        value={jumpLine}
        onChange={(e)=> setJumpLine(e.target.value)}
      />
      <button onClick={handleJump}>Jump</button>
    </div>
    <div style={{ display:"flex", height:"300px",border:"1px solid black"}}>
      <div ref={lineRef}
        style={
          {width:"20px",
            background: '#f0f0f0',
            overflow:"auto",
            textalign:"right",
            paddingRight:6,
            fontSize:14
          }
        }
      >

        {text.split("\n").map((_,i) =>(
          <div key={i} style={{
            height:20,
            background: highlight === i+1?"orange": "transparent"
          }}> 
            {i + 1}
          </div>
        ))}
      </div>

      <textarea 
        ref={editorRef}
        placeholder='start typing and press Enter for next line'
        value={text}
        onChange={(e)=> setText(e.target.value)}
        onScroll={(handleScroll)}
        style={{
          flex:1,
          height:"100%",
          padding:"5px 10px",
          fontFamily:'monospace',
          fontSize:14,
          lineHeight:"scroll",
          border:"none",
          outline:"none"

        }}
        />
    </div>
  </div>
  );
}

export default App;
