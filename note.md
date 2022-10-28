sudo su
## Start BE:
service mongod start && cd /home/ec2-user/CertsChain/be/ && npm run start

## Build FE:
cd /home/ec2-user/CertsChain/web/ && npm run build && yes | cp -a ./dist/. /var/www/html/ -rf