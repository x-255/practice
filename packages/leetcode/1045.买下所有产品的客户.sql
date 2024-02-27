--
-- @lc app=leetcode.cn id=1045 lang=mysql
--
-- [1045] 买下所有产品的客户
--
-- @lc code=start
# Write your MySQL query statement below
select
  customer_id
from
  Customer
group by
  customer_id
having
  count(distinct product_key) >= (
    select
      count(*)
    from
      Product
  );

-- @lc code=end