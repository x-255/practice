l1 = [(1, 2), (3, 4), (5, 6)]

t1 = ("LoL", False)

l2 :: [(Integer, [Char])]
l2 = zip [1, 2 ..] ["one", "two", "three", "four", "five"]

sideLengthRange = [1 .. 10]

triangles = [(a, b, c) | a <- sideLengthRange, b <- sideLengthRange, c <- sideLengthRange]

rightTriangles :: [(Integer, Integer, Integer)]
rightTriangles = [(a, b, c) | (a, b, c) <- triangles, a ^ 2 + b ^ 2 == c ^ 2]