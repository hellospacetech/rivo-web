"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * <AudioTranscript>, iPhone-style podcast player with word-level highlight.
 *
 * Replicates the rivo-mobile podcast player screen 1:1 inside a phone frame:
 * - Top bar: chevron + "Podcast" title + speaker icon
 * - "RIVO 1" label with gold dot
 * - Scrolling transcript with word-level highlight
 * - Progress bar with timestamps
 * - Transport: 1x / skip back / play-pause / skip forward / rivo icon
 * - Bottom: "Read full report" link
 */

interface AlignmentWord { word: string; start: number; end: number }
interface Alignment { words: AlignmentWord[]; duration: number }
interface Sentence { words: AlignmentWord[]; start: number; end: number }

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function formatRemaining(pos: number, dur: number) {
  const rem = Math.max(0, dur - pos);
  return `-${formatTime(rem)}`;
}

function buildSentences(words: AlignmentWord[]): Sentence[] {
  const result: Sentence[] = [];
  let current: AlignmentWord[] = [];
  for (const w of words) {
    current.push(w);
    if (/[.?!]$/.test(w.word)) {
      result.push({ words: current, start: current[0].start, end: w.end });
      current = [];
    }
  }
  if (current.length > 0) {
    result.push({ words: current, start: current[0].start, end: current[current.length - 1].end });
  }
  return result;
}

