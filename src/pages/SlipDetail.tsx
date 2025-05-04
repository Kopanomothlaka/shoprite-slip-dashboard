
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { mockData } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText } from "lucide-react";

const SlipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: receipt, isLoading } = useQuery({
    queryKey: ['receipt', id],
    queryFn: () => mockData.getReceipt(id || ""),
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-shoprite-red border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Receipt Not Found</h2>
        <p className="text-gray-600 mb-6">The receipt you're looking for doesn't exist or has been deleted.</p>
        <Button
          onClick={() => navigate('/slips')} 
          variant="outline"
        >
          Back to Receipts
        </Button>
      </div>
    );
  }

  const receiptDate = new Date(receipt.date);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Button
          onClick={() => navigate(-1)} 
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="receipt-paper p-8 rounded-lg shoprite-shadow">
        <div className="receipt-edge -mt-8 mb-4"></div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-shoprite-red">SHOPRITE</h1>
          <p className="text-sm text-shoprite-dark">{receipt.storeLocation} Branch</p>
          <p className="text-xs text-gray-500 mt-1">Tel: (+27) 011 123 4567</p>
        </div>

        <div className="flex justify-between text-sm mb-6">
          <div>
            <div className="flex items-center gap-1 text-shoprite-dark">
              <Calendar className="h-4 w-4" />
              <span>{receiptDate.toLocaleDateString('en-ZA')}</span>
            </div>
            <div className="text-gray-500 mt-1">
              {receiptDate.toLocaleTimeString('en-ZA')}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-shoprite-dark">
              <FileText className="h-4 w-4" />
              <span>Receipt #{receipt.receiptNumber}</span>
            </div>
            <div className="text-gray-500 mt-1">
              Cashier: {receipt.cashierName}
            </div>
          </div>
        </div>

        <div className="border-t border-b border-dashed py-4 mb-4">
          <table className="w-full">
            <thead className="text-left">
              <tr className="text-xs text-gray-500 border-b">
                <th className="pb-2">ITEM</th>
                <th className="pb-2 text-center">QTY</th>
                <th className="pb-2 text-right">PRICE</th>
                <th className="pb-2 text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {receipt.items.map((item, index) => (
                <tr key={index} className="border-b border-dotted last:border-none">
                  <td className="py-2 pr-4">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.category}</div>
                  </td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                  <td className="py-2 text-right">{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-1 text-sm mb-6">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatCurrency(receipt.total)}</span>
          </div>
          <div className="flex justify-between">
            <span>VAT (15%):</span>
            <span>{formatCurrency(receipt.total * 0.15)}</span>
          </div>
          <div className="flex justify-between font-bold text-base mt-2">
            <span>Total:</span>
            <span>{formatCurrency(receipt.total)}</span>
          </div>
        </div>

        <div className="text-sm text-center border-t border-dashed pt-4">
          <p className="font-medium">Payment Method: {receipt.paymentMethod}</p>
          <p className="text-xs text-gray-500 mt-4">Thank you for shopping at Shoprite!</p>
          <p className="text-xs text-gray-500">Visit us again soon.</p>
        </div>

        <div className="receipt-edge mt-8"></div>
      </div>

      <div className="flex justify-center mt-6 gap-4">
        <Button variant="outline" className="w-32">
          Print Receipt
        </Button>
        <Button 
          className="bg-shoprite-red hover:bg-red-600 w-32"
          onClick={() => navigate('/slips')}
        >
          All Receipts
        </Button>
      </div>
    </div>
  );
};

export default SlipDetail;
