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
# node index.js config:get <field>
```

For example:

```
# node index.js config:get username
The current config setting for username is J4Wx
```

#### config set

You can update a config file entry using:

```
# node index.js config:set <field> <value>
```

For example:

```
# node index.js config:set username J4Wx
```

### Domains

You can interact with your domains, well... list them ¯\\_(ツ)_/¯.

#### domains:list

This command will return a list of the domains on your account. Each page will return 20 results.

```
node index.js domains:list <page = 1>
```

### Hosts

You can interact with your domains hosts! This is where it gets useful. At least a little bit.

#### hosts:list

This command will return a list of the hosts for a domain.

```
node index.js domains:list <domain>
```

For example:

```
node index.js domains:list github.com
```

#### hosts:set

This command will update the specified host with the params you provide. Technically it will actually update all of your hosts thanks to the fact the setHosts method deletes and adds every single host. A list of your current hosts is retrieved (and updated if required) and sent back. So your hosts shouldn't change.

Don't ask why.

```
# node index.js hosts:set <domain> <hostname> <type> <address> <ttl = 1800>
```

So to add add/update an entry at `demo.github.com` to point to `1.1.1.1` with type `A` and a TTL of `30000`, you would execute:

```
# node index.js hosts:set github.com demo a 1.1.1.1 30000
```
