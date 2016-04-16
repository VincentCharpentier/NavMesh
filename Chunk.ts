
class Chunk
{
    public coord: Coord;
    public navMesh: Array<ConvexShape> = null;

    /* FIXME not working */
    public obstacles: Array<Obstacle> = new Array(
        // new Obstacle(
        //     new Coord(140, 170),
        //     80,
        //     10
        // )
        // ,
        // new Obstacle(
        //     new Coord(200, 80),
        //     100,
        //     100
        // )
        // ,
        // new Obstacle(
        //     new Coord(220, 60),
        //     20,
        //     100
        // )
        // ,
        // new Obstacle(
        //     new Coord(210, 90),
        //     10,
        //     10
        // ),
        // new Obstacle(
        //     new Coord(-10, -10),
        //     320,
        //     20
        // )
        // ,
        // new Obstacle(
        //     new Coord(-10, 290),
        //     320,
        //     20
        // )
        // ,
        // new Obstacle(
        //     new Coord(-10, 140),
        //     320,
        //     20
        // )
        // ,
        // new Obstacle(
        //     new Coord(-10, -10),
        //     20,
        //     320
        // )
        // ,
        // new Obstacle(
        //     new Coord(140, -10),
        //     20,
        //     320
        // )
        // ,
        // new Obstacle(
        //     new Coord(290, -10),
        //     20,
        //     320
        // )
        // ,
        // new Obstacle(
        //     new Coord(160, 50),
        //     60,
        //     60
        // )
        // ,
        // new Obstacle(
        //     new Coord(60, 60),
        //     100,
        //     20
        // )
        // ,
        // new Obstacle(
        //     new Coord(60, 100),
        //     20,
        //     100
        // )
        // ,
        // new Obstacle(
        //     new Coord(40, 160),
        //     100,
        //     60
        // )
        // ,
        // new Obstacle(
        //     new Coord(150, 150),
        //     20,
        //     50
        // )
        // ,
        // new Obstacle(
        //     new Coord(140, 170),
        //     80,
        //     10
        // )
        // ,
        // new Obstacle(
        //     new Coord(50, 40),
        //     60,
        //     100
        // )
        // ,
        // new Obstacle(
        //     new Coord(200, 80),
        //     100,
        //     100
        // )
        // ,
        // new Obstacle(
        //     new Coord(110, 210),
        //     100,
        //     70
        // )
        // ,
        // new Obstacle(
        //     new Coord(250, 180),
        //     40,
        //     100
        // )

        // new Obstacle(new Coord(53, 50), 87, 179),
        // new Obstacle(new Coord(108, 139), 225, 82),
        // new Obstacle(new Coord(111, 236), 252, 225),
        // new Obstacle(new Coord(150, 85), 115, 3),
        // new Obstacle(new Coord(156, 195), 75, 246),
        // new Obstacle(new Coord(165, 75), 224, 11),
        // new Obstacle(new Coord(183, 134), 50, 89),
        // new Obstacle(new Coord(217, 170), 12, 37),
        // new Obstacle(new Coord(294, 80), 289, 196),
        // new Obstacle(new Coord(300, 203), 113, 216)

        // new Obstacle(new Coord(269, 159), 288, 94),
        // new Obstacle(new Coord(240, 32), 16, 123),
        // new Obstacle(new Coord(75, 23), 112, 60),
        // new Obstacle(new Coord(278, 252), 125, 29),
        // new Obstacle(new Coord(172, 41), 24, 120),
        // new Obstacle(new Coord(66, 26), 16, 111),
        // new Obstacle(new Coord(129, 244), 80, 169),
        // new Obstacle(new Coord(214, 26), 145, 108),
        // new Obstacle(new Coord(147, 239), 134, 104),
        // new Obstacle(new Coord(65, 101), 278, 49)

    );

    constructor(coord: Coord)
    {
        this.coord = coord;

        /* TODO remove */
        var randomObstacles = true;
        if (randomObstacles) {
            var nbObstacles = 20;
            while (nbObstacles-- > 0) {
                this.obstacles.push(
                    new Obstacle(
                        new Coord(
                            Math.round(Math.random() * Config.World.CHUNK_SIZE),
                            Math.round(Math.random() * Config.World.CHUNK_SIZE)
                        ),
                        Math.round(Math.random() * Config.World.CHUNK_SIZE) + 1,
                        Math.round(Math.random() * Config.World.CHUNK_SIZE) + 1
                    )
                );
            }
        }
    }

