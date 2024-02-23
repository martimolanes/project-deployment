configure DHCP
en
config
no logging console
> Note: use other ip addresses cause conflicts 
Router(config)#ip dhcp excluded-address 192.168.1.1 192.168.1.3
Router(config)#ip dhcp pool BENINGING
Router(dhcp-config)#network 192.168.1.0 255.255.255.0
Router(dhcp-config)#default-router 192.168.1.1
Router(dhcp-config)#lease 7
exit
Router(config)#do show ip int brief
R1(config)#interface gigabitEthernet 0/0/0
R1(config-if)#ip address 192.168.1.1 255.255.255.0
R1(config-if)#exit
 
Router(config-if)#no shut
exit
 
## Give XAMKLAB ip to router
 
interface GigabitEthernet 0/0/1
R1(config-if)#ip address dhcp
R1(config-if)#no shut
R1(config-if)#end
R1#show ip interface brief
 
2 options
1. Set Default gateway of PC -> router ip in XAMKLAB network (Ex. 172.xx.xx.12), like this, we can reach the private addresses of our network
2. PAT: dont set default gateway -> we use the ip (Ex. 172.xx.xx.12), specifying a port, so the router can translate to a private address -> NAT rules
