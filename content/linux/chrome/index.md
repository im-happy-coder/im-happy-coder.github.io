---
emoji: πΈ
title: CentOS7 Chrome μ€μΉνκΈ°
date: '2022-10-27'
author: μμν΄νΌ
tags: linux centos7 google-chrome chrome
categories: linux
---

## π chrome μ€μΉ

$ wget [https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm](https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm)

$ yum localinstall google-chrome-stable_current_x86_64.rpm

---

## π chrome μ€ν 

μ€μΉλ λμ΄λ€ μλ λͺλ Ήμ΄λ‘ ν¬λ‘¬μ μ€ν μν€μ

```shell
$ google-chrome 
```

---

## πͺ¨ ERROR

λ§μ½ μ€ν μ μλ¬κ° λ°μνλ€λ©΄ μλ λ°©λ²μΌλ‘ ν΄κ²°νμ

$ vi /opt/google/chrome/google-chrome

```bash
λ§¨ λ§μ§λ§ μ½λμμ --no-sandbox μΆκ°ν΄μ μλμ κ°μ΄ λ³κ²½

exec -a "$0" "$HERE/chrome" "$@" --no-sandbox

```

κ·Έλ¦¬κ³  Chromeμ root κ³μ μΌλ‘ μ€ννλ©΄ μλ¬κ° λ°μνλ€κ³  νλ€~

μ λ κ·Έλ₯ λ¬΄μνκ³  rootλ‘ μ€νν¨

μ΄μ°¨νΌ κ°μΈ λ€νΈμν¬μμ λλ§ μ¬μ©νλ κ°λ° μλ²μ¬μ

κ΅³μ΄ λ°©νλ²½ μ€μ νκ³  μ¬μ©μ κ³μ μ λ§λ€ νμκ° μλ€κ³  μκ°ν¨

---

## π alias λ±λ‘

μ΄ λΆλΆμ μν΄λ μκ΄μλ€.

κ·Όλ° μ€μ  ν΄λμΌλ©΄ μ λ§ νΈνλ€~

$  vi ~/.bashrc

```xml
alias chrome='google-chrome > /dev/null 2>&1 &'
```

$ source ~/.bashrc


```toc

```
