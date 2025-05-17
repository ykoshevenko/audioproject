import './App.css';
import { useState } from 'react';
import Header from './header';
import Auth from './auth'
import HomePage from './home';
import Search from './search';
import SoundSettings from './soundSett';

function App() {
  const [correct, setCorrect] = useState('component1')

  const renderComponents = () => {
      switch(correct) {
        case 'component1' :
          return <HomePage/>
        case 'component2':
          return <Auth setCorrect={setCorrect}/>
        case 'component3':
          return <Search/>
      }
  }

  return(
    <>
      <h1 className='title'>Название</h1>
      <Header setCorrect={setCorrect}/>
      {/* <News buttons={buttons} setButton={setButton}/> */}
      {renderComponents()}
      <SoundSettings/>
    </>
  )
}

export default App;

