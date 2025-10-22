
import React, { useState } from 'react';
import { 
  HomeIcon, 
  ChevronDownIcon, 
  ChevronRightIcon,
  ChevronLeftIcon,
  CubeIcon,
  UserGroupIcon,
  TruckIcon,
  DocumentReportIcon,
  ShoppingCartIcon
} from './icons/Icons';

interface NavItemProps {
  label: string;
  viewId: string;
  icon: React.ReactNode;
  activeView: string;
  isCollapsed: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, viewId, icon, activeView, isCollapsed, onClick }) => {
  const isActive = activeView === viewId;
  return (
    <div
      onClick={onClick}
      className={`flex items-center cursor-pointer rounded-md transition-colors duration-150 relative
        ${isCollapsed ? 'justify-center py-2' : 'px-3 py-1.5'}
        ${isActive ? 'bg-[#e1f1f5] text-[#005a86] font-semibold' : 'hover:bg-gray-200 text-gray-700'}`}
    >
      <div className="w-5 h-5">{icon}</div>
      {!isCollapsed && <span className="ml-3 text-sm">{label}</span>}
      {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-[#3899b4] rounded-r-full"></div>}
       {isCollapsed && (
        <div className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-20 whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  );
};

interface NavGroupProps {
  title: string;
  isCollapsed: boolean;
  children: React.ReactNode;
}

const NavGroup: React.FC<NavGroupProps> = ({ title, isCollapsed, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="py-2">
      {!isCollapsed && (
        <div 
          className="flex justify-between items-center px-3 py-1 cursor-pointer text-xs font-bold text-gray-500 uppercase tracking-wider"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{title}</span>
          {isOpen ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
        </div>
      )}
      { (isOpen || isCollapsed) && <div className={`mt-1 ${isCollapsed ? 'space-y-2' : 'space-y-1'}`}>{children}</div> }
    </div>
  );
};


interface LeftPanelProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ activeView, setActiveView, isCollapsed, setIsCollapsed }) => {
    const navStructure = [
        {
            group: 'Vận hành',
            items: [
                { id: 'products', label: 'Sản phẩm', icon: <CubeIcon /> },
                { id: 'customers', label: 'Khách hàng', icon: <UserGroupIcon /> },
                { id: 'suppliers', label: 'Nhà cung cấp', icon: <TruckIcon /> },
                { id: 'orders', label: 'Đơn hàng', icon: <ShoppingCartIcon /> },
            ]
        },
        {
            group: 'Báo cáo',
            items: [
                { id: 'sales_report', label: 'Doanh số', icon: <DocumentReportIcon /> },
                { id: 'inventory_report', label: 'Tồn kho', icon: <DocumentReportIcon /> },
            ]
        }
    ];

  return (
    <aside className={`flex flex-col bg-[#F4F4F4] border-r border-solid border-[#ddd] transition-all duration-300 ease-in-out group ${isCollapsed ? 'w-16' : 'w-56'}`}>
      <div className={`flex-1 p-2`}>
        <NavItem
            label="Trang chủ"
            viewId="home"
            icon={<HomeIcon />}
            activeView={activeView}
            isCollapsed={isCollapsed}
            onClick={() => setActiveView('home')}
        />
        <div className="border-t border-gray-300 my-2"></div>
        
        {navStructure.map(group => (
            <NavGroup key={group.group} title={group.group} isCollapsed={isCollapsed}>
                 {group.items.map(item => (
                    <NavItem
                        key={item.id}
                        label={item.label}
                        viewId={item.id}
                        icon={item.icon}
                        activeView={activeView}
                        isCollapsed={isCollapsed}
                        onClick={() => setActiveView(item.id)}
                    />
                 ))}
            </NavGroup>
        ))}
      </div>
      <div className="p-2 border-t border-solid border-[#ddd]">
         <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-md hover:bg-gray-200 text-gray-600 transition-colors"
          >
           <ChevronLeftIcon className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
         </button>
      </div>
    </aside>
  );
};

export default LeftPanel;
