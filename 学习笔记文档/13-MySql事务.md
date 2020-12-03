## MySql事务

+ 当一个数据逻辑需要多个sql完成时，如果其中某条sql语句出错，则希望整个操作都退回；

+ 使用事务可以实现操作逻辑的退回，保证业务逻辑的正确性；

+ 事务四大特性：

  + 原子性：事务中的全部操作在数据库中是不可分割的，要么全部完成，要么都不执行；
  + 一致性：几个并行执行的事务，其执行结果必须与按某一顺序串执行的结果一致；
  + 隔离性：事务的执行不受其他事务的干扰，事务执行的中间结果必须是透明的；
  + 持久性：对于任意已提交的事务，系统必须保证改事务对数据库的改变不被丢失，即使数据库出现故障；

+ 要求：表的类型必须是innodb和bdb类型，才可以对这个表使用事务；

+ 查看表的创建语句

  ```
  show create table 表名;
  ```

  

+ 修改表的类型

  ```
  alter table "表名" engine=innodb;
  ```

  

+ 事务语句

  ```
  开启：begin;
  提交：commit;
  回滚：rollback;
  ```

+ 事务使用场景

  ```
  // 要插入一条完整的书籍信息；必须完整的将四个表的数据插入，因为如果一条数据没有插入成功，就会导致数据出现问题
  begin;       // 开始事务
  insert into booktable (bookname,authorid,catagoryid,pubcompanyid)
  values ("鬼吹灯",4,4,4)
  insert into authortable values (4,"天下霸唱")
  insert into catagory values (4,"盗墓小说","盗墓",0)
  insert into pubcompany values (4,"盗墓出版社","出版社信息")
  commit;     // 提交事务，begin开始事务后，必须要提交才能插入成功，而且插入语句不能出错，只				  有全部正确之后才能提交成功
  rollback;   // 数据操作回滚，之前commit提交的事务操作会失效
  ```

  