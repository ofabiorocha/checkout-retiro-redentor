import { MapPin } from 'lucide-react'

export default function EventHeader({ event }) {
  return (
    <section className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-card bg-black">

      {/* Vídeo de fundo */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        src="/video/video.mp4"
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        poster="/video/poster.jpg" // opcional: imagem fallback
      />

      {/* Overlay de contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Conteúdo do evento */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 drop-shadow-lg">
          {event.name}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm sm:text-base text-white/90">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-400 shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
