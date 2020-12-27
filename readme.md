# Namecheap CLI

## Introduction
Once upon a time, I naively thought to myself:

> Wouldn't it be nice if I could modify my DNS records from the CLI with a quick command, rather than needing to open the browser, log in, navigate to what I needed, make the changes only to then close all of those things again?

To some extent - I agree with that old, more naive version of me. Only with the added twist of knowing that I'd be insane to try such a thing with the horrible API provided by Namecheap, and what appears to be a lack of intent to do anything about it. People have been asking for fairly simple improvements for many moons. It's "with the product team". Who knows, maybe they'll improve it soon. Will I have finished migrating to a new DNS by then? Probably.

## Configuration

The configuration is stored in a file called `.namecheap-cli` in the users home directory. The home directory is found using `require('os').homedir()`, so it should be fairly reliable.

A configuration file is created when you try to use a command that requires it. You can update the config manually by editing the json, or use the config commands.

```
# node index.js config set username J4Wx
# node index.js config set apiKey someApiKeyStringHere
```

Should do the trick!

## Commands!

There are currently only a handful of commands. It's unlikely I'll add any more, but I'm open to it. And PRs are welcome.

### Config

Config has two subcommands; get and set.

#### config get

You can check a config file entry using:

```
# node index.js config get <field>
```

For example:

```
# node index.js config get username
The current config setting for username is J4Wx
```

#### config set

You can update a config file entry using:

```
# node index.js config set <field> <value>
```

For example:

```
# node index.js config set username J4Wx
```

### Domains

You can interact with your domains, well... list them ¯\\_(ツ)_/¯.

#### domains:list
