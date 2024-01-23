# Deployment of a Corporate Private Network
## Abstract
This report details process of deploying a private network in Linux. The objective was to simulate a real-world corporate network environment, providing valuable insights into network setup, management, and troubleshooting. Key findings include planning the network deployment, understanding the interplay between different network components, and the challenges involved in configuring network services.

## Table of Contents
1. [Introduction](#introduction)
2. [Virtual Deployment](#virtual-deployment)
3. [Real Deployment](#real-deployment)
4. [Network Services](#network-services)
5. [Conclusion](#conclusion)
6. [Appendix](#appendix)

## Introduction
This report presents the design and deployment of a private network, both virtually and physically, for a simulated corporate environment. Using VirtualBox, pfSense, Ubuntu, and Cisco hardware, we aim to establish a network at least with two PCs, a SAMBA server, and a client.

## Virtual Deployment
For the Virtual Deployment, we used VirtualBox to create 4 VMs: 1 Ubuntu Server (SAMBA/AD server), 1 pfSense (router), and 1 Ubuntu Desktop (another client).

The topology of the network is as follows:
![Virtual Network Topology](./images/virtual-network-topology.png)

> Bridged: Used for connecting pfSense to internet if it were a real router. The connection through the host machine is transparent. Note: We could have used NAT.

> inet (Internal Network): Used for connecting VMs to each other.

## Real Deployment
For the Real Deployment, we used Cisco hardware to create a network with 3 PCs (1 SAMBA/AD server, and 2 client).

The topology of the network is as follows:
![Real Network Topology](./images/real-network-topology.png)
> Note: The topology is the same as the virtual network, except that the pfSense router is replaced with a Cisco router.

## Network Services

#### pfSense
We downloaded an ISO image of pfSense from the official website and installed it on a VM. We configured the VM to have 2 network interfaces: one connected to the internet (Bridged Adapter), and one connected to the internal network (inet).

#### DHCP
In the virtual network, we used pfSense to provide DHCP services. In the real network, we used a Cisco router to provide DHCP services.

#### SAMBA/AD
We use an Ubuntu Server instance to deploy an Active Directory Domain Controller. Also, the `samba-tool` command to configure the domain controller and to create users and groups. The main configuration is in the `smb.conf` file to configure the SAMBA server.

### Configurations
We need to configure the following files:
- pfSense(virtual deployment): 
    - DHCP works by default. (Only configure clients network, in this case `netplan`).
    - DNS default. (Only specify the DNS server in clients)
    - Firewall -> all HTTP connections open.
- [netplan.yml clients](./netplan.yml)
- [smb.conf](./smb.conf)
- AD is manually configured with `samba-tool` command.

## Conclusion
- The project was a success in our learning journey of network, linux and services deployment. We unified a lot of concepts, learning new ones at the same time, we built a good teamworking environment.

- It was challenging to do all the deploy in linux, but at the same time it was very rewarding.

- Potentials improvements could be:
    - Add a Windows client to the network. (It IS possible with the current setup).
    - Configure a more restrictive firewall.
    - Configure a VPN for accesing this private network from the outside of the network.

## Appendix
[pfSense](https://docs.netgate.com/pfsense/en/latest/general/what-is-pfsense.html)

[Ubuntu Server](https://ubuntu.com/server)

[Samba](https://www.samba.org/samba/what_is_samba.html)

[Configure Samba-based AD](https://www.considerednormal.com/2022/11/samba-based-active-directory-on-ubuntu-22-04/)

[samba-tool](https://www.samba.org/samba/docs/current/man-html/samba-tool.8.html)

[cisco-dhcp](https://www.cisco.com/en/US/docs/ios/12_4t/ip_addr/configuration/guide/htdhcpsv.html)

[source-docs](https://github.com/martimolanes/project-deployment)
