
class Chunk
{
    public coord: Coord;
    public navMesh: Array<ConvexShape> = null;

    constructor(coord: Coord)
    {
        this.coord = coord;
    }

    /* TODO: Fill with real data */
    public GetObstacles(): Array<Obstacle>
    {
        var obstacles: Array<Obstacle> = new Array();
        /* TODO: fill obstacles (local and surrounding chunks) */
        obstacles.push(
            new Obstacle(
                new Coord(160, 50),
                60,
                60
            )
            ,
            new Obstacle(
                new Coord(60, 60),
                100,
                20
            )
            ,
            new Obstacle(
                new Coord(60, 100),
                20,
                100
            )
            ,
            new Obstacle(
                new Coord(40, 160),
                100,
                60
            )
            ,
            new Obstacle(
                new Coord(150, 150),
                20,
                50
            )
            ,
            new Obstacle(
                new Coord(140, 170),
                80,
                10
            )
            ,
            new Obstacle(
                new Coord(50, 40),
                60,
                100
            )
            ,
            new Obstacle(
                new Coord(200, 80),
                100,
                100
            )
            ,
            new Obstacle(
                new Coord(110, 210),
                100,
                70
            )
            ,
            new Obstacle(
                new Coord(250, 180),
                40,
                100
            )
        );

        // normalize to fit inside chunk

        /*
        obstacles.forEach(o =>
        {
            var coord = o.GetCoord();
            if (coord.x < this.coord.x) {
                o.SetWidth(o.GetWidth() + (coord.x - this.coord.x));
                o.SetCoord(new Coord(this.coord.x, coord.y));
            }
            if (coord.y < this.coord.y) {
                o.SetHeight(o.GetHeight() + (coord.y - this.coord.y));
                o.SetCoord(new Coord(coord.x, this.coord.y));
            }
            coord = o.GetCoord();
            var diffX = (this.coord.x + Config.World.CHUNK_SIZE) - (coord.x + o.GetWidth());
            if (diffX < 0) {
                o.SetWidth(o.GetWidth() + diffX);
            }
            var diffY = (this.coord.y + Config.World.CHUNK_SIZE) - (coord.y + o.GetHeight());
            if (diffY < 0) {
                o.SetHeight(o.GetHeight() + diffY);
            }
        });
        */

        return obstacles;
    }

