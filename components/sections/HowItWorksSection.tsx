import { getTranslations } from 'next-intl/server';
import { Typography } from '@/components/ui/typography';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { BracketsOverlay } from './BracketsOverlay';

export async function HowItWorksSection() {
  const t = await getTranslations('howItWorks');

  const steps = [0, 1, 2, 3, 4].map(i => ({
    boldPart: t(`steps.${i}.bold`),
    normalPart: t(`steps.${i}.normal`)
  }));

  return (
    <SectionWrapper className="py-20 bg-[#181C25]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Typography variant="h3" className="text-white">
            {t('title').split('Works')[0]}
            <span className="text-[#2A73EA]">Works</span>
          </Typography>
          <Typography variant="h5" className="text-gray-400 mt-2">
            {t('subtitle')}
          </Typography>
        </div>

        {/* Timeline Container */}
        <div className="relative flex flex-row gap-8 lg:gap-12">
          {/* Left Side - Timeline */}
          <div className="flex-1 min-w-0">
            <div className="relative pl-16" id="how-it-works-steps">
              {/* Vertical connecting line */}
              <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gray-600" />

              {/* Steps */}
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative mb-10 last:mb-0"
                  data-bracket={index < 3 ? 'first' : 'second'}
                >
                  {/* Number circle */}
                  <div className="absolute -left-16 top-0 w-[54px] h-[54px] rounded-full border border-gray-500 flex items-center justify-center bg-[#181C25] z-10">
                    <span className="text-white text-xl font-semibold">{index + 1}</span>
                  </div>

                  {/* Content */}
                  <Typography variant="h5" className="text-gray-300 font-extralight">
                    <span className="text-white font-semibold">{step.boldPart}</span>{' '}
                    {step.normalPart}
                  </Typography>

                  {/* Marker BEFORE qualify text - bracket 1 ends here */}
                  {index === 2 && <div data-bracket-first-end="true" />}

                  {/* Blue text between step 3 and 4 */}
                  {index === 2 && (
                    <div className="my-8">
                      <Typography
                        variant="h5"
                        className="text-[#2A73EA]"
                        style={{ fontSize: '21px' }}
                      >
                        {t('qualifyText')}
                      </Typography>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Brackets (client component, no props) */}
          <div className="w-[160px] lg:w-[200px] relative shrink-0">
            <BracketsOverlay
              label1={t('brackets.0.title')}
              label2={t('brackets.1.title')}
              subtitle2={t('brackets.1.subtitle')}
            />
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-16 text-center">
        <Typography variant="h5" className="text-white -tracking-tighter">
          {t('bottomText')}
        </Typography>
      </div>
    </SectionWrapper>
  );
}