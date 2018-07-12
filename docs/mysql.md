### 1. mysql查看库、表大小
- 1.1 查看该数据库实例下所有库大小，得到的结果是以MB为单位 
```
select table_schema,sum(data_length)/1024/1024 as data_length,sum(index_length)/1024/1024 as index_length,sum(data_length+index_length)/1024/1024 as sum from information_schema.tables
+--------------------+---------------+--------------+---------------+  
| table_schema       | data_length   | index_length | sum           |  
+--------------------+---------------+--------------+---------------+  
| information_schema | 2734.92757511 |  86.27539063 | 2821.20296574 |  
+--------------------+---------------+--------------+---------------+ 
```

- 1.2 查看该实例下各个库大小
```
select table_schema, sum(data_length+index_length)/1024/1024 as total_mb, sum(data_length)/1024/1024 as data_mb, sum(index_length)/1024/1024 as index_mb, count(*) as tables, curdate() as today from information_schema.tables group by table_schema order by 2 desc;  
+--------------------+---------------+---------------+-------------+--------+------------+  
| table_schema       | total_mb      | data_mb       | index_mb    | tables | today      |  
+--------------------+---------------+---------------+-------------+--------+------------+  
| data_1234567890    | 2820.59610939 | 2734.39689064 | 86.19921875 |     65 | 2015-11-02 |  
| mysql              |    0.60579967 |    0.53744030 |  0.06835938 |     14 | 2015-11-02 |  
| information_schema |    0.00781250 |    0.00000000 |  0.00781250 |     35 | 2015-11-02 |  
+--------------------+---------------+---------------+-------------+--------+------------+ 
```

- 1.3 查看单个库的大小
```
select concat(truncate(sum(data_length)/1024/1024,2),'mb') as data_size, concat(truncate(sum(max_data_length)/1024/1024,2),'mb') as max_data_size, concat(truncate(sum(data_free)/1024/1024,2),'mb') as data_free, concat(truncate(sum(index_length)/1024/1024,2),'mb') as index_size from information_schema.tables where table_schema = 'cpic_test';
+-----------+------------------+-----------+------------+  
| data_size | max_data_size    | data_free | index_size |  
+-----------+------------------+-----------+------------+  
| 2734.40mb | 83483426815.99mb | 14.06mb   | 86.19mb    |  
+-----------+------------------+-----------+------------+ 
```

- 1.4 查看单个表的状态
```
show table status from cpic_test where name = 'plot'
*************************** 1. row ***************************  
           Name: data_1234567890_ss  
         Engine: InnoDB  
        Version: 10  
     Row_format: Compact  
           Rows: 840065  
 Avg_row_length: 477  
    Data_length: 401473536  
Max_data_length: 0  
   Index_length: 0  
      Data_free: 6291456  
 Auto_increment: 882251  
    Create_time: 2015-09-07 17:24:18  
    Update_time: NULL  
     Check_time: NULL  
      Collation: utf8_general_ci  
       Checksum: NULL  
 Create_options:  
        Comment:  
1 row in set (0.00 sec)  
```

