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

import * as assert from 'assert';
import { getRepositoryName } from '../../utilities';

suite('Utilities Test Suite', () => {

	test('getRepositoryName', () => {
		// Regular case.
		assert.strictEqual(
			getRepositoryName('https://github.com/swift-server/vscode-swift.git'),
			'vscode-swift'
		);
		// URL does not end in .git.
		assert.strictEqual(
			getRepositoryName('https://github.com/swift-server/vscode-swift'),
			'vscode-swift'
		);
		// URL contains a trailing slash.
		assert.strictEqual(
			getRepositoryName('https://github.com/swift-server/vscode-swift.git/'),
			'vscode-swift'
		);
		// Name contains a dot.
		assert.strictEqual(
			getRepositoryName('https://github.com/swift-server/vscode.swift.git'),
			'vscode.swift'
		);
		// Name contains .git.
		assert.strictEqual(
			getRepositoryName('https://github.com/swift-server/vscode.git.git'),
			'vscode.git'
		);
	});
});
