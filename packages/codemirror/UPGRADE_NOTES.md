# CodeMirror Version Notes

## Current Version: 5.65.19

The @hpcc-js/codemirror package currently uses CodeMirror v5.65.19, which is the latest stable release in the v5 series.

## CodeMirror v6 Considerations

CodeMirror v6 (latest: 6.0.2) represents a complete rewrite with breaking API changes:

- **New Architecture**: Modular design with separate packages (@codemirror/state, @codemirror/view, etc.)
- **API Changes**: Different initialization methods (no `fromTextArea`), new event system, different configuration approach
- **Breaking Changes**: Existing code would require significant rewriting

### Migration Scope

Upgrading to v6 would require:
1. Rewriting the compatibility layer in `codemirror-shim.ts`
2. Updating all editor classes to use new APIs
3. Migrating custom modes (ECL, DOT) to v6 format
4. Updating all imports and extension loading
5. Comprehensive testing of all editor functionality

### Recommendation

For minimal changes and stability, staying on v5.65.19 is recommended. A v6 upgrade should be considered as a separate major effort requiring dedicated planning and testing.