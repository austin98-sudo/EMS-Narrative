// Global variables
// let snippets = [];
// let templates = [];
// Snippets and Templates are pulled from their respective files
let currentEditingSnippet = null;
let currentEditingTemplate = null;
let currentQuestionCallback = null;
let fieldCounter = 0;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderSnippetsSidebar();
    renderSnippetsList();
    renderTemplatesList();
    updateTemplateSelection();
});

// Data persistence functions
function saveData() {
    const data = {
        snippets: snippets,
        templates: templates
    };
    // In a real app, this would save to a server or localStorage
    // For now, we'll just keep it in memory
}

function loadData() {
    
}

// Navigation functions
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find the button that was clicked and activate it
    if (typeof event !== 'undefined' && event.target) {
        event.target.classList.add('active');
    }
}

// Template selection functions
function updateTemplateSelection() {
    const list = document.getElementById('templateSelectionList');
    if (templates.length === 0) {
        list.innerHTML = '<p>No templates available. Click "Skip" to start with a blank document.</p>';
        return;
    }

    let html = '<div style="margin-bottom: 1rem;"><strong>Choose a template to start with:</strong></div>';
    templates.forEach(template => {
        const contentPreview = template.content.substring(0, 100);
        const ellipsis = template.content.length > 100 ? '...' : '';
        html += '<div class="template-card" style="cursor: pointer; margin-bottom: 0.5rem;" onclick="selectTemplate(' + template.id + ')">';
        html += '<div class="template-card-header">';
        html += '<h3>' + template.name + '</h3>';
        html += '</div>';
        html += '<p style="color: #7f8c8d; font-size: 0.9rem;">' + contentPreview + ellipsis + '</p>';
        html += '</div>';
    });
    list.innerHTML = html;
}

function closeTemplateSelection() {
    const modal = document.getElementById('templateSelectionModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function selectTemplate(templateId) {
    const template = templates.find(t => t.id === templateId);
    if (template) {
        document.getElementById('documentationText').value = template.content;
    }
    closeTemplateSelection();
    // Switch to editor page after template selection
    showPage('editor');
    // Update nav button state
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.nav-btn').classList.add('active');
}

function selectTemplateFromEditor(templateId) {
    const template = templates.find(t => t.id === templateId);
    if (template) {
        const textarea = document.getElementById('documentationText');
        const currentContent = textarea.value.trim();
        
        if (currentContent && !confirm('This will replace your current content. Continue?')) {
            return;
        }
        
        textarea.value = template.content;
        textarea.focus();
    }
    closeTemplateSelector();
}

function openTemplateSelector() {
    const modal = document.getElementById('templateSelectorModal');
    const list = document.getElementById('templateSelectorList');
    
    if (templates.length === 0) {
        list.innerHTML = '<p>No templates available. <a href="#" onclick="showPage(\'templates\'); closeTemplateSelector();">Create a template first</a>.</p>';
    } else {
        let html = '<div style="margin-bottom: 1rem;"><strong>Choose a template to insert:</strong></div>';
        templates.forEach(template => {
            const contentPreview = template.content.substring(0, 100);
            const ellipsis = template.content.length > 100 ? '...' : '';
            html += '<div class="template-card" style="cursor: pointer; margin-bottom: 0.5rem;" onclick="selectTemplateFromEditor(' + template.id + ')">';
            html += '<div class="template-card-header">';
            html += '<h3>' + template.name + '</h3>';
            html += '</div>';
            html += '<p style="color: #7f8c8d; font-size: 0.9rem;">' + contentPreview + ellipsis + '</p>';
            html += '</div>';
        });
        list.innerHTML = html;
    }
    
    modal.classList.add('active');
}

function closeTemplateSelector() {
    const modal = document.getElementById('templateSelectorModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Update the renderSnippetsSidebar function
function renderSnippetsSidebar() {
    const sidebar = document.getElementById('snippetsSidebar');
    const groupedSnippets = groupSnippetsByGroup();
    
    let html = '';
    for (const [groupName, snippetList] of Object.entries(groupedSnippets)) {
        const groupId = 'sidebar-group-' + groupName.replace(/\s+/g, '-').toLowerCase();
        
        html += '<div class="snippet-group">';
        html += '<div class="snippet-group-header-sidebar" onclick="toggleSidebarGroup(\'' + groupId + '\')">';
        html += '<span class="group-toggle-icon" id="icon-' + groupId + '">▶</span>'; // Start with right arrow
        html += '<h3>' + groupName + '</h3>';
        html += '</div>';
        html += '<div class="snippet-group-content-sidebar" id="' + groupId + '" style="display: none;">'; // Start hidden
        snippetList.forEach(snippet => {
            html += '<div class="snippet-item" onclick="insertSnippet(\'' + snippet.name + '\')">';
            html += snippet.name;
            html += '</div>';
        });
        html += '</div>';
        html += '</div>';
    }
    
    sidebar.innerHTML = html || '<p>No snippets available.</p>';
}

// Updated toggle functions (no changes needed, but shown for completeness)
function toggleSnippetGroup(groupId) {
    const content = document.getElementById(groupId);
    const icon = document.getElementById('icon-' + groupId);
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▼';
    } else {
        content.style.display = 'none';
        icon.textContent = '▶';
    }
}

function toggleSidebarGroup(groupId) {
    const content = document.getElementById(groupId);
    const icon = document.getElementById('icon-' + groupId);
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▼';
    } else {
        content.style.display = 'none';
        icon.textContent = '▶';
    }
}

// Add these functions for expand/collapse all functionality
function expandAllGroups() {
    document.querySelectorAll('.snippet-group-content, .snippet-group-content-sidebar').forEach(content => {
        content.style.display = 'block';
    });
    document.querySelectorAll('.group-toggle-icon').forEach(icon => {
        icon.textContent = '▼';
    });
}

function collapseAllGroups() {
    document.querySelectorAll('.snippet-group-content, .snippet-group-content-sidebar').forEach(content => {
        content.style.display = 'none';
    });
    document.querySelectorAll('.group-toggle-icon').forEach(icon => {
        icon.textContent = '▶';
    });
}

function groupSnippetsByGroup() {
    const grouped = {};
    snippets.forEach(snippet => {
        if (!grouped[snippet.group]) {
            grouped[snippet.group] = [];
        }
        grouped[snippet.group].push(snippet);
    });
    return grouped;
}

function insertSnippet(snippetName) {
    const textarea = document.getElementById('documentationText');
    const cursorPos = textarea.selectionStart;
    const textBefore = textarea.value.substring(0, cursorPos);
    const textAfter = textarea.value.substring(cursorPos);
    
    textarea.value = textBefore + '{' + snippetName + '}' + textAfter;
    textarea.focus();
    textarea.setSelectionRange(cursorPos + snippetName.length + 2, cursorPos + snippetName.length + 2);
    
    // Automatically evaluate the inserted snippet
    setTimeout(() => {
        evaluateSnippets();
    }, 100);
}

// Snippet evaluation functions
function evaluateSnippets() {
    const text = document.getElementById('documentationText').value;
    const snippetMatches = text.match(/\{([^}]+)\}/g);
    
    if (!snippetMatches) {
        alert('No snippets found in the text.');
        return;
    }
    
    const uniqueSnippets = [...new Set(snippetMatches.map(match => match.slice(1, -1)))];
    processSnippets(uniqueSnippets, 0);
}

