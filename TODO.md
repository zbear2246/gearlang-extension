# GearLang Extension TODO

## Legend
- `[x]` = Done
- `[ ]` = Not started
- `[~]` = In progress — see note below item for details

---


## Extension Progress

> Update this section as you go. When starting a new conversation, paste the prompt above AND this section.

* [x] **Fix known issues first**
  * [x] Fix root `package.json` — change `"main"` from `"./extension.ts"` to point to compiled client output
  * [x] Fix `client/package.json` — change `"main"` from `"src/extension.ts"` to `"out/extension.js"`

* [ ] **Client**
  * [ ] `client/src/extension.ts`
    * [ ] Imports
    * [ ] `activate` function skeleton
    * [ ] Define `serverModule` path
    * [ ] Define `serverOptions`
    * [ ] Define `clientOptions`
    * [ ] Create language client instance
    * [ ] Start the client
    * [ ] Push disposable to context
    * [ ] `deactivate` function

* [~] **Server**
  * [x] `server/src/types.ts`
    * [x] Define function symbol type
    * [x] Define variable symbol type
    * [x] Define symbol table structure
    * [x] Define token type

  * [x] `server/src/scanner/tokenizer.ts`
    * [x] Token type enum
    * [x] Tokenizer function skeleton
    * [x] Handle keywords
    * [x] Handle identifiers
    * [x] Handle operators
    * [x] Handle whitespace/newlines

  * [x] `server/src/analyzer/symbolTable.ts`
    * [x] Symbol table class skeleton
    * [x] Add function method
    * [x] Add variable method
    * [x] Lookup method
    * [x] Clear/reset method

  * [x] `server/src/analyzer/analyzer.ts`
    * [x] Analyzer function skeleton
    * [x] Walk token stream
    * [x] Detect function declarations
    * [x] Detect variable declarations
    * [x] Populate symbol table

  * [x] `server/src/server.ts`
    * [x] Imports
    * [x] Create connection
    * [x] Create document manager
    * [x] `onInitialize` handler
    * [x] `onDidOpenTextDocument` handler
    * [x] `onDidChangeTextDocument` handler
    * [x] Completion handler
    * [x] Diagnostics handler
      * [x] Report unknown identifiers
      * [~] Report missing semicolons
    * [x] Start listening

* [ ] **Wiring & testing**
  * [ ] Compile both client and server (`tsc`)
  * [ ] Test extension activates when opening a `.gear` file
  * [ ] Test autocomplete suggests declared variables
  * [ ] Test autocomplete suggests declared functions
  * [ ] Test suggestions update as you type
  * [ ] Test error squiggles appear for unknown identifiers
  * [ ] Test error squiggles appear for missing semicolons

* [ ] **Neovim port** *(do this after VSCode is fully working)*
  * [ ] Understand how Neovim connects to an LSP server
  * [ ] Write Neovim config to point at `server/out/server.js`
  * [ ] Test basic autocomplete in Neovim
  * [ ] Test file watching works

---

## Notes / Blockers

> Use this section to jot down anything weird, broken, or confusing you hit mid-session.

-