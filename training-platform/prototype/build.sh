#!/bin/sh
# Wraps page.html (the page body) into a standalone index.html for local use or static hosting.
cd "$(dirname "$0")"
{ printf '<!doctype html>\n<html lang="ar" dir="rtl">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<style>body{margin:0}[hidden]{display:none!important}</style>\n</head>\n<body>\n'; cat page.html; printf '</body>\n</html>\n'; } > index.html
