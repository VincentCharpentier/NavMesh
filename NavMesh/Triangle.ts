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

}
