import { Typography } from "@/components/common/typography";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import Image from "next/image";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations";

export function Knowledgebase() {
    const items = [
        {
            src: "/knowledgebase_1.png",
            text: "Could Automation Truly Make You Rich?",
        },
        {
            src: "/knowledgebase_2.png",
            text: "The Fatal Structural Weakness in Most AI Trading Platforms",
        },
        {
            src: "/knowledgebase_3.png",
            text: "Emotional Discipline Is the Most Underrated Advantage in Trading",
        },
        {
            src: "/knowledgebase_4.png",
            text: "Why Manual Trading Fails — And Why Most Bots Eventually Do Too",
        },
        {
            src: "/knowledgebase_5.png",
            text: "Time in the Market vs Timing the Market — A Structural Perspective",
        },
        {
            src: "/knowledgebase_6.png",
            text: "Risk Management Is Not Defensive - It Is Strategic",
        },
    ];

    return (
        <SectionWrapper className="pt-36 pb-20 mx-auto">
            <FadeIn direction="up" duration={0.5}>
                <Typography variant="h2" className="text-center mb-16">
                    Knowledgebase
                </Typography>
            </FadeIn>

            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <StaggerItem key={index}>
                        <div className="flex flex-col max-w-sm mx-auto">
                            <Image
                                src={item.src}
                                alt={`Knowledgebase ${index + 1}`}
                                width={400}
                                height={300}
                                className="rounded-lg w-full h-auto"
                            />
                            <Typography variant="p" className="mt-3">
                                {item.text}
                            </Typography>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </SectionWrapper>
    );
}