import OtaLogo, { GLOBAL_OTAS } from './OtaLogo';

export default function OtaLogoWall() {
  return (
    <div className="ht-ota-wall">
      <p className="fb-label ht-ota-tier-label">Global OTAs</p>
      <ul className="ht-ota-grid ht-ota-grid--global" role="list">
        {GLOBAL_OTAS.map((ota) => (
          <li key={ota.id} className="ht-ota-cell" role="listitem">
            <OtaLogo ota={ota} />
          </li>
        ))}
      </ul>
      <p className="ht-ota-tagline">
        Plus MakeMyTrip, Goibibo, Cleartrip, Yatra and <strong>100+ more OTAs</strong> — all from one
        dashboard.
      </p>
    </div>
  );
}
