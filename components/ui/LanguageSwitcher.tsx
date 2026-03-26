'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value as Locale;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="sr-only">
        {t('switchLabel')}
      </label>
      <select
        id="language-select"
        className="bg-secondary/50 border border-border text-sm rounded-md px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer"
        onChange={handleLanguageChange}
        defaultValue="" // Let the browser handle current selection based on locale context available
      >
        <option value="" disabled hidden>
          {t('switchLabel')}
        </option>
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {t(locale)}
          </option>
        ))}
      </select>
    </div>
  );
}
