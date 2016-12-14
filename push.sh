#!/bin/bash
rsync -ravz -e "ssh -p110" --progress ./static/* quentin@havelock.machine.deuxfleurs.fr:~/web/default/hyblab
