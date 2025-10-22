
import React, { useState } from 'react';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import CommandBar from './components/CommandBar';
import MainContent from './components/MainContent';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('products');
  const [isPanelCollapsed, setIsPanelCollapsed] = useState<boolean>(false);

  return (
    <div className="h-screen w-screen flex flex-col bg-white overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel
          activeView={activeView}
          setActiveView={setActiveView}
          isCollapsed={isPanelCollapsed}
          setIsCollapsed={setIsPanelCollapsed}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <CommandBar activeView={activeView} />
          <MainContent activeView={activeView} />
        </main>
      </div>
    </div>
  );
};

export default App;
