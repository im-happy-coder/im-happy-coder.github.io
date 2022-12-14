---
emoji: π³
title: Docker κ°λ° νκ²½ κ΅¬μ± (toy_project)
date: '2022-09-21'
author: μμν΄νΌ
tags: docker docker-compose
categories: study
---

![docker-devland](./img/docker-devland.jpg)

<span style="color:red">ν΄λΉ κΈμ μμΈν μ¬μ©λ²μ μ κ³΅νμ§ μμ΅λλ€.</span>

apache, tomcat, jenkins, gitlab, docker, docker-composeμ λν κΈ°λ³Έ μ΄ν΄κ° νμνλ©°,

μ΄ κΈμμ μ κ³΅νλ μ»¨νμ΄λλ‘ κ³΅λΆνμ€ λ μ°Έκ³ νμλ©΄ μ’μ κ² κ°μ΅λλ€.

[νλ‘μ νΈ λ€μ΄λ‘λ](https://github.com/im-happy-coder/docker-devland)

---

## π° Start

Dockerλ₯Ό νμ©νμ¬ κ°λ°μ νμν μμ€νμ μ»¨νμ΄λννκ³  μ½κ² κ°λ°νκ²½μ κ³΅μ ν  μ μκ³  λμΌν νκ²½μμ μ¬μ©ν  μ μλ€.

ν΄λΉ Docker-devland νλ‘μ νΈλ λ¨μνκ² μΉμλ², WAS, CI, CD νλ κ²μ΄ μλ

μΉμλ²μ WAS μ°λ λ° μΈμ ν΄λ¬μ€ν°λ§ νκ²½κ³Ό JNDI μ΄μ©νμ¬ μλ²μ μλ DBμ λ³΄λ₯Ό μ½μ΄μ μ΄νλ¦¬μΌμ΄μκ³Ό Connectionνλ κΈ°λ₯μ μΆκ°νμλ€.

λͺ¨λν°λ§ μμ€νμ JMX λͺ¨λν°λ§μ μ΄μ©νμ¬ WASμ μμΈ λͺ¨λν°λ§μ΄ κ°λ₯νλ€.

Redisλ₯Ό μ΄μ©ν Object Cache, chainedtransactionλ₯Ό μ΄μ©νμ¬ Mysql, Oracleμ νΈλμ­μμ κ΅¬ννμλ€.

Docker νκ²½μμ μ¬μ©λ  μν μμ€ μ½λλ μλ λ§ν¬μμ λ°μΌλ©΄ λλ€.

[https://github.com/im-happy-coder/docker-devland-application](https://github.com/im-happy-coder/docker-devland-application)

### π¦ Service list

- apache + tomcat modJK Connector
- JNDI(Java Naming Directory Interface)
- JMX(Java Management Extensions)
- Session Clustering
- Object Cache
- Chanedtransaction Manager

### π© Specification

> CentOS 7
>
> Docker version 20.10.16
>
> docker-compose version 1.24.0
>
> JDK 1.8.0_201
>
> MAVEN 3.6.1
>

### π Directory Structure

```shell
.
βββ compose.sh
βββ docker
βΒ Β  βββ docker-compose-gitlab.yml
βΒ Β  βββ docker-compose-httpd.yml
βΒ Β  βββ docker-compose-jenkins.yml
βΒ Β  βββ docker-compose-mysql.yml
βΒ Β  βββ docker-compose-oracle11g.yml
βΒ Β  βββ docker-compose-redis.yml
βΒ Β  βββ docker-compose-tomcat.yml
βββ httpd
βΒ Β  βββ build
βΒ Β  βββ conf
βΒ Β  βββ conf.d
βββ img
βΒ Β  βββ composeDown.PNG
βΒ Β  βββ composeUp.PNG
βββ jenkins
βΒ Β  βββ build
βββ mode.sh
βββ README.md
βββ tomcat
    βββ build1
    βββ build2
    βββ conf1
    βββ conf2
    βββ target1
    βββ target2

```

### π JDK, MAVEN SetUp

JDK, MAVEN PATH
```
/app/jdk1.8.0_201
/app/apache-maven-3.6.1
```

$ vi ~/.bash_profile

```shell
JAVA_HOME=/app/jdk1.8.0_201
M2_HOME=/app/apache-maven-3.6.1
PATH=$JAVA_HOME/bin:$M2_HOME/bin:$PATH:$HOME/bin

export JAVA_HOME M2_HOME PATH

```

---

## π Start Docker Project

$ git clone https://github.com/im-happy-coder/docker-devland.git

### π§€ Sample Source code

$ git clone https://github.com/im-happy-coder/docker-devland-application.git

### π§³ Server setting

$ vi /etc/my.cnf

my.cnf νμΌ λ΄μ© μμ 

```
[mysqld]
skip-host-cache
skip-name-resolve
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
secure-file-priv=/var/lib/mysql-files
user=mysql

pid-file=/var/run/mysqld/mysqld.pid
```

### π₯ docker-compose all up and all down

$ ./compose.sh up

![composeUp](./img/composeUp.PNG)

$ ./compose.sh down

![composeDown](./img/composeDown.PNG)

### π§ MYSQL DB Settings

$ docker container exec -it mysql8.0.23 /bin/bash

$ mysql -u root -p

- ν¨μ€μλ : μμ(μν°ν€)

$ use mysql

- κ³μ  νμΈ
    - $ select host, user, authentication_string from user;
- μΈλΆ μ μ κ³μ  λ§λ€κΈ° # mysql8λ²μ λΆν°λ grant user λΆκ°λ₯
    - $ CREATE USER 'wasdb'@'%' IDENTIFIED BY 'root';
    - $ GRANT ALL PRIVILEGES ON  *.* TO 'wasdb'@'%' WITH GRANT OPTION;
    - $ FLUSH PRIVILEGES;
- λ€μ νμΈ
    - $ select host, user from mysql.user;
- μμ±ν κ³μ μΌλ‘ λ‘κ·ΈμΈ
    - mysql - wasdb - root
- DB μμ±
    - create database javatest
- DB μ μ
    - use javatest

- μλ Query μν

```
create table board(
bid INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(100),
content VARCHAR(1000),
 writer VARCHAR(50) NOT NULL,
passwd VARCHAR(50) NOT NULL,
writeDate VARCHAR(50) NOT NULL);

Chainedtansaction νμ€νΈνκΈ° μν΄ μλΆλ¬ DB λ°μ΄ν°μ null λ°μ΄ν°λ₯Ό μ½μνλ€.

insert into board(title, content, writer, passwd, writeDate) values('test1', '', 'kim', '1234', NOW());
```

### πΈ ORACLE DB Settings

$ docker container exec -it oracle11g /bin/bash

$ sqlplus

- κ³μ  μμ± νμμμ΄ κΈ°λ³Έ κ³μ  μ¬μ©
    - ID: system
    - PASSWD : oracle

- μλ Query μν
```
CREATE TABLE board_tb(
 useid NUMBER(10),
 uname VARCHAR(100),
 age VARCHAR(1000),
 address VARCHAR(50) NOT NULL,
 country VARCHAR(50) NOT NULL,
 writeDate VARCHAR(50),
 PRIMARY KEY(useid));


Chainedtansaction νμ€νΈνκΈ° μν΄ μλΆλ¬ DB λ°μ΄ν°μ null λ°μ΄ν°λ₯Ό μ½μνλ€.

insert into board_tb values(seq_board.nextval,'','oraclecontent1','asung','oracle1',sysdate);
```

μ΄μ  μ€λΉλ λλ¬λ€. 

λ°°ν¬ νκ²½μ λ§λ€μ΄ μ£Όμ

## πΆ Gitlab νλ‘μ νΈ μμ±

GitLabμ λ‘κ·ΈμΈνκ³  μ νλ‘μ νΈλ₯Ό λ§λ€μ΄μ Sample Sourceλ₯Ό μ¬λ €μ€λλ€.

![gitlab](./img/gitlab.PNG)

## π΅ Jenkins SSH λ°°ν¬

JENKINS νλ‘μ νΈ μμ±

![jenkins_1](./img/jenkins_1.PNG)

Gitlab νλ‘μ νΈμ μ°κ²° ν Jenkins SSH μκ²© λ°°ν¬

![jenkins_2](./img/jenkins_2.PNG)

λ°°ν¬ μ€ν¬λ¦½νΈ

build.sh

```shell
#! /bin/sh

# build script to deploy

# backup war
cd ~/docker-devland/tomcat/target1
mv ROOT.war backup_war/ROOT_back$(date '+%Y-%m-%d-%T')
rm -rf ROOT

cd ~/docker-devland/tomcat/target2
mv ROOT.war backup_war/ROOT_back$(date '+%Y-%m-%d-%T')
rm -rf ROOT

#move war
find /home/jenkins/target/* -type f -name '*.war' -exec mv {} ~/docker-devland/tomcat/target1/ROOT.war \;

cp ~/docker-devland/tomcat/target1/ROOT.war  ~/docker-devland/tomcat/target2/ROOT.war

# restart Docker Tomcat
/home/jenkins/scripts/restart.sh
```

restart.sh

```shell
#! /bin/sh

# docker tomcat restart

docker container stop tomcat1

docker container stop tomcat2

sleep 3;

docker container start tomcat1

docker container start tomcat2

```

## π§ REDIS μ€μ  μ λ³΄ λ³κ²½

Sample Source μ½λμ /resource/application-local.yml νμΌ μμ 

![redis](./img/redis.PNG)


## π₯ λ°°ν¬ μ§ν ν μλΉμ€ νμΈνκΈ°

![jenkins_deploy](./img/jenkins_deploy.PNG)

ROOT.warκ° target λλ ν λ¦¬μ μμ±λμλμ§ νμΈ

![war_1](./img/war_1.PNG)

http://μλ²IP μλ ₯νμ¬ λΈλΌμ°μ μμ μ μμ μΌλ‘ μλνλ μ§ νμΈ

![deploy_check](./img/deploy_check.PNG)

μλ‘ κ³ μΉ¨νλ©΄ httpdμ μ°κ²°λ ν°μΊ£1, ν°μΊ£2κ° λ²κ°μ κ°λ©΄μ λμ΄

### π₯ Redis CacheνμΈ λ° Chainedtransaction νμΈνκΈ°

- Redis Session Cache νμΈ

$ docker container exec -it redis6 /bin/bash

$ redis-cli

$ keys *

![redis_session](./img/redis_session.PNG)


- Redis Object Cache νμΈ

μλ²μμ νμΈν΄λ λ¨

μ΄λ²μ Redis Desktop Managerλ‘ νμΈ

![redis_object](./img/redis_object.PNG)

- Chainedtransaction νμΈνκΈ°

μλ²μμ λ‘κ·Έ λ³΄κΈ°

$ docker container logs -f -n 100 tomcat1 | grep -A 10 NULL

λΈλΌμ°μ μμ http://μλ²IP:8888 μ μ 

λΈλΌμ°μ  νλ©΄μμ μμ  λ²νΌ ν΄λ¦­νμ¬ oracle, mysql λ μ€ ν κ³³μλ§ κ°μ μλ ₯ν΄ μ€λλ€.

![transaction](./img/transaction.PNG)

νλ©΄μ ERROR νμ΄μ§κ° λ¨λ©΄ μλ²μμ λ‘κ·Έλ₯Ό νμΈνλ©΄ μλμ κ°μ΄ λ‘κ·Έκ° μ°νλλ€.

![transaction_2](./img/transaction.PNG)



## π« JMX λͺ¨λν°λ§ νμΈνκΈ°

docker tomcat1, tomcat2 IP νμΈ

$ docker container inspect tomcat1 | grep -A 10 IPA

$  docker container inspect tomcat2 | grep -A 10 IPA

![jmx_3](./img/jmx_3.PNG)

μλ²μμ λ³ΈμΈμ΄ μ€μΉν JDKμ bin λλ ν λ¦¬λ‘ μ΄λν©λλ€.

jconsole μ€ν

$ ./jconsole

![jmx](./img/jmx.PNG)

μμμ νμΈν IP:ν¬νΈ μλ ₯

tomcat1 JMX PORT : 9850

tomcat2 JMX PORT : 9860

λͺ¨λν°λ§

![jmx_2](./img/jmx_2.PNG)

## π§ κ°μΈ Registry μλ² μ¬μ©

μ΄λ―Έμ§λ₯Ό ν¨μ¨μ μΌλ‘ κ΄λ¦¬νκΈ° μν΄ κ°μΈ Registry μλ²λ₯Ό λ§λ¬

κ°μΈ Registry μλ²μ μλ μ΄λ―Έμ§ λͺ©λ‘

- λΈλΌμ°μ μμ μ΄λ―Έμ§ νμΈ

![registry_1](./img/registry_1.PNG)

- μλ²μμ μ΄λ―Έμ§ νμΈ

![registry_2](./img/registry_2.PNG)

```toc

```