function processSnippets(snippetNames, index) {
    if (index >= snippetNames.length) {
        return;
    }
    
    const snippetName = snippetNames[index];
    const snippet = snippets.find(s => s.name === snippetName);
    
    if (snippet) {
        showQuestionModal(snippet, (answers) => {
            replaceSnippetInText(snippetName, answers);
            processSnippets(snippetNames, index + 1);
        });
    } else {
        // Generic text input for unknown snippets
        showGenericQuestionModal(snippetName, (answer) => {
            replaceSnippetInText(snippetName, answer);
            processSnippets(snippetNames, index + 1);
        });
    }
}

function replaceSnippetInText(snippetName, replacement) {
    const textarea = document.getElementById('documentationText');
    const regex = new RegExp('\\{' + snippetName + '\\}', 'g');
    textarea.value = textarea.value.replace(regex, replacement);
}

// Question modal functions
function showQuestionModal(snippet, callback) {
    currentQuestionCallback = callback;
    const modal = document.getElementById('questionModal');
    const content = document.getElementById('questionContent');
    
    let html = '<div class="question-form">';
    html += '<div class="question-header">Fill information for: ' + snippet.name + '</div>';
    
    // Show template preview if available
    if (snippet.template) {
        html += '<div id="templatePreview" style="background: #e8f4fd; padding: 1rem; border-radius: 5px; margin-bottom: 1rem; border-left: 4px solid #3498db;">';
        html += '<strong>Preview:</strong><br>';
        html += '<em id="previewText" style="color: #2c3e50;">' + snippet.template + '</em>';
        html += '</div>';
    }
    
    snippet.fields.forEach((field, index) => {
        const isConditional = field.conditional && field.conditional.dependsOn;
        const conditionalClass = isConditional ? 'conditional-field' : '';
        const conditionalStyle = isConditional ? 'style="display: none;"' : '';
        const dependsOn = field.conditional ? field.conditional.dependsOn : '';
        const showWhen = field.conditional ? field.conditional.showWhen : '';
        
        html += '<div class="form-group ' + conditionalClass + '" ' + conditionalStyle + ' data-field-id="' + field.id + '" data-depends-on="' + dependsOn + '" data-show-when="' + showWhen + '">';
        html += '<label class="form-label">' + field.name + (field.required ? ' *' : '');
        if (snippet.template) {
            html += ' <small style="color: #7f8c8d;">(field' + (index + 1) + ')</small>';
        }
        html += '</label>';
        
        switch (field.type) {
            case 'text':
                html += '<input type="text" class="form-input" id="field_' + field.id + '" value="' + (field.defaultValue || '') + '" ' + (field.required ? 'required' : '') + ' oninput="updateTemplatePreview()">';
                break;
            case 'select':
                html += '<select class="form-input" id="field_' + field.id + '" ' + (field.required ? 'required' : '') + ' onchange="handleFieldChange(' + field.id + '); updateTemplatePreview();">';
                if (field.options) {
                    field.options.forEach(option => {
                        const selected = option === field.defaultValue ? 'selected' : '';
                        html += '<option value="' + option + '" ' + selected + '>' + option + '</option>';
                    });
                }
                html += '</select>';
                break;
            case 'multiselect':
                html += '<select class="form-input" id="field_' + field.id + '" multiple onchange="updateTemplatePreview()">';
                if (field.options) {
                    field.options.forEach(option => {
                        html += '<option value="' + option + '">' + option + '</option>';
                    });
                }
                html += '</select>';
                break;
            case 'radio':
                if (field.options) {
                    field.options.forEach(option => {
                        const checked = option === field.defaultValue ? 'checked' : '';
                        html += '<label style="display: block; margin-bottom: 0.5rem;">';
                        html += '<input type="radio" name="field_' + field.id + '" value="' + option + '" ' + checked + ' onchange="handleFieldChange(' + field.id + '); updateTemplatePreview();"> ' + option;
                        html += '</label>';
                    });
                }
                break;
        }
        html += '</div>';
    });
    
    html += '</div>';
    content.innerHTML = html;
    modal.classList.add('active');
    
    // Store snippet reference for preview updates
    window.currentSnippet = snippet;
    
    // Force initial evaluation of all conditional fields
    setTimeout(() => {
        snippet.fields.forEach(field => {
            if (!field.conditional) {
                // Trigger change for non-conditional fields to show dependent fields
                const fieldElement = document.getElementById('field_' + field.id);
                if (fieldElement) {
                    handleFieldChange(field.id);
                }
            }
        });
        
        // Update preview after initial setup
        if (snippet.template) {
            updateTemplatePreview();
        }
    }, 50);
}

