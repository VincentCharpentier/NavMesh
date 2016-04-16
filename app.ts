function cl(message?: any, ...optionalParams: any[])
{
    console.log.apply(console, arguments);
}


class Config
{
    public static World = {
        CHUNK_SIZE: 300
    }

    public static Debug = {
        TRIANGLE: true,
        SHAPES: true
    }
}

window.addEventListener("load", Init);

function Init()
{
    var chunk = new Chunk(new Coord(
        0,
        0
    ));

    var originalObs = chunk.obstacles.concat([]);

    var meshes = chunk.GetNavMesh();
    console.log("#############################################################################################");
    var obs = chunk.GetObstacles();
    var seg = chunk.GetBlockingSegments(obs);
    window["original_obs"] = originalObs;
    window["obs"] = obs;
    window["meshes"] = meshes;
    window["segments"] = seg;
    Draw(meshes
        , chunk.obstacles
        , obs
        , seg
        // , chunk.GetNavMesh(false)
    );
}

function Draw(
    shapes: Array<ConvexShape>,
    originalObstacles?: Array<Obstacle>,
    obstacles?: Array<Obstacle>,
    blockingSegments?: Array<Segment>,
    originalShapes?: Array<ConvexShape>)
{
    // console.info(blockingSegments, shapes);
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    canvas.width = Config.World.CHUNK_SIZE;
    canvas.height = Config.World.CHUNK_SIZE;
    var ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

    ctx.lineWidth = 0.5;

    // draw original Obstacles outlines
    // if (originalObstacles) {
    //     ctx.strokeStyle = "#0A0";
    //     originalObstacles.forEach(o =>
    //     {
    //         o.GetSegments().forEach(s =>
    //         {
    //             ctx.beginPath();
    //             ctx.moveTo(s.pointA.x, s.pointA.y);
    //             ctx.lineTo(s.pointB.x, s.pointB.y);
    //             ctx.stroke();
    //         });
    //     });
    // }


    // draw obstacles
    if (obstacles) {
        ctx.fillStyle = "rgba(255,0,0,0.15)";
        // fill
        obstacles.forEach(o => ctx.fillRect(o.coord.x, o.coord.y, o.width, o.height));
        // draw edges
        ctx.strokeStyle = "rgba(255,0,0,0.15)";
        obstacles.forEach(o =>
        {
            o.GetSegments().forEach(s =>
            {
                ctx.beginPath();
                ctx.moveTo(s.pointA.x, s.pointA.y);
                ctx.lineTo(s.pointB.x, s.pointB.y);
                ctx.stroke();
            });
        });

        // ctx.strokeStyle = "#000";
        // obstacles.forEach(o =>
        // {
        //     o.GetSegments().forEach(s =>
        //     {
        //         ctx.beginPath();
        //         ctx.moveTo(s.pointA.x, s.pointA.y);
        //         ctx.lineTo(s.pointB.x, s.pointB.y);
        //         ctx.stroke();
        //     });
        // });

        ctx.strokeStyle = "#F00";
        blockingSegments.forEach(s =>
        {
            ctx.beginPath();
            ctx.moveTo(s.pointA.x, s.pointA.y);
            ctx.lineTo(s.pointB.x, s.pointB.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillRect(
                s.pointA.x - 2,
                s.pointA.y - 2,
                5,
                5
            )
            ctx.fillRect(
                s.pointB.x - 2,
                s.pointB.y - 2,
                5,
                5
            )
        });
    }


    // if (Config.Debug.TRIANGLE) {
    //     DrawTriangles(ctx, originalShapes);
    // }
    DrawMeshes(ctx, shapes);
}

function DrawTriangles(ctx: CanvasRenderingContext2D, originalShapes: Array<ConvexShape>)
{
    // draw original triangles
    ctx.strokeStyle = "#0F0";
    originalShapes.forEach(s =>
    {
        var currentPoint = s.segments[0].pointA;
        s.segments.forEach(seg =>
        {
            ctx.beginPath();
            ctx.moveTo(seg.pointA.x, seg.pointA.y);
            ctx.lineTo(seg.pointB.x, seg.pointB.y);
            ctx.stroke();
        });
    });
}

function DrawMeshes(ctx: CanvasRenderingContext2D, shapes: Array<ConvexShape>)
{
    ctx.strokeStyle = "#00F";
    ctx.fillStyle = "rgba(0,0,255,0.2)";
    shapes.forEach(s =>
    {
        var currentPoint = s.segments[0].pointA;
        // Fill
        var donePoints = [currentPoint];
        var GetNextPoint = (): boolean =>
        {
            var potentialSeg = s.segments
                // segments ayant un point commun
                .filter(seg => seg.pointA.Equals(currentPoint) || seg.pointB.Equals(currentPoint));
            var potentialPts = potentialSeg.map(seg => seg.pointA).concat(potentialSeg.map(seg => seg.pointB));
            potentialPts = potentialPts.filter(pt => !donePoints.some(p => p.Equals(pt)));
            if (potentialPts.length === 0) {
                return false;
            } else {
                currentPoint = potentialPts[0];
                donePoints.push(currentPoint);
                return true;
            }
        }
        ctx.beginPath();
        ctx.moveTo(currentPoint.x, currentPoint.y);
        while (GetNextPoint()) {
            ctx.lineTo(currentPoint.x, currentPoint.y);
        }
        ctx.closePath();
        ctx.fill();
        s.segments.forEach(seg =>
        {
            ctx.beginPath();
            ctx.moveTo(seg.pointA.x, seg.pointA.y);
            ctx.lineTo(seg.pointB.x, seg.pointB.y);
            ctx.stroke();
        });
    });
}


// #######################################################
//
// ########  ########   ########   ########  ########
//    ##     ##         ##            ##     ##
//    ##     #####      ########      ##     ########
//    ##     ##               ##      ##           ##
//    ##     ########   ########      ##     ########
//
// #######################################################

function TestShapeAngle()
{
    var TestSquare = (s: ConvexShape) =>
    {
        console.log("convex : " + s.IsConvex());
        console.log("2 angles 45 : " + (s.angles.filter(a => a.angle === Math.PI / 4).length === 2));
        console.log("1 angles 90 : " + (s.angles.filter(a => a.angle === Math.PI / 4).length === 2));
        console.log(s.angles.map(a => a.angle));
    }
    var s1 = new Triangle(
        new Segment(
            new Coord(0, 0),
            new Coord(0, 1)
        )
    );
    s1.TryAddSegment(
        new Segment(
            new Coord(0, 0),
            new Coord(1, 0)
        )
    );
    s1.TryAddSegment(
        new Segment(
            new Coord(0, 1),
            new Coord(1, 0)
        )
    );
    TestSquare(s1);
    s1 = new Triangle(
        new Segment(
            new Coord(0, 0),
            new Coord(0, 1)
        )
    );
    s1.TryAddSegment(
        new Segment(
            new Coord(0, 1),
            new Coord(1, 0)
        )
    );
    s1.TryAddSegment(
        new Segment(
            new Coord(0, 0),
            new Coord(1, 0)
        )
    );
    TestSquare(s1);
    s1 = new Triangle(
        new Segment(
            new Coord(0, 1),
            new Coord(1, 0)
        )
    );
    s1.TryAddSegment(
        new Segment(
            new Coord(0, 0),
            new Coord(0, 1)
        )
    );
    s1.TryAddSegment(
        new Segment(
            new Coord(0, 0),
            new Coord(1, 0)
        )
    );
    TestSquare(s1);

    s1 = new Triangle(
        new Segment(
            new Coord(0, 0),
            new Coord(300, 0)
        )
    );
    s1.TryAddSegment(
        new Segment(
            new Coord(0, 0),
            new Coord(250, 50)
        )
    );
    s1.TryAddSegment(
        new Segment(
            new Coord(250, 50),
            new Coord(300, 0)
        )
    );
    console.log("convex : " + s1.IsConvex());
    console.log("angles : " + s1.angles.map(a => a.point.toString() + ": " + a.angle).join(" ||| "));


    s1 = new Triangle(
        new Segment(
            new Coord(1, 1),
            new Coord(1, 2)
        )
    );
    s1.TryAddSegment(
        new Segment(
            new Coord(1, 1),
            new Coord(1.86603, 1.5)
        )
    );
    s1.TryAddSegment(
        new Segment(
            new Coord(1.86603, 1.5),
            new Coord(1, 2)
        )
    );
    console.log("convex : " + s1.IsConvex());
    console.log("angles : " + s1.angles.map(a => a.point.toString() + ": " + a.angle).join(" ||| "));
}

function TestIntersect()
{
    var Test = (name: string, segmentA: Segment, segmentB: Segment, expect: Coord) =>
    {
        var inter = segmentA.GetIntersectionWith(segmentB);
        var success = () =>
        {
            console.info(name, "OK");
        }
        if (inter === null && expect === null) {
            success();
        } else if (inter.x === expect.x && inter.y === expect.y) {
            success();
        } else {
            console.error(name, expect, inter);
        }
    }

    Test("basic.origin",
        new Segment(
            new Coord(0, 1),
            new Coord(2, -1)
        ),
        new Segment(
            new Coord(0, -1),
            new Coord(2, 1)
        ),
        new Coord(1, 0)
    );
    Test(
        "basic.dist",
        new Segment(
            new Coord(50, 51),
            new Coord(52, 49)
        ),
        new Segment(
            new Coord(50, 49),
            new Coord(52, 51)
        ),
        new Coord(51, 50)
    );
    Test(
        "vertical x horizontal",
        new Segment(
            new Coord(50, 51),
            new Coord(50, 49)
        ),
        new Segment(
            new Coord(50, 50),
            new Coord(52, 50)
        ),
        new Coord(50, 50)
    );
    Test(
        "horizontal x vertical",
        new Segment(
            new Coord(50, 50),
            new Coord(52, 50)
        ),
        new Segment(
            new Coord(50, 51),
            new Coord(50, 49)
        ),
        new Coord(50, 50)
    );
    Test(
        "vertical x horizontal: nointer",
        new Segment(
            new Coord(0, 0),
            new Coord(220, 50)
        ),
        new Segment(
            new Coord(160, 50),
            new Coord(160, 110)
        ),
        null
    );
    Test(
        "horizontal x vertical: nointer",
        new Segment(
            new Coord(160, 50),
            new Coord(160, 110)
        ),
        new Segment(
            new Coord(0, 0),
            new Coord(220, 50)
        ),
        null
    );
}
