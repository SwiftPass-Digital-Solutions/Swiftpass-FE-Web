function darkenColor(hex: string, amount: number): string {
    const col = parseInt(hex.slice(1), 16);
    let r = (col >> 16) - amount;
    let g = ((col >> 8) & 0x00FF) - amount;
    let b = (col & 0x0000FF) - amount;

    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);

    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

export default darkenColor;