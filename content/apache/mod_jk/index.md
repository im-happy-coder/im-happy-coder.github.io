---
emoji: ๐ช
title: apache tomcat mod_jk ์ฐ๋ํ๊ธฐ (CentOS7)
date: '2022-10-03'
author: ์์ํดํผ
tags: tomcat linux centos7 apache mod_jk virtualbox httpd
categories: tomcat apache
---

## ๐  ์น์๋ฒ1๋(vm1) ํฐ์บฃ2๋(vm1,vm2) ์ฐ๋( mod_jk)

> ํ๊ฒฝ : VirtualBox6.1 , Apache2.4.53, Tomcat8.5.79, mod_jk1.2.48
>
>
> ๋คํธ์ํฌ ์ต์ : ๋คํธ์ํฌ1(NAT) ๋คํธ์ํฌ2(HostOnly)
>
> Gateway : 192.168.56.1
>
> > nat ip : 10.0.2.15
> >
> >
> > vm1  ip: 192.168.56.7
> >
> >
> > vm2  ip: 192.168.56.8
> >
> >
> Directory : /engn002/web/apache
>

---

apache์ tomcat์ ์ค์น๋์ด ์์ผ์์ผ ํฉ๋๋ค.

์ ๋ apache๋ฅผ ์์ค(์ปดํ์ผ)๋ก ์ง์  ์ค์นํ์ต๋๋ค.

---

## ๐ MOD_JK Install

