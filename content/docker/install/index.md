---
emoji: ๐ฌ
title: Docker ์ค์น (CentOS7)
date: '2022-11-05'
author: ์์ํดํผ
tags: linux centos7 docker install
categories: docker
---

Docker Install

## ๐ Docker Install

- script๋ฅผ ์ด์ฉํ ์ต์ ๋ฒ์  ์ค์น
    - curl -sSL [https://get.docker.com](https://get.docker.com/) | sh


- ํจํค์ง ๋งค๋์ ๋ฅผ ์ด์ฉํ ์ค์น
    - docker์ด์์ ํ์ํ ํ์ ํจํค์ง ์ค์น
        - $ yum install -y yum-utils device-mapper-persistent-data lvm2
    - dokcer repository ์ถ๊ฐ
        - $ yum-config-manager --add-repo [https://download.docker.com/linux/centos/docker-ce.repo](https://download.docker.com/linux/centos/docker-ce.repo)
    - docker ์ค์น๊ฐ๋ฅ ๋ฒ์  ํ์ธ
        - $ yum list docker-ce --showduplicates
    - docker ์ต์ ๋ฒ์  ์ค์น
        - $ yum install -y docker-ce
    - ํน์  docker ๋ฒ์  ์ค์น
        - $ yum install -y docker-ce-20.10.6

## ๐ ๋ฐฉํ๋ฒฝ ํด์ 

$ systemctl stop firewalld

$ systemctl disable firewalld

$ /etc/selinux/config ํ์ผ ํธ์ง

```shell
SELINUX=disabled
```

## ๐ docker ๋ฐ๋ชฌ์ ์์ํ๊ณ  ์์คํ ๋ถํ ์์ ์๋ ์์

$ systemctl enable docker

$ systemctl start docker

$ systemctl status docker

## ๐ ๋์ปค ๋ช๋ น์ด ์๋ ์์ฑ

$ yum install -y bash-completion

์์ ํจํค์ง๋ฅผ ์ค์นํ๊ณ  ์ปค๋งจ๋๋ผ์ธ์ "doc"๋ง ์๋ ฅํ๊ณ  tabํค๋ฅผ ๋๋ฅด๋ฉด "docker"๊ฐ ์๋ ฅ๋๋ ๊ฒ์ ๋ณผ ์ ์๋ค.

์ฌ๋ถํ ํด์ผ ์ ์ฉ๋จ


```toc

```