export function AudioTranscript() {
  const locale = useLocale();
  const lang = locale === "tr" ? "tr" : "en";

  const [alignment, setAlignment] = useState<Alignment | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentenceRefs = useRef<Map<number, HTMLElement>>(new Map());
  const userScrolling = useRef(false);
  const userScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch(`/audio/onboarding-${lang}-alignment.json`)
      .then((r) => r.json())
      .then((data: Alignment) => { setAlignment(data); setDuration(data.duration); });
  }, [lang]);

  useEffect(() => {
    const audio = new Audio(`/audio/onboarding-${lang}.mp3`);
    audio.preload = "auto";
    audioRef.current = audio;
    audio.addEventListener("loadedmetadata", () => { setDuration(audio.duration); setLoaded(true); });
    audio.addEventListener("ended", () => { setPlaying(false); setFinished(true); cancelAnimationFrame(rafRef.current); });
    return () => { audio.pause(); audio.src = ""; cancelAnimationFrame(rafRef.current); };
  }, [lang]);

  const startPolling = useCallback(() => {
    const tick = () => { if (audioRef.current) setPosition(audioRef.current.currentTime); rafRef.current = requestAnimationFrame(tick); };
    rafRef.current = requestAnimationFrame(tick);
  }, []);
  const stopPolling = useCallback(() => cancelAnimationFrame(rafRef.current), []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !loaded) return;
    if (playing) { audio.pause(); setPlaying(false); stopPolling(); }
    else { audio.play(); setPlaying(true); startPolling(); }
  }, [playing, loaded, startPolling, stopPolling]);

  const seekTo = useCallback((seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = seconds;
    setPosition(seconds);
  }, []);

  const skipBack = useCallback(() => seekTo(Math.max(0, position - 10)), [position, seekTo]);
  const skipForward = useCallback(() => seekTo(Math.min(duration, position + 10)), [position, duration, seekTo]);

  const sentences = useMemo(() => (alignment ? buildSentences(alignment.words) : []), [alignment]);
  const activeSentenceIdx = useMemo(() => {
    for (let i = sentences.length - 1; i >= 0; i--) { if (position >= sentences[i].start) return i; }
    return 0;
  }, [position, sentences]);

  useEffect(() => {
    if (userScrolling.current || !playing) return;
    const el = sentenceRefs.current.get(activeSentenceIdx);
    if (!el || !scrollRef.current) return;
    const container = scrollRef.current;
    const anchor = container.clientHeight * 0.3;
    container.scrollTo({ top: Math.max(0, el.offsetTop - anchor), behavior: "smooth" });
  }, [activeSentenceIdx, playing]);

  const onScrollStart = useCallback(() => {
    userScrolling.current = true;
    if (userScrollTimer.current) clearTimeout(userScrollTimer.current);
  }, []);
  const onScrollEnd = useCallback(() => {
    if (userScrollTimer.current) clearTimeout(userScrollTimer.current);
    userScrollTimer.current = setTimeout(() => { userScrolling.current = false; }, 3000);
  }, []);

  const progress = duration > 0 ? position / duration : 0;

  if (!alignment) return <PhoneShell><div /></PhoneShell>;

  return (
    <PhoneShell>
      {/* ── Top bar ──────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pb-3 pt-3">
        <ChevronDownIcon />
        <span className="text-[15px] font-[500]" style={{ color: "rgba(255,255,255,0.85)" }}>Podcast</span>
        <SpeakerIcon />
      </div>

      {!finished ? (
        <>
          {/* ── RIVO label ───────────────────────────────── */}
          <div className="flex items-center gap-2.5 px-5 pb-2 pt-1">
            <span className="inline-block h-[28px] w-[28px] rounded-full" style={{ background: "#C9B97F" }} />
            <span className="text-[13px] font-[600] tracking-[0.06em]" style={{ color: "rgba(255,255,255,0.65)" }}>RIVO 1</span>
          </div>

          {/* ── Transcript ───────────────────────────────── */}
          <div className="relative flex-1 overflow-hidden">
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-10" style={{ height: 32, background: "linear-gradient(180deg, #000 0%, transparent 100%)" }} />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10" style={{ height: 40, background: "linear-gradient(0deg, #000 0%, transparent 100%)" }} />

            <div
              ref={scrollRef}
              className="h-full overflow-y-auto"
              style={{ scrollbarWidth: "none" }}
              onMouseDown={onScrollStart}
              onMouseUp={onScrollEnd}
              onTouchStart={onScrollStart}
              onTouchEnd={onScrollEnd}
            >
              <div className="px-5 pb-10 pt-2">
                {sentences.map((sentence, sIdx) => {
                  const isActive = sIdx === activeSentenceIdx && playing;
                  const isPast = sIdx < activeSentenceIdx && playing;
                  return (
                    <p
                      key={sIdx}
                      ref={(el) => { if (el) sentenceRefs.current.set(sIdx, el); }}
                      className="mb-1"
                      style={{
                        fontSize: 22,
                        lineHeight: "34px",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: !playing
                          ? "rgba(255,255,255,0.25)"
                          : isPast
                            ? "rgba(255,255,255,0.18)"
                            : !isActive
                              ? "rgba(255,255,255,0.08)"
                              : undefined,
                      }}
                    >
                      {isActive
                        ? sentence.words.map((w, i) => {
                            let color: string;
                            if (position >= w.start && position < w.end) color = "#FFFFFF";
                            else if (position >= w.end) color = "rgba(255,255,255,0.45)";
                            else color = "rgba(255,255,255,0.18)";
                            return (
                              <span key={i} style={{ color, transition: "color 0.08s ease" }}>
                                {i > 0 ? " " : ""}{w.word}
                              </span>
                            );
                          })
                        : sentence.words.map((w) => w.word).join(" ")}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Progress bar ─────────────────────────────── */}
          <div className="shrink-0 px-5 pt-2">
            <ProgressBar progress={progress} position={position} duration={duration} onSeek={seekTo} />
          </div>

          {/* ── Transport controls ───────────────────────── */}
          <div className="flex shrink-0 items-center justify-center gap-8 px-5 pb-5">
            <button type="button" onClick={skipBack} className="flex h-10 w-10 cursor-pointer items-center justify-center border-none bg-transparent" aria-label="Skip back">
              <SkipBackIcon />
            </button>
            <button type="button" onClick={togglePlay} className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none transition-transform duration-150 hover:scale-105 active:scale-95" style={{ background: "#fff" }} aria-label={playing ? "Pause" : "Play"}>
              {playing ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
            </button>
            <button type="button" onClick={skipForward} className="flex h-10 w-10 cursor-pointer items-center justify-center border-none bg-transparent" aria-label="Skip forward">
              <SkipForwardIcon />
            </button>
          </div>
        </>
      ) : (
        /* ── Finished: store badges CTA ──────────────── */
        <div
          className="flex flex-1 flex-col items-center justify-center gap-5 px-6"
          style={{ animation: "mkt-fade-in-up 0.5s ease forwards" }}
        >
          <Image src="/rivo-logo.png" alt="Rivo" width={48} height={48} className="rounded-[12px]" />
          <div className="flex flex-col items-center gap-2">
            <a
              href="https://apps.apple.com/app/rivo"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-150 hover:opacity-80"
            >
              <Image src="/badges/app-store.svg" alt="Download on the App Store" width={150} height={50} style={{ height: 40, width: "auto" }} />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.rivo"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-150 hover:opacity-80"
            >
              <Image src="/badges/google-play.png" alt="Get it on Google Play" width={180} height={53} style={{ height: 52, width: "auto" }} />
            </a>
          </div>
        </div>
      )}

      <style>{`[style*="scrollbar-width: none"]::-webkit-scrollbar { display: none; }`}</style>
    </PhoneShell>
  );
}

/* ─── Phone shell (iPhone frame) ─────────────────────────────────── */

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto flex flex-col overflow-hidden"
      style={{
        width: 285,
        aspectRatio: "393 / 852",
        borderRadius: 44,
        border: "2.5px solid rgba(255,255,255,0.10)",
        background: "#000",
      }}
    >
      {/* Dynamic Island */}
      <div className="relative z-10 flex justify-center pt-3 pb-1">
        <div
          className="rounded-full"
          style={{
            width: 96,
            height: 28,
            background: "#111",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
      </div>
      {children}
    </div>
  );
}

/* ─── Progress Bar ───────────────────────────────────────────────── */

function ProgressBar({ progress, position, duration, onSeek }: {
  progress: number; position: number; duration: number; onSeek: (s: number) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const handleSeek = useCallback((clientX: number) => {
    if (!barRef.current || duration <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    onSeek(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * duration);
  }, [duration, onSeek]);

  return (
    <div className="mb-1.5">
      <div ref={barRef} className="cursor-pointer py-1.5" onClick={(e) => handleSeek(e.clientX)}>
        <div className="relative h-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
          <div className="absolute left-0 top-0 h-full rounded-full bg-white" style={{ width: `${Math.min(progress * 100, 100)}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2" style={{ left: `${Math.min(progress * 100, 100)}%`, marginLeft: -5, width: 10, height: 10, borderRadius: 5, background: "#fff" }} />
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-[10px] font-[500] tabular-nums" style={{ color: "rgba(255,255,255,0.35)" }}>{formatTime(position)}</span>
        <span className="text-[10px] font-[500] tabular-nums" style={{ color: "rgba(255,255,255,0.35)" }}>{formatRemaining(position, duration)}</span>
      </div>
    </div>
  );
}

/* ─── Icons ──────────────────────────────────────────────────────── */

function PlayIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="#000" aria-hidden="true"><path d="M6 4l15 8-15 8V4z" /></svg>;
}
function PauseIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="#000" aria-hidden="true"><rect x="5" y="4" width="4" height="16" rx="1" /><rect x="15" y="4" width="4" height="16" rx="1" /></svg>;
}
function ChevronDownIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>;
}
function SpeakerIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>;
}
function SkipBackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10" /><polyline points="12 2 8 2 8 6" /></svg>;
}
function SkipForwardIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 1 1-10 10" /><polyline points="12 2 16 2 16 6" /></svg>;
}
