import { useEffect, useState } from "react";
import "../styles/preloader.scss";

const Preloader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(false), 7500);
    return () => window.clearTimeout(id);
  }, []);

  if (!visible) return null;

  return (
    <div id="colorWrapper" className="gemBlue">
      <div className="grid">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="cube">
            <div className="lifter">
              <div className="cube__face" />
              <div className="cube__face" />
              <div className="cube__face" />
            </div>
          </div>
        ))}
      </div>
      <div className="welcome-text">
        <h1>Welcome Explorer</h1>
      </div>
    </div>
  );
};

export default Preloader;