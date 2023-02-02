export const schema = {
    title: 'Input config',
    type: 'object',
    required: [],
    properties: {
        styles: {
            title: 'CSS Styles',
            type: 'textarea',
            default: '',
        },
        template: {
            title: 'HTML Template',
            type: 'textarea',
            default: '',
        },
        formClassName: {
            title: 'Form class name',
            type: 'string',
        },
        submitButtonFormItemClassName: {
            title: 'Form submit button Form Item class name',
            type: 'string',
        },
        submitButtonClassName: {
            title: 'Form submit button class name',
            type: 'string',
        },
        fieldsRelatedToFormId: {
            title: 'Form id of this fields',
            type: 'string',
        },
        submitButtonText: {
            title: 'Submit Button Text',
            type: 'string',
        },
        fieldsConfiguration: {
            type: 'array',
            items: {
                $ref: '#/definitions/fieldsConfiguration',
            },
        },
    },
    definitions: {
        fieldsConfiguration: {
            type: 'object',
            properties: {
                id: {
                    title: 'id',
                    type: 'string',
                },
                label: {
                    title: 'Label of input tag',
                    type: 'string',
                },
                fieldType: {
                    title: 'Element type',
                    type: 'string',
                    enum: [
                        'Input',
                        'InputNumber',
                        'Select',
                        'CheckBox',
                        'Radio',
                        'PlainText',
                        'CheckBox',
                        'Button',
                    ],
                    default: 'Input',
                },
                selectData: {
                    title: 'Select Data',
                    type: 'string',
                },
                type: {
                    title: 'Input type',
                    type: 'string',
                    enum: ['number', 'email', 'url', 'date', 'month', 'time'],
                    default: 'text',
                },
                typeMessage: {
                    title: 'Type Message',
                    type: 'string',
                },
                help: {
                    title: 'Help text of input tag',
                    type: 'string',
                },
                placeholder: {
                    title: 'Input placeholder',
                    type: 'string',
                },
                itemAndInputClassName: {
                    title: 'Form item and Input contaner ClassName',
                    type: 'string',
                },
                labalClassName: {
                    title: 'Input Label ClassName',
                    type: 'string',
                },
                formItemClassName: {
                    title: 'Form item ClassName',
                    type: 'string',
                },
                itemClassName: {
                    title: 'Item ClassName',
                    type: 'string',
                },
                itemOptionsClassName: {
                    title: 'Item Options ClassName',
                    type: 'string',
                },
                rules: {
                    title: 'Rule for the field',
                    type: 'number',
                },
                length: {
                    title: 'Length of input',
                    type: 'number',
                },
                disabled: {
                    title: 'Disabled',
                    type: 'boolean',
                },
            },
        },
    },
};

export const ui = {
    render: {
        'ui:widget': 'textarea',
    },
    styles: {
        'ui:widget': 'textarea',
    },
};
