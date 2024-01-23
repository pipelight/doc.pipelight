# Virtual machines(VM) edition

## Guilty pleasure

I have been coming to appreciate TOML only lately.

And mainly as an XML replacement for its capacity to produce readable
overstuffed objects.

When working on a project that involves a language, I tend to do everything that
revolves around this project with this exact same language. _Is this due to
cerebral rigidity or a lack of skill? 🤷_

I was **defining VMs with Toml**, which naturally led me to **write pipelines in
Toml**.

[Virshle](https://github.com/pipelight/virshle) usage as a virsh(libvirtd)
replacement led me to unexpected pipelight usage.

## Create fine grained virtual machines in spades.

You need to create two files.

- a vm definition (toml, replacing official xml).
- a pipelight definition (toml, pipelight supported config format).

### Define VMs using Toml (Virshle)

Here is the simplest machine configuration you will find.

The following defines a VM:

- with 2cpu
- with 4 Gib of ram
- that runs nixos

```toml
[domain]
name = "nixos"
uuid = "4dea24b3-1d52-d8f3-2516-782e98a23fa0"
"@type" = "kvm"
vcpu = 2

[domain.memory]
"@unit" = "GiB"
"#text" = 4

[domain.os.type]
"@arch" = "x86_64"
"#text" = "hvm"

[domain.clock]
"@sync" = "localtime"

[[domain.devices.disk]]
"@type" = "file"
"@device" = "disk"
driver."@name" = "qemu"
driver."@type" = "qcow2"

"@bus" = "virtio"
"@size" = 20

source."@file" = "./iso/nixos.qcow2"
target."@dev" = "hda"
target."@bus" = "virtio"
```

You can then bring the host up.

```sh
virshle domain create -vv <vm_definition.toml>
```

## Enforce VM definition quality (Pipelight)

As you may now know, pipelight can trigger pipelines on file change. It is then
possible to test new VM definition on file change.

This pipeline tries to bring up a host and then delete it in case of success. It
ultimately fails if the VM definition has errors.

```toml
[[pipelines]]
name = "tests_vm_config"

[[pipelines.steps]]
name = "create vm"
commands = [
"""
virshle \
  vm create \
  ./machines/default.toml -vvv
"""
]

[[pipelines.steps]]
name = "clean environment"
commands = [
"""
virshle \
  vm crunch nixos -vvv
"""
]
```
