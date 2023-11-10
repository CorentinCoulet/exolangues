import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if(darkMode){
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleDarkModToggle = () => {
    setDarkMode(!darkMode);
  }

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
        <div>Where in the World ?</div>
        <button onClick={handleDarkModToggle}>
            <svg className='lightMoon' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.5532 13.815C9.66857 13.815 6.51929 10.9278 6.51929 7.36821C6.51929 6.0253 6.96679 4.78158 7.73143 3.75C4.69036 4.69515 2.5 7.33122 2.5 10.4381C2.5 14.3385 5.94929 17.5 10.2036 17.5C13.5929 17.5 16.4696 15.4932 17.5 12.7045C16.375 13.4048 15.0161 13.815 13.5532 13.815Z" fill="white"/>
            </svg>
            <svg className='darkMoon' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5532 13.815C9.66857 13.815 6.51929 10.9278 6.51929 7.36821C6.51929 6.0253 6.96679 4.78158 7.73143 3.75C4.69036 4.69515 2.5 7.33122 2.5 10.4381C2.5 14.3385 5.94929 17.5 10.2036 17.5C13.5929 17.5 16.4696 15.4932 17.5 12.7045C16.375 13.4048 15.0161 13.815 13.5532 13.815Z" fill="white" stroke="#111517" strokeWidth="1.25"/>
            </svg>
            <p>Dark Mode</p>
        </button>
    </nav>
  );
}

export default Navbar;