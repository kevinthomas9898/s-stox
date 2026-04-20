import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Typography } from "@/components/ui/typography";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface PricingTermRow {
  label: string;
  subLabel?: string;
  isBold: boolean;
  consumer: string;
  hni: string;
  corporate: string;
}

const pricingData: PricingTermRow[] = [
  {
    label: "Software License Fee",
    isBold: true,
    consumer: "$750",
    hni: "$25,000",
    corporate: "$100,000",
  },
  {
    label: "Quoted Inclusive Daily Fees",
    subLabel: "(As a Percentage of Profit)",
    isBold: true,
    consumer: "25%",
    hni: "20%",
    corporate: "17.5%",
  },
  {
    label: "SaaS Trial Period",
    subLabel: "(100% Money-Back Guarantee)",
    isBold: true,
    consumer: "3 Months",
    hni: "3 Months",
    corporate: "3 Months",
  },
  {
    label: "Software Fee Lock-In Period",
    subLabel: "(Trail Period + Broker Managed)",
    isBold: true,
    consumer: "12 Months",
    hni: "6 Months",
    corporate: "3 Months",
  },
];

export function PricingTermsSection() {
  const rowCount = pricingData.length;

  return (
    <section className="pt-36 relative w-full">
      <SectionWrapper containerClassName="max-w-full">
        <div className="mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <Typography variant="h2" className="text-white">
              THE FINE <span className="text-[#2A73EA]">PRINT</span>
            </Typography>
            <Typography variant="h3" className="text-white text-[20px] md:text-[24px] lg:text-[28px]">
              Software-as-a-Service AI-Driven Trading Pricing Plans
            </Typography>
          </div>

          {/* Pricing Table */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[700px] border border-[#2C2E33] rounded-xl overflow-hidden bg-[#1a1b1e]">
              <Table>
                <TableBody>
                  {/* Header Row */}
                  <TableRow className="border-b border-[#2C2E33] hover:bg-transparent">
                    <TableCell
                      rowSpan={rowCount + 1}
                      className="w-[80px] bg-white p-0 align-middle"
                    >
                      <div className="relative h-full flex items-center justify-center py-6">
                        <Typography
                          variant="h4"
                          className="text-black text-[18px] md:text-[20px] lg:text-[22px]"
                          style={{
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                          }}
                        >
                          TERMS
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell className="bg-[#252830] py-4">
                    </TableCell>
                    <TableCell className="text-center text-white font-semibold bg-[#252830] py-4">
                      <Typography variant="h5" className="text-white text-[16px] lg:text-[18px]">
                        Consumer
                      </Typography>
                    </TableCell>
                    <TableCell className="text-center text-white font-semibold bg-[#252830] py-4">
                      <Typography variant="h5" className="text-white text-[16px] lg:text-[18px]">
                        HNI
                      </Typography>
                    </TableCell>
                    <TableCell className="text-center text-white font-semibold bg-[#252830] py-4">
                      <Typography variant="h5" className="text-white text-[16px] lg:text-[18px]">
                        Corporate
                      </Typography>
                    </TableCell>
                  </TableRow>

                  {/* Data Rows */}
                  {pricingData.map((row, index) => (
                    <TableRow
                      key={row.label}
                      className={`border-b border-[#2C2E33] hover:bg-[#252830]/50 ${
                        index === rowCount - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <TableCell className="py-6 px-6">
                        <Typography
                          variant="h5"
                          className={`text-white text-[14px] lg:text-[16px] ${
                            row.isBold ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {row.label}
                        </Typography>
                        {row.subLabel && (
                          <Typography variant="p" className="text-gray-400 text-[12px] lg:text-[14px] mt-1">
                            {row.subLabel}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell className="text-center text-gray-300 py-6">
                        <Typography variant="p" className="text-white text-[14px] lg:text-[16px]">
                          {row.consumer}
                        </Typography>
                      </TableCell>
                      <TableCell className="text-center text-gray-300 py-6">
                        <Typography variant="p" className="text-white text-[14px] lg:text-[16px]">
                          {row.hni}
                        </Typography>
                      </TableCell>
                      <TableCell className="text-center text-gray-300 py-6">
                        <Typography variant="p" className="text-white text-[14px] lg:text-[16px]">
                          {row.corporate}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Project Annual Returns Header */}
          <div className="text-center space-y-2 pt-8">
            <Typography variant="h3" className="text-white text-[28px] md:text-[32px] lg:text-[38px]">
              Project Annual Returns
            </Typography>
          </div>

          {/* Project Annual Returns Table */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[600px] border border-[#2C2E33] rounded-xl overflow-hidden bg-[#1a1b1e]">
              <Table className="table-fixed w-full">
                <TableBody>
                  {/* LOW Row */}
                  <TableRow className="border-b border-[#2C2E33] hover:bg-[#252830]/50">
                    <TableCell className="w-1/5 bg-white py-6 px-4 text-center">
                      <Typography variant="h5" className="text-black font-bold text-[16px] lg:text-[18px]">
                        LOW
                      </Typography>
                    </TableCell>
                    <TableCell className="w-1/5 py-6 px-6">
                      <Typography variant="p" className="text-white text-[14px] lg:text-[16px] font-medium">
                        Annual Net Return
                      </Typography>
                    </TableCell>
                    <TableCell className="w-1/5 text-center text-white py-6">
                      <Typography variant="p" className="text-white text-[14px] lg:text-[16px]">
                        75%
                      </Typography>
                    </TableCell>
                    <TableCell className="w-1/5 text-center text-white py-6">
                      <Typography variant="p" className="text-white text-[14px] lg:text-[16px]">
                        105%
                      </Typography>
                    </TableCell>
                    <TableCell className="w-1/5 text-center text-white py-6">
                      <Typography variant="p" className="text-white text-[14px] lg:text-[16px]">
                        120%
                      </Typography>
                    </TableCell>
                  </TableRow>

                  {/* EXPECTED Row */}
                  <TableRow className="border-b border-[#2C2E33] hover:bg-[#252830]/50">
                    <TableCell className="w-1/5 bg-white py-6 px-4 text-center">
                      <Typography variant="h5" className="text-black font-bold text-[16px] lg:text-[18px]">
                        EXPECTED
                      </Typography>
                    </TableCell>
                    <TableCell className="w-1/5 py-6 px-6">
                      <Typography variant="p" className="text-white text-[14px] lg:text-[16px] font-medium">
                        Annual Net Return
                      </Typography>
                    </TableCell>
                    <TableCell className="w-1/5 text-center text-white py-6">
                      <Typography variant="p" className="text-white text-[14px] lg:text-[16px]">
                        125%
                      </Typography>
                    </TableCell>
                    <TableCell className="w-1/5 text-center text-white py-6">
                      <Typography variant="p" className="text-white text-[14px] lg:text-[16px]">
                        175%
                      </Typography>
                    </TableCell>
                    <TableCell className="w-1/5 text-center text-white py-6">
                      <Typography variant="p" className="text-white text-[14px] lg:text-[16px]">
                        200%
                      </Typography>
                    </TableCell>
                  </TableRow>

                  {/* HIGH Row */}
                  <TableRow className="hover:bg-[#252830]/50">
                    <TableCell className="w-1/5 bg-white py-6 px-4 text-center">
                      <Typography variant="h5" className="text-black font-bold text-[16px] lg:text-[18px]">
                        HIGH
                      </Typography>
                    </TableCell>
                    <TableCell className="w-1/5 py-6 px-6">
                      <Typography variant="p" className="text-white text-[14px] lg:text-[16px] font-medium">
                        Annual Net Return
                      </Typography>
                    </TableCell>
                    <TableCell className="w-1/5 text-center text-white py-6">
                      <Typography variant="p" className="text-white text-[14px] lg:text-[16px]">
                        200%
                      </Typography>
                    </TableCell>
                    <TableCell className="w-1/5 text-center text-white py-6">
                      <Typography variant="p" className="text-white text-[14px] lg:text-[16px]">
                        280%
                      </Typography>
                    </TableCell>
                    <TableCell className="w-1/5 text-center text-white py-6">
                      <Typography variant="p" className="text-white text-[14px] lg:text-[16px]">
                        320%
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
