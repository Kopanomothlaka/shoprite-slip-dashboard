
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { mockData } from "@/services/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Receipt, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(value);
};

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: receipts, isLoading: isLoadingReceipts } = useQuery({
    queryKey: ['receipts'],
    queryFn: mockData.getReceipts,
  });

  const { data: dailySales, isLoading: isLoadingDailySales } = useQuery({
    queryKey: ['dailySales'],
    queryFn: mockData.getDailySales,
  });

  const { data: totalSales, isLoading: isLoadingTotalSales } = useQuery({
    queryKey: ['totalSales'],
    queryFn: mockData.getTotalSales,
  });

  const { data: topProducts, isLoading: isLoadingTopProducts } = useQuery({
    queryKey: ['topProducts'],
    queryFn: mockData.getTopSellingProducts,
  });

  const isLoading = isLoadingReceipts || isLoadingDailySales || isLoadingTotalSales || isLoadingTopProducts;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-shoprite-red border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const recentReceipts = receipts?.slice(0, 5) || [];
  
  // Format the daily sales data for the chart
  const chartData = dailySales?.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' }),
    sales: day.amount
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-shoprite-dark">Sales Dashboard</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/slips')}
            className="px-4 py-2 bg-shoprite-red text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <Receipt className="h-4 w-4" />
            View All Receipts
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shoprite-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSales || 0)}</div>
          </CardContent>
        </Card>
        
        <Card className="shoprite-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Receipts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receipts?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="shoprite-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Purchase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {receipts && receipts.length > 0
                ? formatCurrency(totalSales ? totalSales / receipts.length : 0)
                : formatCurrency(0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 shoprite-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-shoprite-red" />
              Daily Sales (Last 14 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    tickFormatter={(value) => `R${value/1000}k`} 
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Sales']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Bar dataKey="sales" fill="#ea384c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shoprite-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-shoprite-red" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts?.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">Qty: {product.quantity}</div>
                  </div>
                  <div className="font-semibold">{formatCurrency(product.revenue)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Receipts */}
      <Card className="shoprite-shadow">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Receipt className="h-5 w-5 text-shoprite-red" />
            Recent Receipts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Receipt #</th>
                  <th className="text-left py-3 px-2">Date</th>
                  <th className="text-left py-3 px-2">Store</th>
                  <th className="text-left py-3 px-2">Items</th>
                  <th className="text-right py-3 px-2">Total</th>
                  <th className="text-right py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReceipts.map((receipt) => (
                  <tr key={receipt.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">{receipt.receiptNumber}</td>
                    <td className="py-3 px-2">
                      {new Date(receipt.date).toLocaleDateString('en-ZA')}
                    </td>
                    <td className="py-3 px-2">{receipt.storeLocation}</td>
                    <td className="py-3 px-2">{receipt.items.length} items</td>
                    <td className="py-3 px-2 text-right">{formatCurrency(receipt.total)}</td>
                    <td className="py-3 px-2 text-right">
                      <button 
                        onClick={() => navigate(`/slip/${receipt.id}`)}
                        className="px-3 py-1 text-xs bg-shoprite-red text-white rounded hover:bg-red-600 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
