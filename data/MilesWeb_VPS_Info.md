Dear Alok Jha,

PLEASE PRINT THIS MESSAGE FOR YOUR RECORDS - PLEASE READ THIS EMAIL IN FULL.

Thank you for your order from us! We are pleased to tell you that the server you ordered has now been set up and is operational.

Server Details
=============================

Linux VPS SM-V1
Server host:
Main IP: 103.212.120.231
Root pass: vK9K#9h8-8LfGd

IP address allocation:
ServerName: server.localhost.com

Destiny's Details
=============================

Manage your VPS from our Launchpad

URL: https://launchpad.milesweb.com:4083/
Username: encasherr@gmail.com
Password: vK9K#9h8-8LfGd

 

Custom DNS Server Addresses
=============================
The custom DNS addresses you should set for your domain to use are:
Primary DNS:
Secondary DNS:

You will have to login to your registrar and find the area where you can specify both of your custom name server addresses.

After adding these custom nameservers to your domain registrar control panel, it will take 24 to 48 hours for your domain to delegate authority to your DNS server. Once this has taken effect, your DNS server has control over the DNS records for the domains which use your custom name server addresses.

SSH Access Information
=============================
Main IP Address: 103.212.120.231
Server Name: server.localhost.com
Root Password: vK9K#9h8-8LfGd

You can access your server using a free simple SSH client program called Putty located at:
http://www.securitytools.net/mirrors/putty/

Support
=============================
For any support needs, please open a ticket at https://my.milesweb.com/

Please include any necessary information to provide you with faster service, such as root password, domain names, and a description of the problem / or assistance needed. This will speed up the support time by allowing our administrators to immediately begin diagnosing the problem.

=============================

Thank you for choosing us.

Warm Regards,

MilesWeb Internet Services Pvt Ltd
https://www.milesweb.com
24/7/365 Support: Live Chat | Helpdesk | Email

Follow us on
https://twitter.com/MilesWeb
https://www.facebook.com/MilesWeb
https://www.instagram.com/milesweb
https://www.linkedin.com/company/milesweb-internet-services


Setup Instructions:
Server: 103.212.120.231

Login as "root" user or "tp_app1" user (Action_321)

curl -sL https://rpm.nodesource.com/setup_14.x | bash -

yum -y install nodejs

yum install gcc-c++ make

yum install git -y

=> Setup the NodeJs App:
mkdir ta_apps
cd ta_apps
git clone https://github.com/encasherr/tech-assessment.git
-username: encasherr
-personal access token: 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
cd tech-assessment
npm install
npm run build
cd client
npm install
npm run build
cd ..
cd ..
mkdir approot
cp -r tech-assessment/node_modules/ approot/
cp -r tech-assessment/wwwroot/. approot/
cp -r tech-assessment/client/build/. approot/

=> We will use npm package PM2 to make our node js server run continuously in the background without blocking the terminal
npm install -g pm2
go to approot
pm2 start app.js
you can use below pm2 commands
pm2 logs
pm2 status

=> We will use Apache as reverse proxy for our node js application
-> Set virtual host config in Apache to redirect all Apache requests to runnig NodeJs server
go to etc/httpd/conf.d/ directory
create new tapp.conf file
paste following content in the new file:
<VirtualHost *:80>
  ProxyRequests On
  ProxyPass / http://localhost:3001/
  ProxyPassReverse / http://localhost:3001/
</VirtualHost>
Save the file
restart apache -> sudo systemctl restart httpd.service


=> Setup Docker on CentOs 7
sudo yum check-update
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker
sudo systemctl start docker
sudo systemctl enable docker
sudo systemctl status docker

-> download mysql image and run a new mysql container
sudo docker pull mysql
sudo docker run --name ta-mysql -e MYSQL_ROOT_PASSWORD=tech -d mysql:latest
-- sudo docker run -it --rm mysql mysql -hta-mysql -uroot -p
sudo docker ps
sudo docker exec -it ta-mysql bash
-> setup mysql instance
mysql -u root -p
CREATE DATABASE ta_profiledb
--update mysql.user set host = ‘%’ where user=’root’;
-> To get the IP address and port number of mysql container, so that we use it in Node Js to connect
sudo docker inspect ta-mysql

-> download phpmyadmin image and run a new container
sudo docker volume create phpmyadmin-volume
sudo docker run --name ta-phpmyadmin -v phpmyadmin-volume:/etc/phpmyadmin/config.user.inc.php --link ta-mysql:db -p 82:80 -d phpmyadmin/phpmyadmin

Todo via phpmyadmin:
create a new database
create new user on that database ta_app_write
run application DB schema script on that database


-> We need to change Mysql authentication to plain old password authentication because it by default uses cache authentication. Run this script in phpmyadmin:
ALTER USER 'ta_app_write' IDENTIFIED WITH mysql_native_password BY 'Encasherr123';

