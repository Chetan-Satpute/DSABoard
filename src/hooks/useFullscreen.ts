import { useState, useLayoutEffect } from "react";

function useFullscreen(): [boolean, () => void] {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    if (fullscreen) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }

    setFullscreen(document.fullscreenElement !== null);
  };

  useLayoutEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return [fullscreen, toggleFullscreen];
}

export default useFullscreen;
