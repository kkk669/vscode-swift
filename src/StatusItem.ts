//===----------------------------------------------------------------------===//
//
// This source file is part of the VSCode Swift open source project
//
// Copyright (c) 2021 the VSCode Swift project authors
// Licensed under Apache License v2.0
//
// See LICENSE.txt for license information
// See CONTRIBUTORS.txt for the list of VSCode Swift project authors
//
// SPDX-License-Identifier: Apache-2.0
//
//===----------------------------------------------------------------------===//

import * as vscode from 'vscode';

/**
 * Manages a {@link vscode.StatusBarItem StatusBarItem} to display the status
 * of tasks run by this extension.
 */
export class StatusItem {

    private item: vscode.StatusBarItem;
    private runningTasks: vscode.Task[] = [];

    constructor() {
        this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    }

    /**
     * Signals the start of a {@link vscode.Task Task}.
     * 
     * This will display the name of the task, preceded by a spinner animation.
     */
    start(task: vscode.Task) {
        if (this.runningTasks.indexOf(task) !== -1) {
            return; // This task is already running.
        }
        this.runningTasks.push(task);
        this.show(`$(sync~spin) ${task.name}`);
    }

    /**
     * Signals the end of a {@link vscode.Task Task}.
     * 
     * If no other tasks are in progress, this will hide the {@link vscode.StatusBarItem StatusBarItem}.
     * Otherwise, the most recently added task will be shown instead.
     */
    end(task: vscode.Task) {
        const index = this.runningTasks.indexOf(task);
        if (index === -1) {
            return; // Unknown task.
        }
        this.runningTasks.splice(index, 1);
        if (this.runningTasks.length === 0) {
            this.hide();
        } else {
            const taskToDisplay = this.runningTasks[this.runningTasks.length - 1];
            this.show(`$(sync~spin) ${taskToDisplay.name}`);
        }
    }

    /**
     * Shows the {@link vscode.StatusBarItem StatusBarItem} with the provided message.
     */
    private show(message: string) {
        this.item.text = message;
        this.item.show();
    }

    /**
     * Hides the {@link vscode.StatusBarItem StatusBarItem}.
     */
    private hide() {
        this.item.hide();
    }
    
    dispose() {
        this.item.dispose();
    }
}
