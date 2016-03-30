class ConvexShape
{
    private static _nextId = 1;
    // public points: Array<Coord>;
    public segments: Array<Segment>;
    public angles: Array<Angle>;
    protected isClosed: boolean = false;
    public id: number;
    public neightbors: Array<number> = new Array();
    protected openLeft: Coord;
    protected openRight: Coord;

    constructor(segment: Segment)
    {
        this.id = ConvexShape._nextId++;
        this.segments = new Array();
        this.segments.push(segment);
        segment = segment.GetSortedSegment();
        // this.points = new Array();
        // this.points.push(segment.pointA,segment.pointB);
        this.angles = new Array();
        this.openLeft = segment.pointA;
        this.openRight = segment.pointB;
    }

    public TryFusion(otherShape: ConvexShape)
    {
        var found = false;
        var convex = true;
        var seg: Segment;
        // find common segment
        for (var i = 0; i < otherShape.segments.length; i++) {
            var otherSeg = otherShape.segments[i];
            for (var j = 0; j < this.segments.length; j++) {
                var thisSeg = this.segments[j];
                if (thisSeg.Equals(otherSeg)) {
                    found = true;

                    var angleA =
                        this.angles.filter(a => a.point.Equals(thisSeg.pointA))[0].angle
                        + otherShape.angles.filter(a => a.point.Equals(thisSeg.pointA))[0].angle;
                    if (angleA > Math.PI) {
                        convex = false;
                        break;
                    }
                    var angleB =
                        this.angles.filter(a => a.point.Equals(thisSeg.pointB))[0].angle
                        + otherShape.angles.filter(a => a.point.Equals(thisSeg.pointB))[0].angle;
                    if (angleB > Math.PI) {

                        convex = false;
                        break;
                    }

                    var success = true;


                    this.segments = this.segments.concat(
                        otherShape.segments.filter(seg =>
                            !this.segments.some(mySeg => mySeg.Equals(seg))
                        )
                    );
                    var otherAngleA = otherShape.angles.filter(a => a.point.Equals(thisSeg.pointA))[0];
                    this.angles.filter(a => a.point.Equals(thisSeg.pointA)).forEach(a =>
                    {
                        a.angle = angleA;
                        if (a.segmentA.Equals(thisSeg)) {
                            a.segmentA = otherAngleA.segmentA.Equals(thisSeg) ? otherAngleA.segmentA : otherAngleA.segmentB;
                        } else {
                            a.segmentB = otherAngleA.segmentA.Equals(thisSeg) ? otherAngleA.segmentA : otherAngleA.segmentB;
                        }
                    });
                    var otherAngleB = otherShape.angles.filter(a => a.point.Equals(thisSeg.pointB))[0];
                    this.angles.filter(a => a.point.Equals(thisSeg.pointB)).forEach(a =>
                    {
                        a.angle = angleB;
                        if (a.segmentA.Equals(thisSeg)) {
                            a.segmentA = otherAngleB.segmentA.Equals(thisSeg) ? otherAngleB.segmentA : otherAngleB.segmentB;
                        } else {
                            a.segmentB = otherAngleB.segmentA.Equals(thisSeg) ? otherAngleB.segmentA : otherAngleB.segmentB;
                        }
                    });
                    this.angles = this.angles.concat(
                        otherShape.angles.filter(a => !a.point.Equals(thisSeg.pointA) && !a.point.Equals(thisSeg.pointB))
                    );
                    this.segments = this.segments.filter(seg => !seg.Equals(thisSeg));
                    // }
                    break;
                }
            }
            if (found) {
                break;
            }
        }
        // console.log(found, success, this.IsConvex());
        return found && convex;
    }

    public TryAddSegment(segment: Segment): boolean
    {
        var success = false;
        var extSegment = new Segment(this.openLeft, this.openRight);
        if (extSegment.Equals(segment)) {
            this.isClosed = true;
            success = true;
            this.AddAngle(new Angle(segment, this.segments[0]));
            this.AddAngle(new Angle(this.segments[this.segments.length - 1], segment));
            this.segments.push(segment);
            this.openLeft = null;
            this.openRight = null;
        } else if (segment.pointA.Equals(this.openLeft) || segment.pointB.Equals(this.openLeft)) {
            this.AddAngle(new Angle(segment, this.segments[0]));
            this.segments.unshift(segment);
            success = true;
            if (segment.pointA.Equals(this.openLeft)) {
                this.openLeft = segment.pointB;
            } else {
                this.openLeft = segment.pointA;
            }
        } else if (segment.pointA.Equals(this.openRight) || segment.pointB.Equals(this.openRight)) {
            this.AddAngle(new Angle(this.segments[this.segments.length - 1], segment));
            this.segments.push(segment);
            success = true;
            if (segment.pointA.Equals(this.openRight)) {
                this.openRight = segment.pointB;
            } else {
                this.openRight = segment.pointA;
            }
        }
        return success;
    }

    protected AddAngle(angle: Angle)
    {
        if (angle.angle < 0) {
            angle.angle += Math.PI * 2;
        }
        this.angles.push(angle);
    }

    public IsConvex()
    {
        return !this.angles.some(a => a.angle > Math.PI);
    }
}
