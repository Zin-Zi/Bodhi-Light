export interface MeditationBenefit {
  title: string;
  titleMy: string;
  desc: string;
  descMy: string;
}

export const MEDITATION_BENEFITS: MeditationBenefit[] = [
  {
    title: "Mental Clarity",
    titleMy: "စိတ်ကြည်လင်ခြင်း",
    desc: "Reduces mental fatigue and overthinking, allowing you to focus purely on the present moment.",
    descMy: "အာရုံစူးစိုက်မှုကောင်းမွန်စေပြီး တွေးလွန်မှုများနှင့် စိတ်ပင်ပန်းမှုများကို လျော့ကျစေပါသည်။"
  },
  {
    title: "Emotional Equilibrium",
    titleMy: "စိတ်ခံစားမှုတည်ငြိမ်ခြင်း",
    desc: "Develops the space between stimulus and response, leading to fewer reactive habits and lower stress.",
    descMy: "စိတ်ဖိစီးမှုကင်းဝေးစေကာ ပြဿနာများကို တည်ငြိမ်စွာ တုံ့ပြန်နိုင်သည့် စွမ်းရည်ကို တိုးတက်စေပါသည်။"
  },
  {
    title: "Physical Restoration",
    titleMy: "ရုပ်ပိုင်းဆိုင်ရာသက်သာခြင်း",
    desc: "Lowers heart rate and blood pressure, naturally signaling the nervous system into a state of deep rest.",
    descMy: "နှလုံးခုန်နှုန်းမှန်ကန်စေပြီး အိပ်စက်မှုစနစ်ကို ပိုမိုကောင်းမွန်စေကာ ခန္ဓာကိုယ်ကို အနားရစေပါသည်။"
  },
  {
    title: "Deep Intuitive Insight",
    titleMy: "အသိဉာဏ်ပွင့်လင်းခြင်း",
    desc: "Gradually dissolves the illusion of a separated self, unlocking profound wisdom regarding the nature of reality.",
    descMy: "အတ္တဟူသော အထင်မှားမှုကို ဖယ်ရှားပေးပြီး ခန္ဓာနှင့်လောက၏ သဘာဝအမှန်ကို ထိုးထွင်းသိမြင်စေပါသည်။"
  }
];

export interface MindStep {
  id: string;
  title: string;
  titleMy: string;
  pali: string;
  description: string;
  descriptionMy: string;
  practice: string;
  practiceMy: string;
  content: string;
  contentMy: string;
  categories: string[];
}

export const DHARMA_STEPS: MindStep[] = [
  {
    id: 'mindfulness',
    title: 'Mindfulness of Breath',
    titleMy: 'ထွက်လေဝင်လေကို သတိပြုခြင်း',
    pali: 'Anapanasati',
    description: 'The foundation of all mind control is simple awareness.',
    descriptionMy: 'စိတ်ကို ထိန်းချုပ်ခြင်း၏ အခြေခံမှာ ရိုးရှင်းစွာ သတိပြုခြင်း ဖြစ်သည်။',
    practice: 'Sit quietly. Observe the breath as it enters and leaves. Don\'t change it, just know it.',
    practiceMy: 'ငြိမ်သက်စွာ ထိုင်ပါ။ ထွက်လေဝင်လေကို သတိပြုပါ။ မပြင်ပါနှင့်၊ သိရုံသာ သိပါ။',
    content: 'Anapanasati is the most widely taught form of meditation. The Buddha emphasized that the breath is a bridge between the physical and mental worlds. By focusing on the "touch" of the breath at the nostrils, we stabilize the mind\'s tendency to wander into the past (regret) or future (anxiety). As the breath becomes refined, so does the consciousness, leading eventually to Jhana (deep absorption).',
    contentMy: 'အာနာပါနဿတိသည် အသုံးအများဆုံး ကမ္မဋ္ဌာန်းတရားဖြစ်သည်။ ထွက်လေဝင်လေသည် ရုပ်နှင့် နာမ်ကို ဆက်သွယ်ပေးသော တံတားဖြစ်ကြောင်း မြတ်စွာဘုရားရှင်က ဟောကြားခဲ့သည်။ နှာသီးဖျားတွင် လေ၏ ထိမှုကို သတိပြုခြင်းဖြင့် အတိတ်၏ နောင်တနှင့် အနာဂတ်၏ စိုးရိမ်ပူပန်မှုများမှ လွတ်ကင်းစေပြီး စိတ်ကို ငြိမ်သက်စေပါသည်။ လေသည် သိမ်မွေ့လာသည်နှင့်အမျှ စိတ်သည်လည်း သိမ်မွေ့လာပြီး ဈာန်တရားများအထိ ရရှိနိုင်ပါသည်။',
    categories: ['Mindfulness', 'Calm']
  },
  {
    id: 'awareness',
    title: 'Awareness of Sensations',
    titleMy: 'ဝေဒနာကို သတိပြုခြင်း',
    pali: 'Vedana',
    description: 'Understand that all mental states arise from bodily sensations.',
    descriptionMy: 'စိတ်အခြေအနေအားလုံးသည် ကိုယ်ခန္ဓာ၏ ဝေဒနာများမှ ဖြစ်ပေါ်လာကြောင်း နားလည်ပါ။',
    practice: 'Scan your body. Notice heat, cold, tension, or ease. Observe without labeling as good or bad.',
    practiceMy: 'ခန္ဓာကိုယ်ကို စစ်ဆေးပါ။ အပူ၊ အအေး၊ တင်းကျပ်မှု သို့မဟုတ် သက်သာမှုကို သတိပြုပါ။ ကောင်းသည်၊ ဆိုးသည်ဟု မသတ်မှတ်ဘဲ ရှုမှတ်ပါ။',
    content: 'Vedana-anupassana is the observation of feelings. We often think we react to external events, but we actually react to the sensations (pain, pleasure, or neutral) that those events trigger in the body. By maintaining equanimity (upekkha) towards these sensations, we stop create new "Sankharas" (mental reactions), eventually purifying the mind from its oldest habits.',
    contentMy: 'ဝေဒနာနုပဿနာသည် ခံစားမှုများကို ရှုမှတ်ခြင်းဖြစ်သည်။ ကျွန်ုပ်တို့သည် ပြင်ပဖြစ်ရပ်များကို တုံ့ပြန်သည်ဟု ထင်ရသော်လည်း အမှန်စင်စစ်မှာ ထိုဖြစ်ရပ်များကြောင့် ခန္ဓာကိုယ်တွင် ဖြစ်ပေါ်လာသော ဝေဒနာ (ချမ်းသာ၊ ဆင်းရဲ၊ အလတ်စား) ကိုသာ တုံ့ပြန်နေခြင်းဖြစ်သည်။ ထိုဝေဒနာများအပေါ် ဥပေက္ခာတရားဖြင့် ရှုမှတ်နိုင်လျှင် အကျင့်ဟောင်းများမှ လွတ်မြောက်ပြီး စိတ်ကို သန့်စင်စေနိုင်ပါသည်။',
    categories: ['Awareness', 'Insight']
  },
  {
    id: 'guarding',
    title: 'Guarding the Sense Doors',
    titleMy: 'ဣန္ဒြေကို စောင့်စည်းခြင်း',
    pali: 'Indriya Samvara',
    description: 'Stop the mind from being overwhelmed by external stimuli.',
    descriptionMy: 'ပြင်ပအာရုံများကြောင့် စိတ်မငြိမ်မသက် ဖြစ်ခြင်းကို တားဆီးပါ။',
    practice: 'When seeing, just see. When hearing, just hear. Don\'t let the mind spin stories.',
    practiceMy: 'မြင်လျှင် မြင်သည့်အတိုင်း၊ ကြားလျှင် ကြားသည့်အတိုင်းသာ သိပါ။ စိတ်ကူးများ မယှက်ယှက်ပါစေနှင့်။',
    content: 'The "Sense Doors" are our eyes, ears, nose, tongue, body, and mind. When we see a "beautiful" object, greed arises; when we see an "ugly" one, aversion arises. Guarding involves being aware of the initial contact (Phassa). If we remain mindful at the point of contact, greed and hate cannot enter the mind. It is the practice of preventing mental pollution.',
    contentMy: 'မျက်စိ၊ နား၊ နှာ၊ လျှာ၊ ကိုယ်၊ စိတ် ဟူသော ဒွါရ ခြောက်ပါးကို စောင့်စည်းခြင်းဖြစ်သည်။ လှပသောအာရုံကို မြင်လျှင် လောဘဖြစ်တတ်ပြီး၊ မလှပသောအာရုံကို မြင်လျှင် ဒေါသဖြစ်တတ်သည်။ သင်သည် အာရုံနှင့် ဒွါရ ဆုံသည့် "ဖဿ" ဖြစ်ချိန်တွင် သတိရှိနေလျှင် လောဘ၊ ဒေါသတို့ စိတ်ထဲသို့ မဝင်ရောက်နိုင်ပါ။ ဤသည်မှာ စိတ်ကို ညစ်ညမ်းမှုများမှ ကာကွယ်သော နည်းလမ်းဖြစ်သည်။',
    categories: ['Restraint', 'Mindfulness']
  },
  {
    id: 'restraint',
    title: 'Right Effort',
    titleMy: 'သမ္မာဝါယာမ',
    pali: 'Samma Vayama',
    description: 'Nurture healthy states and release unhealthy ones.',
    descriptionMy: 'ကောင်းသော စိတ်အခြေအနေကို မွေးမြူပြီး မကောင်းသော အခြေအနေကို စွန့်လွှတ်ပါ။',
    practice: 'Identify a negative thought. Acknowledge it. Replace it with a thought of loving-kindness.',
    practiceMy: 'မကောင်းသော အတွေးကို သိပါ။ လက်ခံပါ။ မေတ္တာစိတ်ဖြင့် အစားထိုးပါ သို့မဟုတ် စွန့်လွှတ်ပါ။',
    content: 'Right Effort has four aspects: 1) Preventing unarisen evil, 2) Abandoning arisen evil, 3) Developing unarisen good, and 4) Maintaining arisen good. It is the energetic application of the mind to stay on the path. It requires constant alertness to the quality of one\'s thoughts, choosing courage over fear and compassion over anger.',
    contentMy: 'သမ္မာဝါယာမတွင် လေးချက်ပါဝင်သည်။ (၁) မဖြစ်သေးသော အကုသိုလ်ကို မဖြစ်အောင် တားဆီးခြင်း၊ (၂) ဖြစ်ပြီးသော အကုသိုလ်ကို ပယ်စွန့်ခြင်း၊ (၃) မဖြစ်သေးသော ကုသိုလ်ကို ဖြစ်အောင်ပြုခြင်း၊ (၄) ဖြစ်ပြီးသော ကုသိုလ်ကို ပိုမိုတိုးတက်အောင် ပြုခြင်း တို့ဖြစ်သည်။ ဤသည်မှာ စိတ်ကို ကောင်းသောလမ်းကြောင်းပေါ်တွင် အစဉ်အမြဲရှိနေစေရန် ကြိုးပမ်းအားထုတ်မှု ဖြစ်သည်။',
    categories: ['Effort', 'Calm']
  },
  {
    id: 'wisdom',
    title: 'The Realization of Impermanence',
    titleMy: 'အနိစ္စကို သိမြင်ခြင်း',
    pali: 'Anicca',
    description: 'The ultimate control is letting go of the illusion of control.',
    descriptionMy: 'အစစ်အမှန် ထိန်းချုပ်မှုသည် ထိန်းချုပ်နေသည်ဟူသော အထင်အမြင်ကို စွန့်လွှတ်ခြင်း ဖြစ်သည်။',
    practice: 'Observe a thought arise, stay and vanish. Realize you are the observer, not the thought.',
    practiceMy: 'အတွေးတစ်ခု ဖြစ်ပေါ်လာခြင်း၊ တည်ရှိခြင်းနှင့် ပျောက်ကွယ်ခြင်းကို ရှုပါ။ သင်သည် အတွေးမဟုတ်ဘဲ ရှုမှတ်သူသာ ဖြစ်ကြောင်း သိပါ။',
    content: 'Anicca is the law of change. Scientific and Buddhist insights converge here: nothing in the universe is static. Our atoms, cells, and thoughts are in a state of constant flux. Suffering arises because we try to "hold" or "own" things that are naturally flowing. Realizing Anicca leads to "Anatta" (non-self)—the understanding that there is no permanent "Me" at the core of these changes.',
    contentMy: 'အနိစ္စသည် ပြောင်းလဲခြင်း၏ နိယာမဖြစ်သည်။ စကြဝဠာအတွင်းရှိ မည်သည့်အရာမှ မြဲသည်မရှိ။ ကျွန်ုပ်တို့၏ အက်တမ်များ၊ ဆဲလ်များနှင့် အတွေးများသည် အစဉ်အမြဲ ပြောင်းလဲနေသည်။ ပြောင်းလဲနေသောအရာများကို "ငါ့ဟာ" ဟု ဆွဲကိုင်ထားသဖြင့် ဆင်းရဲဒုက္ခဖြစ်ရသည်။ အနိစ္စကို သိမြင်လာလျှင် "အနတ္တ" ဟူသော အတ္တမရှိသည့် သဘောကို သိမြင်ပြီး လွတ်မြောက်မှုကို ရရှိနိုင်ပါသည်။',
    categories: ['Insight', 'Wisdom']
  }
];

