import type { Product, Customer, Supplier, Order, DataRecord } from '../types';

const products: Product[] = [
  { id: 'PROD001', name: 'Bu lông lục giác M10', sku: 'BL-M10-LG', category: 'Bu lông', stock: 1500, price: 500 },
  { id: 'PROD002', name: 'Băng keo trong 5cm', sku: 'BK-5CM-TR', category: 'Băng keo', stock: 800, price: 8000 },
  { id: 'PROD003', name: 'Dây rút nhựa 20cm', sku: 'DR-20CM-NH', category: 'Dây rút', stock: 12000, price: 150 },
  { id: 'PROD004', name: 'Hóa chất tẩy rửa R5', sku: 'HC-R5-TR', category: 'Hóa chất', stock: 120, price: 150000 },
  { id: 'PROD005', name: 'Vít bắn tôn M5', sku: 'VT-M5-BT', category: 'Ốc vít', stock: 5500, price: 300 },
  { id: 'PROD006', name: 'Sơn xịt ATM Đỏ', sku: 'SX-ATM-DO', category: 'Hóa chất', stock: 350, price: 32000 },
];

const customers: Customer[] = [
  { id: 'CUST001', name: 'Kim khí tổng hợp Minh Anh', type: 'Cửa hàng kim khí', contactPerson: 'Nguyễn Văn A', email: 'minhanh@gmail.com', phone: '0901234567', debt: 15000000 },
  { id: 'CUST002', name: 'Nhà máy chế tạo cơ khí An Phát', type: 'Nhà máy', contactPerson: 'Trần Thị B', email: 'anphat@factory.com', phone: '0912345678', debt: 125500000 },
  { id: 'CUST003', name: 'Điện nước dân dụng Hoàng Long', type: 'Điện nước', contactPerson: 'Lê Văn C', email: 'hoanglong@diennuoc.vn', phone: '0987654321', debt: 5250000 },
  { id: 'CUST004', name: 'Công ty Xây dựng Hòa Bình', type: 'Nhà máy', contactPerson: 'Phạm Thị D', email: 'd.pham@hoabinh.com', phone: '0934567890', debt: 0 },
];

const suppliers: Supplier[] = [
    { id: 'SUP001', name: 'Công ty TNHH Bu Lông Sài Gòn', region: 'Miền Nam', contact: 'Mr. Hùng', product_groups: 5 },
    { id: 'SUP002', name: 'Guangzhou Fasteners Co.', region: 'Trung Quốc', contact: 'Ms. Li', product_groups: 12 },
    { id: 'SUP003', name: 'Nhà máy Hóa chất Việt Trì', region: 'Miền Bắc', contact: 'Mrs. Lan', product_groups: 2 },
    { id: 'SUP004', name: 'Đại lý Băng keo Long An', region: 'Miền Nam', contact: 'Mr. Tâm', product_groups: 3 },
];

const orders: Order[] = [
    { id: 'ORD001', customerName: 'Kim khí tổng hợp Minh Anh', date: '2023-10-26', status: 'Delivered', total: 7500000 },
    { id: 'ORD002', customerName: 'Nhà máy chế tạo cơ khí An Phát', date: '2023-10-25', status: 'Shipped', total: 42000000 },
    { id: 'ORD003', customerName: 'Điện nước dân dụng Hoàng Long', date: '2023-10-27', status: 'Pending', total: 3100000 },
    { id: 'ORD004', customerName: 'Công ty Xây dựng Hòa Bình', date: '2023-10-22', status: 'Cancelled', total: 12000000 },
];

export const getMockData = (view: string): DataRecord[] => {
  switch (view) {
    case 'products': return products;
    case 'customers': return customers;
    case 'suppliers': return suppliers;
    case 'orders': return orders;
    default: return [];
  }
};
