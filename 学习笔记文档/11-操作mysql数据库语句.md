## 数据库条件查询

#### 1：条件查询语句（逻辑运算符and，or，not）

```
// 方式1
select * from 表名 where 条件1 and 条件2；

// 方式2
select * from 表名 字段名 between 10000 and 30000；

// 查找某个字段值为确切字符的结果
select * from 表名 where 字段名=值;

// 查询两个确切值的其中一个
select * from 表名 where 字段名=值1 or 字段名=值2;
```

#### 2：模糊查询（like，is，not）

```
// like       %  表示前后可能有字符也可能没有字符
select * from 表名 where 字段名 like "%模糊匹配字符%";

// 查询以股票两个字符开头，且后面有3个字符的字段
select * from 表名 where 字段名 like "%股票___%";

// 查询某一个值为NULL的字段
select * from 表名 where 字段名 is NULL;

// 查找某个字段为非空
select * from 表名 where 字段名 is not NULL;
```

#### 3：连表查询（inner join，left join，right join）

+ 表A inner join 表B：表A与表B匹配的行会出现在结果中

+ 表A left join 表B：表A与表B匹配的行会出现在结果中，外加表A中独有数据，未对应的数据使用null填充

+ 表A right join 表B：表A与表B匹配的行会出现在结果中，外加表B中独有数据，未对应的数据使用null填充

  ```
  // inner join
  // on添加连表查询条件，不添加时会出现查询结果混乱的问题
  // where添加表结果的筛选条件
  select * from 表A inner join 表B on 表A.id = 表B.id where 条件
  
  // left join
  select * from 表A left join 表B on 表A.id = 表B.id where 条件
  
  // left join
  select * from 表A right join 表B on 表A.id = 表B.id where 条件
  ```

#### 4：自关联查询和子查询

```
// 自关联查询就是在一个表里面自己查询自己的信息
// 以省市区为例：一个省份对应多个市，那么就设置一个字段parentId，存储上一级区域的ID，那么在查询的时候，要查询下一级地区就查询parentId与自身ID相等的数据即可

// 子查询就是在一个查询结果中查询另一个结果:in,在前面的数据中查询符合后面查询语句的数据
// 例子如下：
select * from score from student on score.id = student.id 
in (select studentname from student where age > 20)
// 在score和student连表查询之后的结果中查找 age>20 的数据

// 某个条件符合，才执行查询:  exists
// 例子：学生大于50岁才将老师查询出来(先执行后面的查询语句，有值的情况下才执行前面的)
select * from teacher where exists (select studentname from student where age > 50)
```

#### 5：limit返回指定的结果条数，可以做分页时使用

```
select * from 表名 limit 限制结果条数范围
```

#### 6：update更新操作

```
update 要更新的表 set 更新的字段 = 值 where id = 要更新的数据对应的id值
```

#### 7：delete删除

删除分为逻辑删除（假删除，使用update更新某个字段为false）和物理删除（真删除）

``` 
// 逻辑删除
update 表名 set isDelete = "false" where id = 2;

// 物理删除名字为 1111 的数据
delete from 表名 where name = "1111"
```



#### 数据库设计建表时应注意

​	第一范式：只含有原子性（不可分割）的值

​	第二范式：满足第一范式，没有部分依赖

​	第三范式：满足第二范式，没有传递依赖



#### 数据库一对一，一对多，和多对多关系



#### 外键

1. 通过外键验证数据库中数据的有效性，是一种用约束，但是会消耗性能

