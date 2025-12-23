"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CampaignProgressPage() {
  const router = useRouter();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8 font-display pb-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-brand-surface-light/10 text-brand-text-muted hover:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Campaign Progress
          </h1>
        </div>
        <div className="bg-brand-secondary/30 border border-brand-secondary p-1 rounded-lg flex items-center">
          <button className="px-4 py-1.5 text-sm font-medium rounded-md text-white/70 hover:text-white transition-colors">
            Day
          </button>
          <button className="px-4 py-1.5 text-sm font-bold rounded-md bg-brand-primary text-brand-bg shadow-lg">
            Week
          </button>
          <button className="px-4 py-1.5 text-sm font-medium rounded-md text-white/70 hover:text-white transition-colors">
            Month
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        {/* Main Stats Panel */}
        <div className="lg:col-span-5 bg-brand-surface/60 backdrop-blur-md border border-brand-secondary rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-all duration-700" />
          <div className="space-y-10 relative z-10">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-5xl font-light mb-1 text-white">450</div>
                <div className="text-sm text-gray-400 font-medium tracking-wide">
                  Total Clicks
                </div>
              </div>
              <div className="flex flex-col items-end pb-1">
                <svg
                  className="mb-1 text-brand-secondary/80"
                  fill="none"
                  height="24"
                  viewBox="0 0 60 24"
                  width="60">
                  <path
                    d="M0 20L10 18L20 22L30 10L40 14L50 5L60 0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <span className="text-brand-primary text-sm font-medium flex items-center">
                  ↑ 9.7%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-5xl font-light mb-1 text-white">38</div>
                <div className="text-sm text-gray-400 font-medium tracking-wide">
                  Total Pledges
                </div>
              </div>
              <div className="flex flex-col items-end pb-1">
                <svg
                  className="mb-1 text-brand-secondary/80"
                  fill="none"
                  height="24"
                  viewBox="0 0 60 24"
                  width="60">
                  <path
                    d="M0 22L15 20L30 15L45 10L60 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="text-brand-primary text-sm font-medium flex items-center">
                  ↑ 18.7%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <div className="flex flex-col justify-center gap-1">
                <h3 className="text-lg font-medium text-gray-300">
                  Conversion Rate
                </h3>
                <div className="mt-2 space-y-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Best: 12.3% at 2PM
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Worst: 4.2% at 5AM
                  </p>
                </div>
              </div>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    fill="transparent"
                    r="56"
                    stroke="var(--color-brand-surface)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    fill="transparent"
                    r="56"
                    strokeDasharray="351.8"
                    strokeDashoffset="70.36"
                    strokeLinecap="round"
                    strokeWidth="8"
                    className="text-brand-primary"
                    stroke="currentColor"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-white">80%</span>
                  <span className="text-[10px] text-gray-400 leading-tight">
                    Campaign <br /> Completion
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-brand-surface/60 backdrop-blur-md border border-brand-secondary rounded-2xl p-6 flex justify-between items-center group cursor-pointer hover:border-brand-primary/50 transition-colors">
            <div>
              <div className="text-xs text-gray-400 mb-1">Next Milestone</div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-medium text-white">MVP Release</h2>
                <span className="text-sm text-brand-mid-green bg-brand-secondary/30 px-2 py-0.5 rounded">
                  12 days remaining
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-secondary/30 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-bg transition-all">
              <span className="material-symbols-outlined text-sm">
                arrow_forward_ios
              </span>
            </div>
          </div>

          <div className="bg-brand-surface/60 backdrop-blur-md border border-brand-secondary rounded-2xl p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-gray-200">
                Affiliate Performance
              </h3>
              <div className="relative">
                <button className="text-xs bg-brand-secondary/50 text-gray-300 px-3 py-1.5 rounded flex items-center gap-1 hover:text-white transition-colors">
                  Sort By Pledges
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_drop_down
                  </span>
                </button>
              </div>
            </div>
            <div className="space-y-6">
              {[
                {
                  name: "TechInfluencer",
                  clicks: 280,
                  clicksGrowth: "12%",
                  pledges: 24,
                  pledgesGrowth: "15%",
                  chartPath: "M0 15 L20 18 L40 10 L60 12 L80 2",
                  stroke: "#5BAA77",
                },
                {
                  name: "StartupGuru",
                  clicks: 120,
                  clicksGrowth: "5%",
                  pledges: 10,
                  pledgesGrowth: "8%",
                  chartPath: "M0 10 L20 12 L40 15 L60 8 L80 5",
                  stroke: "#5BAA77",
                },
                {
                  name: "ProductHunter",
                  clicks: 50,
                  clicksGrowth: "-2%",
                  pledges: 4,
                  pledgesGrowth: "-1%",
                  chartPath: "M0 5 L20 8 L40 8 L60 12 L80 15",
                  stroke: "#5BAA77",
                  opacity: 0.5,
                },
              ].map((affiliate, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-12 gap-4 items-center ${idx > 0 ? "border-t border-brand-secondary/30 pt-4" : ""
                    }`}>
                  <div className="col-span-4">
                    <div className="font-medium text-sm text-white">
                      {affiliate.name}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {affiliate.clicks} clicks{" "}
                      <span
                        className={`ml-1 ${affiliate.clicksGrowth.startsWith("-")
                            ? "text-gray-500"
                            : "text-brand-primary"
                          }`}>
                        {affiliate.clicksGrowth.startsWith("-") ? "↓" : "↑"}{" "}
                        {affiliate.clicksGrowth.replace("-", "")}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-4 flex items-center justify-center">
                    <svg fill="none" height="20" viewBox="0 0 80 20" width="80">
                      <path
                        d={affiliate.chartPath}
                        stroke={affiliate.stroke}
                        strokeOpacity={affiliate.opacity || 1}
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  <div className="col-span-4 text-right">
                    <div className="text-sm font-medium text-white">
                      {affiliate.pledges} pledges
                    </div>
                    <div
                      className={`text-xs ${affiliate.pledgesGrowth.startsWith("-")
                          ? "text-gray-500"
                          : "text-brand-primary"
                        }`}>
                      {affiliate.pledgesGrowth.startsWith("-") ? "↓" : "↑"}{" "}
                      {affiliate.pledgesGrowth.replace("-", "")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-200">
            Customer Feedback
          </h2>
          <div className="bg-brand-secondary/30 border border-brand-secondary p-1 rounded-lg flex items-center">
            <button className="px-4 py-1 text-xs font-bold rounded bg-brand-primary text-brand-bg">
              Survey Results
            </button>
            <button className="px-4 py-1 text-xs font-medium rounded text-white/70 hover:text-white transition-colors">
              Comments
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-6">
              Why do you want this product?
            </h3>
            <div className="space-y-6">
              {[
                { label: "Solving Real Problem", value: 45, opacity: 1 },
                { label: "Innovative Solution", value: 30, opacity: 0.8 },
                { label: "Price Point", value: 15, opacity: 0.6 },
                { label: "Other", value: 10, opacity: 0.4 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="font-medium text-white">
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-brand-secondary/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-primary to-[#24724D] rounded-full"
                      style={{
                        width: `${item.value}%`,
                        opacity: item.opacity,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-6">
              How likely are you to recommend this?
            </h3>
            <div className="space-y-6">
              {[
                { label: "Very Likely", value: 55, opacity: 1 },
                { label: "Somewhat Likely", value: 25, opacity: 0.8 },
                { label: "Neutral", value: 15, opacity: 0.6 },
                { label: "Unlikely", value: 5, opacity: 0.4 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="font-medium text-white">
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-brand-secondary/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-primary to-[#24724D] rounded-full"
                      style={{
                        width: `${item.value}%`,
                        opacity: item.opacity,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 mt-12 text-sm text-gray-500 font-mono">
          <span className="cursor-pointer hover:text-white">&lt;</span>
          <span className="text-brand-primary border-b border-brand-primary font-bold pb-0.5">
            1
          </span>
          <span className="cursor-pointer hover:text-white">2</span>
          <span className="cursor-pointer hover:text-white">3</span>
          <span className="cursor-pointer hover:text-white">&gt;</span>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-200">Customer Data</h2>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-lg">
            Export CSV
          </button>
        </div>
        <div className="bg-brand-surface/50 border border-brand-secondary/30 rounded-2xl p-6 mb-6">
          <input
            className="w-full bg-brand-bg border border-brand-secondary rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none mb-6"
            placeholder="Search Customers"
            type="text"
          />
          <div className="flex flex-wrap gap-2">
            {[
              "Name/Email",
              "Pledge Amount",
              "Date",
              "Source",
              "Status",
              "Primary Use Case",
              "Company Size",
              "Industry",
              "Current Solution",
            ].map((filter) => (
              <button
                key={filter}
                className="px-3 py-1.5 bg-gray-600 text-xs text-white rounded-full">
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-brand-secondary/30 overflow-hidden bg-brand-surface/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-secondary/20 text-xs uppercase tracking-wider text-gray-400 font-medium">
                  <th className="p-4 font-medium min-w-[200px]">Name/Email</th>
                  <th className="p-4 font-medium">Pledge</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Source</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium min-w-[150px]">
                    Primary Use Case
                  </th>
                  <th className="p-4 font-medium">Company Size</th>
                  <th className="p-4 font-medium">Industry</th>
                  <th className="p-4 font-medium min-w-[150px]">
                    Current Solution
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-brand-secondary/30">
                {[1, 2, 3, 4, 5].map((row) => (
                  <tr
                    key={row}
                    className="hover:bg-brand-secondary/10 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-200">
                        Sarah Wilson
                      </div>
                      <div className="text-gray-500 text-xs">
                        sarah@startup.co
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">$29</td>
                    <td className="p-4 text-gray-300">2/9/2024</td>
                    <td className="p-4 text-gray-300">StartupGuru</td>
                    <td className="p-4">
                      <span className="bg-gray-600 text-white text-[10px] px-2.5 py-1 rounded-full font-medium">
                        Pending
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">Market Research</td>
                    <td className="p-4 text-gray-300">1-10</td>
                    <td className="p-4 text-gray-300">Ecommerce</td>
                    <td className="p-4 text-gray-300">Competitor X</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 flex items-center gap-4 text-gray-500 text-xs">
            <span className="cursor-pointer hover:text-white">◀</span>
            <div className="h-1 bg-gray-700 w-full rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-1/3 bg-gray-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
