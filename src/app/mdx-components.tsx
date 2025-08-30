import type { MDXComponents } from 'mdx/types';

// I TUOI componenti “da blog”
import Callout from '@/components/blog/Callout';
import Quiz from '@/components/blog/Quiz';
import CTA from '@/components/blog/CTA';
import CodeBlock from '@/components/blog/CodeBlock';
import Card from '@/components/blog/Card';
import YouTube from '@/components/blog/YouTube';

// Scegli uno dei due “Chart” qui:
// 1) Se usi Recharts:
// import Chart from '@/components/blog/BarChart';
// 2) Se vuoi niente dipendenze:
import Chart from '@/components/blog/LightBarChart';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // mappa tag MDX -> componenti React
    Callout,
    Quiz,
    CTA,
    CodeBlock,
    Chart,
    Card,
    YouTube,

    // Mantieni la possibilità di override lato pagina
    ...components,
  };
}
