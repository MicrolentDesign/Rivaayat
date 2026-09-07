import { JOURNAL_IMAGES } from './image-manifest';
import type { JournalPost } from './types';

/* Journal art is matched on the slugified post *title*, not the URL slug —
   name the file after the headline ("How to read a jaali placket.png") and it
   lands on the right entry. Titles are what someone naming an export has in
   front of them; slugs are an implementation detail they never see. */

const slugify = (v: string) =>
  v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export interface JournalArt {
  base?: string;
  src?: string;
}

export function journalArt(post: JournalPost): JournalArt {
  const base = JOURNAL_IMAGES[slugify(post.title)];
  return base ? { base } : { src: post.image };
}
