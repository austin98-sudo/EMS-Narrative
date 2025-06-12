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
  },
  {
    "id": 1748699621103,
    "name": "abc",
    "group": "Assessment",
    "template": "{field1}. {field2}. {field3}.",
    "fields": [
      {
        "id": 1748699586238,
        "name": "Airway",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": "Airway is patent with no adjuncts needed"
      },
      {
        "id": 1748699612537,
        "name": "Breathing",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": "Breathing is at an appropriate rate and depth to sustain life"
      },
      {
        "id": 1748699620521,
        "name": "Circulation",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": "Pulse is present"
      }
    ]
  },
  {
    "id": 1748817008890,
    "name": "Arrival",
    "group": "Basic Info",
    "template": "Upon arrival the Pt was found {field1}. {field2}.",
    "fields": [
      {
        "id": 1748816934375,
        "name": "Where was Pt found?",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": ""
      },
      {
        "id": 1748817007507,
        "name": "Pt status",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": "Pt acknowledges providers and answers questions appropriately"
      }
    ]
  },
  {
    "id": 1748817113239,
    "name": "neuro",
    "group": "Assessment",
    "template": "{field1}. GCS is {field2}. {field3}.",
    "fields": [
      {
        "id": 1748817071273,
        "name": "Orientation",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": "Pt is oriented to person, place, time, and event"
      },
      {
        "id": 1748817077406,
        "name": "GCS",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": "15"
      },
      {
        "id": 1748817111355,
        "name": "Stroke",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": "No facial droop or slurred speech was noted"
      }
    ]
  },
  {
    "id": 1748817289637,
    "name": "heent",
    "group": "Assessment",
    "template": "{field1}. {field3}.",
    "fields": [
      {
        "id": 1748817150522,
        "name": "Head injury",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": "No visible abnormalities noted to the head or face"
      },
      {
        "id": 1748817184987,
        "name": "Were pupils checked?",
        "type": "radio",
        "required": false,
        "options": [
          "Pupils checked",
          "Pupils NOT checked"
        ],
        "defaultValue": "Pupils NOT checked"
      },
      {
        "id": 1748817208920,
        "name": "Pupils",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": "Pupils are PERRL",
        "conditional": {
          "dependsOn": 1748817184987,
          "showWhen": "Pupils checked"
        }
      }
    ]
  },
  {
    "id": 1748817346202,
    "name": "cv",
    "group": "Assessment",
    "template": "{field1}. {field2}",
    "fields": [
      {
        "id": 1748817323070,
        "name": "Chest pain?",
        "type": "select",
        "required": false,
        "options": [
          "Pt reports chest pain",
          "Pt denies chest pain"
        ],
        "defaultValue": ""
      },
      {
        "id": 1748817337786,
        "name": "12-lead",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": "A 12-lead was performed and interpreted as",
        "conditional": {
          "dependsOn": 1748817323070,
          "showWhen": "Pt reports chest pain"
        }
      }
    ]
  },
  {
    "id": 1748817611865,
    "name": "pulm",
    "group": "Assessment",
    "template": "{field1}. {field3}",
    "fields": [
      {
        "id": 1748817495682,
        "name": "Shortness of breath",
        "type": "radio",
        "required": false,
        "options": [
          "Pt denies shortness of breath",
          "Pt reports shortness of breath"
        ],
        "defaultValue": ""
      },
      {
        "id": 1748817654882,
        "name": "Listen to lung sounds?",
        "type": "select",
        "required": false,
        "options": [
          "Yes",
          "No"
        ],
        "defaultValue": ""
      },
      {
        "id": 1748817685298,
        "name": "Lung sounds",
        "type": "text",
        "required": false,
        "options": null,
        "defaultValue": "Lung sounds are clear bilaterally in the upper and lower lobes.",
        "conditional": {
          "dependsOn": 1748817654882,
          "showWhen": "Yes"
        }
      }
    ]
  }
]