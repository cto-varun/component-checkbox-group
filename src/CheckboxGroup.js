import React from 'react';
import { Checkbox } from 'antd';
import { getNestedObject } from '../../../../src/utils/nestedObjectHelpers';

export default function CheckboxGroup(props) {
    let data = [];

    const mapData = (inputData, key, values) => {
        return inputData
            .map((item) => {
                for (let i = 0; i < values.length; i += 1) {
                    if (getNestedObject(item, key) === values[i]) {
                        return item;
                    }
                }
                return false;
            })
            .filter((item) => item !== false);
    };

    // TODO: replace with transformer/processor
    if (props.data && props.data.data) {
        data = props.data.data;
        data = mapData(data, 'ptnStatus', 'A');
    }

    // Needed for IE 11
    const crossBrowserEval = function (input) {
        if (window[window.sessionStorage?.tabId].execScript) {
            window[window.sessionStorage?.tabId].execScript(input);

            return null;
        }
        return window[window.sessionStorage?.tabId].eval ? window[window.sessionStorage?.tabId].eval(input) : eval(input);
    };

    const { properties, component } = props;
    const { id } = component;
    const {
        onChangeFunctionString,
        getRemovedUsersFunctionString,
    } = properties;

    // mapping data function removes checked values... this should be configurable
    const reverseMapData = (inputData, key, values) => {
        return inputData
            .map((item) => {
                for (let i = 0; i < values.length; i += 1) {
                    if (getNestedObject(item, key) === values[i]) {
                        return false;
                    }
                }
                return item;
            })
            .filter((item) => item !== false);
    };

    const getRemovedUsers = (inputData, key, values) => {
        return inputData
            .map((item) => {
                for (let i = 0; i < values.length; i += 1) {
                    if (getNestedObject(item, key) === values[i]) {
                        return getNestedObject(item, 'telephoneNumber');
                    }
                }
                return false;
            })
            .filter((item) => item !== false);
    };

    function onChange(checkedValues) {
        // currentDevice.imei will be an input from sample-db.json
        const reverseMappedData = reverseMapData(
            data,
            'currentDevice.imei',
            checkedValues
        );
        crossBrowserEval(onChangeFunctionString)(reverseMappedData);
        const removedUsersArray = getRemovedUsers(
            data,
            'currentDevice.imei',
            checkedValues
        );
        window[window.sessionStorage?.tabId][`${id}-removedUsers`] = removedUsersArray;

        // logic when all boxes are checked
        if (checkedValues.length >= data.length) {
            window[window.sessionStorage?.tabId]['blacklist-remove-users-submit_hideButton']();
            window[window.sessionStorage?.tabId][
                'blacklist-remove-users-checkboxes-error-templateupdateTemplateData'
            ]({ error: 'default' });
        }
        if (checkedValues.length < data.length) {
            window[window.sessionStorage?.tabId]['blacklist-remove-users-submit_showButton']();
            window[window.sessionStorage?.tabId][
                'blacklist-remove-users-checkboxes-error-templateupdateTemplateData'
            ]({ error: 'none' });
        }
    }

    return (
        <>
            <Checkbox.Group onChange={onChange}>
                {data.map((item) => (
                    <Checkbox
                        value={item.currentDevice.imei}
                        key={item.telephoneNumber}
                        // styles can be passed in as a prop from the sample-db
                        style={{ lineHeight: '32px' }}
                    >
                        {item.telephoneNumber}
                    </Checkbox>
                ))}
            </Checkbox.Group>
        </>
    );
}
