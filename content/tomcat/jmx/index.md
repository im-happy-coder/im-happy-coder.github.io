---
emoji: ๐ป
title: tomcat JMX ๋ชจ๋ํฐ๋ง ์ฌ์ฉํ๊ธฐ
date: '2022-09-27'
author: ์์ํดํผ
tags: tomcat jmx monitoring
categories: tomcat
---


- **JMX Set**
    - tomcat/lib ๋๋ ํ ๋ฆฌ์ jmx lib์ ์ถ๊ฐ
    - [https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-catalina-jmx-remote](https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-catalina-jmx-remote)
    - jmx๋ณด๋ ๋ฐฉ๋ฒ์ jdk ๋๋ ํ ๋ฆฌ์์ jconsole ์คํ

## Tomcat ์ค์ 

$ /conf/server.xml ์์  (9840์ ์ ์ํ  ํฌํธ)

```xml
<Listener className="org.apache.catalina.mbeans.JmxRemoteLifecycleListener"

rmiRegistryPortPlatform="9840" rmiServerPortPlatform="9841"/>
```

ID์ ํจ์ค์๋ ์์ด ์ค์ ํ๋ ๋ฒ


$ vi \tomcat\bin\setenv.sh

```bash
JMX_OPTS=" -Dcom.sun.management.jmxremote \

-Dcom.sun.management.jmxremote.authenticate=false \

-Djava.rmi.server.hostname=your_host_ip \

-Dcom.sun.management.jmxremote.ssl=false "

CATALINA_OPTS=" ${JMX_OPTS} ${CATALINA_OPTS}"
```

ID์ ํจ์ค์๋๋ฅผ ์ฌ์ฉํ์ฌ ์ค์ ํ๋ ๋ฒ

```bash
JMX_OPTS=" -Dcom.sun.management.jmxremote \

-Dcom.sun.management.jmxremote.authenticate=true \

-Dcom.sun.management.jmxremote.password.file=$CATALINA_BASE/conf/jmxremote.passwordย  \

-Dcom.sun.management.jmxremote.access.file=$CATALINA_BASE/conf/jmxremote.accessย  \

-Djava.rmi.server.hostname=your_host_ip \

-Dcom.sun.management.jmxremote.ssl=false "
```

์์์ ์ค์ ํ ํฐ์บฃ conf ๋๋ ํ ๋ฆฌ์์ ๊ณ์  ๋ง๋ค๊ธฐ

$ vi conf/jmxremote.access

```bash
tomcat readonly

admin readwrite
```

$ vi  conf/jmxremote.password

```bash
tomcat tomcat

admin rootroot
```

์ด์  Jconsole๋ฅผ ์คํํ์ฌ IP:PORT ์๋ ฅ ํ

ํ๋จ์ ID, ํจ์ค์๋ ์๋ ฅํ๋ฉด ์ ์์ด ๋๋ค.


์ ์์ด ์๋๋ฉดiptables ์ค์งํ๊ธฐ 

$ systemctl status iptables

$ systemctl stop iptables

$ systemctl disable iptables


iptables ์ฌ์ฉํ ๊ฑฐ๋ฉด ํฌํธ ์ด์ด์ฃผ์๋ฉด ๋ฉ๋๋ค.