function handleFieldChange(fieldId) {
    const snippet = window.currentSnippet;
    if (!snippet) return;
    
    const fieldElement = document.getElementById('field_' + fieldId);
    if (!fieldElement) return;
    
    let selectedValue = '';
    if (fieldElement.type === 'radio') {
        const radioGroup = document.querySelectorAll('input[name="field_' + fieldId + '"]:checked');
        if (radioGroup.length > 0) {
            selectedValue = radioGroup[0].value;
        }
    } else {
        selectedValue = fieldElement.value;
    }
    
    // Find conditional fields that depend on this field
    const conditionalFields = snippet.fields.filter(field => 
        field.conditional && field.conditional.dependsOn === fieldId
    );
    
    conditionalFields.forEach(conditionalField => {
        const conditionalElement = document.querySelector('[data-field-id="' + conditionalField.id + '"]');
        if (!conditionalElement) return;
        
        const showWhen = conditionalField.conditional.showWhen;
        const shouldShow = selectedValue === showWhen;
        
        if (shouldShow) {
            conditionalElement.style.display = 'block';
            conditionalElement.classList.add('conditional-field-visible');
        } else {
            conditionalElement.style.display = 'none';
            conditionalElement.classList.remove('conditional-field-visible');
            // Clear the value when hiding
            const input = conditionalElement.querySelector('.form-input');
            if (input) {
                if (input.type === 'radio') {
                    const radioInputs = conditionalElement.querySelectorAll('input[type="radio"]');
                    radioInputs.forEach(radio => radio.checked = false);
                } else {
                    input.value = conditionalField.defaultValue || '';
                }
            }
        }
    });
    
    updateTemplatePreview();
}

function updateTemplatePreview() {
    const previewElement = document.getElementById('previewText');
    if (!previewElement || !window.currentSnippet) return;
    
    let preview = window.currentSnippet.template;
    const content = document.getElementById('questionContent');
    
    // Get all visible form inputs (excluding hidden conditional fields)
    const visibleFormGroups = content.querySelectorAll('.form-group:not([style*="display: none"])');
    
    let fieldValues = [];
    visibleFormGroups.forEach(formGroup => {
        const inputs = formGroup.querySelectorAll('input, select');
        inputs.forEach(input => {
            let value = '';
            if (input.type === 'radio') {
                if (input.checked) {
                    value = input.value;
                } else {
                    return;
                }
            } else if (input.type === 'checkbox') {
                if (input.checked) {
                    value = input.value;
                } else {
                    return;
                }
            } else if (input.multiple) {
                const selectedOptions = Array.from(input.selectedOptions).map(option => option.value);
                value = selectedOptions.join(', ');
            } else {
                value = input.value;
            }
            
            // Only add non-empty values or show [blank] for empty required fields
            const fieldId = parseInt(input.id.replace('field_', ''));
            const field = window.currentSnippet.fields.find(f => f.id === fieldId);
            const isVisible = !formGroup.style.display || formGroup.style.display !== 'none';
            
            if (isVisible) {
                fieldValues.push(value || (field && field.required ? '[blank]' : ''));
            }
        });
    });
    
    // Replace template placeholders with actual values
    fieldValues.forEach((value, index) => {
        const placeholder = '{field' + (index + 1) + '}';
        preview = preview.split(placeholder).join(value);
    });
    
    // Clean up any remaining placeholders
    preview = preview.replace(/\{field\d+\}/g, '');
    
    previewElement.textContent = preview;
}

function showGenericQuestionModal(snippetName, callback) {
    currentQuestionCallback = callback;
    const modal = document.getElementById('questionModal');
    const content = document.getElementById('questionContent');
    
    content.innerHTML = '<div class="question-form">' +
        '<div class="question-header">Enter value for: ' + snippetName + '</div>' +
        '<div class="form-group">' +
        '<label class="form-label">Value</label>' +
        '<input type="text" class="form-input" id="genericValue" required>' +
        '</div>' +
        '</div>';
    modal.classList.add('active');
}

