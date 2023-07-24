import { Pipeline, Step, StepOrParallel, Verbosity } from "pipelight";
import { h } from "vue";
import { VNode } from "vue/types";

export const json_to_html = (
  pipeline: Pipeline,
  verbosity: Verbosity
): VNode => {
  return h("div", { class: "pipeline", id: "pipeline" }, [
    draw_status(pipeline),
    draw_header(pipeline),
    draw_pipeline(pipeline)
  ]);
};

const draw_status = (pipeline: Pipeline): VNode => {
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

const draw_header = (pipeline: Pipeline): VNode => {
  const node = h("div", { class: "header", id: "pipeline_header" }, [
    h("div", {
      class: "tag secondary",
      innerHTML: `branch: ${pipeline.event.trigger.branch}`
    }),
    h("div", {
      class: "tag secondary",
      innerHTML: `tag: ${pipeline.event.trigger.tag}`
    }),
    h("div", {
      class: "tag secondary",
      innerHTML: `action: ${pipeline.event.trigger.action}`
    })
  ]);
  return node;
};

// List Tree
const draw_pipeline = (pipeline: Pipeline): VNode => {
  const node = h("div", { class: "pipeline" }, [
    h("div", { class: "tag", innerHTML: `pipeline: ${pipeline.name}` }),
    h("div", draw_steps_or_parallels(pipeline.steps))
  ]);
  return node;
};
const draw_steps_or_parallels = (steps: StepOrParallel): VNode => {
  const nodes: VNode[] = [];
  for (let step of steps) {
    nodes.push(draw_step_or_parallel(step));
  }
  return h("ul", nodes);
};

const draw_parallel = (parallel: Parallel): VNode => {
  const steps: VNode[] = [];
  for (let step of parallel.steps) {
    steps.push(draw_step(step));
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

const draw_step = (step: Step): VNode => {
  return h(
    "li",
    {
      id: "pipeline_command"
    },
    [
      h("div", {
        class: `tag ${step.status}`,
        innerHTML: `step: ${step.name}`
      }),
      h("div", draw_commands(step.commands))
    ]
  );
};
const draw_step_or_parallel = (stepOrParallel: StepOrParallel): VNode => {
  if ("steps" in stepOrParallel) {
    return draw_parallel(stepOrParallel);
  } else {
    return draw_step(stepOrParallel);
  }
};

const draw_commands = (commands: Command[]) => {
  const cmd_nodes: VNode[] = [];
  for (let command of commands) {
    let out = "";
    if (
      command.process.state.status == "succeeded" ||
      command.process.state.status == "running"
    ) {
      out = command.process.state.stdout;
    } else if (command.process.state.status == "failed") {
      out = command.process.state.stderr;
    }
    cmd_nodes.push(
      h("li", [
        h("div", {
          class: `tag ${command.process.state.status}`,
          innerHTML: command.process.state.stdin
        })
      ])
    );
  }
  return h("ul", { id: "pipeline_command" }, cmd_nodes);
};
