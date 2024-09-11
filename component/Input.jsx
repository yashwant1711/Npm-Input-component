import React from "react";
import { useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styles from "./Input.module.css";

const Input = ({
  type = "text",
  id,
  label,
  placeholder,
  helpText,
  clearable,
  validationMessage,
  validationMessageStatus,
  characterLimit,
  prefix,
  suffix,
  autocomplete,
  variant = "normal",
  state = "default",
  onChange,
  value = "",
  autosize = false,
  autosizeControlled = false,
  debounceDelay = 300,
  isURL = false,
  isTelephone = false,
  countryCode = "+1",
  fileTypes = [],
  maxFileSize = 5 * 1024 * 1024,
  multiple = false,
  icon, 
  darkMode = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInputChanged, setIsInputChanged] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [currentCountryCode, setCurrentCountryCode] = useState(countryCode);
  const [phoneNumber, setPhoneNumber] = useState(value.split(" ")[1] || "");
  const [files, setFiles] = useState([]);
  const textareaRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(value.length);

  useEffect(() => {
    setCharacterCount(value.length);
  }, [value]);

  // ... (other useEffect hooks and functions remain the same)
  useEffect(() => {
    if (autosize && type === "textarea" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, autosize, type]);

  const validateAndFormatURL = (url) => {
    if (url.trim().length > 0 && !/^https?:\/\//i.test(url)) {
      return `https://${url.trim()}`;
    }
    return url;
  };

  const handleTelephoneChange = (e) => {
    let newPhoneNumber = e.target.value.replace(/\D/g, "");
    if (newPhoneNumber.length > 10)
      newPhoneNumber = newPhoneNumber.slice(0, 10);
    setPhoneNumber(newPhoneNumber);
    if (onChange)
      onChange({
        target: { value: `${currentCountryCode} ${newPhoneNumber}` },
      });
  };

  const handleClear = () => {
    if (onChange) onChange({ target: { value: "" } });
    setIsInputChanged(false);
    clearTimeout(debounceTimeout);
    setPhoneNumber("");
    setFiles([]);
  };


  const handleInputChange = (e) => {
    let newValue = e.target.value;

    if (isURL) {
      newValue = validateAndFormatURL(newValue);
    }

    if (characterLimit && newValue.length > characterLimit) {
      newValue = newValue.slice(0, characterLimit);
    }

    setCharacterCount(newValue.length);

    if (onChange) onChange({ target: { value: newValue } });

    // ... (rest of the function remains the same)
    clearTimeout(debounceTimeout);
    setIsInputChanged(newValue.length > 0);

    if (type === "search" && newValue.length > 0) {
      const timeout = setTimeout(() => {
        setIsInputChanged(true);
      }, debounceDelay);
      setDebounceTimeout(timeout);
    } else {
      setIsInputChanged(false);
    }
  };
  const handleTextareaChange = (e) => {
    handleInputChange(e);
    if (autosize && type === "textarea" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && type === "search") {
      clearTimeout(debounceTimeout);
      setIsInputChanged(true);
    }
  };

  const handleCountryCodeChange = (e) => {
    setCurrentCountryCode(e.target.value);
    if (onChange)
      onChange({ target: { value: `${e.target.value} ${phoneNumber}` } });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) => {
      const isValidType = fileTypes.length
        ? fileTypes.includes(file.type)
        : true;
      const isValidSize = file.size <= maxFileSize;
      return isValidType && isValidSize;
    });

    setFiles(validFiles);
    if (onChange) onChange({ target: { files: validFiles } });
  };

  const handleFileRemove = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    if (onChange) onChange({ target: { files: updatedFiles } });
  };
  const inputContainerClasses = `
    ${styles.inputContainer2} 
    ${styles[variant]} 
    ${styles[state]} 
    ${isHovered ? styles.hover : ""} 
    ${isFocused ? styles.focus : ""}
    ${variant === "floating" ? styles.floating : ""}
    ${variant === "filled" ? styles.filled : ""}
    ${variant === "underlined" ? styles.underlined : ""}
    ${variant === "rounded" ? styles.rounded : ""}
    ${darkMode ? styles.darkMode : ""}
  `;

  return (
    <div className={`${styles.inputWrapper} ${darkMode ? styles.darkMode : ""}`}>
      {label && variant !== "floating" && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputContainer1}
       style={
        type === "textarea"
          ? {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.5rem",
            }
          : {}
      }>
        <div className={inputContainerClasses}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          {icon && <span className={styles.icon}>{icon}</span>}
          {isTelephone ? (
            <>
              <select
                value={currentCountryCode}
                onChange={handleCountryCodeChange}
                className={styles.countryCode}
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
              </select>
              <input
                type="tel"
                id={id}
                placeholder={variant === "floating" ? " " : placeholder}
                autoComplete={autocomplete}
                value={phoneNumber}
                onChange={handleTelephoneChange}
                className={styles.inputField}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                readOnly={state === "readOnly"}
                disabled={state === "disabled"}
                aria-invalid={validationMessageStatus === "error"}
                aria-describedby={validationMessage ? `${id}-error` : undefined}
                aria-busy={state === "loading"}
                aria-live="polite"
                onKeyDown={handleKeyDown}
                {...props}
              />
            </>
          ) : type === "file" ? (
            <>
              <input
                type="file"
                id={id}
                multiple={multiple}
                onChange={handleFileChange}
                className={styles.inputField}
                disabled={state === "disabled"}
                {...props}
              />
              {files.length > 0 && (
                <div className={styles.fileList}>
                  {files.map((file, index) => (
                    <div key={index} className={styles.fileItem}>
                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      <button
                        type="button"
                        onClick={() => handleFileRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : type === "textarea" ? (
            <textarea
              ref={textareaRef}
              id={id}
              placeholder={variant === "floating" ? " " : placeholder}
              autoComplete={autocomplete}
              value={value}
              onChange={
                autosizeControlled ? handleTextareaChange : handleInputChange
              }
              className={styles.inputField}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              readOnly={state === "readOnly"}
              disabled={state === "disabled"}
              onKeyDown={handleKeyDown}
              {...props}
            />
          ) : (
            <input
              type={type}
              id={id}
              placeholder={variant === "floating" ? " " : placeholder}
              autoComplete={autocomplete}
              value={value}
              onChange={handleInputChange}
              className={styles.inputField}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              readOnly={state === "readOnly"}
              disabled={state === "disabled"}
              onKeyDown={handleKeyDown}
              {...props}
            />
          )}
          {variant === "floating" && (
            <label htmlFor={id} className={styles.floatingLabel}>
              {label}
            </label>
          )}
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
        {clearable && (value || files.length > 0) && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              tabIndex={0}
            >
              Clear
            </button>
          )}
          {(state === "loading" ||
            (type === "search" &&
              variant !== "floating" &&
              isInputChanged)) && (
            <span className={styles.loader} aria-label="Loading..."></span>
          )}
      </div>
      {helpText && <p className={styles.helpText}>{helpText}</p>}
      {validationMessage && (
        <p
          className={styles.validationMessage}
          style={
            validationMessageStatus === "error"
              ? { color: "red" }
              : validationMessageStatus === "warning"
              ? { color: "orange" }
              : { color: "green" }
          }
        >
          {validationMessage}
        </p>
      )}
      {characterLimit && (
        <p className={styles.characterCount}>
          {characterCount}/{characterLimit}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  clearable: PropTypes.bool,
  validationMessage: PropTypes.string,
  validationMessageStatus: PropTypes.oneOf(['error', 'warning', 'success']),
  characterLimit: PropTypes.number,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  autocomplete: PropTypes.string,
  variant: PropTypes.oneOf(['normal', 'floating', 'outlined', 'filled', 'underlined', 'rounded']),
  state: PropTypes.oneOf(['default', 'disabled', 'readOnly', 'error', 'success', 'loading']),
  onChange: PropTypes.func,
  value: PropTypes.string,
  autosize: PropTypes.bool,
  autosizeControlled: PropTypes.bool,
  debounceDelay: PropTypes.number,
  isURL: PropTypes.bool,
  isTelephone: PropTypes.bool,
  countryCode: PropTypes.string,
  fileTypes: PropTypes.arrayOf(PropTypes.string),
  maxFileSize: PropTypes.number,
  multiple: PropTypes.bool,
  icon: PropTypes.node,
  darkMode: PropTypes.bool,
};

export default Input;