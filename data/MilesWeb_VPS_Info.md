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

-> To create new user:
$ adduser <username>
-> To add user to the sudo group:
$ usermod -aG sudo <username>
-> To set password for new user:
$ sudo passwd <username>

Login as "root" user or "tp_app1" user

-> To install ubuntu desktop
$ sudo apt-get install lightdm
$ sudo systemctl start lightdm
$ sudo apt-get install ubuntu-desktop
$ sudo systemctl set-default graphical.target
reboot

-> To allow remote desktop connection from anywhere
$ sudo apt install xrdp
$ sudo systemctl enable --now xrdp
$ sudo ufw allow from any to any port 3389 proto tcp
(check if this is required, if above alone does not work)
sudo adduser xrdp ssl-cert

-> Go to terminal and install docker, refer "to install docker" section in this file
--------

-> Setup NodeJs and Git client (search for ubuntu specific instructions online)
yum -y install nodejs
(u) sudo apt -y install nodejs

yum install gcc-c++ make
(u) sudo apt install npm

yum install git -y
(u) sudo apt install git -y

=> Setup the NodeJs App:
mkdir ta_apps
cd ta_apps
git clone https://github.com/encasherr/tech-assessment.git

cd tech-assessment
sudo npm install
sudo npm run build
cd client
sudo npm install
sudo npm run build
cd..
sudo cp -r client/build/* wwwroot
sudo node app 

=> We will use npm package PM2 to make our node js server run continuously in the background without blocking the terminal
$ sudo npm install -g pm2
$ sudo pm2 start app.js
$ sudo pm2 start npm --name "tapp" -- run start1

$ cd /
$ sudo MYSQL_HOST=172.17.0.2 MYSQL_USER=tp_app1 MYSQL_PASS=tech MYSQL_DB=ta_profiledb PORT=3000 pm2 start /home/tp_app1/tech-assessment/wwwroot/app.js --name "tapp"

-> to remove app from pm2 
$ sudo pm2 delete tapp

=> Setup docker, pull mysql and phpmyadmin images and run them as containers, use host ip in node js db connectionstring, scroll below and refer sections for setting up docker,mysql,phpmyadmin

you can use below pm2 commands
pm2 logs
pm2 status

********************Apache configuration****************************
=> We will use Apache as reverse proxy for our node js application
-> Before starting server configuration, ensure ufw is installed
$ sudo ufw status
it should show a table allow/deny from
-> Before starting Apache setup, ensure ssh connection is enabled to server, you can enable ssh connection using ufw
$ sudo ufw allow ssh
-> you can enable remote desktop connection using ufw
$ sudo ufw allow from any to any port 3389 proto tcp
-> To install Apache
$ sudo apt install apache2
-> Now enable ufw for Apache server to allow port 80 and port 443 by running  below
$ sudo ufw allow 'Apache Full'
-> Now configure Apache to be used as a reverse proxy server
$ sudo a2enmod proxy proxy_http rewrite headers expires
-> Now add Apache virtual host configuration
$ sudo nano /etc/apache2/sites-available/tapp.conf
-> paste/type following content in the tapp.conf file
<VirtualHost *:80>
  ServerName sharingcloudbestpractices.com
  ServerAlias www.sharingcloudbestpractices.com

  ProxyRequests Off
  ProxyPreserveHost On
  ProxyVia Full

  <Proxy *>
    Require all granted
  </Proxy>

  ProxyPass / http://localhost:3001/
  ProxyPassReverse / http://localhost:3001/
</VirtualHost>
-> Now disable default apache website and enable the Node js website
$ sudo a2dissite 000-default
$ sudo a2ensite tapp.conf
$ sudo systemctl restart apache2

-> To install ssl and allow https connection
$ sudo apt install certbot python3-certbot-apache

-> This command will create .conf file for ssl and redirect tapp.conf settings to use ssl, no manual change required
$ sudo certbot -d sharingcloudbestpractices.com -d www.sharingcloudbestpractices.com --apache --agree-tos -m encasherr@gmail.com --no-eff-email --redirect

$ sudo certbot -d tests.sharingcloudbestpractices.com -d www.tests.sharingcloudbestpractices.com --apache --agree-tos -m encasherr@gmail.com --no-eff-email --redirect

-> To renew certificate
$ sudo certbot renew --dry-run

**** that's all to configure Apache to host the node js application running at localhost:3001*******

-> download mysql image and run a new mysql container
$ sudo docker pull mysql
$ sudo docker run --name ta-mysql -e MYSQL_ROOT_PASSWORD=tech -d mysql:latest
$ sudo docker run -it --rm mysql mysql -hta-mysql -uroot -p
$ sudo docker ps
-> To go to mysql command line
sudo docker exec -it ta-mysql bash
-> To get the IP address and port number of mysql container, so that we use it in Node Js to connect
sudo docker inspect ta-mysql
-> setup mysql instance (not required if doing via phpmyadmin)
mysql -u root -p
CREATE DATABASE ta_profiledb
--update mysql.user set host = ‘%’ where user=’root’;


-> download phpmyadmin image and run a new container
sudo docker volume create phpmyadmin-volume
sudo docker run --name ta-phpmyadmin -v phpmyadmin-volume:/etc/phpmyadmin/config.user.inc.php --link ta-mysql:db -p 82:80 -d phpmyadmin/phpmyadmin

Open PhpMyadmin by opening below url in the browser:
http://91.107.226.228:82/  (91.107.226.228 is the VPS host staic IP)

Todo via phpmyadmin:
create a new database
create new user on that database tp_app1
run application DB schema script on that database

Include following in the create Database script, to create new user and assign privileges:
CREATE USER ‘tp_app1’@'91.107.%' IDENTIFIED BY ‘tech’;
ALTER USER 'tp_app1' IDENTIFIED WITH mysql_native_password BY 'tech';


-> We need to change Mysql authentication to plain old password authentication because it by default uses cache authentication. Run this script in phpmyadmin (if errors out in phpmyadmin, go to mysql bash via terminal and then run the alter statement):
ALTER USER 'ta_app_write' IDENTIFIED WITH mysql_native_password BY '[password]';
-> via terminal
$ sudo docker exec -it ta-mysql bash
mysql -u tp_app1 -p
ALTER USER 'tp_app1' IDENTIFIED WITH mysql_native_password BY '[password]';


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

Nameservers of clouflare for old sharingcloudbestpractices.com
shane.ns.cloudflare.com
zelda.ns.cloudflare.com

New ones:
leanna.ns.cloudflare.com
rocky.ns.cloudflare.com

/***** Wordpress setup *********/
$ sudo docker pull wordpress
$ sudo docker run --name ta-wp -e WORDPRESS_DB_HOST=172.17.0.2 -e WORDPRESS_DB_USER=tp_app1 -e WORDPRESS_DB_PASSWORD=tech -e WORDPRESS_DB_NAME=ta_profiledb -e WORDPRESS_TABLE_PREFIX=wp_ -p 8080:80 -d wordpress

