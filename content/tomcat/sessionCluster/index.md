---
emoji: π§³
title: Tomcat Session Clustering (CentOS7)
date: '2022-09-29'
author: μμν΄νΌ
tags: tomcat session clustering Linux CenOS7
categories: tomcat
---

Tomcat Session Clustering

CentOS7 μλ²μμ Tomcat 2λ μΈμ ν΄λ¬μ€ν°λ§

>
> vm1(tomcat1)  ip: 192.168.56.7
> 
> vm2(tomcat2)  ip: 192.168.56.8
> 

---


## πΌ Linux λ©ν°μΊμ€νΈ μΆκ°νκΈ°

```
# vm1, vm2 λ λ€ μΆκ°
route add -net 224.0.0.0 netmask 240.0.0.0 dev enp0s8
```

```
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         10.nate.com     0.0.0.0         UG    100    0        0 enp0s3
default         192.168.nate.co 0.0.0.0         UG    101    0        0 enp0s8
10.0.2.0        0.0.0.0         255.255.255.0   U     100    0        0 enp0s3
192.168.56.0    0.0.0.0         255.255.255.0   U     101    0        0 enp0s8
224.0.0.0       0.0.0.0         240.0.0.0       U     0      0        0 enp0s8
```

- # route μκ΅¬ μ μ© λ°©λ²(μ¬λΆνν΄λ μ μ§)
    - $ vi /etc/sysconfig/network-scripts/route-enp0s8

    ```
    ADDRESS0=224.0.0.0
    NETMASK0=240.0.0.0
    ```

  $ route add -net 224.0.0.0 netmask 240.0.0.0 dev enp0s8

  # μ¬λΆν ν νμΈ

  $ route

## βοΈ  Linux λ©ν° μΊμ€νΈ ν΅μ λλμ§ νμΈνλ λ°©λ²

