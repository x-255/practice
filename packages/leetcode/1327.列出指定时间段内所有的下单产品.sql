--
-- @lc app=leetcode.cn id=1327 lang=mysql
--
-- [1327] 列出指定时间段内所有的下单产品
--
-- @lc code=start
# Write your MySQL query statement below
select
  p.product_name,
  sum(o.unit) unit
from
  (
    select
      *
    from
      Orders
    where
      order_date between '2020-02-01'
      and '2020-02-29'
  ) o
  join Products p on p.product_id = o.product_id
group by
  o.product_id
having
  unit >= 100;

-- @lc code=end