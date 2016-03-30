
class Angle
{
    public segmentA: Segment;
    public segmentB: Segment;
    public angle: number;
    public point: Coord;

    constructor(segA: Segment, segB: Segment)
    {
        this.segmentA = segA;
        this.segmentB = segB;
        var commonPoint = segA.pointA;
        if ((commonPoint.x !== segB.pointA.x || commonPoint.y !== segB.pointA.y)
            && (commonPoint.x !== segB.pointB.x || commonPoint.y !== segB.pointB.y)) {
            commonPoint = segA.pointB;
            /*TODO : REMOVE */
            if ((commonPoint.x !== segB.pointA.x || commonPoint.y !== segB.pointA.y)
                && (commonPoint.x !== segB.pointB.x || commonPoint.y !== segB.pointB.y)) {
                console.error("INVALID ANGLE : ", segA, segB);
                throw "unable to continue";
            }
        }
        this.point = commonPoint;
        var GetOtherPoint = (seg: Segment): Coord =>
        {
            if (seg.pointA.x === commonPoint.x && seg.pointA.y === commonPoint.y) {
                return seg.pointB;
            } else {
                return seg.pointA;
            }
        };
        var otherA = GetOtherPoint(segA);
        var otherB = GetOtherPoint(segB);
        var alA = otherA.toPolar(this.point).angle;
        var alB = otherB.toPolar(this.point).angle;
        this.angle = Math.abs(alB - alA);
    }
}
