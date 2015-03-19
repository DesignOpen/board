#!/bin/bash

# Start tmux or attach running session
# If you want to end session so that commands do not run in the background,
# you have to press Modifier-C before closing terminal, or individually
# quit each process. Modifier-C usually means Alt-C

# See tmux cheatsheet https://gist.github.com/MohamedAlaa/2961058

# Change to your needs, each project should have unique name
PROJECT="board"
COMMAND[0]="npm start"
COMMAND[1]="npm run watch-styles"
COMMAND[2]="npm run watch-js"

# Don't modify this
_INDEX=0

function run-command {
    tmux send-keys -t "$PROJECT:0.$_INDEX" '' C-m
    tmux send-keys -t "$PROJECT:0.$_INDEX" "$1" C-m

    # Increase the pane counter(or whatever it is??)
    _INDEX=$(($_INDEX + 1))

    # Run splitw for each time but last
    if [ "${#COMMAND[@]}" -ne "$_INDEX" ]; then
        tmux splitw -t $PROJECT:0
    fi

    tmux select-layout -t $PROJECT:0 even-horizontal
}

# Check if tmux session already exists
tmux start-server\; has-session -t $PROJECT 2>/dev/null

if [ "$?" -eq 1 ]; then
    # Session didn't exist so create the session
    TMUX= tmux new-session -d -s $PROJECT -n main

    for cmd in "${COMMAND[@]}"
    do
        echo $cmd
        run-command "$cmd"
    done

    tmux select-pane -t $PROJECT:0.0
    tmux select-window -t 0

    # Add possible configuration here
    # tmux set-option -t $PROJECT mouse-select-pane on
    tmux bind-key -n M-c kill-session
    tmux bind-key -n M-Up    select-pane -U
    tmux bind-key -n M-Down  select-pane -D
    tmux bind-key -n M-Left  select-pane -L
    tmux bind-key -n M-Right select-pane -R
fi

# Kill tmux session on exit
_trap_exit() { tmux kill-session -t $PROJECT; }
trap _trap_exit EXIT


if [ -z "$TMUX" ]; then
    tmux -u attach-session -t $PROJECT
else
    tmux -u switch-client -t $PROJECT
fi
