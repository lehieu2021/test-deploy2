import React, { useState } from 'react';
import type { DataRecord, ColumnDefinition, Order } from '../types';
import { ChevronUpIcon, ChevronDownIcon } from './icons/Icons';

// Moved from data/mockData.ts to fix JSX in .ts file error
export const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
    const colorMap = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Shipped: 'bg-blue-100 text-blue-800',
        Delivered: 'bg-green-100 text-green-800',
        Cancelled: 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorMap[status]}`}>{status}</span>
};

interface DataTableProps<T extends DataRecord> {
  data: T[];
  columns: ColumnDefinition<T>[];
}

const DataTable = <T extends DataRecord>({ data, columns }: DataTableProps<T>): React.ReactNode => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'ascending' | 'descending' } | null>(null);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };


  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(new Set(data.map(row => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const isAllSelected = selectedRows.size > 0 && selectedRows.size === data.length;
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < data.length;


  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#3899b4] focus:ring-[#3899b4]"
                  checked={isAllSelected}
                  ref={el => { if (el) { el.indeterminate = isIndeterminate; } }}
                  onChange={handleSelectAll}
                />
              </div>
            </th>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort(col.accessor)}
              >
                <div className="flex items-center">
                   <span>{col.header}</span>
                   <span className="ml-1">
                     {sortConfig?.key === col.accessor ? (
                        sortConfig.direction === 'ascending' ? <ChevronUpIcon className="w-4 h-4"/> : <ChevronDownIcon className="w-4 h-4"/>
                     ) : (
                        <ChevronUpIcon className="w-4 h-4 text-gray-300"/>
                     )}
                   </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row) => (
            <tr key={row.id} className={`transition-colors duration-150 ${selectedRows.has(row.id) ? 'bg-blue-50' : 'hover:bg-gray-100 hover:underline'}`}>
              <td className="p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#3899b4] focus:ring-[#3899b4]"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </div>
              </td>
              {columns.map((col) => (
                <td key={String(col.accessor)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {col.render ? col.render(row) : String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;