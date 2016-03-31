class Triangle extends ConvexShape
{
    // Angle can't be more than 180° (Math.PI)
    protected AddAngle(angle: Angle)
    {
        if (angle.angle < 0) {
            angle.angle += Math.PI * 2;
        }
        if (angle.angle > Math.PI) {
            // negate
            angle.angle = -1 * (angle.angle - 2 * Math.PI);
        }
        this.angles.push(angle);
    }


    public Contains(point: Coord): boolean
    {
        var points = this.segments.reduce((prev: Array<Coord>, current: Segment) =>
        {
            if (!prev.some(pt => pt.Equals(current.pointA))) prev.push(current.pointA);
            if (!prev.some(pt => pt.Equals(current.pointB))) prev.push(current.pointB);
            return prev;
        }, [])
        var p0 = points[0], p1 = points[1], p2 = points[2]
        var A = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
        var sign = A < 0 ? -1 : 1;
        var s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * point.x + (p0.x - p2.x) * point.y) * sign;
        var t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * point.x + (p1.x - p0.x) * point.y) * sign;

        return s > 0 && t > 0 && (s + t) < 2 * A * sign;
    }
}
