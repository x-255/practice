l1 = [1, 2, 3]

l2 = [4, 5]

l3 = l1 ++ l2

s1 = "hello"

s2 = "world"

s3 = s1 ++ " " ++ s2

l4 = 1 : 2 : [3, 4]

compare1 = [3, 2, 1] > [2, 1, 0]

compare2 = [3, 2, 1] > [3, 2]

compare3 = [3, 2, 1] > [3, 3, 0]

compare4 = [3, 2] > [3, 2, 1]

l5 = [1, 2, 3, 4, 5]

l6 = head l5

l7 = tail l5

l8 = init l5

l9 = last l5

isNull1 = null []

isNull2 = null [1, 2]

-- ---------------------------------- 德州区间 ---------------------------------- --
r1 = [1 .. 20]

r2 = ['a' .. 'z']

r3 = ['D' .. 'K']

r4 = [3, 6 .. 20]

r5 = take 24 [13, 26 ..]

r6 = take 10 (cycle [1, 2, 3])

r7 = take 11 (cycle "LoL ")

r8 = take 5 (repeat 0)

-- --------------------------- List Comprehension --------------------------- --
c1 = [x * 2 | x <- [1 .. 5]]

c2 = [x | x <- [50 .. 100], x `mod` 7 == 3]

boomBangs xs = [x | x <- xs, odd x]

length' xs = sum [1 | _ <- xs]

removeNonUppercase st = [c | c <- st, c `elem` ['A' .. 'Z']]

c3 = [x | x <- [10 .. 20], x /= 13, x /= 19]

c4 = [x * y | x <- [2, 5, 10], y <- [8, 10, 11], x * y > 50]