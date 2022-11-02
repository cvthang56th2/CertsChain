sudo su

REPLACE ENV DEV IN BE + FE

## Start BE background:
service mongod start && cd /home/ec2-user/CertsChain/be/ && pm2 start ./bin/www

## Build FE:
cd /home/ec2-user/CertsChain && git pull && cd /home/ec2-user/CertsChain/web/ && npm run build
cp ./dist/* /var/www/html/
cp ./dist/assets/* /var/www/html/assets

## Import DB:
mongoimport --db certschain --collection users --legacy --drop --file ./db/users.json &&mongoimport --db certschain --collection certificates --legacy --drop --file ./db/certificates.json && mongoimport --db certschain --collection certirequests --legacy --drop --file ./db/certirequests.json && mongoimport --db certschain --collection schools --legacy --drop --file ./db/schools.json

== update report: học sinh sinh, viên => học sinh, sinh viên
== update report: update hình ảnh profile issuer, holder, user detail
== update report: update môi trường phát triển: local => aws

## update report + instruction:
- cources manager
- cert chain
- add certificate by school: exclude students