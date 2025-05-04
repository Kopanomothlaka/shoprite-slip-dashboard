
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 bg-shoprite-red text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <ShoppingCart className="h-6 w-6" />
          <h1 className="text-xl font-bold">Shoprite Receipts</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
          >
            Dashboard
          </button>
          
          <button 
            onClick={() => navigate('/slips')}
            className="px-4 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
          >
            My Slips
          </button>
        </div>
      </div>
    </header>
  );
}
