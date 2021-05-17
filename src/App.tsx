import React, { useState } from 'react';
import './App.css';

function App() {
  const [sentence, setSentence] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function addSentence() {
    try {
      checkIfValid(sentence);
      setText(state => state.concat(sentence + " "))
    } catch (error) {
      setError(error.message)
    } finally {
      setSentence("");
    }
  }
  return (
    <div className="App">
      <div>
        {text}
      </div>
      <label htmlFor="new-sentence" >
        Insert 3 words
        <input aria-label="new-sentence" onChange={e => setSentence(e.target.value)} value={sentence} />
      </label>
      <button onClick={addSentence} >Send</button>
      <div>
        {error}
      </div>
    </div>
  );
}

function checkIfValid(word: string): string {
  const regex = /(?:\w+\W*)/g;
  const a = word.match(regex);
  if (!a) throw new Error("Insert three words!")
  if (a.length < 3) throw new Error("Too few words!");
  else if (a.length > 3) throw new Error("Too many words!");
  else return (a[0]);

}

export default App;
