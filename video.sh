#!/bin/bash
VIDEO="$1"
START="$2"




ffmpeg -ss $START -i $VIDEO -t 00:00:30 -vcodec h264 -acodec aac -strict -2 $VIDEO.mp4

# encodage video vp9
ffmpeg -ss $START -i $VIDEO -t 00:00:30 -vcodec libvpx-vp9 -b:v 1M -acodec libvorbis $VIDEO.webm

# commande conseillé par Google
#ffmpeg -i <source> -c:v libvpx-vp9 -pass 1 -b:v 1000K -threads 1 -speed 4 \
#  -tile-columns 0 -frame-parallel 0 -auto-alt-ref 1 -lag-in-frames 25 \
#  -g 9999 -aq-mode 0 -an -f webm /dev/null


#ffmpeg -i <source> -c:v libvpx-vp9 -pass 2 -b:v 1000K -threads 1 -speed 0 \
#  -tile-columns 0 -frame-parallel 0 -auto-alt-ref 1 -lag-in-frames 25 \
#  -g 9999 -aq-mode 0 -c:a libopus -b:a 64k -f webm out.webm

# créer une image à un temps t
ffmpeg -i $VIDEO -ss $START -vframes 1 $VIDEO.png
