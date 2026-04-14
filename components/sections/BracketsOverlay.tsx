'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Typography } from '@/components/ui/typography';

export function BracketsOverlay({
    label1,
    label2,
    subtitle2,
}: {
    label1: string;
    label2: string;
    subtitle2: string;
}) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [b1, setB1] = useState({ top: 0, height: 0 });
    const [b2, setB2] = useState({ top: 0, height: 0 });

    const calculate = useCallback(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const stepsContainer = document.getElementById('how-it-works-steps');
        if (!stepsContainer) return;

        const firstSteps = stepsContainer.querySelectorAll('[data-bracket="first"]');
        const secondSteps = stepsContainer.querySelectorAll('[data-bracket="second"]');
        const firstEnd = stepsContainer.querySelector('[data-bracket-first-end="true"]');

        if (!firstSteps.length || !secondSteps.length || !firstEnd) return;

        const wrapperTop = wrapper.getBoundingClientRect().top;

        const first1 = firstSteps[0].getBoundingClientRect();
        // Use the marker div's top as the end of bracket 1 (before qualify text)
        const firstEndRect = firstEnd.getBoundingClientRect();

        const second1 = secondSteps[0].getBoundingClientRect();
        const second2 = secondSteps[secondSteps.length - 1].getBoundingClientRect();

        setB1({
            top: first1.top - wrapperTop,
            height: firstEndRect.top - first1.top, // ends before qualify text
        });

        setB2({
            top: second1.top - wrapperTop,
            height: second2.bottom - second1.top,
        });
    }, []);

    useEffect(() => {
        calculate();

        const observer = new ResizeObserver(calculate);
        const stepsContainer = document.getElementById('how-it-works-steps');
        if (stepsContainer) observer.observe(stepsContainer);
        window.addEventListener('resize', calculate);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', calculate);
        };
    }, [calculate]);

    return (
        <div ref={wrapperRef} className="relative w-full h-full">
            {/* Bracket 1 */}
            {b1.height > 0 && (
                <div className="absolute left-0" style={{ top: b1.top, height: b1.height }}>
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-green-500" />
                    <div className="absolute left-0 top-0 w-3 h-px bg-green-500" />
                    <div className="absolute left-0 bottom-0 w-3 h-px bg-green-500" />
                    <div className="absolute left-6 top-1/2 -translate-y-1/2">
                        <Typography
                            variant="h5"
                            className="text-green-500 font-semibold"
                            style={{ fontSize: '18px' }}
                        >
                            {label1}
                        </Typography>
                    </div>
                </div>
            )}

            {/* Bracket 2 */}
            {b2.height > 0 && (
                <div className="absolute left-0" style={{ top: b2.top, height: b2.height }}>
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-green-500" />
                    <div className="absolute left-0 top-0 w-3 h-px bg-green-500" />
                    <div className="absolute left-0 bottom-0 w-3 h-px bg-green-500" />
                    <div className="absolute left-6 top-1/2 -translate-y-1/2">
                        <Typography
                            variant="h5"
                            className="text-green-500 font-semibold whitespace-nowrap"
                            style={{ fontSize: '18px' }}
                        >
                            {label2}
                        </Typography>
                        <Typography variant="p" className="text-gray-500 mt-1 whitespace-nowrap">
                            {subtitle2}
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    );
}