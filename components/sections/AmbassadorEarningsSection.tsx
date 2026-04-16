"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Typography } from "@/components/ui/typography";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface EarningsData {
  months: number;
  tier1: { upfront: string; recurring: string; total: string };
  tier2: { upfront: string; recurring: string; total: string };
  tier3: { upfront: string; recurring: string; total: string };
}

const independentData: EarningsData[] = [
  { months: 3, tier1: { upfront: "$1,875", recurring: "$15", total: "$1,890" }, tier2: { upfront: "$3,750", recurring: "$62", total: "$3,812" }, tier3: { upfront: "$5,625", recurring: "$140", total: "$5,765" } },
  { months: 6, tier1: { upfront: "$1,875", recurring: "$39", total: "$1,914" }, tier2: { upfront: "$3,750", recurring: "$156", total: "$3,906" }, tier3: { upfront: "$5,625", recurring: "$351", total: "$5,976" } },
  { months: 12, tier1: { upfront: "$1,875", recurring: "$85", total: "$1,960" }, tier2: { upfront: "$3,750", recurring: "$343", total: "$4,093" }, tier3: { upfront: "$5,625", recurring: "$773", total: "$6,398" } },
];

const employedData: EarningsData[] = [
  { months: 3, tier1: { upfront: "$750", recurring: "$15", total: "$1,765" }, tier2: { upfront: "$1,500", recurring: "$62", total: "$2,562" }, tier3: { upfront: "$2,250", recurring: "$140", total: "$3,390" } },
  { months: 6, tier1: { upfront: "$750", recurring: "$39", total: "$1,789" }, tier2: { upfront: "$1,500", recurring: "$156", total: "$2,656" }, tier3: { upfront: "$2,250", recurring: "$351", total: "$3,601" } },
  { months: 12, tier1: { upfront: "$750", recurring: "$85", total: "$1,835" }, tier2: { upfront: "$1,500", recurring: "$343", total: "$2,843" }, tier3: { upfront: "$2,250", recurring: "$773", total: "$4,023" } },
];

function EarningsTable({
  data,
  type,
  upfrontPercent,
}: {
  data: EarningsData[];
  type: string;
  upfrontPercent: string;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] border border-[#2C2E33] rounded-xl overflow-hidden bg-[#0d1117]">
        <Table>
          <TableBody>
            {/* Header Row */}
            <TableRow className="border-b border-[#2C2E33] hover:bg-transparent">
              <TableCell
                rowSpan={data.length + 1}
                className="w-[60px] bg-white border-r border-[#2C2E33] p-0 align-middle"
              >
                <div className="relative h-full flex items-center justify-center py-6">
                  <span
                    className="text-black text-xs font-semibold tracking-wider uppercase whitespace-nowrap"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {type}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center text-white font-semibold bg-[#1a1b1e] border-r border-[#2C2E33]">
                Months
              </TableCell>
              <TableCell className="text-center p-0 text-white bg-[#1a1b1e] border-r border-[#2C2E33]" colSpan={3}>
                <div className="space-y-1 py-4">
                  <div className="font-semibold">Tier 1</div>
                  <div className="text-xs text-gray-400">(Minimum 10 Sales Per Month)</div>
                  <div className="grid grid-cols-3 gap-2 text-xs mt-2">
                    <div className="text-gray-400">Upfront<br />Commission<br />{upfrontPercent}</div>
                    <div className="text-gray-400">Recurring<br />Profit Share<br />1%</div>
                    <div className="font-semibold">Total<br />Monthly<br />Income</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center p-0 text-white bg-[#1a1b1e] border-r border-[#2C2E33]" colSpan={3}>
                <div className="space-y-1 py-4">
                  <div className="font-semibold">Tier 2</div>
                  <div className="text-xs text-gray-400">(Minimum 20 Sales Per Month)</div>
                  <div className="grid grid-cols-3 gap-2 text-xs mt-2">
                    <div className="text-gray-400">Upfront<br />Commission<br />{upfrontPercent}</div>
                    <div className="text-gray-400">Recurring<br />Profit Share<br />2%</div>
                    <div className="font-semibold">Total<br />Monthly<br />Income</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center p-0 text-white bg-[#1a1b1e]" colSpan={3}>
                <div className="space-y-1 py-4">
                  <div className="font-semibold">Tier 3</div>
                  <div className="text-xs text-gray-400">(Minimum 30 Sales Per Month)</div>
                  <div className="grid grid-cols-3 gap-2 text-xs mt-2">
                    <div className="text-gray-400">Upfront<br />Commission<br />{upfrontPercent}</div>
                    <div className="text-gray-400">Recurring<br />Profit Share<br />3%</div>
                    <div className="font-semibold">Total<br />Monthly<br />Income</div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            {/* Data Rows */}
            {data.map((row) => (
              <TableRow key={row.months} className="border-b border-[#2C2E33] hover:bg-[#1a1b1e]/50">
                <TableCell className="text-center text-white font-medium border-r border-[#2C2E33] py-5">
                  {row.months}
                </TableCell>
                <TableCell className="text-center text-gray-300 py-5">{row.tier1.upfront}</TableCell>
                <TableCell className="text-center text-gray-300 py-5">{row.tier1.recurring}</TableCell>
                <TableCell className="text-center text-white font-semibold border-r border-[#2C2E33] py-5">{row.tier1.total}</TableCell>
                <TableCell className="text-center text-gray-300 py-5">{row.tier2.upfront}</TableCell>
                <TableCell className="text-center text-gray-300 py-5">{row.tier2.recurring}</TableCell>
                <TableCell className="text-center text-white font-semibold border-r border-[#2C2E33] py-5">{row.tier2.total}</TableCell>
                <TableCell className="text-center text-gray-300 py-5">{row.tier3.upfront}</TableCell>
                <TableCell className="text-center text-gray-300 py-5">{row.tier3.recurring}</TableCell>
                <TableCell className="text-center text-white font-semibold py-5">{row.tier3.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function AmbassadorEarningsSection() {
  return (
    <section className="py-16 relative w-full">
      <SectionWrapper>
        <div className="mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <Typography variant="h3" className="text-white">
              Expected <span className="text-[#2A73EA]">Ambassador Earnings</span>
            </Typography>
            <Typography variant="p" className="text-gray-400 text-sm">
              Your Income Potential
            </Typography>
          </div>

          {/* Independent Ambassador Table */}
          <EarningsTable
            data={independentData}
            type="INDEPENDENT AMBASSADOR"
            upfrontPercent="25%"
          />

          <div className="text-center space-y-1">
            <Typography variant="p" className="text-white text-sm font-medium">
              Continuous Qualifying Criteria For Recurring Commission (Profit Share)
            </Typography>
            <Typography variant="p" className="text-gray-400 text-sm">
              Tier 1: $50,000 AUM - Tier 2: $100,000 AUM - Tier 3: $250,000 AUM
            </Typography>
          </div>

          {/* Employed Ambassador Table */}
          <EarningsTable
            data={employedData}
            type="EMPLOYED AMBASSADOR"
            upfrontPercent="10%"
          />
          
        </div>
      </SectionWrapper>
    </section>
  );
}
