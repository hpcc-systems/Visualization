import datetime
import os
import json


class Summary:
    def __init__(self, what):
        self.what = what
        self.total = 0
        self.pass_ = 0
        self.fail = 0
        self.error = 0
        self.timeout = 0
        self.seconds = 0

    def append(self, other):
        if isinstance(other, Summary):
            self.total += other.total
            self.pass_ += other.pass_
            self.fail += other.fail
            self.error += other.error
            self.timeout += other.timeout
            self.seconds += other.seconds

    def to_object(self):
        return {
            "what": self.what,
            "total": self.total,
            "pass": self.pass_,
            "fail": self.fail,
            "error": self.error,
            "timeout": self.timeout,
            "seconds": self.seconds,
        }


class TaskSummary(Summary):
    def __init__(self, what):
        super().__init__(what)


class FileSummary(Summary):
    def __init__(self, what):
        super().__init__(what)
        self.config = {}
        self.tasks = {}
        self.errors = []

    def buildSystem(self):
        return self.config["Env"]["BuildSystem"]

    def branch(self):
        return self.config["BuildSet"]["Branch"]

    def branchDate(self):
        branch_date_str = self.config["BuildSet"]["BranchDate"]
        return iso_date_time(
            datetime.datetime.strptime(branch_date_str, "%a %b %d %H:%M:%S %Y %z")
        )

    def append(self, other):
        super().append(other)
        if isinstance(other, TaskSummary):
            if not other.what in self.tasks:
                self.tasks[other.what] = TaskSummary(other.what)
            self.tasks[other.what].append(other)

        if isinstance(other, FileSummary):
            for task in other.tasks:
                if not task in self.tasks:
                    self.tasks[task] = TaskSummary(task)
                self.tasks[task].append(other.tasks[task])

    def to_object(self):
        return {
            "what": self.what,
            "config": self.config,
            "tasks": {task: self.tasks[task].to_object() for task in self.tasks},
            **super().to_object(),
        }


def iso_date_time(dt):
    iso_date_time = dt.strftime("%Y-%m-%dT%H:%M:%S%z")
    return iso_date_time[:-2] + ":" + iso_date_time[-2:]


class AllSummary(FileSummary):
    def __init__(self, what):
        super().__init__(what)
        self.buildSystems = {}
        self.branches = {}
        self.runCount = 0
        self.since = iso_date_time(datetime.datetime.now())

    def append(self, other):
        super().append(other)
        if isinstance(other, FileSummary):
            if not other.buildSystem() in self.buildSystems:
                self.buildSystems[other.buildSystem()] = FileSummary(other.what)
            self.buildSystems[other.buildSystem()].append(other)
            if not other.branch() in self.branches:
                self.branches[other.branch()] = FileSummary(other.what)
            self.branches[other.branch()].append(other)

            if other.branchDate() < self.since:
                self.since = other.branchDate()

    def to_object(self):
        return {
            "what": self.what,
            "runCount": self.runCount,
            "since": self.since,
            "buildSystems": {
                buildSystem: self.buildSystems[buildSystem].to_object()
                for buildSystem in self.buildSystems
            },
            "branches": {
                branch: self.branches[branch].to_object() for branch in self.branches
            },
            **super().to_object(),
        }


def flatten_timing(timing, summary):
    if isinstance(timing, dict):
        summary.seconds += int(timing.get("RawSec", 0))


def flatten_task(task_name, task):
    task_summary = TaskSummary(task_name)
    task_summary.total += int(task.get("Total", 0))
    task_summary.pass_ += int(task.get("Pass", 0))
    task_summary.fail += int(task.get("Fail", 0))
    task_summary.error += int(task.get("Error", 0))
    task_summary.timeout += int(task.get("Timeout", 0))
    flatten_timing(task.get("Elaps", {}), task_summary)
    return task_summary


def flatten_array(array):
    retVal = {}
    for row in array:
        for task_name in row:
            retVal[task_name] = row[task_name]
    return retVal


def flatten_file(filename_without_extension, content):
    file_summary = FileSummary(filename_without_extension)
    file_summary.config = {
        "Env": content["Env"],
        "BuildSet": content["BuildSet"],
        "Exclusion": content["Exclusion"],
        "ThorConfig": content["ThorConfig"],
    }

    tasks = flatten_array(content["Tasks"])
    file_summary.errors = content["Errors"]

    for task_name in tasks:
        if task_name == "Build":
            flatten_timing(tasks[task_name]["CMake"], file_summary)
            flatten_timing(tasks[task_name]["Build"], file_summary)
            flatten_timing(tasks[task_name]["Package"], file_summary)
        elif task_name == "MLtests" or task_name == "Setup" or task_name == "Regress":
            for sub_task_name in tasks[task_name]:
                if isinstance(tasks[task_name][sub_task_name], dict):
                    task_summary = flatten_task(
                        task_name + "." + sub_task_name, tasks[task_name][sub_task_name]
                    )
                    file_summary.append(task_summary)
        elif isinstance(tasks[task_name], dict):
            task_summary = flatten_task(task_name, tasks[task_name])
            file_summary.append(task_summary)

    return file_summary


def process_json_file(file_path):
    with open(file_path, "r") as file:
        content = json.load(file)
        filename_without_extension = os.path.splitext(os.path.basename(file_path))[0]
        obt_result = content["OBTResult"]
        file_summary = flatten_file(filename_without_extension, obt_result)
        return file_summary


def gather_and_process_json_files(directory):
    all_summary = AllSummary("all")
    for filename in os.listdir(directory):
        all_summary.runCount += 1
        if filename.endswith(".json"):
            file_path = os.path.join(directory, filename)
            file_summary = process_json_file(file_path)
            all_summary.append(file_summary)
    return all_summary


if __name__ == "__main__":
    data_directory = "./docs/obt/data"
    summary = gather_and_process_json_files(data_directory)
    print(json.dumps(summary.to_object(), indent=4))
