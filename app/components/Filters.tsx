"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the filter options
const typeOptions = [
  { value: "all", label: "Type" },
  { value: "carpet", label: "Tapis" },
  { value: "tapestry", label: "Tapisseries" },
  { value: "textile", label: "Textiles" },
];

const regionOptions = [
  { value: "all", label: "Région" },
  { value: "europe", label: "Europe" },
  { value: "orient", label: "Orient" },
];

const periodOptions = [
  { value: "all", label: "Période" },
  { value: "th15", label: "XVème" },
  { value: "th16", label: "XVIème" },
  { value: "th17", label: "XVIIème" },
  { value: "th18", label: "XVIIIème" },
  { value: "th19", label: "XIXème" },
  { value: "th20", label: "XXème" },
];

/**
 * Filters component for filtering the collection by type, region, and period
 * Maintains filter state in URL parameters for shareable links and browser history
 */
export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
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
      
      // Update the URL with the new search parameters
      router.push(`/collection?${params.toString()}`);
    },
    [router, searchParams]
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
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6 md:mb-0 md:pt-2">
      {/* Type filter */}
      <div className="w-full md:w-auto ">
        <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Region filter */}
      <div className="w-full md:w-auto ">
        <Select value={region} onValueChange={handleRegionChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Région" />
          </SelectTrigger>
          <SelectContent>
            {regionOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Period filter */}
      <div className="w-full md:w-auto ">
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            {periodOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 