# Git Server

## Abstract

This report presents the process of setting up a Git server that is accessible via both a private and a public network. The private network can access with a password, while the public network requires ssh-keys for access. The server features a web interface for managing repositories. The setup involves creating a network topology, preparing a Linux server with Git, and configuring a router for network connections. The user interface is built using cgit, running on a Docker container.

## Table of Contents

1. [Introduction](#introduction)
2. [Pre-requisites](#pre-requisites)
3. [Git Server Configuration](#git-server-configuration)
4. [Building UI](#building-the-UI)
5. [Accessing Git Server](#accessing-git-server)
6. [Conclusion](#conclusion)

## Introduction

In this report, we outline the steps we took to deploy a Git Server.
The specificacion of the server is as follows:
- We need to have a Git Server that is accesible via ssh from private network and also public, **but only** the private network can access with password, the public network can only access with ssh-keys.
- The server should have a web interface to manage the repositories.

This is a simple Overview of the full project:

![High Level Topology Diagram](./images/git-topology-diagram.png)

With this Topology we are replicating the connection of a private network and a public network to the server, adding one extra router to our 
private network to simulate the connection to the internet. So, every connection from the public network to the server will be through the router.

## Pre-requisites

Before beginning the deployment, we ensured that the following requirements were met.

- Recreate the topology.
- A linux server with git installed and connected to the private network.
- A router connected to the private network and the public network.
- Device connected to the public network to test the connection to the server.
- Device connected to the private network to test the connection to the server.

## Git Server Configuration

With a superuser account:
1. Create a new user for git
```bash
adduser git
# change the shell to git-shell
chsh -s /usr/bin/git-shell git
```

2. Create a new directory for the repositories
```bash
mkdir /home/git/repositories
chown git:git /home/git/repositories
```

### Configure ssh
We needed to configure ssh via the /etc/ssh/sshd_config file, so we could access with password only with local ips (with `PasswordAuthentication`), but it was not working. **Aparently** in ubuntu there is a default configuration file that only includes a line that overrides your entire sshd_config haha, so after more than 5 hours ( we have a pretty big infrastructure to debug: 1 cisco router, 1 switch, 1 AP, 2 networks, the git server, the virtualization system, the Port Translation rules) we found this file :'). And added the following rules:

```bash
PasswordAuthentication no
Match Address 192.168.1.0/24
    PasswordAuthentication yes
```


## Building the UI

We will use `cgit` to build the web interface for the git server.

1. Install docker
```bash
sudo snap install docker
```

2. Run the cgit container
[ClearLinux cgit image](https://hub.docker.com/r/clearlinux/cgit#!)
[ClearLinux cgit Dockerfile](https://github.com/clearlinux/dockerfiles/blob/master/cgit/Dockerfile)
```bash
docker run --network host -v /home/git/repositories:/var/www/cgit -d --name cgit clearlinux/cgit
```
> Note: this Dockerfile is not only running cgit, it is also running apache2 web server.


## Accessing Git Server
```bash
git clone git@<url-git-sv>:martimolanes/test.git
```

## Create new repo 
```bash
ssh ad@<url-git-sv>
mkdir home/git/martimolanes/<new-dir>.git
cd !$
git init --bare
```

> Note: inside that dir you can edit the description file to change the text displayed in `cgit`

### Accessing UI

To access the web interface, open a web browser and navigate to `http://<server-ip>/cgit`.


## Conclusion

In conclusion, we successfully set up a Git server that can be accessed from both private and public networks using different authentication methods. By utilizing Docker, we were able to easily deploy a web interface using cgit. This setup ensures secure access while providing a user-friendly interface for managing repositories.
