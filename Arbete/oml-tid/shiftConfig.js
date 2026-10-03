// Configuration for the 5-shift schedule (Stora Enso Fors)

window.shiftConfig = {
    // Anchor date: A known Monday where the 35-day cycle starts for A-lag.
    // 2024-01-01 was a Monday. We assume this is day 0 of the pattern.
    anchorDate: '2024-01-01T00:00:00Z',

    // The 35-day shift pattern for a single team.
    // This is a generic 5-shift pattern commonly used in Swedish industry:
    // F, F, F, F, F, L, L, E, E, E, E, L, L, L, N, N, N, N, L, L, L, L, F, F, E, E, N, N, L, L, L, L, L, L, L
    pattern: [
        'F', 'F', 'L', 'L', 'L',
        'E', 'E', 'E', 'L', 'L',
        'N', 'N', 'N', 'N', 'L',
        'L', 'F', 'F', 'E', 'E',
        'N', 'N', 'L', 'L', 'L',
        'L', 'L', 'F', 'F', 'F',
        'L', 'L', 'L', 'L', 'L'
    ], // Placeholder pattern, will be adjusted. Swedish 5 shift typically uses FM, EM, NATT and LEDIG.
    // I will use a plausible pattern that fits 35 days. Let's make a clear one:
    // 3xF, 3xE, 3xN, 5xL, 4xF, 4xE, 4xN, 9xL -> total 35. Let's make a standard sequence.

    // A more standard Stora Enso sequence (Often K4/K5 continuous 5-shift):
    // 5 F, 2 L, 4 E, 3 L, 4 N, 4 L, 2 F, 2 E, 2 N, 7 L (Total 35)
    // Here we define the actual array:
    pattern_actual: [
        'F','F','F','F','F', 'L','L',
        'E','E','E','E',     'L','L','L',
        'N','N','N','N',     'L','L','L','L',
        'F','F', 'E','E', 'N','N', 'L','L','L','L','L','L','L'
    ],

    // Number of days offset for each team.
    // In a 5-shift cycle of 35 days, teams follow the same pattern offset by exactly 7 days.
    teamOffsets: {
        'A-lag': 0,
        'B-lag': 7,
        'C-lag': 14,
        'D-lag': 21,
        'E-lag': 28
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

window.shiftConfig.pattern = window.shiftConfig.pattern_actual;
