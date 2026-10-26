
/* =========================================
   CITI-HI-TECH — CONTACT PAGE JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    if (!body.classList.contains("contact-page")) {
        return;
    }

    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (!form || !status) {
        return;
    }

    const submitButton = form.querySelector(
        'button[type="submit"]'
    );

    const fields = {
        name: document.getElementById("contact-name"),
        email: document.getElementById("contact-email"),
        service: document.getElementById("contact-service"),
        message: document.getElementById("contact-message")
    };

    function showFieldError(field, message = "") {
        const wrapper = field.closest(".form-field");
        const error = wrapper?.querySelector(".field-error");

        if (!wrapper || !error) {
            return;
        }

        wrapper.classList.toggle("has-error", Boolean(message));
        error.textContent = message;

        field.setAttribute(
            "aria-invalid",
            message ? "true" : "false"
        );
    }

    function clearStatus() {
        status.textContent = "";
        status.className = "form-status";
    }

    function showStatus(message, type) {
        status.textContent = message;
        status.className = `form-status is-${type}`;
    }

    function validateField(field) {
        const value = field.value.trim();
        let message = "";

        if (field.required && !value) {
            message = "This field is required.";
        } else if (
            field.name === "name" &&
            value.length < 2
        ) {
            message = "Please enter your full name.";
        } else if (
            field.name === "email" &&
            value &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
            message = "Please enter a valid email address.";
        } else if (
            field.name === "message" &&
            value.length < 10
        ) {
            message = "Please provide at least 10 characters.";
        }

        showFieldError(field, message);
        return !message;
    }

    // Validate individual fields when visitors edit them.
    Object.values(fields).forEach((field) => {
        if (!field) {
            return;
        }

        field.addEventListener("blur", () => {
            validateField(field);
        });

        field.addEventListener("input", () => {
            if (field.closest(".form-field")?.classList.contains("has-error")) {
                validateField(field);
            }

            clearStatus();
        });

        field.addEventListener("change", clearStatus);
    });

    // Validate the form before allowing submission.
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearStatus();

        const allFields = [
            ...form.querySelectorAll(
                "input[required], select[required], textarea[required]"
            )
        ];

        let isValid = true;
        let firstInvalidField = null;

        allFields.forEach((field) => {
            if (!validateField(field)) {
                isValid = false;
                firstInvalidField ||= field;
            }
        });

        if (!isValid) {
            showStatus(
                "Please review the highlighted fields and try again.",
                "error"
            );

            firstInvalidField?.focus();
            return;
        }

        showStatus(
            "Your details have been checked, but this form is not connected to an email service yet. Your enquiry has not been sent.",
            "error"
        );
    });
});
