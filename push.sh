#!/bin/bash
ssh quentin@havelock.machine.deuxfleurs.fr -p110 rm -r /store/user/quentin/web/default/hyblab
scp -r -P110 ./static quentin@havelock.machine.deuxfleurs.fr:~/web/default/hyblab
