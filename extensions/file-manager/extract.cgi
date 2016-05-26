#!/usr/bin/perl

#
# Authentic Theme 18.00 (https://github.com/qooob/authentic-theme)
# Copyright 2015 Alexandr Bezenkov (https://github.com/Real-Gecko/filemin)
# Copyright 2016 Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/qooob/authentic-theme/blob/master/LICENSE)
#

use File::Basename;
use lib ( dirname(__FILE__) . '/../../lib' );

require( dirname(__FILE__) . '/file-manager-lib.pm' );

foreach $name ( split( /\0/, $in{'name'} ) ) {
    $archive_type = mimetype( $cwd . '/' . $name );
    if ( index( $archive_type, "x-bzip" ) != -1 ) {
        &backquote_logged( "tar xvjfp " . quotemeta("$cwd/$name") . " -C " . quotemeta($cwd) );
    }
    elsif (index( $archive_type, "x-tar" ) != -1
        || index( $archive_type, "/gzip" ) != -1
        || index( $archive_type, "x-xz" ) != -1
        || index( $archive_type, "x-compressed-tar" ) != -1 )
    {
        &backquote_logged( "tar xfp " . quotemeta("$cwd/$name") . " -C " . quotemeta($cwd) );
    }
    elsif ( index( $archive_type, "x-7z" ) != -1 ) {
        &backquote_logged( "7z x " . quotemeta("$cwd/$name") . " -o" . quotemeta($cwd) );
    }
    elsif ( index( $archive_type, "/zip" ) != -1 ) {
        &backquote_logged( "unzip " . quotemeta("$cwd/$name") . " -d " . quotemeta($cwd) );
    }
    elsif ( index( $archive_type, "/x-rar" ) != -1 ) {
        &backquote_logged( "unrar x -r -y " . quotemeta("$cwd/$name") . " " . quotemeta($cwd) );
    }
}

redirect( 'list.cgi?path=' . urlize($path) . '&module=' . $in{'module'} );