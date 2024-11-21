import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  };

  return (
    <div className="settings">
      <h2>Configurações</h2>
      <div className="settings-item">
        <label>
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          Modo Escuro
        </label>
      </div>
      <div className="settings-item">
        <label>
          Idioma:
          <select>
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Settings;
