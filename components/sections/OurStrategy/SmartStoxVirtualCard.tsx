import Image from 'next/image';
import { Typography } from '@/components/common/typography';
import { getTranslations } from "next-intl/server";
import { SectionWrapper } from '@/components/common/SectionWrapper';

export default async function SmartStoxVirtualCard() {
    const t = await getTranslations('smartStoxVirtualCard');

    return (
        <SectionWrapper className="py-16">
            <div className="mx-auto flex flex-col items-center gap-12">
                <Typography variant="h2" className="text-white normal-case text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                    {t('title_part1')}{' '}
                    <span className="text-[#0066FF]">{t('title_part2')}</span>
                </Typography>
                <div className="relative w-full max-w-2xl aspect-video">
                    <Image
                        src="/SmartStox-Virtual-Card-1.png"
                        alt={t('image_alt')}
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {/* Card 1 */}
                    <div className="bg-white rounded-xl p-5 md:p-10 md:px-12 relative overflow-hidden flex flex-col h-full">
                        <div className="relative z-10 flex flex-col grow">
                            <div className="flex items-center justify-between mb-10">
                                <div className="relative w-12 h-12 md:w-20 md:h-20 mb-4">
                                    <Image src="/dollar.svg" alt="" fill className="object-contain" />
                                </div>
                                <span className="text-4xl md:text-8xl font-extrabold text-gray-100">01</span>
                            </div>
                            <div className="mb-3 md:mb-4">
                                <Typography variant="h5" className="text-gray-900 text-sm md:text-base font-semibold mb-2">
                                    {t('card1_title')}
                                </Typography>
                                <div className="w-12 h-1 bg-[#00D094]"></div>
                            </div>
                            <div className="space-y-7">
                                <Typography variant="p" className="text-[#99A0AE] !text-base md:text-sm leading-relaxed">
                                    {t('card1_description1')}
                                </Typography>
                                <Typography variant="p" className="text-[#99A0AE] !text-base md:text-sm leading-relaxed">
                                    {t('card1_description2')}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-xl p-5 md:p-10 md:px-12 relative overflow-hidden flex flex-col h-full">
                        <div className="relative z-10 flex flex-col grow">
                            <div className="flex items-center justify-between mb-10">
                                <div className="relative w-12 h-12 md:w-20 md:h-20 mb-4">
                                    <Image src="/mobile_card.svg" alt="" fill className="object-contain" />
                                </div>
                                <span className="text-4xl md:text-8xl font-extrabold text-gray-100">02</span>
                            </div>
                            <div className="mb-3 md:mb-4">
                                <Typography variant="h5" className="text-gray-900 text-sm md:text-base font-semibold mb-2">
                                    {t('card2_title')}
                                </Typography>
                                <div className="w-12 h-1 bg-[#00D094]"></div>
                            </div>
                            <div className="space-y-7">
                                <Typography variant="p" className="text-[#99A0AE] !text-base md:text-sm leading-relaxed">
                                    {t('card2_description1')}
                                </Typography>
                                <Typography variant="p" className="text-[#99A0AE] !text-base md:text-sm leading-relaxed">
                                    {t('card2_description2')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
