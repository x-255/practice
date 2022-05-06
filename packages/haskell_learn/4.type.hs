removeNonUppercase :: String -> String
removeNonUppercase st = [c | c <- st, c `elem` ['A' .. 'Z']]

addThree :: Int -> Int -> Int -> Int
addThree x y z = x + y + z

ord1 = compare "Abrakadabra" "Zebra"
ord2 = 5 `compare` 4
ord3 = compare 6 6

s1 = show 3
s2 = show 4.532
s3 = show False

r1 = read "True" :: Bool
r2 = read "4" + 8
r3 = read "[1,2,3]" ++ [4]
r4 = read "(3, 'd')" :: (Int, Char)

e1 = [LT .. GT]
e2 = succ EQ
e3 = pred EQ


b1 = minBound :: Int
b2 = maxBound :: (Bool, Int, Char)

l1 = fromIntegral (length [1,2,3]) + 3.2