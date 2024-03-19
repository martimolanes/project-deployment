# FreePBX and Zoiper

## Abstract

This report presents the process of setting up a FreePBX which is a GUI that manages Asterisk to use Voice over Internet Protocol (VoIP) and telephony server and also Zoiper which is a software application that provides VoIP functionality for desktop computers and mobile devices. It supports SIP (Session Initiation Protocol) which signals and enables connection between endpoints and manages elements of the call.

## Table of contents

1. [Introduction](#introduction)
2. [Pre-requisites](#pre-requisites)
3. [VoIP service on the private network](#voip-service-on-the-private-network)
4. [Setting up FreePBX](#setting-up-freepbx)
5. [Setting up Zoiper](#setting-up-zoiper)
6. [Issues with the FreePBX server](#issues-with-the-freepbx-server)
7. [Conclusion](#conclusion)

## Introduction

In this report we provide the steps we took to setup the FreePBX and Zoiper client.

The specific steps are as follows:
- Set up a FreePBX server on a virtual machine
- Create extentions (Users) on the server.
- Set up the Zoiper client on a mobile device and a desktop computer. 

## Pre-requisites

Before using the Zoiper client, you need to have the following:

- A virtual machine with FreePBX installed and running.
- A mobile device or a desktop computer.
- Devices connected to the same network as the FreePBX server.

## VoIP service on the private network

![Voip-image](./images/VoIP-deploy.png)

## Setting up FreePBX

1. Install FreePBX from the official website [here](https://www.freepbx.org/downloads/).

2. Set up a virtual machine with FreePBX ISO.

Now you can access the server and set up the users for the Zoiper client in the WEB UI.

> Follow the administration guide on how to set up the users for the Zoiper client [here](#freepbx-administrator-guide).


## Setting up Zoiper

To set up the Zoiper client you can follow the user guide [here](#zoiper-user-guide).

## Issues with the FreePBX server

After running the virtual machine and logging in to the linux server, we have encountered the following issues:

- After 5 minutes of running, FreePBX would enable its firewall which would block from accessing the WEB UI.

- The network adapter is set to Bridged mode, but the server was not accessible from the host machine.

> To solve this issue we have disabled `Fail2Ban` service with a command `service fail2ban stop`.

## Conclusion

In this report we have presented the process of setting up a FreePBX server and Zoiper client. We have also encountered some issues with the FreePBX server and provided the solution to the issues.

# Guides

# FreePBX Administrator guide

### Accessing the server

1. Access the FreePBX server WEB UI from your browser.

2. Select `FreePBX Administration`.

3. Login with your administrator credentials.

### Setting up the account for the user

1. Follow the navigation bar: `Applications -> Extentions` .

2. Press on `Add Extention` and select `Add New SIP [chain_pjsip] Extention`.

3. **User Extention**: Type in the users phone number that will be used to reach the user.

4. **Display Name**: Set users Name that will be displayed in the call.

5. **Secret**: Set the password for the user to login to the Zoiper client.

6. Click submit at the right bottom of the screen.

7. After redirection to `Extentions` screen press **Apply Config** in the navigation bar.

### Provide the created account details to access Zoiper

**Username**: `Phone Number`@`{server_ip}`

**Password**: `Secret`

---

# Zoiper User guide

Zoiper is a softphone that allows you to make and receive calls from your computer. It is available for Windows, Mac, and Linux.

## Installation

1. Download Zoiper from the [Zoiper website](https://www.zoiper.com/en/voip-softphone/download/current).

> **Note:** Zoiper is available in the Play Store and App Store for mobile devices.

2. You need to provide the following information to create an account on Zoiper:
   - Username: Provided by the administrator.
   - Password: Provided by the administrator.
   - Domain: The ip of the server or the domain name provided by the administrator.

3. Skip the authentication and proxy settings.

4. Give appropriate permissions to Zoiper.

## Making a call

1. Open Zoiper.

2. Click the dial pad icon.

3. Enter the username you want to call.

4. Call the user!

