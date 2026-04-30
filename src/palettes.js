const PALETTES = {
  morning: {
    '--bg': '#fff8eb',
    '--bg-alt': '#fcf0db',
    '--route-bg': '#f5ead0',
    '--ink': '#2d2416',
    '--ink-light': '#5c4d38',
    '--ink-muted': '#a09078',
    '--card': '#fffdf8',
    '--card-border': '#f0e0c0',
    '--track': '#d4c8a8',
    '--track-done': '#d4a030',
    '--active': '#d4882a',
    '--active-glow': 'rgba(212, 136, 42, 0.28)',
    '--card-shadow': '0 4px 20px rgba(31, 26, 19, 0.05)',
    '--card-shadow-lg': '0 8px 32px rgba(31, 26, 19, 0.08)',
    '--d1': '#d4882a',
    '--d1-bg': '#fef7ed',
    '--d2': '#5a8a4a',
    '--d2-bg': '#f2f7ed',
    '--gold': '#d4a030',
    '--gold-light': '#fdf3db',
  },

  afternoon: {
    '--bg': '#fcfaf6',
    '--bg-alt': '#f6f1e7',
    '--route-bg': '#f0ebe0',
    '--ink': '#1f1a13',
    '--ink-light': '#5c5140',
    '--ink-muted': '#a09380',
    '--card': '#ffffff',
    '--card-border': '#e8e0d2',
    '--track': '#cdbd9d',
    '--track-done': '#c49b45',
    '--active': '#d4782a',
    '--active-glow': 'rgba(212, 120, 42, 0.28)',
    '--card-shadow': '0 4px 20px rgba(31, 26, 19, 0.06)',
    '--card-shadow-lg': '0 8px 32px rgba(31, 26, 19, 0.1)',
    '--d1': '#b84130',
    '--d1-bg': '#fdf4f2',
    '--d2': '#4d7c5b',
    '--d2-bg': '#f0f7f2',
    '--gold': '#c49b45',
    '--gold-light': '#f7efde',
  },

  night: {
    '--bg': '#1e1c27',
    '--bg-alt': '#242230',
    '--route-bg': '#252236',
    '--ink': '#ede8f6',
    '--ink-light': '#d8d2e6',
    '--ink-muted': '#aaa3be',
    '--card': '#2a2740',
    '--card-border': '#3d3858',
    '--track': '#4a4460',
    '--track-done': '#c49b45',
    '--active': '#e0b84a',
    '--active-glow': 'rgba(224, 184, 74, 0.28)',
    '--card-shadow': '0 4px 20px rgba(0, 0, 0, 0.3)',
    '--card-shadow-lg': '0 8px 32px rgba(0, 0, 0, 0.4)',
    '--d1': '#c49b45',
    '--d1-bg': '#2d2838',
    '--d2': '#6a9a6a',
    '--d2-bg': '#283830',
    '--gold': '#e0c060',
    '--gold-light': '#3d3450',
  },
}

const SECTION_TO_PERIOD = [
  'morning',   // 0: 出发 10:30
  'afternoon', // 1: 紫阳街 12:00
  'afternoon', // 2: 府城墙 下午
  'night',     // 3: 仙居 傍晚
  'morning',   // 4: 神仙居 DAY2
  'afternoon', // 5: 仙境 山顶
  'night',     // 6: 嵊州 晚间
]

export function getPalette(activeIndex) {
  const period = SECTION_TO_PERIOD[activeIndex] || 'afternoon'
  return PALETTES[period]
}
