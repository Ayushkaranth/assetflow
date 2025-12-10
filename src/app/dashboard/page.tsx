import { PortfolioHeader } from "@/components/dashboard/PortfolioHeader";
import { AssetTable } from "@/components/dashboard/AssetTable";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

export default function DashboardPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. The Header spans full width */}
      <PortfolioHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN (Main Content) */}
        <div className="lg:col-span-2 space-y-8">
           <PerformanceChart />
           <AssetTable />
        </div>

        {/* RIGHT COLUMN (Sidebar) */}
        <div className="lg:col-span-1">
           {/* Sticky ensures it stays visible while you scroll the table */}
           <div className="sticky top-24 space-y-8">
              <ActivityFeed />
              
              {/* Bonus: Invite Card to fill space */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="font-serif text-xl mb-2">Invite Friends</h3>
                    <p className="text-sm text-blue-100 mb-4">Earn 5% of their trading fees forever.</p>
                    <button className="w-full py-2 bg-white text-blue-600 font-bold rounded-lg text-xs hover:bg-blue-50 transition-colors">
                       Copy Invite Link
                    </button>
                 </div>
                 {/* Decor */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}