    public GetBlockingSegments(obstacles: Array<Obstacle>): Array<Segment>
    {
        var chunkAsObstacle = new Obstacle(this.coord, Config.World.CHUNK_SIZE, Config.World.CHUNK_SIZE);
        var segments = chunkAsObstacle.GetSegments();
        obstacles.forEach(o =>
        {
            segments = segments.concat(o.GetSegments());
        });
        // split overlapping segments
        while (true) {
            var obstaclesDone = false;
            while (!obstaclesDone) {
                obstaclesDone = true;
                for (var i = 0; i < segments.length; i++) {
                    var s = segments[i];
                    var notMe = segments
                        .filter(e => !e.Equals(s))
                    for (var j = 0; j < notMe.length; j++) {
                        var otherSeg = notMe[j];
                        var inter = otherSeg.GetIntersectionWith(s, false);
                        if (inter !== null && !inter.Equals(s.pointA) && !inter.Equals(s.pointB)) {
                            obstaclesDone = false;
                            // Remove & split segment
                            segments = segments.filter(seg => !seg.Equals(otherSeg) && !seg.Equals(s));
                            segments.push(
                                new Segment(otherSeg.pointA, inter).GetSortedSegment(),
                                new Segment(inter, otherSeg.pointB).GetSortedSegment(),
                                new Segment(s.pointA, inter).GetSortedSegment(),
                                new Segment(inter, s.pointB).GetSortedSegment()
                            );
                            break;
                        }
                    }
                    if (!obstaclesDone) {
                        break;
                    }
                }
            }
            if (obstaclesDone) {
                break;
            }
        }

        // remove segments thats fits into any obstacle
        obstacles.forEach(o =>
        {
            for (var i = 0; i < segments.length; i++) {
                var seg = segments[i].GetSortedSegment();
                var midPoint = new Coord(
                    (seg.pointA.x + seg.pointB.x) / 2,
                    (seg.pointA.y + seg.pointB.y) / 2
                );
                // MidPoint strictly inside & points A and B inside or border
                if (
                    midPoint.x > o.coord.x && midPoint.x < o.coord.x + o.width
                    && midPoint.y > o.coord.y && midPoint.y < o.coord.y + o.height
                    && seg.pointA.x >= o.coord.x && seg.pointA.x <= o.coord.x + o.width
                    && seg.pointA.y >= o.coord.y && seg.pointA.y <= o.coord.y + o.height
                    && seg.pointB.x >= o.coord.x && seg.pointB.x <= o.coord.x + o.width
                    && seg.pointB.y >= o.coord.y && seg.pointB.y <= o.coord.y + o.height) {
                    // remove segment
                    segments = segments.filter(s => !s.Equals(seg));
                    i--;
                }
            }
        });

        // remove overlapping segments
        while (true) {
            var segDone = false;
            while (!segDone) {
                segDone = true;
                for (var i = 0; i < segments.length; i++) {
                    var seg = segments[i];
                    var others = segments.slice(0, i).concat(segments.slice(i + 1));
                    for (var j = 0; j < others.length; j++) {
                        var otherSeg = others[j];
                        if (seg.dirCoef === otherSeg.dirCoef
                            // A inside other Seg
                            && seg.pointA.x >= otherSeg.pointA.x && seg.pointA.x <= otherSeg.pointB.x
                            && seg.pointA.y >= otherSeg.pointA.y && seg.pointA.y <= otherSeg.pointB.y
                            // B inside other Seg
                            && seg.pointB.x >= otherSeg.pointA.x && seg.pointB.x <= otherSeg.pointB.x
                            && seg.pointB.y >= otherSeg.pointA.y && seg.pointB.y <= otherSeg.pointB.y) {
                            var todopoints = [seg.pointA, seg.pointB, otherSeg.pointA, otherSeg.pointB];
                            // remove both
                            segments = segments.filter(s => !s.Equals(seg) && !s.Equals(otherSeg));
                            // add new segments
                            todopoints.sort((a, b) =>
                            {
                                var res = a.x - b.x;
                                if (res === 0) {
                                    return a.y - b.y;
                                }
                                return res;
                            });
                            var lastPoint: Coord = null;
                            while (todopoints.length > 0) {
                                var point = todopoints.shift();
                                if (lastPoint !== null && !lastPoint.Equals(point)) {
                                    segments.push(new Segment(
                                        lastPoint, point
                                    ).GetSortedSegment());
                                }
                                lastPoint = point;
                            }
                            segDone = false;
                            break;
                        }
                    }
                    if (!segDone) {
                        break;
                    }
                }
            }
            if (segDone) {
                break;
            }
        }


        // Remove segments in-between two obstacles
        for (var i = 0; i < segments.length; i++) {
            var should_delete = false;
            var seg = segments[i].GetSortedSegment();
            var midPoint = new Coord(
                (seg.pointA.x + seg.pointB.x) / 2,
                (seg.pointA.y + seg.pointB.y) / 2
            );
            var obstacleCpt = 0;
            for (var k = 0; k < obstacles.length; k++) {
                var obsSegments = obstacles[k].GetSegments();
                for (var j = 0; j < obsSegments.length; j++) {
                    var obsSeg = obsSegments[j];
                    if (obsSeg.Contains(seg.pointA) && obsSeg.Contains(seg.pointB)) {
                        obstacleCpt++;
                        break;
                    }
                }
                if (obstacleCpt > 1) {
                    should_delete = true;
                    break;
                }
            }
            // check on chunk bounds
            if (obstacleCpt === 1) {
                var obsSegments = chunkAsObstacle.GetSegments();
                for (var j = 0; j < obsSegments.length; j++) {
                    var obsSeg = obsSegments[j];
                    if (obsSeg.Contains(seg.pointA) && obsSeg.Contains(seg.pointB)) {
                        should_delete = true;
                        break;
                    }
                }
            }

            if (should_delete) {
                segments.splice(i--, 1);
            }
        }

        return segments;
    }

