---
emoji: ๐ซ
title: Tomcat ์ค์นํ๊ธฐ (CentOS7)
date: '2022-10-02'
author: ์์ํดํผ
tags: tomcat linux centos7 install
categories: tomcat
---

## ๐น Tomcat Install

mirror์ฌ์ดํธ์์ ์ํ๋ ํฐ์บฃ ๋ฒ์  ํ์ธํ๊ณ  ๋งํฌ ์ฃผ์ ๋ณต์ฌ

mirror : [https://archive.apache.org/dist/tomcat/tomcat-8/v8.5.3/bin/](https://archive.apache.org/dist/tomcat/tomcat-8/v8.5.3/bin/)

์ค์นํ  ๋๋ ํ ๋ฆฌ ์ด๋ ํ wget ๋งํฌ์ฃผ์ ์๋ ฅ

$ wget [https://downloads.apache.org/tomcat/tomcat-8/v8.5.79/bin/apache-tomcat-8.5.79.tar.gz](https://downloads.apache.org/tomcat/tomcat-8/v8.5.79/bin/apache-tomcat-8.5.79.tar.gz)

์์ถํ๊ธฐ 

$ tar xvf apache-tomcat-8.5.79-src.tar.gz

ํฐ์บฃ ๋๋ ํ ๋ฆฌ ์ด๋ฆ ๋ณ๊ฒฝ

$ mv apache-tomcat-8.5.79-src tomcat8-1

## ๐ฅก alias๋ก tomcat ๋ฐ๋ก ์คํ, ์ข๋ฃ ์ค์ ํ๊ธฐ

$ vi ~/.bashrc

```
alias tomcat.start='cd /engn002/was/tomcat8-1/bin; ./startup.sh'
alias tomcat.stop='cd /engn002/was/tomcat8-1/bin; ./shutdown.sh'
```

/engn002/was/tomcat8-1/bin  ํฐ์บฃ์ด ์ค์น๋ ๋๋ ํ ๋ฆฌ ์์น์ด๋ค.

$ source ~/.bashrc

์ด์  tomcat.start ์๋ ฅํ๋ฉด ๋ฐ๋ก ํฐ์บฃ์ด ์คํ๋๊ณ 

tomcat.stop ์๋ ฅํ๋ฉด ํฐ์บฃ์ด ์ข๋ฃ๋๋ค.

```toc

```
