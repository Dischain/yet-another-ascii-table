#!/bin/bash

LINT="./lint.sh"

if [[ ! -x "$LINT" ]] ; then
	chmod +x $LINT
fi

exit 0