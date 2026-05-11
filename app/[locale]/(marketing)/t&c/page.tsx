import { useTranslations } from 'next-intl';
import { TermsDocument } from '@/components/sections/Common/TermsSection';
import { SectionWrapper } from '@/components/common/SectionWrapper';

export default function TermsAndConditionsPage() {
  const t = useTranslations('termsOfService');

  const termsSections = [
    {
      id: 'parties',
      title: t('parties.title'),
      content: [t('parties.content')]
    },
    {
      id: 'nature-of-service',
      title: t('natureOfService.title'),
      subsections: [
        {
          id: '2.1',
          title: t('natureOfService.acknowledges.title'),
          content: t.raw('natureOfService.acknowledges.items') as string[]
        },
        {
          id: '2.2',
          title: t('natureOfService.software.title'),
          content: t.raw('natureOfService.software.items') as string[]
        }
      ]
    },
    {
      id: 'saas-trial',
      title: t('saasTrial.title'),
      subsections: [
        {
          id: '3.1',
          title: t('saasTrial.trialPeriod')
        },
        {
          id: '3.2',
          title: t('saasTrial.during.title'),
          content: t.raw('saasTrial.during.items') as string[]
        },
        {
          id: '3.3',
          title: t('saasTrial.acknowledges.title'),
          content: t.raw('saasTrial.acknowledges.items') as string[]
        }
      ]
    },
    {
      id: 'end-of-trial',
      title: t('endOfTrial.title'),
      subsections: [
        {
          id: '4.1',
          title: t('endOfTrial.election.title'),
          content: t.raw('endOfTrial.election.items') as string[]
        },
        {
          id: '4.2',
          title: t('endOfTrial.acknowledges.title'),
          content: t.raw('endOfTrial.acknowledges.items') as string[]
        }
      ]
    },
    {
      id: 'transition-to-live',
      title: t('transitionToLive.title'),
      subsections: [
        {
          id: '5.1',
          title: t('transitionToLive.elects.title'),
          content: t.raw('transitionToLive.elects.items') as string[]
        },
        {
          id: '5.2',
          title: t('transitionToLive.smartStoxShall.title'),
          content: t.raw('transitionToLive.smartStoxShall.items') as string[]
        }
      ]
    },
    {
      id: 'trade-automation',
      title: t('tradeAutomation.title'),
      subsections: [
        {
          id: '6.1',
          title: t('tradeAutomation.platformEnables.title'),
          content: t.raw('tradeAutomation.platformEnables.items') as string[]
        },
        {
          id: '6.2',
          title: t('tradeAutomation.acknowledges.title'),
          content: t.raw('tradeAutomation.acknowledges.items') as string[]
        }
      ]
    },
    {
      id: 'control-of-funds',
      title: t('controlOfFunds.title'),
      subsections: [
        {
          id: '7.1',
          title: t('controlOfFunds.retainsControl')
        },
        {
          id: '7.2',
          title: t('controlOfFunds.acknowledges.title'),
          content: t.raw('controlOfFunds.acknowledges.items') as string[]
        }
      ]
    },
    {
      id: 'ongoing-fees',
      title: t('ongoingFees.title'),
      subsections: [
        {
          id: '8.1',
          title: t('ongoingFees.agrees.title'),
          content: t.raw('ongoingFees.agrees.items') as string[]
        },
        {
          id: '8.2',
          title: t('ongoingFees.furtherAgrees.title'),
          content: t.raw('ongoingFees.furtherAgrees.items') as string[]
        }
      ]
    },
    {
      id: 'brokerage-relationship',
      title: t('brokerageRelationship.title'),
      subsections: [
        {
          id: '9.1',
          title: t('brokerageRelationship.providedExclusively')
        },
        {
          id: '9.2',
          title: t('brokerageRelationship.acknowledges.title'),
          content: t.raw('brokerageRelationship.acknowledges.items') as string[]
        },
        {
          id: '9.3',
          title: t('brokerageRelationship.furtherAcknowledges.title'),
          content: t.raw('brokerageRelationship.furtherAcknowledges.items') as string[]
        }
      ]
    },
    {
      id: 'financial-advice',
      title: t('financialAdvice.title'),
      subsections: [
        {
          id: '10.1',
          title: t('financialAdvice.doesNotProvide.title'),
          content: t.raw('financialAdvice.doesNotProvide.items') as string[]
        },
        {
          id: '10.2',
          title: t('financialAdvice.noInformation.title'),
          content: t.raw('financialAdvice.noInformation.items') as string[]
        }
      ]
    },
    {
      id: 'risk-disclosure',
      title: t('riskDisclosure.title'),
      subsections: [
        {
          id: '11.1',
          title: t('riskDisclosure.acknowledges.title'),
          content: t.raw('riskDisclosure.acknowledges.items') as string[]
        },
        {
          id: '11.2',
          title: t('riskDisclosure.confirms.title'),
          content: t.raw('riskDisclosure.confirms.items') as string[]
        }
      ]
    },
    {
      id: 'performance-disclaimers',
      title: t('performanceDisclaimers.title'),
      subsections: [
        {
          id: '12.1',
          title: t('performanceDisclaimers.pastPerformance.title'),
          content: t.raw('performanceDisclaimers.pastPerformance.items') as string[]
        },
        {
          id: '12.2',
          title: t('performanceDisclaimers.backTests.title'),
          content: t.raw('performanceDisclaimers.backTests.items') as string[]
        },
        {
          id: '12.3',
          title: t('performanceDisclaimers.actualResults.title'),
          content: t.raw('performanceDisclaimers.actualResults.items') as string[]
        }
      ]
    },
    {
      id: 'general-limitations',
      title: t('generalLimitations.title'),
      subsections: [
        {
          id: '13.1',
          title: t('generalLimitations.acknowledges.title'),
          content: t.raw('generalLimitations.acknowledges.items') as string[]
        }
      ]
    },
    {
      id: 'broker-licensing',
      title: t('brokerLicensing.title'),
      subsections: [
        {
          id: '14.1',
          title: t('brokerLicensing.allBrokers.title'),
          content: t.raw('brokerLicensing.allBrokers.items') as string[]
        },
        {
          id: '14.2',
          title: t('brokerLicensing.actsSolely.title'),
          content: t.raw('brokerLicensing.actsSolely.items') as string[]
        }
      ]
    },
    {
      id: 'trade-loss-compensation',
      title: t('tradeLossCompensation.title'),
      subsections: [
        {
          id: '15.1',
          title: t('tradeLossCompensation.mayProvide.title'),
          content: t.raw('tradeLossCompensation.mayProvide.items') as string[]
        },
        {
          id: '15.2',
          title: t('tradeLossCompensation.suchCompensation.title'),
          content: t.raw('tradeLossCompensation.suchCompensation.items') as string[]
        }
      ]
    },
    {
      id: 'payment-fees',
      title: t('paymentFees.title'),
      subsections: [
        {
          id: '16.1',
          title: t('paymentFees.allFees')
        },
        {
          id: '16.2',
          title: t('paymentFees.fiatPayments.title'),
          content: t.raw('paymentFees.fiatPayments.items') as string[]
        },
        {
          id: '16.3',
          title: t('paymentFees.usdtPayments.title'),
          content: t.raw('paymentFees.usdtPayments.items') as string[]
        },
        {
          id: '16.4',
          title: t('paymentFees.demoAccounts')
        }
      ]
    },
    {
      id: 'liability',
      title: t('liability.title'),
      subsections: [
        {
          id: '17.1',
          title: t('liability.notLiable.title'),
          content: t.raw('liability.notLiable.items') as string[]
        }
      ]
    },
    {
      id: 'termination',
      title: t('termination.title'),
      subsections: [
        {
          id: '18.1',
          title: t('termination.endOfTrial')
        },
        {
          id: '18.2',
          title: t('termination.afterConversion')
        }
      ]
    },
    {
      id: 'governing-law',
      title: t('governingLaw.title'),
      content: [t('governingLaw.content')]
    },
    {
      id: 'client-acknowledgement',
      title: t('clientAcknowledgement.title'),
      subsections: [
        {
          id: '20.1',
          title: t('clientAcknowledgement.accepts.title'),
          content: t.raw('clientAcknowledgement.accepts.items') as string[]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] pt-32 pb-20">
      <div className="gradient-overlay" />
      <SectionWrapper>
        <TermsDocument
          title={t('title')}
          subtitle={t('subtitle')}
          sections={termsSections}
        />
      </SectionWrapper>
    </div>
  );
}
