#! /usr/bin/env node
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

// storage for user inputs
const data = {
    command: '',
    args: [],
    storage: {}
};
const errorMsg = 'Unknown command. Known commands are: put, fetch, exit.';

// commands accepted by the program
const commands = {
    put: () => {
        // checking for correct # of arguments
        if (data.args.length > 2 || data.args.length < 2) {
            console.log('Invalid syntax.');
        } else {
            const key = data.args[0];
            const value = data.args[1];

            data.storage[key] = value;
            console.log('ok');
        }
        // reset the current arguments 
        data.args = [];
        process.stdout.write('> ');
    },

    fetch: () => {
        const key = data.args[0];

        if (data.args.length > 1 || data.args.length < 1) {
            console.log('Invalid syntax.');
        } else if (data.storage[key] === undefined) {
            console.log('Value not found.');
        } else {
            console.log(data.storage[key]);
        }
        data.args = [];
        process.stdout.write('> ');
    },

    exit: () => {
        rl.on('close', function () {
            console.log('Bye!');
        });

        rl.close();
    },
};

rl.prompt();

rl.on('line', (line) => {

    // removes excess white space at beginning and end, and finds the command + # of arguments
    let input = line.trim().split(' ');
    [data.command, ...data.args] = input;

    if (data.command in commands) {
        commands[data.command]();
    } else {
        console.log(errorMsg);
        process.stdout.write('> ');
    }
});

module.exports = {
    rl,
    data,
    errorMsg,
    commands
};