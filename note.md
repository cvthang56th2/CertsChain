sudo su
## Start BE:
service mongod start && cd /home/ec2-user/CertsChain/be/ && npm run start

## Build FE:
cd /var/www/html/ && rm * -rf && cd /home/ec2-user/CertsChain && git pull && cd /home/ec2-user/CertsChain/web/ && npm run build && cp -a ./dist/. /var/www/html/ -rf