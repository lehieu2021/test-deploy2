import React, { useMemo } from 'react';
import DataTable, { StatusBadge } from './DataTable';
import { getMockData } from '../data/mockData';
import type { DataRecord, Product, Customer, Supplier, Order, ColumnDefinition } from '../types';
import { SearchIcon } from './icons/Icons';

interface MainContentProps {
  activeView: string;
}

const viewConfig: { [key: string]: { title: string; subtitle: string } } = {
  home: { title: 'Trang chủ', subtitle: 'Tổng quan hệ thống Wecare.' },
  products: { title: 'Danh sách sản phẩm', subtitle: 'Quản lý toàn bộ sản phẩm trong kho.' },
  customers: { title: 'Danh sách khách hàng', subtitle: 'Quản lý thông tin và công nợ khách hàng.' },
  suppliers: { title: 'Danh sách nhà cung cấp', subtitle: 'Quản lý thông tin nhà cung cấp.' },
  orders: { title: 'Danh sách đơn hàng', subtitle: 'Theo dõi và xử lý đơn hàng.'},
  sales_report: { title: 'Báo cáo doanh số', subtitle: 'Phân tích hiệu quả kinh doanh.' },
  inventory_report: { title: 'Báo cáo tồn kho', subtitle: 'Theo dõi và dự báo hàng tồn kho.' },
};

const productColumns: ColumnDefinition<Product>[] = [
  { accessor: 'name', header: 'Tên sản phẩm' },
  { accessor: 'sku', header: 'Mã SKU' },
  { accessor: 'category', header: 'Nhóm sản phẩm' },
  { accessor: 'stock', header: 'Tồn kho' },
  { accessor: 'price', header: 'Đơn giá', render: (record) => `${(record as Product).price.toLocaleString()} VNĐ` },
];

const customerColumns: ColumnDefinition<Customer>[] = [
  { accessor: 'name', header: 'Tên khách hàng' },
  { accessor: 'type', header: 'Loại khách hàng' },
  { accessor: 'contactPerson', header: 'Người liên hệ' },
  { accessor: 'email', header: 'Email' },
  { accessor: 'debt', header: 'Công nợ', render: (record) => `${(record as Customer).debt.toLocaleString()} VNĐ` },
];

const supplierColumns: ColumnDefinition<Supplier>[] = [
    { accessor: 'name', header: 'Tên nhà cung cấp' },
    { accessor: 'region', header: 'Khu vực' },
    { accessor: 'contact', header: 'Liên hệ' },
    { accessor: 'product_groups', header: 'Số nhóm SP' },
];

const orderColumns: ColumnDefinition<Order>[] = [
    { accessor: 'id', header: 'Mã đơn hàng' },
    { accessor: 'customerName', header: 'Tên khách hàng' },
    { accessor: 'date', header: 'Ngày đặt' },
    { accessor: 'status', header: 'Trạng thái', render: (record) => <StatusBadge status={(record as Order).status}/> },
    { accessor: 'total', header: 'Tổng tiền', render: (record) => `${(record as Order).total.toLocaleString()} VNĐ` },
];


const getColumnDefinitions = (view: string) => {
    switch (view) {
      case 'products': return productColumns;
      case 'customers': return customerColumns;
      case 'suppliers': return supplierColumns;
      case 'orders': return orderColumns;
      default: return [];
    }
};

const MainContent: React.FC<MainContentProps> = ({ activeView }) => {
  const { title, subtitle } = viewConfig[activeView] || { title: 'Không tìm thấy', subtitle: '' };
  
  const data = useMemo<DataRecord[]>(() => getMockData(activeView), [activeView]);
  const columns = useMemo(() => getColumnDefinitions(activeView), [activeView]);

  return (
    <div className="flex-1 bg-white p-4 lg:p-6 overflow-y-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      
      <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Tìm kiếm trong chế độ xem này..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3899b4]"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        {/* Advanced filters could go here */}
      </div>

      {data.length > 0 && columns.length > 0 ? (
        <DataTable data={data} columns={columns as any} />
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">Chế độ xem đang được xây dựng</h3>
          <p className="text-sm text-gray-500 mt-1">Nội dung cho '{title}' sẽ sớm được cập nhật.</p>
        </div>
      )}
    </div>
  );
};

export default MainContent;