export interface GlossaryTerm {
  term: string;
  pali: string;
  meaning: string;
  meaningMy: string;
  bookLink: number; // Index of ABHIDHAMMA_BOOKS
}

export const ABHIDHAMMA_GLOSSARY: GlossaryTerm[] = [
  { term: 'Consciousness', pali: 'Citta', meaning: 'The bare awareness of an object.', meaningMy: 'အာရုံကို သိမြင်တတ်သော သဘောရှိသော စိတ်။', bookLink: 0 },
  { term: 'Mental Factors', pali: 'Cetasika', meaning: 'Qualities that arise and perish with consciousness, shaping its character.', meaningMy: 'စိတ်နှင့်အတူဖြစ်၊ စိတ်နှင့်အတူချုပ်၍ စိတ်ကို ပြုပြင်ပေးသော စေတသိက်များ။', bookLink: 0 },
  { term: 'Materiality', pali: 'Rupa', meaning: 'The physical phenomena of the body and world.', meaningMy: 'ဖောက်ပြန်တတ်သော သဘောရှိသော ရုပ်တရားများ။', bookLink: 0 },
  { term: 'The Unconditioned', pali: 'Nibbana', meaning: 'The ultimate reality that is beyond birth, death, and suffering.', meaningMy: 'မဖြစ်မပျက်၊ ငြိမ်းအေးသော ပရမတ္ထတရား (နိဗ္ဗာန်)။', bookLink: 0 },
  { term: 'Aggregates', pali: 'Khandha', meaning: 'The five constituent groups of an individual.', meaningMy: 'ခန္ဓာ ၅ ပါး။', bookLink: 1 },
  { term: 'Sense Bases', pali: 'Ayatana', meaning: 'The internal and external spheres of perception.', meaningMy: 'အာယတန ၁၂ ပါး။', bookLink: 1 },
  { term: 'Elements', pali: 'Dhatu', meaning: 'The fundamental constituents of reality without a soul.', meaningMy: 'ဓာတ် ၁၈ ပါး။', bookLink: 2 },
  { term: 'Individuals', pali: 'Puggala', meaning: 'The conventional designations for people as they appear in the world.', meaningMy: 'လောကဝေါဟာရအားဖြင့် သတ်မှတ်အပ်သော ပုဂ္ဂိုလ်များ။', bookLink: 3 },
  { term: 'Pairs', pali: 'Yamaka', meaning: 'The logical method of paired questions to clarify terms.', meaningMy: 'အတွဲလိုက် အမေးအဖြေပြု၍ အဓိပ္ပာယ်သတ်မှတ်သော ယမိုက်ကျမ်း။', bookLink: 5 },
  { term: 'Causal Relations', pali: 'Patthana', meaning: 'The 24 universal laws of conditionality governing existence.', meaningMy: 'အကြောင်းအကျိုး ဆက်စပ်မှု ပဋိဌာန်း ၂၄ ပစ္စည်း။', bookLink: 6 }
];

export const MIND_AGGREGATES = [
  { 
    name: 'Rupa', 
    title: 'Form', 
    titleMy: 'ရုပ်', 
    desc: 'The physical body and sense organs.', 
    descMy: 'ရုပ်ခန္ဓာနှင့် အာယတနများ။',
    details: 'Rupa refers to the material aspect of existence. It includes the four primary elements: Earth (solidity), Water (cohesion), Fire (temperature), and Air (motion). It also encompasses the derived materialities like the sense organs and gender characteristics.',
    detailsMy: 'ရုပ်ဆိုသည်မှာ ဖောက်ပြန်တတ်သော သဘောရှိသည်။ ပထဝီ (မာကြောမှု)၊ အာပေါ (ဖွဲ့စည်းမှု)၊ တေဇော (ပူနွေးမှု)၊ ဝါယော (လှုပ်ရှားမှု) ဟူသော မဟာဘုတ် ၄ ပါးနှင့် ထိုမှ ဆင့်ပွားဖြစ်ပေါ်လာသော အာယတနများ၊ ရုပ်သဘာဝများ အားလုံး ပါဝင်သည်။'
  },
  { 
    name: 'Vedana', 
    title: 'Feeling', 
    titleMy: 'ဝေဒနာ', 
    desc: 'Pleasant, unpleasant, or neutral sensations.', 
    descMy: 'ချမ်းသာ၊ ဆင်းရဲ သို့မဟုတ် မသက်သာ မဆင်းရဲသော ခံစားမှုများ။',
    details: 'Vedana is the affective tone of our experience. It is not "emotion" but the raw sensation of pleasure (sukha), pain (dukkha), or neutrality (adukkham-asukha). It arises whenever a sense organ contacts an object.',
    detailsMy: 'ဝေဒနာသည် ခံစားခြင်းသဘောဖြစ်သည်။ စိတ်ခံစားမှုမဟုတ်ဘဲ အာရုံနှင့် ထိတွေ့ချိန်တွင် ဖြစ်ပေါ်သော ချမ်းသာခြင်း၊ ဆင်းရဲခြင်း သို့မဟုတ် အလတ်စား ခံစားမှုတို့ကို ဆိုလိုသည်။ ဒွါရနှင့် အာရုံ ဆုံတိုင်း ဝေဒနာ ဖြစ်ပေါ်သည်။' 
  },
  { 
    name: 'Sanna', 
    title: 'Perception', 
    titleMy: 'သညာ', 
    desc: 'Recognizing and labeling experiences.', 
    descMy: 'အမှတ်သညာ ပြုခြင်း။',
    details: 'Sanna is the mental factor that recognizes, remembers, and labels. It uses past memories to identify the current object—for example, recognizing a sound as "birdsong." It is the faculty of recognition.',
    detailsMy: 'သညာသည် မှတ်သားခြင်းသဘောဖြစ်သည်။ အသံတစ်ခုကို ကြားလျှင် "ငှက်သံ" ဟု အရင်မှတ်သားထားဖူးသည့် အတိုင်း ပြန်လည်မှတ်မိစေရန် ကူညီပေးသော စိတ်စေတသိက် ဖြစ်သည်။'
  },
  { 
    name: 'Sankhara', 
    title: 'Mental Formations', 
    titleMy: 'သင်္ခါရ', 
    desc: 'Habitual tendencies and volitions.', 
    descMy: 'စိတ်၏ ပြုပြင်ဖန်တီးမှုများ။',
    details: 'Sankhara is the largest category, covering all volitional activities (Karma). It includes intentions, choices, states like anger or love, and our habitual reactions. It is the constructive or creative power of the mind.',
    detailsMy: 'သင်္ခါရသည် ပြုပြင်ဖန်တီးခြင်းသဘောဖြစ်သည်။ စိတ်၏ စေတနာ၊ ကြံစည်မှု၊ လောဘ၊ ဒေါသ၊ မေတ္တာ စသည်တို့သည် သင်္ခါရတွင် ပါဝင်သည်။ ကျွန်ုပ်တို့၏ အပြုအမူနှင့် အကျင့်စရိုက်များကို ဖန်တီးပေးသော အရာဖြစ်သည်။'
  },
  { 
    name: 'Vinnana', 
    title: 'Consciousness', 
    titleMy: 'ဝိညာဏ်', 
    desc: 'The base awareness that knows the other four.', 
    descMy: 'သိမှု ဝိညာဉ်။',
    details: 'Vinnana is the awareness itself. It is the clarity that allows for the experience of an object. While the other four aggregates are like the picture, consciousness is the "screen" or the "mirror" that reflects the presence of the data.',
    detailsMy: 'ဝိညာဏ်သည် သိခြင်းသဘောဖြစ်သည်။ အာရုံကို သိမြင်တတ်သော သဘောရှိသည်။ အခြားခန္ဓာ ၄ ပါးသည် အချက်အလက်များဆိုလျှင် ဝိညာဏ်သည် ထိုအချက်အလက်များကို ထင်ဟပ်ဖော်ပြသော "မှန်" သို့မဟုတ် "ဖန်သားပြင်" ကဲ့သို့ ဖြစ်သည်။'
  }
];

