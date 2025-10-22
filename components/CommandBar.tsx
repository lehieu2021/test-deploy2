
import React from 'react';
import { 
  PlusIcon, 
  TrashIcon, 
  RefreshIcon, 
  FlowIcon, 
  ChartBarIcon, 
  ChevronDownIcon,
  ArrowLeftIcon,
  DocumentTextIcon
} from './icons/Icons';

interface CommandButtonProps {
  icon: React.ReactNode;
  label: string;
  hasDropdown?: boolean;
}

const CommandButton: React.FC<CommandButtonProps> = ({ icon, label, hasDropdown = false }) => (
  <button className="flex items-center bg-white hover:bg-[#F5F5F5] px-2.5 py-1.5 rounded text-sm text-gray-700 border border-transparent hover:border-gray-300 transition-all duration-150">
    {icon}
    <span className="ml-2">{label}</span>
    {hasDropdown && <ChevronDownIcon className="ml-1.5 w-4 h-4" />}
  </button>
);

interface CommandBarProps {
  activeView: string;
}

const CommandBar: React.FC<CommandBarProps> = ({ activeView }) => {
  return (
    <div className="h-12 w-full bg-white flex items-center px-4 border-b border-[#ECECEC] shadow-sm shrink-0">
      <div className="flex items-center space-x-2">
        <button className="p-1.5 rounded hover:bg-[#F5F5F5]">
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1"></div>
        <CommandButton icon={<PlusIcon className="w-5 h-5 text-green-600" />} label="New" />
        <CommandButton icon={<TrashIcon className="w-5 h-5 text-red-600" />} label="Delete" />
        <CommandButton icon={<RefreshIcon className="w-5 h-5 text-blue-600" />} label="Refresh" />
        <div className="w-px h-6 bg-gray-200 mx-1"></div>
        <CommandButton icon={<FlowIcon className="w-5 h-5 text-purple-600" />} label="Flow" hasDropdown />
        <CommandButton icon={<DocumentTextIcon className="w-5 h-5 text-gray-600" />} label="Run Report" hasDropdown />
        <CommandButton icon={<ChartBarIcon className="w-5 h-5 text-yellow-600" />} label="Show Chart" />
      </div>
    </div>
  );
};

export default CommandBar;
