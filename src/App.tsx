import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flower2 as LotusIcon, 
  Wind, 
  Eye, 
  Zap, 
  Brain, 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft,
  Circle,
  X,
  Send,
  Loader2,
  Info,
  ArrowRight,
  Play,
  RotateCcw,
  Settings,
  Palette,
  Type,
  BookOpen
} from 'lucide-react';
import { cn } from './lib/utils';
import { DHARMA_STEPS, MIND_AGGREGATES, ABHIDHAMMA_BOOKS, ABHIDHAMMA_GLOSSARY, type MindStep, MEDITATION_BENEFITS } from './constants';

// --- Utils ---

const haptic = (intensity: number = 1) => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    const duration = 10 * intensity;
    navigator.vibrate(duration);
  }
};

function playChime() {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
  oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); // A5

  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 3);
}

// --- Types ---

interface OnboardingStep {
  title: string;
  desc: string;
}

const ONBOARDING_FLOW: Record<'en' | 'my', OnboardingStep[]> = {
  en: [
    {
      title: "Welcome to Mindful Dharma",
      desc: "This platform is designed to help you tame the wild forest of your mind using ancient Buddhist techniques."
    },
    {
      title: "The Path of Training",
      desc: "We follow a step-by-step path starting from simple breath awareness to deep wisdom."
    },
    {
      title: "Daily Wisdom",
      desc: "Understand the 'Aggregates'—the different parts that make up what you call 'self'."
    },
    {
      title: "Ask the Sangha",
      desc: "Whenever you feel stuck, our Sangha companion is here to offer ancient wisdom."
    },
    {
      title: "Your First Lesson",
      desc: "Let's begin with Step 01: Mindfulness of Breath. Are you ready?"
    }
  ],
  my: [
    {
      title: "မင်္ဂလာပါ",
      desc: "ဤဆော့ဖ်ဝဲသည် သင်၏စိတ်ကို ရှေးဟောင်းဗုဒ္ဓနည်းစနစ်များဖြင့် ယဉ်ပါးစေရန် ကူညီပေးပါမည်။"
    },
    {
      title: "ကျင့်စဉ်လမ်း",
      desc: "ထွက်လေဝင်လေ သိမှုမှသည် နက်နဲသော ပညာအထိ အဆင့်ဆင့် လိုက်နာနိုင်ပါသည်။"
    },
    {
      title: "နေ့စဉ်ပညာ",
      desc: "ကိုယ့်ကိုယ်ကိုယ်ဟု ထင်မှတ်နေသော ခန္ဓာငါးပါးအကြောင်းကို လေ့လာပါ။"
    },
    {
      title: "သံဃာကို မေးမြန်းပါ",
      desc: "အခက်အခဲရှိပါက ကျွန်ုပ်တို့၏ သံဃာတော် (AI) ကို မေးမြန်းနိုင်ပါသည်။"
    },
    {
      title: "ပထမဆုံးသင်ခန်းစာ",
      desc: "အဆင့် ၁ - အာနာပါနကို စတင်ရအောင်။ အဆင်သင့်ပဲလား။"
    }
  ]
};

// --- Components ---

