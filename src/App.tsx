import { useState, useEffect } from 'react';
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
  RefreshCw, 
  Flower2, 
  MessageSquareQuote, 
  Share2, 
  Settings, 
  TreePine,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Palette,
  BookOpen,
  Book,
  Hash,
  Lightbulb,
  Flower2 as LotusIcon
} from 'lucide-react';
import { cn } from './lib/utils';
import { DHARMA_STEPS, FOLLOWING_POSTS, MIND_AGGREGATES, ABHIDHAMMA_BOOKS, ABHIDHAMMA_GLOSSARY, type MindStep, MEDITATION_BENEFITS } from './constants';

const haptic = (intensity: number = 1) => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    const duration = 10 * intensity;
    navigator.vibrate(duration);
  }
};

function TweetAuthAvatar({ icon: Icon = LotusIcon }: { icon?: any }) {
  return (
    <div className="w-10 h-10 rounded-full bg-x-hover-heavy backdrop-blur-sm flex items-center justify-center shrink-0 border border-x-border/30 shadow-inner overflow-hidden">
      <Icon size={20} className="text-x-accent glow-icon" />
    </div>
  );
}

function TweetActionRow() {
  return (
    <div className="flex justify-between items-center mt-3 text-x-muted max-w-[425px]">
      <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 hover:text-[#1D9BF0] group">
        <div className="p-2 rounded-full group-hover:bg-[#1D9BF0]/10 transition-colors"><MessageSquareQuote size={18} className="glow-icon" /></div>
      </button>
      <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 hover:text-[#00BA7C] group">
        <div className="p-2 rounded-full group-hover:bg-[#00BA7C]/10 transition-colors"><RefreshCw size={18} className="glow-icon" /></div>
      </button>
      <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 hover:text-[#F91880] group">
        <div className="p-2 rounded-full group-hover:bg-[#F91880]/10 transition-colors"><Flower2 size={18} className="glow-icon" /></div>
      </button>
      <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 hover:text-[#1D9BF0] group">
        <div className="p-2 rounded-full group-hover:bg-[#1D9BF0]/10 transition-colors"><Share2 size={18} className="glow-icon" /></div>
      </button>
    </div>
  );
}

function Tweet({ name, handle, time, title, content, isExpanded, onToggle, icon }: any) {
  return (
    <article 
      onClick={onToggle} 
      className="px-4 py-3 border-b border-x-border/30 hover:bg-x-hover transition-colors cursor-pointer flex gap-3 group"
    >
      <TweetAuthAvatar icon={icon} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[15px]">
            <span className="font-bold hover:underline text-x-ink truncate category-label">{name}</span>
            <span className="text-x-muted truncate meta-text">@{handle}</span>
            <span className="text-x-muted">·</span>
            <span className="text-x-muted hover:underline duration">{time}</span>
          </div>
          <motion.div 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-x-muted group-hover:text-x-accent transition-colors"
          >
            <ChevronDown size={18} className="glow-icon" />
          </motion.div>
        </div>
        
        <div className="text-[15px] mt-1 my-text leading-[1.6]">
          {title && <strong className="block mb-1 text-x-ink text-[16px] leading-[1.4] card-title">{title}</strong>}
          
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
            <span className="text-x-ink whitespace-pre-wrap block transition-colors lesson-body">{content}</span>
            <div className="mt-3">
              <TweetActionRow />
            </div>
          </motion.div>
        </div>
        
        {!isExpanded && (
          <div className="text-x-muted text-xs mt-1 font-medium meta-text">
            Click to expand...
          </div>
        )}
      </div>
    </article>
  );
}

function HomeFeed({ lang, tab }: { lang: 'en' | 'my', tab: 'foryou' | 'following' }) {
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
            icon={TreePine}
          />
        ))
      )}
    </div>
  );
}

