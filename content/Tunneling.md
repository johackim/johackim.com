---
title: Multiple ways to expose a local server behind NAT or firewall
permalink: how-to-expose-local-server-behind-firewall
description: I looked for solutions to expose a local server behind a NAT or firewall. Here's what I found.
datePublished: 2017-08-14T12:20
dateUpdated: 2017-08-14T12:20
aliases:
  - Multiple ways to expose a local server behind NAT or firewall
publish: true
rss: true
---

> [!INFO]
> Archived content

I looked for solutions to expose a local server behind a NAT or firewall. Here's what I found.

## Solution 1: VPN with port forwarding (with docker)

For this solution, you must have a server outside your local network, a [scaleway C1 server](https://scaleway.com/pricing/) is enough.

### 1. Install VPN on your server with docker (server-side)

```bash
CID=$(docker run -d --name dockvpn --restart=always --privileged --net=host ston3o/dockvpn)
```

```bash
docker run -t -i -p 8080:8080 --volumes-from $CID ston3o/dockvpn serveconfig
```

### 2. Port forwarding (server-side)

```bash
iptables -A PREROUTING -t nat -i eth0 -p tcp -d <src_ip> -j DNAT --to-destination <dest_ip>
```

### 3. Download ovpn file and connect to your VPN (client-side)

Go to [http://server:8080](http://server:8080) and execute `openvpn myvpn.ovpn`

## Solution 2: VPN with dedicated IP

You can use a VPN like [purvpn](https://purevpn.com/dedicated-ip.php) to obtain a dedicated IP for 1,99$ per month or [ipjetable](https://ipjetable.net/) for free.

## Solution 3: UPNP

You can open ports with UPNP protocol (only 1024-65535 ports are allowed):

```bash
upnpc -a <ip> <port> <external_port> <protocol>
```

Example: `upnpc -a 192.168.1.25 8888 8888 tcp`

## Solution 4: tor2web

Use tor network and tor2web to expose your web server:

1. Install tor: `apt-get install tor`
2. Bind your web server with tor

```conf
# /etc/tor/torrc
HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServicePort 80 127.0.0.1:80
```

1. Start tor: `systemctl start tor`
2. Get your hostname.onion `cat /var/lib/tor/hidden_service/hostname`
3. Go to your website *.onion.sh (tor2web)

## Solution 5: Tunnels

- [ngrok](https://ngrok.com/)
- [pagekite](https://pagekite.net/)
- [localtunnel](https://localtunnel.me/)
- [yaler](https://yaler.net/)
- [pico](https://github.com/andydunstall/pico)
- [portr](https://github.com/amalshaji/portr)
- [bore](https://github.com/ekzhang/bore)
- [pangolin](https://github.com/fosrl/pangolin)
- [[Zerotier]]
- Cloudflare Tunnel
- AWS Direct Connect