# Who is it for ?

**It is for every programmer that seeks fast and simple automation that can keep
up to his needs and adapt quick**.

But simple doesn't mean simplistic. Although you will first encounter simple
pipelines definitions, complex and avant-gardist pipeline behaviors can still be
achived with a minimal overhead.

### Pragmatic Programmers

Pipelight ends the struggle with configuration optimised languages (YAML/TOML).

Instead of combining multiple keywords and flags, the pipeline logic can be
written in Javascript/Typescript. You can then define pipelines with concepts
you are already comfortable with like variables, loops and functions.

### Frugal Power User

Decrease by two third the money spent in the Cloud by using local computing
resources.

You can push code from a machine, build on another, and send the resulting
archive on hosting servers. It allows you to use the latent computing power
where it resides and drastically diminish cloud computing costs.

### Manianimous Builders

Glue your synergetic tools together within a pipeline (Libvirt, Docker, Ansible,
pure Bash...). It then becomes pretty simple to share variables and environments
between them.

The result is you can dig out of the ground complete infrastructures, deploy
multiple virtual machines, containers, and provision them with different
environments with a uniq and on the fly configurable pipeline.

## For which tasks?

### Software development

With a **single file** in your root directory, you can define pipelines that
will run either **client-side, server-side or both.**

#### Client side

On your local machine, you can enable client side automation by using specific
triggers (on `pre-push`, `pre-commit`...).

- **Enforce code quality**,

  You can write pipelines to test your code before pushing it to production
  branches.

- **Save cloud costs**,

Make the **heavy computation locally**, Build and only send the resulting
archive or image to your remote hosts.

#### Server side

Server side automation can be achieved by using server-side triggers (on update,
pre-receive...).

- **Ease team work**,

  Trigger pipelines directly on the remote once git has resolved. Same as using
  a conventional cicd in cloud provider.

- **Better debugging**,

Pipelight logs are verbose and easy to access and read. You won't ever miss a
single byte of a pipeline execution

It displays the commands as they are executed without any hidden wrapper (the
**good old stdin, stdout, stderr** and return statements).

### Other trivial usages

- Everyday tasks automation;
- Server provisionning;
- Run **heavy workloads, parallelize tasks** on your servers.
