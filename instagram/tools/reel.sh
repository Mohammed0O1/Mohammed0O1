#!/bin/bash
# usage: reel.sh <set-name>
set -e
n=$1; d=out/reel/$n; cd "$(dirname "$0")"
REEL=1 node build.js "$n"
ls $d/*.jpg | sort > /tmp/reel_$n.txt
total=$(wc -l < /tmp/reel_$n.txt); i=0; : > $d/list.txt; sum=0
while read f; do
  i=$((i+1)); dur=4.6; [ $i -eq 1 ] && dur=3.0; [ $i -eq $total ] && dur=3.6
  st=$(python3 -c "print($dur-0.3)")
  ffmpeg -nostdin -v error -y -framerate 30 -i "$f" -vf "format=yuv420p,loop=-1:1,trim=duration=$dur,fade=t=in:d=0.3,fade=t=out:st=$st:d=0.3" -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p -r 30 "$d/tmp_$i.mp4"
  mv "$d/tmp_$i.mp4" "$d/s_$i.mp4"; echo "file 's_$i.mp4'" >> $d/list.txt
  sum=$(python3 -c "print($sum+$dur)")
done < /tmp/reel_$n.txt
ffmpeg -v error -y -f concat -safe 0 -i $d/list.txt -c copy $d/video.mp4
python3 music_tech.py $sum $d/music.wav
ffmpeg -v error -y -i $d/video.mp4 -i $d/music.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 128k -ar 44100 -shortest -movflags +faststart out/reel/$n.mp4
ffprobe -v error -show_entries format=duration,size -of csv=p=0 out/reel/$n.mp4