function ExploreFeed({ lang }: { lang: 'en' | 'my' }) {
  const [activeTab, setActiveTab] = useState<'benefits' | 'aggregates'>('benefits');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="pb-20 sm:pb-0">
      <div className="sticky top-0 z-30 px-3 pt-3 pb-2 bg-gradient-to-b from-x-background via-x-background/80 to-transparent">
        <div className="flex w-full glass-float rounded-2xl overflow-hidden p-1 gap-1">
          <button 
            onClick={() => { setActiveTab('benefits'); setExpandedId(null); haptic(0.5); }}
            className="flex-1 transition-all font-bold text-[12px] relative h-9 rounded-xl"
          >
            <div className="flex items-center justify-center h-full w-full relative z-10">
              <span className={cn("transition-colors", activeTab === 'benefits' ? "text-x-btn-text" : "text-x-muted font-normal opacity-80")}>
                {lang === 'en' ? 'Benefits' : 'အကျိုးကျေးဇူးများ'}
              </span>
            </div>
            {activeTab === 'benefits' && (
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
            onClick={() => { setActiveTab('aggregates'); setExpandedId(null); haptic(0.5); }}
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
        {activeTab === 'benefits' ? (
          MEDITATION_BENEFITS.map((benefit, i) => (
            <Tweet
              key={i}
              name={lang === 'en' ? "Philosophy" : "ဒဿန"}
              handle="deep_mind"
              time={lang === 'en' ? `${(i + 1) * 2}m` : `${(i + 1) * 2} မိနစ်`}
              title={lang === 'en' ? benefit.title : benefit.titleMy}
              content={lang === 'en' ? benefit.desc : benefit.descMy}
              isExpanded={expandedId === `benefit-${i}`}
              onToggle={() => setExpandedId(expandedId === `benefit-${i}` ? null : `benefit-${i}`)}
              icon={Eye}
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

  return (
    <article 
      className="px-4 py-5 border-b border-x-border/30 hover:bg-x-hover/50 transition-colors cursor-pointer group select-none"
      onClick={onToggle}
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-2xl bg-x-accent/10 flex items-center justify-center shrink-0 border border-x-accent/20 transition-transform group-hover:scale-105">
          <BookOpen size={24} className="text-x-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-x-accent uppercase tracking-[0.2em] leading-none mb-1.5 opacity-80">
                {lang === 'en' ? `CANONICAL BOOK ${i + 1}` : `ကျမ်းအမှတ် ${i + 1}`}
              </span>
              <h3 className="text-lg font-bold text-x-ink leading-tight tracking-tight">
                {lang === 'en' ? book.title : book.titleMy}
              </h3>
            </div>
            <motion.div 
              animate={{ rotate: isExpanded ? 180 : 0 }} 
              className="text-x-muted shrink-0 mt-1"
            >
              <ChevronDown size={20} />
            </motion.div>
          </div>
          <p className="text-[13px] text-x-muted mt-1.5 leading-relaxed line-clamp-2 italic opacity-85">
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
              <div className="px-4 pb-4 flex flex-wrap gap-2">
                {(lang === 'en' ? book.keyPrinciples : book.keyPrinciplesMy).map((k: string, idx: number) => (
                  <span key={idx} className="px-3 py-1.5 bg-x-background text-x-ink text-[11px] font-medium rounded-xl border border-x-border/30 shadow-sm">
                    {k}
                  </span>
                ))}
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
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-xl bg-x-background/50 border border-x-border/10">
                    <span className="text-[10px] font-mono font-bold text-x-accent opacity-50 mt-0.5">{(idx + 1).toString().padStart(2, '0')}</span>
                    <div>
                      <p className="text-[13px] font-bold text-x-ink leading-tight">{lang === 'en' ? ch.title : ch.titleMy}</p>
                      <p className="text-[11px] text-x-muted mt-1 leading-normal opacity-80">{lang === 'en' ? ch.desc : ch.descMy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
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
  return (
    <article 
      className="px-4 py-5 border-b border-x-border/30 hover:bg-x-hover/50 transition-colors cursor-pointer group"
      onClick={onToggle}
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-x-hover-heavy flex items-center justify-center shrink-0 border border-x-border/50 shadow-inner group-hover:border-x-accent/30 transition-all">
          <Flower2 size={20} className="text-x-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-x-ink leading-tight">
                {lang === 'en' ? term.term : term.termMy}
              </h3>
              <p className="text-[11px] font-bold text-x-accent uppercase tracking-widest mt-0.5 opacity-80">
                {term.pali}
              </p>
            </div>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="text-x-muted shrink-0 mt-1">
              <ChevronDown size={20} />
            </motion.div>
          </div>
          <p className="text-[14px] text-x-muted mt-2 leading-relaxed line-clamp-1">
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

function AbhidhammaFeed({ lang }: { lang: 'en' | 'my' }) {
  const [activeTab, setActiveTab] = useState<'books' | 'glossary'>('books');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="pb-20 sm:pb-0">
      <div className="sticky top-0 z-30 px-3 pt-3 pb-2 bg-gradient-to-b from-x-background via-x-background/80 to-transparent">
        <div className="flex w-full glass-float rounded-2xl overflow-hidden p-1 gap-1">
          <button 
            onClick={() => { setActiveTab('books'); setExpandedId(null); haptic(0.5); }}
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
            onClick={() => { setActiveTab('glossary'); setExpandedId(null); haptic(0.5); }}
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
  const [theme, setTheme] = useState<'forest' | 'dusk' | 'ember' | 'slate' | 'lotus' | 'void' | 'custom'>(() => {
    const saved = localStorage.getItem('app_theme');
    return (saved as any) || 'forest';
  });
  const [customTheme, setCustomTheme] = useState(() => {
    const saved = localStorage.getItem('app_custom_theme');
    return saved ? JSON.parse(saved) : {
      accent: '#C4714A',
      bgStart: '#1A2618',
      bgEnd: '#2C3A2A',
      font: 'Inter'
    };
  });
  const [blurAmount, setBlurAmount] = useState<number>(() => {
    const saved = localStorage.getItem('app_blur_amount');
    return saved ? parseInt(saved) : 16;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [unseenIds, setUnseenIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('unseen_content_ids');
    // If first time, highlight Explore and Abhidhamma
    return saved ? JSON.parse(saved) : ['explore', 'abhi'];
  });
  const [lastBackClick, setLastBackClick] = useState(0);
  const [showExitToast, setShowExitToast] = useState(false);

  useEffect(() => {
    // Push an initial state to intercept the back button
    window.history.pushState({ index: 1 }, '', '');

    const handlePopState = (e: PopStateEvent) => {
      // Re-push state so we can intercept the next one
      window.history.pushState({ index: 1 }, '', '');
      
      const now = Date.now();
      
      if (activeTab !== 'home') {
        setActiveTab('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        haptic(0.5);
      } else {
        // We are already home
        if (now - lastBackClick < 2000) {
          // Double back - simulate exit
          haptic(2);
          setShowExitToast(true);
          // In a real mobile app, this would close. 
          // Here we show a final goodbye state or just a message.
        } else {
          setLastBackClick(now);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          haptic();
          setShowExitToast(true);
          setTimeout(() => setShowExitToast(false), 2000);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab, lastBackClick]);

  const handleTabClick = (id: string) => {
    if (['home', 'explore', 'abhi'].includes(id)) {
      setActiveTab(id as any);
      haptic();
      
      // Clear notification dot
      if (unseenIds.includes(id)) {
        const newUnseen = unseenIds.filter(uid => uid !== id);
        setUnseenIds(newUnseen);
        localStorage.setItem('unseen_content_ids', JSON.stringify(newUnseen));
      }
    }
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('app_theme', theme);
    
    if (theme === 'custom') {
      const root = document.documentElement;
      root.style.setProperty('--x-accent', customTheme.accent);
      root.style.setProperty('--x-bg-color', customTheme.bgStart);
      root.style.setProperty('--x-bg-image', `linear-gradient(135deg, ${customTheme.bgStart} 0%, ${customTheme.bgEnd} 100%)`);
      
      let fontStack = '"Inter", system-ui, sans-serif';
      if (customTheme.font === 'Playfair Display') fontStack = '"Playfair Display", serif';
      if (customTheme.font === 'Space Grotesk') fontStack = '"Space Grotesk", sans-serif';
      if (customTheme.font === 'JetBrains Mono') fontStack = '"JetBrains Mono", monospace';
      root.style.setProperty('--app-font-family', fontStack);
      
      // Auto-calculate glow for custom theme
      root.style.setProperty('--x-glow', `${customTheme.accent}66`); // 40% opacity
      
      localStorage.setItem('app_custom_theme', JSON.stringify(customTheme));
    } else {
      // Reset custom properties when switching back to presets
      const root = document.documentElement;
      root.style.removeProperty('--app-font-family');
      root.style.removeProperty('--x-accent');
      root.style.removeProperty('--x-bg-color');
      root.style.removeProperty('--x-bg-image');
      root.style.removeProperty('--x-glow');
    }
  }, [theme, customTheme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--x-glass-blur', `${blurAmount}px`);
    localStorage.setItem('app_blur_amount', blurAmount.toString());
  }, [blurAmount]);

  const themes = [
    { id: 'forest', label: 'Forest', bg: 'linear-gradient(135deg, #1A2618 0%, #2C3A2A 100%)', accent: '#C4714A', dot: '#4A7C59' },
    { id: 'dusk', label: 'Dusk', bg: 'linear-gradient(135deg, #1A1520 0%, #2D1F3D 100%)', accent: '#A78BFA', dot: '#7C5CBF' },
    { id: 'ember', label: 'Ember', bg: 'linear-gradient(135deg, #1C1208 0%, #2E1C0A 100%)', accent: '#E8894A', dot: '#C4714A' },
    { id: 'lotus', label: 'Lotus', bg: 'linear-gradient(180deg, #F5F0E8 0%, #FFFFFF 100%)', accent: '#C4714A', dot: '#C4714A' },
    { id: 'slate', label: 'Slate', bg: 'linear-gradient(135deg, #0F1318 0%, #1A2232 100%)', accent: '#60A5FA', dot: '#3B82F6' },
    { id: 'void', label: 'Void', bg: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)', accent: '#ffffff', dot: '#333333' },
    { id: 'custom', label: 'Custom', bg: `linear-gradient(135deg, ${customTheme.bgStart} 0%, ${customTheme.bgEnd} 100%)`, accent: customTheme.accent, dot: customTheme.accent },
  ];

  const navItems = [
    { id: 'home', icon: Leaf, label: lang === 'en' ? 'Home' : 'ပင်မ' },
    { id: 'explore', icon: Eye, label: lang === 'en' ? 'Explore' : 'ရှာဖွေရန်' },
    { id: 'abhi', icon: ScrollText, label: lang === 'en' ? 'Abhidhamma' : 'အဘိဓမ္မာ' },
    { id: 'notif', icon: Bell, label: lang === 'en' ? 'Notifications' : 'သတိပေးချက်များ' },
    { id: 'messages', icon: HeartHandshake, label: lang === 'en' ? 'Messages' : 'မက်ဆေ့ခ်ျများ' },
    { id: 'profile', icon: User, label: lang === 'en' ? 'Profile' : 'ပရိုဖိုင်' },
    { id: 'more', icon: MoreHorizontal, label: lang === 'en' ? 'More' : 'ပိုမိုရန်' },
  ];

  return (
    <div className="min-h-screen text-x-ink flex justify-center w-full mx-auto max-w-[1265px]">
      
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

          <button className="hidden xl:flex bg-x-accent hover:bg-[#1A8CD8] text-x-btn-text font-bold text-[17px] w-[90%] rounded-full py-4 mt-4 transition-colors items-center justify-center shadow-md">
            {lang === 'en' ? 'Post' : 'တင်ရန်'}
          </button>
          <button className="xl:hidden w-12 h-12 bg-x-accent hover:bg-[#1A8CD8] text-x-btn-text flex items-center justify-center rounded-full mt-4 transition-colors shadow-md">
            <Feather size={24} className="glow-icon" />
          </button>

          <div className="mt-auto mb-4 relative">
            <button 
              onClick={() => { setShowSettings(!showSettings); haptic(); }}
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
                  {lang === 'en' ? 'Settings' : 'ဆက်တင်များ'}
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

      {/* New Centered Settings Modal Overlay */}
      {showSettings && (
        <div 
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-5 sm:p-0"
          onClick={() => setShowSettings(false)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="w-full max-w-[380px] bg-x-background rounded-[32px] border border-x-border overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-7 py-6 border-b border-x-border/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-x-accent/10 flex items-center justify-center text-x-accent">
                  <Palette size={22} className="glow-icon" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-x-ink leading-tight">
                    {lang === 'en' ? 'Preferences' : 'သင်၏အပြင်အဆင်'}
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-x-muted font-bold opacity-60">
                    Configuration
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="w-10 h-10 rounded-full hover:bg-x-hover flex items-center justify-center text-x-muted transition-colors active:scale-90"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-7 py-7 flex flex-col gap-8 max-h-[70vh] overflow-y-auto hide-scrollbar">
              {/* Theme Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Atmosphere' : 'အပြင်အဆင်'}</span>
                  <span className="text-[10px] font-bold text-x-accent px-2 py-0.5 bg-x-accent/10 rounded-full uppercase tracking-tighter capitalize">{theme}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {themes.map((t) => {
                    const active = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => { setTheme(t.id as any); haptic(0.5); }}
                        className={cn(
                          "group relative h-12 rounded-2xl border-2 transition-all duration-200 active:scale-95 flex items-center justify-center overflow-hidden",
                          active ? "border-x-accent bg-x-accent/5" : "border-x-border/20 bg-x-hover/50 hover:bg-x-hover"
                        )}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-4 h-4 rounded-full shadow-inner relative" style={{ background: t.bg }}>
                            {active && (
                              <motion.div 
                                layoutId="active-theme-dot"
                                className="absolute inset-0 flex items-center justify-center text-[7px] text-white"
                              >
                                ✓
                              </motion.div>
                            )}
                          </div>
                          <span className={cn("text-[8px] font-bold tracking-tight", active ? "text-x-ink" : "text-x-muted")}>{t.label.toUpperCase()}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Customizer Section - Only if custom theme selected */}
              <AnimatePresence>
                {theme === 'custom' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-6 overflow-hidden"
                  >
                    <div className="h-px bg-x-border/20 w-full" />
                    
                    {/* Font Choice */}
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Typography' : 'စာလုံးပုံစံ'}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {['Inter', 'Playfair Display', 'Space Grotesk', 'JetBrains Mono'].map((f) => (
                          <button
                            key={f}
                            onClick={() => { setCustomTheme({...customTheme, font: f}); haptic(); }}
                            className={cn(
                              "px-3 py-2 rounded-xl border transition-all text-left group",
                              customTheme.font === f ? "border-x-accent bg-x-accent/5" : "border-x-border/10 hover:border-x-border/40"
                            )}
                          >
                            <span className={cn("text-xs transition-colors", customTheme.font === f ? "text-x-ink font-bold" : "text-x-muted")} style={{ fontFamily: f }}>
                              {f}
                            </span>
                          </button>
                        ))}
                      </div>
                    </section>

                    {/* Color Palettes */}
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Colors' : 'အရောင်များ'}</span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-x-hover/30 rounded-2xl border border-x-border/10">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-x-ink">{lang === 'en' ? 'Accent Glow' : 'အလင်းဦးတည်ချက်'}</span>
                            <span className="text-[9px] text-x-muted">Highlights & Icons</span>
                          </div>
                          <input 
                            type="color" 
                            value={customTheme.accent}
                            onChange={(e) => setCustomTheme({...customTheme, accent: e.target.value})}
                            className="w-10 h-10 rounded-full border-none p-0 cursor-pointer overflow-hidden shadow-lg"
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-x-hover/30 rounded-2xl border border-x-border/10">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-x-ink">{lang === 'en' ? 'Canvas Start' : 'နောက်ခံစတင်ရန်'}</span>
                            <span className="text-[9px] text-x-muted">Upper gradient</span>
                          </div>
                          <input 
                            type="color" 
                            value={customTheme.bgStart}
                            onChange={(e) => setCustomTheme({...customTheme, bgStart: e.target.value})}
                            className="w-10 h-10 rounded-full border-none p-0 cursor-pointer overflow-hidden shadow-lg"
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-x-hover/30 rounded-2xl border border-x-border/10">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-x-ink">{lang === 'en' ? 'Canvas End' : 'နောက်ခံအဆုံးသတ်ရန်'}</span>
                            <span className="text-[9px] text-x-muted">Lower gradient</span>
                          </div>
                          <input 
                            type="color" 
                            value={customTheme.bgEnd}
                            onChange={(e) => setCustomTheme({...customTheme, bgEnd: e.target.value})}
                            className="w-10 h-10 rounded-full border-none p-0 cursor-pointer overflow-hidden shadow-lg"
                          />
                        </div>
                      </div>
                    </section>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Clarity Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Vision' : 'ကြည်လင်မှု'}</span>
                  <span className="text-[10px] font-bold text-x-muted">{blurAmount}px</span>
                </div>
                <div className="px-1">
                  <input 
                    type="range" 
                    min="0" 
                    max="40" 
                    step="2"
                    value={blurAmount}
                    onChange={(e) => setBlurAmount(parseInt(e.target.value))}
                    className="w-full accent-x-accent h-1.5 bg-x-hover rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[8px] font-bold text-x-muted mt-2 opacity-50">
                    <span>{lang === 'en' ? 'MIN' : 'အနည်း'}</span>
                    <span>{lang === 'en' ? 'MAX' : 'အများ'}</span>
                  </div>
                </div>
              </section>

              {/* Language Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Language' : 'ဘာသာစကား'}</span>
                </div>
                <div className="grid grid-cols-2 p-1 bg-x-hover rounded-2xl border border-x-border/10 relative">
                  {['en', 'my'].map((l) => {
                    const active = lang === l;
                    return (
                      <button
                        key={l}
                        onClick={() => { setLang(l as any); haptic(); }}
                        className={cn(
                          "relative z-10 py-2.5 rounded-xl text-xs font-bold transition-all duration-300",
                          active ? "text-x-btn-text" : "text-x-muted"
                        )}
                      >
                        {l === 'en' ? 'English' : 'မြန်မာ'}
                        {active && (
                          <motion.div 
                            layoutId="lang-bg"
                            className="absolute inset-0 bg-x-accent rounded-xl -z-10 shadow-lg"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              <button 
                onClick={() => setShowSettings(false)}
                className="group relative w-full h-14 rounded-2xl font-bold text-sm text-x-btn-text tracking-widest uppercase transition-all active:scale-[0.98] overflow-hidden"
                style={{ background: themes.find(t => t.id === theme)?.accent }}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                {lang === 'en' ? 'Apply changes' : 'အတည်ပြုပါ'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Middle Feed Column */}
      <main className="w-full sm:max-w-[600px] border-x border-x-border/50 min-h-screen pb-16 sm:pb-0 shrink-0 bg-transparent">
        
        {/* Sticky Header - Floating Glassmorphism Style */}
        <div className="sticky top-0 z-50 transition-all duration-500 px-4 pt-3 pb-2 bg-gradient-to-b from-x-background via-x-background/80 to-transparent">
          <div className="glass-float rounded-2xl overflow-hidden">
            <div className="h-10 flex items-center px-4 cursor-pointer border-b border-x-border/10">
              <h1 className="text-[14px] font-bold my-text tracking-wide text-x-ink page-heading flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-x-accent shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                {activeTab === 'home' && (lang === 'en' ? 'Home' : 'ပင်မ')}
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
                      {lang === 'en' ? 'For you' : 'သင့်အတွက်'}
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
                      {lang === 'en' ? 'Following' : 'လိုက်ကြည့်နေသူများ'}
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

        {/* Compose Tweet (Dummy) */}
        {activeTab === 'home' && (
          <div className="hidden sm:flex px-4 py-3 border-b border-x-border/50 gap-3">
            <TweetAuthAvatar />
            <div className="flex-1">
              <input 
                type="text" 
                placeholder={lang === 'en' ? "What is happening?!" : "ဘာတွေဖြစ်နေလဲ။"}
                className="w-full bg-transparent text-xl my-text py-2 outline-none placeholder:text-x-muted text-x-ink font-medium"
                disabled
              />
            <div className="flex justify-between items-center mt-3 border-t border-x-border/30 pt-3">
                <div className="text-x-accent font-bold text-sm my-text cursor-pointer hover:bg-x-accent/10 px-3 py-1 rounded-full w-fit">
                  {lang === 'en' ? 'Everyone can reply' : 'အားလုံးအကြောင်းပြန်နိုင်သည်'}
                </div>
                <button className="bg-x-accent text-x-btn-text font-bold text-[15px] px-4 py-1.5 rounded-full opacity-60 cursor-not-allowed shadow-md">
                  {lang === 'en' ? 'Post' : 'တင်ရန်'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Feeds */}
        {activeTab === 'home' && <HomeFeed lang={lang} tab={homeTab} />}
        {activeTab === 'explore' && <ExploreFeed lang={lang} />}
        {activeTab === 'abhi' && <AbhidhammaFeed lang={lang} />}

      </main>

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

        <div className="bg-x-hover-heavy backdrop-blur-md rounded-2xl pt-3 pb-1 border border-x-border/30">
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
        <nav className="glass-float rounded-[24px] h-16 flex items-center justify-around px-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5),0_0_20px_-5px_var(--x-glow)]">
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
          <button className="flex-1 flex justify-center items-center h-full relative" onClick={() => { setShowSettings(!showSettings); haptic(); }}>
            <Settings size={24} className={cn("transition-all", showSettings ? "text-x-accent glow-icon opacity-100 scale-110" : "text-x-muted opacity-60")} />
          </button>
        </nav>
      </div>

      {/* Mobile Settings Modal Overlay */}
      {showSettings && (
        <div 
          className="sm:hidden fixed inset-0 bg-black/40 z-[90]"
          onClick={() => setShowSettings(false)}
        >
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="absolute bottom-0 w-full bg-x-background rounded-t-[32px] border-t border-x-border p-7 shadow-[0_-8px_32px_rgba(0,0,0,0.2)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-x-border/30 rounded-full mx-auto mb-8 shadow-inner" />
            
            <div className="flex flex-col gap-8 max-h-[75vh] overflow-y-auto hide-scrollbar pb-10">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Choose Theme' : 'အပြင်အဆင်ရွေးချယ်ပါ'}</span>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t.id as any); haptic(0.5); }}
                      className={cn(
                        "aspect-square rounded-2xl border-2 transition-all flex flex-col items-center justify-center relative active:scale-90",
                        theme === t.id ? "border-x-accent bg-x-accent/5 scale-105" : "border-x-border/10 opacity-60"
                      )}
                    >
                      <div className="w-8 h-8 rounded-full shadow-lg mb-1" style={{ background: t.bg }} />
                      <span className="text-[8px] font-bold opacity-70 uppercase tracking-tighter">{t.label}</span>
                      {theme === t.id && (
                        <motion.div layoutId="mobile-theme-active" className="absolute -top-1 -right-1 w-4 h-4 bg-x-accent rounded-full flex items-center justify-center border-2 border-x-background shadow-sm">
                            <div className="w-1 h-1 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* Custom Theme Editor for Mobile */}
              <AnimatePresence>
                {theme === 'custom' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-8 overflow-hidden bg-x-hover/20 p-4 rounded-3xl border border-x-border/10"
                  >
                    {/* Font Choice */}
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Typography' : 'စာလုံးပုံစံ'}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {['Inter', 'Playfair Display', 'Space Grotesk', 'JetBrains Mono'].map((f) => (
                          <button
                            key={f}
                            onClick={() => { setCustomTheme({...customTheme, font: f}); haptic(); }}
                            className={cn(
                              "px-3 py-3 rounded-2xl border transition-all text-left",
                              customTheme.font === f ? "border-x-accent bg-x-accent/10" : "border-x-border/10 bg-x-background/50"
                            )}
                          >
                            <span className={cn("text-xs transition-colors", customTheme.font === f ? "text-x-ink font-bold" : "text-x-muted")} style={{ fontFamily: f }}>
                              {f}
                            </span>
                          </button>
                        ))}
                      </div>
                    </section>

                    {/* Colors */}
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Custom Palette' : 'အရောင်စိတ်ကြိုက်'}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                         <div className="flex flex-col items-center gap-2">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-x-border/20 shadow-inner">
                               <input 
                                type="color" 
                                value={customTheme.accent}
                                onChange={(e) => setCustomTheme({...customTheme, accent: e.target.value})}
                                className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 border-none p-0 cursor-pointer"
                              />
                            </div>
                            <span className="text-[9px] font-bold text-x-muted uppercase">{lang === 'en' ? 'Accent' : 'ဦးတည်'}</span>
                         </div>
                         <div className="flex flex-col items-center gap-2">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-x-border/20 shadow-inner">
                               <input 
                                type="color" 
                                value={customTheme.bgStart}
                                onChange={(e) => setCustomTheme({...customTheme, bgStart: e.target.value})}
                                className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 border-none p-0 cursor-pointer"
                              />
                            </div>
                            <span className="text-[9px] font-bold text-x-muted uppercase">{lang === 'en' ? 'Start' : 'စတင်'}</span>
                         </div>
                         <div className="flex flex-col items-center gap-2">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-x-border/20 shadow-inner">
                               <input 
                                type="color" 
                                value={customTheme.bgEnd}
                                onChange={(e) => setCustomTheme({...customTheme, bgEnd: e.target.value})}
                                className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 border-none p-0 cursor-pointer"
                              />
                            </div>
                            <span className="text-[9px] font-bold text-x-muted uppercase">{lang === 'en' ? 'End' : 'အဆုံး'}</span>
                         </div>
                      </div>
                    </section>
                  </motion.div>
                )}
              </AnimatePresence>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-x-muted uppercase tracking-widest">{lang === 'en' ? 'Display Language' : 'ဘာသာစကား'}</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-x-hover rounded-2xl border border-x-border/20 relative">
                  {['en', 'my'].map((l) => {
                    const active = lang === l;
                    return (
                      <button
                        key={l}
                        onClick={() => { setLang(l as any); haptic(); }}
                        className={cn(
                          "relative z-10 py-2.5 rounded-[14px] flex items-center justify-center transition-all duration-300",
                          active ? "text-x-btn-text" : "text-x-muted"
                        )}
                      >
                        <span className={cn("text-xs font-bold", l === 'my' ? 'my-text' : '')}>
                          {l === 'en' ? 'ENGLISH' : 'မြန်မာ'}
                        </span>
                        {active && (
                          <motion.div 
                            layoutId="lang-bg-mobile"
                            className="absolute inset-0 bg-x-accent rounded-[14px] -z-10 shadow-md"
                            transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              <button 
                onClick={() => setShowSettings(false)}
                className="w-full bg-x-accent h-14 rounded-2xl font-bold text-x-btn-text tracking-widest uppercase shadow-xl mt-2 active:scale-95 transition-all text-sm"
              >
                {lang === 'en' ? 'Apply changes' : 'အတည်ပြုပါ'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile FAB Compress */}
      <button className="sm:hidden fixed bottom-20 right-4 w-14 h-14 bg-x-accent hover:bg-[#1A8CD8] text-x-btn-text flex items-center justify-center rounded-full shadow-lg z-50">
        <Feather size={24} className="glow-icon" />
      </button>

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
  );
}
