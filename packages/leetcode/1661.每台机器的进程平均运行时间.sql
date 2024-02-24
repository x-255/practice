--
-- @lc app=leetcode.cn id=1661 lang=mysql
--
-- [1661] 每台机器的进程平均运行时间
--
-- @lc code=start
# Write your MySQL query statement below
select
  a1.machine_id,
  round(avg(a2.timestamp - a1.timestamp), 3) processing_time
from
  Activity a1
  join Activity a2 on a1.machine_id = a2.machine_id
  and a1.process_id = a2.process_id
  and a1.activity_type = 'start'
  and a2.activity_type = 'end'
group by
  machine_id;

-- @lc code=end