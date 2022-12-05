export default [
    {
        "id": "1",
        "shape": "er-rect",
        "label": "学生",
        "width": 150,
        "height": 24,
        "position": {
            "x": 24,
            "y": 150
        },
        "ports": [
            {
                "id": "1-1",
                "group": "list",
                "attrs": {
                    "portNameLabel": {
                        "text": "ID"
                    },
                    "portTypeLabel": {
                        "text": "STRING"
                    }
                }
            },
            {
                "id": "1-2",
                "group": "list",
                "attrs": {
                    "portNameLabel": {
                        "text": "Name"
                    },
                    "portTypeLabel": {
                        "text": "STRING"
                    }
                }
            },
            {
                "id": "1-3",
                "group": "list",
                "attrs": {
                    "portNameLabel": {
                        "text": "Class"
                    },
                    "portTypeLabel": {
                        "text": "NUMBER"
                    }
                }
            },
            {
                "id": "1-4",
                "group": "list",
                "attrs": {
                    "portNameLabel": {
                        "text": "Gender"
                    },
                    "portTypeLabel": {
                        "text": "BOOLEAN"
                    }
                }
            }
        ]
    },
    {
        "id": "2",
        "shape": "er-rect",
        "label": "课程",
        "width": 150,
        "height": 24,
        "position": {
            "x": 250,
            "y": 210
        },
        "ports": [
            {
                "id": "2-1",
                "group": "list",
                "attrs": {
                    "portNameLabel": {
                        "text": "ID"
                    },
                    "portTypeLabel": {
                        "text": "STRING"
                    }
                }
            },
            {
                "id": "2-2",
                "group": "list",
                "attrs": {
                    "portNameLabel": {
                        "text": "Name"
                    },
                    "portTypeLabel": {
                        "text": "STRING"
                    }
                }
            },
            {
                "id": "2-3",
                "group": "list",
                "attrs": {
                    "portNameLabel": {
                        "text": "StudentID"
                    },
                    "portTypeLabel": {
                        "text": "STRING"
                    }
                }
            },
            {
                "id": "2-4",
                "group": "list",
                "attrs": {
                    "portNameLabel": {
                        "text": "TeacherID"
                    },
                    "portTypeLabel": {
                        "text": "STRING"
                    }
                }
            },
            {
                "id": "2-5",
                "group": "list",
                "attrs": {
                    "portNameLabel": {
                        "text": "Description"
                    },
                    "portTypeLabel": {
                        "text": "STRING"
                    }
                }
            }
        ]
    },
    {
        "id": "3",
        "shape": "er-rect",
        "label": "老师",
        "width": 150,
        "height": 24,
        "position": {
            "x": 480,
            "y": 350
        },
        "ports": [
            {
                "id": "3-1",
                "group": "list",
                "attrs": {
                    "portNameLabel": {
                        "text": "ID"
                    },
                    "portTypeLabel": {
                        "text": "STRING"
                    }
                }
            },
            {
                "id": "3-2",
                "group": "list",
                "attrs": {
                    "portNameLabel": {
                        "text": "Name"
                    },
                    "portTypeLabel": {
                        "text": "STRING"
                    }
                }
            },
            {
                "id": "3-3",
                "group": "list",
                "attrs": {
                    "portNameLabel": {
                        "text": "Age"
                    },
                    "portTypeLabel": {
                        "text": "NUMBER"
                    }
                }
            }
        ]
    },
    {
        "id": "4",
        "shape": "edge",
        "source": {
            "cell": "1",
            "port": "1-1"
        },
        "target": {
            "cell": "2",
            "port": "2-3"
        },
        "attrs": {
            "line": {
                "stroke": "#A2B1C3",
                "strokeWidth": 2
            }
        },
        "zIndex": 0
    },
    {
        "id": "5",
        "shape": "edge",
        "source": {
            "cell": "3",
            "port": "3-1"
        },
        "target": {
            "cell": "2",
            "port": "2-4"
        },
        "attrs": {
            "line": {
                "stroke": "#A2B1C3",
                "strokeWidth": 2
            }
        },
        "zIndex": 0
    }
]