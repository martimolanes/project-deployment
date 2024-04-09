# Moodle server

## Abstract

This project involves the implementation of a Moodle server, which is designed to run on an Ubuntu server virtual machine. The server employs Apache as the web server and uses MariaDB for data storage. This setup is integrated with an externally hosted Active Directory on a Windows server for user authentication. The system is designed to accommodate two types of users: Employees and Stakeholders. Employees have the ability to create courses and enroll visitors, thereby managing the educational content and participant engagement. On the other hand, Stakeholders have permissions to view these courses and interact with their content, facilitating an exchange of knowledge and ideas.

## Table of contents
 - [Introduction](#introduction)
 - [Installation](#installation)
 - [Moodle server configurations to integrate LDAP](#moodle-server-configurations-to-integrate-ldap)
 - [Adding users to Active Directory](#adding-users-to-active-directory)
 - [Encountered issues](#encountered-issues)
 - [Conclusion](#conclusion)
 - [References](#references)

## Introduction

Moodle is a free and open-source learning management system (LMS) written in PHP and distributed under the GNU General Public License. It's used for blended learning, distance education, flipped classroom, and other e-learning projects in schools, universities, workplaces, and other sectors.

## Installation

This section provides prerequisites and installation instructions for setting up the Moodle server and integrating it with an Active Directory server.

### Prerequisites
- Ubuntu server 20.04 LTS on a virtual machine.
- Apache web server.
- MariaDB database.
- Windows server 2019 on a virtual machine.

### Installing Moodle server

1. Installed `Ubuntu server 20.04 LTS` on a virtual machine.
2. Installed Apache web server and set up MariaDB database.
3. Downloaded Moodle from the official website [here](https://download.moodle.org/).
4. Followed the moodle documentation to set up the configurations.

### Installing LDAP server using MS Active Directory

1. Installed `Windows server 2019` on a virtual machine.
2. Set the network interface to bridged mode.
2. Configured Active Directory Domain Services (AD DS) on the server.
3. Created firewall rule to allow inbound connections to `389` PORT.
3. Created bind user for Moodle server to connect to the AD server.
4. Created groups for Employees and Stakeholders in the AD server.


## Moodle server configurations to integrate LDAP

After setting up the Active Directory server, the following configurations were made to integrate it with the Moodle application for Authentication.

The Moodle was configured to connect to LDAP with MS Active Directory server. The following settings were made in the Moodle server:

- LDAP Server Settings:
    - LDAP Host URL: `<AD_SERVER_IP>` 
    - LDAP Version: `3`
    - LDAP encoding: `utf-8`

- Bind Settings:
    - Bind DN: `CN=bind,CN=Users,DC=moodle,DC=local`
    - Bind password: `<PASSWORD>`

- User lookup Settings:
    - User type: `MS Active Directory`
    - Contexts: `DC=moodle,DC=local`
    - Search subcontexts: `No`
    - User attribute: `sAMAccountName`

> Note: Make sure moodle server can reach LDAP server on port 389. This can be tested by filling **only** LDAP server settings.

## Adding users to Active Directory

To create users for moodle application the MS Active Directory was used. The following steps were followed to create users:

1. Open `Active Directory Users and Computers` on the Windows server.
2. Right-click on the `Users` folder and select `New > User`.
3. Fill in the user details and click `Next`.
4. Set the password and click `Next`.
5. Click `Finish` to create the user.

After creating user it can be used to login to the Moodle application.

## Encountered issues

During this project few issues were discovered. One of them being the LDAP connection issue. By using Docker container, the LDAP connection was tested and it was found that the LDAP server was reached but the bind user was not found. This issue was resolved by setting up Moodle using Ubuntu server on virtual machine.

## Conclusion

The Moodle server was successfully set up and integrated with an MS Active Directory server. Despite the problems faced with the docker container, the workaround was to use a virtual machine to set up the Moodle server. The server is now ready to be used by employees and stakeholders to create and access courses, respectively.

## References

1. [Moodle](https://moodle.org/)
2. [Moodle Documentation](https://docs.moodle.org/311/en/Main_page)
3. [Active Directory](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
4. [Apache](https://httpd.apache.org/)
5. [MariaDB](https://mariadb.org/)
6. [Ubuntu](https://ubuntu.com/)
7. [Windows Server](https://www.microsoft.com/en-us/windows-server)
8. [Moodle LDAP Authentication AD](https://techexpert.tips/moodle/moodle-ldap-authentication-active-directory/)