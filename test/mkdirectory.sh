#! /bin/bash

mkdir testdir

for((i=0;i<10;i++))
do
    truncate -s 1M testdir/file$i.txt
done

