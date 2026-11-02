// 10 Khmer Google Fonts
import { Battambang_400Regular, Battambang_700Bold } from '@expo-google-fonts/battambang';
import { Bayon_400Regular } from '@expo-google-fonts/bayon';
import { Bokor_400Regular } from '@expo-google-fonts/bokor';
import { Dangrek_400Regular } from '@expo-google-fonts/dangrek';
import { Fasthand_400Regular } from '@expo-google-fonts/fasthand';
import { Hanuman_400Regular, Hanuman_700Bold } from '@expo-google-fonts/hanuman';
import { KantumruyPro_400Regular, KantumruyPro_700Bold } from '@expo-google-fonts/kantumruy-pro';
import { Koulen_400Regular } from '@expo-google-fonts/koulen';
import { Moul_400Regular } from '@expo-google-fonts/moul';
import { Siemreap_400Regular } from '@expo-google-fonts/siemreap';

// 10 English Google Fonts
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { Oswald_400Regular, Oswald_700Bold } from '@expo-google-fonts/oswald';
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export interface FontOption {
  id: string;
  name: string;
  nativeName?: string;
  category: 'khmer' | 'english';
  regular: string;
  bold?: string;
  sampleText: string;
  description: string;
}

export const FONT_MAP = {
  // Khmer Fonts
  'Battambang-Regular': Battambang_400Regular,
  'Battambang-Bold': Battambang_700Bold,
  'Bayon-Regular': Bayon_400Regular,
  'Bokor-Regular': Bokor_400Regular,
  'Dangrek-Regular': Dangrek_400Regular,
  'Fasthand-Regular': Fasthand_400Regular,
  'Hanuman-Regular': Hanuman_400Regular,
  'Hanuman-Bold': Hanuman_700Bold,
  'KantumruyPro-Regular': KantumruyPro_400Regular,
  'KantumruyPro-Bold': KantumruyPro_700Bold,
  'Koulen-Regular': Koulen_400Regular,
  'Moul-Regular': Moul_400Regular,
  'Siemreap-Regular': Siemreap_400Regular,

  // English Fonts
  'Inter-Regular': Inter_400Regular,
  'Inter-Bold': Inter_700Bold,
  'Roboto-Regular': Roboto_400Regular,
  'Roboto-Bold': Roboto_700Bold,
  'Poppins-Regular': Poppins_400Regular,
  'Poppins-Bold': Poppins_700Bold,
  'Montserrat-Regular': Montserrat_400Regular,
  'Montserrat-Bold': Montserrat_700Bold,
  'OpenSans-Regular': OpenSans_400Regular,
  'OpenSans-Bold': OpenSans_700Bold,
  'Lato-Regular': Lato_400Regular,
  'Lato-Bold': Lato_700Bold,
  'Raleway-Regular': Raleway_400Regular,
  'Raleway-Bold': Raleway_700Bold,
  'Nunito-Regular': Nunito_400Regular,
  'Nunito-Bold': Nunito_700Bold,
  'Oswald-Regular': Oswald_400Regular,
  'Oswald-Bold': Oswald_700Bold,
  'PlayfairDisplay-Regular': PlayfairDisplay_400Regular,
  'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
};

export const KHMER_FONTS: FontOption[] = [
  {
    id: 'Battambang',
    name: 'Battambang',
    nativeName: 'បាត់ដំបង',
    category: 'khmer',
    regular: 'Battambang-Regular',
    bold: 'Battambang-Bold',
    sampleText: 'ព្រះរាជាណាចក្រកម្ពុជា ជាតិ សាសនា ព្រះមហាក្សត្រ',
    description: 'Clean modern Khmer sans-serif, excellent for reading and interfaces',
  },
  {
    id: 'Bayon',
    name: 'Bayon',
    nativeName: 'បាយ័ន',
    category: 'khmer',
    regular: 'Bayon-Regular',
    sampleText: 'សួស្តីកម្ពុជា អរគុណសន្តិភាព និងការអភិវឌ្ឍ',
    description: 'Distinctive Khmer display font inspired by ancient temple motifs',
  },
  {
    id: 'Bokor',
    name: 'Bokor',
    nativeName: 'បូកគោ',
    category: 'khmer',
    regular: 'Bokor-Regular',
    sampleText: 'រមណីយដ្ឋានភ្នំបូកគោ ខេត្តកំពត ទឹកដីទេសចរណ៍',
    description: 'Classic retro decorative Khmer script with unique curve aesthetics',
  },
  {
    id: 'Dangrek',
    name: 'Dangrek',
    nativeName: 'ដងរែក',
    category: 'khmer',
    regular: 'Dangrek-Regular',
    sampleText: 'ជួរភ្នំដងរែក ព្រំប្រទល់ធម្មជាតិដ៏រឹងមាំនៃមាតុភូមិ',
    description: 'Bold expressive display font with distinctive geometric strength',
  },
  {
    id: 'Fasthand',
    name: 'Fasthand',
    nativeName: 'ហ្វាសហែន',
    category: 'khmer',
    regular: 'Fasthand-Regular',
    sampleText: 'អក្សរឆ្លាក់ដៃខ្មែរ រចនាបថទន់ភ្លន់ និងរស់រវើក',
    description: 'Fluid handwriting Khmer script with artistic calligraphic strokes',
  },
  {
    id: 'Hanuman',
    name: 'Hanuman',
    nativeName: 'ហនុមាន',
    category: 'khmer',
    regular: 'Hanuman-Regular',
    bold: 'Hanuman-Bold',
    sampleText: 'ចំណេះដឹងគឺជាទ្រព្យសម្បត្តិដែលចោរមិនអាចលួចបានឡើយ',
    description: 'Traditional Khmer serif typeface, highly legible for body texts and books',
  },
  {
    id: 'KantumruyPro',
    name: 'Kantumruy Pro',
    nativeName: 'កណ្ដុំរុយ ប្រូ',
    category: 'khmer',
    regular: 'KantumruyPro-Regular',
    bold: 'KantumruyPro-Bold',
    sampleText: 'ការរចនាបែបទំនើប ទាក់ទាញ និងងាយស្រួលអានបំផុត',
    description: 'Premium modern Khmer workhorse font optimized for high-density UI',
  },
  {
    id: 'Koulen',
    name: 'Koulen',
    nativeName: 'គូលែន',
    category: 'khmer',
    regular: 'Koulen-Regular',
    sampleText: 'ឧទ្យានជាតិភ្នំគូលែន ប្រភពដើមនៃអាណាចក្រអង្គរ',
    description: 'Impactful Khmer headline font with heavy weight and bold presence',
  },
  {
    id: 'Moul',
    name: 'Moul',
    nativeName: 'មូល',
    category: 'khmer',
    regular: 'Moul-Regular',
    sampleText: 'អក្សរមូល ប្រើសម្រាប់ចំណងជើង និងឯកសារផ្លូវការ',
    description: 'Authentic Khmer curved formal Moul script used in titles & heritage works',
  },
  {
    id: 'Siemreap',
    name: 'Siemreap',
    nativeName: 'សៀមរាប',
    category: 'khmer',
    regular: 'Siemreap-Regular',
    sampleText: 'ប្រាសាទអង្គរវត្ត ខេត្តសៀមរាប កេរដំណែលពិភពលោក',
    description: 'Compact and balanced Khmer text font for screens and UI components',
  },
];

