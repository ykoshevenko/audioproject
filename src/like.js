import './like.css'
import ImageSound from './imageSound';

function Like() {
    return (
        <>
            <ImageSound/>
            <div className="scroll-list">
                <h1>Песня 1</h1>
                <h1>Песня 2</h1>
                <h1>Песня 3</h1>
            </div>
        </>
    )
}

export default Like