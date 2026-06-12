import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadDMSans } from '@remotion/google-fonts/DMSans';

// Load fonts — call once at module level so Remotion preloads them
const { fontFamily: playfairFamily } = loadPlayfair();
const { fontFamily: dmSansFamily } = loadDMSans();

export const colors = {
  magenta: '#BB1786',
  magentaDeep: '#8A0F61',
  magentaLight: '#D94FAD',
  champagne: '#F2DEBA',
  petal: '#FAF0F5',
  white: '#FFFFFF',
  offWhite: 'rgba(255,255,255,0.92)',
  dim: 'rgba(255,255,255,0.65)',
} as const;

export const fonts = {
  display: playfairFamily,  // High-fashion editorial serif
  body: dmSansFamily,       // Clean, modern grotesque
} as const;