export const ENGLISH_FONTS: FontOption[] = [
  {
    id: 'Inter',
    name: 'Inter',
    category: 'english',
    regular: 'Inter-Regular',
    bold: 'Inter-Bold',
    sampleText: 'Sphinx of black quartz, judge my vow. 1234567890',
    description: 'State of the art interface font designed specifically for mobile screens',
  },
  {
    id: 'Roboto',
    name: 'Roboto',
    category: 'english',
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
    sampleText: 'The quick brown fox jumps over the lazy dog.',
    description: 'Google signature neo-grotesque sans-serif with natural reading rhythm',
  },
  {
    id: 'Poppins',
    name: 'Poppins',
    category: 'english',
    regular: 'Poppins-Regular',
    bold: 'Poppins-Bold',
    sampleText: 'Modern geometric curves tailored for friendly interfaces.',
    description: 'Beloved geometric sans-serif with perfectly rounded bowl aesthetics',
  },
  {
    id: 'Montserrat',
    name: 'Montserrat',
    category: 'english',
    regular: 'Montserrat-Regular',
    bold: 'Montserrat-Bold',
    sampleText: 'Urban elegance inspired by traditional Buenos Aires signage.',
    description: 'Architectural, wide-set sans-serif with great charisma in headers',
  },
  {
    id: 'OpenSans',
    name: 'Open Sans',
    category: 'english',
    regular: 'OpenSans-Regular',
    bold: 'OpenSans-Bold',
    sampleText: 'Humanist sans serif with open forms and friendly appearance.',
    description: 'Ultra-legible humanist sans-serif optimized across all display types',
  },
  {
    id: 'Lato',
    name: 'Lato',
    category: 'english',
    regular: 'Lato-Regular',
    bold: 'Lato-Bold',
    sampleText: 'Warm yet serious styling that evokes stability and balance.',
    description: 'Warm humanist font with semi-rounded details and sleek structure',
  },
  {
    id: 'Raleway',
    name: 'Raleway',
    category: 'english',
    regular: 'Raleway-Regular',
    bold: 'Raleway-Bold',
    sampleText: 'Refined headings and stylish details with artistic numerals.',
    description: 'Elegant neo-grotesque display typeface with sophisticated flair',
  },
  {
    id: 'Nunito',
    name: 'Nunito',
    category: 'english',
    regular: 'Nunito-Regular',
    bold: 'Nunito-Bold',
    sampleText: 'Gentle rounded terminals for cozy, playful modern mobile apps.',
    description: 'Well-balanced rounded sans-serif imparting warmth and friendliness',
  },
  {
    id: 'Oswald',
    name: 'Oswald',
    category: 'english',
    regular: 'Oswald-Regular',
    bold: 'Oswald-Bold',
    sampleText: 'CONDENSED IMPACT DESIGNED FOR GRIPPING HEADLINES & METRICS.',
    description: 'Condensed gothic sans-serif crafted for punchy titles and labels',
  },
  {
    id: 'PlayfairDisplay',
    name: 'Playfair Display',
    category: 'english',
    regular: 'PlayfairDisplay-Regular',
    bold: 'PlayfairDisplay-Bold',
    sampleText: 'Timeless editorial luxury serif with high transitional contrast.',
    description: 'Sophisticated transitional serif font with exquisite editorial elegance',
  },
];

export const DEFAULT_KHMER_FONT_ID = 'KantumruyPro';
export const DEFAULT_ENGLISH_FONT_ID = 'Poppins';

export function getKhmerFontById(id: string): FontOption {
  return KHMER_FONTS.find((f) => f.id === id) || KHMER_FONTS[0];
}

export function getEnglishFontById(id: string): FontOption {
  return ENGLISH_FONTS.find((f) => f.id === id) || ENGLISH_FONTS[0];
}