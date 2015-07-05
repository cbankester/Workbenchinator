#!/bin/bash
lessc ./src/client.less/ \
      ./build/client.css \
      --include-path=bower_components \
      --verbose \
&& mkdir -p ./build/fonts && cp ./bower_components/font-awesome/fonts/* ./build/fonts
