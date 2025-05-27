let snippets = [
  {
    "id": 1748384433693,
    "name": "dispatch info",
    "group": "Basic Info",
    "template": "{field1} was dispatched for {field2}. {field3} {field4} marked en-route {field5}. Secondary information provided was {field6}.",
    "fields": [
      {
        "id": 1748384340395,
        "name": "Station",
        "type": "radio",
        "required": true,
        "options": [
          "Wintergreen station 1",
          "Wintergreen station 2",
          "Nelson EMS"
        ],
        "defaultValue": ""
      },
      {
        "id": 1748384353510,
        "name": "Complaint",
        "type": "text",
        "required": true,
        "options": null,
        "defaultValue": ""
      },
      {
        "id": 1748384392277,
        "name": "Level",
        "type": "radio",
        "required": true,
        "options": [
          "Rescue",
          "Trauma",
          "Medic"
        ],
        "defaultValue": "Medic"
      },
      {
        "id": 1748384399027,
        "name": "Unit Number",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": ""
      },
      {
        "id": 1748384415877,
        "name": "Response Mode",
        "type": "select",
        "required": false,
        "options": [
          "emergent",
          "non-emergent"
        ],
        "defaultValue": ""
      },
      {
        "id": 1748384479027,
        "name": "Secondary Info",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": ""
      }
    ]
  },
  {
    "id": 1748384632211,
    "name": "complaints",
    "group": "Basic Info",
    "template": "Pt presents to EMS as a {field1} YO{field2} who has complaints of {field3}. {field4} {field5}.",
    "fields": [
      {
        "id": 1748384508610,
        "name": "Age",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": ""
      },
      {
        "id": 1748384520593,
        "name": "Gender",
        "type": "radio",
        "required": true,
        "options": [
          "M",
          "F"
        ],
        "defaultValue": ""
      },
      {
        "id": 1748384548261,
        "name": "Primary Complaint",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": ""
      },
      {
        "id": 1748384592361,
        "name": "Secondary Complaints",
        "type": "select",
        "required": false,
        "options": [
          "Pt has secondary complaints of",
          "Pt denies any secondary complaints"
        ],
        "defaultValue": ""
      },
      {
        "id": 1748384608994,
        "name": "Secondary list",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": "",
        "conditional": {
          "dependsOn": 1748384592361,
          "showWhen": "Pt has secondary complaints of"
        }
      }
    ]
  }
]