---
emoji: ๐
title: SVN Install (CentOS7)
date: '2022-10-06'
author: ์์ํดํผ
tags: linux centos7 svn subversion
categories: svn
---

## Subversion Install & Repository Set

subversion๋ฅผ ํจํค์ง ์ค์น๊ฐ ์๋ ์์ค(์ปดํ์ผ)๋ก ์ง์  ์ค์นํ๋ ๋ฐฉ๋ฒ์๋๋ค.

> ๋ค์ด๋ก๋ SITE: [https://subversion.apache.org/download.cgi](https://subversion.apache.org/download.cgi)
 
- README

  - ๋๋ ํ ๋ฆฌ ๋ฐ ์ฌ์ฉ์ ๊ณ์ ์ ๋ณธ์ธ์ ํ๊ฒฝ์ ๋ง๊ฒ ์ถ๊ฐ ๋๋ ๋ณ๊ฒฝํ์ฌ ์ฌ์ฉ ํ  ๊ฒ

  - bin์ด ์์นํ svn ๋๋ ํ ๋ฆฌ๋ /engn002/tools/svn ์

## svn ๊ด๋ จ ํจํค์ง๋ฅผ ์ค์น ํ  ๋๋ ํ ๋ฆฌ ์์ฑ

$ mkdir /engn002/tools/svn

$ mkdir /engn002/tools/svn/apr

$ mkdir /engn002/tools/svn/apr-util

$ mkdir /engn002/tools/svn/zlib

---

svntemp ๋๋ ํ ๋ฆฌ๋ ์์ํ  tar ํ์ผ๋ค์ ๋ชจ์ ๋์ ๊ณณ

/engn002/temp/svntemp/ ๋๋ ํ ๋ฆฌ์์ tar ํ์ผ ๋ฐ๊ธฐ

$ wget [https://archive.apache.org/dist/subversion/subversion-1.7.14.tar.gz](https://archive.apache.org/dist/subversion/subversion-1.7.14.tar.gz)

$ wget [http://archive.apache.org/dist/apr/apr-1.5.2.tar.gz](http://archive.apache.org/dist/apr/apr-1.5.2.tar.gz)

$ wget [http://archive.apache.org/dist/apr/apr-util-1.5.4.tar.gz](http://archive.apache.org/dist/apr/apr-util-1.5.4.tar.gz)

$ wget [http://www.sqlite.org/sqlite-autoconf-3070603.tar.gz](http://www.sqlite.org/sqlite-autoconf-3070603.tar.gz) --no-check-certificate

$ wget [http://prdownloads.sourceforge.net/libpng/zlib-1.2.8.tar.gz](http://prdownloads.sourceforge.net/libpng/zlib-1.2.8.tar.gz)

---

## subversion ๋ฐ ํจํค์ง tarํ์ผ ์์ถํ๊ธฐ

$ tar xvfz subversion-1.7.14.tar.gz

$ tar xvfz apr-1.7.14.tar.gz

$ cd apr-1.5.2

$ ./configure --prefix=/engn002/tools/svn/apr

$ make && make install

$ make clean

---

apr-util ์ค์น

$ tar xvfz apr-util-1.5.4.tar.gz

$ cd apr-util-1.5.4

$ ./configure --prefix=/engn002/tools/svn/apr-util --with-apr=/engn002/tools/svn/apr

$ make && make install

$ make clean

---

sqlite ์ค์น

$ tar xvfz sqlite-autoconf-3070603.tar.gz

$ cd subversion-1.7.14

$ mkdir sqlite-amalgamation

$ cd ../sqlite-autoconf-3070603

$ cp sqlite3.c ../subversion-1.7.14/sqlite-amalgamation

$ cd ..

$ tar -zxvf zlib-1.2.8.tar.gz

$ cd zlib-1.2.8

$ ./configure --prefix=/engn002/tools/svn/zlib

$ make && make install

$ make clean

---

svn ์ค์น

$ cd subversion-1.7.14

$ ./configure --prefix=/engn002/tools/svn/ --with-apr=/engn002/tools/svn/apr --with-apr-util=/engn002/tools/svn/apr-util --with-zlib=/engn002/tools/svn/zlib --without-berkeley-db

$ make && make install

๋ฒ์  ํ์ธ
$ svn --version

```
svn, version 1.7.14 (r1542130)
   compiled Sep 30 2020, 17:44:04
```


---

## SVN ์๋น์ค ์ค์ 

- repo ์์ฑ

$ cd /engn002/tools

$ mkdir data

$ cd data

$ mkdir svn_repo

$ cd svn_repo

$ ./svnadmin create /engn002/tools/data/svn_repo/server

$ ./svnadmin create /engn002/tools/data/svn_repo/client

$ ./svnadmin create /engn002/tools/data/svn_repo/test

---

svn ๊ณ์  ์์ฑ

$ cd /engn002/tools/data/svn_repo/client/conf

$ vi authz

```
[/]
*=r
svnadm = rw
svnusr = r
```

$ vi passwd

```
[users]
# harry = harryssecret
# sally = sallyssecret
svnadm = rootroot
svnusr = rootroot
```

$ vi svnserve.conf

```
anon-access = none
auth-access = write
password-db = passwd
authz-db = authz
realm = My Repository
```

ํธ์ง ํ  ๋ ๊ณต๋ฐฑ์ด ์์ผ๋ฉด ์๋จ

---

svn ์์

$ cd /engn002/tools/svn/bin

$ ./svnserve -d -r /engn002/tools/data/svn_repo/ --listen-port 3690

๋๋

$ /engn002/tools/svn/bin/./svnserve -d --threads -r /engn002/tools/data/svn_repo

์คํ ์ฌ๋ถ ํ์ธ

$ ps -ef | grep svn

```
root      1444     1  0 19:37 ?        00:00:00 ./svnserve -d -r /engn002/tools/data/svn_repo/ --listen-port 3690
```

์ ์ฅ์ ํ์ธ

$ svn info svn://192.168.56.7/client

```
Path: test
URL: svn://192.168.56.7/test
Repository Root: svn://192.168.56.7/test
Repository UUID: 84e33a9a-f3a9-11ec-a8e9-21ad8211e214
Revision: 0
Node Kind: directory
Last Changed Rev: 0
Last Changed Date: 2022-06-24 19:36:34 +0900 (Fri, 24 Jun 2022)
```

---

## rc.local ์ด์ฉํ์ฌ ๋ถํ ์ SVN ์๋ ์คํ ์ค์ ํ๋๋ฒ

$ chmod +x /etc/rc.d/rc.local

$ vi /lib/systemd/system/rc-local.service

```
[Install]
WantedBy=multi-user.target
```

$ vi /etc/rc.d/rc.local

```bash
su wasadm -c 'svnserve -d -r /engn002/tools/data/svn_repo'
```

```bash
su - wasadm -c 'svnserve -d -r /engn002/tools/data/svn_repo'
su - webadm -c '/engn002/web/apache/bin/apachectl start'
su - wasadm -c 'sh /engn002/was/tomcat8-1/bin/startup.sh'
su - jenkins-app -c 'sh /engn002/tools/jenkins/./start_jenkins.sh'
```

$ systemctl start rc-local.service

$ systemctl enable rc-local.service

---

## ๋ฐฑ์ dump ๋ง๋ค๊ธฐ

dump ์์ฑ

$ย svnadminย dumpย /var/opt/svn/serverย >ย ~/svn_server.dmp

๋ณต๊ตฌ

$ย /programs/sw/svn/bin/svnadminย **load**ย /programs/data/svn_repo/serverย <ย ~/svn_server.dmp

---

## ๋๋ ํ ๋ฆฌ ๊ถํ ๋ฐ ์์ ๊ถ ๋ณ๊ฒฝ

$ cd /engn002

$ chown -R wasadm:www tools/

---

## SVN trunk, tags, branches ๊ธฐ๋ณธ ๋๋ ํ ๋ฆฌ ๋ง๋ค๊ธฐ

$ svn mkdir svn://192.168.56.7/client/trunk

$ svn mkdir svn://192.168.56.7/client/branches

$ svn mkdir svn://192.168.56.7/client/tags

<details>
<summary>[ERROR]</summary>

svn: E205007: Could not use external editor to fetch log message; consider setting the $SVN_EDITOR environment variable or using the --message (-m) or --file (-F) options

svn: E205007: None of the environment variables SVN_EDITOR, VISUAL or EDITOR are set, and no 'editor-cmd' run-time configuration option was found

Solution
$ ~/.bash_profile

```
#Subversion
SVN_EDITOR=/usr/bin/vim
export SVN_EDITOR
```

$ source ~/.bash_profile

- ์ ์ฅ์ ์์ฑํ๊ณ  ํธ์ง๊ธฐ ๋์ค๊ธฐ
    - :q!
    - c ๋๋ฌ์ ์ปจํฐ๋ด
    - ๊ณ์  ๋น๋ฐ๋ฒํธ ์ฒ์์ ๊ทธ๋ฅ ์ํฐ ๋๋ฅด๊ณ 
    - ๊ณ์  ์์ด๋ svnadm
    - ํจ์ค์๋ rootroot
    - ์๋ ฅ ํ ๋
</details>

---

## ์ ์ฅ์ ํ์ธ

$ svn list svn://192.168.56.7/client/

---

## ์ ์ฅ์ ์ญ์ 

svn kill ํ๊ณ  ๋ณธ์ธ์ด ์ง์ ํ repository ๋๋ ํ ๋ฆฌ ์ญ์ ํ๋ฉด ๋จ

$ rm -rf /svn_repos/TestRepo1

---

## SVN ์์ค ๋ด๋ ค๋ฐ๊ธฐ

$ svn co svn://ip ๋๋ ๋๋ฉ์ธ ์ฃผ์/์ ์ฅ์๋ช

๋๋

$ svn checkout svn://ip ๋๋ ๋๋ฉ์ธ ์ฃผ์/์ ์ฅ์๋ช

