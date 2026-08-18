"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { track } from "@vercel/analytics";

export function AuthAnalytics() {
  const { isLoaded, isSignedIn, user } = useUser();
  const baseline = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    // First run after Clerk finishes loading — just record where things
    // stand (e.g. a returning visitor who's already signed in). Don't
    // fire an event for that; we only care about transitions that happen
    // while someone's actually on the page.
    if (baseline.current === null) {
      baseline.current = isSignedIn;
      return;
    }

    if (isSignedIn && !baseline.current) {
      const createdAt = user?.createdAt ? new Date(user.createdAt).getTime() : null;
      const isNewAccount = createdAt && Date.now() - createdAt < 60_000;
      track(isNewAccount ? "Sign Up" : "Sign In");
      baseline.current = true;
    }

    if (!isSignedIn && baseline.current) {
      track("Sign Out");
      baseline.current = false;
    }
  }, [isLoaded, isSignedIn, user]);

  return null;
}