> ๋ค์ด๋ก๋ [https://tomcat.apache.org/download-connectors.cgi](https://tomcat.apache.org/download-connectors.cgi)
๋๋ [https://archive.apache.org/dist/tomcat/tomcat-connectors/jk/](https://archive.apache.org/dist/tomcat/tomcat-connectors/jk/)
>

$ wget [https://archive.apache.org/dist/tomcat/tomcat-connectors/jk/tomcat-connectors-1.2.48-src.tar.gz](https://archive.apache.org/dist/tomcat/tomcat-connectors/jk/tomcat-connectors-1.2.46-src.tar.gz)

$ tar xvf tomcat-connectors-1.2.48-src

$ cd tomcat-connectors-1.2.48-src/native/

## ๐ apache์ค์นํ ๊ฒฝ๋ก์ apxs ๊ฒฝ๋ก์ ์ปค๋ฅํฐ๋ฅผ ์ค์นํด์ผํ๋ค.

$ ./configure --with-apxs=/engn002/web/apache/bin/apxs

$ make && make install

- ํ์ธ
    - $ ls -al /engn002/web/apache/conf/modules | grep mod_jk.so
- mod_jk.so๊ฐ ์์ผ๋ฉด ์ค์น๊ฐ ๋๊ฑฐ์

---

## ๐ apache httpd.conf ์์ 

$ vi /engn002/apache/conf/httpd.conf

๋ฐ๋ก mod_jk.confํ์ผ์ ์์ฑํ์ง์์(๊ฐ๋ ์ฐ๋์ค๋ฅ๊ฐ ๋ฐ์ํจ)-๊ทธ๋ฅ httpd.conf์์ ์ ์ธํจ

์์ค ๋งจ ์๋์ชฝ์ ์์ฑ

```
LoadModule jk_module modules/mod_jk.so

<IfModule jk_module>
        JkWorkersFile conf/workers.properties
        JkShmFile /engn003/logs/web/mod_jk.shm
        JkLogFile /engn003/logs/web/mod_jk.log
        JkLogLevel info
        JkLogStampFormat "[%y %m %d %H:%M:%S] "
        JkMount /* lb
</IfModule>

<VirtualHost *:80>
ServerName localhost
JkMount /* lb
</VirtualHost>
```

$ vi /engn002/apache/conf/workers.properties

```
worker.list=worker1,worker2,lb

worker.worker1.port=8009
worker.worker1.host=192.168.56.7
worker.worker1.type=ajp13
worker.worker1.lbfactor=1

worker.worker2.port=8010
worker.worker2.host=192.168.56.8
worker.worker2.type=ajp13
worker.worker2.lbfactor=1

worker.lb.type=lb
worker.lb.balance_workers=worker1,worker2
worker.lb.sticky_session=false
```

## ๐ ์ค์!!

> sticky_session์ ๊ธฐ๋ณธ๊ฐ์ด true์ด๊ธฐ ๋๋ฌธ์ ๊ฐ์ ์ ์ธํ์ง ์์ผ๋ฉด sticky_session์ด true ์ ์ฉ์ด ๋๋ค.
>
>
> > sticky_session์ด ์ ์ฉ์ด ๋๋ฉด ์น์๋ฒip(192.168.56.7)๋ก ๊ณ์ ์ ์์ ํด๋ vm1(192.168.56.7)์ ์ค์น๋ ํฐ์บฃ๋ง ๊ณ์ ๋ณด์ฌ์ค๋ค.(์๋ฒ์์๋ curl 192.168.56.7๋ก ๊ณ์ ์ ์ํ๋ฉด tomcat1๊ณผ tomcat2๊ฐ ๋ฒ๊ฐ์๊ฐ๋ฉด์ ๋์ค๋ฉด ์ ๋๋ก ๋์ค๋๊ฒ ๋ง๋๊ฑฐ๋ค..) ํ์ง๋ง ํฌ๋กฌ์์ ํ์ธํ  ๊ฒฝ์ฐ ํฐ์บฃ1๋ง ๋์จ๋ค.
> >
> >
> > ๊ทธ๋์ workerํ์ผ์์ sticky_session์ false๋ก ์ ์ธํด์ผํ๋ค.
> >

---

## ๐ Tomcat ์ค์ 

$ vi conf/server.xml

์ฃผ์ ์ฒ๋ฆฌ ๋์ด์์ผ๋ฉด ์ง์์ฃผ๊ณ  ์๋์ ๊ฐ์ด ์์ฑ

tomcat1,2 ๋ ๋ค ๋ณ๊ฒฝํ๊ณ  port๋ง ๋ค๋ฅด๊ฒ ์ค์ 

```xml
<Connector protocol="AJP/1.3"
	address="0.0.0.0"
        secretRequired="false"
        port="8009"
        redirectPort="8443" />
```

์๋ฒ 2๋์ ํฐ์บฃ์ ํ๊ฐ ์ฉ ์ค์นํ๊ธฐ ๋๋ฌธ์ ๊ธฐ๋ณธ ํฌํธ(8080), ์๋ฒ ํฌํธ(8005), ajp ํฌํธ(8009)๋ ๊ฐ์๋ ์๊ด์์

๋ง์ฝ tomcat1,2๋ฅผ ํ๋์ ์๋ฒ์ ํฐ์บฃ2๊ฐ๋ฅผ ์ค์นํ๋ฉด ํฌํธ๋ ์๋ก ๋ฌ๋ผ์ผํจ

## ๐  ์๋ฒ์์ ํ์คํธ

$ curl 192.168.56.7

# ์ฒซ๋ฒ์งธ ํ์ธ

![curl_1](./img/curl_1.png)

# ๋๋ฒ์งธ ํ์ธ

![curl_2](./img/curl_2.png)

# ๋ก์ปฌ์์ ํ์คํธ

![curl_3](./img/curl_3.png)

๋ก์ปฌ์์ ์น์๋ฒip๋ก ํ์ธ(์๋ก๊ณ ์นจํด์ tomcat1,2๊ฐ ๋ฐ๋ก ๋์ค๋ฉด ์ฑ๊ณต)


<details>
<summary>[ERROR]</summary>


[ERROR] Unable to start due to shared memory failure

ํด๋น ์ค๋ฅ๋ ์ค์ ํ์ผ์ ๋๋ ํ ๋ฆฌ ์ ์ธ์ด ์ ๋ชป ๋์ด์๋ ๊ฒฝ์ฐ์ ๋ฐ์ํจ(๋๋ ํ ๋ฆฌ ๊ฒฝ๋ก๊ฐ ์กด์ฌํ๋์ง ํ์ธ)

[ERROR] permission ์๋ฌ๊ฐ ๋ฐ์ํ๋ฉด tomcat ๋๋ ํ ๋ฆฌ์ ๊ถํ ๋ถ์ฌํ๊ธฐ

$ chmod 755 -R tomcat8-1/
</details>

```toc

```