function submitAnswers() {
    const content = document.getElementById('questionContent');
    const genericValue = document.getElementById('genericValue');
    
    if (genericValue) {
        // Generic snippet
        if (currentQuestionCallback) {
            currentQuestionCallback(genericValue.value);
        }
    } else {
        // Regular snippet with fields
        const visibleFormGroups = content.querySelectorAll('.form-group:not([style*="display: none"])');
        let fieldValues = [];
        
        visibleFormGroups.forEach(formGroup => {
            const inputs = formGroup.querySelectorAll('input, select');
            inputs.forEach(input => {
                let value = '';
                if (input.type === 'radio') {
                    if (input.checked) {
                        value = input.value;
                    } else {
                        return; // Skip unchecked radio buttons
                    }
                } else if (input.type === 'checkbox') {
                    if (input.checked) {
                        value = input.value;
                    } else {
                        return; // Skip unchecked checkboxes
                    }
                } else if (input.multiple) {
                    const selectedOptions = Array.from(input.selectedOptions).map(option => option.value);
                    value = selectedOptions.join(', ');
                } else {
                    value = input.value;
                }
                
                fieldValues.push(value);
            });
        });
        
        if (currentQuestionCallback) {
            // Find the snippet to get its template
            const snippet = window.currentSnippet;
            
            let result = '';
            if (snippet && snippet.template) {
                // Use template to format the output
                result = snippet.template;
                fieldValues.forEach((value, index) => {
                    const placeholder = '{field' + (index + 1) + '}';
                    result = result.split(placeholder).join(value || '');
                });
                
                // Clean up any remaining placeholders
                result = result.replace(/\{field\d+\}/g, '');
            } else {
                // Fallback to just the joined values without field labels
                result = fieldValues.filter(v => v).join(', ');
            }
            
            currentQuestionCallback(result);
        }
    }
    
    closeQuestionModal();
}

function closeQuestionModal() {
    const modal = document.getElementById('questionModal');
    if (modal) {
        modal.classList.remove('active');
    }
    currentQuestionCallback = null;
    window.currentSnippet = null;
}

