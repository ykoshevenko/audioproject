import './App.css';
import News from './news'
import { useState } from 'react';
import Header from './header';
import Auth from './auth'

function App() {
  const [buttons, setButton] = useState(false)

  return(
    <>
      <Header setButton={setButton}/>
      <News buttons={buttons} setButton={setButton}/>
    </>
  )
}

export default App;
