import { getTranslations } from 'next-intl/server';
import { Typography } from '@/components/common/typography';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { BracketsOverlay } from './BracketsOverlay';

export async function HowItWorksSection() {
  const t = await getTranslations('howItWorks');

  const steps = [0, 1, 2, 3, 4].map(i => ({
    boldPart: t(`steps.${i}.bold`),
    normalPart: t(`steps.${i}.normal`)
  }));

  return (
    <SectionWrapper className="py-20 bg-[#181C25] z-10 relative">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Typography variant="h3">
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

              {/* Mobile: Independent Ambassador Header with Bracket */}
              <div className="lg:hidden mb-8 -ml-16">
                <div className="relative">
                  {/* Text on top */}
                  <Typography variant="h5" className="text-green-500 font-semibold text-center mb-2">
                    {t('brackets.0.title')}
                  </Typography>
                  {/* Bracket lines - square corners */}
                  <div className="relative h-8 border-t-2 border-l-2 border-r-2 border-green-500 mx-4" />
                </div>
              </div>

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
                  
                  {/* Connecting line to next step - only for steps 1, 2, and 4 */}
                  {(index === 0 || index === 1 || index === 3) && (
                    <div className="absolute -left-[calc(64px-27px)] top-[54px] w-px h-[calc(100%+40px)] bg-gray-600" />
                  )}

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

                  {/* Mobile: Salary Earners Header after step 3 with Bracket */}
                  {index === 2 && (
                    <div className="lg:hidden mt-8 -ml-16">
                      <div className="relative">
                        {/* Text on top */}
                        <Typography variant="h5" className="text-green-500 font-semibold text-center mb-2">
                          {t('brackets.1.title')}
                        </Typography>
                        {/* Bracket lines - square corners */}
                        <div className="relative border-t-2 border-l-2 border-r-2 border-green-500 mx-4 h-6 flex items-center justify-center">
                          {/* Subtitle inside bracket */}
                          <Typography variant="p" className="text-gray-500 text-sm bg-[#181C25] inline-block px-2 relative z-10">
                            {t('brackets.1.subtitle')}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Brackets (client component, no props) - Hidden on mobile */}
          <div className="hidden lg:block w-[160px] xl:w-[200px] relative shrink-0">
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