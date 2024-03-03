--
-- @lc app=leetcode.cn id=1211 lang=mysql
--
-- [1211] 查询结果的质量和占比
--
-- @lc code=start
# Write your MySQL query statement below
select
  q1.query_name,
  round(avg(q1.rating / q1.position), 2) quality,
  round(
    (
      select
        count(*)
      from
        Queries q2
      where
        q2.query_name = q1.query_name
        and q2.rating < 3
    ) / count(*) * 100,
    2
  ) poor_query_percentage
from
  Queries q1
where
  q1.query_name is not null
group by
  query_name;

-- @lc code=end