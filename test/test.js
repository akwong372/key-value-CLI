const assert = require('chai').assert;
const sinon = require('sinon');
const app = require('../bin/index');

const { rl, data, errorMsg, commands } = app;

rl.prompt();

rl.on('line', (line) => {

    let input = line.trim().split(' ');
    [data.command, ...data.args] = input;

    if (data.command in commands) {
        commands[data.command]();
    } else {
        console.log(errorMsg);
        process.stdout.write('> ');
    }
});

describe('key-value', function () {
    it('put should accept a key and value', function () {
        data.command = 'put';
        data.args = ['key1', 'value1'];
        commands.put();

        assert.equal(data.storage.key1, 'value1');
    });

    it('put should respond \'ok\' when a key and value are saved', function () {
        let spy = sinon.spy(console, 'log');

        data.command = 'put';
        data.args = ['key2', 'value2'];
        commands.put();

        assert(spy.calledWith('ok'));

        spy.restore();
    });

    it('put should overwrite old values if key exists', function () {
        data.command = 'put';
        data.args = ['key1', 'newValue1'];
        commands.put();

        assert.equal(data.storage.key1, 'newValue1');
    });

    it('fetch should retrieve a value from a key', function () {
        let spy = sinon.spy(console, 'log');

        data.command = 'fetch';
        data.args = ['key2'];
        commands.fetch();

        assert(spy.calledWith('value2'));

        spy.restore();
    });

    it('fetch should respond \'Value not found.\' if there is no value for the key', function () {
        let spy = sinon.spy(console, 'log');

        data.command = 'fetch';
        data.args = ['key99'];
        commands.fetch();

        assert(spy.calledWith('Value not found.'));

        spy.restore();
    });

    it('app should not accept an invalid command', function () {
        data.command = 'huh';

        assert.equal(errorMsg, 'Unknown command. Known commands are: put, fetch, exit.');
    });

    it('put should only accept the correct # of arguments', function () {
        let spy = sinon.spy(console, 'log');

        data.command = 'put';
        data.args = ['key3', 'value3', 'extraValue3'];
        commands.put();

        assert(spy.calledWith('Invalid syntax.'));

        spy.restore();
    });

    it('fetch should only accept the correct # of arguments', function () {
        let spy = sinon.spy(console, 'log');

        data.command = 'fetch';
        data.args = ['key3', 'value3', 'extraValue3'];
        commands.fetch();

        assert(spy.calledWith('Invalid syntax.'));

        spy.restore();
    });

    it('exit should close the program and respond \'Bye!\'', function () {
        let spy = sinon.spy(console, 'log');

        commands.exit();

        assert(spy.calledWith('Bye!'));

        spy.restore();
    });
});
