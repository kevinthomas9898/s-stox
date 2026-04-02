'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';

export default function SmartStoxVirtualCard() {
    const t = useTranslations('smartStoxVirtualCard');

    return (
        <div className="w-full py-16 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12">
                <Typography variant="h2" className="text-white normal-case">
                    {t('title_part1')}{' '}
                    <span className="text-[#0066FF]">{t('title_part2')}</span>
                </Typography>
                <div className="relative w-full max-w-2xl aspect-video">
                    <Image
                        src="/SmartStox-Virtual-Card.png"
                        alt={t('image_alt')}
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {/* Card 1 */}
                    <div className="bg-white rounded-xl p-8 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="h-12 mb-6 flex items-center justify-between w-full">
                                <div className="relative w-12 h-12">
                                    <Image src="/dollar.svg" alt="" fill className="object-contain" />
                                </div>
                                <span className="text-6xl font-bold text-gray-100">01</span>
                            </div>
                            <Typography variant="h4" className="text-gray-900 mb-2">
                                {t('card1_title')}
                            </Typography>
                            <div className="w-12 h-0.5 bg-[#00D094] mb-4"></div>
                            <Typography variant="p" className="text-gray-600">
                                {t('card1_description1')}
                            </Typography>
                            <Typography variant="p" className="text-gray-600 mt-2">
                                {t('card1_description2')}
                            </Typography>
                            <Typography variant="p" className="text-gray-600 mt-2">
                                {t('card1_description3')}
                            </Typography>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-xl p-8 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="h-12 mb-6 flex items-center justify-between w-full">
                                <div className="relative w-12 h-12">
                                    <Image src="/mobile_card.svg" alt="" fill className="object-contain" />
                                </div>
                                <span className="text-6xl font-bold text-gray-100">02</span>
                            </div>
                            <Typography variant="h4" className="text-gray-900 mb-2">
                                {t('card2_title')}
                            </Typography>
                            <div className="w-12 h-0.5 bg-[#00D094] mb-4"></div>
                            <Typography variant="p" className="text-gray-600">
                                {t('card2_description')}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
