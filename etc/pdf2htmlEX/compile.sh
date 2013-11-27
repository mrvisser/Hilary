#!/bin/sh

##
# Run this script on a fresh ubuntu machine to compile and prepare a
# binary pdf2htmlEX package for OAE
##

# This is evertying will be installed
P2H_PREFIX=/tmp/pdf2htmlEX-0.10-bin

mkdir -p $P2H_PREFIX

apt-get update

# Build requirements
apt-get install -y build-essential cmake pkg-config autoconf libtool git

##
# POPPLER
##

# Deps
apt-get install -y libpng12-0 libpng12-dev libjpeg62 libjpeg62-dev libopenjpeg2 libopenjpeg-dev fontconfig libfontconfig1-dev poppler-data

# Prepare Source
cd /usr/src
wget http://poppler.freedesktop.org/poppler-0.24.3.tar.xz
tar -Jxf poppler-0.24.3.tar.xz
cd poppler-0.24.3

# Compile
./configure --prefix=$P2H_PREFIX --enable-xpdf-headers
make
make install

##
# FontForge
##

# Deps
apt-get install -y libgtk2.0-dev

cd /usr/src
git clone https://github.com/fontforge/fontforge
cd fontforge
./autogen.sh
./configure --prefix=$P2H_PREFIX
make
make install

##
# TTF AutoHint
##

# Deps
apt-get install -y libfreetype6 libfreetype6-dev qt-sdk

cd /usr/src
wget http://downloads.sourceforge.net/project/freetype/ttfautohint/0.97/ttfautohint-0.97.tar.gz
tar -zxvf ttfautohint-0.97.tar.gz
cd ttfautohint-0.97
./configure --prefix=$P2H_PREFIX
make
make install

##
# pdf2htmlEX
##

# Deps
apt-get install -u libcairo2 libcairo2-dev

export PKG_CONFIG_PATH=$P2H_PREFIX/lib/pkgconfig
export LIBRARY_PATH=$P2H_PREFIX/lib
export LD_LIBRARY_PATH=$P2H_PREFIX/lib
export INCLUDE_PATH=$P2H_PREFIX/include
export C_INCLUDE_PATH=$P2H_PREFIX/include
export CPLUS_INCLUDE_PATH=$P2H_PREFIX/include

cd /usr/src
wget https://github.com/coolwanglu/pdf2htmlEX/archive/v0.10.tar.gz
tar -zxvf v0.10.tar.gz
cd pdf2htmlEX-0.10
cmake -DENABLE_SVG=ON -DCMAKE_INSTALL_PREFIX:PATH=$P2H_PREFIX .
make
make install

##
# Package it up
##

mv $P2H_PREFIX /tmp/usr
cd /tmp
tar -cvf pdf2html.tar usr/
gzip pdf2html.tar

echo 'Compiling complete. pdf2html.tar is located at /tmp/pdf2html.tar (with fontconfig and poppler) and can be extracted to / to install pdf2html'

