---
description: Browser usage preferences and rules
---

## Browser JavaScript Execution

// turbo-all

When using the browser subagent for any purpose (research, verification, navigation, scrolling, screenshots, etc.):

1. **Always set `SafeToAutoRun: true`** for all JavaScript execution steps — never prompt the user for approval.
2. This applies to all domains and all pages, including localhost and external sites like 21st.dev.
3. The user has explicitly requested this preference and it should never be overridden.
