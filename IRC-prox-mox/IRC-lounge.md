# IRC Server Deployment Project

## Abstract

This project involves deploying an IRC server for instant messaging, requiring research on IRC components. Using Irssi client for linux CLI and a self-hosted IRC InspIRCd server and a web client (thelounge).

## Table of contents

1. [Introduction](#introduction)
2. [Research and Familiarization](#research-and-familiarization)
3. [Deployment](#deployment)
    - [Server Setup](#irc-server-deployment)
    - [Client Setup](#client-setup)
4. [HOW TO ACCESS](#how-to-access)
4. [Conclusion](#conclusion)
5. [Appendix](#appendix)

---

## Introduction

Internet Relay Chat (IRC) is a text-based chat system for instant messaging. IRC is designed for group communication in discussion forums, called channels, but also allows one-on-one communication via private messages.

This is implemented as an application layer protocol.

## Research and Familiarization
   - Understand the components of IRC, including clients, servers, communication protocols.
   
   For this project, we wanted to have a IRC Server in the XAMK network. This network is private, only accessible from some classes of the campus. 

   We wanted to self-host a client for the IRC Server, finding one called [The Lounge](https://thelounge.chat/). IRC Server called [InspIRCd](https://www.inspircd.org/) filled our needs for the server with their docker image. Also, for a terminal client, we executed [Irssi](https://irssi.org/).

## Deployment

### Server Setup

#### InspIRCd

We deployed the IRC Server in a proxmox-vm, using the [docker image InspIRCd](https://hub.docker.com/r/inspircd/inspircd-docker/dockerfile/). With the simple command:

```bash
sudo docker run -d --name ircd -p 6667:6667 inspircd/inspircd-docker
```

### Client Setup

#### The Lounge

We self-host the web client [The Lounge](https://thelounge.chat/) in the same proxmox-vm as the server. In this case, instead of deploying a docker image like in the server, we installed it as a debian package.

> This is not recommended for production, but 'cause we wanted to experience how different is a installation in a fresh vm over a docker image; this caused several problems:<br>- apt repositories didn't have support for the node version required by thelounge, so we had to install it manually and force the `dpkg` installation with `force-all`<br>- deal with permissions errors.

Then, we managed to execute the web client in the port 9000 and execute it as a `systemctl` service ([thelounge.service](./thelounge.service)).

config file: [config.js](./config.js)

#### Irssi

We installed the terminal client [Irssi](https://irssi.org/) in a linux machine.

## HOW TO ACCESS 

Our server is deployed in the XAMK network, with the following address `172.20.49.11`.

**(RECOMMENDED)** If you want to connect to the server, you can use the web client [The Lounge](https://thelounge.chat/) in the following address: [172.20.49.11:9000](http://172.20.49.11:9000).

> Address already configured to access the server.

> The Lounge offer support for multiple devices through a web browser, it supports [PWA](https://en.wikipedia.org/wiki/Progressive_web_app) so it's possible to install it as a native app in your phone.

If you want to use [Irssi](https://irssi.org/) do it with the following commands:

 `/connect 172.20.49.11`<br>
 `/channel #general`<br>
 `/nick <your-nick>`<br>
 `/msg #general <your-message>`<br>

## Conclusion

## Appendix

[IRC](https://en.wikipedia.org/wiki/Internet_Relay_Chat)

[InspIRCd](https://www.inspircd.org/)

[The Lounge](https://thelounge.chat/)

[Irssi](https://irssi.org/)

[docker image InspIRCd](https://hub.docker.com/r/inspircd/inspircd-docker/dockerfile/)
