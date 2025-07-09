
let alphabeticTimeIndices = null;

export async function loadAlphabeticTimeIndices(filename = './src/alphanums_out.json') {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error('HTTP error! Status: $response.status}');
        }
        alphabeticTimeIndices = await response.json();
        console.log('Alphabetic time indices loaded!');
    } catch (err) {
        console.error('Failed to load alphabetic time indices: ${err.message}');
    }
    return alphabeticTimeIndices;
};

export function getTimeIndex(section, index) {
    if (!alphabeticTimeIndices) {
        console.error('Alphabetic Time Indices not available.');
        return null;
    }
    const key = index.toString();
    if (!(section in alphabeticTimeIndices)) {
        console.error('Section "${section}" not found.');
        return null;
    }

    if (!(key in alphabeticTimeIndices[section])) {
        console.error('Index "${key}" not found in section "${section}".');
        return null;
    }

    return alphabeticTimeIndices[section][key]
};