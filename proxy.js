import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const ADMIN_HOST = "quail-admin.2776.ltd";

const isAccountRoute = createRouteMatcher(["/account(.*)"]);
const isAdminPath = createRouteMatcher(["/admin(.*)"]);
const isAuthPageRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const hostname = req.headers.get("host") || "";
  const isAdminHost = hostname === ADMIN_HOST;
  const isAuthPage = isAuthPageRoute(req);

  // On the admin subdomain, silently map clean paths to the real /admin/*
  // routes — e.g. quail-admin.2776.ltd/categories serves app/admin/categories,
  // URL bar stays unchanged. Sign-in/sign-up pages are excluded since those
  // already exist at their own real paths, not under /admin.
  let rewriteUrl = null;
  if (isAdminHost && !isAuthPage && !req.nextUrl.pathname.startsWith("/admin")) {
    const url = req.nextUrl.clone();
    url.pathname = `/admin${req.nextUrl.pathname === "/" ? "" : req.nextUrl.pathname}`;
    rewriteUrl = url;
  }

  if (isAccountRoute(req)) {
    await auth.protect();
  }

  const isAdminRequest = !isAuthPage && (isAdminHost || isAdminPath(req));

  if (isAdminRequest) {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    if (sessionClaims?.publicMetadata?.role !== "admin") {
      return NextResponse.redirect(isAdminHost ? new URL("https://quail.2776.ltd/") : new URL("/", req.url));
    }
  }

  if (rewriteUrl) {
    return NextResponse.rewrite(rewriteUrl);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
