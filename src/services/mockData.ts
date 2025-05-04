
export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
};

export type Receipt = {
  id: string;
  date: string;
  storeLocation: string;
  cashierName: string;
  items: Product[];
  total: number;
  paymentMethod: string;
  receiptNumber: string;
};

export type DailySales = {
  date: string;
  amount: number;
};

// Generate mock products
const generateProducts = (): Product[] => {
  const products = [
    { name: "Milk 1L", category: "Dairy" },
    { name: "Bread (white)", category: "Bakery" },
    { name: "Eggs (dozen)", category: "Dairy" },
    { name: "Chicken Breast", category: "Meat" },
    { name: "Tomatoes 500g", category: "Produce" },
    { name: "Potatoes 1kg", category: "Produce" },
    { name: "Coca-Cola 2L", category: "Beverages" },
    { name: "Chocolate Bar", category: "Snacks" },
    { name: "Washing Powder", category: "Household" },
    { name: "Toilet Paper 9pk", category: "Household" },
    { name: "Toothpaste", category: "Personal Care" },
    { name: "Shampoo 400ml", category: "Personal Care" }
  ];

  return products.map((product, index) => ({
    id: `p${index + 1}`,
    name: product.name,
    price: parseFloat((Math.random() * 50 + 5).toFixed(2)),
    quantity: Math.floor(Math.random() * 5) + 1,
    category: product.category
  }));
};

// Generate a random date within the last 30 days
const getRandomDate = (daysAgo = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

// Generate mock receipts
const generateReceipts = (count = 15): Receipt[] => {
  const storeLocations = ["Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth"];
  const cashiers = ["John", "Sarah", "Michael", "Emily", "David"];
  const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Mobile Payment"];
  const receipts: Receipt[] = [];

  for (let i = 0; i < count; i++) {
    const items = generateProducts().slice(0, Math.floor(Math.random() * 8) + 2);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    receipts.push({
      id: `r${i + 1}`,
      date: getRandomDate(),
      storeLocation: storeLocations[Math.floor(Math.random() * storeLocations.length)],
      cashierName: cashiers[Math.floor(Math.random() * cashiers.length)],
      items,
      total: parseFloat(total.toFixed(2)),
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      receiptNumber: `SH-${Math.floor(10000 + Math.random() * 90000)}`
    });
  }

  return receipts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate daily sales data for the past 14 days
const generateDailySales = (): DailySales[] => {
  const sales: DailySales[] = [];
  const today = new Date();
  
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    sales.push({
      date: date.toISOString().split('T')[0],
      amount: parseFloat((Math.random() * 25000 + 15000).toFixed(2))
    });
  }
  
  return sales;
};

// Mock data
export const mockData = {
  receipts: generateReceipts(),
  dailySales: generateDailySales(),
  
  // Methods to simulate API calls
  getReceipts: () => Promise.resolve(mockData.receipts),
  getReceipt: (id: string) => Promise.resolve(mockData.receipts.find(r => r.id === id) || null),
  getDailySales: () => Promise.resolve(mockData.dailySales),
  
  // Get total sales for all receipts
  getTotalSales: () => {
    const total = mockData.receipts.reduce((sum, receipt) => sum + receipt.total, 0);
    return Promise.resolve(parseFloat(total.toFixed(2)));
  },
  
  // Get top selling products
  getTopSellingProducts: () => {
    const products: Record<string, { name: string; quantity: number; revenue: number }> = {};
    
    mockData.receipts.forEach(receipt => {
      receipt.items.forEach(item => {
        if (!products[item.id]) {
          products[item.id] = { name: item.name, quantity: 0, revenue: 0 };
        }
        products[item.id].quantity += item.quantity;
        products[item.id].revenue += item.price * item.quantity;
      });
    });
    
    return Promise.resolve(
      Object.values(products)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)
    );
  }
};
