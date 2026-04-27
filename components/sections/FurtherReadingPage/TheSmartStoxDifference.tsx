import Image from "next/image";
import { Typography } from "@/components/common/typography";
import { SectionWrapper } from "@/components/common/SectionWrapper";

interface IconItemProps {
    src: string;
    label: string;
}

function IconItem({ src, label }: IconItemProps) {
    return (
        <div className="flex items-center gap-3">
            <Image src={src} alt={label} width={50} height={50} />
            <Typography variant="p" className="text-white/80">
                {label}
            </Typography>
        </div>
    );
}

interface TheSmartStoxDifferenceProps {
    items?: IconItemProps[];
}

const defaultItems = [
    { src: "/Consistency.svg", label: "Consistency" },
    { src: "/Discipline.svg", label: "Discipline" },
    { src: "/Risk_Control.svg", label: "Risk Control" },
    { src: "/Structured_Exposure.svg", label: "Structured Exposure" },
    { src: "/Compounding_Over_Time.svg", label: "Compounding Over Time" },
];

export function TheSmartStoxDifference({ items = defaultItems }: TheSmartStoxDifferenceProps) {
    return (
        <SectionWrapper className="py-20">
            <div className="mx-auto space-y-6">
                <Typography variant="h3">
                    What Actually Creates <span className="text-[#10D078]">Wealth?</span>
                </Typography>
                <Typography variant="p" className="text-white/80">
                    Wealth creation in markets has never been about prediction alone. It is about
                </Typography>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16">
                    {items.map((item) => (
                        <IconItem key={item.label} src={item.src} label={item.label} />
                    ))}
                </div>
            </div>
            <Typography variant="p" className="text-white/80 mt-10">
                Automation plays a powerful role because it eliminates one of the biggest destroyers of capital: human emotion. Fear closes positions too early. Greed increases leverage irresponsibly. Impatience overrides sound systems. Algorithms do not panic. They do not hesitate. They do not revenge trade. That emotional neutrality is powerful. But neutrality is not the same as intelligence. Automation must be supervised, recalibrated, and governed if it is to remain effective.
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                <div className="col-span-1 space-y-10">
                    <Typography variant="p" className="text-white/80">
                        This is where SmartStox positions itself differently from most “AI trading platforms.” SmartStox is not built on the assumption that automation alone is sufficient. It is built on a layered architecture:
                    </Typography>
                    
                    <ol className="list-decimal list-inside text-white/80">
                        <li><span className="text-white font-bold">AI-driven execution</span> ensures disciplined, rule-based trade implementation without emotional interference.</li>
                        <li><span className="text-white font-bold">Broker oversight</span> continuously monitors account exposure, margin health, and performance stability.</li>
                        <li><span className="text-white font-bold">Ongoing research and refinement</span> adapts the strategy to changing market conditions rather than allowing model decay.</li>
                        <li><span className="text-white font-bold">Structured treasury management</span> balances capital allocation and reinforces risk containment.</li>
                    </ol>

                    <Typography variant="p" className="text-white/80">
                        This hybrid structure matters. Because automation generates consistency. Oversight generates resilience. Research generates adaptability. Together, they create durability. And durability is what allows compounding to work.
                    </Typography>
                </div>
                <Image src="/computer_chart.png" alt="The SmartStox Difference" width={1000} height={1000} className="w-full h-auto col-span-2 px-20" />
            </div>
        </SectionWrapper>
    );
}