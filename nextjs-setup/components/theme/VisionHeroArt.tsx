/** Vision-page hero background (SVG + fade) for prototype-themed landing hero. */

export default function VisionHeroArt() {
  return (
    <div className="home-vision-art" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/prototype/vision-hero.svg" alt="" />
      <div className="home-vision-fade" />
    </div>
  );
}
