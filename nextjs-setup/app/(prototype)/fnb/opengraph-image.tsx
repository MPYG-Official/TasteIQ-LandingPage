import { makeOgImageHandlers } from '@/lib/og-route-image';

const { Image, alt } = makeOgImageHandlers('fnb');

export { alt };
export { contentType, size } from '@/lib/create-og-image';
export default Image;
