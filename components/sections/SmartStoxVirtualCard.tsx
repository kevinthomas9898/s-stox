'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SmartStoxVirtualCard() {
    const t = useTranslations('smartStoxVirtualCard');

    return (
        <div className="w-full py-16 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12">
                <h2 className="text-white text-3xl font-bold">
                    {t('title_part1')}{' '}
                    <span className="text-[#0066FF]">{t('title_part2')}</span>
                </h2>
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
                                <Image src="/dollar.svg" alt="" width={48} height={48} className="text-[#00D094]" />
                                <span className="text-6xl font-bold text-gray-100">01</span>
                            </div>
                            <h3 className="text-2xl font-semibold capitalize text-gray-900 mb-2">
                                {t('card1_title')}
                            </h3>
                            <div className="w-12 h-0.5 bg-[#00D094] mb-4"></div>
                            <p className="text-base font-normal text-gray-600 leading-relaxed">
                                {t('card1_description1')}
                            </p>
                            <p className="text-base font-normal text-gray-600 leading-relaxed mt-2">
                                {t('card1_description2')}
                            </p>
                            <p className="text-base font-normal text-gray-600 leading-relaxed mt-2">
                                {t('card1_description3')}
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-xl p-8 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="h-12 mb-6 flex items-center justify-between w-full">
                                <Image src="/mobile_card.svg" alt="" width={48} height={48} className="text-[#00D094]" />
                                <span className="text-6xl font-bold text-gray-100">02</span>
                            </div>
                            <h3 className="text-2xl font-semibold capitalize text-gray-900 mb-2">
                                {t('card2_title')}
                            </h3>
                            <div className="w-12 h-0.5 bg-[#00D094] mb-4"></div>
                            <p className="text-base font-normal text-gray-600 leading-relaxed">
                                {t('card2_description')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
