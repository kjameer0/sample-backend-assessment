import './App.css';
import Navbar from './Components/Navbar';
import Animes from './Components/Animes';
import NewAnime from './Components/NewAnime';
import Names from './Components/Names';
import CollectName from './Components/CollectName';

import { useState } from 'react';

function App() {
  const [userName, setUserName] = useState("")

  function changeUserName(updatedName) {
    setUserName(updatedName)
  }

  console.log(userName)
  return (
    <div className="App">
      <Navbar />


      {/* <CollectName updateName={changeUserName}/>

      <Names name={userName} /> */}

  
      <section className="anime-main">
        <Animes />
        <NewAnime />
      </section>
      {/* <NewAnime  */}
      {/* <Names name="Shaquala" />
      <Names name="Rose" /> */}

      <footer className='footer'>
        <h1 className='footer-title'>Review and Strengthen: Web Dev</h1>
        <section className='footer-section'>
          <div>
            <h1 className=''>My amazing students</h1>
            <ul className='footer-ul'>
              <li>Alvin</li>
              <li>Yulonda</li>
              <li>Randy</li>
              <li>Rubens</li>
              <li>Kenia</li>
              <li>Natalie</li>
              <li>Shaquala</li>
              <li>Rose</li>
            </ul>
          </div>
          <div>
            <h1>Jose Mejia</h1>
            <p>Github</p>
            <p>LinkedIn</p>
          </div>
        </section>
        <h1 className='footer-copyright'>All rights reserved, app made for educational purposes only</h1>
      </footer>
    </div>
  );
}

export default App;


