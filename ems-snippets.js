let snippets = [
  {
    "id": 1,
    "name": "patientInfo",
    "group": "Patient Demographics",
    "template": "Patient {field1} is a {field2} year old {field3}.",
    "fields": [
      {
        "id": 1,
        "name": "Patient Name",
        "type": "text",
        "required": true,
        "defaultValue": ""
      },
      {
        "id": 2,
        "name": "Age",
        "type": "text",
        "required": true,
        "defaultValue": ""
      },
      {
        "id": 3,
        "name": "Gender",
        "type": "select",
        "required": true,
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "defaultValue": "Male"
      }
    ]
  },
  {
    "id": 2,
    "name": "vitalSigns",
    "group": "Assessment",
    "template": "Vital signs: BP {field1}, HR {field2}, RR {field3}, Temp {field4}.",
    "fields": [
      {
        "id": 1,
        "name": "Blood Pressure",
        "type": "text",
        "required": true,
        "defaultValue": ""
      },
      {
        "id": 2,
        "name": "Heart Rate",
        "type": "text",
        "required": true,
        "defaultValue": ""
      },
      {
        "id": 3,
        "name": "Respiratory Rate",
        "type": "text",
        "required": true,
        "defaultValue": ""
      },
      {
        "id": 4,
        "name": "Temperature",
        "type": "text",
        "required": false,
        "defaultValue": ""
      }
    ]
  },
  {
    "id": 3,
    "name": "medicationAdmin",
    "group": "Treatment",
    "template": "Medication administered: {field1}. {field2}{field3}{field4}",
    "fields": [
      {
        "id": 1,
        "name": "Was medication given?",
        "type": "select",
        "required": true,
        "options": [
          "Yes",
          "No"
        ],
        "defaultValue": "No"
      },
      {
        "id": 2,
        "name": "Medication Name",
        "type": "text",
        "required": true,
        "defaultValue": "",
        "conditional": {
          "dependsOn": 1,
          "showWhen": "Yes"
        }
      },
      {
        "id": 3,
        "name": "Dosage",
        "type": "text",
        "required": true,
        "defaultValue": "",
        "conditional": {
          "dependsOn": 1,
          "showWhen": "Yes"
        }
      },
      {
        "id": 4,
        "name": "Route of Administration",
        "type": "select",
        "required": true,
        "options": [
          "IV",
          "IM",
          "Oral",
          "Sublingual",
          "Inhaled"
        ],
        "defaultValue": "IV",
        "conditional": {
          "dependsOn": 1,
          "showWhen": "Yes"
        }
      }
    ]
  }
]