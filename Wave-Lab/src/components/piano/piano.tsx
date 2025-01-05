import React from 'react';
import './Piano.css';

interface PianoKeyProps {
    id: string;
    isBlack: boolean;
}

const PianoKey: React.FC<PianoKeyProps> = ({ id, isBlack }) => {
    return <div id={id} className={isBlack ? 'black-key' : 'white-key'}></div>;
};

const Piano: React.FC = () => {
    const generateKeys = () => {
        const keys: JSX.Element[] = [];
        const notes = ['E', 'F', 'F-', 'G', 'G-', 'A', 'A-', 'B', 'C', 'C-', 'D', 'D-'];

        for (let octave = 1; octave <= 7; octave++) {
            for (const note of notes) {
                const isBlack = note.includes('-');
                const keyId = `${note}${octave}`;
                keys.push(<PianoKey key={keyId} id={keyId} isBlack={isBlack} />);
            }
        }
        return keys;
    };

    return <div className="Piano">{generateKeys()}</div>;
};

export default Piano;