export const ABHIDHAMMA_BOOKS = [
  {
    title: 'Dhammasangani',
    titleMy: 'ဓမ္မသင်္ဂဏီ',
    summary: 'Enumeration of Phenomena',
    summaryMy: 'ရုပ်၊ နာမ်၊ ဓမ္မတို့ကို အသေးစိတ် သရုပ်ခွဲပြခြင်း။',
    brief: 'A comprehensive list and classification of mental and physical phenomena.',
    briefMy: 'နာမ်တရား၊ ရုပ်တရားတို့ကို စာရင်းပြုစု၍ အတိုချုပ် သရုပ်ဖွဲပြသော ကျမ်းဖြစ်သည်။',
    detailedSummary: 'This primary text functions as the analytical dictionary of the Buddhist philosophical system. It systematically maps the entirety of consciousness (Citta), the 52 associated mental factors (Cetasika), and the properties of physical matter (Rupa), organizing them into ethical categories that help the practitioner distinguish between paths that lead to suffering and those that lead to liberation.',
    detailedSummaryMy: 'ဤကျမ်းသည် ဗုဒ္ဓဘာသာ ဒဿနဗေဒ၏ အခြေခံအကျဆုံး "အဘိဓာန်" ကဲ့သို့ ဖြစ်ပါသည်။ စိတ်၊ စေတသိက်၊ ရုပ် ဟူသော ပရမတ္ထတရားတို့ကို ကုသိုလ်၊ အကုသိုလ်၊ အဗျာကတ ဟူသော ကဏ္ဍကြီး ၃ ခုဖြင့် အသေးစိတ် သရုပ်ခွဲပြဆိုထားပါသည်။ တရားကျင့်ကြံသူများအတွက် မည်သည့်တရားသည် ဆင်းရဲကြောင်း၊ မည်သည့်တရားသည် ငြိမ်းအေးကြောင်းကို အခြေခံမှစ၍ နားလည်စေသော ကျမ်းဖြစ်သည်။',
    content: 'The Dhammasangani (Enumeration of Phenomena) is the inaugural text of the Abhidhamma Pitaka, serving as the definitive analytical dictionary of the Buddhist philosophical system. It meticulously classifies the ultimate constituents of reality into four primary categories: 121 types of Consciousness (Citta), 52 Mental Factors (Cetasika), 28 types of Materiality (Rupa), and the unconditioned element, Nibbana. The text starts with the "Matika" or Matrix, a set of 22 Triplets (Tikas) and 100 Doublets (Dukas) that categorize all phenomena based on their ethical quality (wholesome, unwholesome, or neutral) and their relationship to various stages of the path. It provides the microscopic level of detail needed to understand how a single moment of awareness is constructed from multiple mental components.',
    contentMy: 'ဓမ္မသင်္ဂဏီကျမ်းသည် အဘိဓမ္မာ ၇ ကျမ်းတွင် ပထမဆုံးနှင့် အဓိကအကျဆုံး အခြေခံကျမ်းကြီးဖြစ်သည်။ ဤကျမ်းကြီးသည် ရုပ်နာမ်ဓမ္မတို့၏ သဘာဝကို အဏုမြူစွယ်အထိ စိတ်ဖြာ၍ ကုသိုလ်၊ အကုသိုလ်၊ အဗျာကတ ဟူသော ကဏ္ဍကြီးများဖြင့် ခွဲခြားပြဆိုသည်။ စိတ် (၁၂၁) ပါး၊ စေတသိက် (၅၂) ပါး၊ ရုပ် (၂၈) ပါးနှင့် နိဗ္ဗာန် ဟူသော ပရမတ္ထတရား လေးပါးတို့ကို အသေးစိတ် သရုပ်ဖော်ထားသည်။ အထူးသဖြင့် "မာတိကာ" ဟုခေါ်သော သရုပ်ခွဲနည်းစနစ်သစ်ဖြင့် တရားအားလုံးကို တိက (၃ ပါးတွဲ) ၂၂ ပါးနှင့် ဒုက (၂ ပါးတွဲ) ၁၀၀ တို့ဖြင့် လွှမ်းခြုံဟောကြားထားရာ ဗုဒ္ဓဘာသာ တစ်ခုလုံး၏ ဒဿနဗေဒ အဘိဓာန်ကြီးသဖွယ် ဖြစ်ပါသည်။',
    chapters: [
      { title: 'Citta-vibhatti', titleMy: 'စိတ္တဝိဘတ္တိ', desc: 'Analysis of Consciousness', descMy: 'စိတ်အမျိုးမျိုးကို ခွဲခြားခြင်း' },
      { title: 'Cetasika-vibhatti', titleMy: 'စေတသိကဝိဘတ္တိ', desc: 'Analysis of Mental Factors', descMy: 'စေတသိက်များကို ခွဲခြားခြင်း' },
      { title: 'Rupa-kanda', titleMy: 'ရူပကဏ္ဍ', desc: 'Section on Materiality', descMy: 'ရုပ်တရားများ အပိုင်း' },
      { title: 'Nikkhepa-kanda', titleMy: 'နိက္ခေပကဏ္ဍ', desc: 'Summary of the Matrix', descMy: 'မာတိကာ အကျဉ်းချုပ်' },
      { title: 'Atthasara-kanda', titleMy: 'အတ္ထသာရကဏ္ဍ', desc: 'The Essence of Meaning', descMy: 'အနှစ်ချုပ် အဓိပ္ပာယ်' }
    ],
    keyPrinciples: [
      'Classification by Ethical Quality',
      'The Four Ultimate Realities',
      'Construction of Consciousness'
    ],
    keyPrinciplesMy: [
      'ကုသိုလ်၊ အကုသိုလ်၊ အဗျာကတ သရုပ်ခွဲခြင်း',
      'ပရမတ္ထတရား လေးပါး',
      'စိတ်ဖြစ်ပေါ်ပုံ နည်းစနစ်'
    ]
  },
  {
    title: 'Vibhanga',
    titleMy: 'ဝိဘင်း',
    summary: 'The Book of Analysis',
    summaryMy: 'ဓမ္မသဘောများကို ဝေဖန်ခြားနားပြခြင်း။',
    brief: 'Analysis of key Buddhist concepts like the five aggregates and truth.',
    briefMy: 'ခန္ဓာ၊ အာယတန၊ ဓာတ်၊ သစ္စာစသည်တို့ကို ကျယ်ပြန့်စွာ ခွဲခြမ်းစိတ်ဖြာ ဟောကြားသော ကျမ်းဖြစ်သည်။',
    detailedSummary: 'The Vibhanga applies the microscopic analysis of the first book to the broader concepts found in the Suttas. Through 18 specialized chapters, it dissects the Nature of Truth, the Path of Purification, and the 12 Links of Dependent Origination, providing a complete structural map of how suffering arises and how it is definitively ended.',
    detailedSummaryMy: 'ဝိဘင်းကျမ်းသည် ပထမကျမ်းရှိ အသေးစိတ်ခွဲခြမ်းမှုများကို သုတ္တန်လာ တရားများနှင့် ပေါင်းစပ်ရှင်းလင်းသည်။ ခန္ဓာ၊ အာယတန၊ ဓာတ်၊ သစ္စာနှင့် ပဋိစ္စသမုပ္ပါဒ် စသော အခန်းပေါင်း ၁၈ အခန်းဖြင့် ဆင်းရဲဒုက္ခ မည်သို့ဖြစ်ပေါ်သည်၊ မည်သို့ချုပ်ငြိမ်းသည်ကို စနစ်တကျ ပြဆိုထားပါသည်။',
    content: 'The Vibhanga (Book of Analysis) continues the systematic deconstruction of reality by taking the broader concepts taught in the Suttas and applying the rigorous Abhidhamma method to them. It consists of 18 chapters (Vibhangas), each providing an exhaustive analysis of topics such as the Five Aggregates (Khandha), the Twelve Sense Bases (Ayatana), the Eighteen Elements (Dhatu), and the Four Noble Truths (Sacca). For every topic, the text uses a three-fold analytical approach: the "Suttanta-bhajaniya" (the simple Sutta-style explanation), the "Abhidhamma-bhajaniya" (detailed technical analysis), and the "Pañha-pucchaka" (a vigorous question-and-answer format). This ensures that the student understands the teachings both as practical guidance and as deep ontological truth.',
    contentMy: 'ဝိဘင်းကျမ်းသည် ဓမ္မသင်္ဂဏီ၌ ဟောကြားခဲ့သော တရားများကို အကြောင်းအရာအလိုက် သရုပ်ခွဲ၍ ပိုမိုကျယ်ပြန့်စွာ ရှင်းလင်းဟောကြားသော ကျမ်းဖြစ်သည်။ ခန္ဓာ၊ အာယတန၊ ဓာတ်၊ သစ္စာ၊ ဣန္ဒြေနှင့် ပဋိစ္စသမုပ္ပါဒ် စသည့် အခန်းကြီး ၁၈ ခန်း ပါဝင်သည်။ အခန်းတစ်ခန်းစီတွင် (၁) သုတ္တန်နည်း (သာမန်လူတို့ နားလည်စေရန် ဟောကြားချက်)၊ (၂) အဘိဓမ္မာနည်း (ပရမတ္ထတရားသက်သက်ဖြင့် ခွဲခြမ်းစိတ်ဖြာချက်) နှင့် (၃) အမေးအဖြေနည်း (အမေးနှင့် အဖြေပြုလုပ်၍ အဓိပ္ပာယ်ကို နယ်ပယ်သတ်မှတ်ချက်) ဟူသော နည်းလမ်းသုံးပါးဖြင့် ပြည့်ပြည့်စုံစုံ ဟောကြားထားသောကြောင့် တရားတော်၏ အနက်အဓိပ္ပာယ်ကို ရှုထောင့်ပေါင်းစုံမှ သိမြင်နိုင်စေပါသည်။',
    chapters: [
      { title: 'Khandha Vibhanga', titleMy: 'ခန္ဓာဝိဘင်း', desc: 'Analysis of Aggregates', descMy: 'ခန္ဓာငါးပါးကို ခွဲခြားခြင်း' },
      { title: 'Ayatana Vibhanga', titleMy: 'အာယတနဝိဘင်း', desc: 'Analysis of Sense Bases', descMy: 'အာယတနများကို ခွဲခြားခြင်း' },
      { title: 'Dhatu Vibhanga', titleMy: 'ဓာတုဝိဘင်း', desc: 'Analysis of Elements', descMy: 'ဓာတ်များကို ခွဲခြားခြင်း' },
      { title: 'Sacca Vibhanga', titleMy: 'သစ္စာဝိဘင်း', desc: 'Analysis of Truths', descMy: 'သစ္စာလေးပါးကို ခွဲခြားခြင်း' },
      { title: 'Indriya Vibhanga', titleMy: 'ဣန္ဒြေဝိဘင်း', desc: 'Analysis of Faculties', descMy: 'ဣန္ဒြေများကို ခွဲခြားခြင်း' },
      { title: 'Paticcasamuppada', titleMy: 'ပဋိစ္စသမုပ္ပါဒဝိဘင်း', desc: 'Dependent Origination', descMy: 'ပဋိစ္စသမုပ္ပါဒ်ကို ခွဲခြားခြင်း' },
      { title: 'Satipatthana', titleMy: 'သတိပဋ္ဌာနဝိဘင်း', desc: 'Analysis of Mindfulness', descMy: 'သတိပဋ္ဌာန်လေးပါးကို ခွဲခြားခြင်း' },
      { title: 'Sammappadhana', titleMy: 'သမ္မပ္ပဓာနဝိဘင်း', desc: 'Right Exertion', descMy: 'သမ္မပ္ပဓာန်ကို ခွဲခြားခြင်း' },
      { title: 'Iddhipada', titleMy: 'ဣဒ္ဓိပါဒဝိဘင်း', desc: 'Bases of Power', descMy: 'ဣဒ္ဓိပါဒ်ကို ခွဲခြားခြင်း' },
      { title: 'Bojjhanga', titleMy: 'ဗောဇ္ဈင်္ဂဝိဘင်း', desc: 'Factors of Enlightenment', descMy: 'ဗောဇ္ဈင်္ဂခုနစ်ပါးကို ခွဲခြားခြင်း' },
      { title: 'Magga', titleMy: 'မဂ္ဂဝိဘင်း', desc: 'The Path', descMy: 'မဂ္ဂင်ရှစ်ပါးကို ခွဲခြားခြင်း' },
      { title: 'Jhana', titleMy: 'ဈာနဝိဘင်း', desc: 'Absorption', descMy: 'ဈာန်တရားများကို ခွဲခြားခြင်း' },
      { title: 'Appamanna', titleMy: 'အပ္ပမညာဝိဘင်း', desc: 'Limitless States', descMy: 'အပ္ပမညာကို ခွဲခြားခြင်း' },
      { title: 'Sikkhapada', titleMy: 'သိက္ခာပဒဝိဘင်း', desc: 'The Precepts', descMy: 'သိက္ခာပုဒ်များကို ခွဲခြားခြင်း' },
      { title: 'Patisambhida', titleMy: 'ပဋိသမ္ဘိဒါဝိဘင်း', desc: 'Analytical Knowledge', descMy: 'ပဋိသမ္ဘိဒါကို ခွဲခြားခြင်း' },
      { title: 'Nana', titleMy: 'ဉာဏဝိဘင်း', desc: 'Knowledge', descMy: 'ဉာဏ်တော်ကို ခွဲခြားခြင်း' },
      { title: 'Khuddakavatthu', titleMy: 'ခုဒ္ဒကဝတ္ထုဝိဘင်း', desc: 'Minor Points', descMy: 'ခုဒ္ဒကဝတ္ထုကို ခွဲခြားခြင်း' },
      { title: 'Dhammahadaya', titleMy: 'ဓမ္မဟဒယဝိဘင်း', desc: 'Heart of Dhamma', descMy: 'ဓမ္မဟဒယကို ခွဲခြားခြင်း' }
    ],
    keyPrinciples: [
      'Technical Deconstruction',
      'Method of Triplets',
      'Purification Mapping'
    ],
    keyPrinciplesMy: [
      'အနုစိတ် ခွဲခြမ်းစိတ်ဖြာနည်း',
      'နည်းလမ်း ၃ သွယ်ဖြင့် ဟောကြားချက်',
      'စင်ကြယ်ခြင်းလမ်းကြောင်း ပြေပုံ'
    ]
  },
  {
    title: 'Dhatukatha',
    titleMy: 'ဓာတုကထာ',
    summary: 'Discussion with Reference to Elements',
    summaryMy: 'ဓာတ်သဘောတို့ကို အခြေခံ၍ ဟောကြားခြင်း။',
    brief: 'Examination of physical and mental elements and their relationships.',
    briefMy: 'ဓမ္မတို့ကို ခန္ဓာ၊ အာယတန၊ ဓာတ်တို့နှင့် စပ်ဟပ်၍ အမေးအဖြေပြုသော ကျမ်းဖြစ်သည်။',
    detailedSummary: 'This text is a dynamic study of relationships. Using a question-and-answer format, it investigates how every conceivable mental state relates to the physical elements and the sense gates. It teaches the practitioner to see the mind not as a solid entity, but as a flowing confluence of elements that are either associated or dissociated from one another.',
    detailedSummaryMy: 'ဤကျမ်းသည် တရားသဘောတို့၏ ဆက်စပ်မှုကို စစ်ဆေးသည်။ အမေးအဖြေနည်းလမ်းဖြင့် စိတ်၏ အခြေအနေတိုင်းသည် ရုပ်တရား၊ အာယတနတို့နှင့် မည်သို့ စပ်ဟပ်သည်ကို ဖော်ထုတ်သည်။ စိတ်သည် ခိုင်မာသောအရာမဟုတ်ဘဲ ဓာတ်တရားများ၏ စီးဆင်းမှုသာဖြစ်ကြောင်း နားလည်စေသော ကျမ်းဖြစ်သည်။',
    content: 'The Dhatukatha (Discussion with Reference to Elements) is the third book of the Abhidhamma Pitaka and is written entirely as a dialogue or catechism. Its primary function is to investigate how various mental and physical states relate to the three fundamental rubrics of Buddhist classification: the 5 Aggregates, the 12 Sense Bases, and the 18 Elements. The text explores fourteen distinct regularized methods of analysis to determine whether a given phenomenon is included in or excluded from these categories, and whether it is associated with or dissociated from other phenomena. This rigorous training helps the practitioner eliminate the deep-seated illusion of a unified "Self" or "Soul" by showing only impersonal elements in constant interaction.',
    contentMy: 'ဓာတုကထာကျမ်းသည် ဓမ္မများကို ခန္ဓာ၊ အာယတန၊ ဓာတ်တို့နှင့် မည်သို့ စပ်ဟပ်သည်၊ မည်သို့ ပါဝင်သည်၊ မည်သို့ မပါဝင်သည်တို့ကို အမေးအဖြေပြု၍ ဟောကြားသောကျမ်းဖြစ်သည်။ ဤကျမ်းတွင် နည်းလမ်း ၁၄ ပါး (၁၄ နယ) ဖြင့် ရုပ်နာမ်တရားတို့ကို ခွဲခြားစိတ်ဖြာသည်။ သင်္ဂဟ-အသင်္ဂဟ (ပါဝင်ခြင်း၊ မပါဝင်ခြင်း) နှင့် သမ္ပယုတ္တ-ဝိပ္ပယုတ္တ (ယှဉ်တွဲခြင်း၊ မယှဉ်တွဲခြင်း) ဟူသော ရှုထောင့်များမှနေ၍ တရားအားလုံးကို စစ်ဆေးသည်။ ဤကဲ့သို့ ရှုမှတ်ခြင်းဖြင့် မိမိကိုယ်ကိုယ် "ငါ" ဟု ထင်နေသော အထင်မှားမှုကို ပယ်ဖျက်စေပြီး၊ မိမိသည် ဓာတ်တရားသဘောများ၏ စုစည်းမှုသာဖြစ်ကြောင်း အသိဉာဏ်ကို ဖြစ်ပေါ်စေပါသည်။',
    chapters: [
      { title: 'Sangaho-Asangaho', titleMy: 'သင်္ဂဟ အသင်္ဂဟ', desc: 'Inclusion and Exclusion', descMy: 'ဓမ္မများ ပါဝင်မှုနှင့် မပါဝင်မှု' },
      { title: 'Sangahitena-Asangahitam', titleMy: 'သင်္ဂဟိတေန အသင်္ဂဟိတံ', desc: 'Inclusion and the Excluded', descMy: 'ပါဝင်သောတရားတို့ဖြင့် မပါဝင်သည်ကို ပြခြင်း' },
      { title: 'Asangahitena-Sangahitam', titleMy: 'အသင်္ဂဟိတေန သင်္ဂဟိတံ', desc: 'Exclusion and the Included', descMy: 'မပါဝင်သောတရားတို့ဖြင့် ပါဝင်သည်ကို ပြခြင်း' },
      { title: 'Sangahitena-Sangahitam', titleMy: 'သင်္ဂဟိတေန သင်္ဂဟိတံ', desc: 'Inclusion and the Included', descMy: 'ပါဝင်သောတရားတို့ဖြင့် ပါဝင်သည်ကို ပြခြင်း' },
      { title: 'Asangahitena-Asangahitam', titleMy: 'အသင်္ဂဟိတေန အသင်္ဂဟိတံ', desc: 'Exclusion and the Excluded', descMy: 'မပါဝင်သောတရားတို့ဖြင့် မပါဝင်သည်ကို ပြခြင်း' },
      { title: 'Sampayoga-Vippayogo', titleMy: 'သမ္ပယောဂ ဝိပ္ပယောဂ', desc: 'Association and Dissociation', descMy: 'ယှဉ်တွဲမှုနှင့် မယှဉ်တွဲမှု' },
      { title: 'Sampayuttena-Vippayuttan', titleMy: 'သမ္ပယုတ္တေန ဝိပ္ပယုတ္တံ', desc: 'Association and the Dissociated', descMy: 'ယှဉ်တွဲသောတရားတို့ဖြင့် မယှဉ်တွဲသည်ကို ပြခြင်း' },
      { title: 'Vippayuttena-Sampayuttan', titleMy: 'ဝိပ္ပယုတ္တေန သမ္ပယုတ္တံ', desc: 'Dissociation and the Associated', descMy: 'မယှဉ်တွဲသောတရားတို့ဖြင့် ယှဉ်တွဲသည်ကို ပြခြင်း' },
      { title: 'Sampayuttena-Sampayuttan', titleMy: 'သမ္ပယုတ္တေန သမ္ပယုတ္တံ', desc: 'Association and the Associated', descMy: 'ယှဉ်တွဲသောတရားတို့ဖြင့် ယှဉ်တွဲသည်ကို ပြခြင်း' },
      { title: 'Vippayuttena-Vippayuttan', titleMy: 'ဝိပ္ပယုတ္တေန ဝိပ္ပယုတ္တံ', desc: 'Dissociation and the Dissociated', descMy: 'မယှဉ်တွဲသောတရားတို့ဖြင့် မယှဉ်တွဲသည်ကို ပြခြင်း' },
      { title: 'Sangahitena-Sampayuttan', titleMy: 'သင်္ဂဟိတေန သမ္ပယုတ္ံ', desc: 'Included and the Associated', descMy: 'ပါဝင်သောတရားတို့ဖြင့် ယှဉ်တွဲသည်ကို ပြခြင်း' },
      { title: 'Sampayuttena-Sangahitam', titleMy: 'သမ္ပယုတ္တေန သင်္ဂဟိတံ', desc: 'Associated and the Included', descMy: 'ယှဉ်တွဲသောတရားတို့ဖြင့် ပါဝင်သည်ကို ပြခြင်း' },
      { title: 'Asangahitena-Vippayuttan', titleMy: 'အသင်္ဂဟိတေန ဝိပ္ပယုတ္တံ', desc: 'Excluded and the Dissociated', descMy: 'မပါဝင်သောတရားတို့ဖြင့် မယှဉ်တွဲသည်ကို ပြခြင်း' },
      { title: 'Vippayuttena-Asangahitam', titleMy: 'ဝိပ္ပယုတ္တေန သင်္ဂဟိတံ', desc: 'Dissociated and the Excluded', descMy: 'မယှဉ်တွဲသောတရားတို့ဖြင့် မပါဝင်သည်ကို ပြခြင်း' }
    ],
    keyPrinciples: [
      'Identity Dissolution',
      'Relational Inclusion',
      'Sense Gate Analytics'
    ],
    keyPrinciplesMy: [
      'အတ္တကို ပယ်ဖျက်နည်း',
      'ဆက်စပ်မှု ခွဲခြမ်းစိတ်ဖြာခြင်း',
      'အာယတနနှင့် ဓာတ် ဆက်စပ်မှု'
    ]
  },
  {
    title: 'Puggala Pannatti',
    titleMy: 'ပုဂ္ဂလပညတ်',
    summary: 'Designation of Individuals',
    summaryMy: 'ပုဂ္ဂိုလ်အမျိုးမျိုးကို သတ်မှတ်ချက်ပြုခြင်း။',
    brief: 'Classification of people according to their level of spiritual progress.',
    briefMy: 'ပုဂ္ဂိုလ်တို့၏ အဆင့်အတန်းနှင့် စရိုက်လက္ခဏာများကို ခွဲခြားသတ်မှတ်ပြသော ကျမ်းဖြစ်သည်။',
    detailedSummary: 'While the rest of the Abhidhamma focuses on impersonal "ultimate realities," this book provides a compassionate guide to the types of human characters encountered in the world. It classifies individuals by their spiritual maturity, temperament, and capacity for wisdom, acting as a manual for understanding both oneself and others on the path to liberation.',
    detailedSummaryMy: 'ဤကျမ်းသည် အခြားအဘိဓမ္မာကျမ်းများနှင့်မတူဘဲ ပုဂ္ဂိုလ်များ၏ စရိုက်နှင့် အဆင့်အတန်းကို အလေးပေးဖော်ပြသည်။ လောကရှိ လူသားတို့၏ စရိုက်လက္ခဏာ၊ ပညာအဆင့်အတန်းနှင့် တရားထူးရနိုင်စွမ်းတို့ကို ခွဲခြားပြဆိုထားရာ မိမိနှင့် သူတစ်ပါးကို နားလည်သဘောပေါက်စေရန် အထောက်အကူပြုသော ကျမ်းဖြစ်သည်။',
    content: 'In the Puggala Pannatti (Designation of Individuals), the Abhidhamma methodology is applied to the conventional world of "beings" and "persons." While most of the Abhidhamma is concerned with impersonal ultimate realities (Paramattha), this book deals with concepts (Pannatti). It organizes types of individuals according to their spiritual attainment, moral standing, and character traits, ranging from the common worldling (Puthujjana) to the fully enlightened Arahant. The book provides a masterful map of human character and temperament, helping spiritual practitioners identify their own stage of progress and understand the diverse capacities of those around them.',
    contentMy: 'ပုဂ္ဂလပညတ်ကျမ်းသည် အခြားအဘိဓမ္မာကျမ်းများနှင့်မတူဘဲ ပရမတ္ထတရားသက်သက်ထက် "ပုဂ္ဂိုလ်" ဟူသော ပညတ်တရားများကို အလေးပေးဖော်ပြသည်။ လောကရှိလူသားတို့၏ စရိုက်၊ ဝါသနာ၊ ပညာနှင့် တရားထူးရရှိမှု အဆင့်အတန်းအလိုက် အမျိုးအစားများစွာ ခွဲခြားထားသည်။ သာမန်လူ (ပုထုဇဉ်) မှစ၍ အရိယာပုဂ္ဂိုလ် (ရှစ်ပါး) အထိ ပုဂ္ဂိုလ်တို့၏ အဆင့်အတန်းကို တိကျစွာ သတ်မှတ်ပြသထားသဖြင့် မိမိကိုယ်မိမိ နားလည်ရန်နှင့် သူတစ်ပါးတို့ကို ကူညီလမ်းပြရာတွင် အလွန်အရေးကြီးသော ကျမ်းဖြစ်ပါသည်။',
    chapters: [
      { title: 'Eka-puggala', titleMy: 'ဧကကပုဂ္ဂလ', desc: 'Groups of One', descMy: 'ပုဂ္ဂိုလ်တစ်မျိုးချင်း' },
      { title: 'Dve-puggala', titleMy: 'ဒုကပုဂ္ဂလ', desc: 'Groups of Two', descMy: 'ပုဂ္ဂိုလ်နှစ်မျိုးတွဲ' },
      { title: 'Ti-puggala', titleMy: 'တိကပုဂ္ဂလ', desc: 'Groups of Three', descMy: 'ပုဂ္ဂိုလ်သုံးမျိုးတွဲ' },
      { title: 'Catu-puggala', titleMy: 'စတုက္ကပုဂ္ဂလ', desc: 'Groups of Four', descMy: 'ပုဂ္ဂိုလ်လေးမျိုးတွဲ' },
      { title: 'Pancaka-puggala', titleMy: 'ပဉ္စကပုဂ္ဂလ', desc: 'Groups of Five', descMy: 'ပုဂ္ဂိုလ်ငါးမျိုးတွဲ' },
      { title: 'Chakka-puggala', titleMy: 'ဆက္ကပုဂ္ဂလ', desc: 'Groups of Six', descMy: 'ပုဂ္ဂိုလ်ခြောက်မျိုးတွဲ' },
      { title: 'Sattaka-puggala', titleMy: 'သတ္တကပုဂ္ဂလ', desc: 'Groups of Seven', descMy: 'ပုဂ္ဂိုလ်ခုနစ်မျိုးတွဲ' },
      { title: 'Atthaka-puggala', titleMy: 'အဋ္ဌကပုဂ္ဂလ', desc: 'Groups of Eight', descMy: 'ပုဂ္ဂိုလ်ရှစ်မျိုးတွဲ' },
      { title: 'Navaka-puggala', titleMy: 'နဝကပုဂ္ဂလ', desc: 'Groups of Nine', descMy: 'ပုဂ္ဂိုလ်ကိုးမျိုးတွဲ' },
      { title: 'Dasaka-puggala', titleMy: 'ဒသကပုဂ္ဂလ', desc: 'Groups of Ten', descMy: 'ပုဂ္ဂိုလ်ဆယ်မျိုးတွဲ' }
    ],
    keyPrinciples: [
      'Character Classification',
      'Spiritual Maturity Guide',
      'Compassionate Wisdom'
    ],
    keyPrinciplesMy: [
      'ပုဂ္ဂိုလ်တို့၏ စရိုက် ခွဲခြားခြင်း',
      'တရားထူးရနိုင်စွမ်း သတ်မှတ်ချက်',
      'သုတ္တန်လာ ပုဂ္ဂိုလ်ဝိဘာဂ'
    ]
  },
  {
    title: 'Kathavatthu',
    titleMy: 'ကထာဝတ္ထု',
    summary: 'Points of Controversy',
    summaryMy: 'အယူဝါဒဆိုင်ရာ ဆွေးနွေးငြင်းခုံမှုများ။',
    brief: 'Refutation of different philosophical views to clarify correct doctrine.',
    briefMy: 'အယူဝါဒဆိုင်ရာ မှားယွင်းမှုများကို ချေဖျက်၍ အမှန်ကို တည်ဆောက်သော ကျမ်းဖြစ်သည်။',
    detailedSummary: 'The Kathavatthu is a fortress of logic built to protect the purity of the Dhamma. It contains over 200 systematic debates that refute false interpretations and clarify the Buddha\'s actual intent. It is an essential study for anyone seeking to distinguish the core teachings from later additions or misunderstandings.',
    detailedSummaryMy: 'ကထာဝတ္ထုကျမ်းသည် သဒ္ဓမ္မတရားတော် သန့်ရှင်းစင်ကြယ်စေရန်အတွက် တည်ဆောက်ထားသော "ယုတ္တိဗေဒခံတပ်" ကြီး ဖြစ်သည်။ မှားယွင်းသော အယူဝါဒပေါင်း ၂၀၀ ကျော်ကို အမေးအဖြေများဖြင့် ချေဖျက်ထားသည်။ ဗုဒ္ဓမြတ်စွာ၏ အဆုံးအမစစ်စစ်ကို ခွဲခြားသိမြင်လိုသူများအတွက် မရှိမဖြစ် လေ့လာသင့်သော ကျမ်းဖြစ်သည်။',
    content: 'The Kathavatthu (Points of Controversy) is unique because it was introduced during the Third Buddhist Council by the elder Moggaliputta Tissa. It is essentially a work of high-level dialectics designed to refute 216 specific false views that had arisen within various Buddhist sects. Using a sophisticated five-point logical method (the Pañcakas), the text exposes internal contradictions in heterodox beliefs while clarifying the Theravadin "Vibhajjavada" (Doctrine of Analysis) position. It stands as a powerful testament to the value of critical thinking, logical rigor, and the preservation of original doctrine in the face of philosophical deviation.',
    contentMy: 'ကထာဝတ္ထုကျမ်းသည် တတိယသံဂါယနာတင်ပွဲတွင် အရှင်မောဂ္ဂလိပုတ္တတိဿမထေရ် ဟောကြားခဲ့သော ကျမ်းဖြစ်၍ တရားတော် သန့်ရှင်းစင်ကြယ်စေရန် ရည်ရွယ်သည်။ ထိုခေတ်က ပေါ်ပေါက်ခဲ့သော အယူဝါဒလက်ခွဲပေါင်းများစွာ၏ မှားယွင်းသော ပွိုင့်ပေါင်း ၂၁၆ ပွိုင့် (ကထာပေါင်း ၂၁၆ ခု) ကို ယုတ္တိဗေဒနည်းလမ်း ၅ မျိုး (အစုံ ၅ မျိုး) ဖြင့် အခြေအတင် ဆွေးနွေးချေပထားသည်။ ဤကျမ်းသည် ဗုဒ္ဓမြတ်စွာ၏ တကယ့်အဆုံးအမစစ်စစ် (သုဒ္ဓဝိဘဇ္ဇဝါဒ) ကို သိမြင်စေရန်နှင့် မိစ္ဆာအယူဝါဒများမှ ကာကွယ်ရန်အတွက် အလွန်အနှစ်သာရရှိသော ယုတ္တိဗေဒကျမ်းကြီး ဖြစ်ပါသည်။',
    chapters: [
      { title: 'Pathama Vaggo', titleMy: 'ပထမဝဂ်', desc: 'First Division', descMy: 'ပထမဆုံး ဆွေးနွေးချက်များ' },
      { title: 'Dutiya Vaggo', titleMy: 'ဒုတိယဝဂ်', desc: 'Second Division', descMy: 'ဒုတိယ ဆွေးနွေးချက်များ' },
      { title: 'Tatiya Vaggo', titleMy: 'တတိယဝဝဂ်', desc: 'Third Division', descMy: 'တတိယ ဆွေးနွေးချက်များ' },
      { title: 'Catuttha Vaggo', titleMy: 'စတုတ္ထဝဂ်', desc: 'Fourth Division', descMy: 'စတုတ္ထ ဆွေးနွေးချက်များ' },
      { title: 'Pancama Vaggo', titleMy: 'ပဉ္စမဝဂ်', desc: 'Fifth Division', descMy: 'ပဉ္စမ ဆွေးနွေးချက်များ' },
      { title: 'Chattha Vaggo', titleMy: 'ဆဋ္ဌဝဂ်', desc: 'Sixth Division', descMy: 'ဆဋ္ဌမ ဆွေးနွေးချက်များ' },
      { title: 'Sattama Vaggo', titleMy: 'သတ္တမဝဂ်', desc: 'Seventh Division', descMy: 'သတ္တမ ဆွေးနွေးချက်များ' },
      { title: 'Atthama Vaggo', titleMy: 'အဋ္ဌမဝဂ်', desc: 'Eighth Division', descMy: 'အဋ္ဌမ ဆွေးနွေးချက်များ' },
      { title: 'Navama Vaggo', titleMy: 'နဝမဝဂ်', desc: 'Ninth Division', descMy: 'နဝမ ဆွေးနွေးချက်များ' },
      { title: 'Dasama Vaggo', titleMy: 'ဒသမဝဂ်', desc: 'Tenth Division', descMy: 'ဒသမ ဆွေးနွေးချက်များ' },
      { title: 'Ekadasama Vaggo', titleMy: 'ဧကာဒသမဝဂ်', desc: 'Eleventh Division', descMy: 'တစ်ဆယ့်တစ်ကြိမ်မြောက် ဆွေးနွေးချက်များ' },
      { title: 'Dvadasama Vaggo', titleMy: 'ဒွါဒသမဝဂ်', desc: 'Twelfth Division', descMy: 'တစ်ဆယ့်နှစ်ကြိမ်မြောက် ဆွေးနွေးချက်များ' },
      { title: 'Terasama Vaggo', titleMy: 'တေရသမဝဂ်', desc: 'Thirteenth Division', descMy: 'တစ်ဆယ့်သုံးကြိမ်မြောက် ဆွေးနွေးချက်များ' },
      { title: 'Cuddasama Vaggo', titleMy: 'စုဒ္ဒသမဝဂ်', desc: 'Fourteenth Division', descMy: 'တစ်ဆယ့်လေးကြိမ်မြောက် ဆွေးနွေးချက်များ' },
      { title: 'Pannarasama Vaggo', titleMy: 'ပန္နရသမဝဂ်', desc: 'Fifteenth Division', descMy: 'တစ်ဆယ့်ငါးကြိမ်မြောက် ဆွေးနွေးချက်များ' },
      { title: 'Solasama Vaggo', titleMy: 'သောဠသမဝဂ်', desc: 'Sixteenth Division', descMy: 'တစ်ဆယ့်ခြောက်ကြိမ်မြောက် ဆွေးနွေးချက်များ' },
      { title: 'Sattarasama Vaggo', titleMy: 'သတ္တရသမဝဂ်', desc: 'Seventeenth Division', descMy: 'တစ်ဆယ့်ခုနစ်ကြိမ်မြောက် ဆွေးနွေးချက်များ' },
      { title: 'Attharasama Vaggo', titleMy: 'အဋ္ဌာရသမဝဂ်', desc: 'Eighteenth Division', descMy: 'တစ်ဆယ့်ရှစ်ကြိမ်မြောက် ဆွေးနွေးချက်များ' },
      { title: 'Unavisatima Vaggo', titleMy: 'ဧကူနဝီသတိမဝဂ်', desc: 'Nineteenth Division', descMy: 'တစ်ဆယ့်ကိုးကြိမ်မြောက် ဆွေးနွေးချက်များ' },
      { title: 'Visatima Vaggo', titleMy: 'ဝီသတိမဝဂ်', desc: 'Twentieth Division', descMy: 'အကြိမ်နှစ်ဆယ်မြောက် ဆွေးနွေးချက်များ' },
      { title: 'Ekavisatima Vaggo', titleMy: 'ဧကဝီသတိမဝဂ်', desc: 'Twenty-first Division', descMy: 'နှစ်ဆယ့်တစ်ကြိမ်မြောက် ဆွေးနွေးချက်များ' },
      { title: 'Bavisatima Vaggo', titleMy: 'ဗာဝီသတိမဝဂ်', desc: 'Twenty-second Division', descMy: 'နှစ်ဆယ့်နှစ်ကြိမ်မြောက် ဆွေးနွေးချက်များ' },
      { title: 'Te-visatima Vaggo', titleMy: 'တေဝီသတိမဝဂ်', desc: 'Twenty-third Division', descMy: 'နှစ်ဆယ့်သုံးကြိမ်မြောက် ဆွေးနွေးချက်များ' }
    ],
    keyPrinciples: [
      'Logical Protection',
      'Doctrine Refutation',
      'Dialectical Clarity'
    ],
    keyPrinciplesMy: [
      'သာသနာတော်ကို ယုတ္တိဖြင့် ကာကွယ်ခြင်း',
      'မှားယွင်းသော အယူဝါဒများကို ချေဖျက်ခြင်း',
      'အမေးအဖြေဖြင့် အမှန်တရားကို ရှာဖွေခြင်း'
    ]
  },
  {
    title: 'Yamaka',
    titleMy: 'ယမိုက်',
    summary: 'The Book of Pairs',
    summaryMy: 'အတွဲလိုက် ဟောကြားသော အမေးအဖြေများ။',
    brief: 'Logical analysis of terms using pairs of questions to define their scope.',
    briefMy: 'ဓမ္မတို့ကို အစုံလိုက် အမေးအဖြေပြု၍ အနက်အဓိပ္ပာယ်ကို နယ်ပယ်သတ်မှတ်သော ကျမ်းဖြစ်သည်။',
    detailedSummary: 'Considered the most rigorous logical exercise in the Canon, the Yamaka uses a "Method of Pairs" to define the exact boundaries of terms. For example: "Are all mental factors consciousness? Is all consciousness a mental factor?" This relentless interrogation sharpens the mind, removing every trace of ambiguity and ensuring a precise understanding of the path.',
    detailedSummaryMy: 'ယမိုက်ကျမ်းသည် အဘိဓမ္မာတွင် ယုတ္တိဗေဒအကျဆုံး ကျမ်းဖြစ်သည်။ ဓမ္မများကို အတွဲလိုက် အစုံလိုက် အမေးအဖြေပြုလုပ်ကာ အဓိပ္ပာယ်ကို နယ်ပယ်သတ်မှတ်သည်။ ဤကဲ့သို့ ရှုထောင့်အမျိုးမျိုးမှ စစ်ဆေးခြင်းဖြင့် ဝေဝါးမှုများကို ပယ်ဖျက်ပြီး တရားတော်ကို တိကျစွာ နားလည်စေပါသည်။',
    content: 'The Yamaka (The Book of Pairs) is regarded as the most challenging logical exercise in the Abhidhamma Pitaka. Its purpose is to demonstrate the precise boundaries of psychological and philosophical terms using a unique method of dual questions. For every term analyzed, it asks: "Is X always Y?" and "Is Y always X?" This relentless cross-interrogation, applied to 10 specific chapters like Roots (Mula), Aggregates (Khandha), and Elements (Dhatu), strips away every layer of conceptual ambiguity. By working through the Yamaka, the student develops a mind that is razor-sharp and immune to the vagueness of common language, leading to a truly scientific understanding of the mind.',
    contentMy: 'ယမိုက်ကျမ်းသည် အဘိဓမ္မာ ၇ ကျမ်းတွင် ဘုရားရှင်၏ ယုတ္တိဗေဒစွမ်းရည်ကို အထင်ရှားဆုံးတွေ့မြင်နိုင်သော ကျမ်းဖြစ်သည်။ "ယမိုက်" ဆိုသည်မှာ အတွဲ (အစုံ) ဟု အဓိပ္ပာယ်ရသည်။ တရားတစ်ပါးစီကို (၁) အနုလောမ (အဖြောင့်) နှင့် (၂) ပဋိလောမ (အပြန်) ဟူ၍ အစုံလိုက် အမေးအဖြေပြုလုပ်ကာ အဓိပ္ပာယ်ကို နယ်ပယ်သတ်မှတ်သည်။ ယမိုက် ၁၀ မျိုးဖြင့် ရုပ်၊ နာမ်၊ ဓမ္မတို့ကို စစ်ဆေးရာတွင် ဝေဝါးမှုများကို ပယ်ဖျက်ပြီး၊ တရားတစ်ခုချင်းစီ၏ အဓိပ္ပာယ်ကို ပိုင်ပိုင်နိုင်နိုင် တိတိကျကျ သိမြင်ရန်အတွက် ဤကျမ်းက လေ့ကျင့်ပေးပါသည်။',
    chapters: [
      { title: 'Mula Yamaka', titleMy: 'မူလယမိုက်', desc: 'Pairs of Roots', descMy: 'ဟိတ်မူလများကို အစုံလိုက်ခွဲခြားခြင်း' },
      { title: 'Khandha Yamaka', titleMy: 'ခန္ဓာယမိုက်', desc: 'Pairs of Aggregates', descMy: 'ခန္ဓာများကို အစုံလိုက်ခွဲခြားခြင်း' },
      { title: 'Ayatana Yamaka', titleMy: 'အာယတနယမိုက်', desc: 'Pairs of Sense Bases', descMy: 'အာယတနများကို အစုံလိုက်ခွဲခြားခြင်း' },
      { title: 'Dhatu Yamaka', titleMy: 'ဓာတုယမိုက်', desc: 'Pairs of Elements', descMy: 'ဓာတ်များကို အစုံလိုက်ခွဲခြားခြင်း' },
      { title: 'Sacca Yamaka', titleMy: 'သစ္စာယမိုက်', desc: 'Pairs of Truths', descMy: 'သစ္စာများကို အစုံလိုက်ခွဲခြားခြင်း' },
      { title: 'Sankhara Yamaka', titleMy: 'သင်္ခါရယမိုက်', desc: 'Pairs of Formations', descMy: 'သင်္ခါရများကို အစုံလိုက်ခွဲခြားခြင်း' },
      { title: 'Anusaya Yamaka', titleMy: 'အနုသယယမိုက်', desc: 'Pairs of Tendencies', descMy: 'အနုသယများကို အစုံလိုက်ခွဲခြားခြင်း' },
      { title: 'Citta Yamaka', titleMy: 'စိတ္တယမိုက်', desc: 'Pairs of Consciousness', descMy: 'စိတ်များကို အစုံလိုက်ခွဲခြားခြင်း' },
      { title: 'Dhamma Yamaka', titleMy: 'ဓမ္မယမိုက်', desc: 'Pairs of Phenomena', descMy: 'တရားများကို အစုံလိုက်ခွဲခြားခြင်း' },
      { title: 'Indriya Yamaka', titleMy: 'ဣန္ဒြေယမိုက်', desc: 'Pairs of Faculties', descMy: 'ဣန္ဒြေများကို အစုံလိုက်ခွဲခြားခြင်း' }
    ],
    keyPrinciples: [
      'Dualistic Interrogation',
      'Boundary Verification',
      'Categorical Percision'
    ],
    keyPrinciplesMy: [
      'အမေးနှစ်ရပ်ဖြင့် စစ်ဆေးခြင်း',
      'အဓိပ္ပာယ် နယ်ပယ် သတ်မှတ်ခြင်း',
      'တိကျသော ယုတ္တိဗေဒ ထရိန်နင်'
    ]
  },
  {
    title: 'Patthana',
    titleMy: 'ပဋ္ဌာန်း',
    summary: 'The Book of Causal Relations',
    summaryMy: 'အကြောင်းအကျိုး ဆက်စပ်မှု ပဋ္ဌာန်း ၂၄ ပစ္စည်း။',
    brief: 'Detailed exposition of the 24 laws of cause and effect in the universe.',
    briefMy: 'အကြောင်းတရား ၂၄ ပါးတို့၏ အပြန်အလှန် ကျေးဇူးပြုပုံကို အကျယ်တဝံ့ ဟောကြားသော ကျမ်းဖြစ်သည်။',
    detailedSummary: 'The Patthana is the supreme climax of Buddhist philosophy. It describes the 24 universal laws of conditionality—from the Root Condition to the Absence Condition—that govern everything from the rotation of stars to the arising of a single thought. It reveals the invisible threads that bind cause to effect, providing the ultimate insight into the nature of reality.',
    detailedSummaryMy: 'ပဋ္ဌာန်းကျမ်းကြီးသည် ဗုဒ္ဓရှင်တော်၏ သဗ္ဗညုတဉာဏ်တော်ကို အကျယ်ပြန့်ဆုံး ဖော်ပြရာ ကျမ်းဖြစ်သည်။ အကြောင်းတရား ၂၄ ပါး (၂၄ ပစ္စည်း) ဖြင့် စကြာဝဠာအတွင်းရှိ ရုပ်နာမ်တရားတို့၏ အပြန်အလှန် ကျေးဇူးပြုပုံ၊ အကြောင်းအကျိုး ဆက်စပ်ပုံတို့ကို အနက်ရှိုင်းဆုံး ဟောကြားထားသော "မဟာပကရဏ" ကျမ်းကြီး ဖြစ်ပါသည်။',
    content: 'The Patthana (Book of Causal Relations) is the crowning jewel of the Abhidhamma and is affectionately known as the "Great Book" (Mahapakarana). It defines the entire structural dynamics of the universe through 24 universal laws of conditionality (the Paccayas). From the Root Condition (Hetu) to the Presence Condition (Atthi), the Patthana reveals that no phenomenon exists in isolation; everything is part of a complex, interdependent web of causation. The sheer scale of the Patthana is designed to mirror the Buddha\'s Omniscience (Sabbaññuta Ñana), proving that existence is not a collection of solid things, but a continuous, conditioned process of arising and vanishing.',
    contentMy: 'ပဋ္ဌာန်းကျမ်းသည် အဘိဓမ္မာ ၇ ကျမ်း၏ သရဖူဖြစ်ပြီး "မဟာပကရဏ" ဟုခေါ်သော ကျမ်းကြီးဖြစ်သည်။ ဤကျမ်းကြီးတွင် စကြာဝဠာအတွင်းရှိ ရုပ်နာမ်အားလုံး၏ အပြန်အလှန် ဆက်စပ်နေသော အကြောင်းတရား ၂၄ ပါး (၂၄ ပစ္စည်း) ကို အကျယ်တဝံ့ ဟောကြားထားသည်။ "ဟိတ်ပစ္စည်း" မှစ၍ "အဝိဂတပစ္စည်း" အထိ အကြောင်းတရားတို့သည် အကျိုးတရားတို့အပေါ် မည်သို့ကျေးဇူးပြုသည်ကို သိပ္ပံနည်းကျကျ ဖော်ပြထားသည်။ အရာရာသည် အကြောင်းမဲ့ ဖြစ်ပေါ်လာသည်မဟုတ်ဘဲ အပြန်အလှန် ဆက်စပ်၍ ဖြစ်ပေါ်နေသော "အကြောင်းအကျိုး အစဉ်အတန်း" သာဖြစ်ကြောင်း သိမြင်စေသော ကျမ်းကြီးဖြစ်ပါသည်။',
    chapters: [
      { title: 'Hetu-paccaya', titleMy: 'ဟိတ်ပစ္စည်း', desc: 'Root Condition', descMy: 'အမြစ်သဖွယ် ကျေးဇူးပြုခြင်း' },
      { title: 'Arammana-paccaya', titleMy: 'အာရမ္မဏပစ္စည်း', desc: 'Object Condition', descMy: 'အာရုံသဖွယ် ကျေးဇူးပြုခြင်း' },
      { title: 'Adhipati-paccaya', titleMy: 'အဓိပတိပစ္စည်း', desc: 'Dominance Condition', descMy: 'အကြီးအမှူးသဖွယ် ကျေးဇူးပြုခြင်း' },
      { title: 'Anantara-paccaya', titleMy: 'အနန္တရပစ္စည်း', desc: 'Proximity Condition', descMy: 'အခြားမဲ့ ကျေးဇူးပြုခြင်း' },
      { title: 'Samanantara-paccaya', titleMy: 'သမနန္တရပစ္စည်း', desc: 'Contiguity Condition', descMy: 'အခြားမဲ့အားလျော်စွာ ကျေးဇူးပြုခြင်း' },
      { title: 'Sahajata-paccaya', titleMy: 'သဟဇာတပစ္စည်း', desc: 'Co-nascence Condition', descMy: 'အတူတကွဖြစ်၍ ကျေးဇူးပြုခြင်း' },
      { title: 'Annamanna-paccaya', titleMy: 'အညမညပစ္စည်း', desc: 'Mutuality Condition', descMy: 'အပြန်အလှန် ကျေးဇူးပြုခြင်း' },
      { title: 'Nissaya-paccaya', titleMy: 'နိဿယပစ္စည်း', desc: 'Support Condition', descMy: 'မှီရာသဖွယ် ကျေးဇူးပြုခြင်း' },
      { title: 'Upanissaya-paccaya', titleMy: 'ဥပနိဿယပစ္စည်း', desc: 'Decisive Support', descMy: 'အားကြီးသောမှီရာသဖွယ် ကျေးဇူးပြုခြင်း' },
      { title: 'Purejata-paccaya', titleMy: 'ပုရေဇာတပစ္စည်း', desc: 'Pre-nascence Condition', descMy: 'ရှေးဦးစွာဖြစ်၍ ကျေးဇူးပြုခြင်း' },
      { title: 'Pacchajata-paccaya', titleMy: 'ပစ္ဆာဇာတပစ္စည်း', desc: 'Post-nascence Condition', descMy: 'နောက်မှဖြစ်၍ ကျေးဇူးပြုခြင်း' },
      { title: 'Asevana-paccaya', titleMy: 'အာသေဝနပစ္စည်း', desc: 'Repetition Condition', descMy: 'အဖန်တလဲလဲ ကျေးဇူးပြုခြင်း' },
      { title: 'Kamma-paccaya', titleMy: 'ကမ္မပစ္စည်း', desc: 'Kamma Condition', descMy: 'စေတနာကံဖြင့် ကျေးဇူးပြုခြင်း' },
      { title: 'Vipaka-paccaya', titleMy: 'ဝိပါကပစ္စည်း', desc: 'Result Condition', descMy: 'အကျိုးပေးခြင်းဖြင့် ကျေးဇူးပြုခြင်း' },
      { title: 'Ahara-paccaya', titleMy: 'အာဟာရပစ္စည်း', desc: 'Nutriment Condition', descMy: 'အစာအာဟာရဖြင့် ကျေးဇူးပြုခြင်း' },
      { title: 'Indriya-paccaya', titleMy: 'ဣန္ဒြေပစ္စည်း', desc: 'Faculty Condition', descMy: 'အစိုးရခြင်းဖြင့် ကျေးဇူးပြုခြင်း' },
      { title: 'Jhana-paccaya', titleMy: 'ဈာနပစ္စည်း', desc: 'Jhana Condition', descMy: 'ဈာန်အင်္ဂါဖြင့် ကျေးဇူးပြုခြင်း' },
      { title: 'Magga-paccaya', titleMy: 'မဂ္ဂပစ္စည်း', desc: 'Path Condition', descMy: 'မဂ္ဂင်အင်္ဂါဖြင့် ကျေးဇူးပြုခြင်း' },
      { title: 'Sampayutta-paccaya', titleMy: 'သမ္ပယုတ္တပစ္စည်း', desc: 'Association Condition', descMy: 'ယှဉ်တွဲခြင်းဖြင့် ကျေးဇူးပြုခြင်း' },
      { title: 'Vippayutta-paccaya', titleMy: 'ဝိပ္ပယုတ္တပစ္စည်း', desc: 'Dissociation Condition', descMy: 'မယှဉ်တွဲခြင်းဖြင့် ကျေးဇူးပြုခြင်း' },
      { title: 'Atthi-paccaya', titleMy: 'အတ္ထိပစ္စည်း', desc: 'Presence Condition', descMy: 'တည်ရှိခြင်းဖြင့် ကျေးဇူးပြုခြင်း' },
      { title: 'Natthi-paccaya', titleMy: 'နတ္ထိပစ္စည်း', desc: 'Absence Condition', descMy: 'မရှိခြင်းဖြင့် ကျေးဇူးပြုခြင်း' },
      { title: 'Vigata-paccaya', titleMy: 'ဝိဂတပစ္စည်း', desc: 'Disappearance Condition', descMy: 'ကင်းကွာခြင်းဖြင့် ကျေးဇူးပြုခြင်း' },
      { title: 'Avigata-paccaya', titleMy: 'အဝိဂတပစ္စည်း', desc: 'Non-disappearance Condition', descMy: 'မကင်းကွာခြင်းဖြင့် ကျေးဇူးပြုခြင်း' }
    ],
    keyPrinciples: [
      'Infinite Conditionality',
      'Law of Dependent Origination',
      'The Web of Existence'
    ],
    keyPrinciplesMy: [
      'အကြောင်းတရား ၂၄ ပါး၏ အစွမ်း',
      'အပြန်အလှန် ကျေးဇူးပြုမှု နိယာမ',
      'စကြာဝဠာ၏ အကြောင်းအကျိုး ယန္တရား'
    ]
  }
];
