"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useVideoPlayer, useAnimationReady } from "@/hooks";
// dialog rimosso: riproduzione inline

export const Hero: React.FC = () => {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  // Parallax effect per il background
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Custom hooks per logica separata
  const animationReady = useAnimationReady();
  const videoPlayer = useVideoPlayer(videoRef);

  // GSAP sostituito con Framer Motion per consistency e bundle size
  // Disabilita animazioni durante SSR per evitare hydration mismatch
  const shouldReduceMotion = !animationReady;

  // Tutta la logica video è ora gestita dal custom hook useVideoPlayer

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden text-white">
      {/* Background con parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 scale-110 bg-[url('/images/hero-bg.webp')] bg-cover bg-center"
      />
      
      {/* Gradient overlay moderno */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      
      {/* Glassmorphism overlay per depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10" />
      <Container className="relative z-10 flex min-h-screen items-center">
        <motion.div 
          style={{ y: textY }}
          className="grid gap-8 md:grid-cols-2 md:items-center w-full"
        >
          <div>
          <motion.p 
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-sm uppercase tracking-[0.2em] text-neutral-300"
          >
            Lun - Dom: 08:00 - 22:00
          </motion.p>
          <motion.h1 
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Ukiyo Crew Detailing
          </motion.h1>
          <p className="mt-4 max-w-prose text-neutral-300">
            Interni, esterni, motore; protezione vernice, rimozione macchie e oscuramento vetri.
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl shadow-blue-500/25">
                <Link href="#contact">Prenota un appuntamento</Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild variant="secondary" className="backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 shadow-xl">
                <Link href="#services">I nostri servizi</Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild variant="secondary" className="backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 shadow-xl">
                <Link href="tel:+18002345764" aria-label="Chiama ora">Chiama ora</Link>
              </Button>
            </motion.div>
          </motion.div>

          <div className="mt-10" aria-label="Chi siamo">
            <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-300">chi siamo</h3>
            <p className="mt-2 max-w-prose text-neutral-300 text-sm">Due professionisti del detailing, attenzione maniacale ai dettagli e passione per ogni veicolo. Qui sotto una foto di gruppo e i nostri ritratti.</p>
            <motion.div 
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="mt-4 grid grid-cols-3 gap-4" 
              data-team-grid
            >
              {[
                { src: "/images/team/team-01.webp", alt: "Foto membro team 1" },
                { src: "/images/team/team-02.webp", alt: "Foto membro team 2" },
                { src: "/images/team/team-03.webp", alt: "Foto di gruppo" },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.5 + i * 0.08, duration: 0.5 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -5 }}
                  className="group relative aspect-square overflow-hidden rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 shadow-xl shadow-black/25"
                  data-team-item
                  aria-hidden="true"
                >
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-focus-within:scale-105"
                    sizes="(min-width: 1280px) 200px, (min-width: 1024px) 180px, (min-width: 768px) 25vw, 33vw"
                  />
                  <span
                    className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 group-focus-within:bg-black/10"
                    aria-hidden
                  />
                  <span className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-1/2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <span className="mx-2 mb-2 inline-block rounded-lg backdrop-blur-sm bg-black/60 border border-white/20 px-2 py-1 text-[10px] font-medium">{["Daniel","Lorenzo","Ukiyo Team"][i]}</span>
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl shadow-black/25">
            {/* Video inline sempre renderizzato; poster da primo frame (data URL). Nessuna immagine esterna. */}
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              playsInline
              preload="metadata"
              controls={false}
              disablePictureInPicture
              controlsList="nodownload noplaybackrate noremoteplayback"
              muted={videoPlayer.isMuted}
              poster={videoPlayer.videoFirstFrameSrc || undefined}
              aria-label="Hero video"
            >
              <source src="/videos/hero.webm" type="video/webm" />
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            {/* Overlay controlli minimal con glassmorphism */}
            {videoPlayer.isPlaying ? (
              <div className="pointer-events-none absolute inset-0 flex items-start justify-end p-3">
                <div className="pointer-events-auto flex items-center gap-3 opacity-100 transition-opacity duration-300 hover:opacity-100 data-[hidden=true]:opacity-0" data-controls>
                  <button
                    className="rounded-full border border-white/30 bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent"
                    aria-label={videoPlayer.isMuted ? "Attiva audio" : "Disattiva audio"}
                    title={videoPlayer.isMuted ? "Attiva audio" : "Disattiva audio"}
                    onClick={videoPlayer.handleToggleMute}
                  >
                    {videoPlayer.isMuted ? (
                      // Speaker X (outline)
                      <svg key="muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M11 5 6 9H3v6h3l5 4V5z" />
                        <path d="M22 9l-6 6" />
                        <path d="M22 15l-6-6" />
                      </svg>
                    ) : (
                      // Speaker con onde (outline)
                      <svg key="unmuted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M11 5 6 9H3v6h3l5 4V5z" />
                        <path d="M15 9a3 3 0 0 1 0 6" />
                        <path d="M19 7a7 7 0 0 1 0 10" />
                      </svg>
                    )}
                  </button>
                  <label htmlFor="hero-volume" className="sr-only">Volume</label>
                  <input
                    id="hero-volume"
                    type="range"
                    min={0}
                    max={100}
                    value={videoPlayer.volumePercent}
                    onChange={(e) => videoPlayer.handleVolumeChange(Number(e.target.value))}
                    aria-label="Volume"
                    className="h-1.5 w-28 cursor-pointer appearance-none rounded-full bg-white/20 accent-white/90 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent"
                  />
                  <button
                    className="rounded-full border border-white/30 bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent"
                    aria-label={videoPlayer.isPaused ? "Riprendi" : "Pausa"}
                    title={videoPlayer.isPaused ? "Riprendi" : "Pausa"}
                    onClick={videoPlayer.handleTogglePlay}
                  >
                    {videoPlayer.isPaused ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          {!videoPlayer.isPlaying ? (
            <button
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-4 backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Riproduci video"
              onClick={() => videoPlayer.setIsPlaying(true)}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          ) : null}
          </motion.div>
        </motion.div>
      </Container>

      {/* Badge di fiducia con glassmorphism */}
      <div className="border-t border-white/20 backdrop-blur-sm bg-white/5">
        <Container className="relative z-10 grid grid-cols-2 gap-4 py-8 sm:grid-cols-4" aria-label="Badge di fiducia">
          {[
            { title: "qualità", subtitle: "garantita" },
            { title: "natura", subtitle: "rispettata" },
            { title: "veloce", subtitle: "processo" },
            { title: "prezzi", subtitle: "accessibili" },
          ].map((b, i) => (
            <motion.div 
              key={b.title} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-sm uppercase tracking-widest text-neutral-200">{b.title}</div>
              <div className="text-lg font-semibold text-white">{b.subtitle}</div>
            </motion.div>
          ))}
        </Container>
      </div>
      {/* Modale rimossa: il video riproduce inline */}
    </div>
  );
};


