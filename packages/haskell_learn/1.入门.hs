doubleMe x = x + x

doubleUs x y = x * 2 + y * 2

doubleSmallNumber x = if x < 100
    then x * 2
    else x

removeNonUppercase s = [c | c <- s, c `elem` ['A'..'Z']]


head' :: [a] -> a
head' [] = error "Can't call head on an empty list, dummy!"
head' [x, _] = x

tell :: (Show a) => [a] -> String   
tell [] = "The list is empty"   
tell [x] = "The list has one element: " ++ show x   
tell [x,y] = "The list has two elements: " ++ show x ++ " and " ++ show y   
tell [x,y,_] = "This list is long. The first two elements are: " ++ show x ++ " and " ++ show y 

(
    let a = 100; b = 200; c = 300 in a*b*c, 
    let foo="Hey "; bar = "there!" in foo ++ bar
)