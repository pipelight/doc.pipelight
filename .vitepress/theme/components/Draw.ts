import { Pipeline, Step, StepOrParallel, Verbosity } from "pipelight";
import { h, ref } from "vue";

export const useDraw = () => ({
  draw_pipeline,
  draw_pipelines
});

const draw_pipelines = (pipelines: Pipeline[], verbosity: Verbosity) => {
  const children = [];
  for (const pipeline of pipelines) {
    children.push(draw_pipeline(pipeline));
  }
  return h("div", children);
};
const draw_pipeline = (pipeline: Pipeline, verbosity: Verbosity) => {
  return h("div", { class: "pipeline line", id: "pipeline" }, [
    draw_status(pipeline),
    draw_header(pipeline),
    draw_tree(pipeline, verbosity)
  ]);
};

const draw_status = (pipeline: Pipeline) => {
  const node = h("div", { class: "flex status", id: "pipeline_header" }, [
    h("div", {
      class: `inline capitalize tag ${pipeline.status}`,
      innerHTML: `● ${pipeline.status}`
    }),
    h("div", { class: "tag secondary", innerHTML: `-` }),
    h("div", { class: "tag secondary", innerHTML: `${pipeline.event.date}` })
  ]);
  return node;
};

const draw_header = (pipeline: Pipeline) => {
  const env = [];
  if (!!pipeline.event.trigger.branch)
    env.push(
      h("div", {
        class: "tag secondary",
        innerHTML: `branch: ${pipeline.event.trigger.branch}`
      })
    );
  if (!!pipeline.event.trigger.tag)
    env.push(
      h("div", {
        class: "tag secondary",
        innerHTML: `tag: ${pipeline.event.trigger.tag}`
      })
    );
  if (!!pipeline.event.trigger.action)
    env.push(
      h("div", {
        class: "tag secondary",
        innerHTML: `action: ${pipeline.event.trigger.action}`
      })
    );
  const node = h("div", { class: "header", id: "pipeline_header" }, env);
  return node;
};

const draw_tree = (pipeline: Pipeline, verbosity: Verbosity) => {
  const children = [
    h("div", { class: "tag", innerHTML: `pipeline: ${pipeline.name}` })
  ];
  if (verbosity >= Verbosity.Error)
    children.push(h("div", draw_steps_or_parallels(pipeline.steps, verbosity)));
  const node = h("div", { class: "pipeline" }, children);
  return node;
};

const draw_steps_or_parallels = (
  steps: StepOrParallel,
  verbosity: Verbosity
) => {
  const nodes = [];
  for (let step of steps) {
    if (verbosity >= Verbosity.Warn)
      nodes.push(draw_step_or_parallel(step, verbosity));
  }
  return h("ul", nodes);
};

const draw_step_or_parallel = (
  stepOrParallel: StepOrParallel,
  verbosity: Verbosity
) => {
  if ("steps" in stepOrParallel) {
    return draw_parallel(stepOrParallel, verbosity);
  } else {
    return draw_step(stepOrParallel, verbosity);
  }
};

const draw_parallel = (parallel: Parallel, verbosity: Verbosity) => {
  const steps = [];
  for (let step of parallel.steps) {
    steps.push(draw_step(step, verbosity));
  }
  return h("li", [
    h("div", {
      class: `tag ${parallel.status}`,
      innerHTML: "parallel",
      id: "parallel_step"
    }),
    [h("ul", { id: "pipeline_step" }, steps)]
  ]);
};

const draw_step = (step: Step, verbosity: Verbosity) => {
  const children = [
    h("div", {
      class: `tag ${step.status}`,
      innerHTML: `step: ${step.name}`
    })
  ];
  if (verbosity >= Verbosity.Info)
    children.push(h("div", draw_commands(step.commands, verbosity)));
  const node = h(
    "li",
    {
      id: "pipeline_command"
    },
    children
  );
  return node;
};

const draw_commands = (commands: Command[], verbosity: Verbosity) => {
  const children = [];
  for (let command of commands) {
    children.push(draw_command(command, verbosity));
  }
  return h("ul", { id: "pipeline_commands" }, children);
};

const draw_command = (command: Command, verbosity: Verbosity) => {
  const children = [
    h("div", {
      class: `tag ${command.process.state.status}`,
      innerHTML: command.process.state.stdin
    })
  ];
  if (verbosity >= Verbosity.Debug)
    children.push(h("div", draw_out(command, verbosity)));
  return h("li", children);
};

const draw_out = (command: Command, verbosity: Verbosity) => {
  if (verbosity >= Verbosity.Trace) {
    const children = [];
    return h("ul", [
      h("li", {
        class: `tag ${command.process.state.status}`,
        innerHTML: `stdout: ${
          !!command.process.state.stdout ? command.process.state.stdout : ""
        }`
      }),
      h("li", {
        class: `tag ${command.process.state.status}`,
        innerHTML: `stderr: ${
          !!command.process.state.stderr ? command.process.state.stderr : ""
        }`
      })
    ]);
  } else if (verbosity >= Verbosity.Debug) {
    let out = undefined;
    // Determine which standard output to print
    if (
      command.process.state.status == "succeeded" ||
      command.process.state.status == "running"
    ) {
      out = command.process.state.stdout;
    } else if (command.process.state.status == "failed") {
      out = command.process.state.stderr;
    }
    if (!!out) {
      return h("ul", { id: "pipeline_command" }, [
        h("li", {
          class: `tag ${command.process.state.status}`,
          innerHTML: out
        })
      ]);
    }
  }
};
