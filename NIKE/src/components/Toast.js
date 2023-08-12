import Snackbar from 'react-native-snackbar';

export const showToast = title => {
    // if (!title) return null;
    return Snackbar.show({
        text: title,
        duration: Snackbar.LENGTH_LONG,
    });
};