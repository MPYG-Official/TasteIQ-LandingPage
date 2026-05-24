/** Shared class names for home landing sections when prototype theme is active. */

export type LandingTheme = ReturnType<typeof getLandingTheme>;

export function getLandingTheme(isPrototype: boolean) {
  if (!isPrototype) {
    return {
      isPrototype: false,
      hero: '',
      section: 'py-16 md:py-24 bg-white text-gray-900',
      sectionMuted: 'py-16 md:py-24 bg-gray-50 text-gray-900',
      sectionDark: 'py-16 md:py-24 bg-brand-gradient text-white',
      sectionPostAI: 'postai-section postai-section--classic',
      heading: 'text-3xl md:text-4xl font-bold',
      headingLg: 'text-3xl md:text-5xl font-bold',
      headingOnDark: 'text-3xl md:text-5xl font-bold text-white',
      subtext: 'text-gray-600',
      subtextOnDark: 'text-gray-200',
      card: 'bg-white rounded-lg shadow-xl border border-gray-100',
      cardMuted: 'bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20',
      badge: 'bg-pink-500 text-white',
      primaryBtn:
        'bg-brand-primary hover:opacity-90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all',
      secondaryBtn:
        'bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white/30',
      primaryBtnOnDark:
        'bg-white text-brand-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all inline-block',
      secondaryBtnOnDark:
        'bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white/30 transition-all inline-block',
      secondaryBtnOnLight:
        'bg-transparent border-2 border-gray-300 text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50',
      iconBox: 'bg-brand-primary/10 text-brand-primary',
      check: 'text-green-600',
      navLink: 'text-gray-700 hover:text-brand-primary',
      header: 'bg-surface-bg/95 backdrop-blur-sm shadow-md border-b border-black/5',
      logo: 'text-brand-primary',
      link: 'text-brand-primary hover:text-brand-secondary',
      accentText: 'text-brand-primary',
      tagHighlight: 'bg-pink-500 text-white',
      inputFocus: 'focus:border-brand-primary focus-within:border-brand-primary',
      ctaBox: 'bg-brand-gradient text-white',
      quoteMark: 'text-purple-100',
      bodyText: 'text-gray-700',
      bodyTitle: 'text-gray-900',
      bodyMuted: 'text-gray-500',
      whatsappBtn:
        'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white',
      useCaseCard: 'bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all border border-gray-100 group',
      useCaseIcon: (gradient: string, color: string) =>
        `w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`,
    };
  }

  return {
    isPrototype: true,
    hero: 'home-hero-prototype',
    section: 'py-16 md:py-24 bg-[#fbfaf7] text-[#0e1116]',
    sectionMuted: 'py-16 md:py-24 bg-[#f3f0e8] text-[#0e1116]',
    sectionDark: 'py-16 md:py-24 bg-[#0e1116] text-[#faf8f4]',
    sectionPostAI: 'postai-section postai-section--prototype',
    heading:
      'font-display font-normal tracking-tight text-[#0e1116] text-3xl md:text-4xl',
    headingLg:
      'font-display font-normal tracking-tight text-[#0e1116] text-3xl md:text-5xl',
    headingOnDark:
      'font-display font-normal tracking-tight text-[#faf8f4] text-3xl md:text-5xl',
    subtext: 'text-[#6b7280]',
    subtextOnDark: 'text-[rgba(250,248,244,0.72)]',
    card: 'bg-white rounded-xl border border-[rgba(14,17,22,0.1)] shadow-sm',
    cardMuted:
      'bg-[rgba(255,255,255,0.06)] backdrop-blur-sm rounded-2xl border border-[rgba(255,255,255,0.12)]',
    badge:
      'bg-[#c24a2a]/10 text-[#c24a2a] border border-[#c24a2a]/25 font-semibold',
    primaryBtn:
      'bg-[#0e1116] hover:bg-black text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:-translate-y-0.5',
    secondaryBtn:
      'bg-transparent border border-[rgba(14,17,22,0.18)] text-[#0e1116] px-8 py-4 rounded-full font-medium text-lg hover:bg-[rgba(14,17,22,0.04)]',
    primaryBtnOnDark:
      'bg-[#faf8f4] text-[#0e1116] hover:bg-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-black/20 inline-block',
    secondaryBtnOnDark:
      'bg-transparent border-2 border-[rgba(250,248,244,0.45)] text-[#faf8f4] hover:bg-[rgba(255,255,255,0.08)] px-8 py-4 rounded-full font-medium text-lg transition-all inline-block',
    secondaryBtnOnLight:
      'bg-transparent border border-[rgba(14,17,22,0.18)] text-[#0e1116] px-8 py-4 rounded-full font-medium text-lg hover:bg-[rgba(14,17,22,0.04)]',
    iconBox: 'bg-[#c24a2a]/12 text-[#c24a2a]',
    check: 'text-[#1f8a5b]',
    navLink: 'text-[#20242c] hover:text-[#c24a2a] font-medium',
    header:
      'bg-[#fbfaf7]/92 backdrop-blur-md shadow-sm border-b border-[rgba(14,17,22,0.08)]',
    logo: 'font-display text-[#0e1116] tracking-tight',
    link: 'text-[#c24a2a] hover:text-[#8a3318] font-medium',
    accentText: 'text-[#c24a2a]',
    tagHighlight: 'bg-[#c24a2a] text-white',
    inputFocus: 'focus:border-[#c24a2a] focus-within:border-[#c24a2a]',
    ctaBox: 'bg-[#0e1116] text-[#faf8f4] rounded-2xl border border-[rgba(255,255,255,0.08)]',
    quoteMark: 'text-[#c24a2a]/15',
    bodyText: 'text-[#20242c]',
    bodyTitle: 'text-[#0e1116]',
    bodyMuted: 'text-[#6b7280]',
    whatsappBtn: 'bg-[#0e1116] hover:bg-black text-white',
    useCaseCard:
      'bg-white rounded-xl p-8 text-center border border-[rgba(14,17,22,0.1)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group',
    useCaseIcon: (_gradient: string, _color: string) =>
      'w-20 h-20 bg-[#c24a2a]/12 rounded-2xl flex items-center justify-center text-[#c24a2a] group-hover:scale-110 transition-transform',
  };
}