$ wget -O /usr/bin/iperf [https://iperf.fr/download/ubuntu/iperf_2.0.9](https://iperf.fr/download/ubuntu/iperf_2.0.9)

$ chmod +x /usr/bin/iperf

$ iperf -s -u -B 228.0.0.4 -i 1 -p 45564

$ iperf -c 228.0.0.4 -u -T 32 -t 3 -i 1 -p 45564

## π Tomcat μ€μ  λ³κ²½

tomcat1, tomcat2 λ λ€ λκ°μ΄ μ μ©

### π₯ web.xml μμ 

web.xmlμ κ²½λ‘λ 2κ°μ§κ° μμ(κ± λ λ€ μΆκ°)

$ conf/web.xml

$ webapps/ROOT/WEB_INF/web.xml

```
<distributable/>
```

### βοΈ  server.xml μμ 

$ vi conf/server.xml

μλ²μ IPκ° λ€λ₯΄λ©΄ port λ²νΈλ κ°μλ μκ΄μμ΄μ

```xml
<Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster"/>

<Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster"
                 channelSendOptions="8">

          <Manager className="org.apache.catalina.ha.session.DeltaManager"
                   expireSessionsOnShutdown="false"
                   notifyListenersOnReplication="true"/>

          <Channel className="org.apache.catalina.tribes.group.GroupChannel">
            <Membership className="org.apache.catalina.tribes.membership.McastService"
                        address="228.0.0.4"
                        port="45564"
                        frequency="500"
                        dropTime="3000"/>
            <Receiver className="org.apache.catalina.tribes.transport.nio.NioReceiver"
                      address="192.168.56.7"
                      port="4000"
                      autoBind="100"
                      selectorTimeout="5000"
                      maxThreads="6"/>

            <Sender className="org.apache.catalina.tribes.transport.ReplicationTransmitter">
              <Transport className="org.apache.catalina.tribes.transport.nio.PooledParallelSender"/>
            </Sender>
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.TcpFailureDetector"/>
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.MessageDispatchInterceptor"/>
          </Channel>

          <Valve className="org.apache.catalina.ha.tcp.ReplicationValve"
                 filter=""/>
          <Valve className="org.apache.catalina.ha.session.JvmRouteBinderValve"/>

          <Deployer className="org.apache.catalina.ha.deploy.FarmWarDeployer"
                    tempDir="/tmp/war-temp/"
                    deployDir="/tmp/war-deploy/"
                    watchDir="/tmp/war-listen/"
                    watchEnabled="false"/>

          <ClusterListener className="org.apache.catalina.ha.session.ClusterSessionListener"/>
        </Cluster>
```


---

μμ λ°©λ² λμ  μλ λ°©λ²μΌλ‘λ κ°λ₯

## βοΈ  StaticMember μ€μ μΌλ‘ μΈμ ν΄λ¬μ€ν°λ§ λ°©λ²

staticMemberμ€μ μΌλ‘ ν  κ²½μ° μμμ μ€μ ν Linuxμ Multicast routeλ₯Ό μΆκ°ν  νμ μμ΅λλ€.

$ vi conf/server.xml

```xml
<!-- channelSendOptions κ°μ΄ 6:λκΈ° λ°©μ 8:λΉλκΈ° λ°©μ
        8:λΉλκΈ° λ°©μ μ¬μ©μ Receiverμ selectorTimeoutμ 5000(5μ΄) μ΄μμΌλ‘ μ€μ  κΆμ₯ -->
        <Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster"
                 channelSendOptions="6" channelStartOptions="3">

          <!-- Delta Manager -->
          <Manager className="org.apache.catalina.ha.session.DeltaManager"
                   expireSessionsOnShutdown="false"
                   notifyListenersOnReplication="true"/>

          <!-- Backup Manager
          <Manager className="org.apache.catalina.ha.session.BackupManager"
                   expireSessionsOnShutdown="false"
                   notifyListenersOnReplication="true"
                   mapSendOptions="6"/>
          -->

          <Channel className="org.apache.catalina.tribes.group.GroupChannel">

            <!-- Multicast Member -->
            <!--
            <Membership className="org.apache.catalina.tribes.membership.McastService"
                        address="${tomcat.cluster.member.address}"
                        port="${tomcat.cluster.member.port}"
                        frequency="500"
                        dropTime="3000"/>
            -->

            <Receiver className="org.apache.catalina.tribes.transport.nio.NioReceiver"
                      address="192.168.56.7"
                      port="4000"
                      selectorTimeout="100"
                      maxThreads="6"/>

            <Sender className="org.apache.catalina.tribes.transport.ReplicationTransmitter">
              <Transport className="org.apache.catalina.tribes.transport.nio.PooledParallelSender"/>
            </Sender>

            <!-- μ΄ μΈν°μν°λ λͺ¨λ  λΈλμ νμΌλ‘ μ²΄ν¬λ₯Ό ν΄μ£Όλ μΈν°μν°μ΄λ€.
                 μ΄ μΈν°μν°λ λ€λ₯Έ λΈλκ° ν΄λ¬μ€ν°λ₯Ό λ λ¬μ λ λͺ¨λ  λΈλκ° μΈμ ν  μ μλλ‘ λ€λ₯Έ λΈλλ₯Ό ping μ²΄ν¬νλ€.
                 μ΄ ν΄λμ€κ° μμΌλ©΄ ν΄λ¬μ€ν°κ° μ λλ‘ μλνλ κ²μ²λΌ λ³΄μΌ μ μμ§λ§ λΈλλ₯Ό μ κ±°νκ³  λ€μ λμνλ©΄ μΈμ λ³΅μ κ° μ€λ¨ λ  μ μλ€.
                 TcpFailureDetectorλ³΄λ€ μμͺ½μ μμΉνμ¬μΌ νλ€. -->
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.TcpPingInterceptor"/>
            
            <!-- λ©€λ²κ° λ°μ΄ν° ν΅μ  μ€λ₯ λλ μκ° μ΄κ³Όλ±μ λ¬Έμ κ° λ°μνμμμ κ°μ§νλ μΈν°μν° -->
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.TcpFailureDetector"/>
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.MessageDispatchInterceptor"/>
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.ThroughputInterceptor"/>

            <!-- StaticMember μΈν°μν°λ λ©ν°μΊμ€νλ©€λ² λμ μ κ³ μ κ°μΌλ‘ μ¬μ©ν λ μ μΈνλ€. -->
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.StaticMembershipInterceptor">
              <!-- μκΈ°μμ  μ μΈ
                   9.0.17 λ²μ  μ΄νλ‘λ LocalMemberλμ  Memberλ‘ λμΌνκ² μ€μ ν΄λ λλ€.
                   https://tomcat.apache.org/tomcat-9.0-doc/config/cluster-membership.html#Setting
              -->
              <LocalMember className="org.apache.catalina.tribes.membership.StaticMember"
                           domain="staging-cluster"
                           uniqueId="{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1}"/>

              <!-- κ³ μ λ©€λ²λ‘ μ μΈν  λ€λ₯Έ λΈλ μ λ³΄ -->
              <Member className="org.apache.catalina.tribes.membership.StaticMember"
                      port="4010"
                      securePort="-1"
                      host="192.168.56.8"
                      domain="staging-cluster"
                      uniqueId="{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,2}"/>
            </Interceptor>

          </Channel>

          <!-- ν΄λΉ νν°μ ν¬ν¨λλ μμ²­μ μΈμλ°μ΄ν° κ°±μ μμ μ μΈνλ€ -->
          <Valve className="org.apache.catalina.ha.tcp.ReplicationValve"
                 filter=".*\.gif|.*\.js|.*\.jpeg|.*\.jpg|.*\.png|.*\.htm|.*\.html|.*\.css|.*\.txt"/>

          <!-- route λ³κ²½μ νμ¬ jvmRouteλ₯Ό λ³κ²½ν΄μ£Όλ λ°ΈλΈ.
               μ΄κ² μλκ²½μ° routeκ° λ³κ²½λμ΄λ jvmRouteκ°μ΄ μ μ§λμ΄ failbackν¨κ³Όλ₯Ό μ λνλ€ -->
          <Valve className="org.apache.catalina.ha.session.JvmRouteBinderValve"/>

          <!-- ν΄λ¬μ€ν° λΈλκ° μλλ°°ν¬λ₯Ό μν λνλ‘μ΄μ΄ μΌλ°μ μΌλ‘ μ¬μ©νμ§ μμΌλ©° <Host μλ¦¬λ¨ΌνΈμ λ£μ΄μΌ μ μ λμν¨
          <Deployer className="org.apache.catalina.ha.deploy.FarmWarDeployer"
                    tempDir="/tmp/war-temp/"
                    deployDir="/tmp/war-deploy/"
                    watchDir="/tmp/war-listen/"
                    watchEnabled="false"/>
          -->

          <!-- DeltaManager μ¬μ©μ νμν¨ -->
          <ClusterListener className="org.apache.catalina.ha.session.ClusterSessionListener"/>
        </Cluster>
```

---

## βοΈ  SessionClustering Test Source Code

$ vi webapps/ROOT/index.jsp

```jsx
<%@page import="java.util.ArrayList"%>

<%@page import="java.util.Date"%>

<%@page import="java.util.List"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html>

<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>JSP Page</title>

</head>

<body>

<FONT size = 5 COLOR="#0000FF">

Instance 2 <br/><br/>

</FONT>

<hr/>

<FONT size = 5 COLOR="#CC0000">

<br/>

Session Id : <%=request.getSession().getId()%> <br/>

Is it New Session : <%=request.getSession().isNew()%><br/>

Session Creation Date : <%=new Date(request.getSession().getCreationTime())%><br/>

Session Access Date : <%=new Date(request.getSession().getLastAccessedTime())%><br/><br/>

</FONT>

<b>Data List </b><br/>

<hr/>

<ul>

<%

String sName = request.getParameter("sName");

List<String> listOfName = (List<String>) request.getSession().getAttribute("Name");

if (listOfName == null) {

listOfName = new ArrayList<String>();

request.getSession().setAttribute("Name", listOfName);

}

if (sName != null) {

listOfName.add(sName);

request.getSession().setAttribute("Name", listOfName);

}

for (String name : listOfName) {

out.println("<li>"+name + "</li><br/>");

}

%>

</ul>

<hr/>

<form action="index.jsp" method="post">

Name <input type="text" name="sName" />

<input type="submit" value="Add to Cart"/>

</form>

<hr/>

</body>

</html>
```

---

## π μΈμν΄λ¬μ€ν°λ§ μ μ μ¬λΆ νμΈ

λΈλΌμ°μ λ‘ μλ²IP:ν°μΊ£ν¬νΈ μ μ ν ν

tomcat 1,2 μ€ν μνμμ

ν°μΊ£ 1μ μΈμ λ°μ΄ν° κ° μλ ₯ν ν ν°μΊ£1 μ’λ£

μλ‘κ³ μΉ¨ν΄μ ν°μΊ£2 λ°μ΄ν°κ° μλ μ§ νμΈνκ³ 

ν°μΊ£1 μ€ν ν μλ‘κ³ μΉ¨ν΄μ ν°μΊ£1 μΈμ λ°μ΄ν° κ°μ΄ κ·Έλλ‘ μ μ§λλ©΄ μ±κ³΅

---

μ£Όμ!

κ°λ μΈμ ν΄λ¬μ€ν°λ§μ΄ λ°λ‘ μλλ κ²½μ°κ° μλ€..

λ€λ₯Έ μ€μ μ λ¬Έμ κ° μλ€λ©΄..

5λΆ μ λ κΈ°λ€λ Έλ€κ° λ€μ μλ‘κ³ μΉ¨ ν΄μ νμΈνλ©΄ λ  λκ° μμ΅λλ€.

---


```toc

```
