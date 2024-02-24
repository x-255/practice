--
-- @lc app=leetcode.cn id=1075 lang=mysql
--
-- [1075] 项目员工 I
--
-- @lc code=start
# Write your MySQL query statement below
select
  p.project_id,
  round(avg(e.experience_years), 2) average_years
from
  Project p
  join Employee e on p.employee_id = e.employee_id
group by
  p.project_id;

/**
 * @description: 
 * @return {*}
 */
-- @lc code=end