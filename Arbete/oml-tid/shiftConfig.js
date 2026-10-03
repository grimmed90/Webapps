// Configuration for the 5-shift schedule (Stora Enso Fors)

window.shiftConfig = {
    // Anchor date: A known Monday where the 35-day cycle starts for A-lag.
    // Based on scraping skiftschema.se, we use 2026-10-05.
    anchorDate: '2026-10-05T00:00:00Z',

    // The 35-day shift pattern for a single team.
    // Exact sequence verified from skiftschema.se for Stora Enso Fors 5-skift.
    pattern: [
        'E', 'E', 'N', 'N', 'L', 'L', 'L',
        'L', 'L', 'F', 'F', 'E', 'L', 'L',
        'F', 'F', 'E', 'E', 'N', 'NH', 'NH',
        'L', 'L', 'L', 'L', 'L', 'L', 'L',
        'N', 'N', 'L', 'L', 'F', 'FH', 'FH'
    ],

    // Number of days offset for each team.
    // Aligned to match the specific Stora Enso sequence rotation.
    teamOffsets: {
        'A-lag': 0,
        'B-lag': 7,
        'C-lag': 28,
        'D-lag': 21,
        'E-lag': 14
    },

    // Definitions of shift types including colors and times
    shiftTypes: {
        'F': { name: 'Förmiddag', time: '06:00 - 14:00', colorClass: 'bg-blue-100 text-blue-800 border-blue-200' },
        'E': { name: 'Eftermiddag', time: '14:00 - 22:00', colorClass: 'bg-orange-100 text-orange-800 border-orange-200' },
        'N': { name: 'Natt', time: '22:00 - 06:00', colorClass: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
        'FH': { name: 'Förmiddag Helg', time: '06:00 - 18:00', colorClass: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
        'NH': { name: 'Natt Helg', time: '18:00 - 06:00', colorClass: 'bg-purple-100 text-purple-800 border-purple-200' },
        'L': { name: 'Ledig', time: 'Ledig', colorClass: 'bg-gray-100 text-gray-600 border-gray-200' }
    }
};
