import{c as e}from"./dist-CCUXWRor.js";new e().target(`target`).sql(`WITH monthly_sales AS (
    SELECT
        customer_id,
        DATE_TRUNC('month', order_date) AS order_month,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE status = 'complete'
    GROUP BY customer_id, DATE_TRUNC('month', order_date)
)
SELECT
    customer_id,
    order_month,
    revenue,
    RANK() OVER (
        PARTITION BY order_month
        ORDER BY revenue DESC
    ) AS monthly_rank
FROM monthly_sales
ORDER BY order_month DESC, monthly_rank
LIMIT 20;`).render();
//# sourceMappingURL=SQL Editor-CzaMtj-J.js.map