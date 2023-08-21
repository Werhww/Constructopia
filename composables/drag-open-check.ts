function between(x: number, min: number, max: number) {
    return x >= min && x <= max;
}

export default function(e: MouseEvent, mouseDownX: number, mouseUpX: number) {
    mouseUpX = e.clientX;
    if (between(mouseUpX, mouseDownX - 15, mouseDownX + 15)) {
        return true
    }

    return false
}