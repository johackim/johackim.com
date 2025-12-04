---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: installer-grafana-et-prometheus-avec-docker-swarm
publish: true
rss: true
note: 71
---

Pour monitorer une infrastructure, il existe Grafana et Prometheus.

Prometheus se chargera de collecter les données (CPU, RAM, DISK, etc..) des différents serveurs, et Grafana les affichera sur un dashboard.

Installer [[Docker Swarm]] et [[Traefik]] puis créez et démarrez la stack Docker `monitoring.yml` :

```yaml
# monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:v2.27.0
    entrypoint: /bin/sh -c '/bin/sh -c "$${@}"'
    command:
      - /bin/sh
      - -c
      - |
        chown -R 65534:root /prometheus
        wget --no-cache -qnc https://raw.githubusercontent.com/johackim/stacks/v2/configs/prometheus.yml -O /etc/prometheus/prometheus.yml
        prometheus --config.file=/etc/prometheus/prometheus.yml \
        --storage.tsdb.path=/prometheus \
        --storage.tsdb.retention.time=7d \
        --web.console.libraries=/usr/share/prometheus/console_libraries \
        --web.console.templates=/usr/share/prometheus/consoles \
        --web.route-prefix=/prometheus \
        --web.external-url=${SCHEME:-http}://${DOMAIN:-grafana.localhost}/prometheus
    volumes:
      - ${VOLUME_PATH}prometheus:/prometheus
      - ${VOLUME_PATH}config:/etc/prometheus/
    deploy:
      labels:
        - traefik.enable=true
        - traefik.http.routers.grafana-prom-${NUMBER:-1}.rule=Host(`${DOMAIN:-grafana.localhost}`) && PathPrefix(`/prometheus/`)
        - traefik.http.routers.grafana-prom-${NUMBER:-1}.entrypoints=${SCHEME:-http}
        - traefik.http.routers.grafana-prom-${NUMBER:-1}.service=grafana-prom-${NUMBER:-1}
        - traefik.http.routers.grafana-prom-${NUMBER:-1}.tls.certresolver=letsencrypt
        - traefik.http.services.grafana-prom-${NUMBER:-1}.loadbalancer.server.port=9090
        - traefik.http.routers.grafana-prom-${NUMBER:-1}.middlewares=grafana-prom-${NUMBER:-1}-auth
        - traefik.http.middlewares.grafana-prom-${NUMBER:-1}-auth.basicauth.users=${PROMETHEUS_USER:-admin}:${PROMETHEUS_PASSWORD:-htpasswd}
    networks:
      - internal
      - traefik

  grafana:
    image: grafana/grafana:7.5.6
    user: root
    environment:
      - GF_SMTP_ENABLED=true
      - GF_SMTP_FROM_ADDRESS=${SMTP_FROM:-noreply@example.com}
      - GF_SMTP_HOST=${SMTP_HOST:-mail.service.host:587}
      - GF_SMTP_PASSWORD=${SMTP_PASSWORD:-myp@ssw0rd}
      - GF_SMTP_USER=${SMTP_USERNAME:-noreply@example.com}
      - GF_SERVER_ROOT_URL=${SCHEME:-http}://${DOMAIN:-grafana.localhost}
    volumes:
      - ${VOLUME_PATH}grafana:/var/lib/grafana
    deploy:
      labels:
        - traefik.enable=true
        - traefik.http.routers.grafana-${NUMBER:-1}.rule=Host(`${DOMAIN:-grafana.localhost}`)
        - traefik.http.routers.grafana-${NUMBER:-1}.entrypoints=${SCHEME:-http}
        - traefik.http.routers.grafana-${NUMBER:-1}.service=grafana-${NUMBER:-1}
        - traefik.http.routers.grafana-${NUMBER:-1}.tls.certresolver=letsencrypt
        - traefik.http.services.grafana-${NUMBER:-1}.loadbalancer.server.port=3000
    networks:
      - internal
      - traefik

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:v0.37.5
    command: -docker_only=true
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:rw
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    deploy:
      mode: global
    networks:
      - internal

  node-exporter:
    image: prom/node-exporter:v1.1.2
    hostname: "{{.Node.Hostname}}"
    volumes:
      - /sys:/host/sys:ro
      - /:/rootfs:ro
      - /proc:/host/proc:ro
      - /etc/hostname:/etc/hostname
      - /mnt:/mnt:ro
    environment:
      - NODE_ID={{.Node.ID}}
    command:
      - '--path.sysfs=/host/sys'
      - '--path.procfs=/host/proc'
      - '--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|host|etc)($$|/)'
      - '--no-collector.ipvs'
    deploy:
      mode: global
      resources:
        limits:
          memory: 128M
        reservations:
          memory: 64M
    networks:
      - internal

volumes:
  config:
  grafana:
  prometheus:

networks:
  internal:
    driver: overlay
    attachable: true
  traefik:
    external: true
    name: traefik-net
```

PS: Si vous souhaitez accéder à Grafana en http plutôt qu'en https, commentez la ligne `traefik.http.routers.grafana.tls.certresolver=letsencrypt`.

```bash
docker stack deploy -c monitoring.yml monitoring
```

Une fois installé vous pouvez vous rendre sur http://grafana.localhost avec les identifiants `admin:admin` et ajoutez prometheus en tant que Data Source.

Vous pouvez ensuite ajouter un dashboard pour monitorer vos serveurs (Conteneurs, CPU, RAM, stockage, etc...).

Voici [mon Dashboard](https://drive.proton.me/urls/Z1YKM1G9ZW#W8MCYJZH33f3) si vous souhaitez vous en inspirer.