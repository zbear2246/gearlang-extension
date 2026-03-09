#!/bin/bash

# --- Functions ---

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

function create_vsix() {
    echo "Packaging extension..."
    npm install
    # Using npx in case vsce isn't in your global PATH
    npx vsce package
}

# --- Interactive Menu Logic ---

function main() {
    local options=("Push to GitHub" "Create VSIX Package" "Exit")
    local selected=0

    # Hide cursor
    tput civis
    trap "tput cnorm; exit" INT TERM

    while true; do
        clear
        echo "GearLang Extension Developer Tools"
        echo "----------------------------------"
        
        for i in "${!options[@]}"; do
            if [ $i -eq $selected ]; then
                echo -e "> \e[1;32m${options[$i]}\e[0m" # Green arrow and text
            else
                echo "  ${options[$i]}"
            fi
        done

        # Read 3 characters (Escape sequences for arrows are 3 bytes)
        read -rsn3 key
        case "$key" in
            $'\x1b[A') # Up arrow
                ((selected--))
                [ $selected -lt 0 ] && selected=$((${#options[@]} - 1))
                ;;
            $'\x1b[B') # Down arrow
                ((selected++))
                [ $selected -ge ${#options[@]} ] && selected=0
                ;;
            "") # Enter key
                tput cnorm # Show cursor before running command
                clear
                case $selected in
                    0) push ;;
                    1) create_vsix ;;
                    2) exit 0 ;;
                esac
                read -p "Press enter to return to menu..."
                tput civis # Hide cursor again
                ;;
        esac
    done
}

main