---
emoji: π§Ό
title: VMνκ²½μμ 3Tier κ΅¬μΆ νκΈ° (toy_project)
date: '2022-09-25'
author: μ₯νμΈ
tags: vm 3tier 
categories: study
---

![vm3tier](./img/vm3tier.jpg)


VMνκ²½μμ 3Tier Architecture μ€κ³

ν΄λΉ κ²μκΈμ μμΈν μ€λͺμ μμ΅λλ€.

ν΄λΉ νλ‘μ νΈλ₯Ό μ΄λ»κ² κ΅¬μ±νμλμ§μ λν κ²°κ³Ό νλ©΄μ λ³΄μ¬μ£ΌκΈ° μν κ²μκΈμλλ€.

μ€μΉ λ°©μμ ν¨ν€μ§ μ€μΉλ°©μμ΄ μλ μμ€ μ»΄νμΌ μ€μΉλ°©μμΌλ‘ μ΄λ£¨μ΄ μ‘μ΅λλ€.

---

## π‘ VirtualBox νκ²½ κ΅¬μ± λ° λ€νΈμν¬ μ€μ 

![vm_1](./img/vm_1.PNG)

VM1 : NAT,νΈμ€νΈ μ μ© μ΄λν°

VM2 = NAT,νΈμ€νΈ μ μ© μ΄λν°

μ μ , κ·Έλ£Ή, λλ ν λ¦¬ μ€κ³

engn001 : κ³μ  HOME λλ ν λ¦¬

engn002 : μΉμλ², WAS, Mysql, λ―Έλ€μ¨μ΄

engn003 : logs λλ ν λ¦¬

λ―Έλ€μ¨μ΄ κ³΅ν΅ κ·Έλ£Ή : www

```shell
engn001/
βββ home
    βββ devuser
    βββ jenkins-app
    βββ mysql
    βββ wasadm
    βββ webadm
engn002/
βββ jdk
βΒ Β  βββ jdk1.8.0_201
βΒ Β  βββ jdk8 -> jdk1.8.0_201
βββ jmeter
βΒ Β  βββ apache-jmeter-5.4.3
βΒ Β  βββ jmeter -> apache-jmeter-5.4.3
βββ maven
βΒ Β  βββ apache-maven-3.6.3
βΒ Β  βββ m2 -> apache-maven-3.6.3
βββ scouter
βΒ Β  βββ scouter -> scouter-min-2.6.1/
βΒ Β  βββ scouter-min-2.6.1
βββ sts
βΒ Β  βββ spring-tool-suite-4-4.14.1.RELEASE-e4.23.0-linux.gtk.x86_64.tar.gz
βΒ Β  βββ sts -> sts-4.14.1.RELEASE/
βΒ Β  βββ sts-4.14.1.RELEASE
βββ tar-temp
βΒ Β  βββ apache-tomcat-8.5.79.tar.gz
βββ temp
βΒ Β  βββ apr-1.6.5.tar.gz
βΒ Β  βββ apr-util-1.6.1.tar.gz
βΒ Β  βββ httpd-2.4.53
βΒ Β  βββ httpd-2.4.53.tar.gz
βΒ Β  βββ svntemp
βΒ Β  βββ tomcat-connectors-1.2.48-src
βΒ Β  βββ tomcat-connectors-1.2.48-src.tar.gz
βββ tools
βΒ Β  βββ data
βΒ Β  βββ jenkins
βΒ Β  βββ nexus
βΒ Β  βββ svn
βββ was
βΒ Β  βββ tomcat8-1
βββ web
    βββ apache
engn003/
βββ logs
    βββ was
    βββ web

```

## π apache μ€μΉ λ° μ€μ 

apache μ€μΉ μλ£ μ€ν νλ©΄

![apache_1](./img/apache_1.PNG)


## π apache tomcat μ°κ²°

apache conf μ€μ  νμΌ

![mod_jk_1](./img/mod_jk_1.PNG)

apache tomcat μ°κ²° μ€μ κ³Ό SVN μ°κ²° μ€μ  λ±..

![apache_2](./img/apache_2.PNG)

## π? tomcat session clustering κ΅¬μ±

tomcat conf/server.xml μΈμ ν΄λ¬μ€ν°λ§ μ€μ 

![session](./img/session.PNG)

λ©ν°μΊμ€νμ λΌμ°ν μ€μ 

![session_1](./img/session_1.PNG)

## π Mysql μ€μΉ λ° μ°λ

Mysql Source μ€μΉ μ€ννλ©΄

![mysql_1](./img/mysql_1.PNG)


## π svn, jenkins, maven λ°°ν¬ νκ²½ κ΅¬μ±

### π SVN

svn apache μ°κ²° μ€μ 

![svn_1](./img/svn_1.PNG)

svn μ¬μ©μ passwd μνΈν

![svn_2](./img/svn_2.PNG)

λΈλΌμ°μ μμ svn νμΈ

![svn_3](./img/svn_3.PNG)

### π nexus

Nexus μ€μΉ λ° μ€ν

![nexus_1](./img/nexus_1.PNG)

nexus Role μΆκ° λ° κ³μ  μ€μ 

![nexus_2](./img/nexus_2.PNG)

![nexus_3](./img/nexus_3.PNG)

settings.xml μ€μ 

```
<server>
<id>releases</id>
<username>nx_user</username>
<password>passwd</password>
</server>
<server>
<id>central</id>
<username>nx_user</username>
<password>passwd</password>
</server>


 <mirror>
      <id>Nexus</id>
      <mirrorOf>*</mirrorOf>
      <url>http://192.168.56.7:8081/repository/maven-central/</url>
 </mirror>
```

pom.xml μ€μ 

```
<distributionManagement> 
    <repository>
	<id>releases</id>
        <url>http://192.168.56.7:8081/repository/maven-releases</url>
    </repository>

    <snapshotRepository>
        <id>snapshots</id>
        <url>http://192.168.56.7:8081/repository/maven-snapshots</url>
    </snapshotRepository>

 </distributionManagement>
```

### π jenkins

Jenkins λ°°ν¬ νκ²½ κ΅¬μ±

λ°°ν¬ μ€ν¬λ¦½νΈ

build.sh
```shell
#! /bin/sh

# build script to deploy

cd /engn002/was/tomcat8-1/webapps

mv ROOT.war backup/ROOT_back$(date '+%Y-%m-%d-%T')
rm -rf ROOT

find /engn001/home/wasadm/target/* -type f -name '*.war' -exec mv {} /engn002/was/tomcat8-1/webapps/ROOT.war \;

/engn001/home/wasadm/scripts/restart.sh
```

restart.sh
```shell
#! /bin/sh

# tomcat restart shell script

cd /engn002/was/tomcat8-1

bin/shutdown.sh

sleep 5;

bin/startup.sh

```

νλ‘μ νΈ μμ± λ° μ€μ 

![jenkins_1](./img/jenkins_1.PNG)

![jenkins_2](./img/jenkins_2.PNG)

![jenkins_3](./img/jenkins_3.PNG)

λΉλ κ²°κ³Ό

![jenkins_4](./img/jenkins_4.PNG)


λΈλΌμ°μ μμ νμΈ

![test_page](./img/test_page.PNG)

```toc

```
