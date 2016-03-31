

class Obstacle
{
    public coord: Coord;
    public width: number;
    public height: number;
    private distX: number;
    private distY: number;

    constructor(_coord: Coord, _width: number, _height: number)
    {
        this.SetCoord(_coord);
        this.SetWidth(_width);
        this.SetHeight(_height);
    }

    public GetCoord(): Coord
    {
        return this.coord;
    }

    public GetWidth(): number
    {
        return this.width;
    }

    public GetHeight(): number
    {
        return this.height;
    }

    public SetCoord(_coord: Coord): void
    {
        this.coord = _coord;
        this.SetWidth(this.width);
        this.SetWidth(this.height);
    }

    public SetWidth(_width: number): void
    {
        this.width = _width;
        this.distX = this.coord.x + this.width;
    }

    public SetHeight(_height: number): void
    {
        this.height = _height;
        this.distY = this.coord.y + this.height;
    }

    public GetKeyPoints(): Array<Coord>
    {
        /* TODO: mid-edges ? */
        return new Array(
            this.coord,
            new Coord(this.distX, this.coord.y),
            new Coord(this.coord.x, this.distY),
            new Coord(this.distX, this.distY)
        );
    }

    public Contains(point: Coord, includeBorder = false)
    {
        if (includeBorder) {
            if (point.x >= this.coord.x && point.x <= this.distX
                && point.y >= this.coord.y && point.y <= this.distY) {
                return true;
            }
        } else {
            if (point.x > this.coord.x && point.x < this.distX
                && point.y > this.coord.y && point.y < this.distY) {
                return true;
            }
        }
        return false;
    }

    public GetSegments(): Array<Segment>
    {
        return new Array(
            new Segment(
                this.coord,
                new Coord(
                    this.distX,
                    this.coord.y
                )
            ),
            new Segment(
                this.coord,
                new Coord(
                    this.coord.x,
                    this.distY
                )
            ),
            new Segment(
                new Coord(
                    this.distX,
                    this.coord.y
                ),
                new Coord(
                    this.distX,
                    this.distY
                )
            ),
            new Segment(
                new Coord(
                    this.coord.x,
                    this.distY
                ),
                new Coord(
                    this.distX,
                    this.distY
                )
            )
        );
    }

    public toString()
    {
        return "[o:" + this.coord.toString() + " (" + this.distX + "," + this.distY + ")]";
    }
}
