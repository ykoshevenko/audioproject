import './home.css'
import ImageSound from './imageSound'
import SoundItem from './sounditem'

function HomePage() {
    return (
        <div>
            <ImageSound/>
            <div className="scroll-list-home">
                <SoundItem/>
                <SoundItem/>
                <SoundItem/>
                <SoundItem/>
                <SoundItem/>
                <SoundItem/>
                <SoundItem/>
                <SoundItem/>
                <SoundItem/>
                <SoundItem/>
                <SoundItem/>
                <SoundItem/>
                <SoundItem/>
            </div>
        </div>
    )
}

export default HomePage