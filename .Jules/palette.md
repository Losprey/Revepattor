## 2024-05-19 - Added ARIA labels to inputs, selects, textareas and buttons
**Learning:** Found multiple instances where interactive elements like inputs, textareas, selects, and icon-only buttons lacked proper aria-labels, which hinders screen reader users. The application relies heavily on visual placeholders, so ARIA is crucial here.
**Action:** In vanilla JS/HTML projects, systematically review all form and interactive elements using regex checks (`<input`, `<button`, `<select`, `<textarea`) and enforce `aria-label` where explicit `<label>` tags aren't present.
