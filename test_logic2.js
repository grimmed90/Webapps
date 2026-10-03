const MS_PER_DAY = 1000 * 60 * 60 * 24;
const anchorDate = new Date('2026-10-05T00:00:00Z');
const pattern = [
    'E', 'E', 'N', 'N', 'L', 'L', 'L',
    'L', 'L', 'F', 'F', 'E', 'L', 'L',
    'F', 'F', 'E', 'E', 'N', 'NH', 'NH',
    'L', 'L', 'L', 'L', 'L', 'L', 'L',
    'N', 'N', 'L', 'L', 'F', 'FH', 'FH',
];

const teamOffsets = {
    'A-lag': 0,
    'B-lag': 7,    // Offset 7 matches 'N', 'N', 'L', 'L', 'F', 'FH', 'FH'
    'C-lag': 28,   // Offset 28 matches 'L', 'L', 'F', 'F', 'E', 'L', 'L'
    'D-lag': 21,   // Offset 21 matches 'F', 'F', 'E', 'E', 'N', 'NH', 'NH'
    'E-lag': 14    // Offset 14 matches 'L', 'L', 'L', 'L', 'L', 'L', 'L'
};

function getShift(targetDate, teamOffset) {
    const utcTarget = Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    const utcAnchor = Date.UTC(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate());
    const diffDays = Math.floor((utcTarget - utcAnchor) / MS_PER_DAY);
    const cycleLength = pattern.length;
    let shiftIndex = ((diffDays - teamOffset) % cycleLength + cycleLength) % cycleLength;
    return pattern[shiftIndex];
}

console.log("A-lag (Day 0): " + getShift(new Date('2026-10-05T00:00:00Z'), teamOffsets['A-lag']));
console.log("B-lag (Day 0): " + getShift(new Date('2026-10-05T00:00:00Z'), teamOffsets['B-lag']));
console.log("C-lag (Day 0): " + getShift(new Date('2026-10-05T00:00:00Z'), teamOffsets['C-lag']));
console.log("D-lag (Day 0): " + getShift(new Date('2026-10-05T00:00:00Z'), teamOffsets['D-lag']));
console.log("E-lag (Day 0): " + getShift(new Date('2026-10-05T00:00:00Z'), teamOffsets['E-lag']));
