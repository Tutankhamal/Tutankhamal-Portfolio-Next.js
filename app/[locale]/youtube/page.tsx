import YouTube from "@/components/sections/youtube"
import type { Locale } from "@/lib/i18n"

export default async function YouTubePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <YouTube locale={locale} />
    </main>
  )
}