const Typewriter = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string, key?: any }) => {
  const isBurmese = /[\u1000-\u109F]/.test(text);

  if (isBurmese) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: delay, ease: [0.23, 1, 0.32, 1] }}
        className={cn("inline-block", className)}
      >
        {text}
      </motion.div>
    );
  }

  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  const segments = Array.from(segmenter.segment(text)).map(x => x.segment);

  return (
    <motion.div className={cn("flex flex-wrap", className)}>
      {segments.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.3,
            delay: delay + i * 0.03,
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

function ExitToast({ lang, visible }: { lang: 'en' | 'my', visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-12 left-1/2 z-[200] bg-dharma-ink text-dharma-bg px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl pointer-events-none whitespace-nowrap"
        >
          {lang === 'en' ? 'Press back again to exit' : 'ထွက်ရန် နောက်တစ်ကြိမ်နှိပ်ပါ'}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Components ---

function OnboardingTutorial({ onComplete, lang }: { onComplete: () => void, lang: 'en' | 'my', key?: string }) {
  const [step, setStep] = useState(0);
  const flow = ONBOARDING_FLOW[lang];

  const next = () => {
    if (step < flow.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 z-[100] bg-dharma-ink/60 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <motion.div 
        key={step}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-dharma-bg max-w-md w-full p-10 rounded-[40px] shadow-2xl border border-dharma-accent/20"
      >
        <div className="mb-8">
          <div className="text-[10px] text-dharma-accent font-bold uppercase tracking-widest mb-4">
            {lang === 'en' ? 'Tutorial' : 'လမ်းညွှန်'} {step + 1}/{flow.length}
          </div>
          <h3 className="serif text-3xl font-medium mb-4 leading-tight">{flow[step].title}</h3>
          <p className="text-dharma-muted text-sm leading-relaxed">{flow[step].desc}</p>
        </div>
        
        <button 
          onClick={next}
          className="w-full py-4 bg-dharma-accent text-dharma-ink rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-dharma-accent/80 transition-all shadow-lg"
        >
          {step === flow.length - 1 ? (lang === 'en' ? "Start Training" : "စတင်ပါ") : (lang === 'en' ? "Continue" : "ရှေ့ဆက်ပါ")}
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}

function MeditationTimer({ lang, vLevel }: { lang: 'en' | 'my', vLevel: number }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [preset, setPreset] = useState(5); // minutes

  const t = {
    en: {
      title: "Meditation Timer",
      start: "Start",
      pause: "Pause",
      reset: "Reset",
      min: "min"
    },
    my: {
      title: "တရားထိုင်ချိန် တိုင်မာ",
      start: "စတင်ပါ",
      pause: "ခေတ္တရပ်ပါ",
      reset: "အစပြန်စပါ",
      min: "မိနစ်"
    }
  }[lang];

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      playChime();
      if ('vibrate' in navigator) {
        const d = 50 * vLevel;
        navigator.vibrate([d, 50, d]);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, vLevel]);

  const toggle = () => {
    haptic(vLevel);
    if (seconds === 0) setSeconds(preset * 60);
    setIsActive(!isActive);
    if (!isActive) playChime(); // Gentle sound at start
  };

  const reset = () => {
    haptic(vLevel);
    setIsActive(false);
    setSeconds(0);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn(
      "bg-dharma-card border border-dharma-accent/10 p-8 rounded-[40px] shadow-sm mb-12 backdrop-blur-md transition-colors",
      "text-dharma-ink"
    )}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="serif text-xl font-medium">{t.title}</h3>
        <LotusIcon size={18} className="text-dharma-accent opacity-40" />
      </div>

      <div className="flex flex-col items-center">
        <div className="serif text-6xl font-light mb-8 tabular-nums">
          {seconds > 0 ? formatTime(seconds) : `${preset}:00`}
        </div>

        <div className="flex gap-4 mb-8">
          {[1, 5, 10, 20].map((m) => (
            <button
              key={m}
              onClick={() => { setPreset(m); setSeconds(m * 60); setIsActive(false); }}
              className={cn(
                "px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all",
                preset === m ? "bg-dharma-ink text-dharma-bg border-transparent" : "border-black/10 text-dharma-muted"
              )}
            >
              {m} {t.min}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={toggle}
            className="px-8 py-3 bg-dharma-accent text-dharma-ink rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"
          >
            {isActive ? (
              <><X size={14} /> {t.pause}</>
            ) : (
              <><Play size={14} /> {t.start}</>
            )}
          </button>
          <button
            onClick={reset}
            className="p-3 bg-black/5 rounded-full text-dharma-muted hover:bg-black/10 transition-colors"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Header({ 
  activeTab, setActiveTab, lang, setLang, theme, setTheme, fontSize, setFontSize, 
  vLevel, setVLevel, focus, setFocus, showSettings, setShowSettings
}: { 
  activeTab: string, 
  setActiveTab: (t: string) => void,
  lang: 'en' | 'my',
  setLang: (l: 'en' | 'my') => void,
  theme: 'light' | 'dark' | 'sepia',
  setTheme: (t: 'light' | 'dark' | 'sepia') => void,
  fontSize: number,
  setFontSize: (s: number) => void,
  vLevel: number,
  setVLevel: (l: number) => void,
  focus: string,
  setFocus: (f: string) => void,
  showSettings: boolean,
  setShowSettings: (s: boolean) => void
}) {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const triggerFeedback = (key: string) => {
    setLastUpdated(key);
    haptic(vLevel);
    setTimeout(() => setLastUpdated(null), 1500);
  };

  const tabs = [
    { id: 'home', label: lang === 'en' ? 'Pathways' : 'လမ်းစဉ်များ', icon: Wind },
    { id: 'mind', label: lang === 'en' ? 'Philosophy' : 'ဒဿန', icon: Brain },
    { id: 'abhi', label: lang === 'en' ? 'Abhidhamma' : 'အဘိဓမ္မာ', icon: LotusIcon }
  ];

  const focusOptions = ['All', 'Mindfulness', 'Awareness', 'Insight', 'Calm', 'Restraint', 'Effort'];

  return (
    <div className="mb-16 md:mb-24 relative z-50">
      <div className="flex items-center justify-between mb-8">
        <Typewriter 
          key={lang}
          text={lang === 'en' ? "Mindful Dharma" : "သတိဓမ္မ"} 
          className={cn("serif font-medium text-dharma-ink", lang === 'my' ? "text-xl md:text-2xl" : "text-2xl md:text-3xl tracking-tight")}
          delay={0.5}
        />
        
        <div className="relative">
          <button 
            onClick={(e) => { 
               e.stopPropagation();
               setShowSettings(!showSettings); 
               haptic(vLevel);
            }}
            className={cn(
               "p-2.5 rounded-2xl transition-all relative z-[60] bg-white/5 backdrop-blur shadow-sm",
               showSettings ? "bg-dharma-ink text-dharma-bg shadow-xl scale-110" : "text-dharma-ink border border-dharma-accent/10 hover:border-dharma-accent/40 hover:bg-white/20"
            )}
          >
            <Settings size={20} />
          </button>

          <AnimatePresence>
            {lastUpdated && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-12 left-1/2 -track-x-1/2 bg-dharma-accent text-dharma-bg px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest pointer-events-none whitespace-nowrap shadow-lg flex items-center gap-1.5"
                style={{ left: '50%', transform: 'translateX(-50%)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-dharma-bg animate-pulse" />
                Updated
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSettings && (
            <>
              {/* Click outside backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSettings(false)}
                className="fixed inset-0 z-40 cursor-default"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10, x: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10, x: 20 }}
                className="absolute right-0 top-full mt-6 bg-dharma-bg border border-dharma-accent/30 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-[40px] p-8 w-80 flex flex-col gap-8 overflow-y-auto max-h-[85vh] scrollbar-hide z-50 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between border-b border-dharma-accent/10 pb-4">
                  <h3 className="serif text-xl text-dharma-ink">Preferences</h3>
                  <button onClick={() => setShowSettings(false)} className="text-dharma-muted hover:text-dharma-ink p-1">
                    <X size={18} />
                  </button>
                </div>

                {/* Section: Spirit */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 opacity-40">
                    <Brain size={12} className="text-dharma-accent" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-dharma-ink">Spirit & Study</span>
                  </div>

                  {/* Language Selection */}
                  <div>
                    <div className="text-[10px] font-medium text-dharma-muted mb-3 flex justify-between items-center">
                      <span>{lang === 'en' ? 'Interface Language' : 'ဘာသာစကား'}</span>
                    </div>
                    <div className="flex p-1 bg-black/5 rounded-2xl gap-1">
                      {(['en', 'my'] as const).map(l => (
                        <button
                          key={l}
                          onClick={() => { setLang(l); triggerFeedback('lang'); }}
                          className={cn(
                            "flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                            lang === l ? "bg-dharma-bg text-dharma-ink shadow-sm" : "text-dharma-muted hover:text-dharma-ink"
                          )}
                        >
                          {l === 'en' ? 'English' : 'မြန်မာ'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Focus Selection */}
                  <div>
                    <div className="text-[10px] font-medium text-dharma-muted mb-3">Your Primary Focus</div>
                    <div className="grid grid-cols-2 gap-2">
                      {focusOptions.map(f => (
                        <button
                          key={f}
                          onClick={() => { setFocus(f); triggerFeedback('focus'); }}
                          className={cn(
                            "px-3 py-2 rounded-xl border text-[9px] font-bold uppercase tracking-widest transition-all text-left truncate",
                            focus === f ? "border-dharma-accent bg-dharma-accent/10 text-dharma-accent" : "border-dharma-accent/5 text-dharma-muted hover:border-dharma-accent/20"
                          )}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section: Appearance */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 opacity-40">
                    <Palette size={12} className="text-dharma-accent" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-dharma-ink">Atmosphere</span>
                  </div>

                  {/* Theme */}
                  <div>
                    <div className="text-[10px] font-medium text-dharma-muted mb-3">Visual Theme</div>
                    <div className="grid grid-cols-3 gap-2">
                      {(['light', 'dark', 'sepia'] as const).map(t => (
                        <button
                          key={t}
                          onClick={() => { setTheme(t); triggerFeedback('theme'); }}
                          className={cn(
                            "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all",
                            theme === t ? "border-dharma-accent bg-dharma-bg shadow-sm" : "border-dharma-accent/5 text-dharma-muted grayscale opacity-60 hover:opacity-100 hover:grayscale-0"
                          )}
                        >
                          <div className={cn(
                            "w-full aspect-square rounded-full border border-black/5",
                            t === 'light' ? 'bg-[#F9F6F1]' : t === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#F4ECD8]'
                          )} />
                          <span className="text-[8px] font-bold uppercase tracking-widest">{t}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <div className="text-[10px] font-medium text-dharma-muted mb-3 flex justify-between items-center">
                      <span>Typography Size</span>
                      <span className="text-[10px] font-mono text-dharma-ink">{fontSize}px</span>
                    </div>
                    <div className="flex items-center gap-4 bg-black/5 p-4 rounded-2xl">
                      <Type size={14} className="text-dharma-muted shrink-0" />
                      <input 
                        type="range" 
                        min="14" max="22" step="2"
                        value={fontSize}
                        onChange={(e) => { setFontSize(Number(e.target.value)); triggerFeedback('size'); }}
                        className="flex-1 accent-dharma-accent"
                      />
                      <Type size={20} className="text-dharma-ink shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Section: System */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 opacity-40">
                    <Zap size={12} className="text-dharma-accent" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-dharma-ink">Sensory Response</span>
                  </div>

                  {/* Vibration Level */}
                  <div>
                    <div className="text-[10px] font-medium text-dharma-muted mb-3 flex justify-between items-center">
                      <span>Haptic Vibration</span>
                      <span className="text-[10px] font-mono text-dharma-ink">Level {vLevel}</span>
                    </div>
                    <div className="flex items-center gap-4 bg-black/5 p-4 rounded-2xl">
                      <Zap size={14} className="text-dharma-muted shrink-0" />
                      <input 
                        type="range" 
                        min="1" max="5" step="1"
                        value={vLevel}
                        onChange={(e) => { setVLevel(Number(e.target.value)); triggerFeedback('vibrate'); }}
                        className="flex-1 accent-dharma-accent"
                      />
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => (
                          <div key={i} className={cn("w-1 h-3 rounded-full", vLevel >= i+1 ? "bg-dharma-accent" : "bg-dharma-accent/20")} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-6 border-t border-dharma-accent/10 flex justify-center">
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="text-[9px] font-bold uppercase tracking-[0.3em] text-dharma-muted hover:text-dharma-ink transition-all"
                  >
                    Close Settings
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>

    <nav className="flex items-center justify-between">
        <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); triggerFeedback(tab.id); }}
                className={cn(
                  "nav-link-bold whitespace-nowrap px-4 py-2 rounded-full",
                  lang === 'en' ? "uppercase" : "",
                  isActive ? "bg-dharma-accent text-white shadow-md" : "text-dharma-muted hover:bg-black/5 hover:text-dharma-ink"
                )}
              >
                <span className="my-text">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function WelcomeHero({ onStart, lang, setLang, vLevel }: { onStart: () => void, lang: 'en' | 'my', setLang: (l: 'en' | 'my') => void, vLevel: number, key?: string }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden transition-colors duration-500 backdrop-blur-sm bg-black/20">
      
      <div className="absolute top-8 right-8 z-10">
        <button 
          onClick={() => { setLang(lang === 'en' ? 'my' : 'en'); haptic(vLevel); }}
          className="text-[10px] font-bold uppercase tracking-widest text-[#F0F4E8] border border-white/30 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur hover:bg-white/10 transition-all shadow-md"
        >
          {lang === 'en' ? 'MY' : 'EN'}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 z-10 relative"
      >
        <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150 pointer-events-none" />
        <LotusIcon size={56} className="text-[#E8D7C5] mx-auto mb-10 drop-shadow-lg" />
        <h1 
          className={cn("serif text-7xl md:text-9xl font-medium mb-6 text-[#F0F4E8] drop-shadow-xl", lang === 'my' ? "" : "tracking-tighter leading-none")}
          style={{ lineHeight: lang === 'my' ? '1.5' : undefined }}
        >
          {lang === 'en' ? <>The Still <br className="hidden md:block" /> <span className="italic">Mind</span></> : <>ငြိမ်သက်သော <br /> <span className="italic">စိတ်</span></>}
        </h1>
        <p className="text-[#C1CEC5] text-lg max-w-xl mx-auto leading-relaxed serif italic my-text drop-shadow-md">
          {lang === 'en' 
            ? "\"Before we can control the mind, we must witness its nature. Like a turbulent river, we do not stop the flow; we simply step onto the bank.\""
            : "\"စိတ်ကို မထိန်းချုပ်မီ ၎င်း၏ သဘာဝကို စောင့်ကြည့်ရမည်။ လှိုင်းထန်သော မြစ်တစ်ခုကဲ့သို့ပင် စီးဆင်းမှုကို ကျွန်ုပ်တို့ မရပ်တန့်ပါ။ ကမ်းနဖူးသို့ လှမ်းတက်ရုံသာ ဖြစ်သည်။\""}
        </p>
      </motion.div>
      
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={() => { onStart(); haptic(vLevel); }}
        className="group px-10 py-5 bg-[#F0F4E8]/90 text-[#1A1F1C] rounded-full flex items-center gap-4 hover:bg-white hover:scale-105 transition-all shadow-2xl z-10 backdrop-blur-md"
      >
        <span className="uppercase text-xs font-bold my-text" style={{ letterSpacing: lang === 'en' ? '0.2em' : 'normal' }}>
            {lang === 'en' ? 'Seek the Path' : 'လမ်းစဉ်အား ရှာဖွေပါ'}
        </span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
}

function StepGallery({ lang, focus, vLevel }: { lang: 'en' | 'my', focus: string, vLevel: number }) {
  const [currentStep, setCurrentStep] = useState(0);
  const filteredSteps = focus === 'All' 
    ? DHARMA_STEPS 
    : DHARMA_STEPS.filter(s => s.categories.includes(focus));
    
  // Ensure currentStep is within bounds of filtered list
  const safeStep = currentStep >= filteredSteps.length ? 0 : currentStep;
  const step = filteredSteps[safeStep];

  if (!step) return <div className="p-20 text-center opacity-40">No pathways match this focus.</div>;

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      <div className="mb-12 md:mb-16">
        <div className="step-label">Step 0{safeStep + 1}</div>
        <h2 className="serif text-5xl md:text-7xl font-medium leading-[1.1] mb-8 my-text text-dharma-ink">
          {(lang === 'en' ? step.title : step.titleMy).split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h2>
        <p className="text-dharma-muted text-lg max-w-md leading-relaxed my-text">
          {lang === 'en' ? step.description : step.descriptionMy}
        </p>
      </div>

      <MeditationTimer lang={lang} vLevel={vLevel} />

      <motion.div 
        key={step.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-10 mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-dharma-accent mb-4">
              {lang === 'en' ? 'Philosophical Essential' : 'ဒဿနအနှစ်ချုပ်'}
            </h4>
            <div className="p-8 bg-dharma-accent/5 rounded-[40px] border border-dharma-accent/5">
              <p className="text-dharma-ink text-sm leading-[1.8] my-text whitespace-pre-wrap">
                {lang === 'en' ? step.content : step.contentMy}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-dharma-accent mb-4">
              {lang === 'en' ? 'Practice Guide' : 'ကျင့်စဉ်လမ်းညွှန်'}
            </h4>
            <div className="p-8 bg-black/5 rounded-[40px]">
              <div className="flex items-center gap-3 mb-4">
                <Wind size={16} className="text-dharma-accent" />
                <span className="serif italic text-lg text-dharma-ink">{step.pali}</span>
              </div>
              <p className="text-dharma-muted text-sm leading-[1.8] my-text">
                {lang === 'en' ? step.practice : step.practiceMy}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mb-8">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-dharma-accent mb-6 text-center">
          {lang === 'en' ? 'The Continuous Path' : 'အစဉ်တစိုက် ကျင့်စဉ်လမ်း'}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {filteredSteps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => { setCurrentStep(idx); haptic(vLevel); }}
              className={cn(
                "group flex flex-col items-center gap-3 transition-all",
                idx === safeStep ? "opacity-100" : "opacity-30 hover:opacity-100"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border text-[10px] font-bold transition-all",
                idx === safeStep 
                  ? "bg-dharma-ink text-dharma-bg border-transparent scale-110 shadow-lg" 
                  : "border-dharma-accent/20 text-dharma-ink"
              )}>
                0{idx + 1}
              </div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-center truncate w-full hidden sm:block">
                {lang === 'en' ? s.title : s.titleMy}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="dharma-progress mt-8">
        <div 
          className="dharma-progress-fill" 
          style={{ width: `${((safeStep + 1) / filteredSteps.length) * 100}%` }} 
        />
      </div>
    </div>
  );
}

function MindWisdom({ lang, vLevel }: { lang: 'en' | 'my', vLevel: number }) {
  const [activeSection, setActiveSection] = useState<'benefits' | 'aggregates'>('benefits');

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <div className="step-label">{lang === 'en' ? 'Knowledge' : 'အသိဉာဏ်'}</div>
        <h2 className="serif text-5xl md:text-7xl font-medium leading-[1.1] mb-8">
          {activeSection === 'benefits' ? (
            lang === 'en' ? <>The <br /> <span className="italic">Benefits</span></> : <>အကျိုး <br /> <span className="italic">ကျေးဇူးများ</span></>
          ) : (
            lang === 'en' ? <>The Five <br /> <span className="italic">Aggregates</span></> : <>ခန္ဓာ <br /> <span className="italic">ငါးပါး</span></>
          )}
        </h2>
        
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => { setActiveSection('benefits'); haptic(vLevel); }}
            className={cn(
              "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
              activeSection === 'benefits' ? "bg-dharma-ink text-dharma-bg shadow-lg" : "bg-dharma-accent/10 text-dharma-muted hover:bg-black/5"
            )}
          >
            {lang === 'en' ? 'Benefits' : 'အကျိုးကျေးဇူးများ'}
          </button>
          <button 
            onClick={() => { setActiveSection('aggregates'); haptic(vLevel); }}
            className={cn(
              "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
              activeSection === 'aggregates' ? "bg-dharma-ink text-dharma-bg shadow-lg" : "bg-dharma-accent/10 text-dharma-muted hover:bg-black/5"
            )}
          >
            {lang === 'en' ? 'Aggregates' : 'ခန္ဓာငါးပါး'}
          </button>
        </div>

        <p className="text-dharma-muted text-lg max-w-md leading-relaxed h-14">
          {activeSection === 'benefits' 
            ? (lang === 'en' ? 'The fruits of a stabilized and purified mind.' : 'တည်ငြိမ်ပြီး သန့်စင်သော စိတ်၏ အသီးအပွင့်များ။') 
            : (lang === 'en' ? 'To master the mind, one must first deconstruct the illusion of a solid self.' : 'စိတ်ကို ထိန်းချုပ်ရန်မှာ အတ္တဟူသော အထင်မှားမှုကို အရင်ဆုံး ဖယ်ရှားရမည်။')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 overflow-y-auto pr-4 scrollbar-hide pb-12 mt-4">
        {activeSection === 'aggregates' && MIND_AGGREGATES.map((m, idx) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col gap-4 pb-12 border-b border-dharma-accent/10 last:border-0"
          >
            <div className="flex items-center gap-4">
              <span className="serif text-dharma-accent text-3xl italic opacity-40">0{idx + 1}</span>
              <h3 className="font-bold text-xs uppercase tracking-widest my-text">{(lang === 'en' ? m.title : m.titleMy)} · {m.name}</h3>
            </div>
            <div className="pl-12">
              <p className="text-dharma-ink font-medium text-sm leading-relaxed max-w-sm my-text mb-4">{lang === 'en' ? m.desc : m.descMy}</p>
              <div className="p-6 bg-dharma-accent/5 rounded-3xl border border-dharma-accent/5">
                <p className="text-dharma-muted text-xs leading-relaxed my-text whitespace-pre-wrap italic">
                  {lang === 'en' ? (m as any).details : (m as any).detailsMy}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {activeSection === 'benefits' && MEDITATION_BENEFITS.map((b, idx) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group flex flex-col p-8 rounded-3xl border border-dharma-accent/20 bg-dharma-sidebar/5 hover:bg-dharma-accent/5 transition-all shadow-sm"
          >
            <div className="flex items-start gap-6">
              <div className="mt-1 flex items-center justify-center w-10 h-10 rounded-full bg-dharma-accent/20 text-dharma-accent">
                <LotusIcon size={18} />
              </div>
              <div>
                <h3 className="serif text-2xl font-medium text-dharma-ink mb-3 my-text group-hover:text-dharma-accent transition-colors">
                  {lang === 'en' ? b.title : b.titleMy}
                </h3>
                <p className="text-dharma-muted text-sm leading-relaxed my-text">
                  {lang === 'en' ? b.desc : b.descMy}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Abhidhamma({ lang, vLevel }: { lang: 'en' | 'my', vLevel: number }) {
  const [viewMode, setViewMode] = useState<'books' | 'glossary'>('books');
  const [activeBook, setActiveBook] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  // Reset chapter when book changes
  useEffect(() => {
    setActiveChapter(0);
  }, [activeBook]);

  const prevBook = () => {
    setActiveBook(prev => (prev > 0 ? prev - 1 : ABHIDHAMMA_BOOKS.length - 1));
    haptic(vLevel);
  };

  const nextBook = () => {
    setActiveBook(prev => (prev < ABHIDHAMMA_BOOKS.length - 1 ? prev + 1 : 0));
    haptic(vLevel);
  };

  const prevChapter = () => {
    if (chapters.length === 0) return;
    setActiveChapter(prev => (prev > 0 ? prev - 1 : chapters.length - 1));
    haptic(vLevel);
  };

  const nextChapter = () => {
    if (chapters.length === 0) return;
    setActiveChapter(prev => (prev < chapters.length - 1 ? prev + 1 : 0));
    haptic(vLevel);
  };

  const currentBook = ABHIDHAMMA_BOOKS[activeBook];
  const chapters = (currentBook as any).chapters || [];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-8">
        <div className="step-label">Doctrine</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="serif text-5xl md:text-7xl font-medium leading-[1.1] mb-4 my-text text-dharma-ink">
              {lang === 'en' ? 'Buddha' : 'မြတ်စွာဘုရား၏'} <br /> <span className="italic">{lang === 'en' ? 'Abhidhamma' : 'အဘိဓမ္မာ'}</span>
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={() => { setViewMode('books'); haptic(vLevel); }}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                  viewMode === 'books' ? "bg-dharma-ink text-dharma-bg shadow-lg" : "bg-dharma-accent/10 text-dharma-muted hover:bg-black/5"
                )}
              >
                Books
              </button>
              <button 
                onClick={() => { setViewMode('glossary'); haptic(vLevel); }}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                  viewMode === 'glossary' ? "bg-dharma-ink text-dharma-bg shadow-lg" : "bg-dharma-accent/10 text-dharma-muted hover:bg-black/5"
                )}
              >
                Glossary
              </button>
            </div>
            {viewMode === 'books' && (
              <p className="text-dharma-muted text-sm max-w-md leading-relaxed my-text">
                {lang === 'en' 
                  ? 'The ultimate teachings of the Buddha, analyzing the nature of all life and consciousness. Browse the seven books of wisdom.'
                  : 'ဘုရားရှင်၏ နောက်ဆုံးကျမ်း၊ ရုပ်နာမ်ဓမ္မတို့၏ သဘာဝကို အသေးစိတ် ခွဲခြမ်းပြဆိုရာ ကျမ်းဖြစ်သတည်း။'}
              </p>
            )}
            {viewMode === 'glossary' && (
              <p className="text-dharma-muted text-sm max-w-md leading-relaxed my-text">
                {lang === 'en' 
                  ? 'Quickly reference key concepts and ultimate realities found within the Abhidhamma Pitaka.'
                  : 'အဘိဓမ္မာကျမ်းလာ အခြေခံပရမတ္ထတရားများနှင့် ဝေါဟာရများကို အလွယ်တကူ ရှာဖွေနိုင်ပါသည်။'}
              </p>
            )}
          </div>
          
          {/* Progress Indicator for Books */}
          {viewMode === 'books' && (
            <div className="flex gap-2 mb-2">
              {ABHIDHAMMA_BOOKS.map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    activeBook === i ? "w-8 bg-dharma-accent" : "w-2 bg-dharma-accent/20"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 overflow-hidden">
        {viewMode === 'books' ? (
          <>
            {/* Book List Sidebar */}
            <div className="w-full md:w-64 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar pb-4 md:pb-0 shrink-0">
              {ABHIDHAMMA_BOOKS.map((book, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveBook(i); haptic(vLevel); }}
                  className={cn(
                    "group relative text-left p-4 rounded-3xl transition-all h-fit overflow-hidden flex-shrink-0",
                    "w-[140px] md:w-full md:whitespace-normal",
                    activeBook === i 
                      ? "bg-dharma-ink text-dharma-bg scale-[1.02] shadow-lg" 
                      : "bg-dharma-card border border-dharma-accent/10 text-dharma-ink hover:bg-dharma-accent/10"
                  )}
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Book 0{i + 1}</div>
                  <div className="font-bold text-xs my-text truncate">{lang === 'en' ? book.title : book.titleMy}</div>
                  
                  {/* Individual Book Progress Bar (Subtle) */}
                  {activeBook === i && (
                    <motion.div 
                      layoutId="book-progress" 
                      className="absolute bottom-0 left-0 h-1 bg-dharma-accent w-full"
                      initial={false}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content View */}
            <div className="flex-1 flex flex-col gap-6 overflow-hidden">
              <div className="flex-1 bg-dharma-card border border-dharma-accent/10 rounded-[40px] p-8 md:p-12 overflow-y-auto scrollbar-hide backdrop-blur-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeBook}-${activeChapter}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -100) nextChapter();
                      else if (info.offset.x > 100) prevChapter();
                    }}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                      <div className="flex-1">
                        <div className="serif italic text-3xl text-dharma-accent mb-6 leading-tight my-text underline underline-offset-8">
                          {lang === 'en' ? currentBook.summary : currentBook.summaryMy}
                        </div>

                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }} 
                          animate={{ opacity: 1, scale: 1 }} 
                          className="mb-8 p-6 bg-dharma-accent/5 border-l-2 border-dharma-accent rounded-r-3xl"
                        >
                          <p className="text-dharma-ink font-medium text-sm leading-relaxed my-text italic opacity-80">
                            {lang === 'en' ? (currentBook as any).detailedSummary : (currentBook as any).detailedSummaryMy}
                          </p>
                        </motion.div>

                        <p className="text-dharma-muted text-xs italic mb-8 my-text opacity-60">
                          {lang === 'en' ? currentBook.brief : currentBook.briefMy}
                        </p>
                      </div>

                      {/* Chapter List */}
                      <div className="w-full md:w-56 shrink-0">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-dharma-accent mb-4">
                          {lang === 'en' ? 'Chapters' : 'အခန်းများ'}
                        </h4>
                        <div className="space-y-2">
                          {chapters.map((chap: any, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => { setActiveChapter(idx); haptic(vLevel); }}
                              className={cn(
                                "w-full text-left p-3 rounded-2xl text-[10px] font-bold transition-all border",
                                activeChapter === idx
                                  ? "bg-dharma-accent text-dharma-ink border-transparent shadow-md"
                                  : "bg-transparent border-dharma-accent/10 text-dharma-muted hover:border-dharma-accent/30"
                              )}
                            >
                              <div className="uppercase tracking-widest mb-1 opacity-50">CH 0{idx + 1}</div>
                              <div className="my-text truncate">{lang === 'en' ? chap.title : chap.titleMy}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Chapter Progress Dots (Visual Feedback) */}
                    {chapters.length > 1 && (
                      <div className="flex flex-wrap justify-center gap-1.5 mb-8 opacity-60">
                        {chapters.map((_, idx) => (
                          <div 
                            key={idx}
                            className={cn(
                              "h-1 rounded-full transition-all duration-300",
                              activeChapter === idx ? "w-4 bg-dharma-accent" : "w-1 bg-dharma-accent/20"
                            )}
                          />
                        ))}
                      </div>
                    )}

                    <div className="w-12 h-1 bg-dharma-accent mb-8" />
                    
                    <div className="space-y-12">
                      {/* Selected Chapter Content */}
                      <motion.div
                        key={`${activeBook}-${activeChapter}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-8 bg-dharma-ink/5 rounded-[40px] border border-dharma-accent/5"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <Circle size={8} className="fill-dharma-accent text-dharma-accent" />
                          <h3 className="serif text-xl text-dharma-ink italic">
                            {lang === 'en' ? chapters[activeChapter]?.title : chapters[activeChapter]?.titleMy}
                          </h3>
                        </div>
                        <p className="text-dharma-muted text-sm leading-relaxed my-text mb-4">
                          {lang === 'en' ? chapters[activeChapter]?.desc : chapters[activeChapter]?.descMy}
                        </p>
                        <div className="h-0.5 w-10 bg-dharma-accent/20 mb-4" />
                        <p className="text-dharma-ink text-base md:text-lg leading-[1.8] my-text whitespace-pre-wrap">
                          {lang === 'en' ? currentBook.content : currentBook.contentMy}
                        </p>
                      </motion.div>

                      {/* Wisdom Pillars Section */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(currentBook as any).keyPrinciples?.map((pillar: string, idx: number) => (
                          <div key={idx} className="p-4 bg-dharma-card border border-dharma-accent/10 rounded-3xl flex flex-col items-center text-center group hover:bg-dharma-accent/5 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-dharma-accent/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                              <LotusIcon size={14} className="text-dharma-accent" />
                            </div>
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-dharma-ink mb-1">
                              {lang === 'en' ? 'Pillar' : 'မူလအချက်'} 0{idx + 1}
                            </h5>
                            <p className="text-[11px] font-medium text-dharma-muted my-text leading-tight">
                              {lang === 'en' ? pillar : (currentBook as any).keyPrinciplesMy[idx]}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      {/* Detailed Analysis Section */}
                      <div className="pt-8 border-t border-dharma-accent/10">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-dharma-accent mb-4">
                          {lang === 'en' ? 'Philosophical Basis' : 'ဒဿနဆိုင်ရာ အခြေခံ'}
                        </h4>
                        <p className="text-dharma-muted text-sm leading-relaxed my-text italic">
                          {lang === 'en' 
                            ? 'Through this text, the Buddha reveals the invisible threads of conditionality that bind all mental and physical events.'
                            : 'ဤကျမ်းအားဖြင့် မြတ်စွာဘုရားသည် နာမ်ရုပ်တရားတို့၏ အပြန်အလှန် ဆက်စပ်နေသော အကြောင်းတရားများကို ဖော်ထုတ်ပြသခဲ့သည်။'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons for Books */}
              <div className="flex items-center justify-between gap-4 px-4 pb-4">
                <button
                  onClick={prevBook}
                  className="flex items-center gap-3 px-6 py-4 bg-dharma-card border border-dharma-accent/10 rounded-full text-dharma-ink hover:bg-dharma-accent/5 transition-all group"
                >
                  <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] my-text">
                    {lang === 'en' ? 'Previous' : 'အရင်ကျမ်း'}
                  </span>
                </button>

                <button
                  onClick={nextBook}
                  className="flex items-center gap-3 px-6 py-4 bg-dharma-ink text-dharma-bg rounded-full hover:bg-dharma-accent hover:text-dharma-ink transition-all shadow-lg group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] my-text">
                    {lang === 'en' ? 'Next' : 'နောက်ကျမ်း'}
                  </span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Glossary View */
          <div className="flex-1 flex flex-col gap-6 overflow-hidden">
            <div className="flex-1 bg-dharma-card border border-dharma-accent/10 rounded-[40px] p-8 md:p-12 overflow-y-auto scrollbar-hide backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {ABHIDHAMMA_GLOSSARY.map((item, idx) => (
                  <motion.div 
                    key={item.term}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6 bg-dharma-bg/50 border border-dharma-accent/5 rounded-[32px] hover:border-dharma-accent transition-all group relative"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <BookOpen size={16} className="text-dharma-accent" />
                        <h3 className="serif text-lg font-medium text-dharma-ink">{item.term}</h3>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-dharma-accent opacity-40">{item.pali}</span>
                    </div>
                    <p className="text-dharma-muted text-xs leading-relaxed mb-6 my-text">
                      {lang === 'en' ? item.meaning : item.meaningMy}
                    </p>
                    <button 
                      onClick={() => {
                        setActiveBook(item.bookLink);
                        setViewMode('books');
                        haptic(vLevel);
                      }}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-dharma-accent hover:opacity-100 opacity-60 transition-all"
                    >
                      <span>{lang === 'en' ? 'Learn from Book' : 'ကျမ်းလာအဆို'} 0{item.bookLink + 1}</span>
                      <ArrowRight size={12} />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('welcome');
  const [showTutorial, setShowTutorial] = useState(false);
  const [lang, setLang] = useState<'en' | 'my'>('en');
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [fontSize, setFontSize] = useState(16);
  const [vLevel, setVLevel] = useState(2);
  const [focus, setFocus] = useState('All');
  const [showExitToast, setShowExitToast] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // Lifed up to handle back button
  const lastBackPress = useRef<number>(0);

  // Helper for consistent navigation
  const navigateTo = (tabId: string) => {
    setActiveTab(tabId);
    window.history.pushState({ tab: tabId }, '', '');
    haptic(vLevel);
  };

  // Initial history setup
  useEffect(() => {
    // Keep a base state
    window.history.replaceState({ tab: 'welcome' }, '', '');
    // Push an additional state so we can catch the first back press on welcome
    window.history.pushState({ tab: 'welcome' }, '', '');
  }, []);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // Priority 1: Close settings if open
      if (showSettings) {
        setShowSettings(false);
        window.history.pushState({ tab: activeTab }, '', '');
        return;
      }

      // Priority 2: Hierarchical navigation
      if (activeTab !== 'home' && activeTab !== 'welcome') {
        // If not on home/welcome, go to home
        setActiveTab('home');
        // Push state back so we can catch next back press
        window.history.pushState({ tab: 'home' }, '', '');
      } else {
        // Already on home or welcome screen, handle double press to exit
        const now = Date.now();
        if (now - lastBackPress.current < 2000) {
          // Double press within 2s - Exit app logic
          // (In browser context, we can't always close, but we notify)
          haptic(5);
        } else {
          lastBackPress.current = now;
          setShowExitToast(true);
          setTimeout(() => setShowExitToast(false), 2000);
          // Push state back to prevent actual browser navigation away
          window.history.pushState({ tab: activeTab }, '', '');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab, showSettings]);

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
    document.documentElement.style.setProperty('--app-font-size', `${fontSize}px`);
    document.documentElement.style.setProperty('--vibe-intensity', `${vLevel}`);
    
    // Dynamic line height calculation
    // Base is 1.7. Tighten slightly as font gets larger, loosen for small fonts.
    // Also loosen slightly for wider screens to improve flow.
    const baseLH = 1.7;
    const fontAdjustment = (16 - fontSize) * 0.02;
    const isDesktop = window.innerWidth > 1024;
    const widthAdjustment = isDesktop ? 0.1 : 0;
    const finalLH = Math.max(1.4, Math.min(2.0, baseLH + fontAdjustment + widthAdjustment));
    document.documentElement.style.setProperty('--app-line-height', `${finalLH}`);
  }, [theme, fontSize, vLevel]);

  const handleStart = () => {
    navigateTo('home');
  };

  return (
    <main className={cn(
      "relative min-h-screen transition-all duration-500 bg-black/20",
      activeTab === 'welcome' ? "p-0" : "p-0 lg:p-6 lg:gap-6 lg:grid lg:grid-cols-[400px_1fr]"
    )}>
      <ExitToast lang={lang} visible={showExitToast} />
      
      <AnimatePresence>
        {showTutorial && (
          <OnboardingTutorial key="tutorial" onComplete={() => setShowTutorial(false)} lang={lang} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeTab === 'welcome' ? (
          <WelcomeHero key="welcome" onStart={handleStart} lang={lang} setLang={setLang} vLevel={vLevel} />
        ) : (
          <>
            {/* Left Static Pane */}
            <motion.aside 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hero-pane relative overflow-hidden hidden lg:flex rounded-[2rem] shadow-2xl border border-white/10"
            >
              <div className="hero-bg-image" />

              <div className="z-10">
                <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-dharma-accent mb-12">The Still Mind</div>
                <h1 
                  className={cn("main-quote my-text text-dharma-sidebar-text", lang === 'my' && "text-6xl md:text-7xl")}
                  style={{ lineHeight: lang === 'my' ? '1.8' : undefined }}
                >
                  {lang === 'en' ? 'The Mind' : 'စိတ်သည်'} <br /> {lang === 'en' ? 'Is' : 'အရာရာ'} <br /> {lang === 'en' ? 'Everything.' : 'ဖြစ်သတည်း။'}
                </h1>
              </div>
              
              <div className="z-10">
                <div className="w-12 h-0.5 bg-dharma-accent mb-6"></div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-dharma-sidebar-text opacity-40">— Gautama Buddha</div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-dharma-accent/10 pointer-events-none" />
            </motion.aside>

            {/* Right Content Pane */}
            <motion.section 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="content-pane relative overflow-hidden flex flex-col lg:rounded-[2rem] shadow-2xl border border-white/20"
            >
              <Header 
                activeTab={activeTab} 
                setActiveTab={navigateTo} 
                lang={lang} 
                setLang={setLang}
                theme={theme}
                setTheme={setTheme}
                fontSize={fontSize}
                setFontSize={setFontSize}
                vLevel={vLevel}
                setVLevel={setVLevel}
                focus={focus}
                setFocus={setFocus}
                showSettings={showSettings}
                setShowSettings={setShowSettings}
              />
              
              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeTab === 'home' && (
                    <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full overflow-y-auto scrollbar-hide">
                      <StepGallery lang={lang} focus={focus} vLevel={vLevel} />
                    </motion.div>
                  )}
                  {activeTab === 'mind' && (
                    <motion.div key="mind" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full overflow-y-auto scrollbar-hide">
                      <MindWisdom lang={lang} vLevel={vLevel} />
                    </motion.div>
                  )}
                  {activeTab === 'abhi' && (
                    <motion.div key="sangha" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full">
                      <Abhidhamma lang={lang} vLevel={vLevel} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
