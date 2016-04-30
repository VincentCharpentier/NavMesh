
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

        // new Obstacle(new Coord(165, 80), 129, 6),
        // new Obstacle(new Coord(183, 134), 50, 5),
        // new Obstacle(new Coord(183, 139), 117, 82),
        // new Obstacle(new Coord(300, 80), 33, 156)

        // new Obstacle(new Coord(183,134),50,5),
        // new Obstacle(new Coord(183,139),117,82)

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

        // new Obstacle(new Coord(72, 123), 121, 68),
        // new Obstacle(new Coord(155, 19), 124, 225)

        // new Obstacle(new Coord(75, 23), 112, 60),
        // new Obstacle(new Coord(66, 26), 16, 111)

        // new Obstacle(new Coord(50, 50), 100, 50),
        // new Obstacle(new Coord(100, 50), 100, 50),
        // new Obstacle(new Coord(222, 50), 50, 50),
        // new Obstacle(new Coord(222, 100), 50, 100)

        // -----------------------------------------------
        // new Obstacle(new Coord(114, 39), 113, 6),
        // new Obstacle(new Coord(157, 136), 146, 164),
        // new Obstacle(new Coord(55, 274), 23, 46),
        // new Obstacle(new Coord(70, 234), 28, 265),
        // new Obstacle(new Coord(219, 48), 178, 186),
        // new Obstacle(new Coord(55, 86), 9, 139),
        // new Obstacle(new Coord(133, 143), 249, 224),
        // new Obstacle(new Coord(212, 224), 8, 236),
        // new Obstacle(new Coord(127, 170), 212, 10),
        // new Obstacle(new Coord(279, 288), 16, 220),
        // new Obstacle(new Coord(161, 207), 280, 205),
        // new Obstacle(new Coord(98, 182), 2, 213),
        // new Obstacle(new Coord(281, 202), 280, 202),
        // new Obstacle(new Coord(294, 126), 92, 253),
        // new Obstacle(new Coord(182, 193), 272, 33),
        // new Obstacle(new Coord(204, 62), 92, 199),
        // new Obstacle(new Coord(137, 78), 228, 190),
        // new Obstacle(new Coord(145, 44), 64, 52),
        // new Obstacle(new Coord(30, 254), 259, 144),
        // new Obstacle(new Coord(178, 144), 26, 103),
        // new Obstacle(new Coord(195, 13), 60, 94),
        // new Obstacle(new Coord(257, 168), 222, 277),
        // new Obstacle(new Coord(178, 176), 41, 281),
        // new Obstacle(new Coord(79, 259), 8, 232),
        // new Obstacle(new Coord(85, 212), 201, 175),
        // new Obstacle(new Coord(23, 110), 210, 260),
        // new Obstacle(new Coord(200, 29), 250, 116),
        // new Obstacle(new Coord(257, 8), 16, 94),
        // new Obstacle(new Coord(91, 297), 259, 99),
        // new Obstacle(new Coord(268, 133), 75, 277)
        // -----------------------------------------------


        // new Obstacle(new Coord(5, 5), 20, 20),
        // new Obstacle(new Coord(15, 5), 20, 20),
        // new Obstacle(new Coord(55, 5), 20, 20),
        // new Obstacle(new Coord(45, 15), 20, 20),
        // new Obstacle(new Coord(105, 15), 20, 20),
        // new Obstacle(new Coord(95, 5), 20, 20),
        // new Obstacle(new Coord(155, 5), 20, 20),
        // new Obstacle(new Coord(155, 15), 20, 20),
        // new Obstacle(new Coord(205, 15), 20, 20),
        // new Obstacle(new Coord(205, 5), 20, 20),
        // new Obstacle(new Coord(250, 15), 40, 20),
        // new Obstacle(new Coord(260, 5), 20, 20),

        new Obstacle(new Coord(-84, -143), 276, 257),
        new Obstacle(new Coord(-93, 229), 43, 108),
        new Obstacle(new Coord(-215, 158), 85, 267),
        new Obstacle(new Coord(-227, 281), 286, 98),
        new Obstacle(new Coord(28, 258), 96, 222),
        new Obstacle(new Coord(-247, 69), 65, 202),
        new Obstacle(new Coord(96, 245), 96, 151),
        new Obstacle(new Coord(96, -221), 103, 92),
        new Obstacle(new Coord(269, -239), 144, 187),
        new Obstacle(new Coord(293, 166), 238, 4),
        new Obstacle(new Coord(-24, -106), 195, 231),
        new Obstacle(new Coord(-134, -228), 165, 118),
        new Obstacle(new Coord(52, 189), 161, 55),
        new Obstacle(new Coord(198, -256), 16, 49),
        new Obstacle(new Coord(-296, 239), 102, 73),
        new Obstacle(new Coord(-102, 66), 34, 171),
        new Obstacle(new Coord(8, -173), 65, 148),
        new Obstacle(new Coord(-122, 48), 260, 173),
        new Obstacle(new Coord(-252, -265), 132, 20),
        new Obstacle(new Coord(37, 70), 7, 161),
        new Obstacle(new Coord(47, -257), 265, 100),
        new Obstacle(new Coord(266, 133), 5, 46),
        new Obstacle(new Coord(-272, -119), 284, 218),
        new Obstacle(new Coord(68, -26), 161, 144),
        new Obstacle(new Coord(40, 200), 26, 15),
        new Obstacle(new Coord(173, -67), 75, 255),
        new Obstacle(new Coord(-239, -33), 26, 286),
        new Obstacle(new Coord(-282, 21), 80, 116),
        new Obstacle(new Coord(155, 207), 193, 139),
        new Obstacle(new Coord(-42, -278), 62, 146)
    );

    constructor(coord: Coord)
    {
        this.coord = coord;

        /* TODO remove */
        var randomObstacles = false;
        if (randomObstacles) {
            var nbObstacles = 30;
            while (nbObstacles-- > 0) {
                this.obstacles.push(
                    new Obstacle(
                        new Coord(
                            Math.round(Math.random() * Config.World.CHUNK_SIZE * 2) - Config.World.CHUNK_SIZE,
                            Math.round(Math.random() * Config.World.CHUNK_SIZE * 2) - Config.World.CHUNK_SIZE
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

        let IsInsideAnother = (obs: Obstacle): boolean =>
        {
            for (let i = 0; i < obstacles.length; i++) {
                if (obstacles[i].ContainsObstacle(obs)) {
                    return true;
                }
            }
            return false;
        }
        let TryAddObstacle = (obs: Obstacle) =>
        {
            // If this obstacle if outside the chunk, remove it
            // If any obstacle contains this obstacle, remove it
            if (obs.coord.x < Config.World.CHUNK_SIZE && obs.coord.y < Config.World.CHUNK_SIZE
                && !IsInsideAnother(obs)) {
                obstacles.push(obs);
            }
        }
        let TryAddObstacles = (newObstacles: Array<Obstacle>) =>
        {
            // add new if they don't fit in other obstacles
            for (let o of newObstacles) {
                TryAddObstacle(o);
            }
        }

        Monitor.Start("GetObs - fits into other");
        // Remove obstacles that fits into others
        let initialObsNumber = obstacles.length;
        for (let i = 0; i < initialObsNumber; i++) {
            let obs = obstacles.shift();
            TryAddObstacle(obs);
        }
        Monitor.Stop("GetObs - fits into other");

        Monitor.Start("GetObs - split overlapping");
        let Split = (obs: Obstacle, horizontally: boolean, at: number): Array<Obstacle> =>
        {
            let result: Array<Obstacle> = [];
            if (horizontally) {
                result.push(
                    new Obstacle(
                        obs.coord,
                        obs.width,
                        at - obs.coord.y
                    ),
                    new Obstacle(
                        new Coord(obs.coord.x, at),
                        obs.width,
                        obs.coord.y + obs.height - at
                    )
                );
            } else {
                result.push(
                    new Obstacle(
                        obs.coord,
                        at - obs.coord.x,
                        obs.height
                    ),
                    new Obstacle(
                        new Coord(at, obs.coord.y),
                        obs.coord.x + obs.width - at,
                        obs.height
                    )
                );
            }
            return result;
        }
        for (let i = 0; i < obstacles.length; i++) {
            let obs = obstacles[i];
            // if obs goes outside chunks split it
            if (obs.coord.x + obs.width > Config.World.CHUNK_SIZE) {
                // remove it
                obstacles.splice(i--, 1);
                // add new ones
                TryAddObstacles(Split(obs, false, Config.World.CHUNK_SIZE));
                continue;
            } else if (obs.coord.y + obs.height > Config.World.CHUNK_SIZE) {
                // remove it
                obstacles.splice(i--, 1);
                // add new ones
                TryAddObstacles(Split(obs, true, Config.World.CHUNK_SIZE));
                continue;
            }

            let segments = obs.GetSegments();
            let splitDone = false;
            for (let j = 0; j < obstacles.length; j++) {
                if (i === j) {
                    continue;
                }
                let other = obstacles[j];
                // special cases:
                // - same x and width and other upper edge is inside current obs
                // - same y and height and other left edge is inside current obs
                if (obs.coord.x === other.coord.x && obs.width === other.width
                    && other.coord.y > obs.coord.y && other.coord.y < obs.coord.y + obs.height) {
                    // horizontal split to do
                    // remove current obstacle
                    obstacles.splice(i--, 1);
                    // add new ones
                    TryAddObstacles(Split(obs, true, other.coord.y));
                    break;
                }
                else if (obs.coord.y === other.coord.y && obs.height === other.height
                    && other.coord.x > obs.coord.x && other.coord.x < obs.coord.x + obs.width) {
                    // vertical split to do
                    // remove current obstacle
                    obstacles.splice(i--, 1);
                    // add new ones
                    TryAddObstacles(Split(obs, false, other.coord.x));
                    break;
                } else {
                    let otherSegments = other.GetSegments();
                    for (let k = 0; k < segments.length; k++) {
                        let currentSeg = segments[k];
                        for (let l = 0; l < otherSegments.length; l++) {
                            let otherSeg = otherSegments[l];
                            let inter = currentSeg.GetIntersectionWith(otherSeg, false);
                            if (inter !== null && !inter.Equals(currentSeg.pointA) && !inter.Equals(currentSeg.pointA)) {
                                // remove current obstacle
                                obstacles.splice(i--, 1);
                                let newObstacles: Array<Obstacle> = [];
                                // SPLIT to do
                                // case: horizontal seg
                                if (currentSeg.dirCoef === 0) {
                                    // vertical split
                                    newObstacles = Split(obs, false, inter.x);
                                } else {
                                    // horizontal split
                                    newObstacles = Split(obs, true, inter.y);
                                }
                                TryAddObstacles(newObstacles);
                                splitDone = true;
                                break;
                            }
                        }
                        if (splitDone) {
                            break;
                        }
                    }
                }
                if (splitDone) {
                    break;
                }
            }
        }
        Monitor.Stop("GetObs - split overlapping");
        //
        // var loopIterationsTodo = obstacles.length;
        // while (loopIterationsTodo-- > 0) {
        //     let currentObstacle = obstacles.shift();
        //     // If any obstacle contains this obstacle, remove it
        //     if (obstacles.some(o => o.ContainsObstacle(currentObstacle))) {
        //         continue;
        //     }
        //     let splitDone = false;
        //     // Check for horizontal split :
        //     // if any horizontal segment of this obstacle intersect with
        //     // a segment of another obstacle, split it
        //     let hsegments =
        //         currentObstacle.GetSegments().filter(s => s.dirCoef === 0);
        //     // For each horizontal segments of current obstacle
        //     for (let j = 0; j < hsegments.length; j++) {
        //         let currentSegment = hsegments[j];
        //         // for each obstacles (not the current one)
        //         for (let k = 0; k < obstacles.length; k++) {
        //             let otherObstacle = obstacles[k];
        //             let otherSegments = otherObstacle.GetSegments();
        //             // for each segments of other obstacle
        //             for (let l = 0; l < otherSegments.length; l++) {
        //                 let otherSegment = otherSegments[l];
        //                 let intersection = otherSegment.GetIntersectionWith(currentSegment, false);
        //                 if (intersection !== null) {
        //                     // SPLIT vertically
        //                     let newObstacles = Obstacle.Split(currentObstacle, true, intersection.x);
        //                     obstacles.unshift(...newObstacles);
        //                     loopIterationsTodo += newObstacles.length;
        //                     splitDone = true;
        //                     break;
        //                 }
        //             }
        //             if (splitDone) {
        //                 break;
        //             }
        //             let midPoint = new Coord(
        //                 (currentSegment.pointA.x + currentSegment.pointB.x) / 2,
        //                 (currentSegment.pointA.y + currentSegment.pointB.y) / 2
        //             );
        //             // if other obstacle contains midpoint, SPLIT other horizontally
        //             if (otherObstacle.ContainsPoint(midPoint, false)) {
        //                 // remove other obstacle
        //                 obstacles.splice(k, 1);
        //                 // split it
        //                 let newObstacles = Obstacle.Split(otherObstacle, false, midPoint.y);
        //                 //  - current obstacle still todo
        //                 //  - new obstacles todo
        //                 obstacles.unshift(currentObstacle, ...newObstacles);
        //                 loopIterationsTodo += newObstacles.length + 1;
        //                 splitDone = true;
        //                 break;
        //             }
        //         }
        //         if (splitDone) {
        //             break;
        //         }
        //     }
        //     if (splitDone) {
        //         continue;
        //     }
        //     // Check for horizontal split :
        //     // if any vertical segment of this obstacle intersect with
        //     // a segment of another obstacle, split it
        //     let vsegments =
        //         currentObstacle.GetSegments().filter(s => s.dirCoef !== 0);
        //     // For each vertical segments of current obstacle
        //     for (let j = 0; j < vsegments.length; j++) {
        //         let currentSegment = vsegments[j];
        //         // for each obstacles (not the current one)
        //         for (let k = 0; k < obstacles.length; k++) {
        //             let otherObstacle = obstacles[k];
        //             let otherSegments = otherObstacle.GetSegments();
        //             // for each segments of other obstacle
        //             for (let l = 0; l < otherSegments.length; l++) {
        //                 let otherSegment = otherSegments[l];
        //                 let intersection = otherSegment.GetIntersectionWith(currentSegment, false);
        //                 if (intersection !== null) {
        //                     // SPLIT horizontally
        //                     let newObstacles = Obstacle.Split(currentObstacle, false, intersection.y);
        //                     obstacles.unshift(...newObstacles);
        //                     loopIterationsTodo += newObstacles.length;
        //                     splitDone = true;
        //                     break;
        //                 }
        //             }
        //             if (splitDone) {
        //                 break;
        //             }
        //             let midPoint = new Coord(
        //                 (currentSegment.pointA.x + currentSegment.pointB.x) / 2,
        //                 (currentSegment.pointA.y + currentSegment.pointB.y) / 2
        //             );
        //             // if other obstacle contains midpoint, SPLIT other vertically
        //             if (otherObstacle.ContainsPoint(midPoint, false)) {
        //                 // remove other obstacle
        //                 obstacles.splice(k, 1);
        //                 // split it
        //                 let newObstacles = Obstacle.Split(otherObstacle, true, midPoint.x);
        //                 //  - current obstacle still todo
        //                 //  - new obstacles todo
        //                 obstacles.unshift(currentObstacle, ...newObstacles);
        //                 loopIterationsTodo += newObstacles.length + 1;
        //                 splitDone = true;
        //                 break;
        //             }
        //         }
        //         if (splitDone) {
        //             break;
        //         }
        //     }
        //     if (splitDone) {
        //         continue;
        //     }
        //
        //     obstacles.push(currentObstacle);
        // }

        Monitor.Start("GetObs - contiguous obstacles");
        // merge contiguous obstacles
        for (let i = 0; i < obstacles.length - 1; i++) {
            let obs = obstacles[i];
            for (let j = i + 1; j < obstacles.length; j++) {
                let other = obstacles[j];
                // if any common segment
                let otherSegments = other.GetSegments();
                let doMerge = obs.GetSegments().some(seg => otherSegments.some(s => s.Equals(seg)));
                if (doMerge) {
                    let points = obs.GetKeyPoints().concat(other.GetKeyPoints());
                    let xCoords = points.map(p => p.x);
                    let yCoords = points.map(p => p.y);
                    let minX = Math.min.apply(null, xCoords);
                    let maxX = Math.max.apply(null, xCoords);
                    let minY = Math.min.apply(null, yCoords);
                    let maxY = Math.max.apply(null, yCoords);
                    // insert new
                    obstacles.push(new Obstacle(
                        new Coord(minX, minY),
                        maxX - minX,
                        maxY - minY
                    ));
                    // remove both
                    obstacles.splice(j, 1);
                    obstacles.splice(i--, 1);
                    break;
                }
            }
        }
        Monitor.Stop("GetObs - contiguous obstacles");

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

        var RemoveIfFitsInObs = function()
        {
            Monitor.Start("GetBS - fits into any obstacle");
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
            Monitor.Stop("GetBS - fits into any obstacle");
        }
        RemoveIfFitsInObs();

        Monitor.Start("GetBS - split overlapping");
        // split overlapping segments
        for (let i = 0; i < segments.length - 1; i++) {
            let seg = segments[i];
            let dirCoef = Math.abs(seg.dirCoef);
            for (let j = i + 1; j < segments.length; j++) {
                let other = segments[j];
                // if overlap
                if (dirCoef === Math.abs(other.dirCoef)) {
                    if ((dirCoef === 0 && seg.pointA.y === other.pointA.y) || (dirCoef === Infinity && seg.pointA.x === other.pointA.x)) {
                        if (seg.Contains(other.pointA, false) || seg.Contains(other.pointB, false)) {
                            // split
                            let points = [seg.pointA, seg.pointB, other.pointA, other.pointB].sort((a, b) =>
                            {
                                if (a.x !== b.x) {
                                    return a.x - b.x;
                                } else {
                                    return a.y - b.y;
                                }
                            });
                            // remove both
                            segments.splice(j, 1);
                            segments.splice(i--, 1);
                            // insert new segments
                            for (let k = 0; k < points.length - 1; k++) {
                                segments.push(
                                    new Segment(points[k], points[k + 1])
                                );
                            }
                            break;
                        }
                    }
                } else {
                    var inter = seg.GetIntersectionWith(other, false);
                    if (inter !== null) {
                        // split both segment
                        let pointsOther = [other.pointA, inter, other.pointB];
                        let pointsSeg = [seg.pointA, inter, seg.pointB];
                        // remove both
                        segments.splice(j, 1);
                        segments.splice(i--, 1);
                        // insert new segments
                        for (let k = 0; k < pointsOther.length - 1; k++) {
                            segments.push(
                                new Segment(pointsOther[k], pointsOther[k + 1])
                            );
                            segments.push(
                                new Segment(pointsSeg[k], pointsSeg[k + 1])
                            );
                        }
                        break;
                    }
                }
            }
        }
        Monitor.Stop("GetBS - split overlapping");

        // remove if fits in obs
        RemoveIfFitsInObs();

        Monitor.Start("GetBS - overlapping segments");
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


        Monitor.Stop("GetBS - overlapping segments");
        Monitor.Start("GetBS - in-between two obstacles");
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

        Monitor.Stop("GetBS - in-between two obstacles");
        Monitor.Start("GetBS - outside chunk");
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

        Monitor.Stop("GetBS - outside chunk");
        Monitor.Start("GetBS - contiguous segments");
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

        Monitor.Stop("GetBS - contiguous segments");
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
        Monitor.Start("GetNavMesh");

        Monitor.Start("GetNavMesh_getO");
        var obstacles = this.GetObstacles();
        Monitor.Stop("GetNavMesh_getO");

        var allSegments: Array<Segment> = obstacles.reduce((p, o) =>
        {
            return p.concat(o.GetSegments());
        }, []);
        Monitor.Start("GetNavMesh_getS");
        var blockingSegments = this.GetBlockingSegments(obstacles);
        Monitor.Stop("GetNavMesh_getS");
        Monitor.Start("GetNavMesh_getP");
        var points = this.GetNavPoints(blockingSegments);
        Monitor.Stop("GetNavMesh_getP");


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


        Monitor.Start("GetNavMesh_tri");
        var triangles: Array<Triangle> = new Array();
        var currentTriangle: Triangle = null;
        var breakAfter = 5;
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
        Monitor.Stop("GetNavMesh_tri");

        /* TODO remove (debug stuff)*/
        if (todoSegments.length > 0) {
            doFusion = false;
            console.error("Could not link ");
            console.log(todoSegments[0].segment.toString());
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

        Monitor.Start("GetNavMesh_fusion");
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
        Monitor.Stop("GetNavMesh_fusion");

        Monitor.Stop("GetNavMesh");
        return shapes;
    }
}


interface TodoSegment
{
    segment: Segment;
    clockwise: boolean;
    neightbor: number;
}
