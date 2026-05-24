export type GlobalOta = {
  id: string;
  name: string;
  alt: string;
  logoSrc: string;
  width: number;
  height: number;
};

export const GLOBAL_OTAS: GlobalOta[] = [
  {
    id: 'booking',
    name: 'Booking.com',
    alt: 'Booking.com OTA integration for hotel channel manager',
    logoSrc: '/hotels/otas/booking.svg',
    width: 180,
    height: 40,
  },
  {
    id: 'expedia',
    name: 'Expedia',
    alt: 'Expedia OTA integration',
    logoSrc: '/hotels/otas/expedia.svg',
    width: 160,
    height: 40,
  },
  {
    id: 'agoda',
    name: 'Agoda',
    alt: 'Agoda OTA integration — channel manager India',
    logoSrc: '/hotels/otas/agoda.svg',
    width: 140,
    height: 40,
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    alt: 'Airbnb OTA integration',
    logoSrc: '/hotels/otas/airbnb.svg',
    width: 140,
    height: 40,
  },
];

type OtaLogoProps = {
  ota: GlobalOta;
};

export default function OtaLogo({ ota }: OtaLogoProps) {
  return (
    <figure className="ht-ota-logo">
      <div className="ht-ota-logo-box">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ota.logoSrc}
          alt={ota.alt}
          width={ota.width}
          height={ota.height}
          className="ht-ota-brand-img"
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="sr-only">{ota.name}</figcaption>
    </figure>
  );
}
