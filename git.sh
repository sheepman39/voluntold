#!/bin/bash
git add script.js
echo "What is the commit message?"
read -e commitMSG
git commit -m "$commitMSG"
git push
