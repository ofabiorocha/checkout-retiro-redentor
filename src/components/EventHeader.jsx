import { Calendar, MapPin } from 'lucide-react'

export default function EventHeader({ event }) {
  return (
    <section className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-card">

      {/* Vídeo de fundo */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/video.mp4"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
      />

      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Conteúdo do evento */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
          {/* <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-400" />
            <span>{event.date}</span>
          </div> */}
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-400" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
