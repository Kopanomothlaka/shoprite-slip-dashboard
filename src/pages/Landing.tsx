
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Receipt, ShoppingCart, Calendar } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center">
      <div className="text-center space-y-6 max-w-3xl mx-auto px-4">
        <ShoppingCart className="h-20 w-20 mx-auto text-shoprite-red" />
        
        <h1 className="text-4xl md:text-5xl font-bold text-shoprite-dark">
          Your Shoprite Receipts Online
        </h1>
        
        <p className="text-xl text-gray-600">
          Access all your Shoprite shopping receipts, track your spending, and find your favorite products in one convenient place.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button 
            onClick={() => navigate('/slips')}
            size="lg"
            className="bg-shoprite-red hover:bg-red-600 text-white px-8"
          >
            <Receipt className="mr-2 h-5 w-5" />
            View My Receipts
          </Button>
          
          <Button 
            onClick={() => navigate('/dashboard')}
            variant="outline"
            size="lg"
            className="border-shoprite-red text-shoprite-red hover:bg-red-50 px-8"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Shopping Summary
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Receipt className="h-6 w-6 text-shoprite-red" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Paperless Receipts</h3>
            <p className="text-gray-600">Never lose another receipt. Access your complete shopping history online anytime.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
              <ShoppingCart className="h-6 w-6 text-shoprite-red" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Track Your Spending</h3>
            <p className="text-gray-600">Monitor your shopping habits and manage your budget more effectively.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Calendar className="h-6 w-6 text-shoprite-red" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Find Past Purchases</h3>
            <p className="text-gray-600">Easily locate previous purchases and their prices for better shopping planning.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