sudo docker run --name ta-wp -e WORDPRESS_DB_HOST=172.17.0.2 -e WORDPRESS_DB_USER=tp_app1 -e WORDPRESS_DB_PASSWORD=tech -e WORDPRESS_DB_NAME=ta_profiledb -e WORDPRESS_TABLE_PREFIX=wp_ -p 80:80 -d wordpress

/**** end of wordpress setup ********/

-----below are for references only-------------------------------------------------------------------------------

/*****Node Js Dockerized************/
$ sudo docker run --name ta-node -p 49160:8005 10101983/t_apps

/*************End of Node Js Dockerization**************/

git clone https://github.com/encasherr/tech-assessment.git
enter username
enter above personal access token

zolahost personal access token:
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

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


=> We need to open port number 3001 to be able to access application externally (not needed if using ufw)
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


unix commands:
to come back to command prompt:
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

*******to install Docker:*********
$ sudo apt update
$ sudo apt install apt-transport-https ca-certificates curl software-properties-common
$ sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
$ sudo apt-cache policy docker-ce
$ sudo apt install docker-ce
$ sudo systemctl status docker
$ sudo docker run hello-world

to view active docker containers:
sudo docker ps
to view all (even stopped) containers:
sudo docker ps -a


=> Setup Docker on CentOs 7
sudo yum check-update
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker
sudo systemctl start docker
sudo systemctl enable docker
sudo systemctl status docker

*********Docker setup complete****************************
Install git:
sudo apt install -y
Steps to Containerize a node js and mysql application:
https://www.bezkoder.com/docker-compose-nodejs-mysql/

/***********************MySql database backup and restore**************************/
docker exec [mysql_container_name] /usr/bin/mysqldump -u [mysql_username] --password=[mysql_password] [database_name] > [destination_path]

sudo docker exec ta-mysql /usr/bin/mysqldump -u [mysql_username] --password=[mysql_password] ta_profiledb > backup_19March.sql

./gdrive upload backup_19March.sql

/********************end of db backup & restore************************************/

Nginx reverse proxy configuration:
cd /
sudo nano /etc/nginx/conf.d/91.107.226.228.conf
# Paste the following:
server {
        listen 91.107.226.228:80 default_server;
        server_name _;
        access_log off;
        error_log /dev/null;

        location / {
        #       proxy_pass http://91.107.226.228:8080;
                proxy_pass http://127.0.0.1:3000;
   }
}

server {
        listen 91.107.226.228:443 default_server ssl;
        server_name _;
        access_log off;
        error_log /dev/null;

        ssl_certificate     /usr/local/hestia/ssl/certificate.crt;
        ssl_certificate_key /usr/local/hestia/ssl/certificate.key;

        return 301 http://$host$request_uri;

        location / {
                root /var/www/document_errors/;
                proxy_pass http://127.0.0.1:3000;
        }

        location /error/ {
                alias /var/www/document_errors/;
        }
}
# until here

Node App startup command with environment variables:
tp_app1@server:~/tech-assessment/wwwroot$ MYSQL_HOST=172.17.0.2 MYSQL_USER=tp_app1 MYSQL_PASS=tech MYSQL_DB=ta_profiledb node app
sudo nginx -s reload