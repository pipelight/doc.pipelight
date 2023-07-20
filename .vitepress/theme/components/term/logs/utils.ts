import type { Pipeline, Step, StepOrParallel } from "pipelight";
import { Pipeline, Step } from "pipelight";
import { h } from "vue";
import { VNode } from "vue/types";

export const json_to_html = (json: Pipeline) => {
  const pipeline = new Pipeline(json);
  const steps: VNode[] = [];
  for (let step of pipeline.steps) {
    steps.push(h("div", [draw_step(step)]));
  }
  return h("div", steps);
};

const draw_step = (stepOrParallel: StepOrParallel) => {
  if ("Parallel" in stepOrParallel) {
    const steps: VNode[] = [];
    for (let step of stepOrParallel.Parallel.steps) {
      steps.push(draw_step(step));
    }
    return h("div", steps);
  }
  if ("Step" in stepOrParallel) {
    const commands: VNode[] = [];
    for (let command of stepOrParallel.Step.commands) {
      commands.push(
        h(
          "div",
          {
            id: "command"
          },
          draw_command(command)
        )
      );
      console.log(command);
    }
    return h("div", commands);
  }
};

const draw_command = (command: Command) => {
  return h("div", { id: "command" }, [
    h("div", { innerHTML: command.process.state.stdin }),
    h("div", { innerHTML: command.process.state.stdout }),
    h("div", { innerHTML: command.process.state.stderr })
  ]);
};
