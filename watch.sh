#!/bin/sh

/bin/ls *.ts | exec entr -r bun bun.ts
