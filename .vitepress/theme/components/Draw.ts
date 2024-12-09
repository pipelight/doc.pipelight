import {
  Duration,
  Pipeline,
  Step,
  StepOrParallel,
  Verbosity,
  Command,
  Parallel
} from "pipelight";
import { h, ref } from "vue";
import { format, formatRFC3339, parse, parseISO } from "date-fns";
import moment from "moment";

export const useDraw = () => ({
  draw_pipeline,
  draw_pipelines
});

const parse_duration = (pipeline_duration: Duration): any => {
  //Guard
  if (!pipeline_duration) {
    return;
  }
  if (!!pipeline_duration.computed) {
    const e = moment.duration(pipeline_duration.computed);
    return e;
  } else {
    return;
    // Compute duration
  }
};
const format_duration = (moment_duration: any): string => {
  //Guard
  let res = "";
  if (!moment_duration) {
    return res;
  }
  const minutes = moment_duration.minutes();
  if (!!minutes) {
    res += `${minutes}m`;
  }
  const seconds = moment_duration.seconds();
  if (!!seconds) {
    res += `${seconds}s`;
  }
  const milliseconds = Math.round(moment_duration.milliseconds());

  if (!!milliseconds && !minutes) {
    res += `${milliseconds}ms`;
  }
  return res;
};

const parse_date = (iso: string): Date => {
  // Date serialized format: "%Y-%m-%d %H:%M:%S%.9f %z",
  // To "%Y-%m-%dT%H:%M:%SZ%z",
  const [date, time, time_zone, ...rest] = iso.split(" ");
  const [human_time, milliseconds, ...rest2] = time.split(".");
  const simple_iso = `${date}T${human_time}Z${time_zone}`;
  return parseISO(simple_iso);
};
const format_date = (date: Date): string => {
  const rfc = format(date, "eee, i MMM yyyy HH:mm:ss xx");
  return rfc;
};

const draw_pipelines = (pipelines: Pipeline[], verbosity: Verbosity) => {
  const children = [];
  for (const pipeline of pipelines) {
    children.push(draw_pipeline(pipeline, verbosity));
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
  const date = format_date(parse_date(pipeline.event.date));
  const node = h("div", { class: "flex status", id: "pipeline_header" }, [
    h("span", {
      class: `capitalize tag unwrapped ${pipeline.status}`,
      innerHTML: `● ${pipeline.status}`
    }),
    h("span", { class: "tag secondary px-1", innerHTML: `-` }),
    h("span", { class: "tag secondary unwrapped", innerHTML: date })
  ]);
  return node;
};

const draw_header = (pipeline: Pipeline) => {
  const env = [];
  if (!!pipeline.event.trigger.tag) {
    env.push(
      h("div", {
        class: "tag secondary",
        innerHTML: `tag: ${pipeline.event.trigger.tag}`
      })
    );
  }
  if (!!pipeline.event.trigger.branch) {
    env.push(
      h("div", {
        class: "tag secondary",
        innerHTML: `branch: ${pipeline.event.trigger.branch}`
      })
    );
  }
  if (!!pipeline.event.trigger.action) {
    env.push(
      h("div", {
        class: "tag secondary",
        innerHTML: `action: ${pipeline.event.trigger.action}`
      })
    );
  }
  if (!!pipeline.event.trigger.commit) {
    env.push(
      h("div", {
        class: "tag secondary",
        innerHTML: `commit: ${pipeline.event.trigger.commit}`
      })
    );
  }
  const node = h("div", { class: "header", id: "pipeline_header" }, env);
  return node;
};

const draw_tree = (pipeline: Pipeline, verbosity: Verbosity) => {
  const duration = format_duration(parse_duration(pipeline.duration));

  const children = [
    h(
      "div",
      {
        class: "flex"
      },
      [
        h("span", {
          class: "tag unwrapped",
          innerHTML: `pipeline: ${pipeline.name}`
        }),
        h("span", {
          class: "tag unwrapped secondary duration",
          innerHTML: `(${duration})`
        })
      ]
    )
  ];
  if (verbosity >= Verbosity.Error) {
    children.push(h("div", draw_steps_or_parallels(pipeline.steps, verbosity)));
  }
  const node = h("div", { class: "pipeline" }, children);
  return node;
};

const draw_steps_or_parallels = (
  steps: StepOrParallel,
  verbosity: Verbosity
) => {
  const nodes = [];
  for (let step of steps) {
    if (verbosity >= Verbosity.Warn) {
      nodes.push(draw_step_or_parallel(step, verbosity));
    }
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
  for (const step of parallel.steps) {
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
  const duration = format_duration(parse_duration(step.duration));
  const children = [
    h("span", { class: `tag wrapped` }, [
      h("span", {
        class: `tag ${step.status}`,
        innerHTML: `step: ${step.name}`
      }),
      !!step.duration
        ? h("span", {
            class: "tag unwrapped secondary duration",
            innerHTML: `(${duration})`
          })
        : undefined
    ])
  ];
  if (verbosity >= Verbosity.Info) {
    children.push(h("div", draw_commands(step.commands, verbosity)));
  }
  return h("li", children);
};

const draw_commands = (commands: Command[], verbosity: Verbosity) => {
  const children = [];
  for (const command of commands) {
    children.push(draw_command(command, verbosity));
  }
  return h("ul", { id: "pipeline_commands" }, children);
};

const draw_command = (command: Command, verbosity: Verbosity) => {
  const duration = format_duration(parse_duration(command.duration));
  const children = [
    h("span", { class: `tag` }, [
      h("span", {
        class: `tag ${command.process.state.status}`,
        innerHTML: command.process.state.stdin
      }),
      !!command.duration
        ? h("span", {
            class: "tag unwrapped secondary duration",
            innerHTML: `(${duration})`
          })
        : undefined
    ])
  ];

  if (verbosity >= Verbosity.Debug) {
    children.push(h("div", draw_out(command, verbosity)));
  }
  return h("li", children);
};

const draw_out = (command: Command, verbosity: Verbosity) => {
  if (verbosity >= Verbosity.Trace) {
    const children = [];
    return h("ul", [
      h("li", {
        class: `tag wrapped ${command.process.state.status}`,
        innerHTML: `stdout: ${
          !!command.process.state.stdout ? command.process.state.stdout : ""
        }`
      }),
      h("li", {
        class: `tag wrapped ${command.process.state.status}`,
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
          class: `tag wrapped ${command.process.state.status}`,
          innerHTML: out
        })
      ]);
    }
  }
};
