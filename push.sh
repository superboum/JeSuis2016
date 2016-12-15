#!/bin/bash
rsync -ravz -e "ssh -p110" --progress ./static/* root@lupine.machine.deuxfleurs.fr:/var/www/html
rsync -ravz -e "ssh -p110" --progress ./static/* quentin@havelock.machine.deuxfleurs.fr:~/web/default/hyblab
