import type { OgPageKey } from '@/lib/og-pages';
import { contentType, createOgImage, ogImageAlt, size } from '@/lib/create-og-image';

export { contentType, size };

export function makeOgImageHandlers(page: OgPageKey) {
  const alt = ogImageAlt(page);

  async function Image() {
    return createOgImage(page);
  }

  return { Image, alt };
}