// Update the renderSnippetsList function
function renderSnippetsList() {
    const list = document.getElementById('snippetsList');
    if (!list) return;
    
    if (snippets.length === 0) {
        list.innerHTML = '<p>No snippets created yet. Click "Create New Snippet" to get started.</p>';
        return;
    }

    // Group snippets by their group name
    const groupedSnippets = {};
    snippets.forEach((snippet, index) => {
        if (!groupedSnippets[snippet.group]) {
            groupedSnippets[snippet.group] = [];
        }
        groupedSnippets[snippet.group].push({...snippet, originalIndex: index});
    });

    let html = '';
    
    // Render each group as a collapsible section (collapsed by default)
    Object.keys(groupedSnippets).forEach(groupName => {
        const groupSnippets = groupedSnippets[groupName];
        const groupId = 'group-' + groupName.replace(/\s+/g, '-').toLowerCase();
        
        html += '<div class="snippet-group-section">';
        html += '<div class="snippet-group-header" onclick="toggleSnippetGroup(\'' + groupId + '\')">';
        html += '<span class="group-toggle-icon" id="icon-' + groupId + '">▶</span>'; // Start with right arrow
        html += '<h3 class="group-title">' + groupName + '</h3>';
        html += '<span class="group-count">(' + groupSnippets.length + ' snippet' + (groupSnippets.length !== 1 ? 's' : '') + ')</span>';
        html += '</div>';
        html += '<div class="snippet-group-content" id="' + groupId + '" style="display: none;">'; // Start hidden
        
        groupSnippets.forEach(snippet => {
            const fieldsText = snippet.fields.map(f => f.name).join(', ');
            const templateText = snippet.template ? '<br><strong>Output:</strong> <em style="color: #7f8c8d;">' + snippet.template + '</em>' : '';
            
            html += '<div class="snippet-card" data-snippet-index="' + snippet.originalIndex + '">';
            html += '<div class="snippet-card-header">';
            html += '<div class="move-buttons">';
            html += '<button class="move-btn" ' + (snippet.originalIndex === 0 ? 'disabled' : '') + ' onclick="moveSnippetUp(' + snippet.originalIndex + ')" title="Move up">↑</button>';
            html += '<button class="move-btn" ' + (snippet.originalIndex === snippets.length - 1 ? 'disabled' : '') + ' onclick="moveSnippetDown(' + snippet.originalIndex + ')" title="Move down">↓</button>';
            html += '</div>';
            html += '<div class="snippet-info">';
            html += '<div class="snippet-title">' + snippet.name + '</div>';
            html += '</div>';
            html += '<div class="snippet-actions">';
            html += '<button class="btn-sm btn-edit" onclick="editSnippet(' + snippet.id + ')">Edit</button>';
            html += '<button class="btn-sm btn-delete" onclick="deleteSnippet(' + snippet.id + ')">Delete</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        
        html += '</div>';
        html += '</div>';
    });
    
    list.innerHTML = html;
}

function openSnippetModal(snippetId) {
    snippetId = snippetId || null;
    currentEditingSnippet = snippetId;
    const modal = document.getElementById('snippetModal');
    const title = document.getElementById('snippetModalTitle');
    
    if (snippetId) {
        const snippet = snippets.find(s => s.id === snippetId);
        title.textContent = 'Edit Snippet';
        document.getElementById('snippetName').value = snippet.name;
        document.getElementById('snippetGroup').value = snippet.group;
        document.getElementById('snippetTemplate').value = snippet.template || '';
        renderFields(snippet.fields);
    } else {
        title.textContent = 'Create New Snippet';
        document.getElementById('snippetName').value = '';
        document.getElementById('snippetGroup').value = '';
        document.getElementById('snippetTemplate').value = '';
        renderFields([]);
    }
    
    modal.classList.add('active');
}

function closeSnippetModal() {
    const modal = document.getElementById('snippetModal');
    if (modal) {
        modal.classList.remove('active');
    }
    currentEditingSnippet = null;
    fieldCounter = 0;
}

function editSnippet(snippetId) {
    openSnippetModal(snippetId);
}

function deleteSnippet(snippetId) {
    if (confirm('Are you sure you want to delete this snippet?')) {
        snippets = snippets.filter(s => s.id !== snippetId);
        renderSnippetsList();
        renderSnippetsSidebar();
        saveData();
    }
}

function moveSnippetUp(index) {
    if (index <= 0) return;
    
    const temp = snippets[index];
    snippets[index] = snippets[index - 1];
    snippets[index - 1] = temp;
    
    renderSnippetsList();
    renderSnippetsSidebar();
    saveData();
}

function moveSnippetDown(index) {
    if (index >= snippets.length - 1) return;
    
    const temp = snippets[index];
    snippets[index] = snippets[index + 1];
    snippets[index + 1] = temp;
    
    renderSnippetsList();
    renderSnippetsSidebar();
    saveData();
}

function renderFields(fields) {
    fields = fields || [];
    const container = document.getElementById('fieldsContainer');
    if (!container) return;
    
    let html = '';
    
    if (fields.length > 0) {
        fields.forEach((field, index) => {
            const conditionalText = field.conditional 
                ? '<br><strong>Conditional:</strong> Shows when field ' + (fields.findIndex(f => f.id === field.conditional.dependsOn) + 1) + ' = "' + field.conditional.showWhen + '"'
                : '';
            
            html += '<div class="field-item ' + (field.conditional ? 'conditional-field-item' : '') + '" onclick="editField(' + index + ')">';
            html += '<div class="field-header">';
            html += '<div class="field-number">';
            html += '<span class="field-number-badge">' + (index + 1) + '</span>';
            html += '</div>';
            html += '<div class="move-buttons">';
            html += '<button class="move-btn" ' + (index === 0 ? 'disabled' : '') + ' onclick="event.stopPropagation(); moveFieldUp(' + index + ')" title="Move up">↑</button>';
            html += '<button class="move-btn" ' + (index === fields.length - 1 ? 'disabled' : '') + ' onclick="event.stopPropagation(); moveFieldDown(' + index + ')" title="Move down">↓</button>';
            html += '</div>';
            html += '<div class="field-info">';
            html += '<strong>' + field.name + '</strong>';
            html += field.conditional ? '<span class="conditional-badge">Conditional</span>' : '';
            html += '</div>';
            html += '<div class="field-controls">';
            html += '<button type="button" class="btn-small btn-edit" onclick="event.stopPropagation(); editField(' + index + ')" title="Edit field">Edit</button>';
            html += '<button type="button" class="btn-small btn-delete" onclick="event.stopPropagation(); removeField(' + index + ')" title="Delete field">Delete</button>';
            html += '</div>';
            html += '</div>';
            html += '<div class="field-details">';
            html += '<div class="field-meta">';
            html += '<strong>Type:</strong> ' + field.type + '<br>';
            html += '<strong>Required:</strong> ' + (field.required ? 'Yes' : 'No');
            html += conditionalText;
            html += '</div>';
            html += '<div class="field-meta">';
            html += field.options ? '<strong>Options:</strong> ' + field.options.join(', ') + '<br>' : '';
            html += field.defaultValue ? '<strong>Default:</strong> ' + field.defaultValue : '';
            html += '</div>';
            html += '</div>';
            html += '<div class="field-template-info">';
            html += '<small><strong>Template placeholder:</strong> {field' + (index + 1) + '}</small>';
            html += '</div>';
            html += '</div>';
        });
    }
    
    html += '<div class="add-field-section" onclick="showFieldForm()">';
    html += '<p style="margin: 0; color: #6c757d;">';
    html += '<span style="font-size: 2rem;">+</span><br>';
    html += 'Click to add a field';
    html += '</p>';
    html += '</div>';
    
    container.innerHTML = html;
}

function moveFieldUp(index) {
    const fields = getCurrentFields();
    if (index <= 0) return;
    
    const temp = fields[index];
    fields[index] = fields[index - 1];
    fields[index - 1] = temp;
    
    if (currentEditingSnippet) {
        const snippet = snippets.find(s => s.id === currentEditingSnippet);
        if (snippet) {
            snippet.fields = fields;
        }
    } else {
        window.tempFields = fields;
    }
    
    renderFields(fields);
}

function moveFieldDown(index) {
    const fields = getCurrentFields();
    if (index >= fields.length - 1) return;
    
    const temp = fields[index];
    fields[index] = fields[index + 1];
    fields[index + 1] = temp;
    
    if (currentEditingSnippet) {
        const snippet = snippets.find(s => s.id === currentEditingSnippet);
        if (snippet) {
            snippet.fields = fields;
        }
    } else {
        window.tempFields = fields;
    }
    
    renderFields(fields);
}

function showFieldForm() {
    const container = document.getElementById('fieldsContainer');
    const currentFields = getCurrentFields();
    
    let conditionalOptions = '<option value="">None (Always show)</option>';
    currentFields.forEach((field, index) => {
        if (field.type === 'select' || field.type === 'radio') {
            conditionalOptions += '<option value="' + field.id + '">' + field.name + ' (Field ' + (index + 1) + ')</option>';
        }
    });
    
    const fieldForm = '<div class="field-form" id="fieldForm">' +
        '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">' +
        '<h4>Add New Field</h4>' +
        '<button type="button" class="btn-small btn-danger" onclick="hideFieldForm()">Cancel</button>' +
        '</div>' +
        '<div class="field-form-row">' +
        '<div class="form-group" style="margin-bottom: 0;">' +
        '<label class="form-label">Field Name</label>' +
        '<input type="text" class="form-input" id="newFieldName" placeholder="Enter field name">' +
        '</div>' +
        '<div class="form-group" style="margin-bottom: 0;">' +
        '<label class="form-label">Field Type</label>' +
        '<select class="form-input" id="newFieldType" onchange="toggleFieldOptions()">' +
        '<option value="text">Text Input</option>' +
        '<option value="select">Dropdown Select</option>' +
        '<option value="multiselect">Multi-Select</option>' +
        '<option value="radio">Radio Buttons</option>' +
        '</select>' +
        '</div>' +
        '</div>' +
        '<div class="checkbox-group">' +
        '<label>' +
        '<input type="checkbox" id="newFieldRequired"> Required Field' +
        '</label>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="form-label">Default Value (Optional)</label>' +
        '<input type="text" class="form-input" id="newFieldDefault" placeholder="Enter default value">' +
        '</div>' +
        '<div id="fieldOptionsContainer" style="display: none;">' +
        '<label class="form-label">Options</label>' +
        '<div class="options-container" id="optionsContainer">' +
        '<div class="option-item">' +
        '<input type="text" class="option-input" placeholder="Option 1">' +
        '<button type="button" class="btn-small btn-danger" onclick="removeOption(this)">Remove</button>' +
        '</div>' +
        '</div>' +
        '<button type="button" class="btn-small btn-success" onclick="addOption()">Add Option</button>' +
        '</div>' +
        '<div class="conditional-section" style="border: 1px solid #e9ecef; border-radius: 5px; padding: 1rem; margin-top: 1rem; background: #f8f9fa;">' +
        '<h5 style="margin-top: 0; color: #2c3e50;">Conditional Logic (Optional)</h5>' +
        '<div class="field-form-row">' +
        '<div class="form-group" style="margin-bottom: 0;">' +
        '<label class="form-label">Show this field only when:</label>' +
        '<select class="form-input" id="conditionalDependsOn" onchange="updateConditionalOptions()">' +
        conditionalOptions +
        '</select>' +
        '</div>' +
        '<div class="form-group" style="margin-bottom: 0;">' +
        '<label class="form-label">Equals this value:</label>' +
        '<select class="form-input" id="conditionalShowWhen" disabled>' +
        '<option value="">Select a field first</option>' +
        '</select>' +
        '</div>' +
        '</div>' +
        '<small style="color: #6c757d; display: block; margin-top: 0.5rem;">' +
        'Conditional fields will only appear when the selected field has the specified value.' +
        '</small>' +
        '</div>' +
        '<div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1rem;">' +
        '<button type="button" class="btn-secondary" onclick="hideFieldForm()">Cancel</button>' +
        '<button type="button" class="btn-primary" onclick="saveField()">Add Field</button>' +
        '</div>' +
        '</div>';
    
    const addButton = container.querySelector('.add-field-section');
    addButton.insertAdjacentHTML('beforebegin', fieldForm);
    addButton.style.display = 'none';
}

function updateConditionalOptions() {
    const dependsOnSelect = document.getElementById('conditionalDependsOn');
    const showWhenSelect = document.getElementById('conditionalShowWhen');
    const selectedFieldId = dependsOnSelect.value;
    
    if (!selectedFieldId) {
        showWhenSelect.innerHTML = '<option value="">Select a field first</option>';
        showWhenSelect.disabled = true;
        return;
    }
    
    const currentFields = getCurrentFields();
    const selectedField = currentFields.find(field => field.id == selectedFieldId);
    
    if (selectedField && selectedField.options) {
        showWhenSelect.innerHTML = '';
        selectedField.options.forEach(option => {
            showWhenSelect.innerHTML += '<option value="' + option + '">' + option + '</option>';
        });
        showWhenSelect.disabled = false;
    } else {
        showWhenSelect.innerHTML = '<option value="">No options available</option>';
        showWhenSelect.disabled = true;
    }
}

function hideFieldForm() {
    const fieldForm = document.getElementById('fieldForm');
    if (fieldForm) {
        fieldForm.remove();
    }
    const addButton = document.querySelector('.add-field-section');
    if (addButton) {
        addButton.style.display = 'block';
    }
}

function toggleFieldOptions() {
    const fieldType = document.getElementById('newFieldType').value;
    const optionsContainer = document.getElementById('fieldOptionsContainer');
    
    if (['select', 'multiselect', 'radio'].includes(fieldType)) {
        optionsContainer.style.display = 'block';
    } else {
        optionsContainer.style.display = 'none';
    }
}

function addOption() {
    const container = document.getElementById('optionsContainer');
    const optionCount = container.children.length + 1;
    
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option-item';
    optionDiv.innerHTML = '<input type="text" class="option-input" placeholder="Option ' + optionCount + '">' +
        '<button type="button" class="btn-small btn-danger" onclick="removeOption(this)">Remove</button>';
    
    container.appendChild(optionDiv);
}

function removeOption(button) {
    button.parentElement.remove();
}

function saveField() {
    const name = document.getElementById('newFieldName').value.trim();
    const type = document.getElementById('newFieldType').value;
    const required = document.getElementById('newFieldRequired').checked;
    const defaultValue = document.getElementById('newFieldDefault').value.trim();
    const conditionalDependsOn = document.getElementById('conditionalDependsOn').value;
    const conditionalShowWhen = document.getElementById('conditionalShowWhen').value;
    
    if (!name) {
        alert('Please enter a field name.');
        return;
    }
    
    let options = null;
    if (['select', 'multiselect', 'radio'].includes(type)) {
        const optionInputs = document.querySelectorAll('#optionsContainer .option-input');
        options = Array.from(optionInputs)
            .map(input => input.value.trim())
            .filter(value => value !== '');
        
        if (options.length === 0) {
            alert('Please add at least one option for this field type.');
            return;
        }
    }
    
    const newField = {
        id: Date.now(),
        name: name,
        type: type,
        required: required,
        options: options,
        defaultValue: defaultValue
    };
    
    if (conditionalDependsOn && conditionalShowWhen) {
        newField.conditional = {
            dependsOn: parseInt(conditionalDependsOn),
            showWhen: conditionalShowWhen
        };
    }
    
    if (currentEditingSnippet) {
        const snippet = snippets.find(s => s.id === currentEditingSnippet);
        if (snippet) {
            snippet.fields.push(newField);
            renderFields(snippet.fields);
        }
    } else {
        if (!window.tempFields) {
            window.tempFields = [];
        }
        window.tempFields.push(newField);
        renderFields(window.tempFields);
    }
    
    hideFieldForm();
}

function editField(index) {
    const fields = getCurrentFields();
    const field = fields[index];
    
    showFieldForm();
    
    setTimeout(() => {
        document.getElementById('newFieldName').value = field.name;
        document.getElementById('newFieldType').value = field.type;
        document.getElementById('newFieldRequired').checked = field.required;
        document.getElementById('newFieldDefault').value = field.defaultValue || '';
        
        toggleFieldOptions();
        
        if (field.options) {
            const container = document.getElementById('optionsContainer');
            container.innerHTML = '';
            field.options.forEach((option, i) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option-item';
                optionDiv.innerHTML = '<input type="text" class="option-input" value="' + option + '" placeholder="Option ' + (i + 1) + '">' +
                    '<button type="button" class="btn-small btn-danger" onclick="removeOption(this)">Remove</button>';
                container.appendChild(optionDiv);
            });
        }
        
        if (field.conditional) {
            document.getElementById('conditionalDependsOn').value = field.conditional.dependsOn;
            updateConditionalOptions();
            setTimeout(() => {
                document.getElementById('conditionalShowWhen').value = field.conditional.showWhen;
            }, 100);
        }
        
        const saveBtn = document.querySelector('#fieldForm .btn-primary');
        saveBtn.textContent = 'Update Field';
        saveBtn.onclick = () => updateField(index);
    }, 100);
}

function updateField(index) {
    const name = document.getElementById('newFieldName').value.trim();
    const type = document.getElementById('newFieldType').value;
    const required = document.getElementById('newFieldRequired').checked;
    const defaultValue = document.getElementById('newFieldDefault').value.trim();
    const conditionalDependsOn = document.getElementById('conditionalDependsOn').value;
    const conditionalShowWhen = document.getElementById('conditionalShowWhen').value;
    
    if (!name) {
        alert('Please enter a field name.');
        return;
    }
    
    let options = null;
    if (['select', 'multiselect', 'radio'].includes(type)) {
        const optionInputs = document.querySelectorAll('#optionsContainer .option-input');
        options = Array.from(optionInputs)
            .map(input => input.value.trim())
            .filter(value => value !== '');
        
        if (options.length === 0) {
            alert('Please add at least one option for this field type.');
            return;
        }
    }
    
    const fields = getCurrentFields();
    fields[index] = {
        ...fields[index],
        name: name,
        type: type,
        required: required,
        options: options,
        defaultValue: defaultValue
    };
    
    if (conditionalDependsOn && conditionalShowWhen) {
        fields[index].conditional = {
            dependsOn: parseInt(conditionalDependsOn),
            showWhen: conditionalShowWhen
        };
    } else {
        delete fields[index].conditional;
    }
    
    if (currentEditingSnippet) {
        const snippet = snippets.find(s => s.id === currentEditingSnippet);
        if (snippet) {
            snippet.fields = fields;
        }
    } else {
        window.tempFields = fields;
    }
    
    renderFields(fields);
    hideFieldForm();
}

function removeField(index) {
    if (!confirm('Are you sure you want to remove this field?')) {
        return;
    }
    
    const fields = getCurrentFields();
    fields.splice(index, 1);
    
    if (currentEditingSnippet) {
        const snippet = snippets.find(s => s.id === currentEditingSnippet);
        if (snippet) {
            snippet.fields = fields;
        }
    } else {
        window.tempFields = fields;
    }
    
    renderFields(fields);
}

function getCurrentFields() {
    if (currentEditingSnippet) {
        const snippet = snippets.find(s => s.id === currentEditingSnippet);
        return snippet ? snippet.fields : [];
    }
    return window.tempFields || [];
}

function saveSnippet() {
    const name = document.getElementById('snippetName').value.trim();
    const group = document.getElementById('snippetGroup').value.trim();
    const template = document.getElementById('snippetTemplate').value.trim();
    
    if (!name || !group) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const fields = getCurrentFields();
    
    if (currentEditingSnippet) {
        const snippet = snippets.find(s => s.id === currentEditingSnippet);
        if (snippet) {
            snippet.name = name;
            snippet.group = group;
            snippet.template = template;
            snippet.fields = fields;
        }
    } else {
        const newSnippet = {
            id: Date.now(),
            name: name,
            group: group,
            template: template,
            fields: fields
        };
        snippets.push(newSnippet);
        window.tempFields = [];
    }
    
    renderSnippetsList();
    renderSnippetsSidebar();
    closeSnippetModal();
    saveData();
}

// Templates page functions
function renderTemplatesList() {
    const list = document.getElementById('templatesList');
    if (!list) return;
    
    if (templates.length === 0) {
        list.innerHTML = '<p>No templates created yet. Click "Create New Template" to get started.</p>';
        return;
    }

    let html = '';
    templates.forEach(template => {
        const contentPreview = template.content.substring(0, 200);
        const ellipsis = template.content.length > 200 ? '...' : '';
        
        html += '<div class="template-card">';
        html += '<div class="template-card-header">';
        html += '<h3>' + template.name + '</h3>';
        html += '<div class="snippet-actions">';
        html += '<button class="btn-sm btn-edit" onclick="editTemplate(' + template.id + ')">Edit</button>';
        html += '<button class="btn-sm btn-delete" onclick="deleteTemplate(' + template.id + ')">Delete</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });
    
    list.innerHTML = html;
}

function openTemplateModal(templateId) {
    templateId = templateId || null;
    currentEditingTemplate = templateId;
    const modal = document.getElementById('templateModal');
    const title = document.getElementById('templateModalTitle');
    
    if (templateId) {
        const template = templates.find(t => t.id === templateId);
        title.textContent = 'Edit Template';
        document.getElementById('templateName').value = template.name;
        document.getElementById('templateContent').value = template.content;
    } else {
        title.textContent = 'Create New Template';
        document.getElementById('templateName').value = '';
        document.getElementById('templateContent').value = '';
    }
    
    modal.classList.add('active');
}

function closeTemplateModal() {
    const modal = document.getElementById('templateModal');
    if (modal) {
        modal.classList.remove('active');
    }
    currentEditingTemplate = null;
}

function editTemplate(templateId) {
    openTemplateModal(templateId);
}

function deleteTemplate(templateId) {
    if (confirm('Are you sure you want to delete this template?')) {
        templates = templates.filter(t => t.id !== templateId);
        renderTemplatesList();
        updateTemplateSelection();
        saveData();
    }
}

function saveTemplate() {
    const name = document.getElementById('templateName').value.trim();
    const content = document.getElementById('templateContent').value.trim();
    
    if (!name || !content) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (currentEditingTemplate) {
        const template = templates.find(t => t.id === currentEditingTemplate);
        if (template) {
            template.name = name;
            template.content = content;
        }
    } else {
        const newTemplate = {
            id: Date.now(),
            name: name,
            content: content
        };
        templates.push(newTemplate);
    }
    
    renderTemplatesList();
    updateTemplateSelection();
    closeTemplateModal();
    saveData();
}

// Import/Export functionality
let importType = null;

function exportSnippets() {
    const dataStr = "let snippets = " + JSON.stringify(snippets, null, 2);
    // const dataStr = "let snippets = " +JSON.stringify(snippets)
    const dataBlob = new Blob([dataStr], {type: 'application/js'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ems-snippets.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function exportTemplates() {
    const dataStr = "let templates = " + JSON.stringify(templates, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/js'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ems-templates.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function importSnippets() {
    importType = 'snippets';
    document.getElementById('importFileInput').click();
}

function importTemplates() {
    importType = 'templates';
    document.getElementById('importFileInput').click();
}

function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (importType === 'snippets') {
                if (Array.isArray(importedData) && importedData.every(item => 
                    item.hasOwnProperty('id') && 
                    item.hasOwnProperty('name') && 
                    item.hasOwnProperty('group') && 
                    item.hasOwnProperty('fields'))) {
                    
                    if (confirm('This will replace all existing snippets. Continue?')) {
                        snippets = importedData;
                        renderSnippetsList();
                        renderSnippetsSidebar();
                        saveData();
                        alert('Snippets imported successfully!');
                    }
                } else {
                    alert('Invalid snippets file format.');
                }
            } else if (importType === 'templates') {
                if (Array.isArray(importedData) && importedData.every(item => 
                    item.hasOwnProperty('id') && 
                    item.hasOwnProperty('name') && 
                    item.hasOwnProperty('content'))) {
                    
                    if (confirm('This will replace all existing templates. Continue?')) {
                        templates = importedData;
                        renderTemplatesList();
                        updateTemplateSelection();
                        saveData();
                        alert('Templates imported successfully!');
                    }
                } else {
                    alert('Invalid templates file format.');
                }
            }
        } catch (error) {
            alert('Error reading file: ' + error.message);
        }
    };
    reader.readAsText(file);
    
    event.target.value = '';
}

// Modal event handlers
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
};

// Initialize global variables
window.currentSnippet = null;
window.tempFields = [];