    private GetNavPoints(segments: Array<Segment>): Array<Coord>
    {
        var chunkAsObstacle = new Obstacle(this.coord, Config.World.CHUNK_SIZE, Config.World.CHUNK_SIZE);
        var pts = {};
        chunkAsObstacle.GetKeyPoints().forEach(p =>
        {
            pts[p.GetUniqueString()] = p;
        });
        segments.forEach(s =>
        {
            pts[s.pointA.GetUniqueString()] = s.pointA;
            pts[s.pointB.GetUniqueString()] = s.pointB;
        });
        var points = new Array();
        for (var i in pts) {
            points.push(pts[i]);
        }
        return points;
    }


    public GetNavMesh(doFusion: boolean = true): Array<ConvexShape>
    {
        var t = performance.now();
        var obstacles = this.GetObstacles();
        var blockingSegments = this.GetBlockingSegments(obstacles);
        var points = this.GetNavPoints(blockingSegments);

        // console.info("PTS COUNT : " + points.concat([]).length);
        // points = points.filter(p => !obstacles.some(o => o.Contains(p)));
        // console.info("PTS COUNT : " + points.concat([]).length);
        // for (var i = 0; i < points.length - 1; i++) {
        //     for (var j = i + 1; j < points.length; j++) {
        //         if (points[i].Equals(points[j])) {
        //             /*TODO remove point*/
        //             points.splice(j--, 1);
        //         }
        //     }
        // }
        // console.info("PTS COUNT : " + points.concat([]).length);

        /* TODO
        - Start in any config
        - mid-edge points (!fusion & segments)
        */
        var chunkAsObstacle = new Obstacle(this.coord, Config.World.CHUNK_SIZE, Config.World.CHUNK_SIZE);
        var todoSegments: Array<TodoSegment> = new Array();
        todoSegments = blockingSegments.map(s =>
        {
            return {
                segment: s,
                clockwise: true,
                neightbor: null
            }
        });

        // todoSegments.push({
        //     segment: new Segment(
        //         this.coord,
        //         new Coord(
        //             this.coord.x + Config.World.CHUNK_SIZE,
        //             this.coord.y
        //         )
        //     ),
        //     clockwise: true,
        //     neightbor: null
        // });

        console.log(todoSegments.concat([]));

        var triangles: Array<Triangle> = new Array();
        var currentTriangle: Triangle = null;
        var breakAfter = 500;
        var cpt = 0;
        var clockwise: boolean;
        while (todoSegments.length > 0 && cpt++ < breakAfter) {
            if (currentTriangle === null) {
                var todo = todoSegments.shift();
                clockwise = todo.clockwise;
                currentTriangle = new Triangle(todo.segment);
                if (todo.neightbor !== null) {
                    currentTriangle.neightbors.push(todo.neightbor);
                    for (var k = 0; k < triangles.length; k++) {
                        if (triangles[k].id === todo.neightbor) {
                            if (triangles[k].neightbors.indexOf(currentTriangle.id) === -1) {
                                triangles[k].neightbors.push(currentTriangle.id);
                            }
                            break;
                        }
                    }
                }
            }
            var currentSegment = currentTriangle.segments[0];
            var refPoint = clockwise ? currentSegment.pointA : currentSegment.pointB;
            var currentAngle =
                clockwise ? currentSegment.pointB.toPolar(refPoint).angle : currentSegment.pointA.toPolar(refPoint).angle;
            // POINTS SORTED BY ANGLE

            var sortedPoints =
                points.filter(p =>
                {
                    return !p.Equals(currentSegment.pointA) && !p.Equals(currentSegment.pointB);
                }).sort((a, b) =>
                {
                    var angleA = a.toPolar(refPoint).angle;
                    angleA -= currentAngle;
                    if (angleA < 0) {
                        angleA += Math.PI * 2;
                    }
                    var angleB = b.toPolar(refPoint).angle;
                    angleB -= currentAngle;
                    if (angleB < 0) {
                        angleB += Math.PI * 2;
                    }
                    if (clockwise) {
                        return angleA - angleB;
                    } else {
                        return angleB - angleA;
                    }
                });


            var done = false;
            while (!done && sortedPoints.length > 0) {
                // var expectSeg = new Segment(new Coord(110, 140), new Coord(160, 110));
                var expectSeg = new Segment(new Coord(140, 160), new Coord(160, 110));
                if (expectSeg.Equals(currentSegment)) {
                    console.warn("YEAH");
                }
                var point = sortedPoints.shift();
                var segA = new Segment(currentSegment.pointA, point);
                var segB = new Segment(point, currentSegment.pointB);
                var midA = new Coord((segA.pointA.x + segA.pointB.x) / 2, (segA.pointA.y + segA.pointB.y) / 2);
                var midB = new Coord((segB.pointA.x + segB.pointB.x) / 2, (segB.pointA.y + segB.pointB.y) / 2);
                // console.info(segB.pointA.toString(), midB.toString(), segB.pointB.toString());
                if (blockingSegments.some(b =>
                {
                    var interA = b.GetIntersectionWith(segA, true);
                    var interB = b.GetIntersectionWith(segB, true);
                    return (interA !== null && !interA.Equals(segA.pointA) && !interA.Equals(segA.pointB) && !interA.Equals(point))
                        || (interB !== null && !interB.Equals(segB.pointA) && !interB.Equals(segB.pointB) && !interB.Equals(point))
                })) {
                    continue;
                }
                /* TODO + FIXME a fusionner avec la condition du dessus
                    => Si midpoint dans un obstacle, on recale le point
                    (but: empecher les todos de partir à l'interieur)
                */
                else if (obstacles.some(o => o.Contains(midA) || o.Contains(midB))) {
                    // console.log(currentSegment.toString(), point);
                    // var expectSeg = new Segment(new Coord(110, 140), new Coord(160, 110));
                    // var expectSeg = new Segment(new Coord(140, 160), new Coord(160, 110));
                    var expectSeg = new Segment(new Coord(0, 300), new Coord(40, 220));
                    if (expectSeg.Equals(currentSegment)) {
                        console.log("");
                        console.info("BLOCKED BY ");
                        if (obstacles.some(o => o.Contains(midA))) {
                            console.log(midA.toString(), " FITS IN ", obstacles.filter(o => o.Contains(midA)).map(o => o.toString()));
                        }
                        if (obstacles.some(o => o.Contains(midB))) {
                            console.log(midB.toString(), " FITS IN ", obstacles.filter(o => o.Contains(midB)).map(o => o.toString()));
                        }
                    }
                    continue;
                }
                else if (triangles.some(t => t.Contains(midA) || t.Contains(midB))) {
                    console.info("skipped");
                    continue;
                }
                else {
                    done = true;
                    var EvalSegment = (seg: Segment) =>
                    {
                        var todo: TodoSegment = null;
                        for (var i = 0; i < todoSegments.length; i++) {
                            if (seg.Equals(todoSegments[i].segment)) {
                                todo = todoSegments[i];
                                break;
                            }
                        }
                        var alreadyTodo = todo !== null;
                        // si le segment est un bloquant
                        if (blockingSegments.some(b => b.Equals(seg))) {
                            if (alreadyTodo) {
                                var neightbor = todo.neightbor;
                                if (neightbor !== null) {
                                    // on ajoute les relations de voisinage
                                    if (currentTriangle.neightbors.indexOf(neightbor) === -1) {
                                        currentTriangle.neightbors.push(neightbor);
                                    }
                                    for (var k = 0; k < triangles.length; k++) {
                                        if (triangles[k].id === neightbor) {
                                            if (triangles[k].neightbors.indexOf(currentTriangle.id) === -1) {
                                                triangles[k].neightbors.push(currentTriangle.id);
                                            }
                                            break;
                                        }
                                    }
                                }

                                // si le segment etait à traiter on l'enleve
                                todoSegments = todoSegments.filter(b =>
                                {
                                    return !b.segment.Equals(seg);
                                });
                            }
                        } else {
                            // le segment devient bloquant
                            blockingSegments.push(seg);
                            // si le segment n'était pas à traiter, il devient à traiter
                            if (!alreadyTodo) {
                                todoSegments.unshift({
                                    segment: seg,
                                    clockwise: !clockwise,
                                    neightbor: currentTriangle.id
                                });
                            }
                        }
                    };
                    EvalSegment(segA);
                    EvalSegment(segB);
                    currentTriangle.TryAddSegment(segA);
                    currentTriangle.TryAddSegment(segB);
                    triangles.push(currentTriangle);
                    currentTriangle = null;
                }
            }
        }

        console.info(cpt);
        console.log(todoSegments.concat([]));

        var shapes: Array<ConvexShape> = new Array();
        var trash = new Segment(new Coord(0, 0), new Coord(0, 1));
        triangles.forEach(t =>
        {
            var shape = new ConvexShape(trash);
            shape.segments = t.segments;
            shape.angles = t.angles;
            shape.neightbors = t.neightbors;
            shape.id = t.id;
            shapes.push(shape);
        });


        if (doFusion) {
            console.info("Before fusion : " + shapes.length);

            // Fusion shapes
            while (true) {
                var fusionDone = true;
                while (fusionDone) {
                    fusionDone = false;
                    for (var i = 0; i < shapes.length; i++) {
                        var currentShape = shapes[i];

                        for (var j = 0; j < currentShape.neightbors.length; j++) {
                            // console.debug(currentShape.id + "", currentShape.neightbors[j]);


                            var otherShape: ConvexShape = null;
                            var indexOtherShape = -1;

                            // find shape with id {currentShape.neightbors[j]}
                            for (var k = 0; k < shapes.length; k++) {
                                if (shapes[k].id === currentShape.neightbors[j]) {
                                    otherShape = shapes[k];
                                    indexOtherShape = k;
                                    break;
                                }
                            }


                            if (otherShape === null) {
                                // break;
                                throw "(" + currentShape.id + ")ERROR id not found : " + currentShape.neightbors[j];
                            }
                            fusionDone = currentShape.TryFusion(otherShape);
                            if (fusionDone) {
                                // console.info("fusion done !", otherShape.id + ">" + currentShape.id);
                                // remove this neightbor
                                // console.info(currentShape.neightbors.concat([]));
                                currentShape.neightbors.splice(j, 1);
                                // console.info(currentShape.neightbors.concat([]));
                                // add his neightbors
                                var added: number[] = [];
                                otherShape.neightbors.forEach(n =>
                                {
                                    if (n !== currentShape.id && currentShape.neightbors.indexOf(n) === -1) {
                                        added.push(n);
                                        currentShape.neightbors.push(n);
                                    }
                                });

                                // console.info(currentShape.neightbors.concat([]));
                                // update others
                                // console.error(currentShape.id, otherShape.id);
                                shapes.forEach(shp =>
                                {
                                    if (added.indexOf(shp.id) !== -1) {
                                        // console.warn(shp.neightbors.concat([]));
                                        // remove old
                                        shp.neightbors.splice(shp.neightbors.indexOf(otherShape.id), 1);
                                        // console.warn(shp.neightbors.concat([]));
                                        // add new
                                        shp.neightbors.push(currentShape.id);
                                        // console.info(shp.neightbors.concat([]));
                                    }
                                });

                                // update neightbor for others
                                shapes.forEach(shp =>
                                {
                                    var idx = shp.neightbors.indexOf(otherShape.id);
                                    if (idx !== -1) {
                                        shp.neightbors.splice(idx, 1);
                                        shp.neightbors.push(currentShape.id);
                                    }
                                });
                                // REMOVE SHAPE
                                shapes = shapes.slice(0, indexOtherShape)
                                    .concat(shapes.slice(indexOtherShape + 1));
                                break;
                            }
                        }
                        if (fusionDone) {
                            break;
                        }
                    }
                }
                if (!fusionDone) {
                    break;
                }
            }

            console.info("After fusion : " + shapes.length);
        }

        console.info("NavMesh Done : " + (performance.now() - t).toFixed(2) + "ms");

        return shapes;
    }
}


interface TodoSegment
{
    segment: Segment;
    clockwise: boolean;
    neightbor: number;
}
