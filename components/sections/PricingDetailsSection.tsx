import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Typography } from "@/components/ui/typography";

interface DetailBlockProps {
  title: string;
  description: string;
  isTwoColumn?: boolean;
}

function DetailBlock({ title, description, isTwoColumn = false }: DetailBlockProps) {
  return (
    <div className={isTwoColumn ? "" : "mb-10"}>
      <Typography variant="h5" className="text-white font-semibold text-[16px] lg:text-[18px] mb-2">
        {title}
      </Typography>
      <Typography variant="p" className="text-gray-400 text-[14px] lg:text-[16px] leading-relaxed">
        {description}
      </Typography>
    </div>
  );
}

interface TwoColumnBlockProps {
  leftTitle: string;
  leftDescription: string;
  rightTitle: string;
  rightDescription: string;
}

function TwoColumnBlock({ leftTitle, leftDescription, rightTitle, rightDescription }: TwoColumnBlockProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-10 max-w-7xl mx-auto">
      <DetailBlock title={leftTitle} description={leftDescription} isTwoColumn />
      <DetailBlock title={rightTitle} description={rightDescription} isTwoColumn />
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <Typography variant="h5" className="text-white font-bold text-[18px] lg:text-[20px] mt-12 mb-6 uppercase tracking-wide">
      {title}
    </Typography>
  );
}

export function PricingDetailsSection() {
  return (
    <section className="py-16 relative w-full">
      <SectionWrapper containerClassName="max-w-full">
        <div className="mx-auto space-y-2">
          {/* Software-as-a-Service */}
          <SectionHeader title="Software-as-a-Service" />
          <DetailBlock
            title=""
            description="During your initial trial, you are paying for the use of the SmartStox Software, being $750 over 3 months, $25,000 Once-Off or $100,000 Once-Off, depending on your Engagement Tier. Software is only a tool, not an investment in itself."
          />

          {/* On-Going Fees */}
          <SectionHeader title="On-Going Fees" />
          <DetailBlock
            title=""
            description="After your trial period, you are paying a weekly percentage fee on your trading revenue in the calendar weeks that you have made profit, whilst your broker has utilised the SmartStox software."
          />

          {/* Two Column: Profit Share Fee / Bank Charges */}
          <TwoColumnBlock
            leftTitle="Profit Share Fee"
            leftDescription="After your trial period, you are paying an All Inclusive (Broker & SmartStox Fee) percentage fee on your Daily Trading Revenue, only if you make profit for that day, whilst your broker has utilised the SmartStox software platform to direct trades and treasury."
            rightTitle="Bank Charges"
            rightDescription="Pease notes that incoming remittances from Mastercard, VISA, SEPA, ApplePay or GooglePay to USDT, will attract Payment Processor Fees of 3.5% plus a 2% Cypto On-Ramping Fee. These top-ups are limited to EUR1,000 for KYC purposes."
          />

          {/* Two Column: Fee Charges / Funding Fee */}
          <TwoColumnBlock
            leftTitle="Fee Charges"
            leftDescription="During your software trial period, all fees are billed by SmartStox and is still covered by your Money-Back Guarantee. After your trial Period all fees are charged by your Broker."
            rightTitle="Funding Fee"
            rightDescription="We have found that many accounts could achieve multiplied results, should they be able to trade unrestricted by cashflow in the beginning weeks or months. For this reason, we have designed a funding mechanism, whereby SmartStox cover such cashflow requirements automatically, at a rate of 2% per day of money utilised."
          />

          {/* Initiation Fee */}
          <TwoColumnBlock
            leftTitle="Initiation Fee"
            leftDescription="In addition to your Profit Share Fee, a 20% initiation fee is billed on all new deposits."
            rightTitle=""
            rightDescription=""
          />

          {/* Trade-Automation */}
          <SectionHeader title="Trade-Automation" />
          <DetailBlock
            title=""
            description="SmartStox Automates trade execution according to your broker account rules. These are Customizable trading strategies with configurable parameters. SmartStox works with your existing licensed broker account."
          />

          {/* Control of Funds */}
          <DetailBlock
            title="Control of Funds"
            description="You, the Client maintain full control of your trading capital. Our SmartStox Software only executes trades on your broker account, and our software does not handle funds."
          />

          {/* Financial Advice */}
          <DetailBlock
            title="Financial Advice"
            description="SmartStox does not provide financial advice or guarantee profits."
          />

          {/* Trading Risks */}
          <DetailBlock
            title="Trading Risks"
            description="Trading involves significant risk and may not be suitable for all investors. You may lose some or all your capital."
          />

          {/* Past performance */}
          <DetailBlock
            title="Past performance, simulations, or backtests"
            description="Are for illustrative purposes only and are not indicative of future results. Historical backtests are simulations using past market data. They do not guarantee future results. Actual trading results may differ, and losses may occur. Backtests demonstrate historical performance of specific strategies. Past performance is not indicative of future results."
          />

          {/* General */}
          <SectionHeader title="General" />
          <DetailBlock
            title=""
            description="The SmartStox software provides automation and trading tools only; it does not manage your funds or provide financial advice. Use only with a licensed broker account. The software company does not guarantee profits or capital protection."
          />

          {/* Brokerage */}
          <DetailBlock
            title="Brokerage"
            description="The Moorehouse Group Limited offers reception and transmission of orders services on leveraged financial instruments with duly licenced regional brokers and liquidity providers who provides order execution services."
          />

          {/* Industry Losses */}
          <DetailBlock
            title="Industry Losses"
            description="Between 60-72 % of retail investor accounts lose money when trading CFDs. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money. No information on this site is investment advice or a solicitation to buy or sell any financial instrument."
          />

          {/* Performance-Based Fees */}
          <DetailBlock
            title="Performance-Based Fees"
            description="The SmartStox Platform works on a revenue share model, calculated each calendar or trading week. Fees are collected by your broker on behalf of SmartStox, by The Broker only deducting software performance fees from profits generated using the software in respect of a particular trading week."
          />

          {/* Subscription or License fees */}
          <DetailBlock
            title="Subscription or License fees"
            description="Any applicable software subscription fees, such as the $750 paid during your trial period, is independent of trading results."
          />

          {/* The Broker & SmartStox Partnership */}
          <DetailBlock
            title="The Broker & SmartStox Partnership"
            description="The SmartStox Software only interacts with licensed brokers and Client funds never go to SmartStox. Broker collects performance fees or subscription fees, remits payment for the SmartStox software to SmartStox."
          />

          {/* Broker Licensing & SmartStox */}
          <DetailBlock
            title="Broker Licensing & SmartStox"
            description="Each of the Brokers that utilises the SmartStox platform are duly licenced for their respected activities, within their jurisdiction. SmartStox only acts as an introducing entity and technology provider to the broker, and not a financial intermediary."
          />

          {/* Trade-Loss Compensation */}
          <DetailBlock
            title="Trade-Loss Compensation"
            description="In exceptional circumstances, SmartStox has historically provided compensation to a limited number of clients for operational errors. This is not indicative of future guarantees or obligations. All trading involves risk, and clients assume responsibility for their trading decisions. Past compensations were provided under exceptional conditions and do not imply a guarantee of future compensation. Trading involves risk, and losses may occur."
          />
        </div>
      </SectionWrapper>
    </section>
  );
}
