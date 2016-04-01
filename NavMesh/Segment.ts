class Segment
{
    public pointA: Coord;
    public pointB: Coord;
    // compris dans [0;Pi[
    public dirCoef: number;

    constructor(pointA: Coord, pointB: Coord)
    {
        var ptA = pointA;
        var ptB = pointB;
        this.pointA = ptA;
        this.pointB = ptB;
        this.dirCoef = (this.pointB.y - this.pointA.y) / (this.pointB.x - this.pointA.x);
    }

    public GetSortedSegment(): Segment
    {
        if (this.pointA.x > this.pointB.x || (this.pointA.x === this.pointB.x && this.pointA.y > this.pointB.y)) {
            return new Segment(this.pointB, this.pointA);
        }
        return this;
    }

    public GetEquation(): LineEquation
    {
        return new LineEquation(
            this.dirCoef,
            this.pointA.y - (this.pointA.x * this.dirCoef)
        )
    }

    public GetIntersectionWith(segment: Segment, considerEdges: boolean = true): Coord
    {
        var toPrecision = (num: number) =>
        {
            return Math.round(num * 100000) / 100000;
        };
        var thisSorted = this.GetSortedSegment();
        segment = segment.GetSortedSegment();
        if (thisSorted.dirCoef === segment.dirCoef) {
            // no intersect: parallele
            return null;
        } else {
            var equA = thisSorted.GetEquation();
            var equB = segment.GetEquation();

            if (equA.coeffDir === Infinity) {
                var intersectX = thisSorted.pointA.x;
                var valAtX = toPrecision(intersectX * equB.coeffDir + equB.zeroVal);
                var evalFct = considerEdges ?
                    () =>
                    {
                        return intersectX >= segment.pointA.x && intersectX <= segment.pointB.x
                            && valAtX >= thisSorted.pointA.y && valAtX <= thisSorted.pointB.y;
                    }
                    :
                    () =>
                    {
                        return intersectX > segment.pointA.x && intersectX < segment.pointB.x
                            && valAtX > thisSorted.pointA.y && valAtX < thisSorted.pointB.y;
                    }
                if (evalFct()) {
                    return new Coord(
                        intersectX,
                        valAtX
                    );
                } else {
                    // console.info("intersection hors segments : ", intersectX);
                    return null;
                }
            } else if (equB.coeffDir === Infinity) {
                var intersectX = segment.pointA.x;
                var valAtX = toPrecision(intersectX * equA.coeffDir + equA.zeroVal);
                var evalFct = considerEdges ?
                    () =>
                    {
                        return intersectX >= thisSorted.pointA.x && intersectX <= thisSorted.pointB.x
                            && valAtX >= segment.pointA.y && valAtX <= segment.pointB.y;
                    }
                    :
                    () =>
                    {
                        return intersectX > thisSorted.pointA.x && intersectX < thisSorted.pointB.x
                            && valAtX > segment.pointA.y && valAtX < segment.pointB.y;
                    }
                if (evalFct()) {
                    return new Coord(
                        intersectX,
                        valAtX
                    );
                } else {
                    // console.info("intersection hors segments : ", intersectX);
                    return null;
                }
            } else {
                var intersectX = toPrecision((equA.zeroVal - equB.zeroVal) / (equB.coeffDir - equA.coeffDir));
                // console.log(intersectX);
                var evalFct = considerEdges ?
                    () =>
                    {
                        return (intersectX >= thisSorted.pointA.x && intersectX <= thisSorted.pointB.x)
                            && (intersectX >= segment.pointA.x && intersectX <= segment.pointB.x);
                    }
                    :
                    () =>
                    {
                        return (intersectX > thisSorted.pointA.x && intersectX < thisSorted.pointB.x)
                            && (intersectX > segment.pointA.x && intersectX < segment.pointB.x);
                    }
                if (evalFct()) {
                    return new Coord(
                        intersectX,
                        toPrecision(intersectX * equA.coeffDir + equA.zeroVal)
                    );
                } else {
                    return null;
                }
            }
        }
    }

    public Contains(point: Coord, includeBorder = true, log = false): boolean
    {
        var sorted = this.GetSortedSegment();
        // point inside box
        var inBox = false;
        if ((sorted.pointA.x <= point.x && sorted.pointA.y <= point.y
            && sorted.pointB.x >= point.x && sorted.pointB.y >= point.y)) {
            inBox = true;
            if (!includeBorder && (sorted.pointA.Equals(point) || sorted.pointB.Equals(point))) {
                inBox = false;
            }
        }
        if (inBox) {
            var valueAtX: number;
            // Vertical segment, can't compute Y
            if (sorted.dirCoef === Infinity) {
                valueAtX = point.y;
            } else {
                valueAtX = sorted.pointA.y + (point.x - sorted.pointA.x) * sorted.dirCoef;
            }

            // correct y value at x
            if (valueAtX === point.y) {
                return true;
            }
        }
        return false;
    }

    public Equals(seg: Segment): boolean
    {
        var thisSorted = this.GetSortedSegment();
        seg = seg.GetSortedSegment();
        return seg.pointA.Equals(thisSorted.pointA) && seg.pointB.Equals(thisSorted.pointB)
    }

    public toString()
    {
        return this.pointA.toString() + " - " + this.pointB.toString();
    }
}
