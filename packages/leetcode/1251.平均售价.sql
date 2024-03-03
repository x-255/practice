--
-- @lc app=leetcode.cn id=1251 lang=mysql
--
-- [1251] 平均售价
--
-- @lc code=start
# Write your MySQL query statement below
select
  p.product_id,
  round(
    avg(
      p.price * u.units / (
        select
          sum(units)
        from
          UnitsSold u1
        where
          p.product_id = u1.product_id
      )
    ),
    2
  ) average_price
from
  Prices p
  join UnitsSold u on p.product_id = u.product_id
group by
  p.product_id;

-- @lc code=end