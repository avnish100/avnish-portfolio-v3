"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import Image from "next/image"

interface ShowcaseItem {
  src: string
  type: "image" | "video"
  caption?: string
}

export function Filmstrip({ items, title }: { items: ShowcaseItem[]; title: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const track = trackRef.current
    if (!track) return
    setIsDragging(true)
    setStartX(e.clientX)
    setScrollLeft(track.scrollLeft)
    track.setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current) return
    const dx = e.clientX - startX
    trackRef.current.scrollLeft = scrollLeft - dx
  }, [isDragging, startX, scrollLeft])

  const onPointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Enable touch scrolling natively
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.style.overflowX = "scroll"
    track.style.scrollbarWidth = "none"
    // @ts-expect-error -- webkit vendor prefix
    track.style.webkitOverflowScrolling = "touch"
  }, [])

  return (
    <div className="mb-12">
      <div
        ref={trackRef}
        className="flex gap-3 scrollbar-hide"
        style={{
          overflowX: "scroll",
          paddingLeft: "max(1.5rem, calc((100vw - 48rem) / 2 + 1.5rem))",
          paddingRight: "1.5rem",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {items.map((item, i) => (
          <figure key={i} className="shrink-0">
            {item.type === "video" ? (
              <div className="relative w-[72vw] md:w-[26rem] aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            ) : (
              <div className="relative w-[72vw] md:w-[26rem] aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
                <Image
                  src={item.src}
                  alt={item.caption || `${title} — ${i + 1}`}
                  fill
                  draggable={false}
                  className="object-cover pointer-events-none"
                  priority={i === 0}
                  sizes="(max-width: 768px) 72vw, 416px"
                />
              </div>
            )}
            {item.caption && (
              <figcaption className="text-[13px] text-muted-foreground/60 mt-2.5 font-serif italic tracking-[0.01em]">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
