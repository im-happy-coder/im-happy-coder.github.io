---
emoji: π
title: docker μ»¨νμ΄λ μ μ²΄ μ€ν λͺλ Ήμ΄
date: '2022-10-24'
author: μμν΄νΌ
tags: docker command
categories: docker
---

λμ»€ μ»¨νμ΄λ μ μ²΄ μμ

```shell
$ docker start $(docker ps -a -q)
```

λμ»€ λͺλ Ήμ΄ μλ μμ±ν΄μ£Όλ ν¨ν€μ§ μ€μΉνκΈ°

```shell
$ yum install -y bash-completion
```

μ€μΉ ν μ¬λΆννκ³  docker μ»€λ§¨λ μλ ₯ν  λ tabν€ λλ₯΄λ©΄ μλμΌλ‘ μμ±λλ€.

docker-compose  νμΌ μ¬λ¬κ° μ€ν

```shell
$ docker-compose -f νμΌλͺ -f νμΌλͺ -f νμΌλͺ
```
