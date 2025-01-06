import React from "react";
import Piano from "../components/piano/piano";
import PlaybackEditor from "../components/playback/playbackEditor";

const homePage: React.FC = () => {
    return (
        <div>
            <Piano />
            <PlaybackEditor />
        </div>
    );
};

export default homePage;