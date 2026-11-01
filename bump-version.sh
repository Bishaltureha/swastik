#!/bin/sh
# Run before each push so visitors get fresh CSS/JS without a hard refresh.
v=$(date +%Y%m%d%H%M%S)
sed -i '' -E "s#(css/style\.css|js/main\.js)(\?v=[0-9]+)?\"#\1?v=$v\"#g" *.html
echo "version set to $v"
