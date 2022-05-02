sayMe :: (Integral a) => a -> String
sayMe 1 = "One"
sayMe 2 = "TWo"
sayMe 3 = "Three"
sayMe x = "Other Number"

factorial :: (Integral a) => a -> a
factorial 0 = 1
factorial n = n * factorial (n - 1)

addVectors :: (Num a) => (a,a) -> (a,a) -> (a,a)
addVectors a b = (fst a + fst b, snd a + snd b)


addVectors' :: (Num a) => (a,a) -> (a,a) -> (a,a)
addVectors' (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)