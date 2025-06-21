import './style/App.scss';
import { useState } from 'react';
import Header from './header';
import Auth from './auth'
import HomePage from './home';
import Search from './search';
import SoundSettings from './soundSett';
import User from './user';
import SoundInput from './inputSound';

function App() {
  const [correct, setCorrect] = useState('component1')
  const [authName, setAuthName] = useState(null)

  const renderComponents = () => {
      switch(correct) {
        case 'component1' :
          return <HomePage/>
        case 'component2':
          return <Auth setCorrect={setCorrect} setAuthName={setAuthName}/>
        case 'component3':
          return <Search/>
        case 'component4': 
          return <User setCorrect={setCorrect} authName={authName}/>
        case 'component5':
          return <SoundInput setAuthName={setAuthName}/>
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

