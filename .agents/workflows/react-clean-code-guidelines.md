---
description: React Clean Code Guidelines
---
# React Clean Code Guidelines

This document describes the coding standards for React projects in our team.
These rules ensure the codebase remains **readable, scalable, and maintainable**.

---

# 1. Component Naming

* Use **PascalCase** for component names.
* File names must match the component name.

```jsx
// ✅ Good
UserProfile.jsx

function UserProfile() {
  return <div>User</div>;
}
```

```jsx
// ❌ Bad
userProfile.jsx
profile.jsx
```

---

# 2. Keep Components Small

Each component should have **a single responsibility**.

If a component becomes too large, break it into smaller components.

```jsx
// ❌ Bad
function Dashboard() {
  // fetching logic
  // UI rendering
  // forms
  // tables
}
```

```text
// ✅ Good
Dashboard
 ├── DashboardHeader
 ├── DashboardStats
 └── DashboardTable
```

**Rule**

* Try to keep components under **200 lines**.

---

# 3. Prefer Functional Components

Use **functional components with hooks**.

```jsx
// ✅ Good
function ProductCard({ product }) {
  return <div>{product.name}</div>;
}
```

Avoid class components unless required.

---

# 4. Use Custom Hooks for Logic

Move reusable logic into **custom hooks**.

```jsx
// ❌ Bad
function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);
}
```

```jsx
// ✅ Good
function UsersPage() {
  const { users } = useUsers();
}
```

```text
hooks/
  useUsers.js
```

---

# 5. Separate UI and Business Logic

Components should focus only on **rendering UI**.

```jsx
// ❌ Bad
function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);
}
```

```jsx
// ✅ Good
function ProductList() {
  const { products } = useProducts();
}
```

---

# 6. Props Destructuring

Always destructure props.

```jsx
// ❌ Bad
function Button(props) {
  return <button>{props.label}</button>;
}
```

```jsx
// ✅ Good
function Button({ label }) {
  return <button>{label}</button>;
}
```

---

# 7. Avoid Inline Functions in JSX (When Possible)

Inline functions can cause unnecessary re-renders.

```jsx
// ❌ Bad
<button onClick={() => handleClick(id)} />
```

```jsx
// ✅ Good
const handleUserClick = () => handleClick(id);

<button onClick={handleUserClick} />
```

---

# 8. Use Meaningful Variable Names

Use clear and descriptive names.

```jsx
// ❌ Bad
const d = users.filter(x => x.a === true);
```

```jsx
// ✅ Good
const activeUsers = users.filter(user => user.isActive);
```

---

# 9. Avoid Magic Numbers

Store fixed values inside constants.

```jsx
// ❌ Bad
if (role === 1)
```

```jsx
// ✅ Good
const ROLE_ADMIN = 1;

if (role === ROLE_ADMIN)
```

---

# 10. Use Early Returns

Avoid deeply nested conditions.

```jsx
// ❌ Bad
if (user) {
  if (user.isActive) {
    return <Dashboard />;
  }
}
```

```jsx
// ✅ Good
if (!user) return null;
if (!user.isActive) return <InactiveUser />;

return <Dashboard />;
```

---

# 11. File Length Guideline

| File Type | Recommended Max Lines |
| --------- | --------------------- |
| Component | 200                   |
| Hook      | 150                   |
| Utility   | 150                   |

---

# 12. Folder Responsibilities

| Folder     | Responsibility        |
| ---------- | --------------------- |
| components | UI components         |
| hooks      | reusable hooks        |
| services   | API calls             |
| utils      | helper functions      |
| constants  | application constants |

---

# 13. Avoid Prop Drilling

If props pass through **more than 3 levels**, consider using:

* React Context
* Zustand
* Redux
* Jotai

Example of prop drilling:

```
UserPage
  → UserLayout
    → UserCard
      → UserAvatar
```

---

# 14. Use ESLint and Prettier

All projects must use:

* **ESLint** for linting
* **Prettier** for formatting

Recommended:

* husky
* lint-staged

---

# 15. Commit Message Convention

Use clear commit messages.

```
feat: add user profile component
fix: resolve login redirect issue
refactor: move API logic to hooks
```

---

# Recommended Tools

* React DevTools
* ESLint React Plugin
* Prettier
* TypeScript (recommended)

---

# Summary

Following these rules will help maintain:

* Clean code
* Better readability
* Easier collaboration
* Scalable React applications
