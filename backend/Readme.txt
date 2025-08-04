+-------------------+              +-------------------+
|    customers      |              |     invoices      |
+-------------------+              +-------------------+
| PK customer_id    |<------------ | PK invoice_id     |
| name             |              | invoice_number    |
| company_name     |              | bill_to_id (FK)   |----+
| address          |              | bill_from_id (FK) |    |
| city             |              | due_date          |    |
| state            |              | invoice_date      |    |
| zip_code         |              | subtotal          |    |
| email           |              | tax_rate          |    |
| phone           |              | total             |    |
| type (ENUM)     |              +--------------------+    |
+-----------------+                                       |
                                                           |
                                                           |
                                                           v
                                               +----------------------+
                                               |    invoice_items     |
                                               +----------------------+
                                               | PK item_id          |
                                               | invoice_id (FK)     |
                                               | description         |
                                               | price               |
                                               | quantity            |
                                               | total               |
                                               +---------------------+

                                               +----------------------+
                                               |   payment_methods    |
                                               +----------------------+
                                               | PK payment_id       |
                                               | invoice_id (FK)     |
                                               | bank_name           |
                                               | account_number      |
                                               +---------------------+

                                               +----------------------+
                                               |  terms_conditions    |
                                               +----------------------+
                                               | PK term_id          |
                                               | invoice_id (FK)     |
                                               | terms               |
                                               +---------------------+
