## Start BE:
start mongodb: service mongod start
cd /home/ec2-user/CertsChain/be/
npm run start

## Build FE:
cd /home/ec2-user/CertsChain/web/
npm run build
mv ./dist/* /var/www/html/