import type { ReactNode } from 'react';
import {
  IconBeo,
  IconBooking,
  IconCatering,
  IconChannel,
  IconCrm,
  IconEvent,
  IconFloor,
  IconGuests,
  IconKyc,
  IconMulti,
  IconPayments,
  IconPms,
  IconQuote,
  IconReports,
  IconStaff,
} from './icons';

const ICON_MAP: Record<string, ReactNode> = {
  pms: <IconPms />,
  channel: <IconChannel />,
  booking: <IconBooking />,
  multi: <IconMulti />,
  event: <IconEvent />,
  beo: <IconBeo />,
  floor: <IconFloor />,
  catering: <IconCatering />,
  guests: <IconGuests />,
  kyc: <IconKyc />,
  crm: <IconCrm />,
  staff: <IconStaff />,
  quote: <IconQuote />,
  payments: <IconPayments />,
  reports: <IconReports />,
};

export function solutionIcon(key: string): ReactNode {
  return ICON_MAP[key] ?? <IconPms />;
}
