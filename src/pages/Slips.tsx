
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { mockData } from "@/services/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Slips = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: receipts, isLoading } = useQuery({
    queryKey: ['receipts'],
    queryFn: mockData.getReceipts
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(value);
  };

  const filteredReceipts = receipts?.filter(receipt => {
    const term = searchTerm.toLowerCase();
    return (
      receipt.receiptNumber.toLowerCase().includes(term) ||
      receipt.storeLocation.toLowerCase().includes(term) ||
      receipt.items.some(item => item.name.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-shoprite-dark">My Receipts</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search receipts..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="h-8 w-8 border-4 border-shoprite-red border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading receipts...</p>
          </div>
        </div>
      ) : (
        <Card className="shoprite-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              {filteredReceipts?.length} {filteredReceipts?.length === 1 ? "Receipt" : "Receipts"} Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Receipt #</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Store</th>
                    <th className="text-left py-3 px-4">Cashier</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-right py-3 px-4">Total</th>
                    <th className="text-center py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReceipts?.map((receipt) => (
                    <tr key={receipt.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/slip/${receipt.id}`)}>
                      <td className="py-4 px-4">{receipt.receiptNumber}</td>
                      <td className="py-4 px-4">
                        {new Date(receipt.date).toLocaleDateString('en-ZA')}
                      </td>
                      <td className="py-4 px-4">{receipt.storeLocation}</td>
                      <td className="py-4 px-4">{receipt.cashierName}</td>
                      <td className="py-4 px-4">{receipt.items.length} items</td>
                      <td className="py-4 px-4 text-right font-medium">{formatCurrency(receipt.total)}</td>
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/slip/${receipt.id}`);
                          }}
                          className="px-4 py-1.5 text-sm bg-shoprite-red text-white rounded hover:bg-red-600 transition-colors"
                        >
                          View Slip
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredReceipts?.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-500">
                        No receipts found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Slips;
