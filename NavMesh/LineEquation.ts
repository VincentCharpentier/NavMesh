class LineEquation
{
    public coeffDir: number;
    public zeroVal: number;

    constructor(coeff: number, zeroValue: number)
    {
        this.coeffDir = coeff;
        this.zeroVal = zeroValue;
    }

    Equals(other: LineEquation): boolean
    {
        return this.coeffDir === other.coeffDir && this.zeroVal === other.zeroVal;
    }
}
