import React, { useState } from 'react';
import UserList from './UserList';
import RelatorioList from './RelatorioList'; // Atualizado para o nome do componente correto
import Settings from './Settings';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('geral');

  const renderContent = () => {
    switch (activeTab) {
      case 'geral':
        return <div>Welcome to the Admin Panel. Select a tab to manage the system.</div>;
      case 'usuarios':
        return <UserList />;
      case 'relatorios':
        return <RelatorioList />; // Exibe a lista de relatórios com o nome atualizado
      case 'configuracoes':
        return <Settings />;
      default:
        return <div>Select a tab to view the content.</div>;
    }
  };

  return (
    <div className="admin-panel">
      <h1>System Administration</h1>
      <nav className="admin-nav">
        <button onClick={() => setActiveTab('geral')} className={activeTab === 'geral' ? 'active' : ''}>General</button>
        <button onClick={() => setActiveTab('usuarios')} className={activeTab === 'usuarios' ? 'active' : ''}>Users</button>
        <button onClick={() => setActiveTab('relatorios')} className={activeTab === 'relatorios' ? 'active' : ''}>Reports</button>
        <button onClick={() => setActiveTab('configuracoes')} className={activeTab === 'configuracoes' ? 'active' : ''}>Settings</button>
      </nav>
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