=> We need to open port number 3001 to be able to access application externally
sudo iptables -I INPUT -p tcp -–dport 3001 -j ACCEPT
-> run this command to push the allow rule above reject rule, in this case line number 11 already has Reject all 
rule, so by this command we are pushing reject all rule below and adding allow port 80 rule
sudo iptables -I INPUT 11 -i eth0 -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT
-> query iptables
sudo iptables --line -vnL
-> we need to allow port 80 & 443 to enable SSL request to server/website, this is done via firewall
sudo firewall-cmd --permanent --zone=public --add-port=80/tcp
sudo firewall-cmd --permanent --zone=public --add-port=443/tcp
sudo firewall-cmd --reload

=> To redirect all http requests to https, make following entry in tapp.conf file (complete content, for reference)
<VirtualHost *:80>
ServerName sharingcloudbestpractices.com
Redirect permanent / https://www.sharingcloudbestpractices.com/
ProxyRequests On
ProxyPass / http://localhost:3001/
ProxyPassReverse / http://localhost:3001/
RewriteEngine on
RewriteCond %{SERVER_NAME} =sharingcloudbestpractices.com
RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
<VirtualHost *:443>
ServerName sharingcloudbestpractices.com
ProxyRequests On
ProxyPass / http://localhost:3001/
ProxyPassReverse / http://localhost:3001/

SSLCertificateFile /etc/letsencrypt/live/sharingcloudbestpractices.com/cert.pem
SSLCertificateKeyFile /etc/letsencrypt/live/sharingcloudbestpractices.com/private.pem
Include /etc/letsencrypt/options-ssl-apache.conf
SSLCertificateChainFile /etc/letsencrypt/live/sharingcloudbestpractices.com/chain.pem
</VirtualHost>


=> to setup and enable SSL using Lets Encrypt
sudo yum update -y && sudo yum upgrade -y
sudo yum install epel-release -y
sudo yum install certbot python2-certbot-apache mod_ssl -y
sudo certbot --version
sudo certbot --apache -d sharingcloudbestpractices.com
sudo systemctl restart httpd
-> we need to allow port 443 to enable SSL request to server/website, this is done via firewall
sudo firewall-cmd --permanent --zone=public --addport=443/tcp


MySql DB root user:
user: root
password: tech

->run the above exsting containers whenever restarted
sudo service docker start
sudo docker start ta-mysql
sudo docker start ta-phpmyadmin

-> switch to another login user
su [username]


=> Configure DNS to point domain to VPS server
login to cloudflare
go to the domain DNS settings
modify the A record for root and A record for www as follows:
Type A, name: @, content: 103.212.120.231, Proxy: No (DNS only), TTL: Auto
Type A, name: www, content: 103.212.120.231, Proxy: No (DNS only), TTL: Auto 


------------------------------------------------------------------------------------------

Git Personal access token:
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

git clone https://github.com/encasherr/tech-assessment.git
enter username
enter above personal access token

To cache the given record in your computer to remembers the token:
git config --global credential.helper cache

To  delete the cache record:
$ git config --global --unset credential.helper
$ git config --system --unset credential.helper

=>install and start mysql:
wget https://repo.mysql.com/mysql80-community-release-el7-1.noarch.rpm
yum localinstall mysql80-community-release-el7-1.noarch.rpm
yum install mysql-community-server
service mysqld start
->enter mysql command shell
/usr/bin/mysql -u root -p
->mysql temporary password check:
sudo grep ‘temporary password’ /var/log/mysqld.log
password: &6m(7fsLduk

-> stop / start mysql
systemctl stop mysqld
systemctl start mysqld

-> change password of mysql
systemctl stop mysqld
systemctl set-environment MYSQLD_OPTS=”--skip-grant-tables”
systemctl start mysqld


=>Install and setup GNome UI on CentOs 7:
sudo yum groups install "GNOME Desktop"
sudo systemctl start graphical.target

-> open GUI with root access
sudo -i nautilus

=>Install and setup PhpMyAdmin:
yum install httpd -y
systemctl start httpd.service
systemctl status httpd
systemctl enable httpd.service
sudo yum install epel-release
sudo yum install phpmyadmin
vim /etc/httpd/conf.d/phpMyAdmin.conf

->remove phpmyadmin
sudo yum remove phpmyadmin

-> Cloudflare Login
user: encasherr@gmail.om
password: Action@123

unix commands:
to come back to command promp:
:q
to see the contents of a file for e.g. syslog:
less syslog
to see the list of users from admin command line:
less /etc/passwd
to create new user:
adduser <username>
to add user to the sudo group:
usermod -aG sudo <username>
to set password for new user:
sudo passwd <username>
to delete an exiting user:
deluser <username>
to install docker:
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
sudo docker run hello-world

to view active docker containers:
sudo docker ps
to view all (even stopped) containers:
sudo docker ps -a

Install git:
sudo apt install -y
Steps to Containerize a node js and mysql application:
https://www.bezkoder.com/docker-compose-nodejs-mysql/
