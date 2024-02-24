--
-- @lc app=leetcode.cn id=1407 lang=mysql
--
-- [1407] 排名靠前的旅行者
--
-- @lc code=start
# Write your MySQL query statement below
select
  u.name,
  ifnull(r.travelled_distance, 0) travelled_distance
from
  Users u
  left join (
    select
      user_id,
      sum(distance) travelled_distance
    from
      Rides
    group by
      user_id
  ) r on u.id = r.user_id
order by
  travelled_distance desc,
  name;

-- @lc code=end