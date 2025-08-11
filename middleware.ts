import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = ["/pt", "/en"].every(
    (locale) => !pathname.startsWith(`${locale}/`) && pathname !== locale,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url))
  }
}

function getLocale(request: NextRequest) {
  // Get the preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")

  if (acceptLanguage) {
    // Check if Portuguese is preferred
    if (acceptLanguage.includes("pt")) {
      return "pt"
    }
  }

  // Default to English for any other language
  return "en"
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
