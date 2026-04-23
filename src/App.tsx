import { useState, useEffect, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Eye, 
  ScrollText, 
  Bell, 
  HeartHandshake, 
  User, 
  MoreHorizontal, 
  Feather, 
  Settings, 
  TreePine,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Palette,
  BookOpen,
  Book,
  Library,
  Hash,
  Lightbulb,
  Flower2,
  Flower2 as LotusIcon,
  Network,
  Type
} from 'lucide-react';
import { cn } from './lib/utils';
import { DHARMA_STEPS, FOLLOWING_POSTS, MIND_AGGREGATES, ABHIDHAMMA_BOOKS, ABHIDHAMMA_GLOSSARY, ANAPANA_INSTRUCTIONS } from './constants';

const haptic = (intensity: number = 1) => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    const duration = 10 * intensity;
    navigator.vibrate(duration);
  }
};

function TweetAuthAvatar({ icon }: { icon?: any }) {
  const Icon = typeof icon === 'string' ? null : (icon || LotusIcon);
  return (
    <div className="w-10 h-10 rounded-full bg-x-hover-heavy backdrop-blur-sm flex items-center justify-center shrink-0 border border-x-border/30 shadow-inner overflow-hidden">
      {typeof icon === 'string' ? (
        <span className="text-2xl">{icon}</span>
      ) : (
        <Icon size={20} className="text-x-accent glow-icon" />
      )}
    </div>
  );
}


function Tweet({ name, handle, time, title, content, isExpanded, onToggle, icon, lang }: any) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isExpanded && containerRef.current) {
      const headerOffset = window.innerWidth < 640 ? 52 : 60;
      const elementPosition = containerRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [isExpanded]);

  return (
    <article 
      ref={containerRef}
      onClick={onToggle} 
      className="px-4 py-3 border-b border-x-border/30 hover:bg-x-hover transition-colors cursor-pointer flex gap-3 group bg-x-surface sm:bg-transparent lesson-item"
    >
      <TweetAuthAvatar icon={icon} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[15px]">
            <span className="font-semibold hover:underline truncate category-label text-x-ink">{name}</span>
            <span className="truncate meta-text text-x-secondary">@{handle}</span>
            <span className="text-x-muted opacity-50">·</span>
            <span className="hover:underline duration text-x-muted">{time}</span>
          </div>
          <motion.div 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-x-muted group-hover:text-x-accent transition-colors"
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
        
        <div className="text-[15px] mt-1 my-text leading-[1.6]">
          {title && <strong className="block mb-1 text-x-ink text-[16px] leading-[1.4] card-title font-bold">{title}</strong>}
          
          <motion.div
            initial={false}
            animate={{ 
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
              marginTop: isExpanded ? 4 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <span className="text-x-secondary whitespace-pre-wrap block transition-colors lesson-body">{content}</span>
          </motion.div>
        </div>
        
        {!isExpanded && (
          <div className="text-x-muted text-xs mt-1 font-medium meta-text">
            {lang === 'en' ? 'Click to expand...' : 'အသေးစိတ်ကြည့်ရန် နှိပ်ပါ။'}
          </div>
        )}
      </div>
    </article>
  );
}

function HomeFeed({ lang, tab }: any) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const posts = tab === 'foryou' ? DHARMA_STEPS : FOLLOWING_POSTS;

  return (
    <div className="pb-20 sm:pb-0">
      {tab === 'foryou' ? (
        DHARMA_STEPS.map((step, i) => (
          <Tweet
            key={step.id}
            name={lang === 'en' ? "Dharma Pathways" : "လမ်းစဉ်များ"}
            handle="dharma"
            time={lang === 'en' ? `${i + 1}h` : `${i + 1} နာရီ`}
            title={lang === 'en' ? step.title : step.titleMy}
            content={lang === 'en' ? `${step.description}\n\n${step.practice}\n\n${step.content}\n\n#${step.pali} #${step.categories.join(' #')}` : `${step.descriptionMy}\n\n${step.practiceMy}\n\n${step.contentMy}\n\n#${step.pali} #${step.categories.join(' #')}`}
            isExpanded={expandedId === step.id}
            onToggle={() => setExpandedId(expandedId === step.id ? null : step.id)}
            icon={Leaf}
            lang={lang}
          />
        ))
      ) : (
        FOLLOWING_POSTS.map((post, i) => (
          <Tweet
            key={post.id}
            name={post.author}
            handle={post.handle}
            time={lang === 'en' ? post.time : post.time.replace('h', ' နာရီ').replace('d', ' ရက်')}
            title={lang === 'en' ? post.title : post.titleMy}
            content={lang === 'en' ? `${post.content}\n\n#${post.pali}` : `${post.contentMy}\n\n#${post.pali}`}
            isExpanded={expandedId === post.id}
            onToggle={() => setExpandedId(expandedId === post.id ? null : post.id)}
            icon={post.icon || TreePine}
            lang={lang}
          />
        ))
      )}
    </div>
  );
}

