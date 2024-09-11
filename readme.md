# Input Component

A versatile and customizable React input component for various form input types.

## Installation

```bash
npm install yashwant-component
```

## Usage

First, import the component and its styles:

```javascript
import { Input } from "yashwant-component";
import "yashwant-component/dist/index.css";
```

Then, use the component in your React application:

```jsx
import React, { useState } from "react";
import { Input } from "yashwant-component";

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Input
        type="text"
        id="exampleInput"
        label="Example Input"
        placeholder="Enter text here..."
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
```

## Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| type | string | "text" | Input type (e.g., "text", "password", "email", etc.) |
| id | string | Required | Unique identifier for the input |
| label | string | - | Label text for the input |
| placeholder | string | - | Placeholder text |
| value | string | "" | Current value of the input |
| onChange | function | - | Function to handle input changes |
| variant | string | "normal" | Input variant ("normal", "floating", "outlined", "filled", "underlined", "rounded") |
| state | string | "default" | Input state ("default", "hover", "focus", "disabled", "readonly", "error", "success", "loading") |
| clearable | boolean | false | Whether to show a clear button |
| validationMessage | string | - | Validation message to display |
| validationMessageStatus | string | - | Status of validation message ("error", "warning", "success") |
| characterLimit | number | - | Maximum number of characters allowed |
| prefix | node | - | Content to display before the input |
| suffix | node | - | Content to display after the input |
| autocomplete | string | - | Autocomplete attribute for the input |
| helpText | string | - | Help text to display below the input |
| icon | node | - | Icon to display within the input |
| darkMode | boolean | false | Enable dark mode styling |
| isURL | boolean | false | Validate and format as URL |
| isTelephone | boolean | false | Format as telephone number |
| countryCode | string | "+1" | Country code for telephone input |
| fileTypes | array | [] | Allowed file types for file input |
| maxFileSize | number | 5 * 1024 * 1024 | Maximum file size in bytes |
| multiple | boolean | false | Allow multiple file selection |
| autosize | boolean | false | Auto-resize textarea based on content |
| debounceDelay | number | 300 | Delay for debounce functionality (in milliseconds) |

## Features

1. **Multiple Input Types**: Supports various input types including text, password, email, number, date, time, file, and more.
2. **Customizable Variants**: Choose from different input styles like normal, floating label, outlined, filled, underlined, and rounded.
3. **State Management**: Handles different input states such as default, hover, focus, disabled, read-only, error, success, and loading.
4. **Validation**: Built-in support for displaying validation messages with customizable status.
5. **Character Limit**: Option to set and display character limits.
6. **Prefix and Suffix**: Add content before or after the input.
7. **Icons**: Support for adding icons to the input.
8. **Clear Button**: Optional clear button for easy input clearing.
9. **File Upload**: Specialized handling for file inputs with type and size restrictions.
10. **Telephone Input**: Formatted telephone number input with country code selection.
11. **URL Formatting**: Automatic URL formatting and validation.
12. **Textarea Support**: Autosize functionality for textarea inputs.
13. **Dark Mode**: Built-in dark mode styling.
14. **Accessibility**: Designed with accessibility in mind, including proper ARIA attributes.

## Examples

### Basic Text Input

```jsx
<Input
  type="text"
  id="basicInput"
  label="Basic Input"
  placeholder="Enter text..."
  value={inputValue}
  onChange={handleInputChange}
/>
```

### Password Input with Validation

```jsx
<Input
  type="password"
  id="passwordInput"
  label="Password"
  placeholder="Enter password..."
  value={passwordValue}
  onChange={handlePasswordChange}
  validationMessage="Password must be at least 8 characters long"
  validationMessageStatus="error"
/>
```

### Floating Label Input

```jsx
<Input
  type="text"
  id="floatingInput"
  label="Floating Label"
  placeholder="Enter text..."
  value={floatingValue}
  onChange={handleFloatingChange}
  variant="floating"
/>
```

### File Upload

```jsx
<Input
  type="file"
  id="fileInput"
  label="Upload File"
  onChange={handleFileChange}
  multiple
  fileTypes={[".pdf", ".doc", ".docx"]}
  maxFileSize={10 * 1024 * 1024} // 10MB
/>
```

### Search Input with Debounce

```jsx
<Input
  type="search"
  id="searchInput"
  label="Search"
  placeholder="Type to search..."
  value={searchQuery}
  onChange={handleSearchChange}
  debounceDelay={500}
/>
```

## Styling

The component comes with default styling. To customize the appearance, you can override the CSS classes or use the `darkMode` prop for a built-in dark theme.

## Accessibility

The Input component is designed with accessibility in mind, including proper labeling, ARIA attributes, and keyboard navigation support.

## License

This project is licensed under the MIT License.
