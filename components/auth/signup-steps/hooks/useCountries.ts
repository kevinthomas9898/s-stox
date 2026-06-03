import { useState, useEffect } from "react";
import type { SelectOption } from "@/components/common/SelectDropdown";

export function useCountries() {
  const [options, setOptions] = useState<SelectOption[]>([
    { value: "US", label: "United States (US)", shortLabel: "🇺🇸 United States (US)", flagUrl: "https://flagcdn.com/w40/us.png" },
  ]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flags");
        const data = await res.json();

        const formattedOptions = data
          .map((country: { name?: { common?: string }; cca2?: string; flags?: { png?: string; svg?: string } }) => {
            const name = country.name?.common || "";
            const code = country.cca2 || "";
            const flagUrl = country.flags?.png || country.flags?.svg || "";

            return {
              label: `${name} (${code})`,
              shortLabel: `${name} (${code})`,
              value: code,
              flagUrl,
              _sortName: name,
            };
          })
          .sort((a: { _sortName: string }, b: { _sortName: string }) => a._sortName.localeCompare(b._sortName))
          .map((opt: { _sortName?: string; [key: string]: unknown }) => {
            const rest = { ...opt };
            delete rest._sortName;
            return rest as unknown as SelectOption;
          });

        setOptions(formattedOptions);
      } catch (e) {
        console.error("Failed to fetch countries", e);
      }
    }
    fetchCountries();
  }, []);

  return options;
}

export default useCountries;
