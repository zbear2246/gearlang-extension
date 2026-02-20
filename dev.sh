#!/bin/bash

function push() {
    npm run compile

    if [ $? -ne 0 ]; then
        echo "Compile failed, aborting push."
        return
    fi

    read -p "Commit message: " message

    git add .
    git commit -m "$message"
    git push origin $(git branch --show-current)
}

push