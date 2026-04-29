"use client";

import { useEffect, useState, useCallback } from "react";
import { AlertTriangle } from "lucide-react";
import { DialogBox } from "@/components/common/DialogBox";

interface RefreshData {
  count: number;
  lastRefresh: number;
}

const STORAGE_KEY = "refresh_protection_data";
const MAX_REFRESHES = 3;
const TIME_WINDOW = 10000; // 10 seconds in ms

export default function RefreshProtection() {
  const [showWarning, setShowWarning] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const getRefreshData = useCallback((): RefreshData => {
    if (typeof window === "undefined") return { count: 0, lastRefresh: 0 };
    
    const data = sessionStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return { count: 0, lastRefresh: 0 };
  }, []);

  const saveRefreshData = useCallback((data: RefreshData) => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      const now = Date.now();
      const data = getRefreshData();

      // Check if within time window
      if (now - data.lastRefresh < TIME_WINDOW) {
        data.count += 1;
      } else {
        // Reset if outside time window
        data.count = 1;
      }

      data.lastRefresh = now;
      saveRefreshData(data);
      setRefreshCount(data.count);

      // If exceeded limit, show warning
      if (data.count > MAX_REFRESHES) {
        e.preventDefault();
        e.returnValue = "You have refreshed the page multiple times recently. Are you sure you want to reload?";
        return e.returnValue;
      }
    },
    [getRefreshData, saveRefreshData]
  );

  useEffect(() => {
    // Check initial load
    const data = getRefreshData();
    const now = Date.now();

    // Update refresh count from storage
    setRefreshCount(data.count);

    if (now - data.lastRefresh < TIME_WINDOW && data.count > MAX_REFRESHES) {
      setShowWarning(true);
    }

    // Add beforeunload listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [getRefreshData, handleBeforeUnload]);

  const dismissWarning = () => {
    setShowWarning(false);
    // Reset the counter when dismissed
    saveRefreshData({ count: 0, lastRefresh: Date.now() });
  };

  return (
    <DialogBox
      isModalOpen={showWarning}
      setIsModalOpen={setShowWarning}
      heading="Frequent Refresh Detected"
      description={`You have refreshed the page ${refreshCount} times in the last 10 seconds.`}
      allowClose={true}
      className="border border-red-500/50"
      isNotScrollable={true}
    >
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <p className="mb-6 text-center text-gray-400">
          Please avoid excessive refreshing as it may impact your experience.
        </p>

        {/* Action button */}
        <button
          onClick={dismissWarning}
          className="w-full rounded-lg bg-[#2A73EA] px-4 py-3 font-medium text-white transition-colors hover:bg-[#1a5fc7]"
        >
          I Understand
        </button>

        {/* Footer note */}
        <p className="mt-4 text-center text-xs text-gray-500">
          Tip: Use the navigation menu instead of refreshing to browse content.
        </p>
      </div>
    </DialogBox>
  );
}