function ExploreFeed({ lang }: any) {
  const [activeTab, setActiveTab] = useState<'anapana' | 'aggregates'>('anapana');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="pb-20 sm:pb-0">
      <div className="sticky top-[52px] sm:top-[60px] z-[40] px-3 pt-0 pb-2 bg-gradient-to-b from-x-background via-x-background/80 to-transparent">
        <div className="flex w-full glass-float rounded-2xl overflow-hidden p-1 gap-1">
          <button 
            onClick={() => { setActiveTab('anapana'); setExpandedId(null); haptic(0.5); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex-1 transition-all font-bold text-[12px] relative h-9 rounded-xl"
          >
            <div className="flex items-center justify-center h-full w-full relative z-10">
              <span className={cn("transition-colors", activeTab === 'anapana' ? "text-x-btn-text" : "text-x-muted font-normal opacity-80")}>
                {lang === 'en' ? 'Anapana' : 'အာနာပါန'}
              </span>
            </div>
            {activeTab === 'anapana' && (
              <motion.div 
                layoutId="explore-tab-pill"
                className="absolute inset-0 bg-x-accent tab-pill-active rounded-xl overflow-hidden"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              >
                 <div className="absolute inset-0 shimmer-sweep w-full h-full" />
              </motion.div>
            )}
          </button>
          <button 
            onClick={() => { setActiveTab('aggregates'); setExpandedId(null); haptic(0.5); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex-1 transition-all font-bold text-[12px] relative h-9 rounded-xl"
          >
            <div className="flex items-center justify-center h-full w-full relative z-10">
              <span className={cn("transition-colors", activeTab === 'aggregates' ? "text-x-btn-text" : "text-x-muted font-normal opacity-80")}>
                {lang === 'en' ? 'Aggregates' : 'ခန္ဓာငါးပါး'}
              </span>
            </div>
            {activeTab === 'aggregates' && (
              <motion.div 
                layoutId="explore-tab-pill"
                className="absolute inset-0 bg-x-accent tab-pill-active rounded-xl overflow-hidden"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              >
                 <div className="absolute inset-0 shimmer-sweep w-full h-full" />
              </motion.div>
            )}
          </button>
        </div>
      </div>

      <div>
        {activeTab === 'anapana' ? (
          ANAPANA_INSTRUCTIONS.map((instruction, i) => (
            <Tweet
              key={i}
              name={lang === 'en' ? "Meditation Guide" : "တရားအားထုတ်နည်း"}
              handle="anapanasati"
              time={lang === 'en' ? `Step ${i + 1}` : `အဆင့် ${i + 1}`}
              title={lang === 'en' ? instruction.title : instruction.titleMy}
              content={lang === 'en' ? `${instruction.description}\n\n${instruction.details}` : `${instruction.descriptionMy}\n\n${instruction.detailsMy}`}
              isExpanded={expandedId === `anapana-${i}`}
              onToggle={() => setExpandedId(expandedId === `anapana-${i}` ? null : `anapana-${i}`)}
              icon={Eye}
              lang={lang}
            />
          ))
        ) : (
          MIND_AGGREGATES.map((agg, i) => (
            <Tweet
              key={i}
              name={lang === 'en' ? "Truth" : "အမှန်တရား"}
              handle="khandha"
              time={lang === 'en' ? `${(i + 1) * 5}m` : `${(i + 1) * 5} မိနစ်`}
              title={lang === 'en' ? agg.title : agg.titleMy}
              content={lang === 'en' ? `${agg.desc}\n\n${agg.details}\n\n#${agg.name}` : `${agg.descMy}\n\n${agg.detailsMy}\n\n#${agg.name}`}
              isExpanded={expandedId === `agg-${i}`}
              onToggle={() => setExpandedId(expandedId === `agg-${i}` ? null : `agg-${i}`)}
              icon={Eye}
              lang={lang}
            />
          ))
        )}
      </div>
    </div>
  );
}

function AbhidhammaBookItem({ book, i, lang, isExpanded, onToggle }: any) {
  const [showChapters, setShowChapters] = useState(false);
  const [showPrinciples, setShowPrinciples] = useState(false);
  const [showPaccayas, setShowPaccayas] = useState(false);
  const [expandedChapterIdx, setExpandedChapterIdx] = useState<number | null>(null);
  const [expandedPrincipleIdx, setExpandedPrincipleIdx] = useState<number | null>(null);
  const [expandedPaccayaIdx, setExpandedPaccayaIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isExpanded && containerRef.current) {
      const headerOffset = window.innerWidth < 640 ? 110 : 120; // More offset for sticky tab bar
      const elementPosition = containerRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [isExpanded]);

  return (
    <article 
      ref={containerRef}
      className="px-4 py-5 border-b border-x-border/30 hover:bg-x-hover/50 transition-colors cursor-pointer group select-none bg-x-surface sm:bg-transparent book-item"
      onClick={onToggle}
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-2xl bg-x-accent/10 flex items-center justify-center shrink-0 border border-x-accent/20 transition-transform group-hover:scale-105">
          <BookOpen size={24} className="text-x-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] items-center font-bold uppercase tracking-[0.2em] leading-none mb-1.5 text-x-muted">
                {lang === 'en' ? `CANONICAL BOOK ${i + 1}` : `ကျမ်းအမှတ် ${i + 1}`}
              </span>
              <h3 className="text-lg font-bold leading-tight tracking-tight text-x-ink">
                {lang === 'en' ? book.title : book.titleMy}
              </h3>
            </div>
            <motion.div 
              animate={{ rotate: isExpanded ? 180 : 0 }} 
              className="shrink-0 mt-1 text-x-muted"
            >
              <ChevronDown size={20} />
            </motion.div>
          </div>
          <p className="text-[13px] mt-1.5 leading-relaxed line-clamp-2 italic text-x-secondary">
            "{lang === 'en' ? book.summary : book.summaryMy}"
          </p>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0, 
          opacity: isExpanded ? 1 : 0, 
          marginTop: isExpanded ? 20 : 0 
        }}
        className="overflow-hidden"
      >
        <div className="space-y-6 pt-4 border-t border-x-border/10">
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold text-x-muted uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="w-1 h-3 bg-x-accent rounded-full" />
              {lang === 'en' ? 'Core Essence' : 'အနှစ်ချုပ် အဓိပ္ပာယ်'}
            </h4>
            <p className="text-[14px] text-x-ink leading-relaxed lesson-body">
              {lang === 'en' ? book.detailedSummary : book.detailedSummaryMy}
            </p>
          </div>

          {/* Key Principles Collapsible */}
          <div className="rounded-2xl border border-x-border/20 overflow-hidden bg-x-hover/30">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowPrinciples(!showPrinciples); haptic(0.3); }}
              className="w-full flex items-center justify-between p-4 hover:bg-x-hover transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Lightbulb size={16} className="text-x-accent" />
                <span className="text-[11px] font-bold text-x-ink uppercase tracking-widest">{lang === 'en' ? 'Key Principles' : 'အဓိကမူများ'}</span>
              </div>
              <ChevronRight size={16} className={cn("text-x-muted transition-transform", showPrinciples && "rotate-90")} />
            </button>
            <motion.div
              initial={false}
              animate={{ height: showPrinciples ? 'auto' : 0, opacity: showPrinciples ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 grid gap-2">
                {(lang === 'en' ? book.keyPrinciples : book.keyPrinciplesMy).map((k: any, idx: number) => {
                  const isStr = typeof k === 'string';
                  const title = isStr ? k : k.title;
                  const desc = isStr ? null : k.desc;
                  return (
                    <div 
                      key={idx} 
                      className={cn(
                        "flex flex-col rounded-xl border transition-all cursor-pointer",
                        expandedPrincipleIdx === idx ? "bg-x-accent/5 border-x-accent/30 shadow-sm" : "bg-x-background/50 border-x-border/10 hover:border-x-border/40"
                      )}
                      onClick={(e) => { e.stopPropagation(); if(desc) { setExpandedPrincipleIdx(expandedPrincipleIdx === idx ? null : idx); haptic(0.2); } }}
                    >
                      <div className="flex items-center justify-between p-3">
                         <span className="text-[12px] font-bold text-x-ink">{title}</span>
                         {desc && <ChevronDown size={14} className={cn("text-x-muted transition-transform", expandedPrincipleIdx === idx && "rotate-180")} />}
                      </div>
                      
                      {desc && (
                        <motion.div
                          initial={false}
                          animate={{ height: expandedPrincipleIdx === idx ? 'auto' : 0, opacity: expandedPrincipleIdx === idx ? 1 : 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3">
                            <p className="text-[11px] text-x-muted leading-relaxed opacity-90 border-t border-x-border/10 pt-2">
                              {desc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Chapters Collapsible */}
          <div className="rounded-2xl border border-x-border/20 overflow-hidden bg-x-hover/30">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowChapters(!showChapters); haptic(0.3); }}
              className="w-full flex items-center justify-between p-4 hover:bg-x-hover transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Hash size={16} className="text-x-accent" />
                <span className="text-[11px] font-bold text-x-ink uppercase tracking-widest">{lang === 'en' ? 'Structure & Chapters' : 'အခန်းများ'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-x-muted bg-x-background px-2 py-0.5 rounded-full border border-x-border/20">{book.chapters.length}</span>
                <ChevronRight size={16} className={cn("text-x-muted transition-transform", showChapters && "rotate-90")} />
              </div>
            </button>
            <motion.div
              initial={false}
              animate={{ height: showChapters ? 'auto' : 0, opacity: showChapters ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 grid gap-2">
                {book.chapters.map((ch: any, idx: number) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "flex flex-col p-3 rounded-xl border transition-all cursor-pointer",
                      expandedChapterIdx === idx ? "bg-x-accent/5 border-x-accent/30 shadow-sm" : "bg-x-background/50 border-x-border/10 hover:border-x-border/40"
                    )}
                    onClick={(e) => { e.stopPropagation(); setExpandedChapterIdx(expandedChapterIdx === idx ? null : idx); haptic(); }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-[10px] font-mono font-bold text-x-accent opacity-50 mt-0.5">{(idx + 1).toString().padStart(2, '0')}</span>
                      <div className="flex-1">
                        <p className="text-[13px] font-bold text-x-ink leading-tight">{lang === 'en' ? ch.title : ch.titleMy}</p>
                        <p className={cn("text-[11px] text-x-muted mt-1 leading-normal opacity-80", expandedChapterIdx === idx ? "" : "line-clamp-1")}>
                          {lang === 'en' ? ch.desc : ch.descMy}
                        </p>
                      </div>
                      <ChevronDown size={14} className={cn("text-x-muted transition-transform mt-1", expandedChapterIdx === idx && "rotate-180")} />
                    </div>
                    
                    <motion.div
                      initial={false}
                      animate={{ height: expandedChapterIdx === idx ? 'auto' : 0, opacity: expandedChapterIdx === idx ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      {ch.details && (
                        <div className="mt-3 pt-3 border-t border-x-border/10">
                          <p className="text-[12px] text-x-ink leading-relaxed opacity-90">
                            {lang === 'en' ? ch.details : ch.detailsMy}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 24 Conditions Collapsible (Patthana Only) */}
          {book.paccayas && (
            <div className="rounded-2xl border border-x-border/20 overflow-hidden bg-x-hover/30">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowPaccayas(!showPaccayas); haptic(0.3); }}
                className="w-full flex items-center justify-between p-4 hover:bg-x-hover transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Network size={16} className="text-x-accent" />
                  <span className="text-[11px] font-bold text-x-ink uppercase tracking-widest">{lang === 'en' ? 'The 24 Conditions' : 'ပစ္စည်း ၂၄ ပါး'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-x-muted bg-x-background px-2 py-0.5 rounded-full border border-x-border/20">{book.paccayas.length}</span>
                  <ChevronRight size={16} className={cn("text-x-muted transition-transform", showPaccayas && "rotate-90")} />
                </div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: showPaccayas ? 'auto' : 0, opacity: showPaccayas ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 grid gap-2">
                  {book.paccayas.map((pac: any, idx: number) => (
                    <div 
                      key={idx} 
                      className={cn(
                        "flex flex-col p-3 rounded-xl border transition-all cursor-pointer",
                        expandedPaccayaIdx === idx ? "bg-x-accent/5 border-x-accent/30 shadow-sm" : "bg-x-background/50 border-x-border/10 hover:border-x-border/40"
                      )}
                      onClick={(e) => { e.stopPropagation(); setExpandedPaccayaIdx(expandedPaccayaIdx === idx ? null : idx); haptic(); }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-[10px] font-mono font-bold text-x-accent opacity-50 mt-0.5">{(idx + 1).toString().padStart(2, '0')}</span>
                        <div className="flex-1">
                          <p className="text-[13px] font-bold text-x-ink leading-tight">{lang === 'en' ? pac.title : pac.titleMy}</p>
                          <motion.div
                            initial={false}
                            animate={{ height: expandedPaccayaIdx === idx ? 'auto' : 0, opacity: expandedPaccayaIdx === idx ? 1 : 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2">
                              <p className="text-[11px] text-x-muted leading-relaxed opacity-90 border-t border-x-border/10 pt-2">
                                {lang === 'en' ? pac.desc : pac.descMy}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                        <ChevronDown size={14} className={cn("text-x-muted transition-transform mt-1", expandedPaccayaIdx === idx && "rotate-180")} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          <div className="space-y-3 bg-x-accent/5 rounded-2xl p-5 border border-x-accent/10">
            <h4 className="text-[10px] font-bold text-x-accent uppercase tracking-[0.2em]">{lang === 'en' ? 'Detailed Systematic Study' : 'အသေးစိတ် လေ့လာချက်'}</h4>
            <div className="text-[14px] text-x-ink leading-[1.7] lesson-body whitespace-pre-wrap opacity-95">
              {lang === 'en' ? book.content : book.contentMy}
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  );
}

function AbhidhammaGlossaryItem({ term, i, lang, isExpanded, onToggle }: any) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isExpanded && containerRef.current) {
      const headerOffset = window.innerWidth < 640 ? 110 : 120;
      const elementPosition = containerRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [isExpanded]);

  return (
    <article 
      ref={containerRef}
      className="px-4 py-5 border-b border-x-border/30 hover:bg-x-hover/50 transition-colors cursor-pointer group bg-x-surface sm:bg-transparent glossary-item"
      onClick={onToggle}
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-x-hover-heavy flex items-center justify-center shrink-0 border border-x-border/50 shadow-inner group-hover:border-x-accent/30 transition-all">
          <Flower2 size={20} className="text-x-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold leading-tight text-x-ink">
                {lang === 'en' ? term.term : term.termMy}
              </h3>
              <p className="text-[11px] font-bold uppercase tracking-widest mt-0.5 text-x-accent opacity-80">
                {term.pali}
              </p>
            </div>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="shrink-0 mt-1 text-x-muted">
              <ChevronDown size={20} />
            </motion.div>
          </div>
          <p className="text-[14px] mt-2 leading-relaxed line-clamp-1 text-x-secondary">
            {lang === 'en' ? term.meaning : term.meaningMy}
          </p>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0, marginTop: isExpanded ? 16 : 0 }}
        className="overflow-hidden"
      >
        <div className="pt-4 border-t border-x-border/10">
          <div className="bg-x-background/50 rounded-2xl p-5 border border-x-border/20 shadow-sm">
            <h4 className="text-[10px] font-bold text-x-muted uppercase tracking-[0.2em] mb-3">{lang === 'en' ? 'Philosophical Meaning' : 'ဓမ္မအဓိပ္ပာယ်'}</h4>
            <p className="text-[15px] text-x-ink leading-relaxed lesson-body font-medium">
              {lang === 'en' ? term.meaning : term.meaningMy}
            </p>
            
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-x-border/10">
               <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Reference' : 'ကိုးကားကျမ်း'}</span>
                  <span className="text-xs font-bold text-x-ink">{ABHIDHAMMA_BOOKS[term.bookLink][lang === 'en' ? 'title' : 'titleMy']}</span>
               </div>
               <div className="w-8 h-8 rounded-lg bg-x-accent/10 flex items-center justify-center text-x-accent">
                  <Book size={16} />
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  );
}

function AbhidhammaFeed({ lang }: any) {
  const [activeTab, setActiveTab] = useState<'books' | 'glossary'>('books');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="pb-20 sm:pb-0">
      <div className="sticky top-[52px] sm:top-[60px] z-[40] px-3 pt-0 pb-2 bg-gradient-to-b from-x-background via-x-background/80 to-transparent">
        <div className="flex w-full glass-float rounded-2xl overflow-hidden p-1 gap-1">
          <button 
            onClick={() => { setActiveTab('books'); setExpandedId(null); haptic(0.5); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex-1 transition-all font-bold text-[12px] relative h-9 rounded-xl"
          >
            <div className="flex items-center justify-center h-full w-full relative z-10">
              <span className={cn("transition-colors", activeTab === 'books' ? "text-x-btn-text" : "text-x-muted font-normal opacity-80")}>
                {lang === 'en' ? 'Books' : 'ကျမ်းများ'}
              </span>
            </div>
            {activeTab === 'books' && (
              <motion.div 
                layoutId="abhi-tab-pill"
                className="absolute inset-0 bg-x-accent tab-pill-active rounded-xl overflow-hidden"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              >
                 <div className="absolute inset-0 shimmer-sweep w-full h-full" />
              </motion.div>
            )}
          </button>
          <button 
            onClick={() => { setActiveTab('glossary'); setExpandedId(null); haptic(0.5); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex-1 transition-all font-bold text-[12px] relative h-9 rounded-xl"
          >
            <div className="flex items-center justify-center h-full w-full relative z-10">
              <span className={cn("transition-colors", activeTab === 'glossary' ? "text-x-btn-text" : "text-x-muted font-normal opacity-80")}>
                {lang === 'en' ? 'Glossary' : 'အဘိဓာန်'}
              </span>
            </div>
            {activeTab === 'glossary' && (
              <motion.div 
                layoutId="abhi-tab-pill"
                className="absolute inset-0 bg-x-accent tab-pill-active rounded-xl overflow-hidden"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              >
                 <div className="absolute inset-0 shimmer-sweep w-full h-full" />
              </motion.div>
            )}
          </button>
        </div>
      </div>

      <div>
        {activeTab === 'books' ? (
          ABHIDHAMMA_BOOKS.map((book: any, i) => (
            <AbhidhammaBookItem
              key={i}
              book={book}
              i={i}
              lang={lang}
              isExpanded={expandedId === `book-${i}`}
              onToggle={() => setExpandedId(expandedId === `book-${i}` ? null : `book-${i}`)}
            />
          ))
        ) : (
          ABHIDHAMMA_GLOSSARY.map((term: any, i) => (
            <AbhidhammaGlossaryItem
              key={i}
              term={term}
              i={i}
              lang={lang}
              isExpanded={expandedId === `term-${i}`}
              onToggle={() => setExpandedId(expandedId === `term-${i}` ? null : `term-${i}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'abhi'>('home');
  const [homeTab, setHomeTab] = useState<'foryou' | 'following'>('foryou');
  const [lang, setLang] = useState<'en' | 'my'>('en');
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>(() => {
    const saved = localStorage.getItem('app_theme');
    return (saved as any) || 'dark';
  });

  const handleChangeTheme = (nextTheme: 'light' | 'dark' | 'sepia') => {
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('app_theme', nextTheme);
    haptic(0.5);
  };

  const [blurAmount, setBlurAmount] = useState<number>(() => {
    const saved = localStorage.getItem('app_blur_amount');
    return saved ? parseInt(saved) : 16;
  });
  const [showSettings, setShowSettings] = useState(false);
  const showSettingsRef = useRef(false);
  
  useEffect(() => {
    showSettingsRef.current = showSettings;
  }, [showSettings]);

  const [contentKey, setContentKey] = useState(0);
  const [unseenIds, setUnseenIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('unseen_content_ids');
    // If first time, highlight Explore and Abhidhamma
    return saved ? JSON.parse(saved) : ['explore', 'abhi'];
  });
  const [lastBackClick, setLastBackClick] = useState(0);
  const [showExitToast, setShowExitToast] = useState(false);
  const [textSize, setTextSize] = useState<'sm' | 'md' | 'lg'>(() => {
    return (localStorage.getItem('app_text_size') as 'sm' | 'md' | 'lg') || 'md';
  });

  useEffect(() => {
    // Push an initial state to intercept the back button
    window.history.pushState({ index: 1 }, '', '');

    const handlePopState = (e: PopStateEvent) => {
      // Re-push state so we can intercept the next one
      window.history.pushState({ index: 1 }, '', '');
      
      const now = Date.now();
      
      // Close settings if open
      if (showSettingsRef.current) {
        closeSettings();
        return;
      }

      // Increment contentKey to force collapse all items in sub-feeds
      setContentKey(prev => prev + 1);

      if (activeTab !== 'home') {
        setActiveTab('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        haptic(0.5);
      } else {
        // We are already home
        // Always return to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (now - lastBackClick < 2000) {
          // Double back - simulate exit
          haptic(2);
          setShowExitToast(true);
        } else {
          setLastBackClick(now);
          haptic();
          setShowExitToast(true);
          setTimeout(() => setShowExitToast(false), 2000);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab, lastBackClick]);

  const openSettings = () => {
    window.history.pushState({ modal: 'settings' }, '', '');
    setShowSettings(true);
    haptic();
  };

  const closeSettings = () => {
    if (window.history.state?.modal === 'settings') {
      window.history.back();
    }
    setShowSettings(false);
  };

  const handleTabClick = (id: string) => {
    if (['home', 'explore', 'abhi'].includes(id)) {
      setActiveTab(id as any);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      haptic();
      
      // Clear notification dot
      if (unseenIds.includes(id)) {
        const newUnseen = unseenIds.filter(uid => uid !== id);
        setUnseenIds(newUnseen);
        localStorage.setItem('unseen_content_ids', JSON.stringify(newUnseen));
      }
    }
  };

  const handleSwipe = (direction: number) => {
    const tabs = ['home', 'explore', 'abhi'] as const;
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < tabs.length) {
      handleTabClick(tabs[newIndex] as string);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', textSize);
    localStorage.setItem('app_text_size', textSize);
  }, [textSize]);

  useEffect(() => {
    document.documentElement.style.setProperty('--x-glass-blur', `${blurAmount}px`);
    localStorage.setItem('app_blur_amount', blurAmount.toString());
  }, [blurAmount]);

  const navItems = [
    { id: 'home', icon: Leaf, label: lang === 'en' ? 'Dhamma' : 'ဓမ္မစာပေ' },
    { id: 'explore', icon: Eye, label: lang === 'en' ? 'Explore' : 'ရှာဖွေရန်' },
    { id: 'abhi', icon: ScrollText, label: lang === 'en' ? 'Abhidhamma' : 'အဘိဓမ္မာ' },
    { id: 'notif', icon: Bell, label: lang === 'en' ? 'Notifications' : 'သတိပေးချက်များ' },
    { id: 'library', icon: Library, label: lang === 'en' ? 'Library' : 'သိမ်းဆည်းရာ' },
    { id: 'profile', icon: User, label: lang === 'en' ? 'Profile' : 'ကိုယ်ရေးအကျဉ်း' },
    { id: 'more', icon: MoreHorizontal, label: lang === 'en' ? 'More' : 'ပိုမိုရန်' },
  ];

  return (
    <Fragment>
      <div className="zoom-content min-h-screen text-x-ink flex justify-center w-full mx-auto max-w-[1265px]">
        
        {/* Left Sidebar (Desktop) */}
        <header className="hidden sm:flex flex-col w-[88px] xl:w-[275px] h-screen sticky top-0 px-2 xl:px-4 py-3 shrink-0">
          <div className="flex flex-col h-full">
            <div className="w-12 h-12 flex items-center justify-center hover:bg-x-hover rounded-full cursor-pointer mb-2 transition-colors">
              <LotusIcon size={28} className="text-x-ink glow-lotus fill-none" />
            </div>
            
            <nav className="flex flex-col gap-1 w-full">
              {navItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className="group flex flex-row items-center w-fit relative"
                >
                  <div className="flex items-center gap-5 p-3 rounded-full group-hover:bg-x-hover transition-colors xl:pr-6 relative">
                    <div className="relative">
                      <item.icon 
                        key={`${item.id}-${activeTab === item.id}`}
                        size={26} 
                        className={cn("drawing-icon", activeTab === item.id ? "text-x-ink fill-none glow-lotus" : "text-x-muted glow-icon")} 
                        strokeWidth={activeTab === item.id ? 2.5 : 2} 
                      />
                      {unseenIds.includes(item.id) && (
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-x-accent rounded-full border-2 border-x-bg shadow-[0_0_10px_rgba(var(--x-accent),0.5)]" />
                      )}
                    </div>
                    <span className={cn("hidden xl:block text-xl my-text pl-1", activeTab === item.id ? "font-bold text-x-ink" : "text-x-muted")}>{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>

            <div className="mt-auto mb-4 relative">
              <button 
                onClick={openSettings}
                className={cn(
                  "flex items-center gap-3 p-3 w-full hover:bg-x-hover rounded-full transition-colors",
                  showSettings && "bg-x-hover-heavy"
                )}
              >
                <div className="w-10 h-10 rounded-full bg-x-border/30 shrink-0 flex items-center justify-center overflow-hidden">
                  <Settings size={20} className={cn("glow-icon drawing-icon", showSettings && "text-x-accent")} />
                </div>
                <div className="hidden xl:flex flex-col items-start min-w-0">
                  <span className="font-bold text-[15px] truncate">
                    {lang === 'en' ? 'Settings' : 'သတ်မှတ်ချက်'}
                  </span>
                  <span className="text-x-muted text-[13px] truncate">
                    {lang === 'en' ? 'Theme & Language' : 'အပြင်အဆင်နှင့် ဘာသာစကား'}
                  </span>
                </div>
                <MoreHorizontal size={18} className="hidden xl:block ml-auto text-x-muted" />
              </button>
            </div>
          </div>
        </header>

        {/* Middle Feed Column */}
      <motion.main
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.x > 100) handleSwipe(-1);
          else if (info.offset.x < -100) handleSwipe(1);
        }}
        className="w-full sm:max-w-[600px] border-x border-x-border/50 min-h-screen pb-16 sm:pb-0 shrink-0 bg-transparent"
      >
        
        {/* Sticky Header - Floating Glassmorphism Style */}
        <div className="sticky top-0 z-50 transition-all duration-500 px-4 pt-3 pb-2 bg-gradient-to-b from-x-background via-x-background/80 to-transparent">
          <div className="glass-float rounded-2xl overflow-hidden">
            <div className="h-10 flex items-center px-4 cursor-pointer border-b border-x-border/10">
              <h1 className="text-[14px] font-bold my-text tracking-wide text-x-ink page-heading flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-x-accent shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                {activeTab === 'home' && (lang === 'en' ? 'Dhamma' : 'ဓမ္မစာပေ')}
                {activeTab === 'explore' && (lang === 'en' ? 'Explore' : 'ရှာဖွေရန်')}
                {activeTab === 'abhi' && (lang === 'en' ? 'Abhidhamma' : 'အဘိဓမ္မာ')}
              </h1>
            </div>
            {activeTab === 'home' && (
              <div className="flex w-full">
                <button 
                  onClick={() => { setHomeTab('foryou'); haptic(0.5); }}
                  className="flex-1 hover:bg-x-hover transition-all font-bold text-[12px] relative h-11"
                >
                  <div className="flex items-center justify-center h-full w-full relative">
                    <span className={cn("font-bold transition-all duration-300 tab-label", homeTab === 'foryou' ? "text-x-ink active" : "text-x-muted font-normal opacity-60")}>
                      {lang === 'en' ? 'Dhamma Steps' : 'ဓမ္မလမ်းစဉ်'}
                    </span>
                    {homeTab === 'foryou' && (
                      <motion.div 
                        layoutId="home-tab-pill"
                        className="absolute bottom-1 left-1.5 right-1.5 h-1 bg-x-accent rounded-full tab-pill-active overflow-hidden"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      >
                        <div className="absolute inset-0 shimmer-sweep w-full h-full" />
                      </motion.div>
                    )}
                  </div>
                </button>
                <button 
                  onClick={() => { setHomeTab('following'); haptic(0.5); }}
                  className="flex-1 hover:bg-x-hover transition-all font-bold text-[12px] relative h-11"
                >
                  <div className="flex items-center justify-center h-full w-full relative">
                    <span className={cn("font-bold transition-all duration-300 tab-label", homeTab === 'following' ? "text-x-ink active" : "text-x-muted font-normal opacity-60")}>
                      {lang === 'en' ? 'Milinda Panha' : 'မိလိန္ဒပဉှာ'}
                    </span>
                    {homeTab === 'following' && (
                      <motion.div 
                        layoutId="home-tab-pill"
                        className="absolute bottom-1 left-1.5 right-1.5 h-1 bg-x-accent rounded-full tab-pill-active overflow-hidden"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      >
                        <div className="absolute inset-0 shimmer-sweep w-full h-full" />
                      </motion.div>
                    )}
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Feeds */}
        {activeTab === 'home' && <HomeFeed key={`home-${contentKey}`} lang={lang} tab={homeTab} />}
        {activeTab === 'explore' && <ExploreFeed key={`explore-${contentKey}`} lang={lang} />}
        {activeTab === 'abhi' && <AbhidhammaFeed key={`abhi-${contentKey}`} lang={lang} />}

      </motion.main>

      {/* Right Sidebar (Desktop Trends) */}
      <aside className="hidden lg:block w-[350px] shrink-0 pl-8 pr-2 py-3 sticky top-0 h-screen">
        <div className="w-full bg-x-hover backdrop-blur-md rounded-full flex items-center px-4 py-3 gap-3 border border-transparent focus-within:border-x-accent focus-within:bg-x-hover-heavy transition-colors group mb-4">
          <Search size={18} className="text-x-muted group-focus-within:text-x-accent glow-icon" />
          <input 
            type="text" 
            placeholder={lang === 'en' ? "Search" : "ရှာဖွေရန်"}
            className="bg-transparent border-none outline-none w-full text-[15px] my-text placeholder:text-x-muted text-x-ink"
          />
        </div>

        <div className="bg-x-hover-heavy backdrop-blur-md rounded-2xl pt-3 pb-1 border border-x-border/30 card">
          <h2 className="px-4 text-xl font-bold my-text mb-3 text-x-ink">{lang === 'en' ? "What's happening" : "ဘာတွေဖြစ်နေလဲ။"}</h2>
          
          {[1,2,3,4].map((item) => (
             <div key={item} className="px-4 py-3 hover:bg-x-hover cursor-pointer transition-colors border-t border-x-border/30 first:border-t-0 text-x-ink">
               <div className="flex justify-between">
                 <span className="text-[13px] text-x-muted my-text">
                   {lang === 'en' ? 'Trending in Mindfulness' : 'သတိပဋ္ဌာန်တွင် ရေပန်းစားသော'}
                 </span>
                 <MoreHorizontal size={16} className="text-x-muted glow-icon" />
               </div>
               <div className="font-bold text-[15px] mt-0.5 text-x-ink my-text">
                 {lang === 'en' ? 'Insight Meditation' : 'ဝိပဿနာ တရား'}
               </div>
               <div className="text-[13px] text-x-muted mt-1">{item * 1.5}K posts</div>
             </div>
          ))}
          <div className="px-4 py-4 hover:bg-x-hover cursor-pointer transition-colors rounded-b-2xl">
            <span className="text-[15px] text-x-accent">{lang === 'en' ? 'Show more' : 'ထပ်မံပြသရန်'}</span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav - Floating Glassmorphism Style */}
      <div className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-[60]">
        <nav className="glass-float rounded-[24px] h-16 flex items-center justify-around px-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5),0_0_20px_-5px_var(--x-glow)] bottom-nav">
          <button className="flex-1 flex justify-center items-center h-full relative" onClick={() => handleTabClick('home')}>
            <div className="relative">
              <Leaf 
                size={24} 
                className={cn("transition-all duration-300", activeTab === 'home' ? "text-x-ink glow-lotus" : "text-x-muted opacity-60")} 
                strokeWidth={activeTab === 'home' ? 2.5 : 2} 
              />
              {unseenIds.includes('home') && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-x-accent rounded-full border-2 border-x-background shadow-[0_0_10px_rgba(var(--x-accent),0.5)]" />
              )}
            </div>
            {activeTab === 'home' && (
              <motion.div layoutId="mobile-nav-pill" className="absolute bottom-2 w-1.5 h-1.5 bg-x-accent rounded-full shadow-[0_0_10px_var(--x-accent)]" />
            )}
          </button>
          <button className="flex-1 flex justify-center items-center h-full relative" onClick={() => handleTabClick('explore')}>
            <div className="relative">
              <Eye 
                size={24} 
                className={cn("transition-all duration-300", activeTab === 'explore' ? "text-x-ink glow-lotus" : "text-x-muted opacity-60")} 
                strokeWidth={activeTab === 'explore' ? 2.5 : 2} 
              />
              {unseenIds.includes('explore') && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-x-accent rounded-full border-2 border-x-background shadow-[0_0_10px_rgba(var(--x-accent),0.5)]" />
              )}
            </div>
            {activeTab === 'explore' && (
              <motion.div layoutId="mobile-nav-pill" className="absolute bottom-2 w-1.5 h-1.5 bg-x-accent rounded-full shadow-[0_0_10px_var(--x-accent)]" />
            )}
          </button>
          <button className="flex-1 flex justify-center items-center h-full relative" onClick={() => handleTabClick('abhi')}>
            <div className="relative">
              <ScrollText 
                size={24} 
                className={cn("transition-all duration-300", activeTab === 'abhi' ? "text-x-ink glow-lotus" : "text-x-muted opacity-60")} 
                strokeWidth={activeTab === 'abhi' ? 2.5 : 2} 
              />
              {unseenIds.includes('abhi') && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-x-accent rounded-full border-2 border-x-background shadow-[0_0_10px_rgba(var(--x-accent),0.5)]" />
              )}
            </div>
            {activeTab === 'abhi' && (
              <motion.div layoutId="mobile-nav-pill" className="absolute bottom-2 w-1.5 h-1.5 bg-x-accent rounded-full shadow-[0_0_10px_var(--x-accent)]" />
            )}
          </button>
          <button className="flex-1 flex justify-center items-center h-full relative" onClick={openSettings}>
            <Settings size={24} className={cn("transition-all", showSettings ? "text-x-accent glow-icon opacity-100 scale-110" : "text-x-muted opacity-60")} />
          </button>
        </nav>
      </div>

      {/* Exit Toast */}
      {showExitToast && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 glass-panel rounded-full text-xs font-bold text-x-ink z-[200] shadow-xl"
        >
          {activeTab === 'home' && lastBackClick > 0 && Date.now() - lastBackClick < 2000 
            ? (lang === 'en' ? 'Exiting...' : 'ထွက်ခွာနေသည်...')
            : (lang === 'en' ? 'Tap again to exit' : 'ထွက်ရန် ထပ်မံနှိပ်ပါ')}
        </motion.div>
      )}

    </div>

    {/* Settings Modal Overlay - Desktop & Mobile (Outside Zoom Container) */}
    <AnimatePresence>
      {showSettings && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSettings}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md bg-x-background rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-x-border/30 flex flex-col max-h-[85vh] sm:max-h-[80vh]"
          >
            <div className="flex justify-center pt-3 pb-2 sm:hidden">
              <div className="w-12 h-1.5 bg-x-border rounded-full" />
            </div>
            
            <div className="px-6 py-4 border-b border-x-border/10 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold my-text text-x-ink">{lang === 'en' ? 'Display & Settings' : 'ပြသမှုနှင့် သတ်မှတ်ချက်များ'}</h2>
              <button onClick={closeSettings} className="p-2 rounded-full hover:bg-x-hover transition-colors text-x-muted text-xl leading-none">
                &times;
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-8 my-text w-full">
              
              {/* Language Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Language' : 'ဘာသာစကား'}</span>
                </div>
                <div className="grid grid-cols-2 p-1 bg-x-surface-alt rounded-2xl border border-x-border/10 relative w-full">
                  <button 
                    onClick={() => { setLang('en'); haptic(); }}
                    className={cn(
                      "py-2.5 rounded-xl transition-all duration-300 z-10",
                      lang === 'en' ? "text-x-ink font-black" : "text-x-muted font-bold opacity-80"
                    )}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => { setLang('my'); haptic(); }}
                    className={cn(
                      "py-2.5 rounded-xl transition-all duration-300 z-10",
                      lang === 'my' ? "text-x-ink font-black" : "text-x-muted font-bold opacity-80"
                    )}
                  >
                    မြန်မာ
                  </button>
                  {/* Language active pill */}
                  <div 
                    className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-x-surface rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-transform duration-300 z-0"
                    style={{ 
                      transform: `translateX(${lang === 'en' ? '4px' : 'calc(100% + 4px)'})`
                    }} 
                  />
                </div>
              </section>

              {/* Theme Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Reading Theme' : 'ဖတ်ရှုရန် အပြင်အဆင်'}</span>
                </div>
                <div className="grid grid-cols-3 p-1 bg-x-surface-alt rounded-2xl border border-x-border/10 relative w-full">
                  <button 
                    onClick={() => handleChangeTheme('light')}
                    className={cn(
                      "py-2.5 rounded-xl transition-all duration-300 flex flex-col items-center gap-1.5 z-10",
                      theme === 'light' ? "text-x-ink font-black" : "text-x-muted font-bold opacity-80"
                    )}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#fbfbfa] border border-[#e1e1e0] shadow-sm"></div>
                    <span className="text-[10px] uppercase tracking-wider">{lang === 'en' ? 'Light' : 'လင်းသော'}</span>
                  </button>
                  <button 
                    onClick={() => handleChangeTheme('dark')}
                    className={cn(
                      "py-2.5 rounded-xl transition-all duration-300 flex flex-col items-center gap-1.5 z-10",
                      theme === 'dark' ? "text-x-ink font-black" : "text-x-muted font-bold opacity-80"
                    )}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#111111] border border-[#333] shadow-sm"></div>
                    <span className="text-[10px] uppercase tracking-wider">{lang === 'en' ? 'Dark' : 'မှောင်သော'}</span>
                  </button>
                  <button 
                    onClick={() => handleChangeTheme('sepia')}
                    className={cn(
                      "py-2.5 rounded-xl transition-all duration-300 flex flex-col items-center gap-1.5 z-10",
                      theme === 'sepia' ? "text-x-ink font-black" : "text-x-muted font-bold opacity-80"
                    )}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#FAECD8] border border-[#E6D0AE] shadow-sm"></div>
                    <span className="text-[10px] uppercase tracking-wider">{lang === 'en' ? 'Sepia' : 'ညိုဝါရောင်'}</span>
                  </button>
                  {/* Theme active pill */}
                  <div 
                    className="absolute top-1 bottom-1 w-[calc(33.33%-4px)] bg-x-surface rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-transform duration-300 z-0"
                    style={{ 
                      transform: `translateX(${theme === 'light' ? '4px' : theme === 'dark' ? 'calc(100% + 6px)' : 'calc(200% + 8px)'})`
                    }} 
                  />
                </div>
              </section>

              {/* Text Size Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Text Size' : 'စာလုံးအရွယ်အစား'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Type size={16} className="text-x-muted" />
                  <input 
                    type="range" 
                    min="0" max="2" step="1" 
                    defaultValue={
                      typeof document !== 'undefined' && document.documentElement.getAttribute('data-text-size') === 'sm' ? 0 : 
                      typeof document !== 'undefined' && document.documentElement.getAttribute('data-text-size') === 'lg' ? 2 : 1
                    }
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      const size = val === 0 ? 'sm' : val === 2 ? 'lg' : 'md';
                      if (typeof document !== 'undefined') {
                        document.documentElement.setAttribute('data-text-size', size);
                        localStorage.setItem('app_text_size', size);
                      }
                      haptic();
                    }}
                    className="flex-1 h-2 bg-x-surface-alt rounded-lg appearance-none cursor-pointer accent-x-accent"
                  />
                  <Type size={24} className="text-x-muted" />
                </div>
                <div className="flex justify-between px-1 mt-2 text-[10px] text-x-muted font-bold tracking-widest uppercase">
                  <span>{lang === 'en' ? 'Small' : 'သေးငယ်သော'}</span>
                  <span>{lang === 'en' ? 'Normal' : 'ပုံမှန်'}</span>
                  <span>{lang === 'en' ? 'Large' : 'ကြီးသော'}</span>
                </div>
              </section>

            </div>
            
            <div className="px-6 py-5 border-t border-x-border/10 w-full bg-x-surface shrink-0">
              <button 
                onClick={closeSettings}
                className="w-full py-3.5 bg-x-ink text-x-background rounded-full font-bold text-[15px] hover:scale-[0.98] active:scale-[0.95] transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-x-accent"
              >
                {lang === 'en' ? 'Done' : 'ပြီးပါပြီ'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </Fragment>
  );
}
