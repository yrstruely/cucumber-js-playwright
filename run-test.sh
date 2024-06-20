#!/bin/bash

# Function to run a command and check its exit status
run_command() {
    echo "Running: $1"
    eval $1 &
    pid=$!
    echo "Command PID: $pid"
    wait $pid
    if [ $? -ne 0 ]; then
        echo "Error: Command failed: $1"
        exit 1
    fi
    echo "Command succeeded: $1"
}

# Function to check if a port is in use
check_port() {
    port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
        echo "Port $port is already in use."
        return 0
    else
        echo "Port $port is free."
        return 1
    fi
}

# Change directory to test/bdd
cd test/bdd

# Check if port 3002 is in use
if check_port 3002; then
    # If port is in use, find the process and stop it (example with SIGTERM)
    echo "Stopping process using port 3002"
    lsof -ti :3002 | xargs kill -SIGTERM
    sleep 2 # Wait for the process to stop gracefully (adjust as needed)
fi

# Command 1: npm run build
run_command "npm run build"

run_command "npm install"

# Command 2: npm run server (running in background)
run_command "npm run server &"

# Command 3: npm run test
run_command "npm run test"

echo "Test cases running."

# Optionally, change back to original directory
cd -
