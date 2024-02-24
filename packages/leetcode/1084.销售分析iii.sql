--
-- @lc app=leetcode.cn id=1084 lang=mysql
--
-- [1084] 销售分析III
--
-- @lc code=start
# Write your MySQL query statement below
select
  s.product_id,
  p.product_name
from
  Sales s
  join Product p on p.product_id = s.product_id
group by
  product_id
having
  min(sale_date) >= '2019-01-01'
  and max(sale_date) <= '2019-03-31';

-- @lc code=end