#!/bin/bash

#This script recursively traverses specified directory
#in order to test only .js files, which not located at 
#node_modules directory, with jshit.
#
#Thanks to user000001 http://stackoverflow.com/users/828193/user000001
#for his definetive answer about traversing folders with shell scripting.

NODE_MODULES=".//node_modules"

function testRecursively() {
	for file in "$1"/*
	do
		if [[ "${file}" == "$NODE_MODULES" ]] ; then
			continue	

		elif [[ -f "${file}" ]] && [[ "${file}" =~ .*\.js$ ]] ; then
			jshint "${file}"

		elif [[ -d "${file}" ]] ; then
			testRecursively "${file}"
		fi
	done
}

function main() {
	testRecursively "$1"
}

main "$1"