- 1.5 查看单库下所有表的状态
```
select table_name, (data_length/1024/1024) as data_mb , (index_length/1024/1024)   as index_mb, ((data_length+index_length)/1024/1024) as all_mb,table_rows  from information_schema.tables where table_schema = 'cpic_test'; 
+---------------------------+---------------+-------------+---------------+------------+  
| table_name                | data_mb       | index_mb    | all_mb        | table_rows |  
+---------------------------+---------------+-------------+---------------+------------+  
| ss_daccount               |    0.23437500 |  0.10937500 |    0.34375000 |       4481 |  
| ss_daccount_log           |    2.48262787 |  0.58496094 |    3.06758881 |      27248 |  
| ss_daccount_type          |    0.00025558 |  0.00195313 |    0.00220871 |          8 |  
| ss_daccountlog            |  221.61502457 | 22.66113281 |  244.27615738 |    1045462 |  
| ss_dactives               |    0.00178146 |  0.00195313 |    0.00373459 |          7 |  
| ss_dadmin                 |    0.00268173 |  0.00195313 |    0.00463486 |         19 |  
| ss_dadmin_log             |    0.36599731 |  0.05175781 |    0.41775513 |       5191 |  
| ss_dadmin_nav             |    0.01562500 |  0.00000000 |    0.01562500 |         46 |  
| ss_dadmin_role            |    0.01562500 |  0.01562500 |    0.03125000 |          5 |  
| ss_dadvertisement         |    0.07812500 |  0.00000000 |    0.07812500 |        486 |  
| ss_dadvertisement_click   |  382.87500000 |  0.00000000 |  382.87500000 |    1023350 |  
| ss_dadvertisement_content |    0.10937500 |  0.01562500 |    0.12500000 |        105 |  
| ss_dapplication           |    3.23010635 |  0.02441406 |    3.25452042 |       1859 |  
| ss_dapplication_bak       |    2.25843048 |  0.01269531 |    2.27112579 |        738 |  
| ss_dapplication_comment   |    0.88685226 |  0.05566406 |    0.94251633 |       5454 |  
| ss_dapplication_material  |    0.00187683 |  0.00195313 |    0.00382996 |         16 |  
| ss_dapplication_user      |    0.90316010 |  0.10839844 |    1.01155853 |       8861 |  
| ss_darea                  |    1.05803299 |  0.88769531 |    1.94572830 |      45051 |  
| ss_dauthentication        |    0.00072861 |  0.00195313 |    0.00268173 |         13 |  
| ss_dbbs_relatedlink       |    0.01562500 |  0.00000000 |    0.01562500 |         12 |  
| ss_dborrow                |    0.04732895 |  0.00390625 |    0.05123520 |        153 |  
| ss_dborrow_collection     |   27.61576080 | 13.99023438 |   41.60599518 |     221169 |  
| ss_dborrow_lz             |    0.00000000 |  0.00097656 |    0.00097656 |          0 |  
| ss_dborrow_tender         |   24.62931824 | 18.27050781 |   42.89982605 |     147411 |  
| ss_dcash                  |    6.40177155 |  1.97949219 |    8.38126373 |      42807 |  
| ss_dcp_block              |    0.04687500 |  0.01562500 |    0.06250000 |         37 |  
| ss_dcp_item               |    0.09375000 |  0.00000000 |    0.09375000 |        134 |  
| ss_dedu_member            |    0.01562500 |  0.00000000 |    0.01562500 |         13 |  
| ss_dinfo_article          |   78.76256561 |  1.19433594 |   79.95690155 |      10038 |  
| ss_dinfo_channel          |    0.01562500 |  0.00000000 |    0.01562500 |         56 |  
| ss_dinfo_comment          |    0.32812500 |  0.00000000 |    0.32812500 |       1206 |  
| ss_dinfo_nav              |    0.01562500 |  0.00000000 |    0.01562500 |         27 |  
| ss_dinfo_p2pdata          |    0.90237427 |  0.29101563 |    1.19338989 |      29569 |  
| ss_dinfo_p2pdata_0        |    0.04687500 |  0.00000000 |    0.04687500 |        275 |  
| ss_dinfo_photo            |    0.23437500 |  0.00000000 |    0.23437500 |         71 |  
| ss_dinfo_project          |    0.06250000 |  0.00000000 |    0.06250000 |         67 |  
| ss_dinfo_seekdata         |   35.53404236 |  0.64062500 |   36.17466736 |       5002 |  
| ss_dinfo_tagname          |    0.01562500 |  0.00000000 |    0.01562500 |         18 |  
| ss_dinfo_testinfo         |    0.01562500 |  0.00000000 |    0.01562500 |         21 |  
| ss_dinfo_video            |    0.91273117 |  0.00781250 |    0.92054367 |        207 |  
| ss_djiao                  |    0.01562500 |  0.00000000 |    0.01562500 |          3 |  
| ss_dliberty               |    3.79615784 |  0.27734375 |    4.07350159 |      23108 |  
| ss_dliberty_item          |    3.08350754 |  1.24414063 |    4.32764816 |      51113 |  
| ss_dloan                  |    0.00000000 |  0.00390625 |    0.00390625 |          0 |  
| ss_dmarke                 |    0.01973343 |  0.00390625 |    0.02363968 |        125 |  
| ss_dmedal                 |    0.00000000 |  0.00097656 |    0.00097656 |          0 |  
| ss_dmember_comment        |    0.00995636 |  0.00195313 |    0.01190948 |         87 |  
| ss_dmembers               |    6.73762321 |  0.33203125 |    7.06965446 |      30717 |  
| ss_dmembers_identity      |    0.10503769 |  0.00976563 |    0.11480331 |        784 |  
| ss_dnewyear               |    0.00308609 |  0.00195313 |    0.00503922 |         32 |  
| ss_drecharge              |   29.13045883 | 10.23925781 |   39.36971664 |     221220 |  
| ss_dsalon_click           |    0.00586700 |  0.00195313 |    0.00782013 |         31 |  
| ss_dsalon_comment         |    0.07812500 |  0.00000000 |    0.07812500 |        213 |  
| ss_dsalon_content         |    0.14062500 |  0.00000000 |    0.14062500 |        653 |  
| ss_dsalon_ticket          |    0.00093079 |  0.00195313 |    0.00288391 |         20 |  
| ss_dsignin                |    0.37500000 |  0.00000000 |    0.37500000 |       7177 |  
| ss_dtemplate              |    0.15721893 |  0.03808594 |    0.19530487 |       2838 |  
| ss_dwd_answers            |    2.51562500 |  0.00000000 |    2.51562500 |       5420 |  
| ss_dwd_classify           |    0.01562500 |  0.00000000 |    0.01562500 |         12 |  
| ss_dwd_collection         |    0.01562500 |  0.00000000 |    0.01562500 |          2 |  
| ss_dwd_questions          |    1.51562500 |  0.00000000 |    1.51562500 |       3614 |  
| ss_dwget                  | 1894.69999695 | 13.02929688 | 1907.72929382 |    1187574 |  
| ss_dzhuanti_bolanhui      |    0.00419235 |  0.00195313 |    0.00614548 |         20 |  
| click                     |    0.00000000 |  0.00097656 |    0.00097656 |          0 |  
| ss_account                |    0.14062500 |  0.07812500 |    0.21875000 |       1871 |  
+---------------------------+---------------+-------------+---------------+------------+  
```
### 2.mysql cluster Horizontal sharding
```
var mysql = require('mysql');

var connectionPool = {
	server1: mysql.createPool({ host: '192.168.1.1' ... });
	server2: mysql.createPool({ host: '192.168.1.2' ... });
	server3: mysql.createPool({ host: '192.168.1.3' ... });
	server4: mysql.createPool({ host: '192.168.1.4' ... });	
};

var serverId = 'server' + (userId % 4); 

connectionPool[serverId].getConnection(function(err, connection) {
   // execute query
   connection.release();
});
```
### 3.查看添加索引的必要性
```
select count(distinct `location`)/ count(*) from plot;
```
