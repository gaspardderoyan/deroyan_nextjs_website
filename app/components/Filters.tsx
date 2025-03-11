"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
// Import select components directly from shadcn/ui
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import translations from "@/app/lib/translations.json";
import { validateLocale } from "../lib/i18n";

// Define all filter options in a single object 
// Each category has its own array of options
// Access using filterOptions.type, filterOptions.region, or filterOptions.period
// Each value is used as both a key for retrieval and as the actual filter value
// The UI text is retrieved from the UIElementsFrFilters Map using these values as keys
const filterOptions = {
  // Type filter options
  type: [
    "all",    // Default option
    "carpet", // Tapis
    "tapestry", // Tapisseries
    "textile",  // Textiles
  ],
  
  // Region filter options
  region: [
    "all",    // Default option
    "europe", // Europe
    "orient", // Orient
  ],
  
  // Period filter options
  period: [
    "all",  // Default option
    "th15", // XVème
    "th16", // XVIème
    "th17", // XVIIème
    "th18", // XVIIIème
    "th19", // XIXème
    "th20", // XXème
  ]
};

// Define shared select styling constants
const SELECT_TRIGGER_STYLES = "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-none border border-black bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1";

const SELECT_CONTENT_STYLES = "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-none border border-black bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1";

const SELECT_VIEWPORT_STYLES = "p-1 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]";

const SELECT_ITEM_STYLES = "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none  data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/**
 * Filters component for filtering the collection by type, region, and period
 * Maintains filter state in URL parameters for shareable links and browser history
 */
export default function Filters({ locale }: { locale: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ensure we use a valid locale
  const validLocale = validateLocale(locale);
  
  // Get translations for the current locale
  const t = translations[validLocale as keyof typeof translations];
  
  // Get current filter values from URL or use 'all' as default
  const [type, setType] = useState(searchParams.get("filters[type][$eq]") || "all");
  const [region, setRegion] = useState(searchParams.get("filters[region][$eq]") || "all");
  const [period, setPeriod] = useState(searchParams.get("filters[period][$eq]") || "all");
  
  // Create a function to update URL with new filter values
  const updateFilters = useCallback(
    (name: string, value: string) => {
      // Create a new URLSearchParams object from the current search params
      const params = new URLSearchParams(searchParams.toString());
      
      // Get the current page from URL
      const page = params.get("page");
      
      // Update or remove the filter parameter based on value
      if (value && value !== "all") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      
      // Reset to page 1 when filters change
      if (page) {
        params.set("page", "1");
      }
      
      // Update the URL with the new search parameters, including the locale
      router.push(`/${validLocale}/collection?${params.toString()}`);
    },
    [router, searchParams, validLocale]
  );
  
  // Handle filter changes
  const handleTypeChange = (value: string) => {
    setType(value);
    updateFilters("filters[type][$eq]", value);
  };
  
  const handleRegionChange = (value: string) => {
    setRegion(value);
    updateFilters("filters[region][$eq]", value);
  };
  
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    updateFilters("filters[period][$eq]", value);
  };
  
  // Sync state with URL parameters on mount and when URL changes
  useEffect(() => {
    setType(searchParams.get("filters[type][$eq]") || "all");
    setRegion(searchParams.get("filters[region][$eq]") || "all");
    setPeriod(searchParams.get("filters[period][$eq]") || "all");
  }, [searchParams]);
  
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:justify-end">
      {/* Type filter */}
      <div className="w-full max-w-full sm:flex-1 sm:min-w-[120px] sm:max-w-none md:max-w-none lg:max-w-[180px]">
        <SelectPrimitive.Root value={type} onValueChange={handleTypeChange}>
          <SelectPrimitive.Trigger className={SELECT_TRIGGER_STYLES} aria-label={t["filter.type"]}>
            <SelectPrimitive.Value placeholder={t["filter.type"]} />
            <SelectPrimitive.Icon asChild>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className={SELECT_CONTENT_STYLES} position="popper">
              <SelectPrimitive.Viewport className={SELECT_VIEWPORT_STYLES}>
                {filterOptions.type.map((value) => (
                  <SelectPrimitive.Item 
                    key={value} 
                    value={value}
                    className={SELECT_ITEM_STYLES}
                  >
                    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
                        <Check className="h-4 w-4" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <SelectPrimitive.ItemText>
                      {value === "all" ? t["filter.type"] : t[`filter.type.${value}` as keyof typeof t]}
                    </SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </div>
      
      {/* Region filter */}
      <div className="w-full max-w-full sm:flex-1 sm:min-w-[120px] sm:max-w-none md:max-w-none lg:max-w-[180px]">
        <SelectPrimitive.Root value={region} onValueChange={handleRegionChange}>
          <SelectPrimitive.Trigger className={SELECT_TRIGGER_STYLES} aria-label={t["filter.region"]}>
            <SelectPrimitive.Value placeholder={t["filter.region"]} />
            <SelectPrimitive.Icon asChild>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className={SELECT_CONTENT_STYLES} position="popper">
              <SelectPrimitive.Viewport className={SELECT_VIEWPORT_STYLES}>
                {filterOptions.region.map((value) => (
                  <SelectPrimitive.Item 
                    key={value} 
                    value={value}
                    className={SELECT_ITEM_STYLES}
                  >
                    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
                        <Check className="h-4 w-4" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <SelectPrimitive.ItemText>
                      {value === "all" ? t["filter.region"] : t[`filter.region.${value}` as keyof typeof t]}
                    </SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </div>
      
      {/* Period filter */}
      <div className="w-full max-w-full sm:flex-1 sm:min-w-[120px] sm:max-w-none md:max-w-none lg:max-w-[180px]">
        <SelectPrimitive.Root value={period} onValueChange={handlePeriodChange}>
          <SelectPrimitive.Trigger className={SELECT_TRIGGER_STYLES} aria-label={t["filter.period"]}>
            <SelectPrimitive.Value placeholder={t["filter.period"]} />
            <SelectPrimitive.Icon asChild>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className={SELECT_CONTENT_STYLES} position="popper">
              <SelectPrimitive.Viewport className={SELECT_VIEWPORT_STYLES}>
                {filterOptions.period.map((value) => (
                  <SelectPrimitive.Item 
                    key={value} 
                    value={value}
                    className={SELECT_ITEM_STYLES}
                  >
                    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
                        <Check className="h-4 w-4" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <SelectPrimitive.ItemText>
                      {value === "all" ? t["filter.period"] : t[`filter.period.${value}` as keyof typeof t]}
                    </SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </div>
    </div>
  );
} 