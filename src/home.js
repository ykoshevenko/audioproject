import './home.css'
import ImageSound from './imageSound'
import SoundItem from './sounditem'
import axios from 'axios'
import { useState, useEffect } from 'react';

function HomePage() {
    const [audio, setAudio] = useState([])

    useEffect(()=>{
        const music = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get_song_streaming/')
                setAudio(response.data || [])
            } catch(err) {
                console.log(err)
            }
        }

        music()
    }, [])
    
    return (
        <div>
            <ImageSound/>
            <div className="scroll-list-home">
                {/* <ul>
                  {audio.length > 0 ? (
                    audio.map(item => (
                        <li key={item.id}>{item.title}</li>
                    ))
                ) : (
                    <div>Нет доступных треков</div>
                )}
                </ul> */}
            </div>
        </div>
    )
}

export default HomePage