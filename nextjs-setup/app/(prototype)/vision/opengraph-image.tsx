import { makeOgImageHandlers } from '@/lib/og-route-image';

const { Image, alt } = makeOgImageHandlers('vision');

export { alt };
export { contentType, size } from '@/lib/create-og-image';
export default Image;
