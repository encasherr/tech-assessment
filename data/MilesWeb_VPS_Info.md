Dear Alok Jha,

PLEASE PRINT THIS MESSAGE FOR YOUR RECORDS - PLEASE READ THIS EMAIL IN FULL.

Thank you for your order from us! We are pleased to tell you that the server you ordered has now been set up and is operational.

Server Details
=============================

Linux VPS SM-V1

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

Login as "root" user or "ta_admin" user

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


=> Setup Docker on CentOs 7
sudo yum check-update
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker
sudo systemctl start docker
sudo systemctl enable docker
sudo systemctl status docker
sudo docker pull mysql
sudo docker run --name ta-mysql -e MYSQL_ROOT_PASSWORD=tech -d mysql:latest
-- sudo docker run -it --rm mysql mysql -hta-mysql -uroot -p
sudo docker ps
sudo docker exec -it ta-mysql bash
mysql -u root -p
CREATE DATABASE ta_profiledb
--update mysql.user set host = ‘%’ where user=’root’;

sudo docker volume create phpmyadmin-volume
sudo docker run --name ta-phpmyadmin -v phpmyadmin-volume:/etc/phpmyadmin/config.user.inc.php --link ta-mysql:db -p 82:80 -d phpmyadmin/phpmyadmin

MySql DB root user:
user: root
password: tech

->run the above exsting containers whenever restarted
sudo docker start ta-mysql
sudo docker start ta-phpmyadmin

-> open GUI with root access
sudo -i nautilus

-> switch to another login user
su [username]

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


todo:
create a new database
create new user on that database
run script on that database


=>Install and setup GNome UI on CentOs 7:
sudo yum groups install "GNOME Desktop"
sudo systemctl start graphical.target

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
