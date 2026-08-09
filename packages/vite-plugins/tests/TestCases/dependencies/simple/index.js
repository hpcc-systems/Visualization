define(["exports", "module", "./dep"], function (exports, module, dep) {

	it("should compile", function (done) {
		done();
	});

	it("require scoping", function () {
		// verify require function hasn't been renamed
		var name = "req";
		name += "uire";
		expect(eval(name)).toEqual(require);
		expect((typeof require.toUrl)).toEqual("function");
		expect((typeof require.toAbsMid)).toEqual("function");
	});

	it("defined vars", function () {
		expect(module.exports).toEqual(exports);
		expect(module.id).toEqual('test/index');
	});

	it("require", function (done) {
		expect(require('test/dep')).toEqual(dep);
		var exceptionThrown;
		try {
			require('test/asyncDep');
		} catch (e) {
			exceptionThrown = true;
		}
		expect(exceptionThrown).toBe(true);
		// global require

		try {
			require(['require', 'module', 'exports', 'asyncDep', 'test/asyncDep'], function (req, reqModule, reqExports, asyncDep) {
				expect(reqModule.id).toEqual(module.id);
				expect(reqExports).toEqual(exports);
				expect(asyncDep).toEqual("asyncDep");
				// context require
				expect(require("asyncDep")).toEqual(asyncDep);
				expect(require("test/asyncDep")).toEqual(asyncDep);
				expect(req('./asyncDep')).toEqual(asyncDep);
				done();
			});
		} catch (e) {
			done(e);
		}
	});

	it("require sans callback", function (done) {
		var resolver;
		global.asyncDep3Promise = new Promise((resolve) => {
			resolver = resolve;
		});
		global.asyncDep3Promise.resolve = resolver;
		require(["asyncDep3"]);
		global.asyncDep3Promise.then(() => {
			try {
				var dep3 = ['asyncDep3'];
				require(dep3);
			} catch (err) {
				return done(err);
			}
			done();
		});
	});

	it("runtime require failures", function (done) {
		// Synchronous require should fail for a module that has not been loaded yet
		try {
			require('test/asyncDep2');
			return done(new Error("Expected exception thrown"));
		} catch (ignore) { }

		var waitForError = new Promise(function (resolve) {
			var handle = require.on("error", function (error) {
				handle.remove();
				expect(error.info.length).toEqual(1);
				expect(error.info[0].mid).toEqual("missing");
				resolve();
			});
		});
		// The callback must not run because "missing" cannot be resolved at all.
		var deps = ["missing", "test/asyncDep2"];
		require(deps, function () {
			return done(new Error("runtime require callback should not be called"));
		});

		waitForError.then(function () {
			// Loading the chunk makes the module available to a synchronous require
			require(["test/asyncDep2"], function () {
				try {
					expect(require('test/asyncDep2')).toEqual("asyncDep2");
					done();
				} catch (e) {
					done(e);
				}
			});
		}).catch(done);
	});
	dep.runTests();
});
