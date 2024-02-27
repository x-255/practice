--
-- @lc app=leetcode.cn id=1050 lang=mysql
--
-- [1050] 合作过至少三次的演员和导演
--
-- @lc code=start
# Write your MySQL query statement below
select
  actor_id,
  director_id
from
  ActorDirector
group by
  actor_id,
  director_id
having
  count(*) > 2;

-- @lc code=end