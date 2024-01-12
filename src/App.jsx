import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(7);
  const [numericValueChecked, setNumericValueChecked] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_-+=<>?';

    let validChars = alphabet;

    if (numericValueChecked) {
      validChars += numbers;
    }

    if (specialCharAllowed) {
      validChars += specialChars;
    }

    let newPassword = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      newPassword += validChars.charAt(randomIndex);
    }

    setPassword(newPassword);
    setIsCopied(false); // Reset copy status
  }, [length, numericValueChecked, specialCharAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numericValueChecked, specialCharAllowed, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(password);
    inputRef.current?.select();
    setIsCopied(true);
  });

  return (
    <>
      <div className="password-container">
        <div className="password-holder">
          <input className="password-box" placeholder="Generate Password" type="text" ref={inputRef} readOnly value={password} />
          <button className="copyBtn" onClick={copyToClipboard}>
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="password-footer">
          <label className="childDep">
            <input type="range" value={length} min={5} max={30} onChange={(e) => setLength(e.target.value)} />
            Number: {length}
          </label>
          <label className="childDep">
            <input type="checkbox" checked={numericValueChecked} onChange={() => setNumericValueChecked((prevState) => !prevState)} />
            Number
          </label>
          <label className="childDep">
            <input type="checkbox" checked={specialCharAllowed} onChange={() => setSpecialCharAllowed((prevState) => !prevState)} />
            Special Char
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
