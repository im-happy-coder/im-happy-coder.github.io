---
emoji: π°
title: CentOS7 νκ΅­ νμ¬ μκ° λκΈ°ννκΈ°
date: '2022-10-18'
author: μμν΄νΌ
tags: linux centos7
categories: linux
---

μκ° λκΈ°ννλ λ°©λ²μ μ¬λ¬ λ°©λ²μ΄ μμΌλ..

λλΆλΆ μλ²λ₯Ό μ¬μ μνλ©΄ λ μ§μ μκ°μ΄ λ€μ μ΄κΈ°νλμλλ°

μ λ μλ λ°©λ²μΌλ‘ νλκΉ μ΄κΈ°ν λμ§μκ³  μκ΅¬μ μΌλ‘ μ μ©λμμ΅λλ€.


```shell
$ rm -rf /etc/localtime
```

```shell
$ ln -s /usr/share/zoneinfo/Asia/Sesoul /etc/localtime
```

νμΈνκΈ°

```shell
$ date
```
