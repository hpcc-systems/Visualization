# CodeMirror Version Notes

## Current Version: 5.65.19 ✅

The @hpcc-js/codemirror package currently uses CodeMirror v5.65.19, which is **the latest stable release in the v5 series**.

### Verification

```bash
npm view codemirror@version5    # Shows: 5.65.19 (latest v5)
npm view codemirror@latest      # Shows: 6.0.2 (latest overall)
```

## CodeMirror v6 Considerations

CodeMirror v6 (latest: 6.0.2) represents a complete rewrite with breaking API changes:

- **New Architecture**: Modular design with separate packages (@codemirror/state, @codemirror/view, etc.)
- **API Changes**: Different initialization methods (no `fromTextArea`), new event system, different configuration approach
- **Breaking Changes**: Existing code would require significant rewriting

### Key API Differences

| v5 API | v6 API | 
|--------|--------|
| `CodeMirror.fromTextArea()` | `new EditorView()` with `EditorState` |
| `cm.setOption()` | Extension-based configuration |
| `mode: "javascript"` | `javascript()` extension import |
| Single package import | Multiple package imports |

### Migration Scope

Upgrading to v6 would require:

1. **Core API Migration**: Rewriting the compatibility layer in `codemirror-shim.ts`
2. **Editor Classes**: Updating all editor classes to use new APIs  
3. **Mode System**: Migrating custom modes (ECL, DOT) to v6 language support format
4. **Dependencies**: Adding multiple @codemirror/* packages 
5. **Event System**: Updating change listeners and event handling
6. **Configuration**: Converting v5 options to v6 extensions
7. **Testing**: Comprehensive testing of all editor functionality

### Recommendation

**For minimal changes and stability, staying on v5.65.19 is recommended.** 

A v6 upgrade should be considered as a separate major effort requiring:
- Dedicated sprint/milestone planning
- Full regression testing
- User acceptance testing
- Documentation updates

### Version History

- **Current**: v5.65.19 (latest v5, stable)
- **Available**: v6.0.2 (latest overall, breaking changes)