    /* TODO: Fill with real data */
    public GetObstacles(): Array<Obstacle>
    {
        var obstacles: Array<Obstacle> = this.obstacles.concat([]);
        /* TODO: fill obstacles (local and surrounding chunks) */

        var loopIterationsTodo = obstacles.length;
        while (loopIterationsTodo-- > 0) {
            var currentObstacle = obstacles.shift();
            // If any obstacle contains this obstacle, remove it
            if (obstacles.some(o => o.ContainsObstacle(currentObstacle))) {
                // console.info("delete", currentObstacle.toString());
                continue;
            }
            var splitDone = false;
            // Check for horizontal split :
            // if any horizontal segment of this obstacle intersect with
            // a segment of another obstacle, split it
            var hsegments =
                currentObstacle.GetSegments().filter(s => s.dirCoef === 0);
            // For each horizontal segments of current obstacle
            for (var j = 0; j < hsegments.length; j++) {
                var currentSegment = hsegments[j];
                // for each obstacles (not the current one)
                for (var k = 0; k < obstacles.length; k++) {
                    var otherObstacle = obstacles[k];
                    var otherSegments = otherObstacle.GetSegments();
                    // for each segments of other obstacle
                    for (var l = 0; l < otherSegments.length; l++) {
                        var otherSegment = otherSegments[l];
                        var intersection = otherSegment.GetIntersectionWith(currentSegment, false);
                        if (intersection !== null) {
                            // SPLIT vertically
                            var newObstacles = Obstacle.Split(currentObstacle, true, intersection.x);
                            obstacles.unshift(...newObstacles);
                            loopIterationsTodo += newObstacles.length;
                            splitDone = true;
                            break;
                        }
                    }
                    if (splitDone) {
                        break;
                    }
                    var midPoint = new Coord(
                        (currentSegment.pointA.x + currentSegment.pointB.x) / 2,
                        (currentSegment.pointA.y + currentSegment.pointB.y) / 2
                    );
                    // if other obstacle contains midpoint, SPLIT other horizontally
                    if (otherObstacle.ContainsPoint(midPoint, false)) {
                        // remove other obstacle
                        obstacles.splice(k, 1);
                        // split it
                        var newObstacles = Obstacle.Split(otherObstacle, false, midPoint.y);
                        //  - current obstacle still todo
                        //  - new obstacles todo
                        obstacles.unshift(currentObstacle, ...newObstacles);
                        loopIterationsTodo += newObstacles.length + 1;
                        splitDone = true;
                        break;
                    }
                }
                if (splitDone) {
                    break;
                }
            }
            if (splitDone) {
                continue;
            }
            /* FIXME horizontal split not working */
            // Check for horizontal split :
            // if any vertical segment of this obstacle intersect with
            // a segment of another obstacle, split it
            var vsegments =
                currentObstacle.GetSegments().filter(s => s.dirCoef !== 0);
            // For each vertical segments of current obstacle
            for (var j = 0; j < vsegments.length; j++) {
                var currentSegment = vsegments[j];
                // for each obstacles (not the current one)
                for (var k = 0; k < obstacles.length; k++) {
                    var otherObstacle = obstacles[k];
                    var otherSegments = otherObstacle.GetSegments();
                    // for each segments of other obstacle
                    for (var l = 0; l < otherSegments.length; l++) {
                        var otherSegment = otherSegments[l];
                        var intersection = otherSegment.GetIntersectionWith(currentSegment, false);
                        if (intersection !== null) {
                            // SPLIT horizontally
                            var newObstacles = Obstacle.Split(currentObstacle, false, intersection.y);
                            obstacles.unshift(...newObstacles);
                            loopIterationsTodo += newObstacles.length;
                            splitDone = true;
                            break;
                        }
                    }
                    if (splitDone) {
                        break;
                    }
                    var midPoint = new Coord(
                        (currentSegment.pointA.x + currentSegment.pointB.x) / 2,
                        (currentSegment.pointA.y + currentSegment.pointB.y) / 2
                    );
                    // if other obstacle contains midpoint, SPLIT other vertically
                    if (otherObstacle.ContainsPoint(midPoint, false)) {
                        // remove other obstacle
                        obstacles.splice(k, 1);
                        // split it
                        var newObstacles = Obstacle.Split(otherObstacle, true, midPoint.x);
                        //  - current obstacle still todo
                        //  - new obstacles todo
                        obstacles.unshift(currentObstacle, ...newObstacles);
                        loopIterationsTodo += newObstacles.length + 1;
                        splitDone = true;
                        break;
                    }
                }
                if (splitDone) {
                    break;
                }
            }
            if (splitDone) {
                continue;
            }

            obstacles.push(currentObstacle);
        }

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
                    var s = segments[i].GetSortedSegment();
                    var notMe = segments
                        .filter(e => !e.Equals(s))
                    for (var j = 0; j < notMe.length; j++) {
                        var otherSeg = notMe[j].GetSortedSegment();
                        // parallels overlapping
                        if (s.GetEquation().Equals(otherSeg.GetEquation()) &&
                            (s.Contains(otherSeg.pointA, false) || otherSeg.Contains(s.pointA, false))) {
                            var segsPoints = [
                                s.pointA,
                                s.pointB,
                                otherSeg.pointA,
                                otherSeg.pointB
                            ].sort((a, b) =>
                            {
                                if (a.x !== b.x) {
                                    return a.x - b.x;
                                } else {
                                    return a.y - b.y;
                                }
                            });
                            segments = segments.filter(seg => !seg.Equals(otherSeg) && !seg.Equals(s));
                            // console.warn(s.toString(), otherSeg.toString());
                            // console.info(segsPoints.concat([]));
                            var pt = segsPoints.shift();
                            var otherPt: Coord;
                            while (otherPt = segsPoints.shift()) {
                                var newSeg = new Segment(pt, otherPt).GetSortedSegment();
                                // console.info("INSERT : " + newSeg.toString());
                                segments.push(newSeg);
                                pt = otherPt;
                                // break;
                            }
                            obstaclesDone = false;
                        } else {
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
                    // console.error("DELETE : " + seg.toString());
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
                            // console.error("DELETE : " + seg.toString());
                            // console.error("DELETE : " + s.toString());
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

        // Remove segments outside chunk
        for (var i = 0; i < segments.length; i++) {
            var seg = segments[i];
            var isOut =
                (seg.pointA.x <= 0 && seg.pointB.x <= 0 && (seg.pointA.x !== seg.pointB.x || seg.pointA.x < 0))
                || (seg.pointA.y <= 0 && seg.pointB.y <= 0 && (seg.pointA.y !== seg.pointB.y || seg.pointA.y < 0))
                || (seg.pointA.x >= Config.World.CHUNK_SIZE && seg.pointB.x >= Config.World.CHUNK_SIZE
                    && (seg.pointA.x !== seg.pointB.x || seg.pointA.x > Config.World.CHUNK_SIZE))
                || (seg.pointA.y >= Config.World.CHUNK_SIZE && seg.pointB.y >= Config.World.CHUNK_SIZE
                    && (seg.pointA.y !== seg.pointB.y || seg.pointA.y > Config.World.CHUNK_SIZE));
            if (isOut) {
                segments.splice(i--, 1);
            }
        }

        // merge contiguous segments
        for (var i = 0; i < segments.length - 1; i++) {
            var currentSegment = segments[i];
            var dirCoef = Math.abs(currentSegment.dirCoef);
            for (var j = i + 1; j < segments.length; j++) {
                var otherSegment = segments[j];
                // parallels
                if (Math.abs(otherSegment.dirCoef) === dirCoef) {
                    // horizontal && on same line
                    if ((dirCoef === 0 && currentSegment.pointA.y === otherSegment.pointA.y)
                        || (dirCoef === Infinity && currentSegment.pointA.x === otherSegment.pointA.x)) {
                        // looking for common points
                        var newSegCoords: Array<Coord> = new Array();
                        if (currentSegment.pointA.Equals(otherSegment.pointA)) {
                            newSegCoords.push(
                                currentSegment.pointB,
                                otherSegment.pointB
                            );
                        } else if (currentSegment.pointA.Equals(otherSegment.pointB)) {
                            newSegCoords.push(
                                currentSegment.pointB,
                                otherSegment.pointA
                            );
                        } else if (currentSegment.pointB.Equals(otherSegment.pointA)) {
                            newSegCoords.push(
                                currentSegment.pointA,
                                otherSegment.pointB
                            );
                        } else if (currentSegment.pointB.Equals(otherSegment.pointB)) {
                            newSegCoords.push(
                                currentSegment.pointA,
                                otherSegment.pointA
                            );
                        } else {
                            // no common point
                            continue;
                        }
                        // Add merge result
                        segments.push(
                            new Segment(
                                newSegCoords[0],
                                newSegCoords[1]
                            )
                        );
                        // remove both segments
                        segments.splice(j, 1);
                        segments.splice(i--, 1);
                        break;
                    }
                }
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
        var allSegments: Array<Segment> = obstacles.reduce((p, o) =>
        {
            return p.concat(o.GetSegments());
        }, []);
        var blockingSegments = this.GetBlockingSegments(obstacles);
        var points = this.GetNavPoints(blockingSegments);

        var chunkAsObstacle = new Obstacle(this.coord, Config.World.CHUNK_SIZE, Config.World.CHUNK_SIZE);
        var todoSegments: Array<TodoSegment> = new Array();
        todoSegments = blockingSegments
            .filter(s => chunkAsObstacle.ContainsPoint(s.pointA, true) && chunkAsObstacle.ContainsPoint(s.pointB, true))
            .map(s =>
            {
                return {
                    segment: s,
                    clockwise: true,
                    neightbor: null
                }
            });


        var triangles: Array<Triangle> = new Array();
        var currentTriangle: Triangle = null;
        var breakAfter = 500;
        var cpt = 0;
        var clockwise: boolean;

        window['genStat'] = {
            inter: 0,
            obs: 0,
            midpoint: 0,
            exists: 0
        }
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
            var sortedPoints: Array<Coord> =
                points.filter(p =>
                {
                    // chosen point should not be equal to ptA or ptB
                    if (!p.Equals(currentSegment.pointA) && !p.Equals(currentSegment.pointB)) {
                        // reduce to visible points
                        var segA = new Segment(currentSegment.pointA, p);
                        var segB = new Segment(currentSegment.pointB, p);
                        var midA = new Coord((segA.pointA.x + segA.pointB.x) / 2, (segA.pointA.y + segA.pointB.y) / 2);
                        var midB = new Coord((segB.pointA.x + segB.pointB.x) / 2, (segB.pointA.y + segB.pointB.y) / 2);
                        if (obstacles.some(o => o.ContainsPoint(midA) || o.ContainsPoint(midB))) {
                            return false;
                            // window['genStat']['obs']++;
                            // continue;
                        }
                        return !allSegments.some(bckSeg =>
                        {
                            return bckSeg.GetIntersectionWith(segA, false) !== null
                                || bckSeg.GetIntersectionWith(segB, false) !== null;
                        });
                    }
                    return false;
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
            // console.log(currentSegment.toString(), sortedPoints.concat([]));

            var done = false;
            while (!done && sortedPoints.length > 0) {
                var point = sortedPoints.shift();
                var segA = new Segment(currentSegment.pointA, point);
                var segB = new Segment(point, currentSegment.pointB);
                if (blockingSegments.some(b =>
                {
                    var interA = b.GetIntersectionWith(segA, true);
                    var interB = b.GetIntersectionWith(segB, true);
                    return (interA !== null && !interA.Equals(segA.pointA) && !interA.Equals(segA.pointB) && !interA.Equals(point))
                        || (interB !== null && !interB.Equals(segB.pointA) && !interB.Equals(segB.pointB) && !interB.Equals(point))
                })) {
                    window['genStat']['inter']++;
                    continue;
                }
                /* TODO a fusionner avec la condition du dessus
                    => Si midpoint dans un obstacle, on recale le point
                    (but: empecher les todos de partir à l'interieur)
                */
                else {
                    var copy = currentTriangle.Copy();
                    copy.TryAddSegment(segA);
                    copy.TryAddSegment(segB);
                    if (triangles.some(t => t.Equals(copy))) {
                        window['genStat']['exists']++;
                        // if (log) console.warn("exists", point.toString())
                        continue;
                    } else {
                        // if (log) console.warn("ELECTED", point.toString())
                        // console.info(currentSegment.toString(), "=>", point.toString());
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
        }


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

        doFusion = true;
        if (doFusion) {
            console.info("Before fusion : " + shapes.length, triangles.concat([]));

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

            console.info("After fusion : " + shapes.length, shapes.concat([]));
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
